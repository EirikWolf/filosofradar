import type { EthicalDilemma, EthicalSchool, UserEthicsProfile } from './types';

export const ETHICAL_SCHOOL_META: Record<EthicalSchool, { label: string; nameNor: string; color: string; description: string; icon: string }> = {
  consequentialism: {
    label: 'Konsekvensialisme',
    nameNor: 'Utilitarisme & Konsekvensetikk',
    color: '#38bdf8', // Cyan
    description: 'En handlings moralske verdi avgjøres utelukkende av dens konsekvenser: Størst mulig lykke for flest mulig levende vesener.',
    icon: '📊',
  },
  deontology: {
    label: 'Pliktetikk',
    nameNor: 'Deontologi & Kants morallov',
    color: '#eab308', // Gold
    description: 'Enkelte handlinger er i seg selv rett eller galt, uavhengig av konsekvensene. Mennesket må aldri behandles som et rent middel.',
    icon: '📜',
  },
  virtue: {
    label: 'Dydsetikk',
    nameNor: 'Aristotelisk Dydsetikk',
    color: '#34d399', // Emerald
    description: 'Fokuserer på karakter, visdom og handlingens helhet. Det handler om å handle med praktisk klokskap (fronesis) og finne det gylne middelmådighet.',
    icon: '🌿',
  },
  care: {
    label: 'Omsorgsetikk',
    nameNor: 'Nærhets- & Omsorgsetikk',
    color: '#f43f5e', // Rose
    description: 'Moral oppstår i det konkrete møtet med den sårbare Andre. Våre forpliktelser springer ut av relasjoner, empati og tillit, ikke abstrakte formler.',
    icon: '🤝',
  },
  existentialism: {
    label: 'Eksistensialisme',
    nameNor: 'Eksistensiell frihet & Ansvar',
    color: '#a855f7', // Purple
    description: 'Det finnes ingen ferdige etiske fasiter i himmelen. Du er dømt til frihet og må ta fullt personlig ansvar for ditt eget valg uten unnskyldninger.',
    icon: '🔥',
  },
};

