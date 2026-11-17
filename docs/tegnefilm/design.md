# Design: tegnefilmserien «Kollektivet»

Dato: 2026-11-17 · Status: godkjent 2026-11-17, justert etter faktasjekk samme dag (se siste avsnitt)

## Hensikt

En animert serie som gjør ex.phil-pensum morsomt og lett å huske til eksamen.
Kunnskapen henges på knagger som er lettere å huske enn pensumteksten:
hverdagsscener i et studentkollektiv, og et minnepalass der hvert rom bærer én
filosof og én idé. Formen er inspirert av *Sofies verden*: en rammefortelling
med et mysterium som driver historien, der filosofien er en del av
handlingen og ikke en forelesning.

**Målgruppe:** elever på videregående og ex.phil-studenter (16–25 år), altså
de samme som appen. Humoren skal være voksen nok for den aldersgruppen.

## Leveransen (dette arbeidet)

Alternativ B, valgt 2026-11-17:

1. **Seriebibel** (`docs/tegnefilm/seriebibel.md`): premiss, figurer,
   huset rom for rom, universets regler, den store buen og en kort visuell
   retning.
2. **Episodeoversikt** (`docs/tegnefilm/episoder.md`): 8 episoder med konflikt,
   pensumpoeng, knagg og repetisjonsscene for hver.
3. **Pilotmanus** (`docs/tegnefilm/pilot-ep1-manus.md`): ferdig manus for
   episode 1 med replikker og regi, 4–6 minutter.

## Det som er bestemt

- **Premiss:** Ex.phil-studenten Maja flytter inn i et kollektiv der
  romkameratene er filosofer.
- **Minnepalass:** Huset er et minnepalass. Hver filosof har sitt rom, og
  rommet er knaggen for idéen.
- **Vendingen:** Hver gang Maja forstår en filosof, står rommet tomt dagen
  etter, og en stjerne dukker opp i taket hennes. På eksamensdagen skjønner Maja at huset er hennes eget minnepalass, og hun
  går gjennom det i hodet mens hun skriver. Seeren får se teknikken i bruk og
  kan bruke den selv. Taket fullt av stjerner blir til Filosofradaren.
- **Format:** 8 episoder på 4–6 minutter. Hver episode har ett rom og én
  konflikt, og ender med en repetisjonsscene der Maja går gjennom huset. Den
  tar rundt 20 sekunder i episode 1 og vokser for hver episode.

## Forslag til husets rom (kan justeres i bibelen)

| Sted | Beboer | Knagg | Pensumpoeng |
|---|---|---|---|
| Gangen | Sokrates | Stiller spørsmål ved døra og slipper ingen inn før de har definert ordet de bruker | Sokratisk metode |
| Kjelleren | Platon | Mørk kjeller, skygger på veggen, en trapp opp mot lyset | Hulelignelsen, idélæren |
| Kjøkkenet | Aristoteles | Hver ting har en hylle og et formål | Form i tingene, telos, dyd som midten |
| Stua | Hobbes og Locke | Vaskelista på kjøleskapet | Naturtilstand, samfunnskontrakt, eiendomsrett, opprørsrett |
| Hybelen ved stua | Wollstonecraft | Står ikke på listen over dem som får stemme | Fornuften har ikke kjønn, rettigheter, utdanning |
| Fyrrommet | Descartes | Det varme rommet, som rommet med ovnen der han la opp metoden | Metodisk tvil, *cogito* |
| Spillrommet | Hume | Biljardbordet: vi ser ballen støte, aldri årsaken | Inntrykk og idéer, kausalitet, induksjon |
| 2. etasje | Kant | Ryddigst i huset, skiltet *Kan regelen din bli lov for alle?* | Det kategoriske imperativ, plikt |
| Loftstrappa | Kierkegaard | Bor i den bratte loftstrappa: tre avsatser er tre stadier | Estetisk, etisk og religiøst stadium |
| Arkbalkongen | Sartre og de Beauvoir | Kafébordet på balkongen øverst i huset | Frihet, eksistensen går forut for essensen (Sartre, *L'existentialisme est un humanisme*, 1946), situasjon |
| Loftet | Popper (+ Kuhn på besøk) | Fuglekasser med hvite svaner, til én er svart | Falsifikasjon, paradigmeskifte |

Descartes' oppvarmede rom (*Discours de la méthode*, del 2, der han la opp
metoden; *cogito* kommer i del 4), Humes biljardkuler (*Abstract*, 1740, og
*Enquiry*, seksjon IV) og Poppers svaner er ekte eksempler fra verkene. Kants
faste spaserturer er en anekdote og skal merkes som det.

## Episodeplan (utkast)

