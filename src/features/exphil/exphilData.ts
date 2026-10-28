import type { ExphilProfile, ExphilDuel, ExphilFlashcard, ExphilQuizQuestion } from './types';

export const EXPHIL_PHILOSOPHER_IDS = new Set<string>([
  'sokrates',
  'platon',
  'aristoteles',
  'augustin',
  'aquinas',
  'descartes',
  'spinoza',
  'locke',
  'hume',
  'kant',
  'wollstonecraft',
  'hegel',
  'marx',
  'kierkegaard',
  'nietzsche',
  'popper',
  'russell',
  'wittgenstein',
  'sartre',
  'de-beauvoir',
  'arendt',
  'arne-naess',
  'foucault',
  'anscombe',
  'hobbes',
  'rousseau',
]);

export const EXPHIL_PROFILES: Record<string, ExphilProfile> = {
  sokrates: {
    philosopherId: 'sokrates',
    pillar: 'etikk',
    pillarLabel: 'Etikk og dialog',
    subPillar: 'Den sokratiske metoden & Dyd som viten',
    coreTakeaway:
      'Hevdet at det uundersøkte livet ikke er verdt å leve. Rett innsikt fører til rett handling («ingen gjør galt med vilje»).',
    examKeywords: ['Elenchos', 'Maieutikk (jordmorkunst)', 'Dyd er viten', 'Det uundersøkte livet', 'Intellektualisme'],
    commonPitfall:
      'Ikke forveksle Sokrates’ egen filosofi med Platons senere idélære. Sokrates skrev ingenting selv; vi kjenner ham primært gjennom Platons tidlige dialoger.',
    typicalQuestions: [
      'Gjør rede for Sokrates’ samtaleform (elenchos/maieutikk) og diskuter påstanden «dyd er viten».',
      'Hva mente Sokrates med at det uundersøkte liv ikke er verdt å leve?',
    ],
  },
  platon: {
    philosopherId: 'platon',
    pillar: 'erkjennelse',
    pillarLabel: 'Erkjennelsesteori & Metafysikk',
    subPillar: 'Idélæren & Staten',
    coreTakeaway:
      'Skiller mellom sanseverdenen (skiftende skygger) og idéverdenen (evige, uforanderlige sannheter). Den ideelle stat ledes av filosofkonger.',
    examKeywords: ['Idélæren', 'Hulelignelsen', 'Den tredelte sjel', 'Filosofkonger', 'Anamnese (gjenerindring)'],
    commonPitfall:
      'Glemmer ofte å forklare sjelslæren (fornuft, vilje, begjær) når man skal gjøre rede for rettferdighet i Platons stat.',
    typicalQuestions: [
      'Gjør rede for Platons hulelignelse og forklar hva den illustrerer om erkjennelse og virkelighet.',
      'Hvordan henger Platons syn på menneskesjelen sammen med hans oppbygning av den ideelle staten?',
    ],
  },
  aristoteles: {
    philosopherId: 'aristoteles',
    pillar: 'etikk',
    pillarLabel: 'Normativ etikk & Menneskesyn',
    subPillar: 'Dydsetikk & Teleologi',
    coreTakeaway:
      'Menneskets mål er eudaimonia (et lykkelig, meningsfullt liv i utfoldelse). Dyd oppnås ved å finne den gylne middelvei mellom to ytterpunkter.',
    examKeywords: ['Eudaimonia', 'Dydens gylne middelvei', 'Phronesis (praktisk klokskap)', 'Teleologi', 'De fire årsaker'],
    commonPitfall:
      'Å tro at «den gylne middelvei» er et matematisk gjennomsnitt. Det er en situasjonsbestemt balanse som krever praktisk klokskap (phronesis).',
    typicalQuestions: [
      'Gjør rede for Aristoteles’ dydsetikk. Hva menes med eudaimonia og den gylne middelvei?',
      'Forklar Aristoteles’ lære om de fire årsakene, og vis hvordan hans natursyn er teleologisk.',
    ],
  },
  descartes: {
    philosopherId: 'descartes',
    pillar: 'erkjennelse',
    pillarLabel: 'Erkjennelsesteori',
    subPillar: 'Klassisk rasjonalisme & Dualisme',
    coreTakeaway:
      'Gjennom metodisk tvil forkastes alt usikkert inntil det urokkelige fundamentet nås: «Cogito, ergo sum» (Jeg tenker, altså er jeg).',
    examKeywords: ['Metodisk tvil', 'Cogito ergo sum', 'Substansdualisme', 'Res cogitans / Res extensa', 'Klar og distinkt idé'],
    commonPitfall:
      'Å forveksle Descartes’ metodiske tvil med skeptisisme. Descartes tvilte ikke for å forbli i tvil, men for å finne et absolutt sikkert fundament for vitenskapen.',
    typicalQuestions: [
      'Gjør rede for Descartes’ metodiske tvil fram til «Cogito, ergo sum».',
      'Hva er substansdualisme, og hvilke filosofiske problemer oppstår i samspillet mellom kropp og sjel?',
    ],
  },
  hume: {
    philosopherId: 'hume',
    pillar: 'erkjennelse',
    pillarLabel: 'Erkjennelsesteori & Etikk',
    subPillar: 'Klassisk empirisme & Skepsis',
    coreTakeaway:
      'All kunnskap stammer fra sanseinntrykk (impressions). Årsakssammenheng kan aldri observeres direkte, bare konstant samvariasjon. Formulert er/bør-problemet.',
    examKeywords: ['Sanseinntrykk og idéer', 'Induksjonsproblemet', 'Årsak og virkning som vane', 'Humes giljotin (Er/Bør)', 'Emotivisme/Sentimentalisme'],
    commonPitfall:
      'Å overse at Hume ikke nekter for at vi *opplever* årsak og virkning, men hevder at den logisk sett hviler på psykologisk vane, ikke rasjonell bevisførsel.',
    typicalQuestions: [
      'Gjør rede for Humes kritikk av årsaksbegrepet og induksjonsslutninger.',
      'Hva er Humes giljotin (er/bør-problemet), og hvilken betydning har dette for etisk argumentasjon?',
    ],
  },
  kant: {
    philosopherId: 'kant',
    pillar: 'etikk',
    pillarLabel: 'Normativ etikk & Erkjennelsesteori',
    subPillar: 'Pliktetikk (Deontologi) & Den kopernikanske vending',
    coreTakeaway:
      'Handlinger har moralsk verdi kun når de gjøres av plikt for moralloven. Det kategoriske imperativ krever at handlingsregelen kan gjøres til allmenn lov, og at mennesker aldri behandles utelukkende som middel.',
    examKeywords: ['Det kategoriske imperativ', 'Universaliseringsprinsippet', 'Humanitetsformuleringen (formål i seg selv)', 'Den gode vilje', 'Autonomi', 'Syntetisk a priori'],
    commonPitfall:
      'Å tro at Kant overser konsekvenser fordi han er dum; han mener at moralsk plikt og menneskeverd er ukrenkelig og uavhengig av tilfeldige utfall.',
    typicalQuestions: [
      'Gjør rede for Kants kategoriske imperativ i både universaliserings- og humanitetsformuleringen.',
      'Hvordan skiller Kants pliktetikk seg fra konsekvensetikk (utilitarisme)? Bruk et konkret etisk dilemma.',
    ],
  },
  popper: {
    philosopherId: 'popper',
    pillar: 'erkjennelse',
    pillarLabel: 'Vitenskapsfilosofi',
    subPillar: 'Kritisk rasjonalisme & Falsifikasjonisme',
    coreTakeaway:
      'Vitenskapelige teorier kan aldri bevises (verifiseres) endelig, men de kan motbevises (falsifiseres). Demarkasjonskriteriet for ekte vitenskap er falsifiserbarhet.',
    examKeywords: ['Falsifikasjonisme', 'Demarkasjonsproblemet', 'Asymmetrien mellom verifikasjon og falsifikasjon', 'Dristige hypoteser', 'Kritisk rasjonalisme'],
    commonPitfall:
      'Å si at en hypotese må være falsk for å være vitenskapelig. Hypotesen må være *falsifiserbar* – det må finnes en tenkelig observasjon som ville motbevist den.',
    typicalQuestions: [
      'Gjør rede for Karl Poppers falsifikasjonisme som løsning på demarkasjonsproblemet.',
      'Hva er asymmetrien mellom verifikasjon og falsifikasjon, og hvorfor avviser Popper induktiv vitenskap?',
    ],
  },
  'de-beauvoir': {
    philosopherId: 'de-beauvoir',
    pillar: 'menneskesyn',
    pillarLabel: 'Feministisk filosofi & Menneskesyn',
    subPillar: 'Eksistensialisme & Kjønnsteori',
    coreTakeaway:
      '«Man fødes ikke som kvinne, man blir det». Kvinnekjønnet er historisk definert som «den Andre» i relasjon til mannen som den universelle normen.',
    examKeywords: ['Det annet kjønn', '«Den Andre»', 'Eksistens før essens', 'Kjønn som sosial konstruksjon', 'Immanens vs. transsendens'],
    commonPitfall:
      'Glemmer å forankre Beauvoirs feministiske analyse i sartreansk eksistensialisme (frihet, situerthet og overskridelse/transsendens).',
    typicalQuestions: [
      'Gjør rede for Simone de Beauvoirs påstand «Man fødes ikke som kvinne, man blir det».',
      'Hvordan bruker Beauvoir begrepet «den Andre» til å forklare kvinners underordning?',
    ],
  },
  'arne-naess': {
    philosopherId: 'arne-naess',
    pillar: 'etikk',
    pillarLabel: 'Miljøetikk & Vitenskapsfilosofi',
    subPillar: 'Økosofi T & Dypøkologi',
    coreTakeaway:
      'Skiller mellom grunnøkologi (bekjempelse av forurensning for menneskets skyld) og dypøkologi (alt levende har egenverdi uavhengig av menneskelig nytte).',
    examKeywords: ['Økosofi T', 'Dypøkologi vs. grunnøkologi', 'Biosfærisk egalitarisme', 'Egenverdi (intrinsikal verdi)', 'Selvrealisering i naturen'],
    commonPitfall:
      'Å redusere dypøkologi til generelt naturvern. Kjernen er det filosofiske bruddet med antroposentrismen (menneskesentrertheten).',
    typicalQuestions: [
      'Gjør rede for Arne Næss’ skille mellom grunnøkologi og dypøkologi.',
      'Hva innebærer prinsippet om alt levendes egenverdi i Næss’ økosofi T?',
    ],
  },
  hobbes: {
    philosopherId: 'hobbes',
    pillar: 'etikk',
    pillarLabel: 'Politisk filosofi',
    subPillar: 'Samfunnskontrakten & Naturtilstanden',
    coreTakeaway:
      'I naturtilstanden hersker «alles krig mot alle», og livet er «ensomt, fattig, ekkelt, brutalt og kort». For å unngå dette må borgerne overgi all makt til suverenen (Leviathan).',
    examKeywords: ['Naturtilstanden', 'Alles krig mot alle (Bellum omnium contra omnes)', 'Leviathan', 'Samfunnskontrakt', 'Maktmonopol'],
    commonPitfall:
      'Å tro at Hobbes mente naturtilstanden var en faktisk historisk epoke; det er et tankeeksperiment for å vise hvorfor statlig makt er nødvendig.',
    typicalQuestions: [
      'Gjør rede for Thomas Hobbes’ syn på naturtilstanden og statens opprinnelse.',
      'Sammenlign Hobbes’ og Lockes syn på samfunnskontrakten.',
    ],
  },
  locke: {
    philosopherId: 'locke',
    pillar: 'etikk',
    pillarLabel: 'Politisk filosofi & Erkjennelse',
    subPillar: 'Naturlige rettigheter & Tabula rasa',
    coreTakeaway:
      'Mennesket har medfødte naturlige rettigheter til liv, helse, frihet og eiendom. Staten opprettes for å beskytte disse, og folket har rett til opprør om staten bryter kontrakten.',
    examKeywords: ['Tabula rasa', 'Naturlige rettigheter (liv, frihet, eiendom)', 'Begrenset statsmakt', 'Retten til opprør', 'Toleranse'],
    commonPitfall:
      'Ikke forveksle Lockes naturtilstand med Hobbes’. Hos Locke er naturtilstanden moralsk bundet av naturens lov, ikke lovløst kaos.',
    typicalQuestions: [
      'Gjør rede for Lockes begrunnelse for statens makt og borgernes rett til opprør.',
      'Hvordan henger Lockes erkjennelsesteori (tabula rasa) sammen med hans politiske syn?',
    ],
  },
  sartre: {
    philosopherId: 'sartre',
    pillar: 'menneskesyn',
    pillarLabel: 'Eksistensfilosofi',
    subPillar: 'Ateistisk eksistensialisme',
    coreTakeaway:
      '«Eksistensen går forut for essensen». Mennesket er dømt til frihet og må skape sin egen mening gjennom handling. Å skylde på omstendighetene er «ond tro» (mauvaise foi).',
    examKeywords: ['Eksistens går forut for essensen', 'Dømt til frihet', 'Ond tro (mauvaise foi)', 'Angst', 'Ansvar'],
    commonPitfall:
      'Å tro at «dømt til frihet» betyr at man kan gjøre hva som helst uten konsekvenser. Tvert imot medfører friheten et overveldende, personlig ansvar.',
    typicalQuestions: [
      'Hva betyr Sartres tese om at «eksistensen går forut for essensen»?',
      'Forklar begrepet «ond tro» (mauvaise foi) med et konkret eksempel.',
    ],
  },
  kierkegaard: {
    philosopherId: 'kierkegaard',
    pillar: 'menneskesyn',
    pillarLabel: 'Eksistensfilosofi',
    subPillar: 'De tre stadier & Valget',
    coreTakeaway:
      'Sannheten er subjektiv. Mennesket må velge hvem det vil være gjennom de tre livsstadiene: det estetiske, det etiske og det religiøse.',
    examKeywords: ['Det enkelte individ', 'De tre stadier (estetisk, etisk, religiøst)', 'Troens sprang', 'Angst', 'Subjektiviteten er sannheten'],
    commonPitfall:
      'Å overse at Kierkegaards stadier ikke er automatisk aldersutvikling, men kvalitative sprang som krever et personlig, eksistensielt valg.',
    typicalQuestions: [
      'Gjør rede for Søren Kierkegaards tre stadier på livets vei.',
      'Hva menes med «troens sprang» og påstanden «subjektiviteten er sannheten»?',
    ],
  },
  wollstonecraft: {
    philosopherId: 'wollstonecraft',
    pillar: 'etikk',
    pillarLabel: 'Politisk filosofi & Feminisme',
    subPillar: 'Opplysningstidens kvinnefrigjøring',
    coreTakeaway:
      'Kvinner og menn deler samme menneskelige fornuft. Undertrykking og overflatiskhet hos kvinner skyldes manglende utdanning og feilaktig oppdragelse.',
    examKeywords: ['Et forsvar for kvinnens rettigheter', 'Utdanning som frigjøring', 'Fornuftens kjønnsløshet', 'Kritikk av Rousseau', 'Dyd og likeverd'],
    commonPitfall:
      'Glemmer hennes skarpe kritikk av Jean-Jacques Rousseaus syn på kvinneoppdragelse i boken Emile.',
    typicalQuestions: [
      'Gjør rede for Mary Wollstonecrafts argumenter for kvinners rett til utdanning og fornuftsutvikling.',
    ],
  },
  rousseau: {
    philosopherId: 'rousseau',
    pillar: 'etikk',
    pillarLabel: 'Politisk filosofi',
    subPillar: 'Allmennviljen & Samfunnskontrakten',
    coreTakeaway:
      '«Mennesket er født fritt, men overalt er det i lenker». Samfunnet og eiendomsretten har korrumpert menneskets opprinnelige godhet. Kun allmennviljen kan gjenopprette legitimitet.',
    examKeywords: ['Allmennviljen (volonté générale)', 'Den edle villmann', 'Eiendomsrettens opprinnelse', 'Direkte demokrati', 'Tvinges til å være fri'],
    commonPitfall:
      'Forveksler allmennviljen (fellesskapets sanne fellesinteresse) med «alles vilje» (summen av særinteresser og flertallsavstemning).',
    typicalQuestions: [
      'Gjør rede for Rousseaus begrep om allmennviljen og forklar hvordan det skiller seg fra summen av enkeltinteresser.',
    ],
  },
  wittgenstein: {
    philosopherId: 'wittgenstein',
    pillar: 'erkjennelse',
    pillarLabel: 'Språkfilosofi',
    subPillar: 'Tidlig vs. Sen Wittgenstein',
    coreTakeaway:
      'Tidlig: Språket avbilder virkeligheten; «hva man ikke kan tale om, må man tie om». Sen: Ordets mening er dets bruk i et «språkspill».',
    examKeywords: ['Avbildningsteorien', 'Språkspill', 'Mening er bruk', 'Livsform', 'Tractatus'],
    commonPitfall:
      'Blander sammen den tidlige Wittgenstein (streng logisk atomisme) og den sene (pragmatiske språkspill).',
    typicalQuestions: [
      'Forklar skillet mellom Wittgensteins tidlige avbildningsteori og hans senere idé om «språkspill».',
    ],
  },
  anscombe: {
    philosopherId: 'anscombe',
    pillar: 'etikk',
    pillarLabel: 'Normativ etikk',
    subPillar: 'Moderne dydsetikk',
    coreTakeaway:
      'Kritiserte moderne pliktetikk og utilitarisme for å bruke begreper som «moralsk plikt» uten å ha en guddommelig lovgiver. Grunnla fornyelsen av aristotelisk dydsetikk.',
    examKeywords: ['Modern Moral Philosophy', 'Gjenoppliving av dydsetikk', 'Intensjon', 'Konsekvensialismekritikk'],
    commonPitfall:
      'Å ikke koble Anscombes kritikk til at moderne sekulær filosofi trenger Aristoteles’ begreper om menneskelig blomstring og dyd.',
    typicalQuestions: [
      'Hvordan bidro G.E.M. Anscombe til gjenopplivingen av dydsetikken i det 20. århundre?',
    ],
  },
  arendt: {
    philosopherId: 'arendt',
    pillar: 'etikk',
    pillarLabel: 'Politisk filosofi & Etikk',
    subPillar: 'Ondskapens banalitet & Det offentlige rom',
    coreTakeaway:
      'Ondskap er ofte ikke demonisk, men banal – resultatet av tankeløshet og blind lydighet. Handlingen i det offentlige rom (vita activa) er menneskets høyeste uttrykk for frihet.',
    examKeywords: ['Ondskapens banalitet', 'Eichmann i Jerusalem', 'Vita activa (arbeid, verk, handling)', 'Det offentlige rom', 'Pluralitet'],
    commonPitfall:
      'Å tolke «ondskapens banalitet» som at handlingene var bagatellmessige. Det er *gjerningsmannens motivasjon* (tankeløs byråkrat) som var banal, ikke ugjerningen.',
    typicalQuestions: [
      'Hva la Hannah Arendt i begrepet «ondskapens banalitet»?',
      'Gjør rede for Arendts skille mellom arbeid, verk og handling i Vita Activa.',
    ],
  },
  foucault: {
    philosopherId: 'foucault',
    pillar: 'erkjennelse',
    pillarLabel: 'Vitenskaps- og samfunnsfilosofi',
    subPillar: 'Kunnskap og makt',
    coreTakeaway:
      'Kunnskap og makt er uatskillelige (makt/viten). Makt utøves ikke bare av en konge ovenfra, men gjennom institusjoner, vitenskapelige diskurser og disiplinering.',
    examKeywords: ['Makt/viten (pouvoir-savoir)', 'Diskurs', 'Disiplinering', 'Panoptikon', 'Normalisering'],
    commonPitfall:
      'Å tro at Foucault mente makt bare er undertrykkende. Makt er også produktiv – den skaper kunnskap, identiteter og institusjoner.',
    typicalQuestions: [
      'Gjør rede for Michel Foucaults syn på forholdet mellom makt og kunnskap (makt/viten).',
    ],
  },
  augustin: {
    philosopherId: 'augustin',
    pillar: 'menneskesyn',
    pillarLabel: 'Middelalderfilosofi & Teologi',
    subPillar: 'Tro og fornuft & Arvesynden',
    coreTakeaway:
      '«Tro for at du kan forstå». Menneskets vilje er skadet av arvesynden og kan bare frelses ved Guds nåde. Skiller mellom Gudsstaten og den jordiske stat.',
    examKeywords: ['Tro og fornuft (credo ut intelligam)', 'Gudsstaten (De Civitate Dei)', 'Arvesynd og nåde', 'Tidens natur', 'Det onde som mangel på det gode'],
    commonPitfall:
      'Glemmer hans nyplatoniske inspirasjon i synet på det onde som et fravær av det gode (privatio boni).',
    typicalQuestions: [
      'Gjør rede for Augustins syn på forholdet mellom tro og fornuft.',
    ],
  },
  aquinas: {
    philosopherId: 'aquinas',
    pillar: 'etikk',
    pillarLabel: 'Middelalderfilosofi & Naturrett',
    subPillar: 'Syntese av Aristoteles og kristen teologi',
    coreTakeaway:
      'Fornuft og tro står ikke i motstrid, men utfyller hverandre. Utviklet naturretten: Mennesket kan ved fornuftens lys innse hva som fremmer det gode liv.',
    examKeywords: ['Naturrett (lex naturalis)', 'De fire lovene (evig, naturlig, guddommelig, menneskelig)', 'Syntese av Aristoteles og Bibelen', 'De fem gudsbevis'],
    commonPitfall:
      'Å tro at Aquinas forkastet fornuften til fordel for blind tro. Han mente fornuften kan nå fram til naturretten på egen hånd.',
    typicalQuestions: [
      'Gjør rede for Thomas Aquinas’ lære om naturretten og de fire lovene.',
    ],
  },
  spinoza: {
    philosopherId: 'spinoza',
    pillar: 'erkjennelse',
    pillarLabel: 'Metafysikk & Rasjonalisme',
    subPillar: 'Panteistisk substansmonisme',
    coreTakeaway:
      'Det finnes bare én uendelig substans: Gud eller Naturen (Deus sive Natura). Ånd og materie er to attributter ved samme virkelighet. Frihet er å forstå nødvendigheten.',
    examKeywords: ['Deus sive Natura (Gud eller Naturen)', 'Substansmonisme', 'Determinisme', 'Sub specie aeternitatis (under evighetens synsvinkel)'],
    commonPitfall:
      'Forveksler Spinozas panteisme med tradisjonell teisme; Spinozas Gud er ikke en personlig skaper som griper inn med mirakler.',
    typicalQuestions: [
      'Gjør rede for Baruch Spinozas substansmonisme og begrepet «Deus sive Natura».',
    ],
  },
  hegel: {
    philosopherId: 'hegel',
    pillar: 'erkjennelse',
    pillarLabel: 'Tysk idealisme & Historiefilosofi',
    subPillar: 'Dialektikk & Åndens utvikling',
    coreTakeaway:
      'Virkeligheten og historien er en dynamisk utviklingsprosess der fornuften (Ånden) blir seg selv bevisst gjennom dialektiske spenninger.',
    examKeywords: ['Dialektikk (tese, antitese, syntese)', 'Verdensånden (Weltgeist)', 'Herre-trell-dialektikken', 'Anerkjennelse', 'Det sanne er det hele'],
    commonPitfall:
      'Å redusere Hegels dialektikk til en mekanisk formel uten å se dens historiske og erfaringsmessige dimensjon.',
    typicalQuestions: [
      'Gjør rede for Hegels herre-trell-dialektikk og forklar begrepet om anerkjennelse.',
    ],
  },
  marx: {
    philosopherId: 'marx',
    pillar: 'etikk',
    pillarLabel: 'Politisk og sosial filosofi',
    subPillar: 'Historisk materialisme & Fremmedgjøring',
    coreTakeaway:
      'Samfunnets materielle basis (produksjonsforhold) former dets overbygning (lover, religion, ideologi). Arbeideren fremmedgjøres fra produktet, arbeidsprosessen og sitt menneskeverd under kapitalismen.',
    examKeywords: ['Historisk materialisme', 'Basis og overbygning', 'Fremmedgjøring (arbeid, produkt, artsvesen)', 'Klassekamp', 'Varefetisjisme'],
    commonPitfall:
      'Glemmer å skille mellom Marx’ filosofiske analyse av fremmedgjøring og senere 1900-talls politiske regimer.',
    typicalQuestions: [
      'Gjør rede for Karl Marx’ teori om fremmedgjøring under kapitalismen.',
      'Forklar modellen med basis og overbygning i historisk materialisme.',
    ],
  },
  nietzsche: {
    philosopherId: 'nietzsche',
    pillar: 'menneskesyn',
    pillarLabel: 'Moralfilosofi & Menneskesyn',
    subPillar: 'Kritikk av tradisjonell moral & Nihilisme',
    coreTakeaway:
      '«Gud er død». Tradisjonell kristen moral er en «slavemoral» født av ressentiment. Mennesket må skape sine egne verdier og bli et «overmenneske» gjennom viljen til makt.',
    examKeywords: ['Gud er død', 'Herremoral vs. slavemoral', 'Ressentiment', 'Vilje til makt', 'Overmennesket (Übermensch)', 'Nihilisme'],
    commonPitfall:
      'Å forveksle Nietzsches overmenneske med biologisk rasisme. For Nietzsche er overmennesket et åndelig ideal for den som overvinner nihilismen og skaper egne verdier.',
    typicalQuestions: [
      'Gjør rede for Nietzsches skille mellom herremoral og slavemoral.',
      'Hva mente Nietzsche med utsagnet «Gud er død», og hvilke utfordringer skaper dette ifølge ham?',
    ],
  },
};

