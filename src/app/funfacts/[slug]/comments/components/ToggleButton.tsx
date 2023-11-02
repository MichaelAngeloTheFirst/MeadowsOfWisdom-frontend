import Button from '@material-tailwind/react/components/Button';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import privateClient from '@/lib/api';
import { getCommentVotesUrl } from '@/lib/urls';
import { useVoteContext } from './VoteContext';

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

export default function ToggleButton({
  Icon,
  index,
  commentID,
  reaction,
  reactionValue,
}: {
  Icon: IconType;
  index: number;
  commentID: number;
  reaction: string;
  reactionValue: string;
}) {
  const { CommentArray, setCommentArray } = useVoteContext();
  const comment: NestedComment = CommentArray[index];
  // const [reactionType, setReactionType] = useState(comment.userReaction || '');

  // useEffect(() => {
  //   setReactionType((prev) => comment.userReaction || '');
  // }, [comment.userReaction, setReactionType]);

  const handlePress = async () => {
    try {
      if (!comment.userReaction) {
        const response = await privateClient.post(getCommentVotesUrl(commentID, reactionValue));
        const newComment = Object.assign({}, comment, { userReaction: reactionValue });
        CommentArray.splice(index, 1, newComment);
        setCommentArray([...CommentArray]);
        console.log(response.status);
      } else {
        if (comment.userReaction === reactionValue) {
          const response = await privateClient.delete(getCommentVotesUrl(commentID, reactionValue));

          const newComment = Object.assign({}, comment, { userReaction: null });
          CommentArray.splice(index, 1, newComment);
          setCommentArray([...CommentArray]);
          console.log(response.status);
        } else {
          const response = await privateClient.patch(getCommentVotesUrl(commentID, reactionValue));

          const newComment = Object.assign({}, comment, {
            userReaction: comment.userReaction === 'upvote' ? 'downvote' : 'upvote',
          });
          CommentArray.splice(index, 1, newComment);
          setCommentArray([...CommentArray]);
          console.log(response.status);
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
