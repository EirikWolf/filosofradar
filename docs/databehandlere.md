# Databehandlere

Eksterne tjenester som behandler data for Filosofradaren, enten fra besøkende eller fra prosjektet.
Appen har ingen innlogging, ingen backend og ingen database. Svar i quizen og Ex.phil-mestring blir
bare lagret i nettleseren (`localStorage`).

| Tjeneste | Formål | Data om besøkende | Databehandleravtale |
|---|---|---|---|
| **GoatCounter** (`filosofradar.goatcounter.com`, skript fra `gc.zgo.at`) | Besøksstatistikk (B-011) | IP-adresse og nettleserinformasjon kommer med i forespørselen, men lagres ikke. Ifølge GoatCounter holdes en saltet hash av IP-adresse og User-Agent i minnet i 8 timer for å kjenne igjen en økt. Lagret er bare samlet statistikk: side, henviser, nettleser og operativsystem, skjermstørrelse og land/region. Ingen informasjonskapsler. | Ikke vurdert |
| **Firebase Hosting** (Google) | Leverer appen (`filosofradar.web.app`) | Vanlige HTTP-forespørsler (IP-adresse, User-Agent), slik enhver webserver mottar dem. Appen skriver ingen egne data til Firebase. | Ikke verifisert om Firebase-vilkårene for databehandling er akseptert i konsollet |
| **GitHub** | Kildekode, CI og Dependabot | Ingen. Repoet er offentlig og skal ikke inneholde personopplysninger. | Ikke relevant |
| **kitor** (eget hjemmelab-GPU) | Genererte illustrasjonene i `public/images/hooks/` ved utvikling (B-012) | Ingen. Brukes bare av utviklere, ikke av besøkende. | Ikke relevant (egen maskin) |

## Kilder og forbehold
- GoatCounter: [personvernerklæring](https://goatcounter.com/privacy) (datert 2021-03-08) og
  [GDPR-side](https://www.goatcounter.com/gdpr). Kontrollert 2026-11-16. Hva som samles inn kan
  stilles inn per nettsted, og innstillingene for `filosofradar.goatcounter.com` er ikke kontrollert.
- Om en saltet hash regnes som anonym eller pseudonym etter GDPR, er et juridisk spørsmål som ikke
  er vurdert her.

Oppdater tabellen samme dag som en ny ekstern tjeneste tas i bruk.
