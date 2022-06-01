/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Helper to replace your nested 'ifs' with a single, readable expression.
 * Note that both the return and case are eagerly evaluated. If you wish to avoid that, use getters (2nd example).
 * @example
 * switchFn(
 *   {case: A === B, return: 'equal'},
 *   {case: B > C, return: 'different'},
 *   {return: 'default_value'}
 * );
 * @example
 * switchFn(
 *   {
 *     get case() {
 *       return deepEqual(A, B);
 *     },
 *     get return() {
 *       return computationallyExpensive(A, B);
 *     },
 *   },
 *   // ...
 *   {return: 'default_value'}
 * );
 * @param caseDefinitions
 */
export function switchFn<ResultT>(
  ...caseDefinitions: [
    ...cases: { case: boolean; return: ResultT }[],
    defaultCase: { return: ResultT }
  ]
): ResultT {
  const defaultCase = caseDefinitions[caseDefinitions.length - 1];

  if (!defaultCase) {
    throw new Error('Expected switchFn to receive a default case, but it did not.');
  }

  const match =
    caseDefinitions.find(definition => 'case' in definition && Boolean(definition.case)) ??
    defaultCase;

  return match.return;
}
