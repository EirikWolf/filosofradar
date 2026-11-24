# US-006: En visning åpnes også etter at en ny versjon er publisert

Som **elev som har hatt appen åpen en stund**
vil jeg **kunne åpne tidslinjen eller et annet rom selv om appen er publisert på nytt i mellomtiden**
slik at **jeg ikke møter en feilside og mister det jeg holdt på med**.

## Bakgrunn
Tidslinjen, idénettet, galaksen og flere rom ligger i egne filer som lastes først når de
åpnes. En ny publisering erstatter alle filene. Firebase Hosting svarer da på de gamle
filnavnene med `index.html` (status 200), så nettleseren får HTML der den venter JavaScript.
Før denne rettingen byttet appen da ut hele siden med reservesiden «Kosmisk forstyrrelse
oppsto» (mistanke 1 i arkitekturrevisjonen 17.11).

## Akseptkriterier

### Scenario: Den gamle filen finnes ikke lenger
Gitt at appen er åpen på forsiden
Og at filen for tidslinjen er erstattet av en ny publisering
Når eleven åpner tidslinjen
Så skal appen laste seg selv på nytt én gang og vise tidslinjen
Og reservesiden skal ikke vises

### Scenario: Filen mangler fortsatt etter ny innlasting
Gitt at appen nettopp har lastet seg på nytt fordi en fil manglet
Når den samme filen mangler igjen
Så skal appen vise reservesiden i stedet for å laste på nytt i det uendelige

Test: `e2e/deploy.e2e.ts` › «US-006 …» (første scenario) og `tests/chunk-reload.test.ts`
(begge scenariene).
