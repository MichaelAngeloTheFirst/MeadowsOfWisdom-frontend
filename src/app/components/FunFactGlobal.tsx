import { getFunFactsUrl } from '@/lib/urls';
import { useFunfactStore } from '@/app/stores/funfactStore';
import { useEffect } from 'react';
import axios from 'axios';
import privateClient from '@/lib/api';

export default function FunFactGlobal({ children }: { children: React.ReactNode }) {
  const { fetchFunFacts } = useFunfactStore();

  useEffect(() => {
     fetchFunFacts(); 
  }, [fetchFunFacts]);

  return <>{children}</>;
}
