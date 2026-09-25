# PRD – Filosofradaren

> Status: Oppdatert etter idéverksted v1.0. Endringer er markert med **[endret]**.

## 1. Visjon
Filosofiens historie som et levende kart. På ti sekunder skal man se at Buddha, Konfucius og de første
greske filosofene levde omtrent samtidig; på ti minutter skal man ha oppdaget en filosof man aldri har
hørt om – og funnet ut hvilken filosof man selv ligner mest på.

## 2. Målgruppe
- **Primær:** nysgjerrige ungdommer (13–19 år), for eksempel elever med religion og etikk, historie eller filosofi.
- **Sekundær:** voksne som vil ha oversikt, lærere som vil vise noe på storskjerm.
- Ingen forkunnskaper kreves. Språket skal være forståelig for en 13-åring uten å bli barnslig.

## 3. Kjernefunksjoner (MVP)

### 3.1 Radaren (hovedvisning)
- **[endret]** Visuell stil: **Observatoriet** (dyp nattblå kosmisk himmel, glødende stjerner, gylne baner og sfærisk glassmorphism).
- Sirkulær «radarskjerm»: avstand fra sentrum = tid, sektorer = tradisjoner/regioner.
- Hver filosof er en lysende stjerne («signal»). En stjernelys-sveipestråle går rundt, og stjernene gløder opp når den passerer.
- **[endret] Tidsmaskin (prioritert wow-funksjon):** glider og avspillingsknapp som spoler fra ca. 600 f.Kr. til i dag. Filosofene tennes med en energisk «supernova»-puls idet de blir født og dempes når de dør. Årstall vises stort.
- Filter på tema, tradisjon og epoke. Søk på navn.
- Se `DESIGN.md` for detaljer.

### 3.2 Tidslinje (alternativ visning)
- Klassisk horisontal tidslinje med levetid som stolper, gruppert per tradisjon. Zoom og panorering.
- «Hvem levde samtidig?»: velg en filosof → alle med overlappende levetid fremheves.

### 3.3 Filosofkort
- Navn, levetid (med «ca.» ved usikkerhet), tradisjon, skoleretning, portrett (fri lisens).
- **Temaradar:** edderkoppdiagram over hva filosofen var opptatt av (8 temaer, 0–5).
- 2–3 kjerneidéer med egne ord, ett kildebelagt sitat (valgfritt), «Tenk selv»-spørsmål.
- Påvirket av / påvirket: klikkbare lenker.
- Kilder og lenke til Wikipedia/SNL.

### 3.4 Sammenlign
- Velg to eller tre filosofer → temaradarene legges oppå hverandre, levetidene vises på samme akse.

### 3.5 Påvirkningsnett (prioritert wow-funksjon) **[endret]**
- **[endret]** Animerte, gylne buer (som klassiske stjernebilder/konstellasjoner) strekkes mellom lærer og elev / påvirket–påvirket, på radaren og som eget nettverk.
- Klikk på en filosof → idéslekten vises bakover og fremover i tid.

### 3.6 «Hvilken filosof ligner du på?»
- 10–12 dilemmaer og påstander (enig–uenig). Svarene gir brukerens egen temaradar.
- De tre nærmeste filosofene vises med likhetsprosent og forklaring på hvorfor.
- Del-bilde: last ned brukerens radar som PNG. Ingenting lagres eller sendes noe sted.

### 3.7 Om og kilder
- Hvordan dataene er laget, hva temaprofilene betyr (skjønn, ikke fasit), kilder og lisenser.

## 4. Innhold
- **[endret] Olais topp 5 favoritter (prioritert for tidlig lansering og testing):**
  1. Hypatia av Alexandria
  2. Sokrates
  3. Arne Næss
  4. Buddha (Siddhartha Gautama)
  5. Marcus Aurelius
- Minst 40 filosofer ved første publisering, 70+ ved lansering (se `INNHOLD.md`).
- Alle tradisjoner representert, inkludert kvinner og norske filosofer.

## 5. Utenfor MVP (valgfritt senere)
3D-«galakse»-visning, lydlandskap, «Spør filosofen» (AI-chat, krever backend og API-kostnad),
engelsk språkversjon, lærermodus med oppgaveark, brukerbidrag.

## 6. Ikke-funksjonelle krav
- Fungerer på mobil (touch) og storskjerm. Første innlasting < 2 s på 4G.
- 60 fps animasjon på vanlig mobil; `prefers-reduced-motion` gir rolig modus.
- Tilgjengelighet: alle data kan også leses som liste; tastaturnavigasjon; kontrast AA.
- Ingen innlogging, ingen informasjonskapsler, ingen sporing, ingen persondata.
- Gratisplan på Firebase.

## 7. Suksesskriterier
- «Wow»-testen: tre venner som ser appen for første gang sier noe positivt innen 30 sekunder.
- En lærer kan bruke radaren på storskjerm i en time.
- Alle filosofer har kilde på årstall, og ingen sitater mangler kilde.
