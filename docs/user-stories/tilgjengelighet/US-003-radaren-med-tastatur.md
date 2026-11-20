# US-003: Radaren og filosofkortet kan brukes med tastatur

Som **elev som ikke bruker mus**
vil jeg **kunne velge en filosof på radaren og lese kortet med tastaturet**
slik at **jeg får det samme ut av appen som andre**.

## Akseptkriterier

### Scenario: Fra radaren til kortet og tilbake
Gitt at jeg står på forsiden
Når jeg tabber meg fram til den første stjernen på radaren
Så skal det være den eldste filosofen, Ptahhotep
Når jeg trykker Enter
Så skal hurtigkortet for Ptahhotep vises under radaren
Når jeg trykker Enter på «Åpne filosofkort»
Så skal filosofkortet åpnes med fokus inne i kortet
Når jeg trykker Escape
Så skal kortet lukkes, og fokus skal stå på knappen som åpnet det

Test: `e2e/smoke.e2e.ts` › «US-003 …»
