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
