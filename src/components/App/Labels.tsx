import {
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  InboxIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { TagIcon as SolidTagIcon } from '@heroicons/react/24/solid';
import { Container } from '../Container';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { record } from '@/hooks/useFathom';
import { trpc } from '@/utils/trpc';

function Icon({ type }) {
  switch (type) {
    case 'INBOX':
      return <InboxIcon className="w-6" />;
    case 'STARRED':
      return <StarIcon className="w-6" />;
    case 'IMPORTANT':
      return <TagIcon className="w-6" />;
    case 'TRASH':
      return <TrashIcon className="w-6" />;
    case 'DRAFT':
      return <DocumentTextIcon className="w-6" />;
    case 'SPAM':
      return <ExclamationCircleIcon className="w-6" />;
    case 'CHAT':
      return <ChatBubbleOvalLeftIcon className="w-6" />;
    case 'SENT':
      return <PaperAirplaneIcon className="w-6" />;
    case 'UNREAD':
      return <EnvelopeIcon className="w-6" />;
    case 'CATEGORY_SOCIAL':
      return <UserGroupIcon className="w-6" />;
    case 'CATEGORY_PROMOTIONS':
      return <TagIcon className="w-6" />;
    case 'CATEGORY_PERSONAL':
      return <UserIcon className="w-6" />;
    case 'CATEGORY_UPDATES':
      return <InformationCircleIcon className="w-6" />;
    case 'CATEGORY_FORUMS':
      return <ChatBubbleLeftIcon className="w-6" />;
    default:
      return <SolidTagIcon className="w-6" />;
  }
}

function LabelName({ label }) {
  switch (label.id) {
    case 'INBOX':
    case 'STARRED':
    case 'IMPORTANT':
    case 'TRASH':
    case 'DRAFT':
    case 'SPAM':
    case 'CHAT':
    case 'SENT':
    case 'UNREAD':
      return (
        <span>
          {label.name.charAt(0).toUpperCase() +
            label.name.toLowerCase().slice(1)}
        </span>
      );
    case 'CATEGORY_SOCIAL':
    case 'CATEGORY_PROMOTIONS':
    case 'CATEGORY_PERSONAL':
    case 'CATEGORY_UPDATES':
    case 'CATEGORY_FORUMS':
      return (
        <span>
          {label.name.slice(9).charAt(0).toUpperCase() +
            label.name.toLowerCase().slice(10)}
        </span>
      );
    default:
      return (
        <div className="divide-x divide-gray-400 flex w-full content-around">
          {label.name.split('/').map((part, i) => (
            <span key={i} className="first:pl-0 pl-2 pr-2">
              {part}
            </span>
          ))}
        </div>
      );
  }
}

function useDelete(id) {
  const { data, refetch } = trpc.getLabelDetails.useQuery({ id });

  const [deleting, setDeleting] = useState(false);
  const [read, setRead] = useState(false);

  async function deleteAll() {
    setRead(true);
    setDeleting(true);
  }
  async function deleteUnread() {
    setRead(false);
    setDeleting(true);
  }

  function stop() {
    setDeleting(false);
  }

  const mutation = trpc.deleteLabelMessages.useMutation();

  useEffect(() => {
    let subscribed = true;

    async function main() {
      try {
        let details = data;
        do {
          const before = details.messagesTotal;
          details = await mutation.mutateAsync({ id });
          const deleted = before - details.messagesTotal;
          refetch();
          if (deleted > 0) {
            record(process.env.NEXT_PUBLIC_FATHOM_DELETE_EVENT_ID, deleted);
          }
        } while (details.messagesTotal > 0 && subscribed && deleting);
      } catch (e) {
        console.error({ error: e });
      } finally {
        setDeleting(false);
      }
    }

    if (deleting) main();

    return () => {
      subscribed = false;
    };
  }, [deleting, id]);

  return { data, deleting, stop, deleteAll, deleteUnread };
}

function Label({ label }) {
  const {
    data: labelData,
    deleting,
    stop,
    deleteAll,
    deleteUnread,
  } = useDelete(label.id);

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <div className="flex items-center space-x-4">
          <Icon type={label.id} />
          <LabelName label={label} />
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {labelData?.messagesTotal} total
        <br />
        {labelData?.messagesUnread} unread
      </td>
      <td className="relative flex flex-col whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {deleting ? (
          <button onClick={() => stop()}>Stop</button>
        ) : (
          <>
            <button
              onClick={() => labelData?.messagesTotal > 0 && deleteAll()}
              className={clsx(
                labelData?.messagesTotal === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-indigo-600 hover:text-indigo-900',
              )}
            >
              Delete All<span className="sr-only">, {label.name} messages</span>
            </button>
            {/* <button
              onClick={() => labelData?.messagesUnread > 0 && deleteUnread()}
              className={clsx(
                labelData?.messagesUnread === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-indigo-600 hover:text-indigo-900',
              )}
            >
              Delete Unread
              <span className="sr-only">, {label.name} messages</span>
            </button> */}
          </>
        )}
      </td>
    </tr>
  );
}

export function Labels() {
  const { data: labels } = trpc.getLabels.useQuery();

  return (
    <Container>
      <div className="w-full sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Labels</h1>
          {/* <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p> */}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Label
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Emails
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {labels?.map((label) => (
                    <Label key={label.id} label={label} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
