---
description: Lag et kildebelagt utkast til en ny filosof-fil
---

Lag en ny filosof: $ARGUMENTS

1. Les `docs/DATAMODELL.md`, `docs/INNHOLD.md` og `content/philosophers/sokrates.json` som eksempel.
   Sjekk at filosofen ikke allerede finnes.
2. Finn Q-nummeret og årstallene på Wikidata. Les SNL, Stanford Encyclopedia og/eller Wikipedia.
3. Lag `content/philosophers/{id}.json` med `reviewed: false`:
   - kjerneidéer med egne ord, for en nysgjerrig 13-åring
   - temaprofil med begrunnelse i `themeNotes`
   - `influencedBy` bare til filosofer som finnes i `content/` (nevn andre relevante i svaret)
   - sitat **kun** hvis du har verk og kilde; ellers utelat feltet
   - bilde kun med fri lisens fra Wikimedia Commons, med forfatter og lisens
4. Kjør `npm run validate`.
5. Vis Olai et kort sammendrag og spør om temaprofilen: «Er du enig i at X var mest opptatt av Y?»
   Juster etter svaret. Minn om at `reviewed` settes til true først når dere har lest filen.
