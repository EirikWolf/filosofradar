# Faseplan – Filosofradaren

⬜ ikke startet · 🟨 pågår · ✅ ferdig. En fase er ferdig når alle kriterier er oppfylt og `npm run check` er grønn.
Hver fase avsluttes med minst én «Din tur»-oppgave.

---

## Fase 0 – Idéverksted ✅
- [x] Navn, visuell stil og favorittfilosofer valgt (prompt B)
- [x] Tre konseptskisser i `docs/skisser/`, én valgt
- [x] PRD, DESIGN og INNHOLD oppdatert; valg loggført
- [x] Firebase-prosjekt konfigurert lokalt (`firebase.json` og `.firebaserc`)

## Fase 1 – Skjelett og første publisering ✅
- [x] `git init`, `.gitignore`, Vite + React + TS strict, Tailwind, ESLint, Prettier, Vitest
- [x] npm-skript fra ARKITEKTUR.md (foreløpig tomme der det trengs), `npm run check` virker
- [x] Tema (farger, font) fra valgt stil som CSS-variabler
- [x] Forside med appnavn og en enkel animert sveipestråle (kun pynt ennå)
- [x] Firebase-oppsett og produksjonsbygg (`npm run build`) testet lokalt
- 🎯 Din tur: endre sveipens farge og hastighet

## Fase 2 – Data og innhold ✅
- [x] Zod-skjema etter DATAMODELL.md; `build-content` og `validate` med alle regler
- [x] `src/lib/years.ts` med tester (f.Kr./e.Kr., ingen år 0, overlapp)
- [x] `scripts/wikidata.ts`: henter fødsel/død for alle Q-numre og rapporterer avvik
- [x] De 20 ★-filosofene i INNHOLD.md skrevet, validert, Olai har godkjent topp 5
- [x] Listevisning (søkbar tabell) som første ekte side
- 🎯 Din tur: skriv én filosof helt selv og få valideringen grønn

## Fase 3 – Tidslinjen ✅
- [x] `timeScale.ts` (lineær og komprimert) med tester
- [x] Horisontal tidslinje: levetid som stolper per tradisjon, akse med f.Kr./e.Kr.
- [x] Zoom/panorering (mus og touch)
- [x] «Hvem levde samtidig?»: velg én → overlappende fremheves
- 🎯 Din tur: finn ut hvem av filosofene som levde lengst – i koden, ikke ved å lete

## Fase 4 – Radaren ✨ ✅
- [x] `polar.ts` og `layout.ts` med tester (år + tradisjon → x,y; deterministisk spredning, ingen overlapp)
- [x] Ringer per århundre, sektorer med etiketter, punkter for alle filosofer
- [x] Sveipestråle med glød på passerte punkter (60 fps på mobil)
- [x] Tidsmaskin: glider, ▶/⏸, 1×/2×/4×, fødsel-puls og demping ved død, stort årstall
- [x] Bryter komprimert/lineær skala med forklaring
- [x] Pek/hold → etikett + samtidige lyser; klikk → velger filosof (kort kommer i fase 5)
- [x] Filter på tradisjon, tema og søk; bortfiltrerte tones ned
- [x] `prefers-reduced-motion` respektert; tastaturnavigasjon mellom punkter
- [x] Radaren er forsiden; publisert til forhåndsvisning
- 🎯 Din tur: regn ut for hånd hvor Sokrates skal stå (x, y), og sjekk i appen

## Fase 5 – Filosofkort og sammenligning ⬜
- [ ] Filosofkort etter DESIGN.md §5 (glir inn; ark på mobil); URL `?f=id`
- [ ] Temaradar (edderkoppdiagram) som gjenbrukbar komponent, animert inn
- [ ] Sammenlign 2–3 filosofer: overlagte temaradarer + levetid på felles akse
- [ ] Portretter med lisenskreditering der de finnes
- 🎯 Din tur: legg til en niende akse i temaradaren på en egen git-gren – og se hva som skjer

## Fase 6 – Påvirkningsnett ⬜
- [ ] `influence.ts`: omvendte lenker, idéslekt bakover/fremover, med tester
- [ ] Animerte buer på radaren når en filosof er valgt
- [ ] Egen nettverksvisning med `d3-force`, dra i noder, tidsakse som svak kraft
- [ ] Minst 40 påvirkningslenker i innholdet
- 🎯 Din tur: finn den lengste idéslekten i dataene

## Fase 7 – «Hvilken filosof ligner du på?» ⬜
- [ ] 10–12 spørsmål, hvert koblet til temaer med vekter (i JSON, ikke hardkodet)
- [ ] `similarity.ts` (cosinuslikhet) med tester og forklaring i koden
- [ ] Brukerens temaradar vokser mens man svarer; resultat med topp 3, prosent og begrunnelse
- [ ] Last ned resultat som PNG; ingenting lagres eller sendes
- 🎯 Din tur: lag to egne spørsmål og test at de påvirker resultatet slik du tror

## Fase 8 – Innhold, kvalitet og lansering ⬜
- [ ] 70+ filosofer, alle tradisjoner, minst 10 kvinner, 5 nordiske; alle `reviewed: true`
- [ ] `/faktasjekk` uten feil
- [ ] Om-side: metode, temaprofiler er skjønn, kilder og bildelisenser
- [ ] Klasseromsmodus (stor tekst, autoavspilling)
- [ ] Lighthouse ≥ 90 på ytelse, tilgjengelighet og beste praksis; Playwright-røyktest grønn
- [ ] Delbare lenker med forhåndsvisningsbilde (Open Graph)
- [ ] `/publiser` til produksjon 🎉
- 🎯 Din tur: vis appen til tre venner og noter hva de klikker på først

## Fase 9 (valgfri) – Ekstra wow ⬜
Velg én eller flere: 3D-«galakse» med Three.js · lydlandskap som følger tidsmaskinen ·
«dagens filosof» på forsiden · engelsk versjon.

## Fase 10 (valgfri) – «Spør filosofen» ⬜
Krever Blaze-plan, Cloud Functions og API-nøkkel (Asbjørns eller Olais, lagret som Firebase secret – aldri i koden).
- [ ] Budsjettvarsel og hard grense satt; antall spørsmål per besøk begrenset
- [ ] Svarene er tydelig merket som AI-simulering, bygger på filosof-filen, og er alderstilpasset
- [ ] Beslutning om dette er verdt kostnaden loggført
