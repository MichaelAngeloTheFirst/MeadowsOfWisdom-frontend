import privateClient from '@/lib/api';
import { useEffect, useState, useCallback } from 'react';
import { getCommentsUrl } from '@/lib/urls';
import { CardComponent } from './CardComponent';
import InputComponent from './InputComponent';

interface Comment {
  id: number;
  parentId: number;
  username: string;
  commentText: string;
  upvote: number;
  downvote: number;
  createdAt: string;
  updatedAt: string;
}

interface NestedComment extends Comment {
  children: NestedComment[];
}

const nest = (items: Comment[], id: number | null = null): NestedComment[] =>
  items
    .filter((item) => item.parentId === id)
    .map((item) => ({ ...item, children: nest(items, item.id) }));

export function TestComp({ fact_id }: { fact_id: number }) {
  const [nestedComments, setComments] = useState<NestedComment[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await privateClient.get<Comment[]>(getCommentsUrl(fact_id || 0));
      console.log(response.status);
      const nestedComments = nest(response.data);
      setComments(nestedComments);
    } catch (error) {
      console.error(error);
    }
  }, [fact_id]);

  useEffect(() => {
    let active = true;

    async function run() {
      await Promise.resolve();
      if (!active) {
        return;
      }
      await fetchData();
    }

    run();

    return () => {
      active = false;
    };
  }, [fetchData]);

  return (
    <div className="flex w-1/2 flex-col justify-center">
      <div className="mt-3  border-b-2 border-r-2 border-t-2 border-solid border-gray-700 bg-white ">
        <InputComponent replayInfo={true} fact_id={fact_id} afterSubmit={fetchData} />
      </div>
      {nestedComments.map((comment) => (
        <div key={comment.id} className="flex  flex-col justify-center p-2">
          <CardComponent comment={comment} fact_id={fact_id} afterSubmit={fetchData} />
        </div>
      ))}
    </div>
  );
}
