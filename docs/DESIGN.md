# Design – Filosofradaren

> **[endret]** Visuell stil valgt i idéverkstedet: **Observatoriet**. Tre konseptskisser finnes i `docs/skisser/`.

## 1. Designprinsipper
1. **Først wow, så dybde.** Første skjerm er radaren i bevegelse – ingen tekstvegg, ingen meny å lese først.
2. **Alt er klikkbart.** Hvert punkt, hver bue, hvert tema fører et sted.
3. **Ærlig visualisering.** Når vi komprimerer tid eller forenkler, sier vi det.
4. **Rolig når det trengs.** Animasjon forsterker, den forstyrrer ikke lesing.

## 2. Valgt stil: Observatoriet **[endret]**
Olai har valgt **Observatoriet** etter utprøving av de tre konseptskissene i `docs/skisser/`:
- **Stemning:** Stjernekart, kosmos, nattblå himmel, mystikk og historisk undring.
- **Farger:** Dyp marineblå/nattblå bakgrunn (`#040714` til `#0b1433`), stjernehvite glødende punkter, gylne sirkler og aksenter (`#f6c85f`), subtile fargetoner per tradisjon (som stjernebilder), og en eterisk stjernelys-sveipestråle.
- **Typografi:** Elegant serif til navn og overskrifter (f.eks. Georgia/Cinzel), ren og lesbar sans-serif til brødtekst.
- **Kort-design:** Kosmisk glassmorphism (`backdrop-filter: blur`, dyp gjennomsiktighet og tynne lysende kanter).

*(Skissene for **Sonar** og **Pergament** er bevart i `docs/skisser/` som referanse og historikk.)*

## 3. Radaren – geometri
- **Sentrum:** eldste tid (ca. 700 f.Kr.). **Ytterkant:** i dag. (Alternativ «nåtid i sentrum» kan testes i skissene.)
- **Ringer:** hvert århundre, tydeligere ring hvert 500. år, med årstall-etikett.
- **Sektorer:** én per tradisjon (se `DATAMODELL.md`), sortert slik at naboer har historisk kontakt
  (f.eks. gresk – islamsk – europeisk).
- **Punktets plassering:** radius = fødselsår (eller midten av levetiden – velg i fase 4 og loggfør),
  vinkel = tradisjon + liten spredning for å unngå overlapp (deterministisk, ikke tilfeldig per lasting).
- **Tidsskala:** filosofene er tett i nyere tid. Standard er en **komprimert skala** (f.eks. kvadratrot eller stykkevis lineær),
  med en bryter for «ærlig lineær skala» og en kort forklaring på forskjellen. Dette er et poeng i seg selv.
- **Punktets størrelse:** fast, eller etter antall påvirkningslenker (valgfritt).
- **Levetid:** når et punkt er valgt, tegnes en bue langs radius fra fødsel til død.

## 4. Animasjon og interaksjon
| Element | Oppførsel |
|---|---|
| Sveipestråle | Roterer kontinuerlig (ca. 8–10 s per runde) med myk stjernelys-hale. Stjernene gløder opp og dempes etter passering. |
| **[endret]** Tidsmaskin | Glider + ▶. Under avspilling vokser en tidsring utover; filosofer «fødes» med en energisk «supernova»-lyspuls og dempes ved død. Hastighet 1×/2×/4×. |
| Pek/hold (hover/touch) | Navn og levetid i en liten etikett; samtidige filosofer lyser svakt opp. |
| **[endret]** Klikk | Filosofkortet glir inn fra siden (mobil: nedenfra). Påvirkningsbuer animeres ut fra punktet som elegante, gylne stjernebilder/konstellasjonsbuer. |
| Filter | Punkter som filtreres bort tones ned (ikke fjernet) med myk overgang. |
| Zoom | Knip/scroll zoomer inn på en epoke; dobbelttrykk tilbakestiller. |
| Første besøk | 3 sekunders intro: sveipen tenner punktene ett for ett, så dukker en diskret hjelpeboble opp. |

Alle animasjoner: `transform` og `opacity` der det går; ingen layout-animasjon av hundrevis av elementer.
`prefers-reduced-motion`: sveip av, ingen puls, overganger ≤ 150 ms.

## 5. Filosofkortet
```
┌───────────────────────────────┐
│ [portrett]  Sokrates           │
│             ca. 470–399 f.Kr.  │
│             Gresk antikk        │
├───────────────────────────────┤
│   Temaradar (8 akser)          │
├───────────────────────────────┤
│ Kjerneidéer (2–3 korte avsnitt)│
│ «Sitat» – verk, kilde          │
│ 💭 Tenk selv: …                │
├───────────────────────────────┤
│ Påvirket av: …   Påvirket: …   │
│ [Sammenlign]  [Vis samtidige]   │
│ Kilder                          │
└───────────────────────────────┘
```

## 6. Quizen «Hvilken filosof ligner du på?»
- Ett spørsmål per skjerm, stor tekst, fem knapper fra «helt uenig» til «helt enig».
- Brukerens temaradar tegnes gradvis mens man svarer – det er selve belønningen.
- Resultat: brukerens radar oppå de tre nærmeste filosofene, likhet i prosent, én setning om hvorfor.
- Knapp: «Last ned bildet ditt» (PNG, med appnavn og nettadresse i hjørnet).

## 7. Tilgjengelighet
- «Listevisning» viser alle data som søkbar tabell.
- Alle punkter kan nås med Tab i tidsrekkefølge; Enter åpner kortet; Esc lukker.
- Farge er aldri eneste bærer av informasjon (tradisjon vises også med sektor og etikett).
- Tekst mot bakgrunn: minst 4.5:1.

## 8. Responsivt
- Mobil: radaren fyller bredden, kontroller i et panel nederst, kortet som ark nedenfra.
- Nettbrett/PC: radaren til venstre, kort til høyre.
- Storskjerm/presentasjon: «Klasseromsmodus» med større tekst og automatisk avspilling.
