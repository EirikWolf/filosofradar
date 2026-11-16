import React, { useState } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import { FactCheckView } from '../factcheck/FactCheckView';

interface AboutViewProps {
  philosophers?: Philosopher[];
  onOpenCard?: (id: string) => void;
  defaultTab?: 'about' | 'factcheck';
}

export const AboutView: React.FC<AboutViewProps> = ({
  philosophers,
  onOpenCard,
  defaultTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'factcheck'>(defaultTab);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6 animate-fadeIn text-star-white px-2 sm:px-4 py-4">
      {/* Topp-seksjon */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs uppercase tracking-widest font-serif mb-3">
          ✦ Observatoriet // Informasjon & Kilder
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
          Filosofiens Historie som et Levende Stjernekart
        </h2>
        <p className="text-star-dim text-sm sm:text-base mt-2 max-w-2xl mx-auto font-sans leading-relaxed">
          Filosofradaren er et utforskende læringsunivers for å gjøre over 2500 år med idéhistorie
          visuell, engasjerende og tilgjengelig.
        </p>

        {/* Tab-velger mellom Om og Faktasjekk */}
        {philosophers && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all ${
                activeTab === 'about'
                  ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.4)]'
                  : 'bg-cosmos-card/80 border border-white/10 text-star-dim hover:text-white'
              }`}
            >
              ✦ Om observatoriet & metoden
            </button>
            <button
              onClick={() => setActiveTab('factcheck')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'factcheck'
                  ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.4)]'
                  : 'bg-cosmos-card/80 border border-white/10 text-star-dim hover:text-white'
              }`}
            >
              <span>🛡️</span> Kildestatus & Faktasjekk ({philosophers.length})
            </button>
          </div>
        )}
      </div>

      {activeTab === 'factcheck' && philosophers ? (
        <div className="mt-2">
          <FactCheckView philosophers={philosophers} onOpenCard={onOpenCard || (() => {})} />
        </div>
      ) : (
        <>
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

            {/* Kilder og lisenser */}
            <div className="p-6 rounded-2xl bg-cosmos-card/90 border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <h3 className="font-serif font-bold text-lg text-white">
                  Kilder og sitater
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Alle årstall og biografiske data er kontrollert mot <em>Wikidata</em> og anerkjente oppslagsverk som <em>Stanford Encyclopedia of Philosophy (SEP)</em> og <em>Store norske leksikon</em>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Sitater er nøye kildebelagt med primærverk. Der et sikkert sitat ikke foreligger på norsk, gjengis kjerneideen med redaksjonens egne ord.
              </p>
            </div>

            {/* Universell utforming og teknologi */}
            <div className="p-6 rounded-2xl bg-cosmos-card/90 border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">♿</span>
                <h3 className="font-serif font-bold text-lg text-white">
                  Tilgjengelighetserklæring (WCAG 2.1 AA)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Filosofradaren følger kravene til universell utforming av nettløsninger (WCAG 2.1 nivå AA):
              </p>
              <ul className="text-xs text-star-dim list-disc list-inside space-y-1.5">
                <li>
                  <strong className="text-slate-200">Tekstlig likeverdighet (WCAG 1.1.1):</strong> Det visuelle stjernekartet har fullverdige, skjermleservennlige tekstalternativer i <span className="text-gold font-mono">Filosofliste</span> og <span className="text-gold font-mono">Tidslinje</span>.
                </li>
                <li>
                  <strong className="text-slate-200">Tastaturnavigasjon:</strong> Full fokusstyring med fokustrap og Escape-lukking i dialoger, samt piltaststøtte i søk og quizer.
                </li>
                <li>
                  <strong className="text-slate-200">Sansing og bevegelse:</strong> Respekterer brukerens systeminnstilling for redusert bevegelse (<code>prefers-reduced-motion</code>). Kontraster er revidert mot WCAG AA.
                </li>
              </ul>
              <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-serif text-gold">
                  <span>🛡️</span> <strong>Personvernerklæring (100 % cookie-fri)</strong>
                </div>
                <p className="text-xs text-star-dim leading-relaxed">
                  Løsningen bruker ingen informasjonskapsler (cookies) og har ingen innlogging. Besøk telles med den åpne tjenesten <em>GoatCounter</em>, som bare lagrer samlet statistikk (side, henviser, nettleser, skjermstørrelse og land). IP-adressen lagres ikke. Svarene dine i quizen sendes ikke noe sted.
                </p>
              </div>
            </div>
          </div>

          {/* Skaperne bak */}
          <div className="p-6 rounded-2xl bg-cosmos-card/70 border border-gold/30 text-center max-w-xl mx-auto flex flex-col items-center gap-2">
            <span className="text-xs font-serif uppercase tracking-widest text-gold">
              Bygget med kjærlighet for nysgjerrighet og undring
            </span>
            <p className="text-xs text-star-dim mt-1">
              Molde, 2026 · Bygget med React 19, TypeScript, Tailwind CSS og Vite.
            </p>
            <div className="mt-2 text-xs flex items-center justify-center gap-1.5 flex-wrap">
              <span className="text-star-dim">Kontakt & tilbakemeldinger:</span>
              <a
                href="mailto:selvgaaende+filosofradar@gmail.com?subject=Henvendelse%20fra%20Filosofradaren"
                className="text-gold hover:text-gold-bright hover:underline font-mono font-medium inline-flex items-center gap-1"
                title="Send e-post til Filosofradaren (merket automatisk i emne og adresse)"
              >
                <span>✉️</span> selvgaaende+filosofradar@gmail.com
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
