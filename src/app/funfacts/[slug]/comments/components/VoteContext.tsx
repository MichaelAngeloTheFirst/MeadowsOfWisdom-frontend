import React, { use, useCallback, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import privateClient from "@/lib/api";
import {getCommentsUrl} from "@/lib/urls";

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


type VoteContextProps = {
  CommentArray: NestedComment[];
  setCommentArray: Dispatch<SetStateAction<NestedComment[]>>;
  fetchData: (id : number) => Promise<void>;
};

const VoteContext = React.createContext<VoteContextProps | null>(null);


export default function VoteProvider({
  comment: initialCommentArray,
  children,
  factId,
}: {
  
  comment: NestedComment[];
  children: React.ReactNode;
  factId: number;
}) {
  const [CommentArray, setCommentArray] = React.useState<NestedComment[]>(initialCommentArray);
  const fetchData = useCallback(async (id :number) => {
    const response = await  privateClient.get(getCommentsUrl(id));
    const NestedComment = nest(response.data);
    console.log(NestedComment);
    setCommentArray(NestedComment);
  }, [])

  useEffect(() => {
    fetchData(factId);
    console.log("useEffect loooop",factId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <VoteContext.Provider value={{  CommentArray, setCommentArray, fetchData}}>
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
