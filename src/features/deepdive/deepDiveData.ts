import type { PhilosopherDeepDive } from './types';

export const PHILOSOPHER_DEEP_DIVES: Record<string, PhilosopherDeepDive> = {
  sokrates: {
    philosopherId: 'sokrates',
    historicalContext:
      'Levde i antikkens Athen under og etter Peloponneserkrigen mot Sparta. Byen gjennomgikk politisk uro, pest og nederlag som førte til en reaksjonær atmosfære. Da demokratiet ble gjenopprettet, ble Sokrates stilt for retten i 399 f.Kr., anklaget for å forderve ungdommen og fornekte byens guder, og dømt til å drikke giftbegeret.',
    majorWorks: [
      {
        title: 'Ingen egne skrifter',
        description: 'Sokrates skrev aldri et ord. Han mente at den levende, kritiske samtalen var den eneste sanne filosofiske formen.',
      },
      {
        title: 'Platons tidlige dialoger (Apologien, Kriton, Menon)',
        year: -390,
        description: 'Vår fremste kilde til den historiske Sokrates: Forsvarstalen i rettssaken og de sokratiske definisjonssamtalene.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Maieutikk (Jordmorkunsten)',
        description: 'Sokrates sammenlignet seg med sin mor som var jordmor. Han tilførte ingen ny lærdom, men hjalp samtalepartneren med å forløse sannheter som allerede lå slumrende i deres eget sinn.',
        takeaway: 'Ekte visdom er selvinnsikt og kan aldri tvinges inn utenfra som dogmer.',
      },
      {
        title: 'Geometritesten med slavegutten (Menon)',
        description: 'Sokrates viser hvordan en uutdannet slavegutt kan løse et komplekst geometrisk teorem bare ved å bli stilt de rette spørsmålene.',
        takeaway: 'Indikerer at menneskesinnet har medfødte rasjonelle strukturer som kan vekkes til live.',
      },
    ],
    receptionAndCritique:
      'Ble stående som filosofiens fremste martyr og et evig ideal for selvkritisk fornuft. Samtidig er hans etiske intellektualisme («ingen gjør galt med vilje, bare av uvitenhet») blitt sterkt kritisert av bl.a. Aristoteles for å ignorere viljens svakhet (akrasia) og følelsenes makt.',
  },

  platon: {
    philosopherId: 'platon',
    historicalContext:
      'Født inn i en innflytelsesrik aristokratisk familie i Athen. Henrettelsen av Sokrates fylte ham med dyp avsky for det athenske folkestyret og motiverte ham til å søke en objektiv, urokkelig sannhet. Han grunnla Akademiet i Athen ca. 387 f.Kr. – forløperen til det moderne universitetet.',
    majorWorks: [
      {
        title: 'Staten (Politeia)',
        year: -375,
        description: 'Hovedverket om rettferdighet, menneskesjelen, hulelignelsen og den ideelle stat ledet av filosofkonger.',
      },
      {
        title: 'Symposion (Drikkegildet)',
        year: -385,
        description: 'En serie festtaler om kjærlighetens vesen (eros) som en stige fra fysisk skjønnhet til kjærlighet til selve Det Skjønne.',
      },
      {
        title: 'Faidon',
        year: -380,
        description: 'En dramatisk dialog om sjelens udødelighet og Sokrates’ siste timer i fengselscellen.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Hulelignelsen',
        description: 'Fanger sitter lenket fast i en mørk hule og ser bare skygger på veggen kastet av et bål. En fange slipper fri, ledes opp til overflaten, blendes av sollyset, og ser til slutt solen – Det Godes Idé.',
        takeaway: 'Sanseverdenen er en skyggeverden; ekte kunnskap oppnås bare når fornuften skuer idéene bak de ytre fenomenene.',
      },
      {
        title: 'Gyges’ ring',
        description: 'En gjeter finner en magisk ring som gjør ham usynlig. Med ringen forfører han dronningen, dreper kongen og kupper tronen.',
        takeaway: 'Ville et menneske fortsatt være rettferdig dersom det visste med 100 % sikkerhet at det aldri ville bli avslørt eller straffet?',
      },
    ],
    receptionAndCritique:
      'Formet hele den vestlige metafysiske tradisjonen («hele filosofihistorien er en serie fotnoter til Platon» – A.N. Whitehead). Kritisert av sin elev Aristoteles for å splitte virkeligheten i to unødvendige verdener, og av Karl Popper for totalitære samfunnsidealer i Staten.',
  },

  aristoteles: {
    philosopherId: 'aristoteles',
    historicalContext:
      'Sønn av kongelig livlege i Makedonia, noe som ga ham en livslang interesse for biologi og empirisk observasjon. Elev ved Platons Akademi i 20 år. Ble privatlærer for den unge Aleksander den store, før han returnerte til Athen og grunnla sin egen skole, Lykeion (hvor studentene diskuterte mens de spaserte – de peripatetiske filosofene).',
    majorWorks: [
      {
        title: 'Den nikomakiske etikk',
        year: -340,
        description: 'Klassikeren om dydsetikk, karakterutvikling, eudaimonia (oppblomstring) og den gylne middelvei.',
      },
      {
        title: 'Politikken',
        year: -335,
        description: 'Analyse av styreformer og mennesket som et iboende samfunnsvesen (zoon politikon).',
      },
      {
        title: 'Metafysikken',
        year: -330,
        description: 'Læren om substans, form og stoff (hylomorfisme), akt og potens, og Den ubevegede beveger.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Eikenøtten og eiketreet (Teleologi)',
        description: 'En eikenøtt er ikke bare en klump med materie; den bærer i seg en iboende hensikt (telos) om å bli et fullvoksent eiketre.',
        takeaway: 'Naturen gjør ingenting forgjeves; forandring er virkeliggjøring av slumrende muligheter (akt og potens).',
      },
      {
        title: 'De fire årsakene (Marmorstatuen)',
        description: 'For å forstå en statue må du kjenne: 1. Stoffet (marmoren), 2. Formen (statuens skikkelse), 3. Virkeårsaken (billedhuggerens meisel), og 4. Formålet (å hedre guden Apollo).',
        takeaway: 'Vitenskap krever en helhetlig forklaring som inkluderer både materiale, struktur og hensikt.',
      },
    ],
    receptionAndCritique:
      'Antikkens og middelalderens fremste encyklopediske geni; hans autoritet var så ubestridt i høymiddelalderen at han slett og rett ble kalt «Filosofen». Kritisert av den moderne naturvitenskapen på 1600-tallet for å tvinge formålsårsaker inn i fysikken, og for sitt forsvar for naturlig slaveri og kvinners underordning.',
  },

  descartes: {
    philosopherId: 'descartes',
    historicalContext:
      'Levde under Tredveårskrigens religiøse blodbad og Den vitenskapelige revolusjonen (Galileis teleskop, Keplers planetbaner). Sjokkert over at vitenskap og religion raste sammen, søkte han et matematisk, urokkelig fundament som ingen skeptiker kunne velte. Tilbrakte mye av sitt voksne liv i Nederland for å unngå sensur og inkvisisjon.',
    majorWorks: [
      {
        title: 'Meditasjoner over filosofiens grunnlag',
        year: 1641,
        description: 'Seks filosofiske meditasjoner der han gjennomfører metodisk tvil og etablerer «Cogito, ergo sum» og substansdualismen.',
      },
      {
        title: 'Om metoden',
        year: 1637,
        description: 'Selvbiografisk innføring i analytisk geometri og hans fire regler for fornuftig tenkning.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Den onde demonen (Malin génie)',
        description: 'Tenk deg at det finnes en allmektig, ond demon som bruker all sin kraft på å lure sansene dine, slik at himmelen, jorden, farger og til og med 2+2=4 er ren illusjon.',
        takeaway: 'Selv om demonen lurer meg om alt i universet, kan han ikke lure meg om at jeg eksisterer mens jeg tenker denne tanken.',
      },
      {
        title: 'Voksstykket',
        description: 'Et stykke nylaget voks har lukt av blomster, farge, fasthet og lager lyd når man slår på det. Nærmer man det ilden, forsvinner lukten, fargen endres og det smelter til en væske.',
        takeaway: 'Hva var voksen egentlig? Ikke sansekvalitetene, men en utstrakt, formbar substans som bare fornuften kan begripe.',
      },
    ],
    receptionAndCritique:
      'Grunnla den moderne filosofiens erkjennelsesteoretiske vending og inspirerte all senere rasjonalisme. Samtidig har hans substansdualisme (skillet mellom sjel og kropp) skapt et av filosofiens største uløste mysterier: Hvordan kan en uutstrakt sjel interagere fysisk med hjernen?',
  },

  spinoza: {
    philosopherId: 'spinoza',
    historicalContext:
      'Sønn av sefardiske jøder som flyktet fra inkvisisjonen i Portugal til det relativt tolerante Amsterdam. I 1656, 23 år gammel, ble han rammet av en historisk nådeløs bannlysning (cherem) fra synagogen for kjetterske tanker. Han takket nei til et prestisjefylt professorat i Heidelberg for å beholde sin intellektuelle uavhengighet, og levde et enkelt liv som finsliper av optiske linser.',
    majorWorks: [
      {
        title: 'Etikken (Ethica)',
        year: 1677,
        description: 'Bygget opp med geometrisk stringens (aksiomer, teoremer, bevis) og presenterer hans panteistiske monisme: Deus sive Natura.',
      },
      {
        title: 'Teologisk-politisk traktat',
        year: 1670,
        description: 'En banebrytende historisk-kritisk lesning av Bibelen og et glødende forsvar for ytringsfrihet og demokrati.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Deus sive Natura (Gud eller Naturen)',
        description: 'Det finnes ikke en konge i himmelen som skapte universet utenfra. Hele kosmos – stjernene, naturlovene, menneskekroppen og tankene – er uttrykk for én og samme evige substans.',
        takeaway: 'Vi er ikke isolerte herskere over naturen; vi er bølger på det samme uendelige havet.',
      },
    ],
    receptionAndCritique:
      'Lenge beryktet og fordømt som en farlig ateist på 1600- og 1700-tallet. Ble på slutten av 1700-tallet gjenoppdaget av Goethe, Lessing og Hegel, som kalte ham «en gudberuset mann». I dag regnes han som en forløper for moderne sekularisme, nevrovitenskap og økologisk helhetstenkning.',
  },

  locke: {
    philosopherId: 'locke',
    historicalContext:
      'Levde gjennom en dramatisk epoke i engelsk historie med borgerkrig, restaurasjon og Den ærerike revolusjonen i 1688 som etablerte et konstitusjonelt monarki. Som lege og rådgiver for den liberale jarlen av Shaftesbury måtte Locke flykte i eksil til Nederland i flere år før han kunne vende tilbake med sine epokegjørende skrifter.',
    majorWorks: [
      {
        title: 'To avhandlinger om styresettet (Two Treatises of Government)',
        year: 1689,
        description: 'Det moderne demokratiets bibel: Naturrettigheter (liv, frihet, eiendom), samfunnskontrakt og retten til opprør.',
      },
      {
        title: 'Et essay om den menneskelige forstand',
        year: 1689,
        description: 'Empirismens grunnlag: Menneskesinnet som en tabula rasa (blank tavle) uten medfødte idéer.',
      },
      {
        title: 'Et brev om toleranse',
        year: 1689,
        description: 'Forsvar for religiøs samvittighetsfrihet og et strengt skille mellom kirke og stat.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Tabula Rasa (Den blanke tavlen)',
        description: 'Tenk deg sinnet ved fødselen som et hvitt papirark uten et eneste tegn. Hvor kommer alle forestillingene fra? Fra én eneste kilde: erfaring (sansning og refleksjon).',
        takeaway: 'Ingen mennesker er født med ferdige sannheter; kunnskap krever erfaringsbasert læring.',
      },
      {
        title: 'Eiendomsrettens opprinnelse (Eikenøttene i skogen)',
        description: 'Jorden tilhører i utgangspunktet hele menneskeheten. Men når du plukker eikenøtter under treet, har du blandet ditt eget kroppslige arbeid med naturen.',
        takeaway: 'Arbeid gjør en del av felleseiet til rettmessig privat eiendom.',
      },
    ],
    receptionAndCritique:
      'Formet den liberale staten og den amerikanske uavhengighetserklæringen (Thomas Jefferson siterte Locke nesten ordrett). Kritisert av sosialister for at hans ubegrensede forsvar for privat eiendom legitimerer ekstrem ulikhet, og av epistemologer for det problematiske skillet mellom primære og sekundære sansekvaliteter.',
  },

  hume: {
    philosopherId: 'hume',
    historicalContext:
      'Sentral skikkelse i Den skotske opplysningstiden i Edinburgh, og en nær venn av økonomen Adam Smith. Til tross for sin enestående intellektuelle briljans ble han to ganger nektet et universitetsprofessorat (i Edinburgh og Glasgow) fordi kirken og byens ledelse fryktet hans radikale skepsis og antatte ateisme.',
    majorWorks: [
      {
        title: 'En avhandling om menneskets natur (A Treatise of Human Nature)',
        year: 1739,
        description: 'Humes mesterverk om sansning, årsakssammenheng, lidenskaper og moralens opprinnelse i følelser fremfor fornuft.',
      },
      {
        title: 'Undersøkelse av den menneskelige forstand',
        year: 1748,
        description: 'En mer tilgjengelig og spisset versjon av hans empiristiske kunnskapssyn og skepsis mot mirakler.',
      },
      {
        title: 'Dialoger om den naturlige religion',
        year: 1779,
        description: 'Utgitt posthumt; en knusende filosofisk kritikk av det teleologiske gudsbeviset (urmakeranalogien).',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Biljardkulene (Årsak og virkning)',
        description: 'Du ser den hvite kulen rulle over bordet og treffe den røde, og deretter ser du den røde rulle videre. Men så du noen gang selve «nødvendigheten» eller «årsakskraften»?',
        takeaway: 'Vi observerer bare hendelse A etterfulgt av B i tid og rom. At B *må* skje, er en forventningsvane skapt i vårt eget sinn, ikke en logisk lov i naturen.',
      },
      {
        title: 'Humes giljotin (Er/Bør-problemet)',
        description: 'Forfattere begynner ofte med lange fakta om menneskets biologi eller samfunn (ER), og plutselig glir de over i påstander om hva man BØR gjøre.',
        takeaway: 'Et normativt bør kan aldri utledes logisk fra et rent deskriptivt er.',
      },
    ],
    receptionAndCritique:
      'Regnes av mange filosofer som den skarpeste og mest innflytelsesrike engelskspråklige tenkeren noensinne. Vekket Immanuel Kant fra hans «dogmatiske slummer». Kritisert for at hans radikale skepsis til induksjon gjør det umulig å begrunne naturvitenskapens objektivitet på et strengt logisk grunnlag.',
  },

  kant: {
    philosopherId: 'kant',
    historicalContext:
      'Professoren i Königsberg (i dag Kaliningrad) som tilbrakte hele sitt liv i samme by med en legendarisk punktlig dagsrutine (byens borgere skal ha stilt klokkene etter hans faste ettermiddagstur). Han levde under den prøyssiske opplysningstiden under kong Fredrik den store. Dypt grepet av Newtons fysikk og Rousseaus moralske likeverd, bestemte han seg for å redde vitenskapen og etikken fra Humes skepsis.',
    majorWorks: [
      {
        title: 'Kritikk av den rene fornuft',
        year: 1781,
        description: 'Filosofihistoriens kanskje mest krevende verk: Den kopernikanske vending, tid og rom som anskuelsesformer, og grensene for menneskelig erkjennelse.',
      },
      {
        title: 'Grunnlegging av moralens metafysikk',
        year: 1785,
        description: 'Den klareste innføringen i Kants etikk: Det kategoriske imperativ og menneskeverdets ukrenkelighet.',
      },
      {
        title: 'Kritikk av den praktiske fornuft',
        year: 1788,
        description: 'Videreutvikling av moralfilosofien, viljens frihet og det moralske gudsbevis.',
      },
      {
        title: 'Til den evige fred',
        year: 1795,
        description: 'Politisk filosofi som la grunnlaget for Folkeforbundet og FN: Fred krever republikanske stater og internasjonal folkerett.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Morderen ved døren',
        description: 'En venn søker tilflukt i huset ditt. Like etter banker en morder på døren og spør om vennen din er inne. Kan du lyve for å redde vennens liv?',
        takeaway: 'Kant fastholder at løgn er uforenlig med moralloven fordi en universell lov om løgn opphever selve begrepet sannhet.',
      },
      {
        title: 'De fargede brillene (Kopernikansk vending)',
        description: 'Hvis du har på deg blå briller hele livet, vil alt fremstå blått. Menneskesinnet har innebygde briller: tid, rom og årsakssammenheng (kategoriene).',
        takeaway: 'Vi erkjenner aldri tingen i seg selv (Ding an sich), bare tingen slik den fremtrer for våre kognitive sanser og forstand.',
      },
    ],
    receptionAndCritique:
      'Gjorde en uutslettelig revolusjon i all moderne tenkning og ga det filosofiske fundamentet for menneskerettighetene. Kritisert for ekstrem plikt-rigiditet i moralske dilemmaer, og for at «tingen i seg selv» forblir et utilgjengelig og problematisk spøkelse i systemet hans.',
  },

  wollstonecraft: {
    philosopherId: 'wollstonecraft',
    historicalContext:
      'Virket i London og Paris under Den franske revolusjonens stormfulle dager. Opplevde personlig familiær vold og et kvinnefiendtlig rettssystem der gifte kvinner mistet enhver juridisk og økonomisk handleevne. Hun reiste til revolusjonens Paris alene som utenlandskorrespondent og levde et kompromissløst fritt liv. Døde tragisk i barselseng etter å ha født datteren Mary Shelley (forfatteren av Frankenstein).',
    majorWorks: [
      {
        title: 'Et forsvar for kvinnens rettigheter (A Vindication of the Rights of Woman)',
        year: 1792,
        description: 'Feminismens grunntekst: Kvinner og menn har samme fornuftsevne; ulikheter i dyder og intellekt skyldes samfunnets feilaktige oppdragelse.',
      },
      {
        title: 'Et forsvar for menneskets rettigheter',
        year: 1790,
        description: 'Et lidenskapelig oppgjør med Edmund Burkes konservative forsvar for arvelige privilegier og monarki.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Fuglene i gullburet',
        description: 'Kvinner i samtiden ble oppdratt til å være pyntelige, svake og følelsesstyrte vesener som bare skulle sjarmere menn, lik finkultiverte sangfugler i forgylte bur.',
        takeaway: 'Når samfunnet klipper vingene av kvinner, kan man ikke etterpå håne dem for at de ikke kan fly.',
      },
    ],
    receptionAndCritique:
      'Grunnleggeren av moderne feministisk filosofi. Ble etter sin død grovt baktalt og skandalisert av 1800-tallets viktorianske patriarkat, men ble gjenoppdaget på 1900-tallet som en av opplysningstidens modigste og mest konsekvente fornuftstenkere.',
  },

  hegel: {
    philosopherId: 'hegel',
    historicalContext:
      'Levde gjennom Napoleonskrigene og Europas oppbrudd fra føydalsamfunnet. Han opplevde slaget ved Jena i 1806 på kloss hold, og da han så Napoleon ri gjennom gatene, skrev han berømt at han så «verdensånden til hest». Ble senere professor i Berlin og Det prøyssiske kongerikets mest feirede offisielle filosof.',
    majorWorks: [
      {
        title: 'Åndens fenomenologi',
        year: 1807,
        description: 'Beskrivelsen av bevissthetens stormfulle utvikling fra naiv sansning til absolutt viten, inkludert herre-trell-dialektikken.',
      },
      {
        title: 'Rettsfilosofiens grunnlinjer',
        year: 1821,
        description: 'Hegels samfunnsteori om familien, det borgerlige samfunnet og staten som virkeliggjøringen av den etiske fornuft (Sittlichkeit).',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Herre-trell-dialektikken',
        description: 'To bevisstheter møtes og kjemper en kamp på liv og død om anerkjennelse. Den ene frykter døden og underkaster seg (trellen), mens den andre blir herren. Men gjennom sitt arbeid med den fysiske verdenen oppnår trellen etter hvert en dypere mestring og frihet enn den passive herren.',
        takeaway: 'Menneskelig bevissthet og frihet er sosial og oppstår bare gjennom gjensidig anerkjennelse og arbeid.',
      },
    ],
    receptionAndCritique:
      'En av de mektigste skikkelsene i 1800-tallets idéhistorie; inspirerte både «venstre-hegelianerne» (Marx) og den moderne statsteorien. Kritisert av Schopenhauer og Kierkegaard for tåkefullt språk og for å ofre det sårbare enkeltmennesket på historiens store alter.',
  },

  marx: {
    philosopherId: 'marx',
    historicalContext:
      'Virket under Den industrielle revolusjonens verste utbyttingsfase i London, Manchester og Paris. Bygde sitt intellektuelle virke i tett partnerskap med fabrikkeiersønnen Friedrich Engels. Levde i tiår med fattigdom i Londons Soho, landsforvist fra både Preussen, Frankrike og Belgia for sine radikale politiske skrifter.',
    majorWorks: [
      {
        title: 'Kapitalen (Das Kapital)',
        year: 1867,
        description: 'En monumental økonomisk og filosofisk obduksjon av kapitalismen: Merverdilæren, varefetisjismen og akkumulasjonens kriser.',
      },
      {
        title: 'Det kommunistiske manifest',
        year: 1848,
        description: 'Verdenshistoriens mest berømte politiske kampskrift («Klassekamp er historiens drivkraft»).',
      },
      {
        title: 'Økonomisk-filosofiske manuskripter',
        year: 1844,
        description: 'Den unge Marx’ humanistiske analyse av arbeiderens fremmedgjøring under industrikapitalismen.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Fremmedgjøringens fire former',
        description: 'Under kapitalismen mister fabrikkarbeideren kontroll over: 1. Produktet (som tilhører kapitaleieren), 2. Arbeidsprosessen (mekanisk slit), 3. Sin menneskelige natur (artsvesen redusert til et tannhjul), og 4. Sine medmennesker (konkurrenter i stedet for feller).',
        takeaway: 'Arbeid burde være menneskets fremste kilde til kreativ selvrealisering, ikke kilden til tap av verdighet.',
      },
    ],
    receptionAndCritique:
      'Endret verdenshistorien fundamentalt. Grunnla historisk materialisme og kritisk sosiologi. Kritisert av liberale tenkere for økonomisk determinisme, for å undervurdere rettsstatens og demokratiets reformerbarhet, og for de brutale autoritære regimene som på 1900-tallet brukte hans navn.',
  },

  kierkegaard: {
    philosopherId: 'kierkegaard',
    historicalContext:
      'Vandret rundt i Københavns gater under den danske gullalderen. Han brøt den borgerlige forlovelsen med sin elskede Regine Olsen for å vie sitt liv til forfatterskapet og Gud. Kjempet en ensom krig mot den danske folkekirkens overfladiske «søndagskristendom» og mot professor Hegels altomfattende akademiske system.',
    majorWorks: [
      {
        title: 'Enten – Eller',
        year: 1843,
        description: 'Kontrasten mellom estetikerens søken etter nytelse og etikeren som velger seg selv og tar ansvar.',
      },
      {
        title: 'Frykt og beven',
        year: 1843,
        description: 'Analyse av Abrahams prøve og troens paradoksale sprang bortenfor den allmenne fornuft og moral.',
      },
      {
        title: 'Begrepet angst',
        year: 1844,
        description: 'Psykologisk og teologisk studie av angsten som «frihetens svimmelhet».',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Frihetens svimmelhet (Klippekanten)',
        description: 'Når du står på kanten av et stup, skyldes angsten ikke bare at du kan falle ned, men den skremmende vissheten om at du *kan velge å kaste deg ut*.',
        takeaway: 'Angst er ikke frykt for en ytre fare; angst er bevisstheten om din egen radikale valgfrihet.',
      },
    ],
    receptionAndCritique:
      'Gjennombrøt som «eksistensialismens far» og fornyet litteratur, psykologi og teologi i det 20. århundre. Kritisert for å forherlige det irrasjonelle og for å gjøre troen til et blindt sprang som undergraver rasjonell fellesetikk.',
  },

  nietzsche: {
    philosopherId: 'nietzsche',
    historicalContext:
      'Ble utnevnt til professor i klassisk gresk filologi ved universitetet i Basel som bare 24-åring. Trakk seg tilbake på grunn av invalidiserende migrene og magesmerter, og levde et ensomt nomadeliv på billige pensjonater i Sils-Maria i Sveits og Genova i Italia. Brøt sammen mentalt på gaten i Torino i 1889 etter å ha omfavnet en mishandlet hest.',
    majorWorks: [
      {
        title: 'Slik talte Zarathustra',
        year: 1883,
        description: 'Poetisk filosofisk profeti om Guds død, Overmennesket og Den evige gjenkomst.',
      },
      {
        title: 'Moralens genealogi',
        year: 1887,
        description: 'Kritisk historisk analyse av herremoral kontra slavemoral og ressentimentets opprinnelse.',
      },
      {
        title: 'Hinsides godt og ondt',
        year: 1886,
        description: 'Oppgjør med tradisjonell filosofi, kristendom og dogmatiske fordommer.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Den evige gjenkomst',
        description: 'Hva om en demon kom inn på rommet ditt i natt og sa: «Dette livet du nå lever, må du leve om igjen i nøyaktig samme rekkefølge og detalj en uendelighet av ganger»?',
        takeaway: 'Ville du kastet deg ned i fortvilelse, eller elsket skjebnen din (amor fati) så høyt at du jublet over beskjeden?',
      },
      {
        title: 'Det gale mennesket med lykten',
        description: 'En mann løper inn på markedsplassen midt på dagen med en tent lykt og roper: «Jeg leter etter Gud! Vi har drept ham – dere og jeg!»',
        takeaway: 'Guds død betyr at det metafysiske ankeret for vestlig moral er borte, og mennesket står i fare for å synke ned i passiv nihilisme.',
      },
    ],
    receptionAndCritique:
      'Eksploderte som en av modernitetens mest leste og siterte tenkere. Hans søster Elisabeth forfalsket notatene hans etter hans død til inntekt for tysk nasjonalisme og rasisme, men etterkrigstidens forskning renvasket Nietzsche som en kompromissløs motstander av flokkmentalitet og antisemittisme.',
  },

  popper: {
    philosopherId: 'popper',
    historicalContext:
      'Vokste opp i Wien med jødisk familiebakgrunn under opptrappingen til fascismen. Som sosialist og vitenskapsteoretiker måtte han flykte til New Zealand like før Anschluss i 1938, før han etter krigen ble professor ved London School of Economics.',
    majorWorks: [
      {
        title: 'Forskningens logikk (The Logic of Scientific Discovery)',
        year: 1934,
        description: 'Vitenskapsteoriens hjørnestein: Falsifikasjonisme og løsningen på demarkasjonsproblemet.',
      },
      {
        title: 'Det åpne samfunn og dets fiender',
        year: 1945,
        description: 'Det liberale demokratiets forsvarsskrift og et nådeløst oppgjør med Platon, Hegel og Marx som opphavsmenn til totalitær tenkning.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Svaneproblemet (Asymmetrien)',
        description: 'Uansett hvor mange tusen hvite svaner du observerer, kan du aldri være logisk sikker på at «alle svaner er hvite». Men ser du én eneste sort svane, vet du med 100 % logisk sikkerhet at hypotesen er falsk.',
        takeaway: 'Verifikasjon er logisk umulig; falsifikasjon er logisk tvingende.',
      },
    ],
    receptionAndCritique:
      'Formet hvordan moderne naturvitenskapelige forskere forstår sin egen praksis. Kritisert av vitenskapshistorikere (særlig Thomas Kuhn) for å presentere et idealistisk glansbilde av vitenskapen som ikke stemmer med hvordan forskere faktisk opptrer i historiske kriser.',
  },

  sartre: {
    philosopherId: 'sartre',
    historicalContext:
      'Var krigsfange i tysk leir under andre verdenskrig, deltok i den franske motstandsbevegelsen og opplevde Paris’ frigjøring i 1944. Grunnla tidsskriftet Les Temps Modernes sammen med Simone de Beauvoir. Ble etter krigen Frankrikes mest synlige intellektuelle superstjerne og en glødende støttespiller for frigjøringsbevegelser i Algerie og den tredje verden. Takket nei til Nobelprisen i litteratur i 1964.',
    majorWorks: [
      {
        title: 'Væren og intet (L\'Être et le Néant)',
        year: 1943,
        description: 'Eksistensialismens filosofiske hovedverk: Bevissthetens frihet (pour-soi), angsten og ond tro.',
      },
      {
        title: 'Eksistensialisme er humanisme',
        year: 1946,
        description: 'Den legendariske forelesningen som populariserte eksistensialismen for allmennheten.',
      },
      {
        title: 'Kvalmen (La Nausée)',
        year: 1938,
        description: 'Filosofisk roman om hovedpersonen Roquentin som plutselig overveldes av tingenes rå, meningsløse eksistens.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Kelneren på kaféen (Ond tro)',
        description: 'Se på kafékelneren: Bevegelsene hans er litt for presise, stemmen litt for høflig, balansen med brettet litt for overdrevet. Han spiller rollen som «kelner» for å late som om han *er* en gjenstand med fastlagte funksjoner.',
        takeaway: 'Ond tro er å flykte fra din egen ubegrensede frihet og gjemme deg bak en sosial fasade.',
      },
      {
        title: 'Eleven under krigen',
        description: 'En ung student kommer til Sartre under krigen for råd: Skal han bli i Frankrike for å pleie sin syke mor, eller reise til England for å kjempe mot nazistene?',
        takeaway: 'Ingen etisk lære (verken kristen nestekjærlighet eller pliktetikk) kan regne ut svaret; uansett hva han velger, må han velge selv og bære ansvaret alene.',
      },
    ],
    receptionAndCritique:
      'Gjorde eksistensialismen til en verdensomspennende kulturell bevegelse. Kritisert av sosiologer og marxister for å overdrive individets absolutte frihet og ignorere at fattigdom, rasisme og vold i praksis kan knuse menneskers handlingsrom.',
  },

  'de-beauvoir': {
    philosopherId: 'de-beauvoir',
    historicalContext:
      'En av de første kvinnene som tok den prestisjetunge agrégation-eksamenen i filosofi ved Sorbonne i Paris. Levde i et livslangt intellektuelt og personlig partnerskap med Jean-Paul Sartre, men kjempet hardt for å bli vurdert som en selvstendig filosofisk stemme. Utgivelsen av Det annet kjønn i 1949 vakte voldsom moralsk forargelse i Frankrike og ble satt på Vatikanets indeks over forbudte bøker.',
    majorWorks: [
      {
        title: 'Det annet kjønn (Le Deuxième Sexe)',
        year: 1949,
        description: 'Moderne kvinne- og kjønnsforsknings ubestridte grunntekst: «Man fødes ikke som kvinne, man blir det».',
      },
      {
        title: 'Tvetydighetens etikk',
        year: 1947,
        description: 'Eksistensialistisk moralfilosofi om forholdet mellom egen frihet og andres frigjøring.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Kvinnen som «den Andre»',
        description: 'I all historisk mytologi og samfunnsteori er mannen satt som det universelle Subjektet («Mennesket»), mens kvinnen defineres som det relative, det avvikende – «den Andre».',
        takeaway: 'Kvinners underordning er ikke en biologisk skjebne, men resultatet av en historisk og kulturell konstruksjon.',
      },
    ],
    receptionAndCritique:
      'Utløste den «andre bølgen» av internasjonal feminisme på 1960- og 70-tallet. Lenge feilaktig redusert til «Sartres elev», men anerkjennes i dag som den som tilførte eksistensialismen den nødvendige forankringen i levde kropper, sosial situasjon og etisk ansvar overfor medmennesker.',
  },

  'arne-naess': {
    philosopherId: 'arne-naess',
    historicalContext:
      'Ble utnevnt til professor i filosofi ved Universitetet i Oslo som 27-åring i 1939 – Norges yngste professor noensinne. Han moderniserte ex.phil for titusenvis av norske studenter gjennom sin lære om saklighet og tolkning. Sa opp professoratet i 1969 for å vie seg helt til økologisk aktivisme og friluftsliv, og bodde lange perioder i sin enkle hytte Tvergastein under Hallingskarvet.',
    majorWorks: [
      {
        title: 'Økologi, samfunn og livsstil',
        year: 1974,
        description: 'Dypøkologiens manifest: Økosofi T, biosfærisk egalitarisme og et oppgjør med den vestlige vekstfilosofien.',
      },
      {
        title: 'Tolkning og presisering',
        year: 1953,
        description: 'En klassiker i semantikk og saklighetslære som la grunnlaget for norsk akademisk debattkultur.',
      },
      {
        title: 'Livsfilosofi',
        year: 1998,
        description: 'Folkelig bestselger om følelser, fornuft og gleden ved et enkelt liv i samklang med naturen.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Det utvidede Selv',
        description: 'Når du ser et vakkert tre bli hugget ned, eller en elv bli lagt i rør, opplever du det ikke som et abstrakt tap; du kjenner det som et slag mot deg selv.',
        takeaway: 'Menneskelig modning handler om å utvide sin empati og identifikasjon til å omfatte hele det levende økosystemet.',
      },
    ],
    receptionAndCritique:
      'Norges mest kjente filosof internasjonalt og en global inspirasjonskilde for miljøbevegelsen. Kritisert av enkelte samfunnsforskere for å være politisk naiv i møte med global kapitalisme og for at begrepet «alt levendes like rett til å utfolde seg» skaper uløselige dilemmaer i praksis.',
  },

  hobbes: {
    philosopherId: 'hobbes',
    historicalContext:
      'Levde gjennom en av Englands mest voldelige epoker, der kong Karl I ble henrettet og borgerkrigen rev samfunnet fra hverandre. Hobbes måtte flykte til Paris i ti år. Han sa selv at «min mor fødte tvillinger: meg og frykten». Frykten for borgerkrig og kaos formet hele hans autoritære politiske filosofi.',
    majorWorks: [
      {
        title: 'Leviathan',
        year: 1651,
        description: 'Statsfilosofiens store mesterverk om menneskenaturen, naturtilstanden og opprettelsen av en mektig statssuveren.',
      },
      {
        title: 'De Cive (Om borgeren)',
        year: 1642,
        description: 'En tidlig og konsis formulering av samfunnskontrakten og statens rettigheter overfor kirken.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Naturtilstanden (Alles krig mot alle)',
        description: 'Se for deg hva som skjer hvis politiet, domstolene og lovene forsvinner over natten. Uten en felles overordnet makt vil alles frykt for alle føre til forebyggende angrep.',
        takeaway: 'Uten en sterk stat er menneskelivet «ensomt, fattig, ekkelt, brutalt og kort».',
      },
    ],
    receptionAndCritique:
      'Grunnlegger av moderne statsvitenskap og realistisk politisk teori. Kritisert av liberale og demokratiske tenkere (som Locke og Rousseau) for å overdrive menneskets egoisme og for å gi statssuverenen ubegrenset makt over borgerne.',
  },

  rousseau: {
    philosopherId: 'rousseau',
    historicalContext:
      'Født i Genève som urmakersønn. Levde et omflakkende liv og følte seg aldri hjemme i de parisiske salongenes intellektuelle overfladiskhet. Skriftene hans ble fordømt og brent i både Paris og Genève, og han levde på flukt mye av sitt liv. Hans idéer om folkesuverenitet og likhet ble den intellektuelle ammunisjonen under Den franske revolusjonen.',
    majorWorks: [
      {
        title: 'Samfunnskontrakten (Du contrat social)',
        year: 1762,
        description: '«Mennesket er født fritt, men overalt er det i lenker». Læren om allmennviljen og ekte folkestyre.',
      },
      {
        title: 'Émile – eller om oppdragelsen',
        year: 1762,
        description: 'Pedagogikkens klassiker: La barnet utvikle seg i pakt med naturen uten å bli ødelagt av samfunnets kunstigheter.',
      },
      {
        title: 'Om ulikheten blant menneskene',
        year: 1755,
        description: 'Hvordan privat eiendomsrett og sivilisasjon korrumperte menneskets opprinnelige godhet.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Den første inngjerdringen av jord',
        description: '«Den første som gjerdet inn et stykke jord og sa: Dette er mitt!, og fant folk enfoldige nok til å tro ham, var det borgerlige samfunns sanne grunnlegger.»',
        takeaway: 'Menneskelig ulikhet og krig er ikke en naturnødvendighet, men en historisk oppfinnelse.',
      },
    ],
    receptionAndCritique:
      'Inspirerte både romantikken, pedagogikken og den moderne demokratiske nasjonalstaten. Samtidig har hans påstand om at den som nekter å adlyde allmennviljen må «tvinges til å være fri» fått liberalere til å advare mot totalitære tendenser.',
  },

  wittgenstein: {
    philosopherId: 'wittgenstein',
    historicalContext:
      'Sønn av en av Østerrikes rikeste stålmagnater i Wien. Kjempet frivillig i skyttergravene under første verdenskrig hvor han fullførte sin første bok. Ga bort hele sin enorme farsarv og jobbet som barneskolelærer og gartner i østerrikske landsbyer, før han ble lokket tilbake til Cambridge University som professor.',
    majorWorks: [
      {
        title: 'Tractatus Logico-Philosophicus',
        year: 1921,
        description: 'Den tidlige logiske atomismen: Språket avbilder virkeligheten; «hva man ikke kan tale om, må man tie om».',
      },
      {
        title: 'Filosofiske undersøkelser (Philosophische Untersuchungen)',
        year: 1953,
        description: 'Utgitt posthumt; et totalt oppgjør med sin egen tidligere filosofi: Mening er ikke avbildning, men *bruk* i sosiale språkspill.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Bille i esken (Privatspråkargumentet)',
        description: 'Anta at alle mennesker har en liten eske med noe inni som kalles en «bille». Ingen kan noensinne se inn i en annens eske. Kunne ordet «bille» bety en privat følelse?',
        takeaway: 'Språklig mening kan ikke være rent privat i sinnet; mening forutsetter felles sosiale regler.',
      },
      {
        title: 'And-kanin-figuren',
        description: 'En tegning som kan sees både som et andehode vendt mot venstre og et kaninhode vendt mot høyre.',
        takeaway: 'Vi ser ikke bare passive lysbølger; vi «ser som» (fortolker) basert på begrepene våre.',
      },
    ],
    receptionAndCritique:
      'Regnes som det 20. århundrets største språkfilosof. Han er unik i idéhistorien ved å ha ledet to motstridende intellektuelle revolusjoner (tidlig logisk positivisme og sen pragmatisk hverdagspråksfilosofi). Kritisert av tradisjonelle metafysikere for å redusere dype eksistensielle spørsmål til språklige knuter.',
  },

  augustin: {
    philosopherId: 'augustin',
    historicalContext:
      'Levde i Hippo (i dagens Algerie) i Romerrikets kaotiske nedgangstid. Var vitne til at vestgoterne plyndret selve Roma i 410 e.Kr. – en hendelse som sjokkerte samtiden og fikk hedninger til å gi kristendommen skylden for imperiets fall. Augustin skrev sitt store verk for å forsvare kristendommen og forklare historiens åndelige mening.',
    majorWorks: [
      {
        title: 'Bekjennelser (Confessiones)',
        year: 400,
        description: 'Verdenslitteraturens første dype psykologiske selvbiografi: Om ungdommens synder, begjær og hans dramatiske omvendelse til Gud.',
      },
      {
        title: 'Om Gudsstaten (De Civitate Dei)',
        year: 426,
        description: 'Historiens kamp mellom to riker: Den jordiske staten (bygget på egenkjærlighet) og Gudsstaten (bygget på kjærlighet til Gud).',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Pæretreet i naboens hage',
        description: 'Som tenåring snek Augustin seg inn i en hage og stjal umodne pærer bare for å kaste dem til grisene. Hvorfor? Ikke fordi han var sulten, men fordi han nøt selve overtredelsen.',
        takeaway: 'Menneskets vilje er skadet av arvesynden og drives mot det gale for dets egen skyld uten Guds nåde.',
      },
    ],
    receptionAndCritique:
      'Formet hele den katolske og protestantiske teologien (både Luther og Calvin var dypt influert av Augustin). Kritisert av moderne tenkere for sitt dystre syn på seksualitet, kvinnekjønn og predestinasjon.',
  },

  aquinas: {
    philosopherId: 'aquinas',
    historicalContext:
      'Dominikanermunk og professor ved universitetet i Paris på 1200-tallet. Dette var høymiddelalderens gullalder, da Aristoteles’ tapte skrifter kom tilbake til Europa via arabiske oversettelser og rystet den kristne kirken. Aquinas viet sitt liv til å bevise at Aristoteles’ fornuft og Bibelens åpenbaring ikke motsier hverandre, men danner en harmonisk enhet.',
    majorWorks: [
      {
        title: 'Summa Theologiae',
        year: 1274,
        description: 'Middelalderens intellektuelle katedral: De fem gudsbevis, naturretten og menneskets dyder.',
      },
      {
        title: 'Summa contra Gentiles',
        year: 1264,
        description: 'Et filosofisk forsvar for kristendommen rettet mot ikke-kristne filosofer og lærde.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'De fem veier (Gudsbevisene)',
        description: 'Alt som beveger seg i universet, beveges av noe annet. Men en uendelig kjede av bevegere bakover i tid er umulig.',
        takeaway: 'Det må finnes en Første Ubevegede Beveger som setter alt i gang uten selv å bli beveget – og dette kaller vi Gud.',
      },
    ],
    receptionAndCritique:
      'Ble utnevnt til kirkelærer (Doctor Angelicus) og utgjør den offisielle filosofiske bærebjelken i den katolske kirke (thomismen). Kritisert av tidligmoderne tenkere for spissfindig skolastisk hårkløveri og for å underkaste fri fornuft teologiske dogmer.',
  },

  foucault: {
    philosopherId: 'foucault',
    historicalContext:
      'Professor ved Collège de France i Paris. Aktiv i fangeopprør, antirasistisk arbeid og homobevegelsen på 1960- og 70-tallet. Han analyserte hvordan moderne institusjoner (fengsler, psykiatriske sykehus, klinikker og skoler) i det skjulte disiplinerer og former menneskers kropp og seksualitet.',
    majorWorks: [
      {
        title: 'Overvåkning og straff (Surveiller et punir)',
        year: 1975,
        description: 'Fra offentlig tortur på torget til moderne disiplinering, timeplaner og overvåkning.',
      },
      {
        title: 'Seksualitetens historie',
        year: 1976,
        description: 'Et oppgjør med «undertrykkingshypotesen»: Seksualitet er ikke noe samfunnet undertrykker, men en diskurs samfunnet produserer for å styre oss.',
      },
      {
        title: 'Galskapens historie',
        year: 1961,
        description: 'Hvordan fornuftens opplysningstid skapte «galskapen» som sitt eget utstøtte motstykke.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Panoptikon',
        description: 'Et sirkulært fengsel tegnet av Jeremy Bentham der et sentralt tårn kan se inn i alle celler, men fangene kan aldri se om vakten er der eller ikke.',
        takeaway: 'Makt fungerer mest effektivt når den overvåkede internaliserer blikket og disiplinerer seg selv.',
      },
    ],
    receptionAndCritique:
      'En av verdens mest siterte intellektuelle innen humaniora og samfunnsvitenskap. Kritisert av Jürgen Habermas for mangel på et normativt kompass: Hvis all kunnskap er makt, på hvilket grunnlag kan vi da kritisere urettferdighet?',
  },

  arendt: {
    philosopherId: 'arendt',
    historicalContext:
      'Tysk-jødisk filosof som ble arrestert av Gestapo i Berlin i 1933, rømte til Paris og overlevde interneringsleir i Frankrike før hun i 1941 klarte å flykte med båt til USA. Dekket rettssaken mot holocaust-arkitekten Adolf Eichmann i Jerusalem i 1961 for magasinet The New Yorker.',
    majorWorks: [
      {
        title: 'Eichmann i Jerusalem: En rapport om ondskapens banalitet',
        year: 1963,
        description: 'Rapporten som sjokkerte verden: Eichmann var ikke et monster, men en skremmende ordinær byråkrat som manglet evnen til å tenke selv.',
      },
      {
        title: 'Menneskets vilkår (The Human Condition / Vita Activa)',
        year: 1958,
        description: 'Hovedverket om menneskelig handling: Skillet mellom arbeid (overlevelse), verk (gjenstander) og handling (politisk fellesskap).',
      },
      {
        title: 'Totalitarismens opprinnelse',
        year: 1951,
        description: 'Analyse av nazismens og stalinismens fremvekst gjennom antisemittisme, imperialisme og massesamfunnets ensomhet.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Ondskapens banalitet',
        description: 'I rettssalen så Arendt ikke en demonisk morder, men en mann som snakket i klisjeer og bare «gjorde plikten sin» for å fremme karrieren i et byråkrati.',
        takeaway: 'Den største ondskapen i moderne tid begås av mennesker som frasier seg sin egen dømmekraft og slutter å tenke.',
      },
    ],
    receptionAndCritique:
      'En av det 20. århundrets modigste og mest innflytelsesrike politiske tenkere. Rapporten om Eichmann skapte en voldsom storm og førte til at mange venner brøt med henne fordi de mente hun bagatelliserte skyld, men i dag står begrepet «ondskapens banalitet» som en universell etisk advarsel.',
  },

  anscombe: {
    philosopherId: 'anscombe',
    historicalContext:
      'Professor i filosofi ved Oxford og Cambridge, og en av Ludwig Wittgensteins nærmeste elever. Da Oxford University i 1956 ville tildele USAs tidligere president Harry S. Truman et æresdoktorat, stilte Anscombe seg modig opp i protest: Truman hadde bevisst beordret drap på hundretusenvis av uskyldige sivile i Hiroshima og Nagasaki, og en slik handling kunne aldri legitimeres, uansett krigsformål.',
    majorWorks: [
      {
        title: 'Modern Moral Philosophy',
        year: 1958,
        description: 'Artikkelen som startet den moderne dydsetikkens renessanse ved å kritisere både pliktetikk og utilitarisme.',
      },
      {
        title: 'Intention',
        year: 1957,
        description: 'En klassiker innen handlingsfilosofi om hva som skiller en villet handling fra en utilsiktet hendelse.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Doktrinen om dobbel virkning',
        description: 'En bonde planter en bombe for å drepe en fiendtlig offiser vel vitende om at et barn i nærheten også vil omkomme, kontra en kirurg som fjerner en kreftsvulst vel vitende om at pasienten kan dø under inngrepet.',
        takeaway: 'Det er en moralsk fundamental forskjell på å ville et onde som middel, og å forutse et onde som en uunngåelig bieffekt.',
      },
    ],
    receptionAndCritique:
      'Gjenskapte dydsetikken som en av de tre store retningene i moderne normativ etikk. Kritisert av utilitarister for å være for opphengt i aktørens indre motiver i stedet for de faktiske konsekvensene i verden.',
  },

  epikur: {
    philosopherId: 'epikur',
    historicalContext:
      'Virket i Athen under den hellenistiske krisetiden etter Aleksander den stores død. Han kjøpte et hus med en hage utenfor bymurene (Kepos) hvor han inviterte alle – inkludert slaver, kvinner og prostituerte – til å leve et enkelt liv viet til vennskap og filosofi, borte fra politikkens maktspill og stress.',
    majorWorks: [
      {
        title: 'Brev til Menoikeus',
        year: -300,
        description: 'Det mest berømte brevet om døden, lykken og hvordan man oppnår sjelefred (ataraxia).',
      },
      {
        title: 'Hovedlæresetninger (Kyriai Doxai)',
        year: -290,
        description: '40 aforismer og leveregler om nytelse, frykt og vennskap.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Tetrapharmakos (De fire medisinene mot frykt)',
        description: '1. Frykt ikke gudene (de bryr seg ikke om oss). 2. Frykt ikke døden (når vi er, er ikke døden; når døden er, er ikke vi). 3. Det gode er lett å oppnå (enkle behov som brød og vann). 4. Det vonde er lett å utholde (enten kortvarig eller dør vi).',
        takeaway: 'Menneskets lidelse skyldes unødvendige begjær og irrasjonell frykt for døden.',
      },
    ],
    receptionAndCritique:
      'Grovt baktalt av stoikere og tidlige kristne som en umoralsk «hedonist» og fråtser (derav det moderne ordet «epikureer»). I realiteten levde Epikur på brød, vann og oliven, og advarte mot sanselig overflod fordi det skaper bakrus og uro.',
  },

  'marcus-aurelius': {
    philosopherId: 'marcus-aurelius',
    historicalContext:
      'Romersk keiser i det 2. århundre e.Kr. Sto overfor enorme kriser: Den antoninske pesten som utslettet store deler av befolkningen, opprør og bitre kriger ved rikets nordgrense mot germanske stammer. Han skrev sine refleksjoner i teltet ved felttogfronten langs Donau som en personlig dagbok for å holde hodet kaldt.',
    majorWorks: [
      {
        title: 'Til meg selv (Meditasjoner)',
        year: 180,
        description: 'Verdenshistoriens mest leste personlige selvhjelpsbok og etiske dagbok om plikt, ydmykhet og fatning.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Synet fra oven',
        description: 'Lukk øynene og se for deg jorden høyt oppe fra stjernene: Se keiserdømmene, hærene, domstolene og rikdommene som ørsmå maurtuer som forsvinner i det uendelige rommet.',
        takeaway: 'Våre daglige bekymringer og sårede stolthet krymper til ingenting når de sees i lys av kosmos og evigheten.',
      },
    ],
    receptionAndCritique:
      'Står som det fremste eksempelet på Platons ideal om en «filosofkonge». Beundret gjennom to årtusener av ledere, tenkere og vanlige mennesker for sin kompromissløse ærlighet overfor seg selv og sin etiske standhaftighet.',
  },

  seneca: {
    philosopherId: 'seneca',
    historicalContext:
      'Romersk senator, forfatter og keiser Neros privatlærer og rådgiver. Levde midt i Romas farligste maktintriger, ble forvist til Korsika i åtte år, ble ufattelig rik, og ble til slutt beordret av den gale keiser Nero til å begå selvmord i år 65 e.Kr., noe han gjennomførte med stoisk verdighet.',
    majorWorks: [
      {
        title: 'Brev til Lucilius (Epistulae Morales)',
        year: 65,
        description: '124 brev med praktiske råd om vennskap, tidssløsing, alderdom og frykt for døden.',
      },
      {
        title: 'Om livets korthet (De Brevitate Vitae)',
        year: 49,
        description: '«Livet er langt nok hvis du vet hvordan du skal bruke det; det meste kaster vi bort på unyttige gjøremål.»',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Premeditatio Malorum (Foregrip det verste)',
        description: 'Tenk hver morgen over det verste som kan skje i dag: Du kan bli syk, miste pengene dine, eller bli sviktet av en venn.',
        takeaway: 'Når du har sett det verste i øynene på forhånd, kan ingenting overrumple eller knekke deg.',
      },
    ],
    receptionAndCritique:
      'En mester i det latinske essayspråket. Kritisert i samtiden og ettertiden for hykleri: Han forkynte nøysomhet og forakt for rikdom, men var samtidig en av Romerrikets rikeste menn og tjente en tyrann som Nero.',
  },

  epiktet: {
    philosopherId: 'epiktet',
    historicalContext:
      'Født som slave i Hierapolis (i dag Tyrkia). Hans romerske herre mishandlet ham så grovt at han ble halt for resten av livet. Fikk etter hvert sin frihet og grunnla en berømt filosofiskole i Hellas. Han eide nesten ingenting annet enn en stråmatte og en leirlykt.',
    majorWorks: [
      {
        title: 'Håndbok i livskunst (Encheiridion)',
        year: 125,
        description: 'En ultrakonsis praktisk guide til stoisk sjelefred og mental motstandskraft.',
      },
      {
        title: 'Samtaler (Diatribai)',
        year: 108,
        description: 'Nedtegnelser av hans muntlige undervisning gjort av eleven Arrian.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Kontrollens todeling (Dichotomy of Control)',
        description: 'Del verden strengt i to: 1. Ting som er under din kontroll (dine meninger, verdier, reaksjoner og valg). 2. Ting som ikke er under din kontroll (kroppen din, ryktet ditt, været, andre menneskers handlinger og døden).',
        takeaway: 'Hvis du bare bryr deg om det du har kontroll over, kan ingen i hele verden noensinne gjøre deg ulykkelig.',
      },
    ],
    receptionAndCritique:
      'Var keiser Marcus Aurelius’ store åndelige helt og inspirasjonskilden til moderne kognitiv atferdsterapi (CBT / Aaron Beck). Viser at ekte indre frihet er fullstendig uavhengig av ytre lenker.',
  },

  diogenes: {
    philosopherId: 'diogenes',
    historicalContext:
      'Levde i Athen og Korint på 300-tallet f.Kr. Drev kynismen (fra gresk kyon, «hund») til sitt ytterste ved å forkaste enhver borgerlig bekvemmelighet, kleskode og skikk. Han bodde i en stor krukke/tønne (pithos) på torget, tigget til livets opphold og gjorde narr av intellektuelt snobberi.',
    majorWorks: [
      {
        title: 'Ingen skrifter (Levd filosofi)',
        description: 'Diogenes skrev ingen overleverte bøker. Hans liv og offentlige provokasjoner var selve filosofien.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Lykten i dagslys',
        description: 'Diogenes gikk rundt i Athens gater med en tent lykt midt på blanke formiddagen. Da folk spurte hva han drev med, svarte han: «Jeg leter etter et oppriktig, ekte menneske.»',
        takeaway: 'Menneskene gjemmer seg bak masker av sosial prestisje og hykleri.',
      },
      {
        title: 'Møtet med Aleksander den store',
        description: 'Verdensherskeren Aleksander kom til Diogenes og sa: «Be om hva som helst du ønsker, og jeg skal gi deg det!» Diogenes svarte: «Flytt deg litt til siden, du skygger for solen min.»',
        takeaway: 'Ekte frihet er å trenge så lite at selv verdens mektigste mann ikke har noe å friste eller true deg med.',
      },
    ],
    receptionAndCritique:
      'En legendarisk motkulturell skikkelse. Beundret av stoikerne for sin ubøyelige viljestyrke og forakt for luksus, men fryktet og avskydd av samtidens borgerskap for sin ublu oppførsel.',
  },

  schopenhauer: {
    philosopherId: 'schopenhauer',
    historicalContext:
      'Sønn av en rik handelsmann i Danzig og Hamburg. Levde i Frankfurt som uavhengig privatskolelærer. La forelesningene sine ved universitetet i Berlin på nøyaktig samme tidspunkt som den feirede Hegel for å utfordre ham – men opplevde den ydmykelsen at alle studentene gikk til Hegel mens Schopenhauers auditorium sto tomt. Var den første store vestlige tenkeren som leste og integrerte indiske Upanishader og buddhisme.',
    majorWorks: [
      {
        title: 'Verden som vilje og forestilling',
        year: 1818,
        description: 'Hovedverket: Virkeligheten bak sanseverdenen er en blind, rastløs og hensynsløs «Vilje til liv» som dømmer oss til lidelse og savn.',
      },
      {
        title: 'Kunsten å alltid ha rett',
        year: 1831,
        description: '38 kyniske dialektiske knep for å vinne en debatt, uavhengig av sannheten.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Pinnsvinenes dilemma',
        description: 'På en kald vinterdag må en flokk pinnsvin rykke tett sammen for å holde varmen. Men når de kommer for nær, stikker piggene deres hverandre smertefullt. Rygger de unna, fryser de i hjel.',
        takeaway: 'Menneskelige relasjoner er en evig balanse mellom ensomhetens kulde og nærhetens sår.',
      },
    ],
    receptionAndCritique:
      'Fascinert og formet både den unge Nietzsche, Sigmund Freud (det ubevisste og driftene) og Leo Tolstoj. Kritisert for overdreven pessimisme og for at hans livsførsel (god mat og luksus) ikke helt matchet hans asketiske buddhisme-ideal.',
  },

  zapffe: {
    philosopherId: 'zapffe',
    historicalContext:
      'Norsk jurist, filosof, forfatter og fjellklatrer fra Tromsø. Skrev sin doktoravhandling Om det tragiske ved Universitetet i Oslo i 1941 midt under den tyske okkupasjonen. Bodde store deler av livet i en enkel hytte i Asker og viet seg til klatring, natur og eksistensielle grublerier. Valgte bevisst å forbli barnløs for ikke å påføre nye sjeler eksistensens tragedie.',
    majorWorks: [
      {
        title: 'Om det tragiske',
        year: 1941,
        description: 'Filosofisk doktoravhandling om menneskets eksistensielle overutrustning og det tragiske i naturen.',
      },
      {
        title: 'Den siste Messias',
        year: 1933,
        description: 'Klassisk essay om de fire forsvarsmekanismene mennesket bruker for ikke å gå til grunne i eksistensiell panikk.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Kjempehjorten med for store gevir',
        description: 'Den forhistoriske kjempehjorten utviklet gjennom evolusjonen så enorme gevir at den til slutt ikke klarte å løfte hodet eller rømme fra rovdyr. Mennesket har på samme måte utviklet en overdimensjonert bevissthet.',
        takeaway: 'Mennesket krever mening og rettferdighet av et univers som er blindt og meningsløst; vi er en biologisk feilkonstruksjon.',
      },
    ],
    receptionAndCritique:
      'Norges mest originale eksistensielle tenker. Inspirerte Arne Næss og generasjoner av norske intellektuelle og forfattere. Kritisert for å være for nattsvart og for å overse menneskets evne til å skape genuin glede og fellesskap på tross av universets taushet.',
  },

  holberg: {
    philosopherId: 'holberg',
    historicalContext:
      'Født i Bergen, men virket som professor og rektor ved Københavns Universitet under Danmark-Norges opplysningstid. Reiste på kryss og tvers i Europa til fots og brakte med seg moderne europeiske opplysningsidéer (John Locke, naturretten og vitenskapelig rasjonalitet) til Norden.',
    majorWorks: [
      {
        title: 'Nils Klims underjordiske reise',
        year: 1741,
        description: 'Satirisk science-fiction-roman om en bergenser som faller inn i jordens indre og oppdager utopiske samfunn hvor trær snakker og kvinner og menn er likestilt.',
      },
      {
        title: 'Moralske tanker',
        year: 1744,
        description: 'Kloke, humoristiske og tolerante essays om menneskenaturen, fordommer og etikk.',
      },
      {
        title: 'Erasmus Montanus',
        year: 1723,
        description: 'Komedie som parodierer studenters oppblåste latin-snobberi mot sunn fornuft.',
      },
    ],
    thoughtExperiments: [
      {
        title: 'Potu-riket under jorden',
        description: 'Nils Klim havner i landet Potu under jorden, der kloke trær styrer. I Potu har kvinner og menn nøyaktig samme rettigheter, men den som foreslår en ny lov må ha en løkke rundt halsen mens forslaget debatteres – blir det avvist, heises han opp!',
        takeaway: 'Kritikk av forhastede politiske innfall og hyllest til likeverd og fornuftig toleranse.',
      },
    ],
    receptionAndCritique:
      'Nordens fremste opplysningsmann og grunnleggeren av moderne dansk-norsk litteratur og dramatikk. Kritisert i samtiden av konservative pietister for sine uærbødige satirer, men elsket som fornuftens og humorens talsmann.',
  },

  heraklit: {
    philosopherId: 'heraklit',
    historicalContext:
      "Virket i den joniske handelsbyen Efesos (i dag Tyrkia) ca. 500 f.Kr., i en brytningstid preget av persisk ekspansjon og gresk bystatskultur. Han tilhørte byens arvelige fyrsteslekt, men frasa seg sine kongelige privilegier til fordel for sin bror for å vie seg helt til filosofisk kontemplasjon. Han ble kalt «den dunkle» (skoteinos) på grunn av sin gåtefulle aforistiske stil og tilbaketrukne forakt for massenes overfladiskhet.",
    majorWorks: [
      {
        title: "Om naturen (overleverte fragmenter)",
        year: -500,
        description: "En samling aforismer og poetiske fragmenter om Logos, kosmisk ild og motsetningenes dynamiske harmoni.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Elven du aldri stiger ned i to ganger",
        description: "Går du ut i en elv, er det aldri det samme vannet som omgir deg andre gang – nye vannmasser strømmer uavbrutt til, og du selv har i mellomtiden også endret deg.",
        takeaway: "Virkeligheten er ikke en samling statiske ting, men en uopphørlig prosess av forandring (panta rhei).",
      },
      {
        title: "Buen og lyren (Motsetningenes spenning)",
        description: "Både buen og lyren fungerer bare fordi strengen trekkes i motsatt retning av treverket; det er motstridende krefter i balanse som skaper pilens kraft og musikkens harmoni.",
        takeaway: "Konflikt og motsetninger er ikke onder som skal utryddes, men selve universets skapende drivkraft.",
      },
    ],
    receptionAndCritique:
      "Inspirerte stoikerne, Hegel og Nietzsche, som hyllet ham som den første tenkeren som forsto at væren er kontinuerlig vorden. Samtidig ble han skarpt kritisert av Parmenides og Platon for å oppheve muligheten for stabil viten: Hvis alt flyter, hvordan kan noe erkjennes med sikkerhet?",
  },

  parmenides: {
    philosopherId: 'parmenides',
    historicalContext:
      "Levde i den greske kolonien Elea i Sør-Italia ca. 500 f.Kr. Han grunnla den eleatiske skolen og formulerte et lovverk for sin hjemby som borgerne sverget troskap til i generasjoner. Han var den første i vestlig tenkning som stilte opp et rent deduktivt, logisk bevis for virkelighetens natur, uavhengig av hva sansene forteller oss.",
    majorWorks: [
      {
        title: "Om naturen (Læredikt)",
        year: -480,
        description: "Et heksameterdikt delt i to deler: «Sannhetens vei» (Aletheia), som beviser at det værende er ett og uforanderlig, og «Meningenes vei» (Doxa), som forklarer sanseverdenens illusjoner.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Intethetens umulighet",
        description: "Prøv å tenke på eller snakke om «ingenting». I samme øyeblikk som du tenker på det, tenker du på noe. Derfor er det umulig for noe å oppstå fra intet (ex nihilo nihil fit), eller å forsvinne inn i intet.",
        takeaway: "Forandring krever at noe blir til av intet; ettersom intet ikke kan eksistere, må forandring være en logisk umulighet og sansenes illusjon.",
      },
    ],
    receptionAndCritique:
      "Grunnla den strenge rasjonalismen og ontologien (læren om væren). Hans elev Zeno forsvarte ham med berømte paradokser (f.eks. Akilles og skilpadden). Platon kalte ham med ærefrykt «den ærverdige og fryktinngytende Parmenides», men måtte begå et «fadermord» i dialogen Sofisten for å gjeninnføre mangfold og forandring i filosofien.",
  },

  pytagoras: {
    philosopherId: 'pytagoras',
    historicalContext:
      "Født på øya Samos i Egeerhavet, men flyktet fra tyrannen Polykrates og slo seg ned i Kroton i Sør-Italia ca. 530 f.Kr. Der etablerte han et strengt religiøst og vitenskapelig brorskap (pytagoreerne) der menn og kvinner delte all eiendom, praktiserte vegetarisme og studerte musikk, geometri og kosmologi. Skolen ble etter hvert møtt med mistenksomhet fra lokalbefolkningen og brent ned under et politisk opprør.",
    majorWorks: [
      {
        title: "Ingen skriftlige verker (Hemmelig muntlig tradisjon)",
        year: -520,
        description: "Pytagoras overlot læren muntlig til sine innvidde disipler (mathematikoi og akousmatikoi) under taushetsløfte.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Den vibrerende strengen (Musikkens matematiske vesen)",
        description: "Deler du en streng i to nøyaktige halvdeler (forholdet 1:2), høres den samme tonen én oktav høyere. Deler du den 2:3, får du en ren kvint; 3:4 gir en kvart.",
        takeaway: "Skjønnhet og harmoni i sanseverdenen hviler på usynlige, matematiske proporsjoner: «Alt er tall».",
      },
      {
        title: "Sfærenes harmoni",
        description: "Himmellegemene beveger seg i faste, matematiske baner og må derfor frembringe en uendelig vakker kosmisk klang (musica universalis), som vi ikke hører fordi vi har levd i den siden fødselen.",
        takeaway: "Universet er et ordnet og harmonisk kosmos, ikke et kaotisk kaos.",
      },
    ],
    receptionAndCritique:
      "La grunnsteinen for matematisk naturvitenskap og påvirket Platons idélære og Johannes Keplers planetlover dypt. Kritisert av rasjonelle tenkere i antikken for esoterisk mystikk, kultlignende hemmelighold og forbud mot å røre hestebønner.",
  },

  aspasia: {
    philosopherId: 'aspasia',
    historicalContext:
      "Født i Milet i Lilleasia, en by kjent for friere utdanning for kvinner enn Athen. Hun flyttet til Athen på 400-tallet f.Kr. Som innflytter (metoik) var hun ikke bundet av de strenge athenske lovene som stengte borgerkvinner inne i hjemmet. Hun ble partneren til Athens mektigste statsmann, Perikles, og hennes hjem ble byens fremste intellektuelle salong hvor Sokrates, Anaxagoras og Sofokles møttes for å diskutere filosofi, politikk og retorikk.",
    majorWorks: [
      {
        title: "Perikles’ gravtale (tillagt Aspasia i Platons Menexenos)",
        year: -431,
        description: "Demokratiets mest berømte hyllesttale til de falne i krigen; Platon lar Sokrates hevde at Aspasia forfattet talen.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Den sokratiske dialogens opprinnelse",
        description: "I Aischines’ dialog lar Aspasia et ektepar innse at uansett hvor rik naboens hest eller kones smykker er, vil de alltid foretrekke den beste ektefellen – og at dyd derfor krever at man gjør seg selv til det beste mennesket for sin partner.",
        takeaway: "Gjennom ledende, empatiske spørsmål kan mennesker bringes til å erkjenne etiske sannheter på egen hånd – forløperen til den sokratiske metoden.",
      },
    ],
    receptionAndCritique:
      "Vant enorm beundring fra Sokrates som kalte henne sin læremester i retorikk og kjærlighetens kunst. Samtidig ble hun utsatt for nådeløse angrep og rettssaker fra athenske komedieforfattere og konservative politikere som svertet henne som en kurtisane (hetaira) fordi en kvinne med makt og intellekt brøt med alle tradisjonelle kjønnsroller.",
  },

  hypatia: {
    philosopherId: 'hypatia',
    historicalContext:
      "Virket i Alexandria i Egypt på slutten av 300-tallet og begynnelsen av 400-tallet e.Kr., datter av matematikeren Theon. Hun ble leder for den nyplatonske skolen i Alexandria og underviste kristne, jødiske og hedenske studenter i matematikk, astronomi og filosofi. I 415 e.Kr. ble hun brutalt myrdet på åpen gate av en kristen mobb hisset opp under en politisk og religiøs maktkamp i byen.",
    majorWorks: [
      {
        title: "Kommentar til Diofants Aritmetikk",
        year: 400,
        description: "Et banebrytende verk innen tidlig algebra og ligningsteori som bidro til å bevare gresk matematikk.",
      },
      {
        title: "Kommentar til Apollonios’ Kjeglesnitt",
        year: 405,
        description: "Avhandling om geometriske kurver (ellipser, parabler, hyperbler) som senere ble sentrale for planetbaner.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Astrolabiet og himmelens mekanikk",
        description: "Ved å holde et astrolabium mot nattehimmelen kan man beregne nøyaktig tid og stjernenes posisjon ut fra geometriske prinsipper.",
        takeaway: "Menneskets fornuft kan avlese og forstå universets storslåtte lover uten å ty til blind overtro.",
      },
    ],
    receptionAndCritique:
      "Ble stående i historien som antikkens fremste kvinnelige vitenskapskvinne og et tragisk symbol på opplysningens undergang i overgangen til middelalderen. Voltaire, opplysningstidens tenkere og moderne feminister har hyllet henne som en martyr for intellektuell frihet og vitenskapelig nysgjerrighet.",
  },

  konfucius: {
    philosopherId: 'konfucius',
    historicalContext:
      "Levde i Kina under Vår- og høstannalenes tid (ca. 551–479 f.Kr.) i staten Lu. Dette var en oppløsningstid preget av borgerkrig, korrupsjon og lovløshet mellom rivaliserende lensherrer. Han reiste fra stat til stat for å overbevise herskerne om at fred ikke skapes med makt eller strenge straffer, men ved at lederne selv opptrer med personlig verdighet og moral. Selv om han døde med følelsen av å ha mislykkes politisk, formet hans elever Øst-Asias sivilisasjon i over 2000 år.",
    majorWorks: [
      {
        title: "Samtaler (Lunyu)",
        year: -475,
        description: "Samling av Konfucius’ fyndord, dialoger med disiplene og leveregler om medmenneskelighet (ren), rituell verdighet (li) og sønlig respekt (xiao).",
      },
    ],
    thoughtExperiments: [
      {
        title: "Lederskap som Nordstjernen",
        description: "«Den som styrer ved hjelp av sin egen moralske styrke, er som Nordstjernen: Den forblir på sin faste plass, mens alle de andre stjernene bøyer seg og kretser omkring den.»",
        takeaway: "Ekte autoritet krever moralsk forbilde; hvis lederen er rettferdig, vil folket følge etter av fri vilje.",
      },
      {
        title: "Den gylne regel i revers (Shu)",
        description: "Disippelen Zigong spurte: «Finnes det ett ord som kan tjene som rettesnor for hele livet?» Mesteren svarte: «Gjensidighet (shu): Det du ikke ønsker at andre skal gjøre mot deg, skal du heller ikke gjøre mot dem.»",
        takeaway: "Empati og selvkritisk måtehold er etikkens fundamentale kjerne.",
      },
    ],
    receptionAndCritique:
      "Konfucianismen ble Han-dynastiets offisielle statsbærende ideologi og dannet grunnlaget for det keiserlige embetseksamen-systemet fram til 1905. Kritisert av daoisme for å være for stivbeint og regelryttersk, og av 1900-tallets modernister og Maos kulturrevolusjon for å opprettholde patriarkalsk underdanighet overfor autoriteter.",
  },

  laozi: {
    philosopherId: 'laozi',
    historicalContext:
      "Tradisjonelt regnet som arkivaren ved Zhou-dynastiets keiserlige hoff i det 6. århundre f.Kr. Skuffet over samfunnets forfall og maktbegjær bestemte han seg for å forlate sivilisasjonen og ri vestover på en vannbøffel. Ved rikets grensepass ba grensevakten Yinxi ham om å skrive ned sin visdom før han forsvant ut i villmarken, hvorpå Laozi etterlot seg den korte boken Daodejing.",
    majorWorks: [
      {
        title: "Daodejing (Boken om Veien og dens Kraft)",
        year: -500,
        description: "81 korte, poetiske og paradoksale kapitler om Dao (den uutsigelige kilden til alt), wu wei (ikke-anstrengelse) og naturlig enkelhet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Vannets kraft (Det myke overvinner det harde)",
        description: "Ingenting i verden er mykere og mer ettergivende enn vann. Likevel er det ingenting som kan overgå vann når det gjelder å slipe ned hard granitt og forme dype kløfter over tid.",
        takeaway: "Sann styrke ligger i tilpasningsevne, mykhet og ydmykhet, ikke i stivbeint aggresjon.",
      },
      {
        title: "Hjulets nav og leirkrukkens tomrom",
        description: "Tretti eiker samles i hjulets nav, men det er det tomme hullet i midten som gjør at vognen ruller. Vi former leire til en krukke, men det er det tomme rommet inni som gjør den brukbar.",
        takeaway: "Det ikke-værende og usynlige er ofte mer verdifullt og virksomt enn det fysiske og påtrengende.",
      },
    ],
    receptionAndCritique:
      "Grunnla daoismen, som sammen med konfucianismen og buddhismen utgjør de «tre lærene» som har formet kinesisk kunst, medisin og tenkning. Kritisert av konfucianere og legalister for å være politisk passiviserende og for å oppmuntre til samfunnsflukt i stedet for samfunnsansvar.",
  },

  zhuangzi: {
    philosopherId: 'zhuangzi',
    historicalContext:
      "Levde i de stridende staters tid (ca. 369–286 f.Kr.) i staten Song. Han avslo lukrative tilbud om høye ministerposter og foretrakk friheten som en enkel håndverker og skribent. Hans tekster er spekket med humor, fabler, samtaler med trær og hodeskaller, og satiriske spark mot selvhøytidelige lærde.",
    majorWorks: [
      {
        title: "Zhuangzi (De indre kapitlene)",
        year: -300,
        description: "Et litterært og filosofisk mesterverk som utforsker relativisme, spontanitet, frihet og livets overganger.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Sommerfugldrømmen",
        description: "Zhuangzi drømte en gang at han var en sommerfugl som flagret sorgløst omkring uten å vite at han var Zhuangzi. Da han våknet, var han igjen Zhuangzi. Men drømte han at han var en sommerfugl, eller drømmer en sommerfugl nå at den er Zhuangzi?",
        takeaway: "Våre faste forestillinger om identitet og virkelighet er relative; grensene mellom bevissthetstilstander er flytende.",
      },
      {
        title: "Kokken Ding som parterer oksen",
        description: "Kokken Ding skar opp en okse med slike elegante, dansende bevegelser at kniven aldri traff et bein eller en sene. Etter 19 år var knivbladet like skarpt som da det kom fra slipesteinen, fordi han lot bladet gli gjennom de naturlige tomrommene.",
        takeaway: "Når du handler i perfekt samklang med naturens flyt (wu wei), krever mesterskap ingen voldelig anstrengelse.",
      },
    ],
    receptionAndCritique:
      "En av verdenshistoriens mest elskede og humoristiske forfatterfilosofer; la grunnlaget for Chan-buddhismen (Zen). Kritisert av strenge moralister for moralsk likegyldighet og for å opphøye likegyldighet overfor liv og død til en dyd.",
  },

  mengzi: {
    philosopherId: 'mengzi',
    historicalContext:
      "Også kjent som Mencius (ca. 372–289 f.Kr.). Oppdratt av sin mor, som i kinesisk tradisjon er selve forbildet for hengiven oppdragelse. Han levde under De stridende staters tid preget av blodige massakrer, og kjempet som omreisende rådgiver for å overbevise konger om at folket er viktigere enn staten og herskeren.",
    majorWorks: [
      {
        title: "Mengzi (Mencius)",
        year: -300,
        description: "Klassiker i konfucianismen som beviser menneskets iboende godhet og forsvarer folkets rett til å avsette en tyrannisk hersker.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Barnet ved brønnen",
        description: "Tenk deg at du plutselig ser et lite barn som krabber mot kanten av en dyp brønn og er i ferd med å falle nedi. Enhver som ser dette vil kjenne et umiddelbart støkk av medfølelse og alarm, uten å tenke på belønning eller ros fra foreldrene.",
        takeaway: "Medfølelse er en medfødt impuls hos alle mennesker; menneskenaturen er opprinnelig god, akkurat som vann naturlig søker nedover.",
      },
    ],
    receptionAndCritique:
      "Kåret til konfucianismens «andre vismann» (etter Konfucius selv). Hans tese om at en hersker som mister folkets støtte har mistet «Himmelens mandat» (og derfor rettmessig kan avsettes), ble et mektig vern mot tyranni. Kritisert av den samtidige filosofen Xunzi, som tvert imot hevdet at menneskenaturen opprinnelig er rå og ond, og krever streng disiplin.",
  },

  mozi: {
    philosopherId: 'mozi',
    historicalContext:
      "Virket på 400-tallet f.Kr. etter Konfucius’ død. Han var sannsynligvis en håndverker eller tømrer, og grunnla en strengt disiplinert bevegelse (moistene) bestående av ingeniører og soldater. De reiste til truede småbyer og hjalp dem med å bygge avanserte forsvarsverker for å stanse imperialistiske angrepskriger.",
    majorWorks: [
      {
        title: "Mozi",
        year: -400,
        description: "Filosofisk traktat om allmenn kjærlighet (jian'ai), pragmatisk nytteetikk og pasifistisk forsvarsteori.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Allmenn kjærlighet (Jian'ai)",
        description: "Hvis en hersker må velge en guvernør til å ta vare på sin familie mens han reiser bort: Ville han valgt den som bare bryr seg om sin egen familie, eller den som elsker alle familier like høyt som sin egen?",
        takeaway: "Partiskhet og klanlojalitet er årsaken til krig og urett; bare universell omsorg for alle skaper trygghet.",
      },
    ],
    receptionAndCritique:
      "Verdens første eksplisitte utilitarist og konsekvensetiker. Hans bevegelse var konfucianismens farligste rival i to århundrer, men ble nesten utslettet under Qin-dynastiets bokbrenning. Gjenoppdaget på 1900-tallet som en banebrytende logiker, vitenskapsmann og sosialreformator.",
  },

  buddha: {
    philosopherId: 'buddha',
    historicalContext:
      "Født som prins Siddhartha Gautama i Shakya-republikken ved foten av Himalaya (i dagens Nepal) ca. 500-tallet f.Kr. Oppvokst i skjermet luksus, men ble rystet da han forlot palasset og for første gang så en olding, en syk, et lik og en asket. Han forlot tronen, praktiserte ekstrem askese som nesten tok livet av ham, og fant til slutt «Den gylne middelvei» under Bodhi-treet i Bodh Gaya, hvor han nådde oppvåkning (Nirvana).",
    majorWorks: [
      {
        title: "Dhammacakkappavattana Sutta (Lærens hjul settes i bevegelse)",
        year: -520,
        description: "Buddhas første preken i Dyreparken i Varanasi: De fire edle sannheter og Den åttedelte vei.",
      },
      {
        title: "Dhammapada (Sannhetens ord)",
        year: -450,
        description: "Klassisk samling av Buddhas visdomsord om sinnets trening, medfølelse og frigjøring fra begjær.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Lignelsen om den forgiftede pilen",
        description: "En mann blir skutt av en forgiftet pil. Før han lar legen trekke den ut, krever han å få vite: Hvem skjøt den? Hvilken kaste tilhørte han? Hva var buen laget av? Mannen vil dø før han får svar på sine teoretiske spørsmål.",
        takeaway: "Filosofiens oppgave er ikke abstrakt metafysisk spekulasjon, men å fjerne menneskets akutte lidelse her og nå.",
      },
      {
        title: "Flåteanalogien",
        description: "Du bygger en flåte for å krysse en farlig elv. Når du har nådd den trygge bredden på den andre siden, bærer du vel ikke flåten videre på ryggen din?",
        takeaway: "Selv religiøse doktriner og filosofiske teorier er bare verktøy for frigjøring; når målet er nådd, må man gi slipp på dem.",
      },
    ],
    receptionAndCritique:
      "Grunnla en av verdens store visdomstradisjoner med enorm innflytelse over hele Asia og i moderne vestlig psykologi. Kritisert av tradisjonell hinduistisk ortodoksi for å avvise Vedaenes hellige autoritet og kastesystemet, og for å fornekte en evig, uforanderlig sjel (anatta).",
  },

  nagarjuna: {
    philosopherId: 'nagarjuna',
    historicalContext:
      "Sør-indisk buddhistisk filosof fra det 2. århundre e.Kr. Grunnleggeren av Madhyamaka-skolen («Middelveien») innen Mahayana-buddhismen. Han virket ved det berømte buddhistiske klosteruniversitetet Nalanda og regnes i Tibet og Øst-Asia som «den andre Buddha».",
    majorWorks: [
      {
        title: "Mūlamadhyamakakārikā (Middelveiens grunnvers)",
        year: 180,
        description: "Filosofihistoriens skarpeste dialektiske analyse: Tomhet (śūnyatā), gjensidig avhengig opprinnelse (pratītyasamutpāda) og de to sannheter.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Vognen og dens deler (Tomhetslæren)",
        description: "Hva er en vogn? Er det hjulene? Akselen? Setet? Hesten? Hvis du plukker delene fra hverandre, finner du ingen uavhengig «vogn-essens». Vognen eksisterer bare i kraft av delenes samspill og navnet vi gir den.",
        takeaway: "Ingenting i universet har en iboende, isolert egeneksistens (svabhava); alt er «tomt» (śūnya) og eksisterer bare i gjensidig avhengighet.",
      },
    ],
    receptionAndCritique:
      "Beundret for sin ubøyelige logiske stringens; inspirerte Zen-buddhismens paradokser og moderne kvantefysiske tolkninger av relasjonell virkelighet. Samtidig ble han anklaget av rivaliserende skoler for å være en nihilist som opphever enhver virkelighet – en anklage han avviste ved å påpeke at tomhet ikke betyr intethet, men frihet fra fastlåste illusjoner.",
  },

  mahavira: {
    philosopherId: 'mahavira',
    historicalContext:
      "Den 24. tirthankara (åndelige veiviser) i jainismen, født ca. 599 f.Kr. i det nåværende Bihar i India. Som samtidig med Buddha forlot han sin kongelige status som 30-åring og praktiserte ekstrem askese og meditasjon i 12 år før han nådde allvitenhet (kevala jnana). Han viet resten av sitt liv til å forkynne en radikal filosofi om ikke-vold (ahimsa) og sannhetens mangefasetterte natur.",
    majorWorks: [
      {
        title: "Acaranga Sutra (overlevert muntlig lære)",
        year: -500,
        description: "Jainismens eldste hellige tekst om klosterregler, askese og det absolutte forbudet mot å skade noen levende skapning.",
      },
    ],
    thoughtExperiments: [
      {
        title: "De blinde mennene og elefanten (Anekantavada)",
        description: "Seks blinde menn undersøker en elefant: En kjenner på støttannen og sier elefanten er som et spyd; en annen kjenner på benet og sier den er som et tre; en tredje på halen og kaller den et rep. Alle har rett fra sitt perspektiv, men alle tar feil hvis de tror de sitter på hele sannheten.",
        takeaway: "Virkeligheten er uendelig kompleks (anekantavada); menneskelige sannheter er alltid partielle og betingede (syadvada).",
      },
    ],
    receptionAndCritique:
      "Formet en av Indias mest respekterte etiske tradisjoner og inspirerte Mahatma Gandhis filosofi om ikke-vold (satyagraha) som beveget en hel verden. Kritisert av buddhistiske og hinduistiske motstandere for at jainismens ekstreme askese (som å feie bakken for ikke å tråkke på insekter) er praktisk uutholdelig for vanlige samfunnsborgere.",
  },

  shankara: {
    philosopherId: 'shankara',
    historicalContext:
      "Levde i Sør-India ca. 788–820 e.Kr. Til tross for sitt korte liv (han døde 32 år gammel) vandret han over hele det indiske subkontinentet, beseiret rivaliserende lærde i filosofiske debatter og etablerte fire store klostre (mathas) som revitaliserte hinduismen. Han forente sprikende tradisjoner under banneret Advaita Vedanta («ikke-dualisme»).",
    majorWorks: [
      {
        title: "Brahmasutrabhashya (Kommentar til Brahma Sutra)",
        year: 810,
        description: "Mesterverket som beviser at den individuelle sjelen (Atman) og det universelle absolutte (Brahman) i dypeste forstand er ett og det samme.",
      },
      {
        title: "Upadeshasahasri (De tusen lærdommer)",
        year: 815,
        description: "Pedagogisk innføring i erkjennelsesteori og metoder for å gjennomskue sinnets illusjoner.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Tauet og slangen (Maya-læren)",
        description: "Du går langs en sti i skumringen og ser plutselig en giftslange som ligger kveilet opp. Hjertet hamrer av redsel. Når du lyser med en lykt, ser du at det bare var et gammelt stykke tau.",
        takeaway: "Frykten og slangen var en illusjon (maya) skapt av uvitenhet; på samme måte forsvinner verdens mangfold og frykt når fornuften ser enheten i Brahman.",
      },
    ],
    receptionAndCritique:
      "Regnes som en av Indias aller største intellektuelle giganter. Kritisert av teistiske filosofer (som Ramanuja) for «kryptobuddhisme» og for at hans upersonlige Brahman gjør ekte personlig kjærlighet til Gud (bhakti) umulig.",
  },

  ramanuja: {
    philosopherId: 'ramanuja',
    historicalContext:
      "Levde i Tamil Nadu i Sør-India (ca. 1017–1137). Han var prest og filosof ved det store tempelet i Srirangam. Han brøt med den eksklusive kasteortodoksien ved å forkynne frelse og åndelig likeverd for alle mennesker, uavhengig av fødsel, gjennom personlig hengivenhet (bhakti) til guden Vishnu.",
    majorWorks: [
      {
        title: "Shri Bhashya",
        year: 1090,
        description: "En monumental kommentar til Brahma Sutra som etablerer Vishishtadvaita (kvalifisert ikke-dualisme).",
      },
      {
        title: "Vedarthasangraha",
        year: 1080,
        description: "Filosofisk syntese av Upanishadene som forener verdens virkelighet med Guds overhøyhet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Universet som Guds kropp (Sharira-Shariri Bhava)",
        description: "På samme måte som din sjel gir liv til, styrer og er uløselig knyttet til kroppen din, er Gud (Brahman) den indre sjelen som gjennomstrømmer og oppholder hele det fysiske universet og alle individuelle sjeler.",
        takeaway: "Verden og menneskene er ikke tomme illusjoner (slik Shankara hevdet), men virkelige, vakre deler av Guds levende organisme.",
      },
    ],
    receptionAndCritique:
      "La det teologiske fundamentet for den populære Bhakti-bevegelsen som demokratiserte indisk åndsliv gjennom sang, poesi og nestekjærlighet. Kritisert av strengt rasjonalistiske ikke-dualister for å kompromittere absolutte enhetskrav med emosjonell gudstro.",
  },

  gargi: {
    philosopherId: 'gargi',
    historicalContext:
      "Levde i det gamle India i den vediske perioden (ca. 700-tallet f.Kr.), datter av vismannen Vachaknu. Under kong Janakas store offerfest i Mithila samlet datidens fremste tenkere seg for å debattere virkelighetens ytterste natur. Gargi var den eneste kvinnen som trådte frem og utfordret den mektigste filosofen, Yajnavalkya, i en legendarisk intellektuell duell nedtegnet i Brihadaranyaka Upanishad.",
    majorWorks: [
      {
        title: "Dialogene i Brihadaranyaka Upanishad",
        year: -700,
        description: "En av de eldste og mest dypsindige filosofiske tekstene i verdenslitteraturen, der Gargi presser spørsmålet om universets ontologiske fundament.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Kosmos som en vev av tråder",
        description: "Gargi spurte: «Vann er vevd på luft, men hva er luften vevd på?» Yajnavalkya svarte: «Ilden.» Gargi fortsatte nådeløst: «Hva er ilden vevd på? Stjernene? Gudene?» Til slutt måtte vismannen advare: «Spør ikke for langt, Gargi, ellers vil hodet ditt falle av!»",
        takeaway: "Menneskelig nysgjerrighet krever et ubetinget, ytterste fundament for alt som eksisterer (Brahman) – hinsides tid og rom.",
      },
    ],
    receptionAndCritique:
      "Står som et lysende forbilde i indisk kvinnehistorie for fryktløst intellektuelt mot og metafysisk dybde. Kritisert av senere patriarkalske skrivere som forsøkte å tone ned hennes rolle, men bevart i Upanishadene som en uovervinnelig sannhetssøker.",
  },

  'ibn-sina': {
    philosopherId: 'ibn-sina',
    historicalContext:
      "Kjent i vesten som Avicenna (ca. 980–1037). Født i Bukhara (i dagens Usbekistan) under Den islamske gullalderen. Han var et universalgeni som leste Aristoteles’ Metafysikk 40 ganger til han kunne den utenat, og ble kongelig livlege og vesir som 18-åring. Han skrev sine banebrytende verker under reiser til hest, i fengsel og mellom kriger i det persiske riket.",
    majorWorks: [
      {
        title: "Medisinens kanon (Al-Qanun fi al-Tibb)",
        year: 1025,
        description: "Medisinhistoriens mest berømte lærebok i over 500 år i både den islamske og europeiske verden.",
      },
      {
        title: "Helbredelsens bok (Kitab al-Shifa)",
        year: 1027,
        description: "Et gigantisk filosofisk encyklopedi over logikk, fysikk, matematikk og metafysikk som helbreder sinnet for uvitenhet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Den flytende mannen (Bevissthetens uavhengighet)",
        description: "Tenk deg at du blir skapt fullt bevisst i dette øyeblikk, men svevende i et totalt mørkt tomrom. Armene og bena er spredt så de ikke rører hverandre; øynene er blinde, ørene døve, og luften har samme temperatur som huden så du kjenner ingenting fysisk.",
        takeaway: "Ville du likevel vite at du eksisterer? Ja! Dette beviser at sjelen er en immateriell substans, helt uavhengig av kroppen – 600 år før Descartes.",
      },
    ],
    receptionAndCritique:
      "Formet all islamsk, jødisk og kristen skolastisk filosofi (Thomas Aquinas bygde videre på hans skille mellom essens og eksistens). Kritisert av Al-Ghazali for å forfekte verdens evighet og fornekte at Gud kjenner enkelthendelser direkte.",
  },

  'ibn-rushd': {
    philosopherId: 'ibn-rushd',
    historicalContext:
      "Kjent som Averroës (1126–1198), født i Córdoba i det mauriske Andalucía (Spania). Han var øverste dommer (qadi) og hofflege for almohad-kalifen i Marrakech. Da religiøs fanatisme tiltok, ble skriftene hans brent på torget i Córdoba og han ble forvist i eksil før kalifen rehabiliterte ham like før hans død.",
    majorWorks: [
      {
        title: "De store kommentarene til Aristoteles",
        year: 1180,
        description: "De definitive kommentarene som gjenoppdaget og forklarte Aristoteles for middelalderens Europa og ga ham tilnavnet «Kommentatoren».",
      },
      {
        title: "Sammenbruddets sammenbrudd (Tahafut al-Tahafut)",
        year: 1180,
        description: "Et glitrende filosofisk motangrep mot Al-Ghazalis kritikk av rasjonell vitenskap og årsakssammenheng.",
      },
      {
        title: "Den avgjørende avhandlingen (Fasl al-Maqal)",
        year: 1179,
        description: "Harmoniseringen av religion og filosofi: Fornuft og åpenbaring er to veier til én og samme sannhet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Sannhetens to språk",
        description: "Koranens metaforer og billedspråk er gitt for at vanlige folk skal forstå etiske sannheter, mens filosofiens strenge demonstrasjoner er for lærde fornuftsvesener.",
        takeaway: "«Sannhet kan aldri motsi sannhet»: Filosofisk vitenskap og religiøs tro står i harmoni, ikke konflikt.",
      },
    ],
    receptionAndCritique:
      "Hans tolkninger utløste «averroismen» ved universitetene i Paris og Padova, som la kimen til den europeiske renessansen og sekulariseringen. Kritisert i den kristne kirke for «monopsykismen» (idéen om at alle mennesker deler én felles universell forstand), og i den islamske verden for overdreven tiltro til gresk logikk.",
  },

  'al-farabi': {
    philosopherId: 'al-farabi',
    historicalContext:
      "Kjent i den islamske verden som «Den andre læreren» (med Aristoteles som den første). Født i Sentral-Asia ca. 872, levde et asketisk og tilbaketrukket liv i Bagdad og Damaskus kledd i sufi-kappe. Han var en virtuos musiker som fant opp forgjengeren til fiolinen (rebab) og systematiserte arabisk musikkteori og politisk filosofi.",
    majorWorks: [
      {
        title: "Den mønstergyldige statens meninger (Al-Madina al-Fadila)",
        year: 940,
        description: "Politisk filosofi inspirert av Platons Staten, der den ideelle byen styres av en opplyst filosof-profet.",
      },
      {
        title: "Den store boken om musikk (Kitab al-Musiqa al-Kabir)",
        year: 930,
        description: "Verdenshistoriens mest grundige verk om musikkens matematiske proporsjoner og terapeutiske virkning på sjelen.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Den syke byen (Korrupte samfunn)",
        description: "Al-Farabi klassifiserte samfunn som enten «dydige» (søker sann lykke) eller «uvitende» (søker bare makt, rikdom eller sanselig nytelse). Et samfunn som bare jakter på penger kaller han en «by av usselhet».",
        takeaway: "Politikkens egentlige oppgave er ikke bare økonomisk vekst, men å muliggjøre borgernes moralske og intellektuelle fullendelse.",
      },
    ],
    receptionAndCritique:
      "La grunnlaget for hele den islamske rasjonalistiske filosofien (Falsafa) og påvirket Ibn Sina og Maimonides dypt. Kritisert av tradisjonalister for å sette filosofisk fornuft over religiøs åpenbaring.",
  },

  'al-ghazali': {
    philosopherId: 'al-ghazali',
    historicalContext:
      "Professor og rektor ved det prestisjetunge Nizamiyya-universitetet i Bagdad på slutten av 1000-tallet. Midt i suksessen ble han rammet av en dyp åndelig og skeptisk krise: Han mistet evnen til å snakke og undervise, forlot alt sitt gods og sine embeter, og levde i ti år som en fattig, vandrende sufi-mystiker i Damaskus og Jerusalem.",
    majorWorks: [
      {
        title: "Filosofenes sammenbrudd (Tahafut al-Falasifa)",
        year: 1095,
        description: "Ett av historiens skarpeste filosofiske angrep på rasjonalistiske filosofer (som Aristoteles og Ibn Sina) for uholdbare metafysiske påstander.",
      },
      {
        title: "Gjenopplivingen av de religiøse vitenskaper (Ihya Ulum al-Din)",
        year: 1100,
        description: "Monumentalt mesterverk som forente islamsk lov med inderlig sufi-kjærlighet og moralsk selvransakelse.",
      },
      {
        title: "Befrieren fra villfarelsen (Al-Munqidh min al-Dalal)",
        year: 1106,
        description: "En gripende åndelig selvbiografi om tvil, skepsis og erkjennelsens lys i hjertet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Bomullen og ilden (Kausalitetsskepsis)",
        description: "Når du setter en flamme bort til et stykke bomull, ser du bomullen bli svart og brenne. Men beviser det at ilden i seg selv har en iboende kraft til å brenne? Nei, det er Gud som i hvert eneste øyeblikk gjenskaper hendelsen.",
        takeaway: "Naturlover er ikke logisk nødvendige årsakskjeder, men observerte vaner – 700 år før David Hume formulerte samme kritikk.",
      },
    ],
    receptionAndCritique:
      "Kåret til «islams fornyer» (Hujjat al-Islam); reddet sufismen inn i den islamske hovedstrømmen. Kritisert av Ibn Rushd og moderne historikere for å ha svekket den naturvitenskapelige og filosofiske nysgjerrigheten i den arabiske verden.",
  },

  maimonides: {
    philosopherId: 'maimonides',
    historicalContext:
      "Kjent som Rambam (1138–1204), født i Córdoba i Spania. Måtte flykte fra fanatiske almohader gjennom Nord-Afrika til Kairo i Egypt, hvor han ble leder for det jødiske samfunnet og personlig livlege for sultan Saladin. Han behandlet pasienter hele dagen og skrev epokegjørende teologiske og medisinske verker om natten.",
    majorWorks: [
      {
        title: "Veileder for de rådville (Moreh Nevukhim)",
        year: 1190,
        description: "Filosofisk mesterverk som veileder den troende som er forvirret over motsetningen mellom vitenskapelig fornuft og Bibelens ord.",
      },
      {
        title: "Mishneh Torah",
        year: 1180,
        description: "Den første systematiske kodingen av hele jødisk lovverk og etikk i 14 bind.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Negativ teologi (Hva Gud ikke er)",
        description: "Hvis du sier at «Gud er vis» eller «Gud er mektig», bruker du menneskelige ord som krymper Gud til et forstørret menneske. Du kan bare si hva Gud *ikke* er: Gud er ikke materiell, ikke begrenset, ikke dødelig.",
        takeaway: "Den sanne erkjennelse av det guddommelige nås gjennom ydmyk stillhet og opphevelse av menneskelige projeksjoner.",
      },
    ],
    receptionAndCritique:
      "Den største jødiske filosofen i middelalderen («fra Moses til Moses fantes det ingen som Moses»). Dypt beundret av Thomas Aquinas og Spinoza. Kritisert av ortodokse jødiske lærde i samtiden som mente han opphøyde Aristoteles over Toraen og brente bøkene hans.",
  },

  rabia: {
    philosopherId: 'rabia',
    historicalContext:
      "Født som den fjerde datteren (derav navnet Rabia) i en loddrett fattig familie i Basra (i dagens Irak) ca. 714 e.Kr. Ble foreldreløs under hungersnød, kidnappet og solgt som slave. Hennes herre skal ha sett et overnaturlig lys over hodet hennes mens hun ba om natten og ga henne friheten. Hun avslo alle ekteskapstilbud fra mektige menn og levde som en uavhengig asket og læremester.",
    majorWorks: [
      {
        title: "Dikt og bønner om guddommelig kjærlighet",
        year: 780,
        description: "Overleverte poetiske bønner og samtaler som innførte uegennyttig, ren kjærlighet (hubb) i sufismen.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Vannbøtten og fakkelen",
        description: "Rabia ble sett løpende gjennom Basras gater med en bøtte vann i den ene hånden og en brennende fakkel i den andre. Da folk spurte hva hun skulle, svarte hun: «Jeg skal sette fyr på paradis og slukke helvetes flammer, så menneskene elsker Gud for Guds egen skyld, og ikke av frykt for straff eller håp om belønning!»",
        takeaway: "Sann kjærlighet og moralsk godhet må være fullstendig fri for egoistiske baktanker og frykt.",
      },
    ],
    receptionAndCritique:
      "Står som en av historiens mest elskede kvinnelige mystikere; transformerte tidlig asketisk frykt-fromhet til en religion av ren, lidenskapelig kjærlighet. Kritisert av samtidens patriarkalske teologer for å avvise tradisjonelle ekteskapsnormer.",
  },

  rumi: {
    philosopherId: 'rumi',
    historicalContext:
      "Jalal al-Din Rumi (1207–1273), født i Balkh (i dagens Afghanistan). Hans familie flyktet vestover unna Djengis Khans mongolske horder og slo seg ned i Konya (Tyrkia). Rumi var en tradisjonell islamsk teolog inntil han i 1244 møtte den omflakkende dervisjen Shams fra Tabriz. Møtet utløste en enorm åndelig oppvåkning som forvandlet Rumi til en ekstastisk dikterfilosof.",
    majorWorks: [
      {
        title: "Masnavi-ye Manavi (Åndelige vers)",
        year: 1260,
        description: "Et 26 000 vers langt poetisk epos over sufismens mystikk, fabler, kjærlighet og menneskesjelens lengsel.",
      },
      {
        title: "Divan-e Shams-e Tabrizi",
        year: 1250,
        description: "Lidenskapelige kjærlighetsdikt dedikert til vennen Shams og det guddommelige nærvær.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Sivfløytens klage (Ney)",
        description: "Hør på sivfløytens såre melodi: Hvorfor gråter den? Fordi den ble skåret løs fra sivbedet sitt ved elven. Hver tone den synger er en klagesang og en lengsel etter å vende tilbake til kilden den ble revet bort fra.",
        takeaway: "Menneskets eksistensielle uro og lengsel er sjelens rop etter å bli gjenforent med den kosmiske kjærligheten.",
      },
    ],
    receptionAndCritique:
      "Grunnlegger av Mevlevi-ordenen («de dansende dervisjene»). Rumi er i dag en av verdens mest leste poeter på tvers av kulturer og religioner. Kritisert av puritanske bokstavtro teologer for å bruke musikk, dans og vinallegorier i teologi og for å viske ut dogmatiske grenser mellom religioner.",
  },

  leibniz: {
    philosopherId: 'leibniz',
    historicalContext:
      "Gottfried Wilhelm Leibniz (1646–1716), oppvokst i Leipzig. Kanskje verdenshistoriens siste ekte universalgeni: matematiker (oppfant differensial- og integralregningen uavhengig av Newton), diplomat, jurist, historiker og oppfinner av den mekaniske regnemaskinen og det binære tallsystemet (0 og 1) som all moderne datateknologi hviler på.",
    majorWorks: [
      {
        title: "Monadologien",
        year: 1714,
        description: "Klassisk metafysisk verk: Universet består av uendelig mange uutstrakte, åndelige kraftsenter (monader) som samvirker i preetablert harmoni.",
      },
      {
        title: "Teodisé (Essais de Théodicée)",
        year: 1710,
        description: "Det filosofiske forsvaret for Guds godhet i møte med det onde: Vår verden er «den beste av alle mulige verdener».",
      },
    ],
    thoughtExperiments: [
      {
        title: "Leibniz’ mølle (Materialismens grense)",
        description: "Se for deg at du forstørrer hjernen til størrelsen av en vindmølle, slik at du kan gå inn og se alt mekanisk arbeid: tannhjul, støtere og aksler. Ville du noensinne få øye på en *tanke*, en *følelse* eller fargen rød?",
        takeaway: "Subjektiv bevissthet (qualia) kan aldri reduseres til rent mekaniske partikkelbevegelser.",
      },
      {
        title: "Den beste av alle mulige verdener",
        description: "Før skapelsen vurderte Gud uendelig mange mulige verdener. En verden med fri vilje må nødvendigvis innebære muligheten for at mennesker velger feil; en verden uten ondskap ville vært en verden av forhåndsprogrammerte roboter.",
        takeaway: "Vår verden maksimerer det største mulige mangfold og gode under de mest elegante lover.",
      },
    ],
    receptionAndCritique:
      "En gigant innen matematikk, logikk og metafysikk. Hans optimisme ble berømt og nådeløst latterliggjort av Voltaire i satiren Candide (gjennom figuren Dr. Pangloss). Kritisert for at idéen om «preetablert harmoni» (at monader ikke har «vinduer») gjør fysisk kausalitet overflødig.",
  },

  montaigne: {
    philosopherId: 'montaigne',
    historicalContext:
      "Michel de Montaigne (1533–1592), fransk adelsmann og jurist som levde midt under de blodige franske religionskrigene (hugenottkrigene og Bartolomeusnatten). Rystet av religiøs fanatisme og tortur trakk han seg tilbake i sitt tårnværelse på godset i Bordeaux som 38-åring for å undersøke sitt eget sinn og finne ut hva et menneske egentlig kan vite.",
    majorWorks: [
      {
        title: "Essayer (Les Essais)",
        year: 1580,
        description: "Oppfant selve essaysjangeren: En personlig, ærlig og skeptisk utforskning av vennskap, frykt, kannibalisme, seksualitet og døden.",
      },
      {
        title: "Forsvarstale for Raymond Sebond",
        year: 1576,
        description: "Skeptisismens renessanseklassiker: Menneskets fornuft er skrøpelig; «Hva vet jeg?» (Que sais-je?).",
      },
    ],
    thoughtExperiments: [
      {
        title: "Katten og Montaigne (Perspektivets relativitet)",
        description: "«Når jeg leker med katten min, hvem vet da om ikke hun morer seg mer over meg enn jeg gjør over henne?»",
        takeaway: "Menneskets tro på at vi er universets ubestridte herrer skyldes bare at vi mangler evnen til å se oss selv utenfra.",
      },
      {
        title: "Om kannibaler (Kulturrelativisme)",
        description: "Europeere kaller urbefolkningen i Amerika for «barbarer» fordi de spiser sine fiender etter døden. Men er det ikke langt mer barbarisk å torturere levende naboer på bålet for bagatellmessige dogmeuenigheter?",
        takeaway: "Vi kaller alt for barbari som vi ikke er vant til i vårt eget land.",
      },
    ],
    receptionAndCritique:
      "Formet Shakespeares skuespill, Descartes’ metodiske tvil og hele den moderne humanismen. Kritisert av strenge katolske moralister (som Blaise Pascal) for selvopptatthet og for å spre en farlig skepsis som undergraver kirkens autoritet.",
  },

  russell: {
    philosopherId: 'russell',
    historicalContext:
      "Bertrand Russell (1872–1970), britisk aristokrat, matematiker, logiker og nobelprisvinner i litteratur. Han var en brennende pasifist som ble fengslet under første verdenskrig for sine antikrigsskrifter, og deltok i en alder av 89 år i sitt-ned-demonstrasjoner mot atomvåpen. Grunnla den moderne analytiske filosofien sammen med G.E. Moore og Ludwig Wittgenstein.",
    majorWorks: [
      {
        title: "Principia Mathematica (med A.N. Whitehead)",
        year: 1910,
        description: "Monumentalt trebindsverk som forsøkte å bevise at hele matematikken kan utledes fra ren logikk (logisisme).",
      },
      {
        title: "Hvorfor jeg ikke er kristen",
        year: 1927,
        description: "Berømt foredrag og kampskrift for rasjonalisme, vitenskapelig skepsis og sekulær etikk.",
      },
      {
        title: "Vestens filosofi",
        year: 1945,
        description: "Verdens mest leste og underholdende filosofihistoriske verk, skrevet under andre verdenskrig.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Russells tekanne",
        description: "Hvis jeg påstår at det kretser en bitte liten porselenstekanne i bane rundt solen mellom jorden og Mars, kan ingen motbevise meg, for den er for liten til å sees i teleskoper. Betyr det at det er rimelig å tro på den?",
        takeaway: "Bevisbyrden hviler alltid på den som fremsetter en ekstraordinær påstand, ikke på skeptikeren som nekter å tro uten bevis.",
      },
      {
        title: "Barbererparadokset (Russells paradoks)",
        description: "I en landsby finnes det en barberer som barberer alle menn som ikke barberer seg selv, og bare dem. Barberer han seg selv? Hvis ja, skal han ikke; hvis nei, må han.",
        takeaway: "Naiv mengdelære inneholder fundamentale selvmotsigelser og krever streng typeteori.",
      },
    ],
    receptionAndCritique:
      "En av modernitetens største logikere og intellektuelle samvittigheter. Kritisert for at hans logisisme (prosjektet i Principia) ble rystet av Gödels ufullstendighetsteorem i 1931, og av eksistensialister for et overdrevent teknisk syn på språk og virkelighet.",
  },

  hildegard: {
    philosopherId: 'hildegard',
    historicalContext:
      "Hildegard von Bingen (1098–1179), tysk abbedisse, mystiker, lege, komponist og naturforsker i Rhinland under høymiddelalderen. Hun opplevde mektige lysvisjoner fra hun var barn. Hun korresponderte frimodig med paver, keiser Fredrik Barbarossa og Bernhard av Clairvaux, og krevde kirkelige reformer og kvinners åndelige verdighet.",
    majorWorks: [
      {
        title: "Kjenn Herrens veier (Scivias)",
        year: 1151,
        description: "Illustrert mesterverk med 26 visjoner om kosmos, sjelens frelse og skaperverkets orden.",
      },
      {
        title: "Physica (Naturhistorie og urtemedisin)",
        year: 1158,
        description: "Den første vitenskapelige beskrivelsen av planter, urter og helbredende naturkrefter i tysk tradisjon.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Viriditas (Den grønne livskraften)",
        description: "Se for deg den usynlige, saftige kraften som får en tørr kvist til å skyte friske, grønne knopper om våren. Hildegard kalte denne kraften *viriditas* (grønnhet).",
        takeaway: "Guddommelig skaperkraft er ikke fjern og abstrakt, men den pulserende biologiske og moralske vitaliteten i alt levende.",
      },
      {
        title: "Kosmos som et egg",
        description: "Universet er formet som et stort egg: Skallet er stjernehimmelen, hviten er luft og vind, og plommen er den faste jorden i midten omgitt av ild.",
        takeaway: "Mennesket og kosmos er innbyrdes speilbilder (mikrokosmos og makrokosmos) i fullkommen økologisk balanse.",
      },
    ],
    receptionAndCritique:
      "Utnevnt til kirkelærer i 2012; feiret i moderne tid som en pioner for økologisk teologi, kvinnehistorie og tidligmusikk. Kritisert av samtidige konservative munker for å tale offentlig og preke, noe som brøt med Paulus’ forbud mot kvinners røst i forsamlingen.",
  },

  'edith-stein': {
    philosopherId: 'edith-stein',
    historicalContext:
      "Edith Stein (1891–1942), født inn i en jødisk familie i Breslau (nå Wrocław). Hun ble Edmund Husserls stjerneassistent i Göttingen og en ledende stemme i den tidlige fenomenologiske bevegelsen. Etter å ha lest Teresa av Ávilas selvbiografi konverterte hun til katolisismen, ble karmelittnonne (Søster Teresa Benedicta a Cruce), og kjempet for kvinners rett til utdanning og likestilling. I 1942 ble hun arrestert av Gestapo i Nederland og myrdet i Auschwitz.",
    majorWorks: [
      {
        title: "Om innlevelsens problem (Zum Problem der Einfühlung)",
        year: 1917,
        description: "Fenomenologiens klassiker om empati: Hvordan vi oppfatter andres indre opplevelsesverden uten å forveksle den med vår egen.",
      },
      {
        title: "Endelig og evig væren (Endliches und ewiges Sein)",
        year: 1937,
        description: "En genial syntese mellom Husserls moderne fenomenologi og Thomas Aquinas’ middelalderfilosofi.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Sorgens tårer hos en venn (Empatiens vesen)",
        description: "Når du ser en venn gråte av sorg, opplever du sorgen direkte i hennes ansikt, men du forveksler ikke hennes sorg med din egen. Du føler *med* henne, ikke *i* henne.",
        takeaway: "Empati (innlevelse) er en unik erkjennelsesakt som beviser at den andre er et selvstendig, ukrenkelig subjekt, og redder oss fra solipsisme.",
      },
    ],
    receptionAndCritique:
      "Kanonisert som helgen og skytshelgen for Europa; en ledende feministisk intellektuell i mellomkrigstiden. Kritisert i samtiden av mannlige akademiske komiteer som to ganger nektet henne habilitasjon og professorat utelukkende fordi hun var kvinne.",
  },

  'camilla-collett': {
    philosopherId: 'camilla-collett',
    historicalContext:
      "Jacobine Camilla Collett (1813–1895), Henrik Wergelands søster, oppvokst på Eidsvoll prestegård. Opplevde det bitre tapet av sin ungdomskjærlighet Johan Sebastian Welhaven og ble gift med juristen Peter Jonas Collett. Etter ektemannens tidlige død sto hun igjen som eneforsørger for fire sønner, og viet resten av sitt liv til å kjempe for kvinners moralske, emosjonelle og juridiske frigjøring i det pietistiske og embetsmannsstyrte Norge.",
    majorWorks: [
      {
        title: "Amtmandens Døtre",
        year: 1854,
        description: "Norgeshistoriens første realistiske og samfunnskritiske tendensroman: Et knusende oppgjør med fornuftsekteskap som ødelegger kvinnens følelsesliv.",
      },
      {
        title: "Fra de Stummes Leir",
        year: 1877,
        description: "Essaysamling som hudfletter verdenslitteraturen og samfunnet for å ha dømt kvinner til taushet og underdanighet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Kjærlighetens tvangstrøye",
        description: "En kvinne oppdras til at hennes eneste livskall er å bli gift. Hvis hun følger sitt sanne hjerte, kalles hun uansvarlig; hvis hun selger seg inn i et trygt, kjærlighetsløst ekteskap for å overleve økonomisk, kalles det ærverdig.",
        takeaway: "Et samfunn som fratar kvinner økonomisk uavhengighet, tvinger dem inn i en form for legitimert prostitusjon som forkrøpler moralen.",
      },
    ],
    receptionAndCritique:
      "Norges første store feministiske tenker; inspirerte Henrik Ibsen til å skrive Et dukkehjem og banet vei for Kvinnesaksforeningen. Kritisert i samtiden av konservative menn og kirkelige ledere for å så splid i familiens hellige orden og undergrave kvinners gudgitte beskjedenhet.",
  },

  hammarskjold: {
    philosopherId: 'hammarskjold',
    historicalContext:
      "Dag Hammarskjöld (1905–1961), svensk nasjonaløkonom, jurist og FNs andre generalsekretær (1953–1961). Han omdefinerte generalsekretærens rolle fra passiv administrator til uavhengig moralsk mekler i Suezkrisen og under den kalde krigen. Han døde i en mystisk flystyrt i Ndola (Zambia) under et fredsoppdrag under Kongokrisen. Fikk Nobels fredspris posthumt.",
    majorWorks: [
      {
        title: "Veimerker (Vägmärken)",
        year: 1963,
        description: "Utgitt etter hans død; en åndelig og etisk dagbok som avslørte hans dype mystiske livsforankring, inspirert av Mester Eckhart og Johannes av Korset.",
      },
    ],
    thoughtExperiments: [
      {
        title: "FNs meditasjonsrom (Det tomme alteret)",
        description: "Hammarskjöld tegnet FNs meditasjonsrom i New York med et eneste massivt stykke svensk jernmalm i midten, belyst av en enkelt lysstråle ovenfra, helt uten religiøse symboler.",
        takeaway: "I stillheten bak alle ord og nasjonale slagord finnes et felles rom av sannhet, verdighet og tjeneste for menneskeheten.",
      },
    ],
    receptionAndCritique:
      "Står som det internasjonale diplomatiets fremste etiske fyrtårn; USAs president John F. Kennedy kalte ham «århundrets største statsmann». Kritisert under den kalde krigen av Sovjetunionens leder Nikita Khrusjtsjov, som forlangte hans avgang fordi han mente en person aldri kan være genuint nøytral.",
  },

  dogen: {
    philosopherId: 'dogen',
    historicalContext:
      "Dōgen Zenji (1200–1253), født inn i en aristokratisk familie i Kyoto under Kamakura-shogunatets fremvekst i Japan. Etter å ha mistet begge foreldrene som barn ble han munk. Frustrert over korrupsjon i klostrene reiste han til Kina i 1223 for å finne ekte buddhisme. Der oppnådde han opplysning under mester Rujing da han hørte ordene: «Kast av kropp og sinn!» Han vendte tilbake til Japan og grunnla Sōtō Zen-skolen og det avsidesliggende Eihei-ji-tempelet i fjellene.",
    majorWorks: [
      {
        title: "Shōbōgenzō (Den sanne dharmaens øye-skatt)",
        year: 1253,
        description: "Et 95 kapitler langt filosofisk mesterverk om tid, væren, meditasjon og opplysning i hverdagens handlinger.",
      },
      {
        title: "Fukanzazengi (Universelle retningslinjer for zazen)",
        year: 1227,
        description: "Den grunnleggende håndboken i shikantaza («bare sitte» i årvåken tilstedeværelse).",
      },
    ],
    thoughtExperiments: [
      {
        title: "Tid-Væren (Uji)",
        description: "Tid er ikke en abstrakt elv som flyter forbi deg mens du står stille på bredden. Fjellet *er* tid; solen *er* tid; din pust i dette sekundet *er* selve tiden som utfolder seg.",
        takeaway: "Væren og tid er uatskillelige; hvert øyeblikk er hele universets fulle realisering.",
      },
      {
        title: "Å ro en båt",
        description: "Når du ror en båt over vannet, ser du kysten flytte seg bort. Men hvis du fester blikket på båten din, oppdager du at det er båten som beveger seg, ikke kysten.",
        takeaway: "Illusjoner oppstår når vi projiserer vår egen urolige bevegelse over på den uforanderlige naturen.",
      },
    ],
    receptionAndCritique:
      "Regnes som en av Japans dypeste og mest originale tenkere gjennom tidene; Martin Heidegger skal ha uttalt at Dōgens tekster uttrykte nøyaktig hva han selv forsøkte å si i Væren og tid. Kritisert i samtiden av eldre maktklostre i Kyoto som forsøkte å brenne ned hans tempel.",
  },

  kukai: {
    philosopherId: 'kukai',
    historicalContext:
      "Også kjent som Kōbō-Daishi (774–835), født på øya Shikoku. Han studerte ved det keiserlige universitetet i Nara, men forlot studiene for å praktisere askese i fjellene. I 804 reiste han til Kina på et farefullt oppdrag med en keiserlig flåte, lærte sanskrit og esoterisk buddhisme på rekordtid, og returnerte for å grunnlegge Shingon-skolen («Det sanne ord») på det hellige Kōya-fjellet. Han var også en genial kalligraf, dikter og ingeniør som bygget irrigasjonsdammer for bøndene.",
    majorWorks: [
      {
        title: "Å oppnå opplysning i denne kroppen (Sokushin Jōbutsu Gi)",
        year: 817,
        description: "Filosofisk bevis for at mennesket kan realisere buddhanaturen her og nå i sin fysiske kropp, uten utallige gjenfødelser.",
      },
      {
        title: "De ti sinnstilstandene (Jūjūshinron)",
        year: 830,
        description: "Monumentalt verk som systematiserer all menneskelig filosofi og religion fra dyrisk egoisme til kosmisk opplysning.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Kroppen som levende mandala",
        description: "Hele universet er kroppen, talen og sinnet til ur-buddhaen Dainichi Nyorai. De seks elementene (jord, vann, ild, luft, rom og bevissthet) finnes like fullt i en stein og i din egen fingertupp.",
        takeaway: "Den materielle verden er ikke en syndig felle som sjelen skal flykte fra, men selve det hellige nærværet.",
      },
    ],
    receptionAndCritique:
      "Kanskje Japans mest elskede åndelige kulturhelt; den 1200 km lange Shikoku-pilegrimsruten hedrer hans fotspor. Kritisert av reformatorer i Kamakura-perioden for overdrevent fokus på magiske ritualer, hemmelige mantraer og kostbare tempelkunster.",
  },

  zeami: {
    philosopherId: 'zeami',
    historicalContext:
      "Zeami Motokiyo (ca. 1363–1443), japansk dramatiker, skuespiller og estetisk filosof. Han vokste opp som skuespillergutt og vant den unge shogun Ashikaga Yoshimitsus gunst i Kyoto. Sammen med sin far Kan'ami forvandlet han folkelig teater (sarugaku) til den raffinerte Noh-teaterkunsten. Senere i livet mistet han shogunatets gunst og ble forvist til den avsidesliggende øya Sado som 71-åring, hvor han fortsatte å skrive i eksil.",
    majorWorks: [
      {
        title: "Fūshikaden (Læren om blomstens stil)",
        year: 1402,
        description: "Verdenshistoriens eldste og dypeste avhandling om skuespillerkunst, estetikk og sjelens modning gjennom kunst.",
      },
      {
        title: "Kakyo (Speilet for blomsten)",
        year: 1424,
        description: "Videreutvikling av begrepet *yūgen* (dyp, gåtefull skjønnhet) og skuespillerens indre tilstedeværelse.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Den sanne blomsten (Hana)",
        description: "En ung skuespiller har en naturlig sjarm som alle beundrer – men dette er bare en «forbigående blomst» som visner med alderen. Den «sanne blomsten» oppnås først etter tiår med disiplin, når skuespilleren kan bevege et publikum bare ved å sitte helt ubevegelig på scenen.",
        takeaway: "Ekte skjønnhet og mesterskap krever at man overvinner forfengelighet og finner sjelens usynlige kjerne.",
      },
      {
        title: "Yūgen (Skyggenes subtile skjønnhet)",
        description: "Som en hvit svane med en sivbit i nebbet, eller solen som synker bak en tåkete åskam: Skjønnheten ligger i det antydede og tilbakeholdte, ikke i det brautende åpenbare.",
        takeaway: "Den dypeste kunsten avslører ikke alt, men vekker tilskuerens egen kontemplasjon.",
      },
    ],
    receptionAndCritique:
      "Grunnleggeren av klassisk japansk dramaturgi og estetikk; hans hemmelige avhandlinger ble først offentliggjort på 1900-tallet og har fascinert teaterregissører og filosofer verden over. Kritisert i samtiden av makteliter som anså skuespillere som en lav sosial kaste.",
  },

  wonhyo: {
    philosopherId: 'wonhyo',
    historicalContext:
      "Wonhyo (617–686), en av Koreas mest innflytelsesrike buddhistiske tenkere fra Silla-riket. Han forlot klosterets isolasjon, kledde seg som en vanlig legmann, spilte musikk og sang i landsbyene for fattige bønder for å bringe opplysning til folket. Han arbeidet utrettelig for å forene de splittede sektene i koreansk buddhisme.",
    majorWorks: [
      {
        title: "Avhandling om harmoniseringen av de ti doktriner (Simmun Hwajaeng-non)",
        year: 680,
        description: "Hovedverket som etablerer *Hwajeong* (ikke-konflikt og forsoning av motstridende filosofiske skoler).",
      },
      {
        title: "Kommentar til Oppvekkelsen av troen på Mahayana",
        year: 675,
        description: "Klassisk kommentar som forklarer sinnets opprinnelige renhet og hvordan det forurenses av uvitenhet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Vannet fra hodeskallen i mørket",
        description: "På vei til Kina for å studere søkte Wonhyo ly i en mørk hule i et voldsomt regnvær. Tørst i mørket drakk han av en skål med vann og syntes det smakte vidunderlig friskt og søtt. Da han våknet om morgenen, oppdaget han at hulen var en gammel grav, og «skålen» var en råtnende menneskeskalle full av mark.",
        takeaway: "Vannet hadde ikke endret seg; det var sinnets forestilling som gjorde det friskt i mørket og motbydelig i lyset. «Når sinnet oppstår, oppstår mangfoldet av ting; når sinnet stilner, forsvinner graven og skallen.»",
      },
    ],
    receptionAndCritique:
      "Hyllet som Koreas største religiøse geni som forente nasjonen under Silla-dynastiet. Kritisert av konservative klostermunker for sin uortodokse livsstil, inkludert at han brøt sølibatet med en prinsesse og fikk sønnen Seol Chong (en berømt lærd).",
  },

  'john-dewey': {
    philosopherId: 'john-dewey',
    historicalContext:
      "John Dewey (1859–1952), amerikansk filosof, psykolog og pedagog. Han virket ved University of Chicago (hvor han etablerte den berømte Laboratory School) og Columbia University i New York. Han var en ledende offentlig intellektuell som kjempet for kvinners stemmerett, fagforeninger, borgerrettigheter (medgrunnlegger av NAACP) og forsvarte Leo Trotskij mot Stalins skueprosesser i Moskva.",
    majorWorks: [
      {
        title: "Demokrati og utdanning (Democracy and Education)",
        year: 1916,
        description: "Pedagogikkens moderne manifest: Skolen må ikke være pugging av døde fakta, men et levende demokratisk minisamfunn.",
      },
      {
        title: "Erfaring og natur (Experience and Nature)",
        year: 1925,
        description: "Pragmatismens naturfilosofi: Mennesket er en biologisk organisme som kontinuerlig samhandler med sine omgivelser.",
      },
      {
        title: "Kunst som erfaring (Art as Experience)",
        year: 1934,
        description: "Estetisk verk som river kunsten ned fra elitens museumsvegger og forankrer den i hverdagens sansemessige opplevelser.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Learning by doing (Skolen som verksted)",
        description: "Barn lærer ikke om geometri og fysikk ved å sitte passive på rad og rekke og lytte til en lærer; de lærer når de skal bygge en trehytte, lage mat eller løse et praktisk problem sammen.",
        takeaway: "Tenkning er et verktøy for handling og problemløsning (instrumentalisme), ikke passiv tilskuerkontemplasjon.",
      },
    ],
    receptionAndCritique:
      "Revolusjonerte moderne progressiv pedagogikk over hele den vestlige verden. Kritisert av tradisjonalister for å svekke klassisk dannelse og disiplin, og av marxister for overdreven tiltro til at gradvise reformer kan løse kapitalismens strukturelle kriser.",
  },

  'william-james': {
    philosopherId: 'william-james',
    historicalContext:
      "William James (1842–1910), bror til forfatteren Henry James. Oppvokst i en velstående og intellektuelt stimulerende familie i New England. Utdannet lege ved Harvard, men ble rammet av en dyp depresjon og eksistensiell panikk over determinismen: Hadde han overhodet en fri vilje? Han besluttet at hans første frie handling skulle være å *tro* på den frie vilje. Han grunnla den amerikanske psykologien og pragmatismen.",
    majorWorks: [
      {
        title: "Psykologiens prinsipper (The Principles of Psychology)",
        year: 1890,
        description: "Monumentalt banebrytende verk som innførte begrepet «bevissthetsstrøm» (stream of consciousness).",
      },
      {
        title: "Pragmatisme: Et nytt navn for noen gamle tenkemåter",
        year: 1907,
        description: "Definisjonen av pragmatisk sannhet: Idéers sannhet måles i deres «kontantverdi» (cash value) i praktisk livserfaring.",
      },
      {
        title: "Religiøse erfaringer (The Varieties of Religious Experience)",
        year: 1902,
        description: "En empirisk psykologisk undersøkelse av omvendelser, mystikk og troens vitaliserende kraft.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Ekornets tre (Pragmatisk metode)",
        description: "En mann løper rundt en trestamme for å få øye på et ekorn som sitter på baksiden. Ekornet beveger seg like raskt rundt treet slik at det alltid har stammen mellom seg og mannen. Går mannen «rundt» ekornet eller ikke?",
        takeaway: "Uten en praktisk forskjell i erfaringen er filosofiske ordkrangler fullstendig meningsløse.",
      },
      {
        title: "Fjellklatreren over bresprekken (Viljen til å tro)",
        description: "En klatrer må hoppe over en livsfarlig bresprekk for å overleve. Hvis han tviler og krever 100 % bevis for at han vil klare det før han hopper, vil bena nøle og han styrter i avgrunnen. Hvis han velger å tro fullt og fast på sine krefter, gir selve troen ham spensten som redder livet.",
        takeaway: "I moralske og eksistensielle spørsmål er troen en aktiv faktor som er med på å skape det faktumet den håper på.",
      },
    ],
    receptionAndCritique:
      "En av Amerikas mest elskede og leste filosofer. Kritisert av Bertrand Russell og rasjonalister for å forveksle «hva som er nyttig å tro» med «hva som er objektivt sant».",
  },

  peirce: {
    philosopherId: 'peirce',
    historicalContext:
      "Charles Sanders Peirce (1839–1914), sønn av Harvards fremste matematiker. Han var et uregjerlig geni: fysiker, astronom ved US Coast Survey, matematiker og oppfinneren av pragmatismen og den moderne semiotikken (tegnlæren). På grunn av sin vanskelige personlighet og en skilsmisseskandale ble han utstøtt fra akademia og levde sine siste 25 år i lammende fattigdom i en isolert hytte i Milford, Pennsylvania, hvor han skrev tusenvis av upubliserte manuskriptsider holdt i live av pengegaver fra vennen William James.",
    majorWorks: [
      {
        title: "Hvordan gjøre våre idéer klare (How to Make Our Ideas Clear)",
        year: 1878,
        description: "Pragmatismens grunnleggende essay: En idé sin mening er summen av dens tenkelige praktiske virkninger.",
      },
      {
        title: "Tvilens og troens fiksering (The Fixation of Belief)",
        year: 1877,
        description: "Vitenskapsteoretisk analyse av hvordan mennesker kvitter seg med tvilens ubehag og etablerer tro.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Tegnets triade (Ikon, indeks, symbol)",
        description: "Et tegn er ikke bare et ord som peker på en ting; det er en treleddet relasjon: Tegnet (representamen), Tingen (objektet), og Tolkningen i sinnet (interpretanten).",
        takeaway: "Menneskelig tenkning er en uavbrutt kjede av tegnfortolkning (semiose); vi kan aldri hoppe ut av tegnene for å nå en naken virkelighet.",
      },
      {
        title: "Diamantens hardhet",
        description: "Hva mener vi når vi sier at en diamant er «hard»? Vi mener at den vil ripe opp nesten alle andre stoffer og ikke bli ripet opp selv.",
        takeaway: "Virkelighetens egenskaper eksisterer som vaner og lovmessige disposisjoner, ikke som skjulte mystiske substanser.",
      },
    ],
    receptionAndCritique:
      "Anerkjennes i dag som en av de største og mest allsidige tenkerne USA har fostret; forutså moderne datavitenskap, vitenskapsfilosofi og språkvitenskap. Kritisert i samtiden for å være uferdig, fragmentarisk og krevende å lese.",
  },

  emerson: {
    philosopherId: 'emerson',
    historicalContext:
      "Ralph Waldo Emerson (1803–1882), født i Boston inn i en lang rekke unitariske prester. Han sa opp sitt eget prestekall etter sin unge kones tragiske død fordi han ikke lenger kunne forsvare nattverdsritualet. Han ble lederen for transcendentalistene i Concord, Massachusetts, og USAs mest etterspurte offentlige foredragsholder, som kjempet mot slaveriet og inspirerte en ung nasjon til å finne sin egen kulturelle stemme uavhengig av Europa.",
    majorWorks: [
      {
        title: "Naturen (Nature)",
        year: 1836,
        description: "Transcendentalismens manifest: Naturen er ikke en mekanisk ressurs som skal plyndres, men en levende åndelig åpenbaring.",
      },
      {
        title: "Selvtillit (Self-Reliance)",
        year: 1841,
        description: "Verdenslitteraturens skarpeste hyllest til individuell uavhengighet: «Å stole på seg selv er å stole på det guddommelige».",
      },
      {
        title: "Den amerikanske lærde (The American Scholar)",
        year: 1837,
        description: "Kalt USAs «intellektuelle uavhengighetserklæring»: Lærdom må springe ut av handling og levende erfaring, ikke døde bøker.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Det gjennomsiktige øyeeplet (Transparent Eyeball)",
        description: "«Når jeg står på den bare marken med hodet løftet mot den uendelige himmelen, forsvinner all egoisme. Jeg blir et gjennomsiktig øyeeple: Jeg er ingenting; jeg ser alt; den universelle Væren strømmer gjennom meg.»",
        takeaway: "Når vi opphever det snevre egoet, oppdager vi vår dype, mystiske enhet med hele kosmos og naturen.",
      },
    ],
    receptionAndCritique:
      "Formet amerikansk litteratur (Walt Whitman, Herman Melville, Emily Dickinson) og påvirket Friedrich Nietzsche dypt. Kritisert av enkelte samtidige (som Edgar Allan Poe og Nathaniel Hawthorne) for å være for naivt optimistisk og for å overse menneskesinnets mørke og ondskap.",
  },

  thoreau: {
    philosopherId: 'thoreau',
    historicalContext:
      "Henry David Thoreau (1817–1862), Emersons protesjé og venn i Concord, Massachusetts. Han var utdannet ved Harvard, men nektet å gjøre konvensjonell karriere. Den 4. juli 1845 flyttet han ut i skogen ved Walden Pond, hvor han bygget en enkel tømmerhytte for egne hender og bodde i to år og to måneder for å bevise at et menneske kan leve et fritt, meningsfullt liv med et minimum av materielt forbruk.",
    majorWorks: [
      {
        title: "Walden – livet i skogene",
        year: 1854,
        description: "En klassiker innen økologisk filosofi og livskunst: «Jeg gikk ut i skogen fordi jeg ønsket å leve bevisst, bare møte livets essensielle fakta.»",
      },
      {
        title: "Sivil ulydighet (Civil Disobedience)",
        year: 1849,
        description: "Politisk kampskrift forankret i hans natt i fengsel fordi han nektet å betale skatt til en stat som førte angrepskrig mot Mexico og opprettholdt slaveri.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Prisen på en togbillett",
        description: "Thoreau sammenlignet to menn som vil reise 50 kilometer inn til byen: Den ene jobber en hel dag i fabrikken for å tjene penger til togbilletten og tar toget om kvelden. Den andre begynner å gå til fots om morgenen. Hvem har da egentlig reist friest?",
        takeaway: "«Kostnaden for en ting er mengden liv du må bytte bort for å skaffe den.» Vi blir slaver av våre egne eiendeler.",
      },
    ],
    receptionAndCritique:
      "Hans essay om sivil ulydighet ble den direkte inspirasjonen for Mahatma Gandhis kamp for Indias frigjøring og Martin Luther Kings borgerrettighetsbevegelse i USA. Kritisert av kritikere som påpekte at han ofte spiste middag hos moren i helgene, men beundret for sitt kompromissløse moralske mot.",
  },

  'judith-butler': {
    philosopherId: 'judith-butler',
    historicalContext:
      "Judith Butler (født 1956), professor ved University of California, Berkeley. Vokste opp i en jødisk familie i Ohio og var aktiv i LHBT+-bevegelsen og AIDS-aktivismen (ACT UP) på 1980-tallet. De så hvordan aids-epidemien ble møtt med moralsk fordømmelse og hvordan samfunnets rigide kjønnsnormer gjorde visse liv «mindre verdt å sørge over».",
    majorWorks: [
      {
        title: "Kjønnstrøbbel (Gender Trouble)",
        year: 1990,
        description: "Queerteoriens og den tredje feministiske bølgens grunntekst: Kjønn er ikke en biologisk essens, men en handling som kontinuerlig gjentas (performativitet).",
      },
      {
        title: "Sårbare liv (Precarious Life)",
        year: 2004,
        description: "Etisk og politisk analyse etter 11. september: Felles sårbarhet, sorg og voldsmotstand.",
      },
    ],
    thoughtExperiments: [
      {
        title: "«Det er en jente!» (Kjønnets performativitet)",
        description: "Når legen roper «Det er en jente!» i fødestuen, er det ikke bare en medisinsk beskrivelse; det er en performativ talehandling som starter en livslang tildeling av klær, leker, forventninger og kroppsbevegelser som må repeteres hver eneste dag for å fremstå som «naturlig».",
        takeaway: "Kjønnsidentitet er ikke noe du *er* på forhånd; det er noe du *gjør* og gjentar innenfor kulturens tvangstrøye.",
      },
    ],
    receptionAndCritique:
      "En av verdens mest siterte og innflytelsesrike nålevende teoretikere; transformerte sosiologi, litteraturteori og politisk aktivisme. Kritisert av biologiske essensialister og eldre feminister som frykter at oppløsning av kategorien «kvinne» svekker den politiske kvinnekampen, samt for et notorisk vanskelig og ugjennomtrengelig akademisk språk.",
  },

  'angela-davis': {
    philosopherId: 'angela-davis',
    historicalContext:
      "Angela Davis (født 1944), oppvokst i Birmingham, Alabama under de verste raseskillelovene (Jim Crow) i et nabolag kalt «Dynamite Hill» på grunn av Ku Klux Klans bombeangrep. Hun studerte filosofi i Frankrike og Tyskland under Theodor Adorno og Herbert Marcuse. Ble aktiv i Black Panther Party og kommunistpartiet. I 1970 ble hun satt på FBIs liste over «Ten Most Wanted», fengslet i over et år under en global «Free Angela»-kampanje, og frifunnet av en jury i 1972.",
    majorWorks: [
      {
        title: "Kvinner, rase og klasse (Women, Race, & Class)",
        year: 1981,
        description: "Banebrytende forløper til interseksjonalitet: Viser hvordan den hvite middelklassefeminismen sviktet ved å ignorere svarte arbeiderkvinners kamper.",
      },
      {
        title: "Er fengsler avleggs? (Are Prisons Obsolete?)",
        year: 2003,
        description: "Kritikk av det «fengselsindustrielle komplekset» og visjon for restorativ rettferdighet uten masseinnsetting.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Frihetens illusjon bak murene",
        description: "Et samfunn bygger enorme, privatiserte fengsler for å låse bort fattigdom, rasisme og psykiske lidelser. Vi later som om vi har løst sosiale problemer bare ved å gjøre menneskene usynlige bak betongmurer.",
        takeaway: "Ekte rettferdighet krever at vi bygger skoler, boliger og helsetilbud som forebygger nød, i stedet for å profitere på straff.",
      },
    ],
    receptionAndCritique:
      "Et globalt ikon for frigjøringskamp og interseksjonell analyse. Kritisert av konservative politikere i USA for sin historiske tilknytning til Sovjetunionen og for en fengselsavskaffelsesvisjon mange anser som urealistisk.",
  },

  'sor-juana': {
    philosopherId: 'sor-juana',
    historicalContext:
      "Juana Inés de la Cruz (1648–1695), født utenfor ekteskap i kolonitidens Mexico (Ny-Spania). Et vidunderbarn som lærte å lese som treåring og ba om å få kle seg som gutt for å studere ved universitetet i Mexico City. For å unngå ekteskap og få fred til å studere vitenskap, matematikk og filosofi gikk hun i kloster som hieronymitt-nonne. Hun samlet et av Amerikas største biblioteker i cellen sin før kirkens biskoper tvang henne til å selge alle bøkene og vie seg til botsøvelser.",
    majorWorks: [
      {
        title: "Svar til Søster Filotea (Respuesta a Sor Filotea de la Cruz)",
        year: 1691,
        description: "Den nye verdens første store feministiske manifest: Et brennende intellektuelt forsvar for kvinners gudgitte rett til lærdom og vitenskap.",
      },
      {
        title: "Første drøm (Primero Sueño)",
        year: 1692,
        description: "Et kosmisk filosofisk dikt om sjelens nattlige søken etter å fatte universets helhet.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Filosofien i kjøkkenet",
        description: "Da kirken forbød henne å lese filosofibøker, begynte hun å studere vitenskapelige lover under matlaging: Hvorfor stivner et egg i varm olje mens sukker smelter til væske? «Hvis Aristoteles hadde laget mat, ville han skrevet langt mer!»",
        takeaway: "Erkjennelsestrangen kan aldri kveles av forbud; fornuften finner sannhet i de mest hverdagslige erfaringer.",
      },
    ],
    receptionAndCritique:
      "Kalt «Den tiende muse» og Mexicos nasjonalskatt; beundret i hele den spansktalende verden for sin lyriske genialitet og modige motstand mot kirkelig kvinnehat. Kritisert i samtiden av inkvisisjonen for å befatte seg med verdslig vitenskap.",
  },

  fanon: {
    philosopherId: 'fanon',
    historicalContext:
      "Frantz Fanon (1925–1961), født på Martinique i Karibia. Han kjempet for De frie franske styrkene mot nazistene under andre verdenskrig og utdannet seg til psykiater i Frankrike. Som overlege ved et psykiatrisk sykehus i Algerie under frigjøringskrigen mot Frankrike ble han rystet over de mentale traumene fra kolonial tortur. Han sluttet seg til Den algeriske nasjonale frigjøringsfronten (FLN) og ble dens fremste intellektuelle talsmann før han døde av leukemi bare 36 år gammel.",
    majorWorks: [
      {
        title: "Svart hud, hvite masker (Peau noire, masques blancs)",
        year: 1952,
        description: "En psykoanalytisk obduksjon av rasisme: Hvordan den koloniserte tvinges til å internalisere hvit overlegenhet og fremmedgjøres fra sitt eget selv.",
      },
      {
        title: "Jordens fordømte (Les Damnés de la Terre)",
        year: 1961,
        description: "Avkoloniseringens bibel (med forord av Jean-Paul Sartre): Analyse av voldens renselse, nasjonal kultur og den postkoloniale elitens forræderi.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Det hvite blikkets fangenskap",
        description: "En liten fransk gutt på gaten i Paris peker på Fanon og roper til moren sin: «Se, en neger! Mamma, se på negeren, jeg er redd!»",
        takeaway: "Den svarte mannen får ikke lov til å eksistere som et vanlig menneskelig subjekt; han fanges og fastfryses som et fryktet, fremmedgjort objekt i den hvites blikk.",
      },
    ],
    receptionAndCritique:
      "Inspirerte frigjøringsbevegelser i Afrika, Asia og Black Power i USA. Kritisert av liberale pasifister for å forsvare nødvendigheten av revolusjonær motvold mot koloniherrene, men hans analyse av rasisme og traumer regnes i dag som uovertruffen.",
  },

  'achille-mbembe': {
    philosopherId: 'achille-mbembe',
    historicalContext:
      "Achille Mbembe (født 1957 i Kamerun), professor i historie og politisk filosofi ved University of the Witwatersrand i Johannesburg, Sør-Afrika. En av verdens ledende teoretikere innen postkolonialisme og global politikk; tildelt den prestisjetunge Holbergprisen i 2024 for sitt arbeid med rase, suverenitet og planetær framtid.",
    majorWorks: [
      {
        title: "Nekropolitikk (Necropolitics)",
        year: 2019,
        description: "Banebrytende politisk filosofi: Suverenitet handler i dag ikke bare om å styre liv (biopolitikk), men om makten til å diktere hvem som må dø og hvem som får leve.",
      },
      {
        title: "Kritikk av den svarte fornuft (Critique de la raison nègre)",
        year: 2013,
        description: "Historisk og filosofisk analyse av hvordan kapitalismen oppfant «den svarte» som en vare og en ting for profitt.",
      },
      {
        title: "Jordens brutalisering (Brutalisme)",
        year: 2020,
        description: "Analyse av hvordan grenser, overvåking og økologisk ødeleggelse forvandler planeten til en rå utvinningssone.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Dødssoner og dødsverdener",
        description: "Moderne grensemurer, interneringsleirer for flyktninger og okkuperte territorier der mennesker fratas juridiske rettigheter og holdes i en permanent tilstand mellom liv og død.",
        takeaway: "Makt i det 21. århundre utøves gjennom å skape zoner av organisert sårbarhet og langsom død.",
      },
    ],
    receptionAndCritique:
      "En sentral stemme for å forstå vår tids globale kriser, migrasjon og rasisme. Kritisert av enkelte tradisjonelle statsvitere for å være for dystopisk og for å tone ned nasjonalstaters evne til demokratisk inkludering.",
  },

  'anton-wilhelm-amo': {
    philosopherId: 'anton-wilhelm-amo',
    historicalContext:
      "Født ca. 1703 i Axim (i dagens Ghana). Ble som barn brakt til Amsterdam og gitt som «gave» til hertugen av Braunschweig-Wolfenbüttel i Tyskland. Hertugen sørget for at han fikk full universitetsutdannelse ved universitetene i Halle og Wittenberg. Amo ble den første personen med afrikansk opprinnelse som tok en doktorgrad i filosofi i Europa og underviste som professor i Halle og Jena under opplysningstiden. Etter økende rasisme i Tyskland på 1740-tallet valgte han å vende tilbake til sitt fedreland Ghana, hvor han tilbrakte sine siste år.",
    majorWorks: [
      {
        title: "Om sinnets apati (De Humanae Mentis Apatheia)",
        year: 1734,
        description: "En skarp opplysningstids-dissertasjon som korrigerer Descartes’ dualisme: Menneskesinnet kan ikke føle fysisk smerte; all sansning tilhører kroppen.",
      },
      {
        title: "Avhandling om maurernes rettigheter i Europa",
        year: 1729,
        description: "En tapt juridisk avhandling som undersøkte romerrettens syn på afrikaneres frihet og likeverd.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Sinnets urørlighet (Apatheia)",
        description: "Når du stikker fingeren på en torn, er det den fysiske kroppen som skades og registrerer smerteimpulsen; selve den tenkende ånden (mens) forblir immateriell og upåvirket av fysiske kutt.",
        takeaway: "Forvekslingen mellom kropp og ånd skyldes uklar begrepsbruk; sjelen er en ren, aktiv fornuftskraft som aldri lider passivt.",
      },
    ],
    receptionAndCritique:
      "Et historisk bevis mot 1700-tallets gryende vitenskapelige rasisme (David Hume og Kant hevdet feilaktig at afrikanere manglet abstrakt fornuftsevne, uvitende om at Amo allerede underviste tyskere i logikk). Gjenoppdaget som en banebrytende tenker i afrikansk og europeisk opplysningstradisjon.",
  },

  'zara-yaqob': {
    philosopherId: 'zara-yaqob',
    historicalContext:
      "Zera Yacob (1599–1692), etiopisk filosof. Utdannet i tradisjonell koptisk teologi under kong Susenyos, som konverterte til katolisismen under påtrykk fra portugisiske jesuitter. Da kongen krevde at alle borgere skulle konvertere, nektet Yacob å underkaste seg blindt og ble truet på livet. Han flyktet opp i fjellene og levde i to år i en hemmelig grotte ved Takkaze-elven, hvor han viet seg til å granske religionene med fornuftens lys før han skrev sin selvbiografiske avhandling.",
    majorWorks: [
      {
        title: "Undersøkelsen (Hatäta)",
        year: 1667,
        description: "En rasjonalistisk filosofisk traktat skrevet på ge'ez – samtidig med Descartes’ Meditasjoner – som etablerer fornuften som den eneste pålitelige dommer.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Grotten ved Takkaze-elven",
        description: "Alene i mørket i hulen spurte Yacob: Kristne, jøder og muslimer hevder alle at deres bok er den eneste sanne og at de andre lyver. Hvordan kan en rettferdig Skaper dømme folk for å følge foreldrenes tro? Hvis Gud er god, må han ha gitt alle mennesker samme redskap for å finne sannheten: den medfødte fornuften (lebuna).",
        takeaway: "Enhver religiøs lov som strider mot fornuft og skaperverkets orden (f.eks. faste som ødelegger helsen eller sølibat som hindrer liv) er menneskeskapt løgn.",
      },
    ],
    receptionAndCritique:
      "Afrikas fremste opplysningsfilosof; formulerte uavhengig rasjonalistiske prinsipper om toleranse, fornuft og kvinners likeverd lenge før de franske opplysningsfilosofene. Lenge oversett av eurosentriske filosofihistorikere, men i dag hyllet som et bevis på at opplysningstenkning er et universelt menneskelig fenomen.",
  },

  ptahhotep: {
    philosopherId: 'ptahhotep',
    historicalContext:
      "Vesir (førsteminister) under farao Djedkare Isesi i det gamle Egypt under det 5. dynasti (ca. 2400 f.Kr.) under Det gamle riket. Som en aldrende statsmann ønsket han å overlevere sin livsvisdom til sin sønn for å sikre fred, stabilitet og rettferdighet i samfunnet. Hans skrift er en av de aller eldste bevarte filosofiske bøkene i menneskehetens historie.",
    majorWorks: [
      {
        title: "Ptahhoteps maksimer (Instruksjonene til Ptahhotep)",
        year: -2400,
        description: "37 etiske maksimer og leveregler om rettferdighet (Ma'at), ydmykhet, selvkontroll, ekteskapelig kjærlighet og kunsten å lytte.",
      },
    ],
    thoughtExperiments: [
      {
        title: "Kunnskapens kilde hos tjenestejenten",
        description: "«Vær ikke hovmodig over din lærdom; rådspør både den uvitende og den vise. For kunnskapens grenser kan aldri nås, og ingen håndverker mestrer sitt fag fullkomment. Kloke ord kan finnes like ofte hos slavinnen ved kvernen som blant de lærde.»",
        takeaway: "Sann visdom krever radikal ydmykhet og vilje til å lytte oppmerksomt til alle stemmer i samfunnet.",
      },
      {
        title: "Ma'ats evige balanse",
        description: "Løgn og maktmisbruk kan gi kortsiktig vinning, men urettferdighet skaper sprekker i universets orden som til slutt vil ramle sammen over overgriperen.",
        takeaway: "Rettferdighet, balanse og sannhet (Ma'at) er selve kosmos’ grunnstruktur og overlever alle tider.",
      },
    ],
    receptionAndCritique:
      "Grunnsteinen for Afrikas og Egypts eldgamle visdomstradisjon (Sebait). Kritisert av moderne egalitære tenkere for å forsvare det tradisjonelle egyptiske klassesamfunnet, men beundret for sin vektlegging av lytteevne, emosjonell kontroll og godhet overfor underordnede.",
  },

};
