import { useFunfactStore } from '@/app/stores/funfactStore';
import { useEffect } from 'react';

export default function FunFactGlobal({ children }: { children: React.ReactNode }) {
  const { fetchFunFacts } = useFunfactStore();

  useEffect(() => {
    fetchFunFacts();
  }, [fetchFunFacts]);

  return <>{children}</>;
}
