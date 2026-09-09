import SemaversePrototype from './prototype';
export const metadata = {
  title: 'Semaverse — Interactive product demo',
  description:
    'Explore research collections, create investment documents, and refine ideas with Archer in this interactive portfolio demo.',
};
export default function Page() {
  return (
    <main id="main">
      <SemaversePrototype />
    </main>
  );
}
