import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('håndterer og fanger feil via getDerivedStateFromError', () => {
    const error = new Error('Simulert krasj i observatoriet');
    const nextState = ErrorBoundary.getDerivedStateFromError(error);

    expect(nextState.hasError).toBe(true);
    expect(nextState.error).toBe(error);
  });
});
