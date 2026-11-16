# Beslutningslogg

```
## B-NNN – Tittel (ÅÅÅÅ-MM-DD)
Kontekst · Beslutning · Alternativer · Konsekvens
```

---

## B-001 – Statisk app uten backend
Kontekst: Første prosjekt for en nybegynner; skal være gratis og trygt å drifte.
Beslutning: Alt innhold som JSON i repoet, bygget inn i en statisk app på Firebase Hosting.
Alternativer: Firestore med admin-grensesnitt; headless CMS.
Konsekvens: Innhold endres med commits (bra for læring og historikk). Ingen persondata, ingen innlogging.

## B-002 – React tegner SVG, D3 regner
Kontekst: D3 og React vil begge styre DOM-en.
Beslutning: D3 brukes til skalaer, former og simulering; React rendrer alle elementer.
Konsekvens: Enklere å forstå og teste. Bytt punktlaget til canvas hvis ytelsen krever det.

## B-003 – Negative heltall for f.Kr., intet år 0
Kontekst: Årstall før og etter Kristi fødsel må kunne sammenlignes og vises riktig.
Beslutning: −470 = 470 f.Kr. All regning og visning går via `src/lib/years.ts` med tester.
Konsekvens: Levetid over årsskiftet 1 f.Kr./1 e.Kr. krever spesialhåndtering – dekket av tester.

## B-004 – Temaprofiler er redaksjonelt skjønn
Kontekst: «Hvor opptatt var X av etikk» har ingen fasit.
Beslutning: 0–5 per tema, begrunnet i `themeNotes`, og forklart åpent på Om-siden.
Konsekvens: Quizresultatet presenteres som en lek, ikke en sannhet.

## B-005 – Navn: Filosofradaren (2026-09-25)
Kontekst: Arbeidstittelen i PRD var «Filosofradaren». Alternativer som «Tankekartet», «Ideon» og «Filosfæren» ble vurdert.
Beslutning: Appen skal hete «Filosofradaren».
Alternativer: Tankekartet, Ideon, Filosfæren, TankeRadar.
Konsekvens: Arbeidstittelen stadfestes som offisielt appnavn. Brukes i UI, tittellinje og dokumentasjon.

## B-006 – Visuell stil: Observatoriet (2026-09-25)
Kontekst: Tre klikkbare konseptskisser ble bygget i `docs/skisser/` (Sonar, Observatoriet, Pergament) og testet i nettleseren.
Beslutning: Stilen «Observatoriet» ble valgt.
Alternativer: Sonar (retro CRT/ubåt-radar i grønt), Pergament (gammelt sjøkart i varme papirtoner).
Konsekvens: UI designes med dyp nattblå/kosmisk bakgrunn, stjernehvite glødende punkter, gylne sirkler og baner, celestial glassmorphism og elegant serif-typografi til overskrifter.

## B-007 – Prioriterte animasjoner og topp 5 favorittfilosofer (2026-09-25)
Kontekst: Fastsette kjerneopplevelsen og første innholdspulje, med vekt på læring av animasjon, design og webutvikling.
Beslutning: 
1. Tidsmaskinen implementeres med et energisk «supernova»-lysglimt (glitrende puls) idet filosofer blir født langs tidslinjen.
2. Påvirkningsnettverket visualiseres med elegante, gylne stjernebilder/konstellasjonsbuer.
3. Topp 5 favoritter settes til: Hypatia av Alexandria, Sokrates, Arne Næss, Buddha (Siddhartha Gautama) og Marcus Aurelius.
Alternativer: Myk innfading ved fødsel; stjernestøv/stjerneskudd for nettverk.
Konsekvens: De fem filosofene gis hedersplass øverst i `docs/INNHOLD.md` og implementeres først i Fase 2 for testing av tidsmaskin og stjernebilder.

## B-008 – Radarens geometri: fødselsår og deterministisk 2D-avlastning (2026-09-26)
Kontekst: DESIGN.md åpnet for å velge mellom fødselsår eller midten av levetiden for radarens radius, samt metode for å hindre at filosofer i samme epoke krasjer.
Beslutning:
1. Radius settes etter fødselsår (eller start på floruit).
2. Vinkel settes etter tradisjonssektor (9 sektorer à 40°) i historisk-geografisk rekkefølge.
3. Kollisjoner unngås deterministisk med alternerende viftevinkler og svak radial forskyvning (16 iterasjoner 2D-relaxation).
Alternativer: Midtpunkt i levetiden; tilfeldig Math.random()-spredning; kun vinkelspredning uten radial forskyvning (ga overlapp i trange antikk-klynger).
Konsekvens: Tidsmaskinen fungerer intuitivt: når tidsringen treffer punktets radius, fødes filosofen med supernova-puls. Alle 21 stjerner (og framtidige 70+) har garantert synlig separasjon.

## B-009 – Komponenttester med jsdom og Testing Library (2026-11-16)
Kontekst: Helhetsrevisjonen 2026-11-16 (HEL-02) fant at fire dialoger slapp tastaturfokus ut bak seg, selv om alle UU-testene var grønne. Testene leste bare kildekoden og så etter tekst, så de kunne ikke se hvor fokus faktisk havnet.
Beslutning: Ta inn `jsdom`, `@testing-library/react`, `@testing-library/dom` og `@testing-library/user-event` som dev-avhengigheter. Komponenttester slår på jsdom per fil med `// @vitest-environment jsdom`; resten av testene kjører fortsatt i Node. Felles fokuslogikk for dialoger ligger i `src/hooks/useDialogFocus.ts`.
Alternativer: Playwright (tyngre, krever nettleser i CI); happy-dom (lettere, men dårligere støtte for fokus og tastatur); fortsette med grep-tester (fanger ikke oppførsel).
Konsekvens: Dialoger testes nå på oppførsel: fokus inn, fokusfelle og fokus tilbake (`tests/dialog-focus.test.tsx`). Ingen påvirkning på det som lastes ned av brukerne, fordi alt er dev-avhengigheter.

