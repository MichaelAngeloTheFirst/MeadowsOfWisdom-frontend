import privateClient from '@/lib/api';
import { useEffect, useState, useCallback } from 'react';
import { getCommentsUrl } from '@/lib/urls';
import { CardComponent } from './CardComponent';
import InputComponent from './InputComponent';
import Provider from './VoteContext';

interface Comment {
  id: number;
  parentId: number;
  username: string;
  commentText: string;
  countVotes: number;
  userReaction: string | null;
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
      console.log(response.data);
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
      <div className="align-center relative flex flex-grow flex-col overflow-scroll overflow-x-hidden p-2">
        {nestedComments.map((comment, i) => (
          <Provider key={comment.id} comment={nestedComments}>
            <CardComponent index={i} fact_id={fact_id} afterSubmit={fetchData} />
          </Provider>
        ))}
      </div>
    </div>
  );
}
