import type { Tour } from './types';

export const TOURS: Tour[] = [
  {
    id: 'akse-alderen',
    title: 'Akse-alderen: Menneskehetens store oppvåkning',
    tagline: 'Da tre sivilisasjoner uavhengig av hverandre begynte å stille de store spørsmålene.',
    icon: '🏛️',
    era: 'ca. 600–300 f.Kr.',
    durationMinutes: 4,
    description:
      'Mellom 800 og 200 f.Kr. skjedde noe enestående i menneskehetens historie. Uten kontakt med hverandre begynte tenkere i Kina, India og Hellas samtidig å forkaste gamle myter til fordel for personlig etikk, logikk og åndelig søken.',
    stops: [
      {
        philosopherId: 'konfucius',
        narrativeTitle: '1. Harmoni og samfunnets fundament i Kina',
        narrativeText:
          'I en tid preget av krig og oppløsning i Kina, søkte Konfutse etter stabilitet. Han lærte at et rettferdig samfunn ikke bygges med frykt eller lover alene, men med personlig verdighet, respekt for forfedre og familiære dyder (ren og li).',
        keyQuestion: 'Hva er det viktigste fundamentet for et fredelig samfunn?',
      },
      {
        philosopherId: 'laozi',
        narrativeTitle: '2. Dao – Å flyte med naturens orden',
        narrativeText:
          'Som en motvekt til Konfutses strenge samfunnsregler, pekte Laozi mot naturens uanstrengte flyt. Hans lære om wu wei (ikke-anstrengelse eller handling i samklang) minner oss om at den sanne visdommen ofte ligger i å gi slipp på trangen til å kontrollere alt.',
        keyQuestion: 'Må vi alltid kjempe og presse på for å oppnå det gode?',
      },
      {
        philosopherId: 'buddha',
        narrativeTitle: '3. Oppvåkning og lidelsens opphør i India',
        narrativeText:
          'Ved foten av Himalaya forlot prins Siddhartha Gautama all materiell luksus for å finne årsaken til menneskets lidelse. Gjennom dyp meditasjon og den åttedelte vei viste han at lidelse skyldes klamring til illusjoner, og at sinnet kan frigjøres.',
        keyQuestion: 'Hvordan finner vi varig ro når alt rundt oss er i konstant endring?',
      },
      {
        philosopherId: 'sokrates',
        narrativeTitle: '4. Den kritiske samtalen på torget i Athen',
        narrativeText:
          'I Athen stilte Sokrates spørsmål til alle som trodde de visste noe om rettferdighet, kjærlighet og mot. Ved å innse at «det eneste jeg vet er at jeg intet vet», gjorde han samtalen og den selvkritiske fornuften til filosofiens hjerte.',
        keyQuestion: 'Er du modig nok til å innrømme når du tar feil?',
      },
      {
        philosopherId: 'aristoteles',
        narrativeTitle: '5. Å systematisere og forstå hele universet',
        narrativeText:
          'Sokrates’ barnebarn i åndelig forstand, Aristoteles, observerte alt fra biologi og stjerner til teater og statsvitenskap. Han lærte at menneskets høyeste mål er eudaimonia (et lykkelig, meningsfullt liv), oppnådd gjennom den gylne middelvei.',
        keyQuestion: 'Hva kreves for at et menneskeliv skal kalles genuint vellykket?',
      },
    ],
  },
  {
    id: 'modige-kvinner',
    title: 'Historiens modige kvinner: Fra antikken til revolusjon',
    tagline: 'Pionerer som utfordret makt, fordommer og etablerte sannheter.',
    icon: '👑',
    era: 'ca. 400 e.Kr. – 1970',
    durationMinutes: 4,
    description:
      'Gjennom årtusener ble kvinner systematisk holdt borte fra universiteter og maktsaler. Likevel har usedvanlig modige og skarpe kvinnelige filosofer banet vei og endret hvordan vi forstår rettferdighet, fornuft og frihet.',
    stops: [
      {
        philosopherId: 'hypatia',
        narrativeTitle: '1. Lysende fornuft i det antikke Alexandria',
        narrativeText:
          'Som leder for museet og akademiet i Alexandria var Hypatia en mester i matematikk, astronomi og nyplatonisme. I en tid preget av voldelig religiøs fanatisme nektet hun å bøye av for dogmer, og ble et tidløst symbol på vitenskapelig integritet.',
        keyQuestion: 'Hva kreves for å holde hodet kaldt når verden rundt deg blir ekstrem?',
      },
      {
        philosopherId: 'wollstonecraft',
        narrativeTitle: '2. Likestilling som et krav for opplysning',
        narrativeText:
          'Midt under den franske revolusjonen utga Mary Wollstonecraft sitt mesterverk «Et forsvar for kvinnens rettigheter» (1792). Hun argumenterte med krystallklar logikk for at kvinners stilling ikke skyldtes biologi, men mangel på utdanning og like borgerrettigheter.',
        keyQuestion: 'Hvorfor tok det så mange århundrer før opplysningens idealer gjaldt alle?',
      },
      {
        philosopherId: 'de-beauvoir',
        narrativeTitle: '3. Man fødes ikke som kvinne, man blir det',
        narrativeText:
          'Simone de Beauvoir revolusjonerte eksistensialismen med «Det annet kjønn». Hun viste at mennesket er dømt til frihet, men at samfunnets strukturer og forventninger historisk har redusert kvinnen til «den andre».',
        keyQuestion: 'Hvor mye av den du er, skyldes dine egne valg kontra andres forventninger?',
      },
      {
        philosopherId: 'arendt',
        narrativeTitle: '4. Makt, frihet og ondskapens banalitet',
        narrativeText:
          'Etter å ha flyktet fra nazi-Tyskland viet Hannah Arendt livet til å dissekere totalitarisme. Under rettssaken mot Adolf Eichmann formulerte hun begrepet «ondskapens banalitet» – advarselen om hva som skjer når vanlige borgere slutter å tenke selvstendig.',
        keyQuestion: 'Hvordan kan vi hindre at tankeløshet og blind lydighet fører til katastrofe?',
      },
      {
        philosopherId: 'angela-davis',
        narrativeTitle: '5. Frihet er en kontinuerlig kamp',
        narrativeText:
          'Angela Davis forener filosofisk analyse med aktivisme mot rasisme, fengselssystemer og økonomisk urettferdighet. Hun minner oss om at frihet aldri er noe man mottar som en gave, men en rettighet som må forsvares og utvides av hver generasjon.',
        keyQuestion: 'Hva er din rolle i å gjøre samfunnet mer rettferdig for de som kommer etter?',
      },
    ],
  },
  {
    id: 'nordisk-sinnelag',
    title: 'Det nordiske sinnelaget: Fra satire til dypøkologi',
    tagline: 'Hvordan nordiske tenkere formet eksistens, fornuft og natursyn.',
    icon: '🌲',
    era: '1700 – 1980',
    durationMinutes: 3,
    description:
      'Med lange vintre, åpent landskap og en sterk følelse for individets plass i fellesskapet og naturen, har Norden fostret noen av historiens mest særpregede og dyptpløyende filosofer.',
    stops: [
      {
        philosopherId: 'holberg',
        narrativeTitle: '1. Nordens opplysningskjempe og satiriker',
        narrativeText:
          'Bergenseren Ludvig Holberg brakte den europeiske opplysningstiden hjem til Norden. Gjennom skarp satire, komedier og historiske verk kjempet han mot overtro, autoritetstro og pedantisk lærdom – alltid med latteren som våpen.',
        keyQuestion: 'Kan humor og satire av og til avsløre sannheten bedre enn alvorlige taler?',
      },
      {
        philosopherId: 'kierkegaard',
        narrativeTitle: '2. Eksistensens alvor og det personlige valget',
        narrativeText:
          'I Københavns gater avviste Søren Kierkegaard de store, upersonlige filosofiske systemene. Han mente at det viktigste i et menneskes liv er det eksistensielle valget foran «angstens svimmelhet»: Å våge å velge hvem man skal være.',
        keyQuestion: 'Hvem er du når du er helt alene med dine egne valg?',
      },
      {
        philosopherId: 'zapffe',
        narrativeTitle: '3. Den tragiske overflod av bevissthet',
        narrativeText:
          'Filosofen og fjellklatreren Peter Wessel Zapffe formulerte en dypt original teori om mennesket: Vi har fått utdelt mer intellekt og bevissthet enn naturen kan bære. Hans brutalt ærlige analyse av menneskets fluktmekanismer er et unikt norsk bidrag til eksistensialismen.',
        keyQuestion: 'Er menneskets høye bevissthet en velsignelse eller en byrde?',
      },
      {
        philosopherId: 'arne-naess',
        narrativeTitle: '4. Dypøkologien – Mennesket i naturen',
        narrativeText:
          'Arne Næss tilbrakte store deler av livet i hytta Tvergastein høyt oppe på Hallingskarvet. Der utviklet han dypøkologien (økosofi T), med kjernetanken om at alt liv har en iboende verdi i seg selv, uavhengig av menneskets nytte.',
        keyQuestion: 'Har en fjellbjørk eller et økosystem rettigheter på lik linje med et menneske?',
      },
    ],
  },
  {
    id: 'fornuftens-revolusjon',
    title: 'Fornuftens revolusjon: Opplysningstiden',
    tagline: 'Da vitenskap og rasjonalisme sprengte middelalderens dogmer.',
    icon: '⚡',
    era: 'ca. 1650–1800',
    durationMinutes: 4,
    description:
      'Gjennom 1600- og 1700-tallet opplevde Europa en intellektuell eksplosjon. Kirkens og kongenes enevelde ble utfordret av en ny idé: At ethvert menneske er utstyrt med fornuft og ukrenkelige rettigheter.',
    stops: [
      {
        philosopherId: 'descartes',
        narrativeTitle: '1. Tvil på alt – «Cogito, ergo sum»',
        narrativeText:
          'René Descartes bestemte seg for å forkaste all innlært lærdom og tvile på alt: sansene, omverdenen, til og med sin egen kropp. Men midt i tvilen fant han én urokkelig sannhet: Selve tvilen beviser at det finnes en som tenker.',
        keyQuestion: 'Finnes det én eneste ting i livet ditt du er 100 % sikker på?',
      },
      {
        philosopherId: 'spinoza',
        narrativeTitle: '2. Naturen og Gud som ett',
        narrativeText:
          'Baruch Spinoza ble lyst i bann og utstøtt for sine kjetterske tanker. Han avviste en streng Gud i himmelen og hevdet at hele kosmos – stjernene, naturen og menneskene – er uttrykk for én og samme guddommelige virkelighet (Deus sive Natura).',
        keyQuestion: 'Er vi mennesker atskilt fra naturen, eller bare en del av den?',
      },
      {
        philosopherId: 'locke',
        narrativeTitle: '3. Den tomme tavlen og folkets rettigheter',
        narrativeText:
          'John Locke avviste at konger har guddommelig makt. Han lærte at sinnet ved fødselen er en tabula rasa (en blank tavle), og at statens eneste berettigelse er å beskytte borgernes liv, frihet og eiendom. Hvis staten svikter, har folket rett til opprør.',
        keyQuestion: 'Hvorfor aksepterer vi egentlig at noen bestemmer over oss?',
      },
      {
        philosopherId: 'kant',
        narrativeTitle: '4. Fornuftens grenser og det kategoriske imperativ',
        narrativeText:
          'I Königsberg forente Immanuel Kant fornuft og sansning i et epokegjørende system. Hans etiske rettesnor var urokkelig: Handle alltid slik at regelen for handlingen din samtidig kan gjøres til en allmenn lov for alle.',
        keyQuestion: 'Ville verden vært et godt sted hvis alle gjorde akkurat det du gjør nå?',
      },
    ],
  },
  {
    id: 'livskunst-indre-ro',
    title: 'Livskunst & Indre ro: Stoikerne og østlig visdom',
    tagline: 'Praktisk filosofi for å finne balanse, styrke og sinnsro.',
    icon: '🧘',
    era: 'ca. 300 f.Kr. – 200 e.Kr.',
    durationMinutes: 4,
    description:
      'Filosofi var opprinnelig ikke bare akademisk teori, men en livskunst – en oppskrift på hvordan man kan takle motgang, smerte, tap og usikkerhet med fatning og indre styrke.',
    stops: [
      {
        philosopherId: 'zhuangzi',
        narrativeTitle: '1. Sommerfugldrømmen og perspektivets kraft',
        narrativeText:
          'Drømte Zhuangzi at han var en sommerfugl, eller drømmer en sommerfugl nå at den er Zhuangzi? Ved å leke med perspektiver viste han at stress og frykt ofte skyldes at vi låser oss fast i snevre forestillinger om hva som er viktig.',
        keyQuestion: 'Hvor mange av dine daglige bekymringer har egentlig betydning om ti år?',
      },
      {
        philosopherId: 'nagarjuna',
        narrativeTitle: '2. Tomhet og gjensidig avhengighet',
        narrativeText:
          'Den indiske buddhistiske mesteren Nagarjuna lærte at ingenting i universet eksisterer isolert for seg selv (sunyata). Alt oppstår i samspill med alt annet. Når vi forstår at vi ikke er isolerte øyer, forsvinner også frykten for tap.',
        keyQuestion: 'Kan noe i livet ditt defineres helt uavhengig av omgivelsene?',
      },
      {
        philosopherId: 'epiktet',
        narrativeTitle: '3. Fra slave til stoiker: Hva har du makt over?',
        narrativeText:
          'Epiktet ble født som slave i Romerriket, men oppnådde total åndelig frihet. Hans grunnregel er enkel, men livsforvandlende: Skill nådeløst mellom det du kan kontrollere (dine egne reaksjoner og valg) og det du ikke kan kontrollere (andre mennesker og ytre hendelser).',
        keyQuestion: 'Bruker du energien din på ting du faktisk kan endre, eller på ting du må akseptere?',
      },
      {
        philosopherId: 'marcus-aurelius',
        narrativeTitle: '4. Keiserens personlige meditasjoner',
        narrativeText:
          'Som hersker over verdens mektigste rike sto Marcus Aurelius i kriger, pandemier og svik. Hver kveld skrev han i sin private dagbok («Til meg selv») for å minne seg selv på å møte morgendagen med ydmykhet, tålmodighet og uselvisk pliktfølelse.',
        keyQuestion: 'Hvordan beholder du din indre verdighet når alt rundt deg koker?',
      },
    ],
  },
];
