---
description: Feilsøk et problem trinnvis og forklar det enkelt
---

Vi står fast: $ARGUMENTS

1. Gjenta problemet med egne ord; spør etter feilmelding eller siste endring hvis det mangler.
2. Undersøk før du endrer: relevante filer, `git status`/`git diff`, konsollen i nettleseren, versjoner.
3. Forklar sannsynlig årsak enkelt. Vanlige feller:
   - kommando ikke funnet etter installasjon → start Claude Desktop på nytt
   - PowerShell blokkerer npm-skript → execution policy
   - port 5173 opptatt → gammel dev-server kjører
   - valideringsfeil i en filosof-fil → vis filen og feltet, forklar regelen
   - animasjonen hakker → for mange elementer som animeres, eller layout-animasjon i stedet for transform
   - blank side etter publisering → SPA-rewrite mangler eller feil `public`-mappe i firebase.json
4. Gjør den minste rettingen og verifiser at problemet er borte.
5. Én setning om hvordan man unngår det neste gang.
