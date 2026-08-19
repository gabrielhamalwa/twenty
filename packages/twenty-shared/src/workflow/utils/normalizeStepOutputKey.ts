// A stepOutputKey is resolved through resolveInput, which only substitutes
// `{{...}}` templates and returns anything else verbatim. A bare path therefore
// compares as a literal string and the filter can never match, so wrap it.
export const normalizeStepOutputKey = (stepOutputKey: string): string =>
  stepOutputKey === '' || /[{}]/.test(stepOutputKey)
    ? stepOutputKey
    : `{{${stepOutputKey}}}`;
