import { record } from '@/hooks/useFathom';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Button } from './Button';
import Labels from './Labels';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function App() {
  const { status } = useSession();

  const { data: labels } = useSWR(
    status === 'authenticated' ? '/api/labels' : null,
    fetcher,
  );
  const [label, setLabel] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { data: labelDetails, mutate } = useSWR(
    label ? `/api/labels/${label.id}` : null,
    fetcher,
  );

  useEffect(() => {
    let subscribed = true;

    async function deleteMessages() {
      let details;
      try {
        do {
          if (!deleting) {
            return;
          }

          if (!subscribed) {
            return;
          }

          const before = details?.messagesTotal ?? labelDetails.messagesTotal;

          details = await fetcher(`/api/labels/${label.id}/delete`);

          const deleted = before - details.messagesTotal;

          if (deleted > 0) {
            record('JUK5OTAF', deleted);
          }

          mutate(details);
        } while (details.messagesTotal > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setDeleting(false);
      }
    }

    if (deleting) {
      deleteMessages().catch((err) => console.error(err));
    }

    return () => (subscribed = false);
  }, [deleting, label, mutate]);

  return (
    <div className="w-full flex content-center justify-around">
      <div className="w-1/2">
        <div>
          <Labels
            labels={labels}
            label={label}
            selectedAltText={
              labelDetails ? `${labelDetails.messagesTotal} Messages` : null
            }
            onChange={setLabel}
          />
        </div>
      </div>
      <Button onClick={() => setDeleting(!deleting)}>
        {deleting ? 'Cancel' : 'Start Deleting!'}
      </Button>
    </div>
  );
}
