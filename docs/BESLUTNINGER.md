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
Kontekst: Arbeidstittelen i PRD var «Filosofradaren». Olai vurderte alternativer som «Tankekartet», «Ideon» og «Filosfæren».
Beslutning: Appen skal hete «Filosofradaren».
Alternativer: Tankekartet, Ideon, Filosfæren, TankeRadar.
Konsekvens: Arbeidstittelen stadfestes som offisielt appnavn. Brukes i UI, tittellinje og dokumentasjon.

## B-006 – Visuell stil: Observatoriet (2026-09-25)
Kontekst: Tre klikkbare konseptskisser ble bygget i `docs/skisser/` (Sonar, Observatoriet, Pergament) og testet i nettleseren.
Beslutning: Olai valgte stilen «Observatoriet».
Alternativer: Sonar (retro CRT/ubåt-radar i grønt), Pergament (gammelt sjøkart i varme papirtoner).
Konsekvens: UI designes med dyp nattblå/kosmisk bakgrunn, stjernehvite glødende punkter, gylne sirkler og baner, celestial glassmorphism og elegant serif-typografi til overskrifter.

## B-007 – Prioriterte animasjoner og topp 5 favorittfilosofer (2026-09-25)
Kontekst: Fastsette kjerneopplevelsen og første innholdspulje tilpasset Olais interesser for læring av animasjon, design og webutvikling.
Beslutning: 
1. Tidsmaskinen implementeres med et energisk «supernova»-lysglimt (glitrende puls) idet filosofer blir født langs tidslinjen.
2. Påvirkningsnettverket visualiseres med elegante, gylne stjernebilder/konstellasjonsbuer.
3. Olais topp 5 favoritter settes til: Hypatia av Alexandria, Sokrates, Arne Næss, Buddha (Siddhartha Gautama) og Marcus Aurelius.
Alternativer: Myk innfading ved fødsel; stjernestøv/stjerneskudd for nettverk.
Konsekvens: De fem filosofene gis hedersplass øverst i `docs/INNHOLD.md` og implementeres først i Fase 2 for testing av tidsmaskin og stjernebilder.
