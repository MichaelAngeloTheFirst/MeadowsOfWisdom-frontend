import privateClient from '@/lib/api';
import { useEffect, useCallback } from 'react';
import { getCommentsUrl } from '@/lib/urls';
import { CardComponent } from './CardComponent';
import InputComponent from './InputComponent';
import { useAuthStore } from '@/app/stores/authStore';
import useStore from '@/app/stores/useStore';
import { useVoteContext } from './VoteContext';

interface Comment {
  id: number;
  parentId: number;
  username: string;
  userId: number;
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

function parseJwt(token: string | undefined) {
  if (!token) {
    return;
  }

  const base64Url = token.split('.')[1];

  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export function TestComp({ fact_id }: { fact_id: number }) {
  const { CommentArray, setCommentArray } = useVoteContext();
  const { refreshToken } = useStore(useAuthStore, (state) => state) ?? {
    refreshToken: undefined,
  };

  function currentUserID() {
    const data = parseJwt(refreshToken);
    console.log(data);
    return data;
  }

  const uid = currentUserID() ? currentUserID()['user_id'] : -1;
  console.log(uid);

  const fetchData = useCallback(async () => {
    try {
      const response = await privateClient.get<Comment[]>(getCommentsUrl(fact_id || 0));
      console.log(response.status);
      console.log(response.data);
      const nestedComments = nest(response.data);
      setCommentArray(nestedComments);
    } catch (error) {
      console.error(error);
    }
  }, [fact_id, setCommentArray]);

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
        {CommentArray.map((comment, i) => (
          <CardComponent
            key={comment.id}
            comment={comment}
            index={i}
            fact_id={fact_id}
            afterSubmit={fetchData}
            userId={uid}
          />
        ))}
      </div>
    </div>
  );
}
