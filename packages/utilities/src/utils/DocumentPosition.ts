/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Collection of bitmask values returned by [Node#compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)
 *
 * Use either the equal operator (`===`) or the bitwise AND (`&`) operator to compare positions.
 *
 * <table>
 * <tr>
 * <th scope="col">Name</th>
 * <th scope="col">Value</th>
 * </tr>
 * <tr>
 * <td><code>DOCUMENT_POSITION_DISCONNECTED</code></td>
 * <td>1</td>
 * </tr>
 * <tr>
 * <td><code>DOCUMENT_POSITION_PRECEDING</code></td>
 * <td>2</td>
 * </tr>
 * <tr>
 * <td><code>DOCUMENT_POSITION_FOLLOWING</code></td>
 * <td>4</td>
 * </tr>
 * <tr>
 * <td><code>DOCUMENT_POSITION_CONTAINS</code></td>
 * <td>8</td>
 * </tr>
 * <tr>
 * <td><code>DOCUMENT_POSITION_CONTAINED_BY</code></td>
 * <td>16</td>
 * </tr>
 * <tr>
 * <td><code>DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC</code></td>
 * <td>32</td>
 * </tr>
 * </table>
 *
 * @enum
 */
export enum DocumentPosition {
  /**
   * DOCUMENT_POSITION_DISCONNECTED	= 1
   */
  DISCONNECTED = 1,
  /**
   * DOCUMENT_POSITION_PRECEDING = 2
   */
  PRECEDING = 2,
  /**
   * DOCUMENT_POSITION_FOLLOWING = 4
   */
  FOLLOWING = 4,
  /**
   * DOCUMENT_POSITION_CONTAINS = 8
   */
  CONTAINS = 8,
  /**
   * DOCUMENT_POSITION_CONTAINED_BY = 16
   */
  CONTAINED_BY = 16,
  /**
   * DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32
   */
  IMPLEMENTATION_SPECIFIC = 32
}
