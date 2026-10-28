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
};