1. **Innflyttingen**: Sokrates og Platon (pilot)
2. **Kjøkkenet**: Platon mot Aristoteles
3. **Vaskelista**: Hobbes mot Locke, med Wollstonecraft som påpeker at
   kontrakten glemmer halve huset
4. **Hvem spiste yoghurten?**: Descartes mot Hume
5. **Husreglene**: Kant mot Aristoteles (plikt mot dyd)
6. **Trappa og balkongen**: Kierkegaard, Sartre og de Beauvoir
7. **Loftet**: Popper mot Kuhn
8. **Eksamen**: vendingen, hele huset gjennomgått

Episode 2–7 følger debattene som allerede finnes i appens Ex.phil-hub
(`src/features/exphil/exphilData.ts`), så filmen og appen forsterker hverandre.

## Mål, ikke-mål og anti-mål

- **Mål:** En seer som har sett serien, skal kunne gå gjennom huset i hodet og
  hente fram hovedidéen og minst ett eksempel for hver filosof.
- **Ikke-mål:** å dekke alle 26 ex.phil-tenkere i appen. Augustin, Aquinas,
  Spinoza, Hegel, Marx, Nietzsche, Russell, Wittgenstein, Arendt, Næss,
  Foucault, Anscombe og Rousseau står igjen til en eventuell sesong 2.
  Å produsere selve filmen er også utenfor dette arbeidet.
- **Anti-mål (feil selv om resten er bra):**
  - En vits som lærer bort noe faglig galt.
  - Oppdiktede sitater. Filosofene snakker med egne ord, og ekte sitater må
    ha verk og kilde, som appens innholdsregel krever.
  - En forelesning med tegninger til.
  - Lån fra *Sofies verden*: ingen figurer, ingen mystiske brev fra en lærer,
    ingen usett huseier eller annen skikkelse bak kulissene, og ingen vending
    om at personene er figurer i en bok. Vår vending er minnepalasset.
  - Å blande Platons *anamnese* (sjelen husker idéer fra før fødselen) med
    minnepalasset, som er en teknikk. Episode 8 skiller dem tydelig.

## Begrensninger

- Repoet er offentlig. Alt som committes, er synlig.
- Kuhn og Mill finnes ikke som filosofer i appens innhold. Kuhn er med som
  gjest på loftet fordi han finnes i Popper–Kuhn-debatten.
- Selve filmen skal kunne produseres på flere måter (KI-video på kitor eller
  en animatør). Bibelen binder seg ikke til én av dem.

## Det som står igjen til skribenten

- Figurtegning og stemme for Maja og hver filosof.
- Hvordan rommene tømmes visuelt, og hvordan stjernene samles.
- Vitser, replikker og regi i piloten innenfor anti-målene over.
- Faktasjekk av hvert pensumpoeng mot appens filosof-filer og Ex.phil-data.

## Etter faktasjekken 2026-11-17

En uavhengig faglig leser sjekket rundt 95 påstander og henvisninger i alle
fire dokumentene. Det fantes ingen oppdiktede sitater, men rundt 30 punkter ble
rettet. De viktigste:

- **Platon** skriver nå *samtaler* der Sokrates er hovedperson, ikke referater.
  Det er appens egen eksamensfelle å blande Sokrates med Platons idélære.
- **Anamnese og minnepalass** holdes atskilt. Aristoteles, som skrev om å huske
  ved hjelp av steder, står for skillet i episode 8.
- **Den usette huseieren og «M.»** er fjernet fordi de lignet for mye på
  *Sofies verden*. Vendingen om minnepalasset står.
- **Locke** får eiendom ved å plukke blåbær i Marka, noe som er felles og ikke
  eid, ikke ved å kjøpe yoghurt.
- **Hume** slutter ut fra vane, men kan ikke bevise slutningen. Han nekter ikke å
  konkludere.
- **Kants skilt** spør om regelen kan bli lov for alle, ikke om det ville gått
  dårlig hvis alle gjorde det.
- **Descartes** har bivoks, ikke stearin.
- **Kierkegaard** skifter ikke stadium etter humør.

**Kjent begrensning:** `tests/quote-guard.test.ts` skanner ikke
`docs/tegnefilm/`. Sitatregelen for manusene håndheves manuelt, med
kildelister i hvert manus.

**Til appen (rettet 2026-11-17):** Debatten `hobbes-vs-locke` sa at Hobbes
avviser opprørsrett «totalt». Det var upresist. Hobbes beholder retten til å
forsvare sitt eget liv (*Leviathan* kap. 14 og 21). Rettet i
`exphilData.ts` på grenen `fix/hobbes-opprorsrett`.
