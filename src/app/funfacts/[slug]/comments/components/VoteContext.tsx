import React, { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

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

type VoteContextProps = {
  CommentArray: NestedComment[];
  setCommentArray: Dispatch<SetStateAction<NestedComment[]>>;
};

const VoteContext = React.createContext<VoteContextProps | null>(null);

export default function VoteProvider({
  comment: initialCommentArray,
  children,
}: {
  children: React.ReactNode;
  comment: NestedComment[];
}) {
  const [CommentArray, setCommentArray] = React.useState<NestedComment[]>(initialCommentArray);

  return (
    <VoteContext.Provider value={{ CommentArray: CommentArray, setCommentArray: setCommentArray }}>
      {children}
    </VoteContext.Provider>
  );
}

export function useVoteContext() {
  const context = React.useContext(VoteContext);
  if (!context) {
    throw new Error('useVote must be used within a VoteProvider');
  }
  return context;
}
