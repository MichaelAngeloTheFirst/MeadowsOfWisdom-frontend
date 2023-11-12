'use client';
import { Button } from '@material-tailwind/react';
import { FormEvent, FormEventHandler } from 'react';
import privateClient from '@/lib/api';
import { getFunFactsUrl } from '@/lib/urls';
import { useFunfactStore } from '@/app/stores/funfactStore';

interface FunFact {
  id: number;
  username: string;
  userId: number;
  factText: string;
  createdAt: string;
  updatedAt: string;
}

export default function InputComponent() {
  const { setFunFact } = useFunfactStore();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log('form data: ', formData);
    try {
      const response = await privateClient.post(getFunFactsUrl(), formData);
      console.log(response.status);
      try {
        const response = await privateClient.get(getFunFactsUrl());
        const factData: FunFact[] = response.data;
        setFunFact(factData);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" border-b-2 border-solid">
      <form onSubmit={handleSubmit}>
        <div className="flex p-1">
          <input
            placeholder="Share your knowledge"
            className="block w-full rounded border border-gray-300 bg-gray-50 text-center  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            name="factText"
          />
        </div>
        <div className="flex justify-center pb-1">
          <Button
            type="submit"
            className="rounded border border-gray-400 bg-white px-2 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
