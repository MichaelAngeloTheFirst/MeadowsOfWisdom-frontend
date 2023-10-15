import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { FcLike, FcDislike } from 'react-icons/fc';
import { FaCommentAlt } from 'react-icons/fa';
import { useState } from 'react';
import InputComponent from './InputComponent';

interface Comment {
  id: number;
  parentId: number;
  username: string;
  commentText: string;
  upvote: number;
  downvote: number;
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
  comment,
  fact_id,
  afterSubmit,
}: {
  comment: NestedComment;
  fact_id: number;
  afterSubmit?: VoidFunction;
}) {
  const [onReply, setOnReply] = useState(false);

  return (
    <div>
      <Card className="h-45 mt-6 w-full flex-row p-0">
        <CardBody className="flex w-full flex-col p-1">
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
            <div className="flex">
              <Button ripple={true} variant="text" className="flex justify-center p-1">
                <h3>
                  <FcLike size={20} />
                </h3>
              </Button>

              <Typography className="flex items-end">
                {comment.upvote - comment.downvote}
              </Typography>

              <Button ripple={false} className="flex justify-center p-1">
                <FcDislike size={20} />
              </Button>
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
        {comment.children.map((child) => (
          <div className="border-l-2 border-solid border-gray-700 p-2" key={child.id}>
            <CardComponent comment={child} fact_id={fact_id} afterSubmit={afterSubmit} />
          </div>
        ))}
      </div>
    </div>
  );
}
