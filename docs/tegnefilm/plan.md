# Plan: tegnefilmserien «Kollektivet»

**Mål:** Seriebibel, episodeoversikt og pilotmanus som en produksjon kan starte på.
**Design:** `docs/tegnefilm/design.md` (godkjent 2026-11-17).
**Kilde for fagstoff:** `content/philosophers/*.json` og `src/features/exphil/exphilData.ts`.

## Felles regler

- Ingen oppdiktede sitater. Tekst i «…» lagt i munnen på en filosof skal ha verk og kilde. Ellers skal filosofen si idéen med egne ord, uten anførselstegn.
- Anekdoter merkes som anekdoter.
- Ingen lån fra *Sofies verden*.
- Ett rom per filosof. Rommet tømmes etter episoden der Maja forstår filosofen.
- Repetisjonsscenen er kumulativ: hver episode går gjennom alle rom fra tidligere episoder, pluss det nye.

## Oppgaver

1. **Seriebibel** (`seriebibel.md`): premiss, Maja, hver beboer (rom, knagg, særtrekk, pensumpoeng, kilde), regler, buen, visuell retning.
   *Ferdig når* hvert rom i designtabellen har en beboer med kilde for pensumpoenget.
2. **Episodeoversikt** (`episoder.md`): 8 episoder med konflikt, pensumpoeng (koblet til eksamensoppgaven i appen), knagg, hvem som forsvinner, og repetisjonslinjer.
   *Ferdig når* hver av de seks debattene i appen er dekket av én episode, og repetisjonslinjene i episode 8 dekker alle rom.
3. **Pilotmanus** (`pilot-ep1-manus.md`): episode 1 med scener, regi og replikker, 4–6 minutter (ca. 650–850 ord replikk og fortellerstemme).
   *Ferdig når* manuset har cold open, Sokrates, omvisning, Platon, repetisjonsscene og slutt med stjernen, og når hvert faglig poeng har en kildefotnote.
4. **Faktasjekk:** en uavhengig leser sjekker alle tre filene mot appens innhold og kildene. Funnene rettes.
5. **Commit** på grenen `docs/tegnefilm-kollektivet`. Ikke push før Eirik har sagt ja.