export const EXPHIL_DUELS: ExphilDuel[] = [
  {
    id: 'kant-vs-aristoteles',
    title: 'Kant vs. Aristoteles: Hva gjør en handling moralsk god?',
    topic: 'Normativ etikk: Pliktetikk vs. Dydsetikk',
    pillar: 'etikk',
    examPrompt:
      'Sammenlign og drøft Kants pliktetikk og Aristoteles’ dydsetikk. Gjør rede for henholdsvis det kategoriske imperativ og læren om den gylne middelvei. Drøft hvordan de to teoriene vil vurdere et moralsk dilemma.',
    clarifications: [
      {
        term: 'Deontologi (Kants pliktetikk)',
        explanation: 'Etisk teori der handlingers moralske verdi avgjøres av om de følger ubetingede plikter (moralloven), uavhengig av handlingens utfall eller konsekvenser.',
      },
      {
        term: 'Aretisk etikk (Aristoteles’ dydsetikk)',
        explanation: 'Etisk teori fokusert på aktørens moralske karakter og dyder over et helt livsløp, fremfor isolerte handlingsregler.',
      },
    ],
    sideA: {
      philosopherId: 'kant',
      philosopherName: 'Immanuel Kant',
      positionName: 'Pliktetikk (Deontologi)',
      mainThesis: 'En handling er kun moralsk hvis den utføres av ren plikt for moralloven, formulert gjennom det kategoriske imperativ.',
      keyArguments: [
        'Universaliserbarhet: Du skal handle slik at regelen for din handling kan gjøres til en allmenn naturlov uten selvmotsigelse.',
        'Humanitetsformuleringen: Mennesket må alltid behandles som et formål i seg selv, aldri utelukkende som et middel.',
        'Den gode vilje er det eneste i verden som er ubetinget godt.',
      ],
      classicExample: 'Å lyve for en morder ved døren: Kant fastholder at du aldri kan lyve, fordi en allmenn lov om løgn ville oppheve selve begrepet sannhet.',
      vulnerabilities: [
        'Rigiditet og regelfetisjisme (problemet med absolutte plikter når plikter kolliderer).',
        'Følelser og medlidenhet tilkjennes ingen moralsk verdi i handlingens begrunnelse.',
      ],
    },
    sideB: {
      philosopherId: 'aristoteles',
      philosopherName: 'Aristoteles',
      positionName: 'Dydsetikk',
      mainThesis: 'Målet med etikken er eudaimonia (menneskelig oppblomstring/lykke), oppnådd gjennom å utvikle gode karaktertrekk (dyder).',
      keyArguments: [
        'Den gylne middelvei: En dyd er en situasjonstilpasset balanse mellom to laster (en mangel og en overdrivelse, f.eks. mot mellom feighet og dumdristighet).',
        'Praktisk klokskap (phronesis): Regler alene strekker ikke til; det kreves moralsk dømmekraft innarbeidet gjennom vaner.',
        'Mennesket er av natur et samfunnsvesen (zoon politikon) som bare kan realisere sitt potensial i fellesskap med andre.',
      ],
      classicExample: 'En modig handling i krig: Ikke å løpe hodeløst inn i døden (dumdristighet), men å vurdere situasjonen klokt og stå fast ved sitt oppdrag.',
      vulnerabilities: [
        'Handlingsveiledningsproblemet: Gir få klare regler ved akutte moralske kriser («gjør som den kloke ville gjort»).',
        'Kulturrelativisme: Hva som regnes som dyder kan variere med tid og kultur.',
      ],
    },
    synthesisAndComparison:
      'Hovedforskjell: Kant spør «Hva er min plikt i denne konkrete handlingen?», mens Aristoteles spør «Hva slags person bør jeg være?». Kant krever universelle rasjonelle regler; Aristoteles krever kontekstfølsom praktisk dømmekraft (phronesis).',
    gradingAdvice:
      'En toppbesvarelse (A) forklarer nøyaktig hvorfor Kant avviser lykke/konsekvenser som moralsk målestokk, og viser med et konkret eksempel (f.eks. varsling eller løgn) hvordan Kants universaliseringstesting skiller seg fra Aristoteles’ middelvei.',
  },
  {
    id: 'descartes-vs-hume',
    title: 'Descartes vs. Hume: Hvordan oppnår vi sikker erkjennelse?',
    topic: 'Erkjennelsesteori: Rasjonalisme vs. Empirisme',
    pillar: 'erkjennelse',
    examPrompt:
      'Gjør rede for Descartes’ rasjonalisme og Humes empirisme. Hvordan begrunner de to tenkerne kildene til sann viten, og hvordan forholder de seg til sansenes pålitelighet og årsaksbegrepet?',
    clarifications: [
      {
        term: 'Rasjonalisme',
        explanation: 'Retning som hevder at fornuften alene, uavhengig av sanseerfaring, er hovedkilden til fundamental kunnskap.',
      },
      {
        term: 'Empirisme',
        explanation: 'Retning som hevder at all kunnskap om verden til syvende og sist må stamme fra sanseinntrykk (erfaring).',
      },
    ],
    sideA: {
      philosopherId: 'descartes',
      philosopherName: 'René Descartes',
      positionName: 'Klassisk rasjonalisme',
      mainThesis: 'Sansene bedrar oss og kan aldri gi absolutt visshet. Kun fornuftens klare og distinkte idéer gir et sikkert fundament.',
      keyArguments: [
        'Metodisk tvil viser at vi kan tvile på sanseinntrykk, omverdenen og kroppen.',
        '«Cogito, ergo sum» står fast som et uimotståelig aksiom: Selve tvilen beviser bevissthetens eksistens.',
        'Medfødte idéer (som idéen om det uendelige/Gud og matematikk) er nedlagt i sinnet fra naturens side.',
      ],
      classicExample: 'Voksstykket: Når voksen smeltes, endrer all farge, form og lukt seg, men fornuften innser at det forblir samme substans.',
      vulnerabilities: [
        'Den kartesianske sirkelen (bruker Gud for å bevise klare idéer og klare idéer for å bevise Gud).',
        'Interaksjonsproblemet: Hvordan kan en uutstrakt sjel (res cogitans) påvirke en materiell kropp (res extensa)?',
      ],
    },
    sideB: {
      philosopherId: 'hume',
      philosopherName: 'David Hume',
      positionName: 'Radikal empirisme & Skepsis',
      mainThesis: 'Sinnet er tomt for forhåndskunnskap. Idéer er bare bleke kopier av livlige sanseinntrykk (impressions).',
      keyArguments: [
        'Kopiprinsippet: Har vi ikke et underliggende sanseinntrykk, er begrepet meningsløst (f.eks. substans eller sjel).',
        'Kritikk av årsak og virkning: Vi observerer bare hendelse A etterfulgt av B, aldri den nødvendige forbindelsen mellom dem.',
        'Induksjonsproblemet: Å anta at fremtiden vil ligne fortiden er en psykologisk vane, ikke logisk begrunnet.',
      ],
      classicExample: 'Biljardkuler: Du ser kule 1 treffe kule 2, og kule 2 bevege seg. Den usynlige «årsakskraften» ser du aldri; den er en forventningsvane.',
      vulnerabilities: [
        'Fører til radikal skepsis som truer med å underminere naturvitenskapens gyldighet.',
        'Kan vanskelig forklare a priori matematisk nødvendighet uten å redusere det til rene tautologier.',
      ],
    },
    synthesisAndComparison:
      'Descartes bygger et fundament av urokkelig fornuftssikkerhet; Hume river fundamentet ned og viser at vi må nøye oss med sannsynlighetsvaner. Dette motsetningsforholdet vekket senere Kant fra hans «dogmatiske slummer».',
    gradingAdvice:
      'Sensor belønner studenter som forklarer Humes skille mellom «impressions» og «ideas», og som presist formulerer induksjonsproblemet med et eksempel.',
  },
  {
    id: 'popper-vs-kuhn',
    title: 'Popper vs. Kuhn: Hvordan gjør vitenskapen egentlig fremskritt?',
    topic: 'Vitenskapsfilosofi: Falsifikasjonisme vs. Paradigmeskifter',
    pillar: 'erkjennelse',
    examPrompt:
      'Gjør rede for Karl Poppers og Thomas Kuhns syn på vitenskapelig metode og vitenskapens utvikling. Hva skiller Poppers normative ideal om falsifikasjon fra Kuhns deskriptive teori om paradigmer?',
    clarifications: [
      {
        term: 'Normativ vitenskapsteori (Popper)',
        explanation: 'Fokuserer på hvordan vitenskapsfolk BØR gå frem logisk for å sikre rasjonell kunnskap.',
      },
      {
        term: 'Deskriptiv/sosial vitenskapsteori (Kuhn)',
        explanation: 'Fokuserer på hvordan vitenskap FAKTISK bedrives i praksis gjennom historiske faser og fellesskap.',
      },
    ],
    sideA: {
      philosopherId: 'popper',
      philosopherName: 'Karl Popper',
      positionName: 'Kritisk rasjonalisme (Falsifikasjonisme)',
      mainThesis: 'Vitenskap drives fremover ved å formulere dristige hypoteser og nådeløst forsøke å motbevise (falsifisere) dem.',
      keyArguments: [
        'Demarkasjon: En teori er vitenskapelig hvis og bare hvis den er falsifiserbar.',
        'Asymmetri: Én million hvite svaner beviser ikke at alle svaner er hvite, men én eneste sort svane motbeviser det.',
        'Kumulativ vekst mot sannheten: Gjennom kontinuerlig prøving og feiling nærmer vi oss sannheten (verisimilitude).',
      ],
      classicExample: 'Einsteins generelle relativitetsteori: Forutsa at stjernelys ville avbøyes av solens tyngdefelt. Eddington testet dette under en solformørkelse i 1919; hadde lyset ikke blitt avbøyd, ville teorien vært vraket.',
      vulnerabilities: [
        'Duhem-Quine-tesen: En hypotese kan aldri testes isolert; ved negativt resultat kan man skylde på måleinstrumenter eller hjelpeantakelser.',
        'Forskere kaster sjelden en etablert teori bare fordi de møter én anomali.',
      ],
    },
    sideB: {
      philosopherId: 'foucault', // Brukes som motvekt / epistemologisk representant sammen med Kuhn
      philosopherName: 'Thomas Kuhn & vitenskapssosiologien',
      positionName: 'Paradigmeteori & Historisk diskontinuitet',
      mainThesis: 'Vitenskap utvikler seg ikke jevnt og kumulativt, men gjennom revolusjonære brudd (paradigmeskifter).',
      keyArguments: [
        'Normalvitenskap: Forskere jobber innenfor et felles paradigme med puslespill-løsning uten å betvile grunnlaget.',
        'Krise og anomali: Når avvikene (anomaliene) hoper seg opp, mister paradigmet tillit.',
        'Vitenskapelig revolusjon: Et nytt paradigme erstatter det gamle. De to er inkommensurable (usammenlignbare) fordi de bruker forskjellige begrepsverdener.',
      ],
      classicExample: 'Det kopernikanske skiftet: Fra Ptolemeus’ geosentriske verdensbilde til Kopernikus’ heliosentriske system. Det var ikke bare ny empiri, men et helt nytt verdensbilde.',
      vulnerabilities: [
        'Fare for relativisme: Hvis paradigmer er inkommensurable, finnes det da noen objektiv rasjonell målestokk for fremskritt?',
      ],
    },
    synthesisAndComparison:
      'Popper er rasjonalist og normativ: vitenskapen er en permanent revolusjon mot dogmer. Kuhn er historiker og sosiolog: vitenskapen er for det meste konservativ normalvitenskap, avbrutt av sjeldne revolusjoner.',
    gradingAdvice:
      'Gjør rede for begrepene «normalvitenskap», «anomali», «krise» og «paradigmeskifte» hos Kuhn, og sammenhold det direkte med Poppers krav om kontinuerlig falsifikasjonsvilje.',
  },
  {
    id: 'hobbes-vs-locke',
    title: 'Hobbes vs. Locke: Hvorfor trenger vi en stat?',
    topic: 'Politisk filosofi: Samfunnskontrakten og statens legitimitet',
    pillar: 'etikk',
    examPrompt:
      'Gjør rede for Thomas Hobbes’ og John Lockes syn på naturtilstanden, menneskets rettigheter og samfunnskontrakten. Hvilke konsekvenser får deres ulike utgangspunkt for synet på statsmaktens grenser og retten til opprør?',
    clarifications: [
      {
        term: 'Naturtilstanden',
        explanation: 'En hypotetisk tilstand av menneskelig samliv før etableringen av en overordnet statsmakt og lovverk.',
      },
      {
        term: 'Samfunnskontrakten',
        explanation: 'Avtalen der borgerne overdrar visse rettigheter eller makt til en felles myndighet til gjengjeld for sikkerhet og rettsorden.',
      },
    ],
    sideA: {
      philosopherId: 'hobbes',
      philosopherName: 'Thomas Hobbes',
      positionName: 'Absolutt suverenitet (Leviathan)',
      mainThesis: 'Uten en mektig stat er naturtilstanden en alles krig mot alle. Kun en udelelig og ubestridt suveren kan garantere fred.',
      keyArguments: [
        'Menneskets natur drives av egeninteresse, frykt og ærgjerrighet.',
        'I naturtilstanden finnes verken rettferdighet eller eiendomsrett; makt er rett.',
        'Kontrakten er ugjenkallelig: Å gjøre opprør mot suverenen er å kaste samfunnet tilbake i krigens redsler.',
      ],
      classicExample: 'Borgerkrig: Når statsmakten kollapser, ser man hvordan samfunnet umiddelbart glir over i vold og frykt.',
      vulnerabilities: [
        'Gir legitimitet til tyranni og mangler vern mot overgrep fra staten mot egne borgere.',
      ],
    },
    sideB: {
      philosopherId: 'locke',
      philosopherName: 'John Locke',
      positionName: 'Konstitusjonelt styre & Naturlige rettigheter',
      mainThesis: 'Mennesket har naturlige rettigheter til liv, frihet og eiendom. Staten er kun en tillitsvalgt tjener for å sikre disse.',
      keyArguments: [
        'Naturtilstanden er underlagt fornuftens og naturens morallov.',
        'Eiendomsrett oppstår naturlig når mennesket blander sitt eget arbeid med naturen.',
        'Retten til opprør: Dersom en stat blir tyrannisk og krenker borgernes rettigheter, er kontrakten brutt og folket kan avsette regimet.',
      ],
      classicExample: 'Den amerikanske uavhengighetserklæringen (1776): Bygget direkte på Lockes lære om retten til å kaste en undertrykkende konge.',
      vulnerabilities: [
        'Ulikhetsproblem: Forsvar for ubegrenset privat eiendom kan føre til store sosiale forskjeller som undergraver friheten.',
      ],
    },
    synthesisAndComparison:
      'Hobbes prioriterer orden og overlevelse over frihet (enevelde). Locke prioriterer individuell frihet og rettssikkerhet over blind orden (konstitusjonelt demokrati).',
    gradingAdvice:
      'Husk å poengtere forskjellen i synet på opprørsrett: Hobbes avviser opprørsrett totalt; Locke anser opprørsretten som en legitim og nødvendig nødventil.',
  },
  {
    id: 'sartre-vs-de-beauvoir',
    title: 'Sartre vs. Beauvoir: Hvor frie er vi egentlig?',
    topic: 'Menneskesyn & Eksistensialisme: Radikal frihet vs. Situert frihet',
    pillar: 'menneskesyn',
    examPrompt:
      'Sammenlign Jean-Paul Sartres og Simone de Beauvoirs eksistensialisme. Drøft tesen «eksistensen går forut for essensen» og diskuter i hvilken grad menneskets frihet begrenses av dets sosiale situasjon og kjønn.',
    clarifications: [
      {
        term: 'Eksistens går forut for essensen',
        explanation: 'Mennesket har ingen medfødt forhåndsbestemt natur; vi må skape hvem vi er gjennom våre egne handlinger og valg.',
      },
      {
        term: 'Situert frihet',
        explanation: 'Friheten oppstår alltid innenfor en konkret historisk, kroppslig og sosial kontekst som setter rammer for våre muligheter.',
      },
    ],
    sideA: {
      philosopherId: 'sartre',
      philosopherName: 'Jean-Paul Sartre',
      positionName: 'Radikal ontologisk frihet',
      mainThesis: 'Mennesket er dømt til frihet. Uansett situasjon har vi alltid et valg, og vi bærer totalt ansvar.',
      keyArguments: [
        'Bevisstheten er intetgjørende (pour-soi); vi er ikke bestemt av fortiden.',
        'Ond tro (mauvaise foi): Å late som man ikke har et valg, eller skylde på gener, oppdragelse eller samfunn.',
        'Selv fangen i fengsel er fri – til å velge sin holdning, resignere eller planlegge flukt.',
      ],
      classicExample: 'Kelneren på kaféen: Beveger seg med overdrevne kelner-bevegelser og «spiller rollen» for å unngå å innse sin egen eksistensielle frihet.',
      vulnerabilities: [
        'Kan virke blind for reell strukturell undertrykkelse, fattigdom og fysisk vold.',
      ],
    },
    sideB: {
      philosopherId: 'de-beauvoir',
      philosopherName: 'Simone de Beauvoir',
      positionName: 'Situert frihet & Feministisk eksistensialisme',
      mainThesis: 'Frihet er reell, men den er alltid situert. Samfunnets strukturer og kultur kan frata grupper muligheten til å utøve sin frihet.',
      keyArguments: [
        '«Man fødes ikke som kvinne, man blir det»: Kvinner sosialiseres inn i rollen som «den Andre».',
        'Mannen definerer seg som det universelle subjektet; kvinnen defineres som det relative objektet.',
        'Menneskets frihet krever andres frihet for å realiseres; undertrykking ødelegger også undertrykkerens etiske frihet.',
      ],
      classicExample: 'Kvinnens historiske låsing til hjemmet og immanensen: Ikke et fritt ontologisk valg, men resultatet av lover, økonomi og patriarkalske myter.',
      vulnerabilities: [
        'Spørsmålet om hvordan man bryter ut av en undertrykkende situasjon når selve bevisstheten er formet av den.',
      ],
    },
    synthesisAndComparison:
      'Sartre fokuserer på den abstrakte, absolutte friheten; Beauvoir jorder eksistensialismen i den konkrete, levde virkeligheten til kjønnede kropper i et urettferdig samfunn.',
    gradingAdvice:
      'Fremhev hvordan Beauvoirs begrep om «den Andre» og «situert frihet» videreutvikler og korrigerer Sartres tidlige, mer kompromissløse individualisme.',
  },
  {
    id: 'platon-vs-aristoteles',
    title: 'Platon vs. Aristoteles: Hvor finnes virkeligheten?',
    topic: 'Antikkens metafysikk og erkjennelse: To verdener vs. Én verden',
    pillar: 'erkjennelse',
    examPrompt:
      'Sammenlign Platons og Aristoteles’ syn på virkelighetens natur (metafysikk) og erkjennelse. Hvordan skiller Platons idélære seg fra Aristoteles’ lære om form og stoff (hylomorfisme)?',
    clarifications: [
      {
        term: 'Platons transcendens (To-verden-lære)',
        explanation: 'De sanne vesener (idéene) eksisterer uavhengig av og bortenfor sanseverdenen i et evig, uforanderlig rike.',
      },
      {
        term: 'Aristoteles’ immanens (Hylomorfisme)',
        explanation: 'Form og stoff eksisterer alltid sammen i de konkrete enkelttingene rundt oss i naturen; formen finnes i tingen.',
      },
    ],
    sideA: {
      philosopherId: 'platon',
      philosopherName: 'Platon',
      positionName: 'Idélæren (Objektiv idealisme)',
      mainThesis: 'Vår sanseverden er bare en skyggeverden. Ekte kunnskap (episteme) gjelder de evige idéene, særlig Det Godes Idé.',
      keyArguments: [
        'Hulelignelsen: Menneskene er lenket fast og ser bare skygger av gjenstander, inntil filosofen ledes ut i sollyset.',
        'Erkjennelse som anamnese: Sjelen har skuet idéene før fødselen og må minnes dem gjennom fornuftig dialog.',
      ],
      classicExample: 'Geometriske sirkler: Ingen tegnet sirkel i sanden er perfekt; den perfekte sirkelens vesen eksisterer bare som idé.',
      vulnerabilities: [
        'Tredjemann-argumentet: Hvis likhet mellom to ting krever en idé, krever likheten mellom tingen og idéen en tredje idé, i uendelig regress.',
      ],
    },
    sideB: {
      philosopherId: 'aristoteles',
      philosopherName: 'Aristoteles',
      positionName: 'Hylomorfisme & Erfaringsbasert realisme',
      mainThesis: 'Det finnes ingen separat idéverden. Naturen består av konkrete substanser sammensatt av stoff (hyle) og form (morphe).',
      keyArguments: [
        'Formen gir tingen dens egenskaper og funksjon, men formen kan aldri eksistere løsrevet fra stoffet (unntatt Gud/den ubevegede beveger).',
        'Akt og potens (mulighet og virkeliggjøring): En eikenøtt er et eiketre i potens; forandring er realisering av form.',
      ],
      classicExample: 'Marmorstatuen: Marmoren er stoffet; skulptørens idé om statuen er formen som realiseres i marmoren.',
      vulnerabilities: [
        'Vanskeligheter med å forklare universelle begreper uten å ty til en form for felles vesen som minner om idéer.',
      ],
    },
    synthesisAndComparison:
      'Raffaels berømte freske «Skolen i Athen» oppsummerer det perfekt: Platon peker opp mot himmelen (idéverdenen), mens Aristoteles holder hånden flatt ut mot jorden (naturens konkrete virkelighet).',
    gradingAdvice:
      'Bruk gjerne Raffaels gestus som en pedagogisk ramme, men sørg for å forklare Aristoteles’ begreper «form og stoff» og «akt og potens» presist.',
  },
];

