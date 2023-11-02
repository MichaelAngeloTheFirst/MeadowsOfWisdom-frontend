import Button from '@material-tailwind/react/components/Button';
import { FormEvent, FormEventHandler, useState } from 'react';
import privateClient from '@/lib/api';
import { getCommentsUrl } from '@/lib/urls';
import { after } from 'node:test';
import { LiaCommentDots } from 'react-icons/lia';

export default function InputComponent({
  replayInfo = false,
  fact_id,
  parent_id = 0,
  afterSubmit,
}: {
  replayInfo: boolean;
  fact_id: number;
  parent_id?: number;
  afterSubmit?: VoidFunction;
}) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    formData.append('parent_id', parent_id.toString() || '0');
    try {
      const response = await privateClient.post(getCommentsUrl(fact_id), formData);
      afterSubmit?.();
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-l-2 border-solid border-gray-700 ">
      {replayInfo && (
        <div className="">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mr-1 mt-1 flex items-center">
              <LiaCommentDots size={20} color="grey" />
              <input
                className="block w-full rounded border border-gray-300 bg-gray-50  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Share your thoughts"
                name="comment_text"
              />
            </div>
            <div className="my-1  flex justify-center">
              <Button
                className="rounded border border-gray-400 bg-white px-2 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
                type="submit"
              >
                Comment
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
