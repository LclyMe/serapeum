"use client";

import * as Fathom from "fathom-client";
import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FATHOM_SITE_ID) return;
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      includedDomains: ["serapeum.vercel.app", "www.serapeum.vercel.app"],
    });

    const onRouteChange = () => Fathom.trackPageview();

    window.addEventListener("routeChange", onRouteChange);
    return () => window.removeEventListener("routeChange", onRouteChange);
  }, []);

  return null;
}

export default Analytics;
