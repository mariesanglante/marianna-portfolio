import Link from 'next/link';
import { RainforestDemo } from '../cases/rainforest-demo';
import '../cases/rainforest-case.css';
export const metadata = {
  title: 'Rainforest interactive prototype — Marianna Gonchar',
  description:
    'Explore a connected home-energy experience: live demand, device setup, thermostat controls, charging, and analytics.',
};
export default function RainforestPrototype() {
  return (
    <main id="main" className="rp-full-page">
      <header className="rp-full-header">
        <h1>Rainforest / interactive prototype</h1>
        <Link href="/cases/rainforest">← Back to the case study</Link>
      </header>
      <RainforestDemo standalone />
    </main>
  );
}
