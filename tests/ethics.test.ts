import { describe, it, expect } from 'vitest';
import {
  ETHICAL_DILEMMAS,
  ETHICAL_SCHOOL_META,
  calculateEthicsProfile,
} from '../src/features/ethics/dilemmaData';
import type { EthicalSchool } from '../src/features/ethics/types';

describe('Interaktiv Etikk-Lab: Dilemmaer og Moralkompass', () => {
  it('har definert alle 5 etiske skoler med metadata', () => {
    const schools: EthicalSchool[] = [
      'consequentialism',
      'deontology',
      'virtue',
      'care',
      'existentialism',
    ];

    schools.forEach((s) => {
      expect(ETHICAL_SCHOOL_META[s]).toBeDefined();
      expect(ETHICAL_SCHOOL_META[s].nameNor.length).toBeGreaterThan(3);
      expect(ETHICAL_SCHOOL_META[s].color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(ETHICAL_SCHOOL_META[s].icon.length).toBeGreaterThan(0);
    });
  });

  it('har minst 6 innholdsrike og pensumrelevante dilemmaer', () => {
    expect(ETHICAL_DILEMMAS.length).toBeGreaterThanOrEqual(6);

    ETHICAL_DILEMMAS.forEach((d) => {
      expect(d.id).toBeDefined();
      expect(d.title.length).toBeGreaterThan(5);
      expect(d.scenario.length).toBeGreaterThan(20);
      expect(d.options.length).toBeGreaterThanOrEqual(2);
      expect(d.examContext.length).toBeGreaterThan(10);
      expect(d.stakeholders.length).toBeGreaterThan(0);

      d.options.forEach((opt) => {
        expect(opt.id).toBeDefined();
        expect(opt.title.length).toBeGreaterThan(3);
        expect(opt.actionText.length).toBeGreaterThan(5);
        expect(opt.reactions.length).toBeGreaterThan(0);

        opt.reactions.forEach((r) => {
          expect(r.philosopherName.length).toBeGreaterThan(2);
          expect(['agree', 'disagree', 'nuance']).toContain(r.stance);
          expect(r.verdict.length).toBeGreaterThan(2);
          expect(r.comment.length).toBeGreaterThan(15);
          expect(r.exphilConcept.length).toBeGreaterThan(2);
        });
      });
    });
  });

  it('beregner etisk profil og identifiserer Mill som tvilling ved ren konsekvensetikk', () => {
    const choices = {
      sporvognen: 'sporvogn-trekk',
      gangbroen: 'gangbro-dytt',
      transplantasjon: 'kirurg-ofre',
      'selvkjorende-bil': 'bil-sving-vegg',
    };

    const profile = calculateEthicsProfile(choices);

    expect(profile.totalDecisions).toBe(4);
    expect(profile.dominantSchool).toBe('consequentialism');
    expect(profile.philosopherTwinId).toBe('mill');
    expect(profile.philosopherTwinName).toBe('John Stuart Mill');
  });

  it('beregner etisk profil og identifiserer Kant som tvilling ved ren pliktetikk', () => {
    const choices = {
      sporvognen: 'sporvogn-la-ga',
      gangbroen: 'gangbro-la-vaere',
      morderen: 'morderen-sannhet',
      transplantasjon: 'kirurg-nekt',
      'selvkjorende-bil': 'bil-beskytt-passasjer',
    };

    const profile = calculateEthicsProfile(choices);

    expect(profile.totalDecisions).toBe(5);
    expect(profile.dominantSchool).toBe('deontology');
    expect(profile.philosopherTwinId).toBe('kant');
    expect(profile.philosopherTwinName).toBe('Immanuel Kant');
  });

  it('håndterer tomme valg uten krasj', () => {
    const profile = calculateEthicsProfile({});
    expect(profile.totalDecisions).toBe(0);
    expect(profile.scores.consequentialism).toBe(0);
    expect(profile.philosopherTwinName).toBeDefined();
  });
});
