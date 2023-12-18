
import { use, useCallback, useEffect } from 'react';
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

export function TestComp({ factId}: { factId: number }) {
  const { CommentArray, setCommentArray,  fetchData } = useVoteContext();
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

  return (
    <div className="flex w-1/2 flex-col justify-center">
      <div className="mt-3  border-b-2 border-r-2 border-t-2 border-solid border-gray-700 bg-white ">
        <InputComponent replayInfo={true} factId={factId} />
      </div>
      <div className="align-center relative flex flex-grow flex-col overflow-scroll overflow-x-hidden p-2">
        {CommentArray.map((comment, i) => (
          <CardComponent
            key={comment.id}
            index={i}
            factId={factId}
            userId={uid}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
}