export const ETHICAL_DILEMMAS: EthicalDilemma[] = [
  {
    id: 'sporvognen',
    title: 'Sporvognsdilemmaet: Sidesporet',
    subtitle: 'Klassikeren fra Philippa Foot (1967)',
    category: 'Klassisk dilemma',
    icon: '🚋',
    image: '/images/hooks/philippa-foot-sporvogn.webp',
    scenario:
      'En løpsk sporvogn dundrer ukontrollert nedover sporet. Fem banearbeidere står lenger nede og vil garantert bli drept fordi de ikke kan rømme. Du står ved en mekanisk spak: Hvis du trekker i den, styres sporvognen inn på et sidespor der det bare står én arbeider.',
    stakeholders: ['5 arbeidere på hovedsporet', '1 arbeider på sidesporet', 'Deg ved spaken'],
    examContext:
      'Sentralt pensum i Ex.phil: Brukes til å illustrere forskjellen mellom handlingsutilitarisme (redde 5 liv) og pliktetikk (aktivt forårsake en uskyldigs død).',
    options: [
      {
        id: 'sporvogn-trekk',
        title: 'Trekk i spaken',
        actionText: 'Styr sporvognen over på sidesporet (1 dør, 5 overlever)',
        description: 'Du velger aktivt å omdirigere toget for å minimere det totale tapet av menneskeliv.',
        primarySchool: 'consequentialism',
        scores: { consequentialism: 10, deontology: 2, virtue: 6, care: 3, existentialism: 7 },
        reactions: [
          {
            philosopherId: 'mill',
            philosopherName: 'John Stuart Mill',
            stance: 'agree',
            verdict: 'Rasjonelt og riktig!',
            comment:
              'Et liv tapt veier mindre enn fem tapte liv. Handlingen minimerer den totale mengden lidelse i verden, og det er enhver moralsk aktørs høyeste plikt.',
            exphilConcept: 'Nytteprinsippet (Utility Principle)',
          },
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'disagree',
            verdict: 'Problematisk innblanding!',
            comment:
              'Ved å trekke i spaken tar du et aktivt valg om å gjøre den ene arbeideren til et redskap for de andres overlevelse. Drap er uforenlig med den universelle moralloven.',
            exphilConcept: 'Det kategoriske imperativ (Formulering 2)',
          },
          {
            philosopherId: 'foot',
            philosopherName: 'Philippa Foot',
            stance: 'nuance',
            verdict: 'Negativ vs. Positiv plikt',
            comment:
              'Her avleder du en eksisterende trussel i stedet for å skape en ny. Mange intuisjoner aksepterer dette fordi man ikke bruker offeret direkte som bremsekloss.',
            exphilConcept: 'Doktrinen om dobbel virkning',
          },
        ],
      },
      {
        id: 'sporvogn-la-ga',
        title: 'Gjør ingenting',
        actionText: 'La sporvognen fortsette rett frem (5 dør, du rører ikke spaken)',
        description: 'Du nekter å bli en aktiv morder ved å gripe inn i skjebnens gang.',
        primarySchool: 'deontology',
        scores: { consequentialism: 1, deontology: 10, virtue: 4, care: 5, existentialism: 4 },
        reactions: [
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'agree',
            verdict: 'Moralsk renhet bevart!',
            comment:
              'Du er ikke ansvarlig for at sporvognen har mistet bremsene, men hvis du rører spaken, blir du direkte skyldig i drapet på personen på sidesporet.',
            exphilConcept: 'Pliktens ubetingede renhet',
          },
          {
            philosopherId: 'bentham',
            philosopherName: 'Jeremy Bentham',
            stance: 'disagree',
            verdict: 'Katastrofal unnlatelse!',
            comment:
              'Å unnlate å handle når du kunne reddet fem mennesker er like moralsk forkastelig som å drepe dem selv. Matematiske fakta: 5 lik er verre enn 1.',
            exphilConcept: 'Hedonistisk kalkyle',
          },
        ],
      },
    ],
  },
  {
    id: 'gangbroen',
    title: 'Gangbroen og den store mannen',
    subtitle: 'Judith Jarvis Thomsons utvidelse (1976)',
    category: 'Klassisk dilemma',
    icon: '🌉',
    scenario:
      'Samme løpske sporvogn er på vei mot de 5 arbeiderne. Denne gangen er det ikke noe sidespor. Du står på en gangbro over sporene ved siden av en svært tung mann. Hvis du dytter ham ned foran toget, vil hans kropp stoppe sporvognen. Han dør momentant, men de fem arbeiderne reddes. Vil du dytte ham?',
    stakeholders: ['5 arbeidere på sporet', 'Den intetanende mannen på gangbroen', 'Deg'],
    examContext:
      'Avdekker hvorfor ren nyttekalkyle krasjer med våre intuitive rettighetsbegreper. Bruk av mennesket utelukkende som et middel.',
    options: [
      {
        id: 'gangbro-dytt',
        title: 'Dytt mannen over rekkverket',
        actionText: 'Dytt ham ned for å stoppe toget (1 ofres, 5 reddes)',
        description: 'Nyttekalkylen er matematisk identisk med forrige dilemma: 1 liv ofres for å redde 5.',
        primarySchool: 'consequentialism',
        scores: { consequentialism: 10, deontology: 0, virtue: 1, care: 1, existentialism: 6 },
        reactions: [
          {
            philosopherId: 'singer',
            philosopherName: 'Peter Singer',
            stance: 'agree',
            verdict: 'Konsekvent nytte!',
            comment:
              'Hvis du syntes det var greit å trekke i spaken i forrige oppgave, hvorfor skulle det være annerledes her? Emosjonell vemmelse er ingen god moralsk veileder.',
            exphilConcept: 'Konsekvensialistisk konsistens',
          },
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'disagree',
            verdict: 'Grov forbrytelse mot menneskeverdet!',
            comment:
              'Her bruker du et levende menneske som en ren fysisk bremsekloss! Du reduserer en fornuftsbærende person med uendelig egenverdi til et dødt objekt.',
            exphilConcept: 'Menneskeverdsformuleringen',
          },
        ],
      },
      {
        id: 'gangbro-la-vaere',
        title: 'Nekt å dytte mannen',
        actionText: 'La mannen stå i fred (De fem dør)',
        description: 'Du nekter å overskride den absolutte grensen: Man kan ikke fysisk myrde en uskyldig tilskuer.',
        primarySchool: 'deontology',
        scores: { consequentialism: 2, deontology: 10, virtue: 8, care: 8, existentialism: 5 },
        reactions: [
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'agree',
            verdict: 'Helt fundamentalt riktig!',
            comment:
              'Menneskets rett til liv er ukrenkelig. Det finnes visse handlinger ingen god hensikt noen gang kan rettferdiggjøre.',
            exphilConcept: 'Kategorisk forbud mot instrumentalisering',
          },
          {
            philosopherId: 'aristoteles',
            philosopherName: 'Aristoteles',
            stance: 'agree',
            verdict: 'Rettferdighet og måtehold',
            comment:
              'Et dydig menneske kan ikke kaste en uskyldig medborger i døden for å rydde opp etter et uhell. Å handle dydig krever karakter og respekt for byens felleskap.',
            exphilConcept: 'Dyd og karakter',
          },
        ],
      },
    ],
  },
  {
    id: 'morderen',
    title: 'Morderen ved døren: Sannhetens grense',
    subtitle: 'Kants mest omstridte eksempel (1797)',
    category: 'Plikt vs. Løgn',
    icon: '🚪',
    image: '/images/hooks/kant-morderen-ved-doren.webp',
    scenario:
      'En god venn banker panisk på døren din og gjemmer seg under sengen din fordi en morder er ute etter ham. To minutter senere banker en mann med en blodig øks på døren og spør deg rett ut: «Er vennen din inne i dette huset?»',
    stakeholders: ['Vennen din under sengen', 'Morderen med øksen', 'Deg ved døren'],
    examContext:
      'Kants kjente essay «Om en påstått rett til å lyve av menneskekjærlighet». Kants absolutte forbud mot løgn versus Benjamin Constants rett til sannhet.',
    options: [
      {
        id: 'morderen-lyg',
        title: 'Lyv for morderen',
        actionText: '«Nei, jeg så ham løpe ned mot bryggene!»',
        description: 'Du lyver for å villede morderen og redde vennens liv.',
        primarySchool: 'care',
        scores: { consequentialism: 8, deontology: 1, virtue: 8, care: 10, existentialism: 8 },
        reactions: [
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'disagree',
            verdict: 'Strengt forbudt!',
            comment:
              'Hvis du lyver, undergraver du selve muligheten for sannferdighet og kontrakter i samfunnet. Hva om vennen din i mellomtiden snek seg ut bakdøren og løp rett i armene på morderen ved bryggene? Da bærer DU det juridiske og moralske ansvaret for hans død!',
            exphilConcept: 'Løgnens universelle selvmotsigelse',
          },
          {
            philosopherId: 'schopenhauer',
            philosopherName: 'Arthur Schopenhauer',
            stance: 'agree',
            verdict: 'Kant er absurd her!',
            comment:
              'Kants påstand om at man ikke kan lyve for en morder er stivbent pedanteri! Medfølelse (Mitleid) er moralens sanne fundament. Å ofre en venn for en abstrakt regel er moralsk blindhet.',
            exphilConcept: 'Medfølelsens etikk',
          },
        ],
      },
      {
        id: 'morderen-sannhet',
        title: 'Svar sannferdig',
        actionText: '«Ja, han gjemmer seg under sengen i annen etasje.»',
        description: 'Du nekter å kompromittere din absolutte plikt til aldri å lyve.',
        primarySchool: 'deontology',
        scores: { consequentialism: 0, deontology: 10, virtue: 1, care: 0, existentialism: 2 },
        reactions: [
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'agree',
            verdict: 'Plikten er oppfylt!',
            comment:
              'Sannferdighet er en ubetinget plikt overfor menneskeheten som helhet. Morderen bærer fullt ut skylden for hva han velger å gjøre; du forblir moralsk ren.',
            exphilConcept: 'Det kategoriske imperativ',
          },
          {
            philosopherId: 'logstrup',
            philosopherName: 'K.E. Løgstrup',
            stance: 'disagree',
            verdict: 'Svikt i den etiske fordring!',
            comment:
              'Når et annet menneske betror sitt liv til deg, har du en umiddelbar fordring om å ta vare på det livet. Å angi vennen til en øksemorder er å forråde selve livets tillit.',
            exphilConcept: 'Den etiske fordring',
          },
        ],
      },
    ],
  },
  {
    id: 'transplantasjon',
    title: 'Kirurgens hemmelige kalkyle',
    subtitle: 'Nytteetikkens mest urovekkende moteksempel',
    category: 'Medisinsk etikk',
    icon: '🏥',
    scenario:
      'Du er overlege på et sykehus. Fem unge pasienter vil dø innen kvelden dersom de ikke får nye organer (hjerte, lunger, nyrer, lever). En frisk turist kommer inn til en rutinemessig blodprøve. Hans vev og blodtype er en 100 % perfekt match for alle fem pasientene. Du kan gi ham en dødelig overdose narkose uten at noen noen gang finner det ut, og redde de fem andre.',
    stakeholders: ['5 døende pasienter', '1 frisk turist', 'Legeetikkens tillit'],
    examContext:
      'Klassisk innvending mot ren handlingsutilitarisme: Hvorfor kan vi ikke bare «høste» organer fra friske personer hvis summen av lykke blir større?',
    options: [
      {
        id: 'kirurg-nekt',
        title: 'Behandle pasienten normalt',
        actionText: 'La turisten gå hjem (De 5 pasientene dør av organsvikt)',
        description: 'Du nekter å drepe en uskyldig pasient som stoler på helsevesenet.',
        primarySchool: 'deontology',
        scores: { consequentialism: 4, deontology: 10, virtue: 9, care: 8, existentialism: 6 },
        reactions: [
          {
            philosopherId: 'mill',
            philosopherName: 'John Stuart Mill',
            stance: 'agree',
            verdict: 'Regelutilitaristisk klokt!',
            comment:
              'Selv som utilitarist må man innse at et samfunn der pasienter frykter at sykehuset vil stjele organene deres, vil kollapse i total mistillit. Derfor er regelen «drep aldri en pasient» den regelen som skaper mest lykke på sikt!',
            exphilConcept: 'Regelutilitarisme',
          },
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'agree',
            verdict: 'Absolutt ukrenkelighet!',
            comment:
              'Dette viser nøyaktig hvorfor menneskeverdet aldri kan underlegges en matematisk nyttekalkyle.',
            exphilConcept: 'Menneskeverdets ukrenkelighet',
          },
        ],
      },
      {
        id: 'kirurg-ofre',
        title: 'Ofre turisten i hemmelighet',
        actionText: 'Høst organene for å redde fem unge liv (5 reddes, 1 dør)',
        description: 'Ren, kompromissløs handlingsutilitarisme: 5 liv skaper fem ganger mer fremtidig lykke.',
        primarySchool: 'consequentialism',
        scores: { consequentialism: 10, deontology: 0, virtue: 0, care: 1, existentialism: 4 },
        reactions: [
          {
            philosopherId: 'bentham',
            philosopherName: 'Jeremy Bentham',
            stance: 'nuance',
            verdict: 'Enorm risiko, men ren matematikk',
            comment:
              'Hvis hemmeligholdet holdt 100 % for all evighet, ville 5 reddede liv netto gi mer lykke. Men frykten og faren for oppdagelse gjør denne handlingen enormt risikabel.',
            exphilConcept: 'Ekstrem handlingsutilitarisme',
          },
          {
            philosopherId: 'hippokrates',
            philosopherName: 'Hippokrates',
            stance: 'disagree',
            verdict: 'Brudd på legeeden!',
            comment:
              'Primum non nocere – først og fremst: gjør ingen skade! Å bruke medisinens makt til å myrde pasienter er medisinens endelikt.',
            exphilConcept: 'Medisinsk deontologi',
          },
        ],
      },
    ],
  },
  {
    id: 'klimakrisen',
    title: 'Klimakrisen og de ufødte generasjonene',
    subtitle: 'Næss og Jonas om menneskets ansvar overfor fremtiden',
    category: 'Klima & Fremtid',
    icon: '🌍',
    image: '/images/hooks/arne-naess-tvergastein.webp',
    scenario:
      'Ditt lands regjering må vedta en dramatisk klimaplan: Plan A kutter utslipp umiddelbart med 80 %, men vil føre til økonomisk nedgang, dyrere mat, færre reiser og lavere velstand for nålevende innbyggere. Til gjengjeld sikres et levelig biosfære-system for millioner av ufødte mennesker og dyrearter 100 år frem i tid. Plan B prioriterer nåtidens levestandard og utsetter de hardeste kuttene.',
    stakeholders: ['Nålevende velgere og arbeidere', 'Ufødte generasjoner', 'Jordens biosfære'],
    examContext:
      'Arne Næss’ dypøkologi (biosfærisk egalitarisme) og Hans Jonas’ ansvarsprinsipp: Hvordan kan vi ha moralske plikter overfor vesener som ennå ikke eksisterer?',
    options: [
      {
        id: 'klima-kutt',
        title: 'Vedta Plan A (Radikalt kutt nå)',
        actionText: 'Ofre nåværende overflod til fordel for fremtidens biosfære',
        description: 'Du setter naturens egenverdi og fremtidige generasjoners overlevelse over vår kortsiktige forbruksvekst.',
        primarySchool: 'virtue',
        scores: { consequentialism: 8, deontology: 8, virtue: 10, care: 9, existentialism: 8 },
        reactions: [
          {
            philosopherId: 'arne-naess',
            philosopherName: 'Arne Næss',
            stance: 'agree',
            verdict: 'Biosfærisk klokskap!',
            comment:
              'Mennesket har ingen rett til å redusere det rike mangfoldet av livsformer annet enn for å dekke vitale behov. Ekte livskvalitet (ikke levestandard) oppstår i harmoni med naturen.',
            exphilConcept: 'Dypøkologi & Økosofi T',
          },
          {
            philosopherId: 'jonas',
            philosopherName: 'Hans Jonas',
            stance: 'agree',
            verdict: 'Det nye ansvarsprinsippet!',
            comment:
              'Handl slik at virkningene av din handling er forenlige med at ekte menneskelig liv kan fortsette på jorden. Det finnes ingen rett til å spille russisk rulett med klodens fremtid.',
            exphilConcept: 'Det økologiske imperativ',
          },
        ],
      },
      {
        id: 'klima-gradvis',
        title: 'Vedta Plan B (Skjerm nåtidens velferd)',
        actionText: 'Prioriter nålevende borgeres trygghet og økonomi først',
        description: 'Du nekter å påføre dagens fattige og arbeidere umiddelbare lidelser for teoretiske fremtider.',
        primarySchool: 'consequentialism',
        scores: { consequentialism: 5, deontology: 4, virtue: 3, care: 4, existentialism: 4 },
        reactions: [
          {
            philosopherId: 'locke',
            philosopherName: 'John Locke',
            stance: 'nuance',
            verdict: 'Eiendom og forbedring',
            comment:
              'Mennesket har rett til fruktene av sitt arbeid og til å forbedre jorden. Likevel: Bare så lenge det finnes «nok og like godt igjen til andre» – gjelder det også fremtiden?',
            exphilConcept: 'Lockes forbehold (Lockean Proviso)',
          },
          {
            philosopherId: 'arne-naess',
            philosopherName: 'Arne Næss',
            stance: 'disagree',
            verdict: 'Snever grunnøkologi!',
            comment:
              'Dette er klassisk antroposentrisme – å behandle hele planeten som en ressurskoloni for menneskelig forbruk. På sikt undergraver vi forutsetningene for vårt eget liv.',
            exphilConcept: 'Grunnøkologi vs. Dypøkologi',
          },
        ],
      },
    ],
  },
  {
    id: 'selvkjorende-bil',
    title: 'AI-etikk: Den selvkjørende elbilen',
    subtitle: 'Når algoritmer må programmere moralske prioriteringer',
    category: 'Teknologi & AI',
    icon: '🚗',
    scenario:
      'Du programmerer kollisjonsalgoritmen for en selvkjørende familiebil. En plutselig situasjon oppstår i 80 km/t: En lastebil mister lasten, og tre fotgjengere (to barn og en eldre mann) står i veibanen. Bremsene svikter. Bilens eneste mulighet for å unngå fotgjengerne er å svinge inn i en massiv betongvegg, noe som vil ta livet av bilens ene passasjer.',
    stakeholders: ['3 fotgjengere i veibanen', '1 uskyldig passasjer i elbilen', 'AI-programvaren'],
    examContext:
      'Moderne anvendt etikk: Skal kunstig intelligens programmeres utilitaristisk (alltid minimere dødsofre), eller pliktetisk (aldri aktivt ofre passasjeren som kjøpte bilen)?',
    options: [
      {
        id: 'bil-sving-vegg',
        title: 'Programmer bilen til å svinge inn i veggen',
        actionText: 'Ofre bilens passasjer for å redde de tre fotgjengerne (1 dør, 3 overlever)',
        description: 'Algoritmen følger en streng numerisk nyttekalkyle: 1 liv ofres for 3 liv.',
        primarySchool: 'consequentialism',
        scores: { consequentialism: 10, deontology: 2, virtue: 4, care: 4, existentialism: 6 },
        reactions: [
          {
            philosopherId: 'mill',
            philosopherName: 'John Stuart Mill',
            stance: 'agree',
            verdict: 'Objektiv skademinimering',
            comment:
              'En datamaskin er fri for panikk og emosjonelle bindinger. Tre overlevende skaper mer liv enn én overlevende. Valget er logisk korrekt.',
            exphilConcept: 'Kvantitativ utilitarisme',
          },
          {
            philosopherId: 'kant',
            philosopherName: 'Immanuel Kant',
            stance: 'disagree',
            verdict: 'Svik mot passasjeren!',
            comment:
              'Bilen har en spesiell plikt overfor den som sitter inni den. Å programmere en bil til å likvidere sin egen passasjer gjør teknologien til en forhåndsdømmende bøddel.',
            exphilConcept: 'Pliktrelasjoner og rettferdighet',
          },
        ],
      },
      {
        id: 'bil-beskytt-passasjer',
        title: 'Programmer bilen til å beskytte passasjeren',
        actionText: 'Hold kursen rett frem (Passasjeren reddes, 3 fotgjengere dør)',
        description: 'Bilen prioriterer alltid sin egen passasjer og forårsaker ikke passasjerens selvmord.',
        primarySchool: 'deontology',
        scores: { consequentialism: 2, deontology: 9, virtue: 7, care: 8, existentialism: 4 },
        reactions: [
          {
            philosopherId: 'hobbes',
            philosopherName: 'Thomas Hobbes',
            stance: 'agree',
            verdict: 'Selvbevarelsen er ufravikelig!',
            comment:
              'Menneskets dypeste naturlige rett er selvforsvar og overlevelse. Ingen ville frivillig kjøpe eller gå inn i en bil som har en kontrakt om å ta livet av dem!',
            exphilConcept: 'Naturretten til selvbevarelse',
          },
          {
            philosopherId: 'bentham',
            philosopherName: 'Jeremy Bentham',
            stance: 'disagree',
            verdict: 'Tre liv er mer enn ett',
            comment:
              'Dette er egoisme satt i system. Å la to barn og en voksen bli knust for å redde én bilfører er en moralsk skandale.',
            exphilConcept: 'Upartiskhetsprinsippet',
          },
        ],
      },
    ],
  },
];

