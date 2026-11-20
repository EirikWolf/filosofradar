# US-001: Forsiden viser radaren

Som **elev som åpner Filosofradaren**
vil jeg **se alle filosofene på radaren med en gang**
slik at **jeg kan begynne å utforske uten å lete etter noe først**.

## Akseptkriterier

### Scenario: Forsiden laster i en vanlig nettleser
Gitt at appen er bygget og servert med de samme sikkerhetsheaderne som produksjonen (CSP)
Når jeg åpner forsiden
Så skal radaren vise én stjerne per filosof (80)
Og nettleseren skal ikke melde om feil i konsollen eller ubehandlede unntak

Test: `e2e/smoke.e2e.ts` › «US-001 …»
