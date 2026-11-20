# US-005: Ingen alvorlige feil i automatisk tilgjengelighetssjekk

Som **elev som bruker skjermleser eller forstørrelse**
vil jeg **at forsiden og filosofkortet følger WCAG 2.2 AA**
slik at **jeg kan bruke appen på lik linje med andre**.

## Akseptkriterier

### Scenario: axe-core finner ingen alvorlige brudd
Gitt at appen er bygget og servert
Når axe-core sjekker forsiden og filosofkortet for Sokrates mot WCAG 2.2 AA
Så skal den ikke finne brudd med alvorlighet «serious» eller «critical»

Unntak: ett vurdert funn er godtatt i testen (`ACCEPTED_AXE_FINDINGS`): axe leser
ℹ-ikonet på Om-knappen som en bokstav. Hvert unntak har en begrunnelse.

Merk: Automatisk sjekk fanger bare en del av WCAG. Skjermlesertest og manuell
kontrastkontroll er fortsatt nødvendig.

Test: `e2e/smoke.e2e.ts` › «US-005 …»
