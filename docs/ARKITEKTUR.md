# Arkitektur – Filosofradaren

## Oversikt
Helt statisk webapp. Innholdet bygges inn ved byggetid. Ingen server, ingen database, ingen innlogging.

```
content/philosophers/*.json ──(scripts/build-content.ts: valider + slå sammen)──► src/generated/philosophers.json
                                                                                        │
                                                          Vite + React-app ◄─────────────┘
                                                                 │ npm run build
                                                                 ▼
                                                          dist/ ──► Firebase Hosting
```

## Teknologivalg
| Område | Valg | Hvorfor |
|---|---|---|
| Bygg | Vite | Raskt, enkelt |
| UI | React + TypeScript (strict) | Stort økosystem, typer fanger feil |
| Visualisering | SVG tegnet av React; egne skalaer og polarmatte i `src/lib/`; **`d3-force`** til kraftsimulering; Canvas for 3D-galaksen | React eier DOM; D3 brukes bare der det sparer mye kode |
| Animasjon | CSS-animasjoner (Tailwind) + `requestAnimationFrame` for sveip, galakse og historier | Ingen ekstra avhengighet |
| Styling | Tailwind CSS + CSS-variabler for temafarger | Rask stil, enkelt å bytte tema |
| Validering | Zod | Samme skjema for innhold og typer |
| Tilstand | React state + URL-parametre (`?f=sokrates&year=-400`) | Delbare lenker, ingen ekstra bibliotek |
| Bilde-eksport | Canvas (`src/lib/quizExport.ts`) | Del-bilde fra quizen uten ekstra avhengighet |
| Bildevarianter | `sharp` i `scripts/make-image-variants.ts` (`npm run images`), bare ved utvikling | 960 px-varianter av illustrasjonene til kort og galleri, 61 % mindre (B-016) |
| Tester | Vitest (logikk), Vitest + jsdom + Testing Library (komponenter, se B-009), Playwright (røyktest av hovedflyt, ikke innført ennå) | |
| Hosting | Firebase Hosting, Spark-plan | Gratis, enkel publisering, forhåndsvisningskanaler |
| Besøksstatistikk | GoatCounter (B-011) | Uten informasjonskapsler; se `docs/databehandlere.md` |

Hvis radaren får > 500 punkter eller hakker på mobil: bytt punktlaget til `<canvas>` og behold SVG for aksene. Loggfør.

## Mappestruktur
```
/
├─ CLAUDE.md
├─ docs/                        krav, design, plan, beslutninger, databehandlere, revisjoner/, skisser/
├─ .claude/                     innstillinger og slash-kommandoer
├─ .github/workflows/ci.yml     check + build + budget på hver PR
├─ content/
│  ├─ philosophers/             én JSON per filosof (kilden til sannhet, Zod-validert)
│  ├─ quiz/                     spørsmål til «Hvilken filosof ligner du på?»
│  └─ quotes/                   sitatregister for sitatvakten (B-010)
├─ public/images/hooks/         illustrasjoner til tankeeksperimenter (B-012), med 960 px-varianter for kort (B-016)
├─ scripts/
│  ├─ build-content.ts          valider + slå sammen + statistikk + sitemap
│  ├─ check-bundle-budget.ts    ytelsesbudsjett for første side
│  └─ wikidata.ts               hent/kontroller årstall fra Wikidata (SPARQL)
├─ src/
│  ├─ main.tsx, App.tsx         visningsvalg og URL-parametre (?v=, ?f=)
│  ├─ schemas/                  Zod-skjemaer; ids.ts har konstanter uten Zod
│  ├─ generated/                bygget innhold (git-ignorert)
│  ├─ lib/                      ren logikk med tester: years, polar, timeScale, layout, influence,
│  │                            similarity, quotes, sound, telemetry …
│  ├─ components/               ErrorBoundary, SweepBeam, ThemeRadar
│  ├─ hooks/                    useDialogFocus (fokus i alle dialoger)
│  └─ features/                 radar, timeline, galaxy, network, list, card, comparison, deepdive,
│                               exphil, ethics, story, tours, quiz, factcheck, daily, about
├─ tests/                       Vitest; komponenttester i jsdom (*.test.tsx)
└─ firebase.json, .firebaserc
```

## Kommandoer (package.json)
`dev`, `build` (kjører `build-content` først), `budget` (JS på første side < 200 kB gzip, kjøres i CI og i `publiser` etter build), `validate`, `lint`, `typecheck`, `test`, `e2e`, `check`, `wikidata`.

**Kodesplitting:** Forsiden laster bare radar, liste, tidslinje, nettverk og filosofdataene. Dypdykk, Ex.phil-innhold, historier og Zod lastes først når de trengs. Konstanter som appen trenger, ligger derfor i egne små filer (`src/schemas/ids.ts`, `src/features/exphil/exphilIds.ts`) og ikke sammen med skjemaer eller innhold.

## Miljø
Samme som Bryggeloftet: Git, Node.js LTS, Firebase CLI, VS Code. Java trengs ikke (ingen emulatorer).
Ny maskin: installer med `winget install -e --id Git.Git`, `OpenJS.NodeJS.LTS`, `Microsoft.VisualStudioCode`,
deretter `npm install -g firebase-tools`.

## Firebase
- Prosjekt-id: **filosofradar** (`.firebaserc`), produksjon på https://filosofradar.web.app
- Kun Hosting. `firebase.json`: `public: dist`, SPA-rewrite til `/index.html`, `no-cache` på HTML, lang cache på `assets/**`, og sikkerhetsheadere (CSP m.m.).
- Forhåndsvisning: `firebase hosting:channel:deploy preview --expires 7d`
- Produksjon: `firebase deploy --only hosting`

## Nettverk
`scripts/wikidata.ts` kaller `https://query.wikidata.org/sparql` fra utviklermaskinen ved behov. Appen selv gjør
ett eksternt kall ved kjøring: GoatCounter (`gc.zgo.at` for skriptet, `filosofradar.goatcounter.com` for tellingen),
se B-011 og `docs/databehandlere.md`.
