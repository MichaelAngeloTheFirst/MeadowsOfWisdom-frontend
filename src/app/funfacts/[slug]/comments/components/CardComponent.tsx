import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { FcLike, FcDislike } from 'react-icons/fc';
import { FaCommentAlt } from 'react-icons/fa';
import { useState } from 'react';
import InputComponent from './InputComponent';
import ToggleButton from './ToggleButton';
import { useVoteContext } from './VoteContext';
import Provider from './VoteContext';
import DeleteCommentButton from './DeleteCommentButton';

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

type User = {
  id: number;
  username: string;
};

const formatedDate = (date: string) => {
  const [dateString, timeString] = date.split('T');
  return (
    timeString.split('.')[0].split(':')[0] +
    ':' +
    timeString.split('.')[0].split(':')[1] +
    ' ' +
    dateString
  );
};

export function CardComponent({
  index,
  factId,
  userId,
}: {
  
  index: number;
  factId: number;
  userId: number;
}) {
  const [onReply, setOnReply] = useState(false);
  const { CommentArray } = useVoteContext();
  const comment = CommentArray[index];

  return (
    <div className="relative">
      <Card className=" relative -mt-2 mb-6 flex-row p-2">
        <CardBody className="flex w-full flex-col gap-3 p-1">
          <div className="flex justify-between">
            {userId === comment.userId && (
              <DeleteCommentButton factId={factId} comment={comment} index={index} />
            )}

            <Typography variant="h6" color="blue-gray" className="mb-1">
              {comment.username}
            </Typography>

            <Typography className="font-serif">
              {comment.createdAt === comment.updatedAt
                ? formatedDate(comment.createdAt)
                : formatedDate(comment.updatedAt)}
            </Typography>
          </div>
          <Typography>{comment.commentText}</Typography>
          <div className="flex flex-row justify-between">
            <div className="flex gap-2">
              <ToggleButton Icon={FcLike} comment={comment} reactionValue="upvote" factId={factId} />
              <Typography className="flex items-end">{comment.countVotes}</Typography>
              <ToggleButton
                Icon={FcDislike}
                comment={comment}
                reactionValue="downvote" 
                factId={factId} />
            </div>
            <div>
              <Button
                variant="text"
                className="flex justify-center p-1"
                onClick={() => setOnReply(!onReply)}
              >
                <FaCommentAlt size={20} />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <InputComponent
        replayInfo={onReply}
        factId={factId}
        parent_id={comment.id}
      />
      <div>
        {comment.children?.map((child, i) => (
          <div className=" border-l-2 border-solid border-gray-700 p-2" key={child.id}>
            <Provider key={comment.id} comment={comment.children}  factId={factId}>
              <CardComponent
                index={i}
                factId={factId}
                userId={userId}
              />
            </Provider>
          </div>
        ))}
      </div>
    </div>
  );
}
