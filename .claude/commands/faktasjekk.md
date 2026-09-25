---
description: Kontroller innholdet mot Wikidata og de redaksjonelle reglene
---

Gjør en faktasjekk av `content/philosophers/`. $ARGUMENTS

1. Kjør `npm run wikidata` (eller hent fødsels- og dødsår for alle Q-numre via SPARQL hvis skriptet ikke finnes ennå).
2. Lag en rapport med tabeller:
   - **Avvik i årstall** mot Wikidata (fil, vårt år, Wikidata, forslag)
   - **Sitater** som mangler verk eller kilde, eller som du ikke kan bekrefte
   - **Påvirkning** der påvirkeren er født etter den påvirkede, eller lenken virker tvilsom
   - **Bredde:** antall per tradisjon, kvinner, nordiske, århundrer uten filosofer
   - **Ikke gjennomlest** (`reviewed: false`)
3. **Ikke endre noe** før vi har sett rapporten. Deretter: rett det vi godkjenner, og kjør `npm run validate`.
