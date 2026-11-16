import { z } from 'zod';
import { QuoteSchema } from './philosopher';

/**
 * Register over all tekst i «…» (minst tre ord) i dypdykk, Ex.phil, dilemmaer
 * og turer. Hver tekst skal stå i nøyaktig én liste:
 * - sourced: ekte sitat med verk og kilde (samme krav som sitater i content/).
 * - notQuotes: begreper, titler, eksempelsetninger og tenkte replikker.
 * - unsourced: ekte sitat uten kilde ennå. Listen skal bare krympe.
 */
export const QuoteRegisterSchema = z
  .object({
    sourced: z.array(QuoteSchema),
    notQuotes: z.array(
      z.object({
        text: z.string().min(1),
        reason: z.string().min(1),
      }),
    ),
    unsourced: z.array(
      z.object({
        text: z.string().min(1),
        note: z.string().optional(),
      }),
    ),
  })
  .strict();

export type QuoteRegister = z.infer<typeof QuoteRegisterSchema>;
