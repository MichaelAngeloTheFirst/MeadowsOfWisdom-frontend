import React from 'react';

interface FunFact {
  id: number;
  username: string;
  factText: string;
  createdAt: string;
  updatedAt: string;
}

type FunFactContextProps = {
  FunFactArray: FunFact[];
  setFunFactArray: React.Dispatch<React.SetStateAction<FunFact[]>>;
};

const FunFactContext = React.createContext<FunFactContextProps | null>(null);

export default function FunFactProvider({
  funfact: initialFunFactArray,
  children,
}: {
  children: React.ReactNode;
  funfact: FunFact[];
}) {
  const [FunFactArray, setFunFactArray] = React.useState<FunFact[]>(initialFunFactArray);
  console.log(FunFactArray);

  return (
    <FunFactContext.Provider
      value={{ FunFactArray: FunFactArray, setFunFactArray: setFunFactArray }}
    >
      {children}
    </FunFactContext.Provider>
  );
}

export function useFunFactContext() {
  const context = React.useContext(FunFactContext);
  if (!context) {
    throw new Error('useFunFact must be used within a FunFactProvider');
  }
  return context;
}
