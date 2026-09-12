import { CaseHeader, CaseFooter } from './components';
import { DigitallyExperience } from './digitally-experience';
import './digitally-case.css';

export function DigitallyCase() {
  return (
    <>
      <CaseHeader />
      <DigitallyExperience />
      <CaseFooter disclaimer />
    </>
  );
}
