---
description: Kjør kvalitetssjekk og oppdater status i PLAN.md
---

1. Kjør `npm run check` (eller det som finnes av validate, lint, typecheck, test, e2e).
2. Vis resultatet i en kort tabell: sjekk · status · antall feil. Ta med innholdsstatistikken
   fra valideringen (antall filosofer per tradisjon, kvinner, `reviewed: false`).
3. Forklar hver feil med enkle ord. Rett åpenbare småfeil selv; spør før du endrer oppførsel.
4. Sammenlign med akseptansekriteriene for aktiv fase i `docs/PLAN.md` og si ærlig hva som mangler.
5. Vis `git status` og foreslå commit ved ucommittede endringer.
