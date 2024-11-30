"use client";
import { Analytics as AnalyticsComponent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Analytics() {
  return (
    <>
      <AnalyticsComponent />
      <SpeedInsights />
    </>
  );
}
