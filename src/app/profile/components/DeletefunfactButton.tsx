import { Button } from '@material-tailwind/react';
import { MdCancel } from 'react-icons/md';
import privateClient from '@/lib/api';
import { getFunFactUrl } from '@/lib/urls';
import { useFunfactStore } from '@/app/stores/funfactStore';

interface FunFact {
  id: number;
  username: string;
  factText: string;
  createdAt: string;
  updatedAt: string;
}

export default function DeletefunfactButton({
  funfact,
  index,
}: {
  funfact: FunFact;
  index: number;
}) {
  const { funfactArray, setFunFact } = useFunfactStore();
  function handlePress(): void {
    try {
      const response = privateClient.delete(getFunFactUrl(funfact.id));
      const arrayCopy = [...funfactArray!];
      arrayCopy.splice(index, 1);
      setFunFact(arrayCopy);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute -left-2 -top-2">
      <Button
        className="flex justify-center rounded-full bg-white p-1 text-red-500 "
        onClick={handlePress}
      >
        <MdCancel size={15} />
      </Button>
    </div>
  );
}
