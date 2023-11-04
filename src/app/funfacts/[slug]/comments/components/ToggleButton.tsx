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
  index,
  reactionValue,
}: {
  Icon: IconType;
  comment: NestedComment;
  index: number;
  reactionValue: string;
}) {
  const { CommentArray, setCommentArray } = useVoteContext();
  const handlePress = async () => {
    try {
      if (!comment.userReaction) {
        const response = await privateClient.post(getCommentVotesUrl(comment.id, reactionValue));
        const newComment = Object.assign({}, comment, { userReaction: reactionValue });
        const arrayCopy = [...CommentArray];
        arrayCopy.splice(index, 1, newComment);
        setCommentArray(arrayCopy);
        console.log(response.status);
      } else {
        if (comment.userReaction === reactionValue) {
          const response = await privateClient.delete(
            getCommentVotesUrl(comment.id, reactionValue),
          );

          const newComment = Object.assign({}, comment, { userReaction: null });
          const arrayCopy = [...CommentArray];
          arrayCopy.splice(index, 1, newComment);
          setCommentArray(arrayCopy);
          console.log(response.status);
        } else {
          const response = await privateClient.patch(getCommentVotesUrl(comment.id, reactionValue));

          const newComment = Object.assign({}, comment, {
            userReaction: comment.userReaction === 'upvote' ? 'downvote' : 'upvote',
          });
          const arrayCopy = [...CommentArray];
          arrayCopy.splice(index, 1, newComment);
          setCommentArray(arrayCopy);
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
