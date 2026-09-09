import WelltraxPrototype from './prototype';
export const metadata = {
  title: 'Welltrax — Interactive trucking prototype',
  description:
    'Explore a driver’s workflow, from reviewing loads to recording pickups and completing deliveries.',
};
export default function Page() {
  return (
    <main id="main">
      <WelltraxPrototype />
    </main>
  );
}
