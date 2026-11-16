// @vitest-environment jsdom
import React, { useRef } from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDialogFocus } from '../src/hooks/useDialogFocus';

function TestDialog({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogFocus(ref);
  return (
    <div ref={ref} role="dialog" aria-modal="true" tabIndex={-1}>
      {children}
    </div>
  );
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

describe('useDialogFocus', () => {
  it('hopper over skjulte knapper når Tab skal gå rundt til første element', async () => {
    const user = userEvent.setup();
    const outside = document.createElement('button');
    outside.textContent = 'Utenfor';
    document.body.appendChild(outside);
    outside.focus();

    const { getByText } = render(
      <TestDialog>
        <button>Første</button>
        <button>Andre</button>
        {/* Typisk for Tailwind-klasser som «hidden sm:flex» på smal skjerm */}
        <button style={{ display: 'none' }}>Skjult</button>
      </TestDialog>,
    );

    getByText('Andre').focus();
    await user.tab();
    expect(document.activeElement).toBe(getByText('Første'));
  });
});
