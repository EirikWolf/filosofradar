# CLAUDE.md – Filosofradaren

En interaktiv, animert visualisering av filosofiens historie: når filosofene levde, hvem som levde
samtidig, hvem som påvirket hvem, og hva de var opptatt av. Statisk webapp på Firebase Hosting.

## Hvem du jobber med
**Olai** (voksen, nybegynner i programmering) er hovedpersonen og tar produkt- og designvalgene.
**Asbjørn**, faren hans, er med som co-pilot; han har lært Claude Code gjennom et tidligere Firebase-prosjekt.
Olai og Asbjørn leser også denne filen. Er det uklart hvem som skriver, spør.

**Lærermodus – gjelder hele prosjektet:**
- Snakk til Olai når det gjelder design, innhold og valg. Vær entusiastisk, men ikke barnslig.
- Første gang et nytt begrep dukker opp (komponent, state, SVG, polarkoordinat, commit …):
  forklar det i 1–2 setninger med et hverdagseksempel.
- Når du har bygget noe med et interessant prinsipp (matte, animasjon, data), tilby én kort
  «Din tur»-oppgave han kan gjøre selv på under 10 minutter. Ikke gi fasiten før han ber om det.
- Vis resultatet: fortell nøyaktig hvor i appen han kan se endringen.
- Spør før du gjør noe som er vanskelig å reversere (sletting, publisering, git push).
- Svar på norsk bokmål. Kode, variabelnavn og commit-meldinger på engelsk.

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
- Årstall hentes fra eller kontrolleres mot Wikidata. Usikre årstall markeres `approx: true`.
- Nye filosofer får `reviewed: false` til Asbjørn og Olai har lest gjennom.
- Beskriv idéer nøytralt og alderstilpasset. Kontroversielle sider nevnes saklig, uten å forherlige.
- Temaprofiler (0–5) er redaksjonelt skjønn – begrunn kort i `themeNotes`.
- Bredde: alle tradisjoner i `docs/DATAMODELL.md` skal være representert, og kvinnelige filosofer skal være med.
- Bilder kun fra Wikimedia Commons med fri lisens eller public domain; lisens og kreditering lagres.

## Teknologi (detaljer i ARKITEKTUR.md)
Vite · React · TypeScript (strict) · D3 (skalaer, former, kraftsimulering) · Motion (animasjon) ·
Tailwind CSS · Zod · Vitest · Playwright (røyktest) · Firebase Hosting. Ingen backend i MVP.
Nye avhengigheter: begrunn og loggfør i BESLUTNINGER.md.

## Kommandoer
- `npm run dev` – utviklingsserver
- `npm run build` – bygg (validerer også alt innhold)
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
2. Små steg, `npm run check` underveis, commit etter hvert delmål (`feat:`, `fix:`, `content:`, `docs:`).
3. Kryss av i PLAN.md først når kriteriene er oppfylt.
4. Avslutt fasen med: hva er nytt, hvor man ser det, én «Din tur»-oppgave, hva som kommer neste.

## Windows
Stier med mellomrom i anførselstegn. Kommando ikke funnet etter installasjon → start Claude Desktop på nytt.
