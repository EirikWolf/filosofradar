import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 animate-fadeIn text-star-white px-2 sm:px-4 py-4">
      {/* Topp-seksjon */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs uppercase tracking-widest font-serif mb-3">
          ✦ Observatoriet // Om prosjektet
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
          Filosofiens Historie som et Levende Stjernekart
        </h2>
        <p className="text-star-dim text-sm sm:text-base mt-2 max-w-2xl mx-auto font-sans leading-relaxed">
          Filosofradaren er et utforskende prosjekt for å gjøre 2500+ år med menneskelig visdom visuell, levende og tilgjengelig.
        </p>
      </div>

      {/* Rutenett med hovedtemaer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metodikk og temaprofiler */}
        <div className="p-6 rounded-2xl bg-cosmos-card/90 border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕸️</span>
            <h3 className="font-serif font-bold text-lg text-white">
              Metodikk: Temaprofilene
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Hver filosof er vurdert langs <strong>8 tematiske akser</strong> (skala 0 til 5): Etikk, Metafysikk, Erkjennelse, Samfunn og politikk, Logikk og språk, Sinn og bevissthet, Mening og det hellige, samt Kunst og skjønnhet.
          </p>
          <div className="p-3 rounded-lg bg-gold/5 border border-gold/20 text-xs text-gold-light italic">
            ⚖️ <strong>Viktig merknad om skjønn:</strong> Ingen filosof lar seg fange i et enkelt tall. Temaskårene er redaksjonelle og pedagogiske vurderinger basert på filosofenes sentrale verk, for å gjøre det mulig å sammenligne tenkere på tvers av epoker og kulturer.
          </div>
        </div>

        {/* Globalt perspektiv og mangfold */}
        <div className="p-6 rounded-2xl bg-cosmos-card/90 border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            <h3 className="font-serif font-bold text-lg text-white">
              Global idéhistorie
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Menneskets dypeste spørsmål har aldri tilhørt én enkelt verdensdel. Radaren dekker <strong>9 tradisjoner</strong>:
          </p>
          <ul className="text-xs text-star-dim grid grid-cols-2 gap-1.5 list-disc list-inside">
            <li>Kinesisk filosofi</li>
            <li>Japansk og koreansk</li>
            <li>Indisk filosofi</li>
            <li>Gresk-romersk antikk</li>
            <li>Islamsk-jødisk tradisjon</li>
            <li>Europeisk tenkning</li>
            <li>Nordisk filosofi</li>
            <li>Amerikansk filosofi</li>
            <li>Afrikansk filosofi</li>
          </ul>
          <p className="text-xs text-pink-300 mt-1">
            ✦ Vi har bevisst løftet frem <strong>kvinnelige tenkere</strong> som historisk har blitt utelatt fra standardverkene.
          </p>
        </div>

        {/* Kilder og faglig forankring */}
        <div className="p-6 rounded-2xl bg-cosmos-card/90 border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <h3 className="font-serif font-bold text-lg text-white">
              Kilder og fakta
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Innholdet i hvert filosofkort bygger på ledende filosofiske oppslagsverk:
          </p>
          <ul className="text-xs text-star-dim space-y-1 list-disc list-inside">
            <li><strong className="text-white">Stanford Encyclopedia of Philosophy (SEP)</strong> – Gullstandarden innen akademisk filosofi</li>
            <li><strong className="text-white">Store norske leksikon (SNL)</strong> – Norsk fagformidling av høy kvalitet</li>
            <li><strong className="text-white">Wikidata</strong> – Åpne, strukturerte data for fødselsår, dødsår og ID-er</li>
            <li><strong className="text-white">Internasjonale primærkilder</strong> – For historiske sitater i norsk språkdrakt</li>
          </ul>
        </div>

        {/* Personvern og åpen kildekode */}
        <div className="p-6 rounded-2xl bg-cosmos-card/90 border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <h3 className="font-serif font-bold text-lg text-white">
              100% Privat & Lokalt
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Filosofradaren er bygget med et kompromissløst personvernfokus:
          </p>
          <ul className="text-xs text-star-dim space-y-1 list-disc list-inside">
            <li>Ingen brukerkonto eller innlogging nødvendig</li>
            <li>Ingen sporingspiksler, analyseverktøy eller informasjonskapsler (cookies)</li>
            <li>Quizen og bildet ditt genereres 100% lokalt i din egen nettleser via HTML5 Canvas</li>
            <li>Portretter er hentet fra Wikimedia Commons under Public Domain eller Creative Commons-lisenser</li>
          </ul>
        </div>
      </div>

      {/* Skaperne bak */}
      <div className="p-6 rounded-2xl bg-cosmos-card/70 border border-gold/30 text-center max-w-xl mx-auto flex flex-col items-center gap-2">
        <span className="text-xs font-serif uppercase tracking-widest text-gold">
          Bygget med kjærlighet for nysgjerrighet og undring
        </span>
        <p className="text-xs text-star-dim mt-1">
          Oslo, 2026 · Bygget med React 19, TypeScript, Tailwind CSS og Vite.
        </p>
      </div>
    </div>
  );
};
