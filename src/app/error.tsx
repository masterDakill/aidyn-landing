'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/ui/Button';
import { logger } from '@/lib/logger';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  logger.error('Next.js app router global error boundary triggered.', error);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
            <AlertTriangle className="text-red-300" />
          </div>
          <h1 className="text-2xl font-semibold">Une erreur inattendue est survenue.</h1>
          <p className="text-sm text-slate-200/80">
            L’équipe SerenaCare AI a été alertée. Vous pouvez tenter de recharger la page ou revenir à l’accueil.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={reset} className="gap-2">
              <RefreshCw size={16} />
              Réessayer
            </Button>
            <Button asChild intent="secondary" className="gap-2">
              <Link href="/">
                Retour à l’accueil
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