export const EXPHIL_FLASHCARDS: ExphilFlashcard[] = [
  {
    id: 'fc-1',
    concept: 'Det kategoriske imperativ',
    pillar: 'etikk',
    philosopherId: 'kant',
    philosopherName: 'Immanuel Kant',
    definition:
      'Kants øverste moralske prinsipp: Handle bare etter en handlingsregel som du samtidig kan ville skal bli en allmenn lov for alle mennesker.',
    explanation:
      'Krever universell konsistens. Hvis en regel ikke lar seg universalisere uten selvmotsigelse (f.eks. å gi et falskt løfte), er handlingen moralsk uakseptabel.',
    examTip:
      'Husk humanitetsformuleringen også: «Behandle alltid mennesker som et formål i seg selv, aldri bare som et middel». Sensor krever ofte begge formuleringer!',
    example: 'Å låne penger uten intensjon om å betale tilbake ødelegger selve tillitsinstitusjonen for lån dersom alle gjorde det.',
  },
  {
    id: 'fc-2',
    concept: 'Humes giljotin (Er/Bør-problemet)',
    pillar: 'etikk',
    philosopherId: 'hume',
    philosopherName: 'David Hume',
    definition:
      'Prinsippet om at man aldri gyldig kan slutte logisk fra deskriptive premisser («hva som ER») til en normativ konklusjon («hva som BØR være»).',
    explanation:
      'Vitenskapen kan fortelle oss nøyaktig hvordan naturen eller hjernen fungerer, men det følger ikke automatisk herfra hvordan vi moralsk bør handle.',
    examTip:
      'Kalles ofte naturalistisk feilslutning. Se etter argumenter som påstår at «noe er naturlig, derfor er det godt».',
    example: '«Mennesket har alltid spist kjøtt» (ER) $\\not\\Rightarrow$ «Mennesket bør spise kjøtt» (BØR).',
  },
  {
    id: 'fc-3',
    concept: 'Dydens gylne middelvei',
    pillar: 'etikk',
    philosopherId: 'aristoteles',
    philosopherName: 'Aristoteles',
    definition:
      'Læren om at enhver moralsk dyd er en harmonisk middeltilstand mellom to laster: en mangel og en overdrivelse.',
    explanation:
      'Dyd er ikke en fast matematisk regel, men en situasjonstilpasset karakteregenskap styrt av praktisk klokskap (phronesis).',
    examTip:
      'Ikke si at det er kompromiss eller middelmådighet! Det er den høyeste fortreffelighet, tilpasset den konkrete situasjonen.',
    example: 'Mot er middelveien mellom feighet (for lite dristighet) og dumdristighet (for mye fareblindhet).',
  },
  {
    id: 'fc-4',
    concept: 'Falsifikasjonisme',
    pillar: 'erkjennelse',
    philosopherId: 'popper',
    philosopherName: 'Karl Popper',
    definition:
      'Det vitenskapsteoretiske kravet om at en hypotese bare er genuint vitenskapelig dersom den er formulert slik at den prinsipielt kan motbevises av observasjon.',
    explanation:
      'Løser demarkasjonsproblemet mellom vitenskap og pseudovitenskap (som astrologi eller marxisme ifølge Popper, fordi de alltid kan bortforklare feil).',
    examTip:
      'Popper avviser induksjon. Vi beviser aldri teorier; vi bare tester dem hardt, og de som overlever regnes som foreløpig styrket (korroborert).',
    example: '«Alle svaner er hvite» er en vitenskapelig påstand fordi den kan falsifiseres av én sort svane.',
  },
  {
    id: 'fc-5',
    concept: 'Paradigmeskifte & Inkommensurabilitet',
    pillar: 'erkjennelse',
    philosopherId: 'popper',
    philosopherName: 'Thomas Kuhn',
    definition:
      'Et paradigmeskifte er en vitenskapelig revolusjon der et helt verdensbilde erstattes. Inkommensurabilitet betyr at paradigmene er usammenlignbare fordi de bruker ulike begreper og målestokker.',
    explanation:
      'Viser at vitenskap ikke bare er lineær akkumulering av fakta, men formet av vitenskapssamfunnets sosiale og historiske briller.',
    examTip:
      'Husk de fire fasene: Normalvitenskap $\\rightarrow$ Anomali $\\rightarrow$ Krise $\\rightarrow$ Revolusjon (nytt paradigme).',
    example: 'Overgangen fra ptolemeisk geosentrisk astronomi til kopernikansk heliosentrisk astronomi.',
  },
  {
    id: 'fc-6',
    concept: 'Cogito, ergo sum',
    pillar: 'erkjennelse',
    philosopherId: 'descartes',
    philosopherName: 'René Descartes',
    definition:
      '«Jeg tenker, altså er jeg». Det urokkelige fundamentet Descartes nådde etter å ha utsatt alle sanseinntrykk og lærdommer for metodisk tvil.',
    explanation:
      'Selv om en ond demon skulle lure meg til å tro at 2+2=5 eller at jeg har en kropp, må det likevel finnes et «jeg» som opplever å bli lurt.',
    examTip:
      'Vær nøye: Dette beviser foreløpig bare eksistensen av en tenkende substans (res cogitans), ikke den fysiske kroppen!',
    example: 'Du kan tvile på alt du ser på skjermen foran deg, men du kan ikke tvile på at du akkurat nå opplever tvil.',
  },
  {
    id: 'fc-7',
    concept: '«Eksistensen går forut for essensen»',
    pillar: 'menneskesyn',
    philosopherId: 'sartre',
    philosopherName: 'Jean-Paul Sartre',
    definition:
      'Hovedtesen i ateistisk eksistensialisme: Mennesket oppstår først i verden uten noen medfødt natur eller forutbestemt formål, og definerer seg selv gjennom sine handlinger.',
    explanation:
      'I motsetning til en gjenstand (som en saks, der skaperen har en idé/essens før den lages), må mennesket selv skape sin mening.',
    examTip:
      'Knytt alltid dette til sartreansk ansvar og angst: Fordi ingen Gud eller natur har forhåndsprogrammert oss, er vi «dømt til frihet».',
    example: 'Du er ikke «født feig» eller «født modig»; du blir feig eller modig gjennom de valgene du tar.',
  },
  {
    id: 'fc-8',
    concept: 'Ond tro (Mauvaise foi)',
    pillar: 'menneskesyn',
    philosopherId: 'sartre',
    philosopherName: 'Jean-Paul Sartre',
    definition:
      'Selvbedrag der et menneske later som det mangler frie valgmuligheter og skylder på ytre omstendigheter, sosial rolle eller medfødt natur.',
    explanation:
      'En flukt fra den eksistensielle angsten som følger med å innse at man selv bærer 100 % ansvar for hvem man er.',
    examTip:
      'Typisk eksamenseksempel er kafékelneren som reduserer seg selv til en robotaktig rolle for å slippe å ta stilling til sitt eget liv.',
    example: '«Jeg måtte jukse på eksamen, for samfunnet presset meg så hardt at jeg ikke hadde noe valg.»',
  },
  {
    id: 'fc-9',
    concept: 'Dypøkologi vs. Grunnøkologi',
    pillar: 'etikk',
    philosopherId: 'arne-naess',
    philosopherName: 'Arne Næss',
    definition:
      'Grunnøkologi verner naturen ut fra menneskets nyttebehov (antroposentrisk). Dypøkologi anerkjenner at alt liv har en iboende verdi (egenverdi) uavhengig av menneskelig nytte.',
    explanation:
      'Næss’ filosofi (Økosofi T) krever en dypere holdningsendring der mennesket identifiserer seg med hele biosfæren.',
    examTip:
      'Bruk begrepet «biosfærisk egalitarisme» for å imponere sensor!',
    example: 'Å redde regnskogen fordi den inneholder medisiner for mennesker (grunnøkologi) vs. å bevare regnskogen fordi økosystemet har rett til å blomstre i seg selv (dypøkologi).',
  },
  {
    id: 'fc-10',
    concept: 'Allmennviljen (Volonté générale)',
    pillar: 'etikk',
    philosopherId: 'rousseau',
    philosopherName: 'Jean-Jacques Rousseau',
    definition:
      'Fellesskapets felles vilje rettet mot allmennhetens beste og like lover for alle borgere.',
    explanation:
      'Skiller seg fundamentalt fra «alles vilje» (volonté de tous), som bare er en avstemning eller summen av borgernes egoistiske særinteresser.',
    examTip:
      'Rousseau hevder kontroversielt at den som nekter å adlyde allmennviljen må «tvinges til å være fri». Sensor elsker drøfting av dette paradokset.',
    example: 'En lov som krever skatt for å bygge et universelt helsevesen kan være allmennviljen, selv om mange individuelt helst ville sluppet å betale.',
  },
  {
    id: 'fc-11',
    concept: 'Hypotetisk-deduktiv metode (HDM)',
    pillar: 'erkjennelse',
    pillarLabel: 'Vitenskapsfilosofi',
    definition:
      'Den klassiske vitenskapelige metoden der man formulerer en hypotese, utleder empiriske konsekvenser ved deduksjon, og tester disse mot observasjoner.',
    explanation:
      'Kombinerer rasjonalisme (deduksjon av konsekvenser) med empirisme (observasjon og testing).',
    examTip:
      'Strukturen i besvarelsen: 1. Problemstilling, 2. Hypotese, 3. Dedusert empirisk konsekvens (hvis H er sann, må E inntreffe), 4. Test/Eksperiment.',
    example: 'Semmelweis’ oppdagelse av barselfeber: Hvis legers urene hender smitter fødende (H), vil grundig håndvask med klorvann redusere dødeligheten (E).',
  },
  {
    id: 'fc-12',
    concept: 'Ondskapens banalitet',
    pillar: 'etikk',
    philosopherId: 'arendt',
    philosopherName: 'Hannah Arendt',
    definition:
      'Teorien om at monumental ondskap ikke nødvendigvis skyldes sadistisk ond vilje, men ofte tankeløshet, mangel på empati og blind byråkratisk lydighet.',
    explanation:
      'Formulert under rettssaken mot Adolf Eichmann i Jerusalem i 1961.',
    examTip:
      'Presiser alltid at Arendt ikke bagatelliserte Holocaust. Det var Eichmanns personlige motiver (en pliktoppfyllende karrierebyråkrat) som var banale, mens handlingene var monstrøse.',
    example: 'Funksjonæren som bare «gjør jobben sin og følger reglene» uten noensinne å tenke over handlingenes moralske konsekvenser for medmennesker.',
  },
];

