import Button from '@material-tailwind/react/components/Button';
import { MdCancel } from 'react-icons/md';
import { useVoteContext } from './VoteContext';
import { getCommentUrl } from '@/lib/urls';
import privateClient from '@/lib/api';

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

export default function DeleteCommentButton({
  factId,
  comment,
  index,
}: {
  factId: number;
  comment: NestedComment;
  index: number;
}) {
  const { CommentArray, setCommentArray, fetchData } = useVoteContext();

  const handlePress = async () => {
    try {
      const response = await privateClient.delete(getCommentUrl(factId, comment.id));
      console.log(response);
      const arrayCopy = [...CommentArray];
      arrayCopy.splice(index, 1);
      setCommentArray(arrayCopy);
      fetchData(factId);
    } catch (error) {
      console.log(error);
    }
  };

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