/**
 * Beregner brukerens etiske profil og matcher med filosofisk tvilling
 */
export function calculateEthicsProfile(
  selectedOptionIds: Record<string, string>,
): UserEthicsProfile {
  const aggregated: Record<EthicalSchool, number> = {
    consequentialism: 0,
    deontology: 0,
    virtue: 0,
    care: 0,
    existentialism: 0,
  };

  let totalDecisions = 0;

  for (const dilemma of ETHICAL_DILEMMAS) {
    const choiceId = selectedOptionIds[dilemma.id];
    if (!choiceId) continue;

    const opt = dilemma.options.find((o) => o.id === choiceId);
    if (!opt) continue;

    totalDecisions++;
    for (const school of Object.keys(aggregated) as EthicalSchool[]) {
      aggregated[school] += opt.scores[school] || 0;
    }
  }

  // Finn dominant retning
  let dominantSchool: EthicalSchool = 'consequentialism';
  let highestScore = -1;
  for (const school of Object.keys(aggregated) as EthicalSchool[]) {
    if (aggregated[school] > highestScore) {
      highestScore = aggregated[school];
      dominantSchool = school;
    }
  }

  // Bestem filosofisk tvilling
  let twinId = 'mill';
  let twinName = 'John Stuart Mill';
  let twinTitle = 'Den Rasjonelle Nytteetikeren';
  let twinDesc = 'Du veier konsekvensene på gullvekt og ønsker størst mulig lykke for flest mulig. Du er ikke redd for å ta tøffe valg så lenge summen av menneskelig lidelse minimeres.';

  switch (dominantSchool) {
    case 'deontology':
      twinId = 'kant';
      twinName = 'Immanuel Kant';
      twinTitle = 'Prinsippenes Vokter';
      twinDesc = 'For deg er plikt, ærlighet og menneskeverd absolutte sannheter. Du nekter å gjøre mennesker til midler for et mål, uansett hvor fristende konsekvensene måtte virke.';
      break;
    case 'virtue':
      twinId = 'aristoteles';
      twinName = 'Aristoteles';
      twinTitle = 'Den Kloke Karakterbyggeren';
      twinDesc = 'Du søker visdom, moderasjon og praktisk dømmekraft (fronesis). Du forstår at etikk ikke er en matematisk kalkyle eller en stiv lovbok, men en livslang øvelse i å gjøre det rette til rett tid og på rett måte.';
      break;
    case 'care':
      twinId = 'arne-naess';
      twinName = 'Arne Næss';
      twinTitle = 'Omsorgens & Helhetens Stemme';
      twinDesc = 'Du kjenner et dypt ansvar for det levende fellesskapet, sårbare enkeltmennesker og biosfæren. For deg springer moralen ut av empati, relasjoner og kjærlighet til tilværelsen.';
      break;
    case 'existentialism':
      twinId = 'sartre';
      twinName = 'Jean-Paul Sartre';
      twinTitle = 'Den Radikalt Frie';
      twinDesc = 'Du nekter å gjemme deg bak regler eller autoriteter. Du forstår at ethvert etisk valg er ditt personlige ansvar, og du bærer frihetens svimmelhet med mot.';
      break;
    default:
      break;
  }

  return {
    scores: aggregated,
    totalDecisions,
    dominantSchool,
    philosopherTwinId: twinId,
    philosopherTwinName: twinName,
    twinTitle,
    twinDescription: twinDesc,
  };
}
