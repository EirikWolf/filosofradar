# Datamodell – Filosofradaren

Innholdet ligger som **én JSON-fil per filosof** i `content/philosophers/{id}.json`.
Et byggeskript validerer alle filer med Zod og slår dem sammen til `src/generated/philosophers.json`.
Ingen database – innhold endres med vanlige commits.

## Årstall
- Heltall. **Negative tall = f.Kr.** (−470 = 470 f.Kr.). Det finnes ikke år 0: året før 1 e.Kr. er 1 f.Kr. (−1).
- Visning via `formatYear()` i `src/lib/years.ts` (med tester): `-470` → «470 f.Kr.», `1724` → «1724».
- Lengde på et liv over år 0: `died - born - 1` når born < 0 < died. Testes eksplisitt.
- Usikkerhet: `approx: true` gir «ca.» foran. Kun kjent virkeperiode: bruk `floruit`.

## Filosof (`content/philosophers/{id}.json`)
| Felt | Type | Merknad |
|---|---|---|
| id | string | små bokstaver og bindestrek, lik filnavnet (`sokrates`, `simone-de-beauvoir`) |
| name | string | vanlig norsk navneform |
| nameOriginal | string? | f.eks. «Σωκράτης», «孔子» |
| born | `{ year: number, approx: boolean }?` | |
| died | `{ year: number, approx: boolean }?` | tom = lever |
| floruit | `{ from: number, to: number }?` | brukes når fødsel/død er ukjent |
| tradition | TraditionId | se under |
| schools | string[] | f.eks. «stoisisme», «eksistensialisme» |
| themes | `Record<ThemeId, 0–5>` | alle 8 temaer må være med |
| themeNotes | string | 1–2 setninger som begrunner profilen |
| keyIdeas | `{ title: string, text: string }[]` | 2–3 stk, maks 400 tegn hver, egne ord |
| quote | `{ text, work, source, translator? }?` | kun med sikker kilde |
| thinkAbout | string | ett «Tenk selv»-spørsmål |
| influencedBy | string[] | id-er til andre filosofer |
| wikidata | string | Q-nummer, f.eks. «Q913» |
| links | `{ label, url }[]` | Wikipedia (no/en), SNL, Stanford Encyclopedia |
| image | `{ file, author, license, sourceUrl }?` | Wikimedia Commons |
| gender | `"kvinne"` \| `"mann"` \| `"annet"`? | brukes kun til bredde-statistikk |
| reviewed | boolean | settes til true når Asbjørn og Olai har lest gjennom |

`influences` (hvem filosofen påvirket) beregnes automatisk som det omvendte av `influencedBy`.

## Temaer (`ThemeId`) – de 8 aksene i temaradaren
| id | Navn | Spørsmålet |
|---|---|---|
| ethics | Etikk | Hvordan bør vi leve og handle? |
| metaphysics | Metafysikk | Hva finnes egentlig? |
| knowledge | Erkjennelse | Hva kan vi vite, og hvordan? |
| politics | Samfunn og politikk | Hvordan bør vi leve sammen? |
| logic | Logikk og språk | Hvordan tenker og argumenterer vi riktig? |
| mind | Sinn og bevissthet | Hva er et jeg? |
| meaning | Mening og det hellige | Hva er meningen, og finnes Gud? |
| beauty | Kunst og skjønnhet | Hva er vakkert, og hvorfor betyr det noe? |

Skala: 0 = ikke opptatt av, 3 = viktig tema, 5 = kjernen i filosofien.

## Tradisjoner (`TraditionId`) – sektorene på radaren
| id | Navn | Rekkefølge på radaren |
|---|---|---|
| chinese | Kinesisk | 1 |
| japanese-korean | Japansk og koreansk | 2 |
| indian | Indisk | 3 |
| greek-roman | Gresk og romersk | 4 |
| islamic-jewish | Islamsk og jødisk | 5 |
| european | Europeisk | 6 |
| nordic | Nordisk | 7 |
| americas | Amerikansk | 8 |
| african | Afrikansk og afrikansk diaspora | 9 |

Rekkefølgen kan justeres i fase 4 for at naboer skal ha mest mulig historisk kontakt – loggfør.

## Validering (kjøres i `npm run validate` og i bygget)
- Filnavn = id; id-er er unike.
- Alle `influencedBy` peker på eksisterende filosofer, og påvirkeren er født før den påvirkede.
- `died >= born`; minst én av `born`/`floruit` finnes.
- Alle 8 temaer har verdi 0–5.
- `quote` har `work` og `source`.
- Advarsel (ikke feil) for `reviewed: false`, manglende bilde og manglende norsk Wikipedia-lenke.
- Statistikk skrives ut: antall per tradisjon, per kjønn, per århundre.
