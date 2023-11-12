import { getFunFactsUrl } from '@/lib/urls';
import { useFunfactStore } from '@/app/stores/funfactStore';
import { useEffect } from 'react';
import axios from 'axios';

export default function FunFactGlobal({ children }: { children: React.ReactNode }) {
  const { setFunFact } = useFunfactStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(getFunFactsUrl());
        setFunFact(response.data);
        console.log('useEffect in FunFactGlobal.tsx');
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setFunFact]);

  return <>{children}</>;
}
