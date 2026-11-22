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
| Tester | Vitest (logikk), Vitest + jsdom + Testing Library (komponenter, se B-009), Playwright med axe-core (røyktest av det bygde nettstedet, `e2e/`, B-018) | Ser det jsdom ikke ser: CSP, lat lasting, rolig modus, axe |
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
│  ├─ quotes/                   sitatregister for sitatvakten (B-010)
│  └─ illustrations/scenes.json én bildeprompt per tankeeksperiment (B-017)
├─ public/images/hooks/         illustrasjoner til tankeeksperimenter (B-012), med 960 px-varianter for kort (B-016)
├─ scripts/
│  ├─ build-content.ts          valider + slå sammen + statistikk + sitemap
│  ├─ check-bundle-budget.ts    ytelsesbudsjett for første side
│  ├─ illustrations/            genereringsskriptet som kjøres på kitor (B-017)
│  └─ wikidata.ts               hent/kontroller årstall fra Wikidata (SPARQL)
├─ src/
│  ├─ main.tsx, App.tsx         visningsvalg og URL-parametre (?v=, ?f=)
│  ├─ schemas/                  Zod-skjemaer; ids.ts har konstanter uten Zod
│  ├─ generated/                bygget innhold (git-ignorert)
│  ├─ lib/                      ren logikk med tester: years, polar, timeScale, layout, influence,
│  │                            similarity, search, galaxy, timeMachine, relations, daily, quotes, sound, telemetry …
│  ├─ components/               ErrorBoundary, SweepBeam, ThemeRadar
│  ├─ hooks/                    useDialogFocus (fokus i alle dialoger)
│  └─ features/                 radar, timeline, galaxy, network, list, card, comparison, deepdive,
│                               exphil, ethics, story, tours, quiz, factcheck, daily, about
├─ tests/                       Vitest; komponenttester i jsdom (*.test.tsx)
├─ e2e/                         Playwright-røyktest mot `vite preview` av dist/ (*.e2e.ts, B-018)
├─ docs/user-stories/           brukerhistorier i Gherkin; hver røyktest viser til én (US-NNN)
└─ firebase.json, .firebaserc
```

## Kommandoer (package.json)
`dev`, `build` (kjører `build-content` først), `budget` (JS på første side < 200 kB gzip, kjøres i CI og i `publiser` etter build), `validate`, `lint`, `typecheck`, `test`, `e2e` (Playwright mot bygget, kjøres i CI etter `build`), `check`, `wikidata`.

**Kodesplitting:** Forsiden laster bare radar, liste, tidslinje, nettverk og filosofdataene. Dypdykk, Ex.phil-innhold, historier og Zod lastes først når de trengs. Konstanter som appen trenger, ligger derfor i egne små filer (`src/schemas/ids.ts`, `src/features/exphil/exphilIds.ts`) og ikke sammen med skjemaer eller innhold.

## Illustrasjoner
Hvert tankeeksperiment i dypdykkene har én scene i `content/illustrations/scenes.json`: filnavn, filosof, eksperimentets tittel og en engelsk prompt som bare beskriver motivet. Stilen, negativ prompt og størrelsen (1280 × 768) står én gang øverst i fila, så alle bildene får samme uttrykk. `tests/illustration-scenes.test.ts` feiler hvis et tankeeksperiment mangler scene, eller hvis en scene peker på et eksperiment som ikke finnes.

Et tankeeksperiment kobles til en kuratert fortelling («▶ Se idéen på 45 sek») med `storyKey`, som peker på en nøkkel i `BESPOKE_STORIES` (`src/features/story/storyData.ts`). Filosofkortet og historiegalleriet bruker samme kobling. Uten `storyKey` lages en generert fortelling. `tests/story-links.test.ts` feiler hvis en nøkkel ikke finnes eller hører til en annen filosof, eller hvis en kuratert fortelling ikke har nøyaktig ett tankeeksperiment. Unntaket er fortellinger som bare finnes i galleriet, som Foots, fordi hun ikke er på radaren (B-014). Før ble koblingen gjettet ut fra tittelen (ARK-02).

Bildene lages med Z-Image-Turbo på kitor med `scripts/illustrations/generate_on_kitor.py` (B-017). Skriptet tar en `image`-lease i kitor-arbiter, hopper over bilder som finnes, og kan startes på nytt etter avbrudd.

```
scp content/illustrations/scenes.json scripts/illustrations/generate_on_kitor.py kitor:filosofradar-illustrasjoner/
ssh kitor "cd ~/filosofradar-illustrasjoner && nohup /opt/comfyui/.venv/bin/python generate_on_kitor.py --out out/zimage > run.log 2>&1 &"
scp "kitor:filosofradar-illustrasjoner/out/zimage/*.webp" public/images/hooks/
npm run images
```

`--only <fil>,<fil>` lager bare de nevnte scenene, og `--force` lager dem på nytt. Blir et bilde mislykket, gi scenen et eget `seed` (heltall) i manifestet og kjør den med `--force`. Systemets `python3` på kitor mangler Pillow, så skriptet kjøres med ComfyUIs Python.

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
