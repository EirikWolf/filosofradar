# 🌌 Filosofradaren

> **Filosofiens historie som et levende stjernekart**  
> Utforsk over 2500 år med idéhistorie. 80 filosofer fra 9 globale tradisjoner visualisert som stjerner i et interaktivt observatorium.

[![Live Demo](https://img.shields.io/badge/Live-filosofradar.web.app-gold?style=for-the-badge&logo=firebase)](https://filosofradar.web.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Tests](https://img.shields.io/badge/Tests-86%20passed-success?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🧭 Hva er Filosofradaren?

Filosofradaren er et moderne, pedagogisk læringsverktøy og utforskningsunivers for filosofi, idéhistorie og studenter som forbereder seg til **examen philosophicum (ex.phil)**. 

Gjennom visuell matematikk (polarkoordinater, tidslinjer, kraftsimulerte påvirkningsnett og en 3D-galakse) kobles tenkere på tvers av tid, geografi og tankeretninger.

### Sentrale funksjoner:
* **📡 Polar radarnavigasjon & Tidsmaskin:** Utforsk hvem som levde samtidig fra 600 f.Kr. til i dag. Spill av historien og se tenkere fødes og dempes i sanntid.
* **🪐 3D-galakse:** Perspektivprojeksjon av filosofiene som et kosmisk stjernekart med konstellasjonslinjer.
* **🕸️ Påvirkningsnettverk:** Kraftsimulering (`d3-force`) som viser hvordan idéer har vandret mellom filosofer gjennom årtusener.
* **🎓 Ex.phil Studie-Hub:**
  * **Eksamensradar:** Pensumrelevans, sensors nøkkelord, typiske eksamensfeller og faktiske eksamensoppgaver for sentrale Ex.phil-tenkere.
  * **Interaktive Flashcards:** Flervalgsquiz med pedagogiske begrunnelser.
  * **Debattarena:** Sett filosofer opp mot hverandre i klassiske filosofiske dilemmaer (f.eks. Platon vs. Aristoteles om erkjennelse, Kant vs. Smart om etikk, Hobbes vs. Locke om samfunnskontrakten).
* **📖 80 Komplette Dypdykk:** Samtlige 80 tenkere har grundig dokumentasjon av historisk kontekst, hovedverker, klassiske tankeeksperimenter og filosofisk resepsjon/kritikk.
* **✨ «Hvilken filosof ligner du på?»:** Personlighetstest som beregner cosinuslikhet mellom dine holdninger og filosofenes 8-dimensjonale temaprofiler.
* **🎧 Kosmisk lydlandskap:** Generert i sanntid med Web Audio API (drone, akkorder og stjerne-harpe).

---

## 🛠️ Teknologistakk

* **Rammeverk:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Typesikkerhet:** [TypeScript](https://www.typescriptlang.org/) (strict mode, ingen `any`)
* **Datavalidering:** [Zod](https://zod.dev/) med strenge skjemaer for filosofer, relasjoner og årstall (f.Kr./e.Kr.)
* **Stil & Design:** [Tailwind CSS](https://tailwindcss.com/) med skreddersydd kosmisk tema
* **Matematikk & Grafikk:** D3-skalaer, `d3-force`, HTML5 Canvas og ren SVG-tegning
* **Lyd:** Web Audio API (syntetisert, ingen eksterne lydfiler)
* **Testing:** [Vitest](https://vitest.dev/) (enhetstester, innholdsvalidering, tidsberegning)
* **Hosting:** Firebase Hosting (statiske filer med Cache-Control og HTTP-sikkerhetsheadere)

---

## 🚀 Kom i gang lokalt

### Forutsetninger
* Node.js v18+ (testet på v20+)
* npm v9+

### Installasjon
```bash
# Klon repositoriet
git clone https://github.com/EirikWolf/filosofradar.git
cd filosofradar

# Installer avhengigheter
npm install
```

### Utviklingsserver
```bash
npm run dev
```
Åpne `http://localhost:5173` i nettleseren.

---

## 🧪 Testing og kvalitetskontroll

Prosjektet har en streng kvalitetssikringskommando som kjører typekontroll, linting, Vitest-tester og innholdsvalidering:

```bash
# Kjører full sjekk (må være 100% grønn før publisering)
npm run check

# Enkelttester:
npm run typecheck    # TypeScript compiler-sjekk
npm run lint         # ESLint med React Hooks-regler
npm test             # Vitest testsuite (14 testfiler, 86 tester)
npm run validate     # Zod-validering av alle 80 JSON-filosofdokumenter
```

---

## 📁 Prosjektstruktur

```
filosofradar/
├── content/              # Kildedata
│   ├── philosophers/     # 80 individuelle JSON-filer med data, sitater og relasjoner
│   └── quiz/             # Spørsmålsbank for temaprøven
├── docs/                 # Styrings- og designdokumenter (PRD, Datamodell, Arkitektur m.m.)
├── public/               # Statiske produksjonsfiler (favicon.svg, manifest, robots.txt, og-preview)
├── scripts/              # Byggeskript for innholdskompilering og Wikidata-synkronisering
├── src/
│   ├── components/       # Gjenbrukbare komponenter (ErrorBoundary, SweepBeam, ThemeRadar)
│   ├── features/         # Funksjonsmoduler (radar, timeline, galaxy, network, exphil, deepdive m.fl.)
│   ├── generated/        # Kompilerte datafiler (genereres automatisk via scripts/build-content.ts)
│   ├── lib/              # Matematikk og hjelpefunksjoner (polar, tid, likhet, lyd)
│   └── schemas/          # Zod-skjemaer for dataintegritet
└── tests/                # Enhets- og integrasjonstester i Vitest
```

---

## 🔒 Personvern og sikkerhet

* **100% Statisk:** Applikasjonen sender ingen persondata til noen ekstern server.
* **Ingen cookies / sporing:** Ingen Google Analytics, tredjeparts-cookies eller sporingspiksler.
* **Sikkerhetsheadere:** Konfigurert med `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` og `Content-Security-Policy`.

---

## 📄 Lisens

Dette prosjektet er lisensiert under [MIT-lisensen](LICENSE).

Innholdet om tenkere og verk er samlet og bearbeidet fra offentlige kilder, med portrettbilder fra Wikimedia Commons (kreditert i applikasjonens Om-seksjon).
