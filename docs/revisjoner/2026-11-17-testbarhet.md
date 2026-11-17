# Tester, testbarhet og kanttilfeller — filosofradar

Felles regler: v2026-10-04 · Revidert: `95c779c4ccf4f17bf1311a5995c547caff0e4b78` på `revisjon/2026-11-17-testbarhet` (fra `origin/main`) · Dato: 2026-11-17
Omfang: `tests/` og `src/` (særlig `src/lib/`, `src/hooks/`, `src/features/radar`, `src/features/card`, dialogene, tidslinjen) · Miljø: Windows 11 Pro, Node v24.19.0, npm, Vitest 5.1.0 med jsdom 31 · Baseline: typecheck grønn, lint grønn, test grønn 3 av 3 kjøringer (170/170 hver gang, 9,4–11,2 s), validate grønn, build grønn, budget grønn (133,9 kB JS gzip på første side)

**Merk om SHA:** Arbeidstreet ble laget fra `b200444`, men `main` fikk to nye commits under arbeidet (#29 sitatkilder og #28 `globals` 17). Grenen ble spolt fram (`git merge --ff-only`) til `95c779c` før baseline og mutasjonsprøver. Alle funn gjelder `95c779c`.

**Antakelser for felt i oppdraget:**
- *De viktigste forretningsreglene* ble ikke oppgitt. Jeg valgte dem ut fra B-003 (intet år 0), B-008 (radarens geometri), DESIGN.md §7 (tastatur), fase 3–7 i PLAN.md og de rettede UU-funnene: levetid og «levde samtidig», plassering på tidsakse og radar, tidsmaskinens fødsler, fokus og tastatur i dialoger og på radaren, likhetsberegningen i quizen og påvirkningsnettet.
- *Feil som har sluppet gjennom før:* hentet fra `git log` og de to forrige revisjonene: fokusfeller (UU-01, HEL-02), påfunnet dødsår for nålevende (#19), supernova-glimt som ble liggende (#20), hallusinerte lenker (`751e226`).
- Prosjektet har ingen økonomi, tenant, tilgangskontroll eller migrasjoner. Ingenting her er fredet klasse.

## Konklusjon

Matten i `src/lib/` og fokusfellen i dialogene har ekte tester, og komponentoppsettet fra B-009 (jsdom og Testing Library) holder til langt mer enn det brukes til i dag. Problemet er alt rundt: av 29 mutasjoner ble bare 8 fanget. Fem av de ni `[UU-xx]`-testene og tre «Fase 9»/røyktester ville vært grønne om rettingen de vokter ble fjernet, og påstanden «røyktest 62/62» i PLAN.md stemmer ikke. Det viktigste først er å bytte UU-testene og tidsmaskinen over til oppførselstester i jsdom (bevistestene i denne revisjonen viser at det går, på ca. 1 s), fordi det også avdekket fire reelle feil som ingen test så: dobbel fødsel i tidsmaskinen, «år 0» i visningen, en glider uten navn og en tidslinje som ikke kan brukes med tastatur.

## Inventar

| Nivå | Antall | Andel | Dekning | Kommando |
|---|---:|---:|---|---|
| Enhetstester av logikk (`src/lib`, `ErrorBoundary`) | 67 | 39 % | ikke målt (se under) | `npx vitest run --reporter=json` per fil |
| Innholds- og datavalidering (genererte JSON- og TS-data) | 66 | 39 % | – | samme |
| Komponenttester i jsdom | 22 | 13 % | – | `grep -l "@vitest-environment jsdom" tests/*` → 2 filer |
| Kildetekst-grep, kopi av logikk eller tautologi | 15 | 9 % | – | lest for hånd: `ux-and-a11y-fixes` 9, `fase9-wow` 4, `smoke` 2 |
| Integrasjon | 0 | 0 % | – | ingen backend (B-001) |
| E2E / nettleser | 0 | 0 % | – | `ls tests/e2e` finnes ikke, Playwright ikke installert |
| **Sum** | **170** | | | |

- Fordeling per fil (antall tester): `years` 13, `lifespan` 8, `timeScale` 8, `polar` 7, `layout` 4, `similarity` 13, `influence` 4, `quotes` 4, `telemetry` 5, `errorBoundary` 1 · `fase8-validation` 8, `themeRadar` 3, `links` 7, `quote-guard` 5, `deepdive` 4, `exphil` 10, `story` 19, `tours` 5, `ethics` 5 · `dialog-focus` 21, `use-dialog-focus` 1 · `ux-and-a11y-fixes` 9, `fase9-wow` 4, `smoke` 2.
- Pyramiden er ikke ~70/25/5. Det er ikke et problem i seg selv for en statisk app uten backend, men 9 % av testene tester ikke koden i det hele tatt, og 0 % ser appen i en nettleser.
- **Dekning er ikke målt.** `@vitest/coverage-v8` er ikke installert (`package.json`), og jeg installerte ingenting. Fire filer i `src/lib` har ingen testfil som importerer dem: `quizExport.ts` (275 linjer), `themes.ts`, og indirekte `traditions.ts`/`sound.ts` bare via røyktester. Kommando: `for f in src/lib/*.ts; do grep -l "lib/$(basename $f .ts)'" tests/*; done`.
- **Hoppede tester:** 0 `.skip`, `.only`, `.todo`, `xit`, `xdescribe`. Filteret ble kontrollert: `echo "it.skip(" | grep -cE "\.(skip|only|todo)\("` gir 1.
- **Tester uten `expect`:** 0. Et grovt skript flagget 4, men alle 4 har `expect` ved gjennomlesing.
- **Tid:** hele suiten 9,4–11,2 s lokalt (3 kjøringer). `dialog-focus.test.tsx` står for 5,8 av dem. CI-jobben `Sjekk og bygg` brukte 43 s totalt 2026-11-17, av det 11 s på `npm run check` (`gh run view 44031225108 --json jobs`).
- **Stabilitet:** 3 av 3 kjøringer grønne på `95c779c` (og 3 av 3 på `b200444` før spolingen). Ingen ustabile tester.

## Mutasjonsprøve

Hver mutasjon ble lagt inn, hele Vitest-suiten kjørt, og fila tilbakestilt med `git checkout -- <fil>`. `git status` var tom etter hver runde. Skript: et lite Node-skript som bytter én streng og kjører `npx vitest run --reporter=json`. **8 av 29 fanget.**

| # | Regel | Mutasjon | Fil:linje | Fanget | Av hvilken test |
|---|---|---|---|---|---|
| M01 | «Levde samtidig» på grensen | `<=` → `<` | `src/lib/years.ts:85` | nei | (kjent fra helhetsrevisjonen) |
| M02 | Intet år 0 i levetid | fjernet `- 1` | `src/lib/years.ts:72` | ja | `years.test` › krysser år 0 |
| M03 | Formatering av år 0 | `year < 0` → `year <= 0` | `src/lib/years.ts:26` | nei | – |
| M04 | Levetid for nålevende («f. 1944») | byttet til «1944 – » | `src/lib/years.ts:47` | nei | – (3 filosofer bruker grenen) |
| M05 | Floruit-formatering | `to` → `from` | `src/lib/years.ts:37` | ja | `years.test` › floruit |
| M06 | Komprimert skala, knekkpunkt 500 e.Kr. | `0.35` → `0.30` | `src/lib/timeScale.ts:89` | nei | – |
| M07 | Klemming til aksens grenser | fjernet `Math.max/min` | `src/lib/timeScale.ts:95` | nei | – (Ptahhotep havner ytterst) |
| M08 | Avrunding i `toYear` | `round` → `floor` | `src/lib/timeScale.ts:41` | nei | – (`toYear` brukes ikke i `src/`) |
| M09 | Ingen tikk på år 0 | fjernet `if (yr === 0) continue` | `src/lib/timeScale.ts:49` | nei | – |
| M10 | Avlastning mot kollisjon | slått av | `src/lib/layout.ts:176` | ja | `layout.test` › minDistance |
| M11 | Kronologisk sortering i sektor | snudd | `src/lib/layout.ts:103` | nei | – (posisjoner endres, ingen fasit) |
| M12 | Likhet klemt til [0, 1] | fjernet klemming | `src/lib/similarity.ts:47` | nei | ekvivalent for gyldige data (alle verdier ≥ 0) |
| M13 | Forklaring etter størst overlapp | snudd sortering | `src/lib/similarity.ts:146` | ja | `similarity.test` › Sokrates |
| M14 | Topp-matcher synkende | snudd sortering | `src/lib/similarity.ts:220` | ja | `similarity.test` (2 tester) |
| M15 | Lengste idéslekt ved likhet | `>` → `>=` | `src/lib/influence.ts:118` | nei | – |
| M16 | Ingen doble kanter | fjernet sjekk | `src/lib/influence.ts:172` | nei | – |
| M17 | Forfedre via `influencedBy` | byttet til `influences` | `src/lib/influence.ts:50` | ja | `influence.test` › Beauvoir |
| M18 | Shift+Tab fra første går til siste | `last` → `first` | `src/hooks/useDialogFocus.ts:64` | **nei** | – |
| M19 | Tab fra siste går til første | `first` → `last` | `src/hooks/useDialogFocus.ts:67` | ja | bare `use-dialog-focus.test` (1 test) |
| M20 | Fokus tilbake ved lukking | fjernet `.focus()` | `src/hooks/useDialogFocus.ts:77` | ja | `dialog-focus.test` (5 tester) |
| M21 | UU-02: Enter på knapp snur ikke kortet | vakten slått av (`false && …`) | `src/features/exphil/ExphilFlashcardsView.tsx:100` | **nei** | – (`[UU-02]` greper og forblir grønn) |
| M22 | UU-04: stjerner i tidsrekkefølge | fjernet sortering | `src/features/radar/RadarView.tsx:122` | **nei** | – (`[UU-04]` sorterer en kopi) |
| M23 | Søk: prefikstreff først | `-1` → `1` | `src/features/radar/RadarView.tsx:145` | **nei** | – (`[Søk]` tester en kopi) |
| M24 | Samtidige: ikke seg selv | fjernet unntak | `src/features/radar/RadarView.tsx:173` | nei | – |
| M25 | Tidsmaskin: hvem fødes i spranget | `>= from && <= to` → `> to` | `src/features/radar/RadarView.tsx:243` | nei | – |
| M26 | Glimtet fjernes etter 1,4 s (#20) | `return` før fjerning | `src/features/radar/RadarView.tsx:257` | nei | – |
| M27 | URL `?v=` hvitelistes | fjernet `includes` | `src/App.tsx:165` | **nei** | – (`[UU-10]` greper) |
| M28 | Escape lukker dialog | `'Escape'` → `'Esc'` | `src/features/tours/TourSelectModal.tsx:26` | nei | – (Escape testes ingen steder) |
| M29 | UU-06: kontrast | `text-star-dim` → `text-star-dim/50` | `src/features/tours/TourSelectModal.tsx:57` | **nei** | – (`[UU-06]` ser bare etter `/70`) |

Kontroll av bevistestene: med `tests/revisjon-2026-11-17-bevis.test.tsx` på plass blir M21, M22 og M26 fanget av hver sin nye test, og den motsatte endringen av M25 (`>=` → `>` på nedre grense) gjør den røde Kant-testen grønn.

## Funn

### [TST-01] Fem av ni `[UU-xx]`-tester og tre andre tester ville vært grønne om koden de vokter ble fjernet

**Alvorlighet:** Middels · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `tests/ux-and-a11y-fixes.test.ts:24, 42, 71, 80, 112, 119` · `tests/fase9-wow.test.ts:33, 44` · `tests/smoke.test.ts:4, 10`
**Bevis:** Svar på oppdragets spørsmål, test for test:

| Test | Hva den faktisk sjekker | Ville feilet ved reversering? | Bevis |
|---|---|---|---|
| `[UU-09]` `:10` | `lang="nb"` i `index.html` | Ja. Fila *er* artefaktet. | lest |
| `[UU-05]` `:16` | at tre strenger står i `index.css` | Ja ved sletting, nei ved feil selektor eller overstyring | lest |
| `[UU-04]` `:24` | sorterer `philosophers.json` **i testen** og sjekker sin egen sortering | **Nei.** Importerer ikke `RadarView`. | M22 overlever |
| `[Søk & Finn Sokrates]` `:42` | en **kopi** av søkesorteringen fra `RadarView.tsx:132-151` | **Nei.** | M23 overlever |
| `[Søk & Finn Idéer]` `:71` | at Platons data inneholder «hulelignelsen» | Nei (datatest) | lest |
| `[UU-06]` `:80` | at strengen `text-star-dim/70` ikke står i 6 navngitte filer | Nei for `/50`, `/60`, eller andre filer | M29 overlever |
| `[UU-03]` `:97` | at fire `aria-label="…"`-strenger finnes i kildeteksten | Ja ved sletting, nei om attributtet havner på feil element | lest |
| `[UU-02]` `:112` | at `target.tagName === 'BUTTON'` og `'A'` står i fila | **Nei.** Vakten kan slås av uten å røre strengene. | M21 overlever |
| `[UU-10]` `:119` | fire strenger i `App.tsx` | **Nei.** Hvitelisten kan fjernes. | M27 overlever |

I tillegg:
- `fase9-wow.test.ts:44` regner ut 3D-koordinatene med en **kopi** av formelen i `Galaxy3DView.tsx:125-140`. Kopien har allerede glidd fra originalen: testen bruker `?? -400`, komponenten `getStartYear(p)`.
- `fase9-wow.test.ts:33` regner ut «Dagens filosof» med en kopi (`philosophers[42 % length]`), ikke med `DailyPhilosopher.tsx`.
- `smoke.test.ts` sjekker `2 + 2 === 4` og at `-470 < 0`. Den andre heter «år 0 eksisterer ikke», men tester det ikke.
- `UU-07` (berøringsflater) og `UU-08` (`aria-live`) har ingen test.
- Positivt: `[UU-01]` er flyttet til `dialog-focus.test.tsx` og tester oppførsel (M20 fanges av 5 tester).

**Hvorfor det betyr noe:** Dette er nøyaktig mekanismen bak HEL-02: grønne UU-tester mens fokus slapp ut. Mønsteret lever videre for UU-02, UU-04, UU-06 og UU-10. En refaktorering av `RadarView.tsx` (1 345 linjer, helhetsrevisjonen anbefalte å dele den opp) kan bryte tastaturrekkefølgen uten at noe blir rødt.
**Forslag:** Erstatt `[UU-04]` og `[UU-02]` med oppførselstestene i `tests/revisjon-2026-11-17-bevis.test.tsx` (blokkene «Tastaturrekkefølge på radaren» og «Flashcards»). Begge er grønne nå og fanger henholdsvis M22 og M21. Flytt søkerangeringen ut av `RadarView` til en ren funksjon (f.eks. `rankSearchMatches(philosophers, query)` i `src/lib/search.ts`), som også `PhilosopherList` kan bruke, og test den direkte. Trekk galakseformelen ut til `src/lib/galaxy.ts` og test den. Slett `smoke.test.ts` eller la den teste noe ekte. La `[UU-09]`, `[UU-05]` og `[UU-03]` stå, men merk dem som «ser kildetekst, ikke oppførsel».
**Kostnad:** M. To tester er ferdig skrevet; to små utflyttinger med tester.
**Ikke verifisert:** UU-03 er ikke prøvd med en mutasjon som flytter attributtet. UU-06 dekker kontrast bare som strengsjekk; reell kontrast kan bare måles i nettleser (se TST-03).

### [TST-02] Fokusfelle-testene sjekker at fokus er *inne*, ikke *hvor*, og Escape er utestet i alle sju tastaturlyttere

**Alvorlighet:** Middels · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `tests/dialog-focus.test.tsx:101-124` mot `src/hooks/useDialogFocus.ts:62-68`; Escape i `TourSelectModal.tsx:26`, `PhilosopherComparison.tsx:75`, `StoryModal.tsx:200`, `StoryGalleryModal.tsx:57`, `PhilosopherCard.tsx:62`, `TourPlayer.tsx:43`, `RadarView.tsx:627,1101`
**Bevis:**
- M18 (Shift+Tab fra første element går til *første* i stedet for siste) overlever. Testen `holder fokus inne i dialogen med Shift+Tab` (`:115`) sjekker bare `dialog.contains(document.activeElement)`, og det er sant også når fokus står fast.
- M19 (Tab fra siste går til *siste*) fanges bare av én test, `use-dialog-focus.test.tsx`, ikke av noen av de 15 dialogtestene.
- M28 (Escape lukker ikke `TourSelectModal`) overlever. `grep -rn "Escape" tests` gir 0 treff.
- Den nestede regelen «Escape i en historie lukker bare historien, ikke kortet» (`PhilosopherCard.tsx:59-70` sammen med `StoryModal.tsx:200`) er to lyttere på `window` for samme tastetrykk og har ingen test.

**Hvorfor det betyr noe:** En tastaturbruker som trykker Shift+Tab i en dialog, blir stående fast uten at CI merker det. Escape er den vanligste måten å lukke en dialog på, og nestingen (kort + historie) er nettopp der en endring lett lukker begge.
**Forslag:** I `describe.each` i `dialog-focus.test.tsx`: (1) etter Shift+Tab fra første element, `expect(document.activeElement).toBe(siste fokuserbare)`; (2) etter Tab fra siste, `toBe(første)`; (3) Escape kaller `onClose` (send inn `vi.fn()` i stedet for `noop`). I den nestede testen: Escape med historien åpen lukker historien, kortets `onClose` kalles ikke.
**Kostnad:** S. Tre `it` i en eksisterende `describe.each` og én i den nestede.
**Ikke verifisert:** Escape-oppførselen er lest, ikke kjørt.

### [TST-03] «Røyktest 62/62 (`npm run e2e`)» i PLAN.md stemmer ikke: skriptet kjører 8 datatester, og ingen test ser appen i en nettleser

**Alvorlighet:** Middels · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `docs/PLAN.md:67`; `package.json` (`"e2e": "vitest run tests/fase8-validation.test.ts"`); `docs/ARKITEKTUR.md:26`; `CLAUDE.md` (kommandolista nevner `npm run e2e`)
**Bevis:**
- `npm run e2e` → `Tests 8 passed (8)`. Alle åtte leser `philosophers.json` og teller filosofer, tradisjoner og Q-numre.
- Tallet 62 kom fra commit `c2c964c` (2026-09-26), der hele Vitest-suiten hadde 62 tester (talt med `git show c2c964c:<fil> | grep -cE "^\s*(it|test)\("` per fil: 8+4+4+7+13+2+3+8+13). `e2e`-skriptet pekte allerede da på én fil med 8 tester. «62/62» var altså hele enhetssuiten, ikke en røyktest.
- `docs/user-stories/` finnes ikke, så det finnes ingen `US-NNN` å knytte E2E-tester til (krav i `~/.claude/CLAUDE-testing.md`).

**Hvorfor det betyr noe:** Ingenting i CI viser at appen starter, at kodesplittingen (#14) laster dypdykk og historier i et bygget bunt, at CSP-en i `firebase.json` slipper gjennom egne skript, eller at `prefers-reduced-motion` faktisk stopper animasjonene. Det er feil jsdom ikke kan se.
**Forslag:**
1. Rett PLAN.md:67 til det som er sant, og gi `e2e`-skriptet nytt navn (`npm run content-check`) eller fjern det til Playwright finnes.
2. En ekte røyktest bør dekke, mot `vite preview` av det bygde `dist/`:
   - forsiden laster uten konsollfeil, og alle 80 stjerner tegnes (`US-001`);
   - `?f=sokrates` åpner Filosofkortet, og dypdykket lastes (lat chunk) (`US-002`);
   - Tab inn i radaren, Enter på en stjerne, «Les filosofkort», Escape, og fokus tilbake (`US-003`);
   - tidsmaskinen spilles av med `reducedMotion: 'reduce'` uten feil (`US-004`);
   - axe-core uten `serious`/`critical` på forsiden og i kortet (`US-005`).
   Historiene finnes ikke ennå og må skrives først.
3. Minste oppsett: `@playwright/test` med bare Chromium, én fil, egen CI-jobb etter `build`. Repoet er offentlig, så minuttene er gratis (CI-kommentaren i `ci.yml`), og kvoteregelen for private repoer gjelder ikke. Kostnaden er tid: anslått 30–60 s ekstra (nedlasting av Chromium med cache, oppstart av `vite preview`). Det er **ikke målt**.
**Kostnad:** M. Krever B-beslutning for ny dev-avhengighet.
**Ikke verifisert:** Tidsanslaget for Playwright i CI. Jeg installerte ikke Playwright.

### [TST-04] Aksen starter i 650 f.Kr. på seks steder, men to filosofer er født før, og ingen test merker at de flyttes

**Alvorlighet:** Middels · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `src/lib/timeScale.ts:27-28, 84-85`, `src/lib/polar.ts:113-114`, `src/lib/layout.ts:78-79`, `src/features/radar/RadarView.tsx:339, 474-475`, `src/features/network/NetworkView.tsx:84-85`, `src/features/timeline/TimelineView.tsx:58-59`
**Bevis:**
- Data: `ptahhotep` −2400 til −2350 og `gargi` −700 til −640 (node-skript over `src/generated/philosophers.json`).
- Bevistest `Ptahhotep (ca. 2400 f.Kr.) står innenfor Gargi (ca. 700 f.Kr.) på radaren` er rød: `AssertionError: expected 55 to be less than 55`. Begge klemmes til `minRadius`.
- På tidslinjen klemmes begge Ptahhoteps år til −650, så stolpen hans står ved 650 f.Kr. med minstebredden 14 px (`TimelineView.tsx:268`).
- M07 (fjern klemmingen) overlever: da faller −2400 utenfor alle segmentene i `createCompressedScale.toPixel`, funksjonen returnerer `width` (`timeScale.ts:106`), og Ptahhotep havner **ytterst** på radaren blant 1900-tallets filosofer. Alle 170 tester er fortsatt grønne, også `layout.test` › «innenfor yttergrensene».
- Øvre grense er 2025 de samme stedene, mens `CURRENT_YEAR` er 2026 (`years.ts:112`). Tidsmaskinens glider stopper i 2025 (`RadarView.tsx:475`).

**Hvorfor det betyr noe:** Appen handler om *når* filosofene levde. Den eldste filosofen vises 1 750 år for sent, uten at noe sier fra, og en refaktorering av skalaen kan sende ham til nåtiden uten at en test blir rød.
**Forslag:** Først et valg (se åpent beslutningspunkt 1). Uansett valg: ett sted for grensene (`AXIS_MIN_YEAR`/`AXIS_MAX_YEAR` i `src/lib/timeScale.ts`, gjerne avledet av data) og en test som sier at alle filosofer ligger innenfor aksen eller er merket som utenfor, og at `toPixel` aldri returnerer `width` for et år under `minYear`.
**Kostnad:** S for test og konstanter; M hvis aksen skal utvides og ringer/tikk flyttes.
**Ikke verifisert:** Hvordan Ptahhotep ser ut i 3D-galaksen (`Galaxy3DView` klemmer til −800, ikke −650).

### [TST-05] Tidslinjen kan ikke brukes med tastatur, og tidsmaskinens glider har ikke noe navn. Ingen test ville merket noen av delene

**Alvorlighet:** Middels · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `src/features/timeline/TimelineView.tsx:287-295` (stolpene er `<g onClick>` uten `tabIndex`, `role` eller `onKeyDown`); `src/features/radar/RadarView.tsx:472-481` (`<input type="range">` uten `aria-label` eller `aria-valuetext`)
**Bevis:**
- `grep -c "tabIndex\|onKeyDown\|role=" src/features/timeline/TimelineView.tsx` → 0. Samme for `NetworkView.tsx` → 0.
- Bevistest `en filosof kan velges med tastatur (WCAG 2.1.1)` er rød: `expected 0 to be greater than 0` fokuserbare stolper.
- Bevistest `glideren har et tilgjengelig navn (WCAG 4.1.2)` er rød: `Unable to find an accessible element with the role "slider" and name /.+/`. Skjermlesere leser bare tallet, f.eks. «−650», ikke «650 f.Kr.».
- På tidslinjen kan man bare velge filosof med mus. Først når én er valgt, finnes knapper for de samtidige (`:394-396`).

**Hvorfor det betyr noe:** «Hvem levde samtidig?» er kjernen i fase 3, og tidsmaskinen i fase 4. DESIGN.md §7 og CLAUDE.md krever tastatur i alle visninger. Hvorfor dette ikke er Høy, står under «Strøkne funn».
**Forslag:** Stolpene får `role="button"`, `tabIndex={0}`, `aria-label` og Enter/Mellomrom som på radaren (`RadarView.tsx:1083-1105`). Glideren får `aria-label="Tidsmaskin: velg år"` og `aria-valuetext={formatYear(…)}`. Behold de to bevistestene som regresjonstester.
**Kostnad:** S.
**Ikke verifisert:** Skjermleser. Nettverksvisningen er bare grepet, ikke kjørt.

### [TST-06] 11 av 17 mutasjoner i `src/lib` overlever. Grenseår, nålevende og skalaens knekkpunkter er utestet

**Alvorlighet:** Middels · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** se mutasjonstabellen, M01–M17
**Bevis:** Overlevende (uten M01, som er kjent):
- `formatLifeSpan` for nålevende (`years.ts:47`, M04). Grenen brukes av de 3 nålevende filosofene, i kortet, lista, sammenligningen, tidslinjen, Ex.phil-hubben og turene, og har 0 tester. `formatLifeSpan` med `approx` på dødsår har heller ingen test.
- `formatYear(0)` (M03) og år 0 som tikk (M09). Se TST-08.
- Knekkpunktene i den komprimerte skalaen (M06): testene sjekker bare at rekkefølgen holder og at nyere tid får «mer» plass, ikke 35/55/100 %.
- Klemming (M07), se TST-04.
- `getLongestLineage` ved like lange kjeder (M15) og doble kanter i `getNetworkData` (M16).
- `computeRadarLayout` har ingen fasit for posisjoner (M11). Determinismetesten sammenligner to kjøringer med hverandre, ikke med et kjent svar.
- Ekvivalente eller døde: M12 (klemmingen i `cosineSimilarity` slår bare inn ved negative tall, som skjemaet forbyr) og M08 (`toYear` brukes ikke i `src/`, `grep -rn "toYear(" src` gir 0 treff).

Andre kanttilfeller uten test: `checkOverlap` med like start- og sluttår; `getEndYear` for floruit (0 filosofer har floruit i dag, så grenen kjører aldri med ekte data); `getStartYear` når både `born` og `floruit` finnes; `calculateLifespan(-1, -1)` (død samme år).
**Hvorfor det betyr noe:** B-003 sier at «all regning og visning går via `src/lib/years.ts` med tester». Det stemmer for `calculateLifespan`, men ikke for formateringen som brukerne faktisk ser.
**Forslag:** Se «Foreslåtte tester», nr. 3–6. Alle er rene enhetstester.
**Kostnad:** S.
**Ikke verifisert:** Dekningsprosent, fordi `@vitest/coverage-v8` mangler.

### [TST-07] `moveTimeTo` kan testes i jsdom, og testen avdekker at en filosof fødes to ganger når glideren flyttes ett år av gangen

**Alvorlighet:** Lav · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `src/features/radar/RadarView.tsx:243` (`pt.birthYear >= fromYear && pt.birthYear <= nextYear`)
**Bevis:**
- Bevistest `Kant fødes én gang når glideren flyttes 1723 → 1724 → 1725` er rød: `expected "playSupernovaBirth" to be called 1 times, but got 2 times`. Kant (1724) er den eneste filosofen født 1720–1728, så begge kallene gjelder ham. Begge endene i intervallet er inklusive, så den som fødes nøyaktig i `nextYear`, fødes igjen når `nextYear` blir neste `fromYear`.
- Det rammer bruk av glideren med piltaster (steg på 1 år) og alle filosofer med heltallsår. Under avspilling er årene desimaltall, så det treffer sjelden der.
- Med nedre grense `>` (eksklusiv) blir testen grønn (kontrollkjøring N25).
- Svar på oppdragets spørsmål: ja, `moveTimeTo` kan testes uten å endre koden. Oppskriften: `render(<RadarView …/>)`, klikk «Aktiver Tidsmaskin», `fireEvent.change` på glideren (det stopper også `requestAnimationFrame`-løkka via `setIsPlaying(false)`), `vi.spyOn(sound, 'playSupernovaBirth')` og `vi.useFakeTimers()` for 1,4-sekundersglimtet. Regresjonstesten for #20 (`supernova-glimtet forsvinner etter 1,4 s`) er grønn i dag og fanger M26.

**Hvorfor det betyr noe:** Dobbel supernova-lyd og glimt som starter på nytt for samme filosof. Lav effekt, men det er nettopp den typen feil #20 måtte rette for hånd.
**Forslag:** Gjør nedre grense eksklusiv. Behold begge testene. Vurder å trekke «hvem fødes mellom `from` og `to`» ut til en ren funksjon i `src/lib/`, så den kan testes uten DOM.
**Kostnad:** S.
**Ikke verifisert:** Selve avspillingsløkka (`requestAnimationFrame`) er ikke testet. Det krever falsk `rAF`, og verdien er lav.

### [TST-08] År 0 dukker opp i to visninger, i strid med B-003

**Alvorlighet:** Lav · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `src/features/radar/RadarView.tsx:411` (`formatYear(Math.round(currentTime))`) og `src/lib/years.ts:26`; `src/features/timeline/TimelineView.tsx:363` (`endYear - startYear` år)
**Bevis:**
- Bevistest `viser aldri «år 0» når glideren står mellom 1 f.Kr. og 1 e.Kr.` er rød: `expected '0' not to be '0'`. Glideren har `min={-650}`, `max={2025}` og steg 1, så 0 er en gyldig verdi, og den nås hver gang tidsmaskinen spilles forbi Kristi fødsel.
- Bevistest `Seneca (4 f.Kr.–65) vises med 68 år, ikke 69` er rød: `expected 'Levetid: ca. 4 f.Kr. – 65 (69 år)' to contain '(68 år)'`. Tidslinjen trekker fra direkte i stedet for å bruke `calculateLifespan`. Seneca er den eneste i dataene som krysser år 0.
- Samme utregning gir «år» for en stolpe som er strukket til minst 5 år (`TimelineView.tsx:35`), men det rammer ingen i dag.

**Hvorfor det betyr noe:** B-003 er en av prosjektets egne kjerneregler, og appen er et læremiddel om tidsregning.
**Forslag:** Bruk `calculateLifespan` på tidslinjen når både `born` og `died` finnes. Bestem hva `formatYear(0)` skal gjøre (kaste, slik `calculateLifespan` gjør, eller vise «1 f.Kr./1 e.Kr.»), og la glideren hoppe over 0.
**Kostnad:** S.
**Ikke verifisert:** Ingen.

### [TST-09] «Dagens filosof» bytter kl. 01 om sommeren, og logikken kan ikke testes uten å rendre komponenten

**Alvorlighet:** Lav · **Sikkerhet:** Bekreftet · **Merker:** —
**Hvor:** `src/features/daily/DailyPhilosopher.tsx:21-25`
**Bevis:**
- `TZ=Europe/Oslo node -e …` med samme formel: 2026-06-30 12:00 → dag 181, 2026-07-01 00:30 → **181**, 01:30 → 182. I februar (vintertid) bytter dagen ved midnatt.
- Bevistest `bytter filosof ved midnatt også om sommeren (Europe/Oslo)` er rød: `expected 'epikur' not to be 'epikur'`. Kontroll: samme test med 01:30 er grønn, så metoden skiller.
- Årsak: `new Date(år, 0, 0)` ligger i vintertid, og differansen deles på 24 timer. Fra slutten av mars til slutten av oktober er døgnet én time kortere enn utregningen antar.
- Testbarhet: klokka leses direkte med `new Date()` inne i `useMemo`. Testen i `fase9-wow.test.ts:33` regner med en kopi og kan derfor ikke se feilen.

**Hvorfor det betyr noe:** Mellom 00:00 og 01:00 i sommerhalvåret står datoen i kortet som i dag, mens filosofen er fra i går.
**Forslag:** Trekk ut `getDailyPhilosopherIndex(date: Date, count: number)` til `src/lib/daily.ts`. Regn dagnummer fra kalenderdato (`Date.UTC(y, m, d)` mot `Date.UTC(y, 0, 1)`), ikke fra millisekunder lokalt. Test vinter, sommer, 31. desember og skuddårets 29. februar.
**Kostnad:** S.
**Ikke verifisert:** Ingen.

### [TST-10] En sirkel i `influencedBy` slipper gjennom valideringen og krasjer nettverksvisningen

**Alvorlighet:** Lav · **Sikkerhet:** Bekreftet · **Merker:** Latent
**Hvor:** `scripts/build-content.ts:92` (`if (inflYear > pYear)`, altså er likt år lov); `src/lib/influence.ts:103-126` (`dfs` uten besøkt-mengde)
**Bevis:**
- Bevistest `getLongestLineage tåler en sirkel i påvirkningene` er rød: `RangeError: Maximum call stack size exceeded`.
- Ende til ende i arbeidstreet: la til `"kant"` i `content/philosophers/kant.json` sitt `influencedBy` → `npm run validate` sier «✅ Alle 80 filosofer er gyldige!» → `npx tsx scripts/find-lineage.ts` gir `RangeError`. Tilbakestilt med `git checkout`, og `src/generated/` er bygget på nytt.
- Samme gjelder to filosofer født samme år som peker på hverandre. Det finnes 4 slike årsgrupper i dataene (`-470`, `1632`, `1813`, `1905`).
- `NetworkView.tsx:45` kaller `getLongestLineage` i `useMemo`, så visningen ville falt til `ErrorBoundary`.
- Latent: dagens data har ingen sirkel (`fase8-validation` og `influence.test` er grønne).

**Hvorfor det betyr noe:** Én skrivefeil i en innholdsfil tar ned en hel visning, og ingen test fanger det før produksjon.
**Forslag:** Avvis selvreferanse og sirkler i `build-content.ts` (et topologisk sorteringssteg). Gi `dfs` en `visiting`-mengde. Trekk valideringen ut av skriptet til en ren funksjon (`validateRelations(philosophers): string[]`), så den kan enhetstestes. I dag kan den bare prøves ved å endre innholdsfiler.
**Kostnad:** S.
**Ikke verifisert:** Ingen.

## Mistanker som bør undersøkes

1. **Tre kopier av startår-regelen med tre ulike reserveverdier.** `getStartYear` kaster (`years.ts:89-93`), `getBirthYear` returnerer `-400` (`layout.ts:31-35`), og `build-content.ts:90-91`, `fase8-validation.test.ts:42,47` og `ux-and-a11y-fixes.test.ts:26-37,61-62` bruker `?? 0`. Latent fordi skjemaet krever `born` eller `floruit`. #19 rettet visningene, men ikke disse. *Lav.*
2. **B-008 sier «16 iterasjoner» og «garantert synlig separasjon».** Koden har 32 iterasjoner (`layout.ts:165`) og hopper over par med avstand ≤ 0,001 (`:176`), så to punkter som starter på nøyaktig samme sted, skilles aldri. `offsetMultipliers` har 7 verdier (`:118`), så klyngeindeks 0 og 7 får samme vinkel og radius. Ikke truffet med dagens data (`layout.test` er grønn). *Lav.*
3. **Bortfiltrerte stjerner kan fortsatt nås med Tab.** `tabIndex` styres bare av `isUnborn` (`RadarView.tsx:1084`), ikke av `isMatches`. Med et filter på én tradisjon tabber man fortsatt gjennom 80 stjerner. Ikke sjekket mot DESIGN-kravet. *Lav–Middels.*
4. **`CURRENT_YEAR` leses én gang når modulen lastes** (`years.ts:112`). En fane som står åpen over nyttår, regner med fjoråret. `getEndYear` tar heldigvis året som parameter, så testene er deterministiske. *Lav.*
5. **`quizExport.ts` (275 linjer, Canvas) har ingen test.** Løftet i fase 7 er «ingenting lagres eller sendes». Det er ikke verifisert at funksjonen ikke gjør nettverkskall. *Lav.*

## Strøkne funn

1. **«Tidslinjen uten tastatur er Høy (WCAG 2.1.1 i en kritisk flyt)».** Nedjustert til Middels (TST-05): samme funksjon («hvem levde samtidig») finnes på radaren, der stjernene kan velges med Tab og Enter og de samtidige lyser opp, og tabellvisningen er et tilgjengelig alternativ til selve tidsaksen. Bruddet er reelt, men brukeren har en vei.
2. **«Glideren uten navn er Høy».** Nedjustert til Middels: glideren kan betjenes med tastatur, og teksten «650 f.Kr.» og «2025 e.Kr.» står rett ved siden av. Feilen gjelder navn og verditekst, ikke betjening.
3. **«Den globale `openDialogs`-lista i `useDialogFocus` gir lekkasje mellom tester».** Avkreftet: `afterEach` kaller `cleanup()`, som avmonterer og fjerner dialogene fra lista. 3 av 3 kjøringer grønne og ingen rekkefølgeavhengighet observert.
4. **«Enter på en radarstjerne åpner ikke kortet, i strid med DESIGN.md §7».** Ikke et testfunn: `79ee51c` skilte bevisst «Se på radaren» fra «Les filosofkort». Det står som åpent beslutningspunkt 2.

## Det som er bra og bør bevares

1. **`dialog-focus.test.tsx`**: `describe.each` over alle fem dialogene, med en kontroll som hindrer falsk grønn («uten denne sjekken ville testen vært grønn …», `:130`), og en egen test for nestede dialoger. Fanger M20 med 5 tester.
2. **`getEndYear(p, currentYear)` tar året som parameter.** Det er riktig søm mot klokka, og den gjør `lifespan.test.ts` deterministisk.
3. **Matten i `src/lib` er rene funksjoner uten DOM.** Det er derfor de fleste kanttilfellene i TST-06 kan legges til som korte enhetstester.
4. **Ingen tilfeldighet i layout eller tester** (`grep -rn "Math.random" src tests` gir bare stjernestøvet i galaksen, som lages én gang).
5. **jsdom per fil (`// @vitest-environment jsdom`)**: resten av suiten kjører i Node og er rask. Bevistestene for radar, tidslinje og tidsmaskin kjører på ca. 1 s for 11 tester.

## Lette etter, fant ikke

- **Ustabile tester:** 3 + 3 kjøringer, alle grønne (170/170).
- **`.skip`, `.only`, `.todo`:** 0 (filteret er kontrollert).
- **Tester som avhenger av nettverk:** 0. `telemetry.test.ts` stubber `window.goatcounter`.
- **Tester som avhenger av klokka uten falsk klokke:** 0. `CURRENT_YEAR` brukes ikke i testene; `lifespan.test.ts` sender inn 2026.
- **Snapshot-tester:** 0 (`grep -rn "toMatchSnapshot\|toMatchInlineSnapshot" tests` → 0).
- **Mocking av det som testes:** 0. Det som finnes, er stubbing av `sound` og `goatcounter`.
- **Om jsdom holder til tastaturflyt på radaren:** ja. En prøvetest med `userEvent.tab()` 40 ganger landet på SVG-stjernene (`<g role="button" tabindex="0">`) 32 ganger, på ca. 2 s. Prøvetesten er slettet.
- **Om `[UU-09]` og `[UU-05]` lyver:** nei. De leser selve artefaktene (`index.html`, `index.css`), og det er det rette nivået for dem.

## Åpne beslutningspunkter

### Åpent beslutningspunkt: Hva skal skje med filosofer før 650 f.Kr. på aksen?
Klassifisering: prosjektintern.
Innstilling: utvid aksen i den komprimerte skalaen til å starte ved den eldste filosofen (−2400), med et eget kort segment for 2400–650 f.Kr. (f.eks. 5 % av bredden), og behold −650 som start i lineær skala med en tydelig «← eldre»-markør. Det hviler på at appens kjerne er *når* filosofene levde (PRD), og at Ptahhotep i dag vises 1 750 år for sent. Alternativet er å beholde klemmingen bevisst og loggføre den i BESLUTNINGER.md, med en test som låser det.

### Åpent beslutningspunkt: Skal Enter på en radarstjerne åpne kortet?
Klassifisering: prosjektintern.
DESIGN.md §7 sier «Enter åpner kortet». Koden velger stjernen og viser hurtigkortet under radaren (`RadarView.tsx:1096-1100`), etter `79ee51c`. Innstilling: oppdater DESIGN.md til dagens oppførsel og skriv en test for den. Da stemmer spesifikasjon, kode og test.

### Åpent beslutningspunkt: Playwright nå eller senere?
Klassifisering: prosjektintern (ny dev-avhengighet, B-beslutning).
Innstilling: senere, etter at UU-testene er flyttet til jsdom (TST-01, TST-02, TST-05, TST-07). jsdom dekker fokus, Tab, Enter, Escape, glideren og tidsmaskinens tidtakere på ca. 1 s. Playwright trengs for det jsdom ikke ser (CSS-synlighet, `prefers-reduced-motion`, kontrast via axe, CSP, lat lasting i bygget). Det er nok med én røyktestfil på 5 scenarioer (TST-03).

## Foreslåtte tester, prioritert etter risiko

| # | Navn | Nivå | Feil den ville fanget | US |
|---|---|---|---|---|
| 1 | `tests/radar-keyboard.test.tsx` › «stjernene kommer i kronologisk Tab-rekkefølge» (finnes i bevisfila) | komponent (jsdom) | M22, UU-04-regresjon | – |
| 2 | `tests/dialog-focus.test.tsx` › «Shift+Tab fra første går til siste», «Tab fra siste går til første», «Escape kaller onClose», «Escape i historien lukker bare historien» | komponent | M18, M19, M28 | – |
| 3 | `tests/years.test.ts` › `formatLifeSpan` for nålevende («f. 1944»), med `approx` på dødsår, og `formatYear(0)` | enhet | M03, M04 | – |
| 4 | `tests/timeScale.test.ts` › knekkpunkter (500 e.Kr. = 35 %, 1500 = 55 %), år under `minYear` gir 0 (ikke `width`), ingen tikk på år 0 | enhet | M06, M07, M09 | – |
| 5 | `tests/time-machine.test.tsx` › «Kant fødes én gang» og «glimtet forsvinner etter 1,4 s» (finnes i bevisfila) | komponent | M25, M26, TST-07 | – |
| 6 | `tests/influence.test.ts` › sirkel og selvreferanse, like lange kjeder, doble kanter | enhet | TST-10, M15, M16 | – |
| 7 | `tests/flashcards-keyboard.test.tsx` › «Enter på en knapp snur ikke kortet» (finnes i bevisfila) | komponent | M21, UU-02-regresjon | – |
| 8 | `tests/search.test.ts` › rangering etter utflytting til `src/lib/search.ts` (eksakt treff, så prefiks, så årstall; «Ødegård»/«Næss» med æøå) | enhet | M23 | – |
| 9 | `tests/radar-contemporaries.test.tsx` › «valgt filosof er ikke sin egen samtidige», «Angela Davis og Judith Butler lyser for hverandre» | komponent | M24 | – |
| 10 | `tests/timeline.test.tsx` › «stolpene kan velges med tastatur», «Seneca 68 år» (finnes i bevisfila) | komponent | TST-05, TST-08 | – |
| 11 | `tests/daily.test.ts` › dagnummer vinter, sommer 00:30, 31.12., 29.02. | enhet | TST-09 | – |
| 12 | `tests/app-routing.test.tsx` › ukjent `?v=` og `?f=` gir forsiden | komponent | M27 | – |
| 13 | `e2e/smoke.e2e.ts` › forside, `?f=sokrates`, tastaturflyt, tidsmaskin med redusert bevegelse, axe | E2E (Playwright) | TST-03, lat lasting, CSP | US-001–US-005 (må skrives) |

## Testene jeg skrev for å bevise funn

Ligger i arbeidstreet og er **ikke committet** (bare rapporten er committet):

- `C:/Dev/filosofradar-rev-test/tests/revisjon-2026-11-17-bevis.test.tsx`: 11 tester. 8 er røde av grunnene i TST-04, TST-05, TST-07, TST-08, TST-09 og TST-10, og 3 er grønne regresjonstester for UU-04, UU-02 og #20. Typecheck og lint er grønne for fila. Med fila på plass gir `npx vitest run` 8 røde og 173 grønne av 181.

## Forslag til endringsordrer

1. **PR `test/uu-oppforsel`** (TST-01, TST-02): erstatt `[UU-04]` og `[UU-02]` med oppførselstester, legg Shift+Tab-, Tab- og Escape-sjekker inn i `dialog-focus.test.tsx`, og slett eller erstatt `smoke.test.ts`. Ca. 150 linjer.
2. **PR `fix/tidsmaskin-og-tidslinje-tastatur`** (TST-05, TST-07, TST-08): eksklusiv nedre grense i `moveTimeTo`, navn og verditekst på glideren, tastatur på tidslinjen, `calculateLifespan` på tidslinjen og ingen år 0 i glideren. Med testene fra bevisfila. Ca. 150 linjer.
3. **PR `test/lib-kanttilfeller`** (TST-06, TST-10): enhetstestene 3, 4 og 6, sirkelvern i `dfs` og `validateRelations` trukket ut av `build-content.ts`. Ca. 200 linjer.
4. **PR `refactor/sok-og-dagens-filosof`** (TST-01 søk, TST-09): `src/lib/search.ts` og `src/lib/daily.ts` med tester, og galakseformelen ut av komponenten. Ca. 200 linjer.
5. **Beslutning + PR `fix/aksens-grenser`** (TST-04): etter beslutningspunkt 1.
6. **PR `docs/roktest-sannhet`** (TST-03): rett PLAN.md:67, gi `e2e`-skriptet nytt navn, oppdater CLAUDE.md og ARKITEKTUR.md. Senere: B-beslutning og PR for Playwright-røyktest med 5 brukerhistorier.

Ingen av ordrene er i fredet klasse.

## Anbefalt neste revisjon

**05 — UI/UX og UU**, omfang tidslinjen, nettverksvisningen og tidsmaskinen, med nettleser og axe-core. Lim inn i «Særlig bekymret for»:
- Tidslinjen og nettverket har 0 tastaturhåndterere (TST-05). Er det flere visninger som bare kan brukes med mus?
- Kan bortfiltrerte stjerner nås med Tab (mistanke 3), og er det akseptabelt med 80 tab-stopp på radaren uten piltastnavigasjon?
- Holder `prefers-reduced-motion` for tidsmaskinens `requestAnimationFrame`-løkke, som CSS-overstyringen i `index.css` ikke når?
