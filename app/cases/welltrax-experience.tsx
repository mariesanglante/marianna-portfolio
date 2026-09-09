'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
const Prototype = dynamic(() => import('../welltrax/prototype'), {
  loading: () => (
    <output className="wx-loading" aria-live="polite">
      Preparing your driver workspace…
    </output>
  ),
});
export function WelltraxExperience() {
  const [active, setActive] = useState(false);
  return (
    <div className="wx-experience">
      <div className="wx-experience-bar">
        <span>INTERACTIVE DEMONSTRATION</span>
        <Link href="/welltrax">Open full screen ↗</Link>
      </div>
      {active ? (
        <Prototype embedded />
      ) : (
        <button className="wx-launch" onClick={() => setActive(true)}>
          <Image
            src="/notion/cacc762d-6da8-4961-9cdf-16438caa672e.webp"
            alt="Welltrax load and pickup interfaces"
            width={1600}
            height={1200}
          />
          <span className="wx-launch-label">
            <span aria-hidden="true">↗</span>
            <strong>Take the driver’s seat</strong>
            <small>Launch interactive prototype</small>
          </span>
        </button>
      )}
      <p className="wx-demo-caption">
        A refreshed portfolio prototype using sample data. Explore one load,
        complete its stops, and continue to the next.
      </p>
    </div>
  );
}
