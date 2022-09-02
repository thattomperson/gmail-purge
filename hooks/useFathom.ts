import Fathom from 'fathom-client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useFathom(site_id: string, opts: Fathom.LoadOptions = {}) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load(site_id, opts);

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);
}

export function record(goal: string, value = 1) {
  Fathom.trackGoal(goal, value);
}
