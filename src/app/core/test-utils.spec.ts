import {DebugElement, Type} from '@angular/core';
import {QueryMatch} from 'shallow-render/dist/lib/models/query-match';

/**
 * Type defining a function which can be used to find elements within an shallow-render test by using css or directive
 * queries.
 */
export type findSelector = (
  cssOrDirective: (string | Type<any>),
  options?: ({ query?: string | undefined } | undefined)
) => QueryMatch<DebugElement>;
