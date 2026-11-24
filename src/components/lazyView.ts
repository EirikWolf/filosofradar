import React from 'react';
import { loadOrReload } from '../lib/chunkReload';

/**
 * `React.lazy` som laster siden på nytt én gang hvis filen med visningen ikke kan
 * hentes, for eksempel etter en ny publisering (US-006). Brukes for alle visninger
 * som ligger i egne filer.
 */
export const lazyView: typeof React.lazy = (factory) => React.lazy(() => loadOrReload(factory));
