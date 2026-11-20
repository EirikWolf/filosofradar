# US-004: Tidsmaskinen virker i rolig modus

Som **elev som har slått på «redusert bevegelse» i operativsystemet**
vil jeg **kunne spille av tidsmaskinen uten at animasjonene flimrer**
slik at **jeg kan se filosofene bli født uten å bli kvalm eller distrahert**.

## Akseptkriterier

### Scenario: Animasjonene er slått av, men tiden går
Gitt at nettleseren ber om redusert bevegelse
Når jeg åpner forsiden
Så skal CSS-animasjonene ha tilnærmet null varighet
Når jeg aktiverer tidsmaskinen og velger høyeste fart
Så skal den spille av med en gang
Og årstallet skal gå framover
Og Sokrates skal bli født på radaren
Og nettleseren skal ikke melde om feil

Test: `e2e/smoke.e2e.ts` › «US-004 …»
