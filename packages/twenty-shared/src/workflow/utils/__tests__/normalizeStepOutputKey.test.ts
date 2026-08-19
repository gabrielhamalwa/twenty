import { normalizeStepOutputKey } from '@/workflow/utils/normalizeStepOutputKey';

describe('normalizeStepOutputKey', () => {
  it('should wrap a bare path in a variable template', () => {
    expect(
      normalizeStepOutputKey('trigger.properties.after.lifecycleStage'),
    ).toBe('{{trigger.properties.after.lifecycleStage}}');
  });

  it('should leave an already wrapped key untouched', () => {
    expect(
      normalizeStepOutputKey('{{trigger.properties.after.lifecycleStage}}'),
    ).toBe('{{trigger.properties.after.lifecycleStage}}');
  });

  it('should leave an empty key untouched', () => {
    expect(normalizeStepOutputKey('')).toBe('');
  });

  it('should not double wrap a key that already contains braces', () => {
    expect(normalizeStepOutputKey('{{a}}.{{b}}')).toBe('{{a}}.{{b}}');
  });
});
