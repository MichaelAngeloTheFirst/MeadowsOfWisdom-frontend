import Button from '@material-tailwind/react/components/Button';
import { IconType } from 'react-icons';
import privateClient from '@/lib/api';
import { getCommentVotesUrl } from '@/lib/urls';
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

export default function ToggleButton({
  Icon,
  comment,
  reactionValue,
  factId,
}: {
  Icon: IconType;
  comment: NestedComment;
  reactionValue: string;
  factId: number;
}) {
  const { fetchData } = useVoteContext();
  const handlePress = async () => {
    try {
      if (!comment.userReaction) {
        const response = await privateClient.post(getCommentVotesUrl(comment.id, reactionValue));
        fetchData(factId);
        console.log(response.status);
      } else {
        if (comment.userReaction === reactionValue) {
          const response = await privateClient.delete(
            getCommentVotesUrl(comment.id, reactionValue),
          );

          fetchData(factId);
          console.log(response.status);
        } else {
          const response = await privateClient.patch(getCommentVotesUrl(comment.id, reactionValue));

          fetchData(factId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button ripple={true} className="flex justify-center p-1 " onClick={handlePress}>
        <Icon
          className={comment.userReaction === reactionValue ? 'brightness-75' : 'brightness-100'}
          size={comment.userReaction === reactionValue ? 17 : 20}
        />
      </Button>
    </div>
  );
}
