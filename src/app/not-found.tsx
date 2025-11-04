import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-semibold">Page introuvable</h1>
        <p className="text-slate-300">
          Le contenu recherché n’existe plus ou a été déplacé. Revenez à l’accueil pour explorer SerenaCare AI Phase 1.
        </p>
        <Button asChild intent="secondary" className="gap-2">
          <Link href="/">
            <ArrowLeft size={18} />
            Retour à l’accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}
