import { Container } from '@/components/Container';
import { trpc } from '@/utils/trpc';

function Message({ id }) {
  const { data } = trpc.getMessage.useQuery({ id });

  console.log({ messageData: data });

  const from = data?.payload.headers.filter(
    (header) => header.name.toLowerCase() === 'from',
  )?.[0]?.value;

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <div className="flex items-center space-x-4">{from}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
      <td className="relative flex flex-col whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td>
    </tr>
  );
}

export function Subscribed() {
  const { data } = trpc.getSubscribedEmails.useQuery({ pageToken: '' });

  return (
    <Container>
      <div className="w-full sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Subscribed Emails
          </h1>
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
                      From
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
                  {data?.messages?.map((message) => (
                    <Message key={message.id} id={message.id} />
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
