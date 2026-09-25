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
| Visualisering | SVG tegnet av React, **D3** til skalaer, buer (`d3-shape`), kraftsimulering (`d3-force`) | D3 er standarden; React eier DOM |
| Animasjon | **Motion** (tidligere Framer Motion) + `requestAnimationFrame` for sveipen | Myke overganger, enkel API |
| Styling | Tailwind CSS + CSS-variabler for temafarger | Rask stil, enkelt å bytte tema |
| Validering | Zod | Samme skjema for innhold og typer |
| Tilstand | React state + URL-parametre (`?f=sokrates&year=-400`) | Delbare lenker, ingen ekstra bibliotek |
| Bilde-eksport | `html-to-image` eller canvas | Del-bilde fra quizen |
| Tester | Vitest (logikk), Playwright (røyktest av hovedflyt) | |
| Hosting | Firebase Hosting, Spark-plan | Gratis, enkel publisering, forhåndsvisningskanaler |

Hvis radaren får > 500 punkter eller hakker på mobil: bytt punktlaget til `<canvas>` og behold SVG for aksene. Loggfør.

## Mappestruktur
```
/
├─ CLAUDE.md
├─ docs/                        krav, design, plan, beslutninger, skisser/
├─ .claude/                     innstillinger og kommandoer
├─ content/philosophers/        én JSON per filosof (kilden til sannhet)
├─ public/portraits/            bilder med fri lisens
├─ scripts/
│  ├─ build-content.ts          valider + slå sammen + statistikk
│  └─ wikidata.ts               hent/kontroller årstall fra Wikidata (SPARQL)
├─ src/
│  ├─ main.tsx, App.tsx, routes.tsx
│  ├─ i18n/nb.ts
│  ├─ schemas/philosopher.ts    Zod-skjema
│  ├─ generated/                bygget innhold (git-ignorert)
│  ├─ lib/
│  │  ├─ years.ts               f.Kr./e.Kr., levetid, overlapp
│  │  ├─ polar.ts               år + tradisjon → (x, y)
│  │  ├─ timeScale.ts           lineær og komprimert skala
│  │  ├─ layout.ts              deterministisk spredning i sektor
│  │  ├─ influence.ts           graf, idéslekt, omvendte lenker
│  │  └─ similarity.ts          likhet mellom temaprofiler (quiz)
│  ├─ components/               Radar, SweepBeam, Blip, TimeSlider, ThemeRadar, PhilosopherCard, ...
│  ├─ features/                 radar, timeline, compare, network, quiz, about, list
│  └─ hooks/
├─ tests/e2e/                   Playwright
└─ firebase.json, .firebaserc
```

## Kommandoer (package.json)
`dev`, `build` (kjører `build-content` først), `validate`, `lint`, `typecheck`, `test`, `e2e`, `check`, `wikidata`.

## Miljø
Samme som Bryggeloftet: Git, Node.js LTS, Firebase CLI, VS Code. Java trengs ikke (ingen emulatorer).
Ny maskin: installer med `winget install -e --id Git.Git`, `OpenJS.NodeJS.LTS`, `Microsoft.VisualStudioCode`,
deretter `npm install -g firebase-tools`.

## Firebase
- Prosjekt-id: **[fylles inn i prompt C]**
- Kun Hosting. `firebase.json`: `public: dist`, SPA-rewrite til `/index.html`, lang cache på `assets/**`.
- Forhåndsvisning: `firebase hosting:channel:deploy preview --expires 7d`
- Produksjon: `firebase deploy --only hosting`

## Nettverk
`scripts/wikidata.ts` kaller `https://query.wikidata.org/sparql` fra utviklermaskinen ved behov. Appen selv gjør
ingen eksterne kall ved kjøring (unntatt eventuelt valgfri fase 10).
