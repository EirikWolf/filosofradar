# CLAUDE.md – Filosofradaren

En interaktiv, animert visualisering av filosofiens historie: når filosofene levde, hvem som levde
samtidig, hvem som påvirket hvem, og hva de var opptatt av. Statisk webapp på Firebase Hosting.

## Hvem du jobber med
**Eirik** eier prosjektet og tar produkt-, design- og innholdsvalgene.

- Fortell hvor i appen en endring kan sees.
- Spør før du gjør noe som er vanskelig å reversere (sletting, publisering, git push).
- Svar på norsk bokmål. Kode og variabelnavn på engelsk. Commit-meldinger og PR-tekster på norsk,
  konvensjonelle (`feat:`, `fix:`, `content:`, `docs:`, `chore:`), slik globale regler krever.

## Styringsdokumenter – les ved behov, hold dem oppdatert
| Fil | Innhold |
|---|---|
| `docs/PRD.md` | Hva vi bygger, for hvem, avgrensning |
| `docs/DESIGN.md` | Visuelt konsept, visninger, animasjon, interaksjon, tilgjengelighet |
| `docs/DATAMODELL.md` | JSON-format for filosofer, temaer, tradisjoner, årstall |
| `docs/INNHOLD.md` | Redaksjonelle regler og liste over filosofer |
| `docs/ARKITEKTUR.md` | Teknologi, mappestruktur, kommandoer |
| `docs/PLAN.md` | Faser og akseptansekriterier – **kilden til hva som er gjort** |
| `docs/BESLUTNINGER.md` | Beslutningslogg |

Endrer du noe som motsier et dokument, oppdater dokumentet i samme endring.

## Innholdsregler – ufravikelige
- **Ingen oppdiktede sitater.** Et sitat må ha verk og kilde. Finner du ikke en sikker kilde: bruk
  «kjerneidé med egne ord» i stedet, og la sitatfeltet stå tomt.
  Regelen gjelder også dypdykk, Ex.phil, dilemmaer og turer (B-010): tekst i «…» der registreres i
  `content/quotes/quote-register.json`, og `tests/quote-guard.test.ts` stopper nye sitater uten kilde.
- Årstall hentes fra eller kontrolleres mot Wikidata. Usikre årstall markeres `approx: true`.
- Nye filosofer får `reviewed: false` til prosjekteier har lest gjennom.
- Beskriv idéer nøytralt og alderstilpasset. Kontroversielle sider nevnes saklig, uten å forherlige.
- Temaprofiler (0–5) er redaksjonelt skjønn – begrunn kort i `themeNotes`.
- Bredde: alle tradisjoner i `docs/DATAMODELL.md` skal være representert, og kvinnelige filosofer skal være med.
- Portretter av ekte personer kun fra Wikimedia Commons med fri lisens eller public domain; lisens og
  kreditering lagres. Illustrasjoner (f.eks. til tankeeksperimenter) kan være KI-generert og merkes ikke (B-012).
- Nye eksterne tjenester føres i `docs/databehandlere.md` samme dag.

## Teknologi (detaljer i ARKITEKTUR.md)
Vite · React · TypeScript (strict) · `d3-force` (kraftsimulering) · Tailwind CSS · Zod (bare ved bygg) ·
Vitest + jsdom/Testing Library · Firebase Hosting · GoatCounter (besøksstatistikk). Ingen backend.
Nye avhengigheter: begrunn og loggfør i BESLUTNINGER.md.

## Kommandoer
- `npm run dev` – utviklingsserver
- `npm run build` – bygg (validerer også alt innhold)
- `npm run budget` – sjekk at JS på første side er under 200 kB gzip (kjøres etter build)
- `npm run validate` – sjekk alle filosof-filer mot skjemaet
- `npm run lint` · `npm run typecheck` · `npm test` · `npm run e2e`
- `npm run check` – alt over; må være grønn før en fase er ferdig

## Kodestandard
- Visualiseringsmatte (skalaer, polarkoordinater, overlapp, likhet) som rene funksjoner i `src/lib/` med tester.
- React tegner SVG; D3 brukes til beregning, ikke til å manipulere DOM direkte.
- Animasjoner skal gå i 60 fps på en vanlig mobil. Respekter `prefers-reduced-motion`.
- Alle visninger har et tilgjengelig alternativ (liste/tabell) og kan brukes med tastatur.
- UI-tekster samles i `src/i18n/nb.ts`.
- Ingen `any`, ingen `console.log` i ferdig kode.

## Arbeidsmåte
1. Én fase fra `docs/PLAN.md` om gangen. Presenter plan, vent på «kjør».
2. Jobb på en egen gren (`feat/…`, `fix/…`, `content/…`, `docs/…`), aldri direkte på `main`. Små steg,
   `npm run check` underveis, commit etter hvert delmål (`feat:`, `fix:`, `content:`, `docs:`).
3. Lever som PR mot `main`. `main` er beskyttet av regelsettet «main krever grønn CI»: CI-sjekken
   «Sjekk og bygg» må være grønn før merge, og direkte push til `main` avvises. Auto-merge kan slås på
   i PR-en, så merges den når CI blir grønn.
4. Merget er ikke publisert. Produksjon oppdateres med `/publiser` (forhåndsvisning først).
5. Kryss av i PLAN.md først når kriteriene er oppfylt.
6. Avslutt fasen med: hva er nytt, hvor man ser det, og hva som kommer neste.

## Windows
Stier med mellomrom i anførselstegn. Kommando ikke funnet etter installasjon → start Claude Desktop på nytt.
