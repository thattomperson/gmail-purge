import { conversions, unique_conversions } from '@/utils/stats';

export function Stats() {
  return (
    <div className="pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Secure and Easy
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            We don&apos;t have databases or servers, Everything happens safely
            from your browser.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 sm:pb-16">
        <div className="relative">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Emails Deleted
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                    {conversions}
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Unique Users
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                    {unique_conversions}
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Uptime
                  </dt>
                  <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                    100%
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
