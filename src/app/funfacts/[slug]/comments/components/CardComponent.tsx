import { Card, CardBody, Typography, Button, ThemeProvider } from '@material-tailwind/react';
import { FcLike, FcDislike } from 'react-icons/fc';
import { FaCommentAlt } from 'react-icons/fa';
import { useState } from 'react';
import InputComponent from './InputComponent';
import ToggleButton from './ToggleButton';
import { useVoteContext } from './VoteContext';
import Provider from './VoteContext';
import Comments from '../page';
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
  fact_id,
  afterSubmit,
}: {
  index: number;
  fact_id: number;
  afterSubmit?: VoidFunction;
}) {
  const [onReply, setOnReply] = useState(false);
  const { CommentArray } = useVoteContext();
  const comment: NestedComment = CommentArray[index]!;

  return (
    <div>
      <Card className="mt-6 flex-row p-2">
        <CardBody className="flex w-full flex-col gap-3 p-1">
          <div className="flex justify-between">
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
              <ToggleButton
                Icon={FcLike}
                index={index}
                commentID={comment.id}
                reaction={comment.userReaction ? comment.userReaction : ''}
                reactionValue="upvote"
              />
              <Typography className="flex items-end">{comment.countVotes}</Typography>
              <ToggleButton
                Icon={FcDislike}
                index={index}
                commentID={comment.id}
                reaction={comment.userReaction ? comment.userReaction : ''}
                reactionValue="downvote"
              />
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
        fact_id={fact_id}
        parent_id={comment.id}
        afterSubmit={afterSubmit}
      />
      <div>
        {comment.children.map((child, i) => (
          <div className="border-l-2 border-solid border-gray-700 p-2" key={child.id}>
            <Provider key={comment.id} comment={comment.children}>
              <CardComponent index={i} fact_id={fact_id} afterSubmit={afterSubmit} />
            </Provider>
          </div>
        ))}
      </div>
    </div>
  );
}
