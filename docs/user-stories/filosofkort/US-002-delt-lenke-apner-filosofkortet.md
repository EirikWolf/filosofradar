# US-002: En delt lenke åpner filosofkortet

Som **lærer som deler en lenke til en filosof med klassen**
vil jeg **at lenken åpner filosofkortet direkte**
slik at **elevene havner på riktig sted uten å lete**.

## Akseptkriterier

### Scenario: Lenken `?f=sokrates` åpner kortet med dypdykket
Gitt at jeg har lenken `/?f=sokrates`
Når jeg åpner den
Så skal filosofkortet for Sokrates vises som en dialog
Og dypdykket, som lastes for seg når det trengs, skal vises i kortet

Test: `e2e/smoke.e2e.ts` › «US-002 …»
