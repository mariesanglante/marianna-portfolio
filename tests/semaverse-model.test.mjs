import assert from 'node:assert/strict';
import test from 'node:test';
import {
  makeDocument,
  revise,
  assistantChange,
  downloadText,
  templates,
  sources,
} from '../app/semaverse/model.ts';
test('every template produces populated sections with resolvable sources', () => {
  for (const template of templates) {
    const d = makeDocument('Healthcare research', template, [1, 2, 3]);
    assert.ok(d.sections.length >= 3);
    assert.ok(
      d.sections.every(
        (s) =>
          s.body.length > 20 &&
          s.sourceIds.every((id) => sources.some((x) => x.id === id)),
      ),
    );
    assert.ok(downloadText(d).includes(d.title));
  }
});
test('assistant edits preserve the original and can be restored without losing the edit', () => {
  const d = makeDocument('Memo', 'Investment Memo', [1, 2]);
  const suggestion = assistantChange(d, 'Expand the competitive landscape');
  assert.notDeepEqual(suggestion, d.sections);
  const next = revise(d, suggestion, 'Before edit');
  assert.deepEqual(next.revisions[0].sections, d.sections);
  const restored = revise(next, next.revisions[0].sections, 'Before restoring');
  assert.deepEqual(restored.sections, d.sections);
  assert.deepEqual(restored.revisions[0].sections, suggestion);
});
test('deleted sections remain recoverable and concise requests shorten the summary', () => {
  const d = makeDocument('Memo', 'Investment Memo', [1, 2]);
  const next = revise(d, d.sections.slice(1), 'Before removal');
  assert.deepEqual(next.revisions[0].sections, d.sections);
  assert.ok(
    assistantChange(d, 'Make the executive summary concise')[0].body.length <
      d.sections[0].body.length,
  );
});
test('selected collection changes document context', () => {
  assert.ok(
    makeDocument('Tech', 'Sector Analysis', [4, 5]).sections[0].body.includes(
      'technology',
    ),
  );
});
