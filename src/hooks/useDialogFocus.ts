import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Åpne dialoger i den rekkefølgen de ble åpnet. Bare den øverste fanger Tab,
// ellers ville f.eks. Filosofkortet og en historie oppå det trukket fokus
// fram og tilbake mellom seg.
const openDialogs: HTMLElement[] = [];

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && !el.closest('[hidden], [inert]') && isVisible(el),
  );
}

// Skjulte knapper (f.eks. Tailwind «hidden sm:flex» på mobil) kan ikke få fokus.
// Regnes de med som «siste element», slipper Tab ut av dialogen.
function isVisible(el: HTMLElement): boolean {
  if (typeof el.checkVisibility === 'function') return el.checkVisibility();
  return window.getComputedStyle(el).display !== 'none';
}

/**
 * Fokushåndtering for modale dialoger (WCAG 2.4.3, WAI-ARIA Dialog Pattern):
 * 1. Flytter fokus til første fokuserbare element i dialogen ved åpning.
 * 2. Holder Tab og Shift+Tab inne i dialogen (fokusfelle).
 * 3. Gir fokus tilbake til elementet som var fokusert før dialogen åpnet.
 *
 * Er flere dialoger åpne samtidig, er det bare den sist åpnede som fanger Tab.
 *
 * Escape håndteres fortsatt av hver dialog selv, fordi hva Escape skal
 * lukke varierer (f.eks. lukker Filosofkortet en åpen historie først).
 */
export function useDialogFocus(dialogRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    openDialogs.push(dialog);

    const focusable = getFocusableElements(dialog);
    (focusable[0] ?? dialog).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (openDialogs[openDialogs.length - 1] !== dialog) return;

      const elements = getFocusableElements(dialog);
      if (elements.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;
      const isOutside = !dialog.contains(active);

      if (e.shiftKey && (active === first || isOutside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || isOutside)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const index = openDialogs.lastIndexOf(dialog);
      if (index !== -1) openDialogs.splice(index, 1);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [dialogRef]);
}