## B-010 – Sitatregelen gjelder også dypdykk, Ex.phil, dilemmaer og turer (2026-11-16)
Kontekst: Helhetsrevisjonen 2026-11-16 (HEL-01) fant rundt 59 sitater uten kilde i TypeScript-filene for dypdykk, Ex.phil, dilemmaer og turer. Disse filene går ikke gjennom filosof-skjemaet, så sitatregelen i CLAUDE.md ble ikke håndhevet der. Samme sitat hadde også ulik ordlyd forskjellige steder.
Beslutning: Regelen «et sitat må ha verk og kilde» gjelder fullt ut i dypdykk, Ex.phil, dilemmaer og turer. I fortellingene (`storyData.ts`) er diktede replikker lov, men ekte sitater følger regelen. Håndheves med et sitatregister (`content/quotes/quote-register.json`) og en vakt-test (`tests/quote-guard.test.ts`). Sitater som manglet kilde da vakten kom, står på en liste som bare kan krympe (tak 59).
Alternativer: Flytte alt innholdet inn i `content/` med eget Zod-skjema (riktig på sikt, men stort); kildefelt per objekt i datafilene (sitatene står midt i løpende tekst, så det passer dårlig); unntak for alt utenom filosof-filene (avvist).
Konsekvens: Et nytt sitat uten kilde stopper `npm run check`. De 59 eksisterende rettes redaksjonelt, ett og ett. Fortellingene er ikke med i vakten ennå, fordi det først må avgjøres hvilke «…» der som er ekte sitater.

## B-011 – Besøksstatistikk med GoatCounter (2026-11-16, loggført i ettertid)
Kontekst: Prosjekteier ville vite hvor mange som bruker appen og hvilke deler som brukes, uten å bryte løftet om ingen innlogging og ingen sporingskapsler. GoatCounter ble tatt inn i `6155809` uten at beslutningen ble loggført. Helhetsrevisjonen 2026-11-16 (mistanke 4) påpekte det.
Beslutning: GoatCounter (`filosofradar.goatcounter.com`) teller sidevisninger og to hendelser (guidet tur startet, quiz fullført). Skriptet lastes fra `gc.zgo.at`, og CSP-en tillater bare det domenet i tillegg til egne filer. Ingen svar fra quizen sendes.
Alternativer: Ingen statistikk (vet ikke om noen bruker appen); Google Analytics (sporingskapsler og samtykkebanner); Plausible (betalt); egen innsamling via Firebase (krever backend, i strid med B-001).
Konsekvens: Appen gjør ett eksternt kall ved kjøring. GoatCounter er databehandler og står i `docs/databehandlere.md`. Om-siden og README beskriver hva som samles inn. Flåtefasiten (ADR 0052) har ingen rad for webanalyse, så valget er prosjektlokalt.

## B-012 – KI-genererte illustrasjoner uten merking (2026-11-16)
Kontekst: 48 illustrasjoner til tankeeksperimentene (`public/images/hooks/`) er generert på kitor. Bilderegelen i `CLAUDE.md` sa «Bilder kun fra Wikimedia Commons», og helhetsrevisjonen (mistanke 5) pekte på motsigelsen.
Beslutning (Eirik): Illustrasjonene beholdes og merkes ikke. Bilderegelen gjelder portretter av ekte personer, som fortsatt bare hentes fra Wikimedia Commons med fri lisens og kreditering.
Alternativer: Merke hvert bilde som KI-generert; bytte til bilder fra Commons; fjerne illustrasjonene.
Konsekvens: `CLAUDE.md` er presisert. Nye illustrasjoner kan genereres uten merking. Portretter følger den gamle regelen.

## B-013 – ESLint 10 og React Compiler-reglene (2026-11-16)
Kontekst: Dependabot-PR #8 hevet `@eslint/js` til 10 mens `eslint` sto på 9. `@eslint/js` 10 krever `eslint` 10, så `main` hadde en ugyldig avhengighetskombinasjon som bare virket fordi låsefila var godtatt. Dependabot-PR #9 (`eslint-plugin-react-hooks` 7) slår på React Compiler-reglene og var rød med 13 funn.
Beslutning: Løft `eslint` til 10 og `eslint-plugin-react-hooks` til 7. Rett funnene i koden:
- Stjernestøvet i galaksen lages én gang i stedet for med `Math.random()` under rendring.
- Fokus fra guidet tur og nullstilling av flashcards gjøres uten `setState` i effekt.
- Supernova-glimtet utløses der tiden endres, ikke i en effekt. Det retter også at glimtene ble liggende mens tidsmaskinen spilte.

`react-hooks/preserve-manual-memoization` slås av, fordi React Compiler ikke brukes i bygget og regelen bare melder at kompilatoren ville hoppet over en komponent. Dependabot-gruppen `byggkjede` tar bare minor- og patch-oppdateringer. Store versjonshopp (Vite 8, Tailwind 4) kommer som egne PR-er.
Alternativer: Slå av alle de nye reglene (skjuler reelle mønstre); rulle `@eslint/js` tilbake til 9 (utsetter problemet); ta Vite 8 og Tailwind 4 nå (store migreringer uten plan).
Konsekvens: Lint-verktøyene er konsistente. Slås React Compiler på senere, må regelen slås på igjen og memoiseringen i `StoryModal` ryddes.