export const EXPHIL_QUIZ_QUESTIONS: ExphilQuizQuestion[] = [
  {
    id: 'eq-1',
    question: 'Hva kjennetegner Kants kategoriske imperativ i motsetning til et hypotetisk imperativ?',
    pillar: 'etikk',
    relatedPhilosopherId: 'kant',
    options: [
      'Det kategoriske imperativet gjelder ubetinget for alle fornuftsvesener, uavhengig av hvilke personlige mål eller ønsker man har.',
      'Det kategoriske imperativet forteller hva du bør gjøre for å oppnå størst mulig personlig lykke.',
      'Det hypotetiske imperativet er overordnet moralloven og tillater unntak i nødsituasjoner.',
      'Det kategoriske imperativet vurderer handlinger ut fra deres sannsynlige konsekvenser.',
    ],
    correctIndex: 0,
    explanation:
      'Riktig! Et hypotetisk imperativ har formen «Hvis du vil ha X, må du gjøre Y» (betinget av et ønske). Det kategoriske imperativet krever ubetinget lydighet: «Gjør Y!» uansett hva du har lyst til.',
  },
  {
    id: 'eq-2',
    question: 'Hva er Humes kjente innvending mot induktive slutninger i vitenskapen?',
    pillar: 'erkjennelse',
    relatedPhilosopherId: 'hume',
    options: [
      'Sansene våre er for svake til å måle naturens mikroskopiske partikler.',
      'At noe har hendt på en bestemt måte tusen ganger før, gir ingen logisk garanti for at det samme vil skje neste gang.',
      'Induksjon forutsetter at Gud ikke griper inn med mirakler i skaperverket.',
      'Induksjon kan bare brukes i matematikk, aldri i naturvitenskap.',
    ],
    correctIndex: 1,
    explanation:
      'Riktig! Induksjonsslutningen (fra enkelttilfeller til universell lov) forutsetter at «naturen er ensartet». Men denne antakelsen kan ikke bevises uten å begå en sirkelslutning ved å bruke induksjon for å bevise induksjon.',
  },
  {
    id: 'eq-3',
    question: 'Hva mener Aristoteles med begrepet «eudaimonia» i sin dydsetikk?',
    pillar: 'etikk',
    relatedPhilosopherId: 'aristoteles',
    options: [
      'En forbigående følelse av intens fysisk nytelse og fravær av smerte.',
      'En pliktfølelse der man undertrykker egne følelser for å lyde statens lover.',
      'Menneskelig oppblomstring og et vellykket, meningsfullt liv gjennom utfoldelse av menneskets rasjonelle evner og dyder.',
      'En åndelig tilstand som bare kan oppnås i klosterliv og isolasjon fra samfunnet.',
    ],
    correctIndex: 2,
    explanation:
      'Riktig! Eudaimonia oversettes ofte med «lykke», men betyr snarere «menneskelig oppblomstring» eller et velfungerende liv i tråd med menneskets natur som et fornuftig og sosialt vesen.',
  },
  {
    id: 'eq-4',
    question: 'Hvorfor avviser Karl Popper at vitenskapelige teorier kan verifiseres?',
    pillar: 'erkjennelse',
    relatedPhilosopherId: 'popper',
    options: [
      'Fordi ingen mengde bekreftende observasjoner er nok til å bevise en universell påstand, mens én enkelt motstridende observasjon er nok til å motbevise den.',
      'Fordi all vitenskap i bunn og grunn er relativ og styrt av politiske maktinteresser.',
      'Fordi målinger i kvantefysikken alltid forstyrrer partiklenes posisjon.',
      'Fordi Popper mente at vitenskap og religion i realiteten er nøyaktig det samme.',
    ],
    correctIndex: 0,
    explanation:
      'Riktig! Dette er Poppers berømte asymmetri mellom verifikasjon og falsifikasjon. Ingen mengde hvite svaner beviser at «alle svaner er hvite», men en eneste sort svane falsifiserer påstanden umiddelbart.',
  },
  {
    id: 'eq-5',
    question: 'Hva innebærer Jean-Paul Sartres begrep «ond tro» (mauvaise foi)?',
    pillar: 'menneskesyn',
    relatedPhilosopherId: 'sartre',
    options: [
      'Å tro på en religion som ikke er anerkjent av staten.',
      'At man bevisst forsøker å skade andre mennesker av pur ondskap.',
      'At man flykter fra sitt eget eksistensielle ansvar ved å late som om man mangler frie valgmuligheter.',
      'At man tviler på vitenskapens evne til å forklare universets opprinnelse.',
    ],
    correctIndex: 2,
    explanation:
      'Riktig! Ond tro er å redusere seg selv til en gjenstand eller en rolle, og unnskylde seg med at «jeg hadde ikke noe valg», for å slippe unna angsten for friheten.',
  },
  {
    id: 'eq-6',
    question: 'Hva er hovedforskjellen mellom Thomas Hobbes’ og John Lockes syn på naturtilstanden?',
    pillar: 'etikk',
    relatedPhilosopherId: 'hobbes',
    options: [
      'Hobbes mente mennesket var en edel villmann, mens Locke mente mennesket var en maskin.',
      'Hobbes så naturtilstanden som en brutal krigstilstand uten moral, mens Locke mente den var underlagt fornuftens og naturens morallov.',
      'Hobbes forsvarte demokrati og opprørsrett, mens Locke kjempet for eneveldig kongemakt.',
      'Hobbes mente samfunnskontrakten kunne oppløses når som helst, mens Locke mente den var evigvarende.',
    ],
    correctIndex: 1,
    explanation:
      'Riktig! For Hobbes er naturtilstanden alles krig mot alle der livet er «ensomt, fattig, ekkelt, brutalt og kort». For Locke er mennesket allerede i naturtilstanden moralsk bundet av naturens lov og besitter naturlige rettigheter til liv, helse, frihet og eiendom.',
  },
];
