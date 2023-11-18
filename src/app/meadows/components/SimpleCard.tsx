'use client';
import React, { useState, useEffect, use } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  ButtonGroup,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useFunfactStore } from '@/app/stores/funfactStore';
import { FcDislike, FcLike } from 'react-icons/fc';
import ToggleButton from './ToggleButton';

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

export function SimpleCard() {
  const { funfactArray } = useFunfactStore();
  console.log('funfactArray in SimpleCard.tsx', funfactArray);
  if (!funfactArray) return null;

  //   <div className="relative">
  //   <Card className=" relative -mt-2 mb-6 flex-row p-2">
  //     <CardBody className="flex w-full flex-col gap-3 p-1">
  //       <div className="flex justify-between">
  //         {userId === comment.userId && (

  //         <Typography variant="h6" color="blue-gray" className="mb-1">
  //           {comment.username}
  //         </Typography>

  //         <Typography className="font-serif">
  //           {comment.createdAt === comment.updatedAt
  //             ? formatedDate(comment.createdAt)
  //             : formatedDate(comment.updatedAt)}
  //         </Typography>
  //       </div>
  //       <Typography>{comment.commentText}</Typography>
  //       <div className="flex flex-row justify-between">
  //         <div className="flex gap-2">
  //           <ToggleButton Icon={FcLike} comment={comment} index={index} reactionValue="upvote" />
  //           <Typography className="flex items-end">{comment.countVotes}</Typography>
  //           <ToggleButton
  //             Icon={FcDislike}
  //             comment={comment}
  //             index={index}
  //             reactionValue="downvote"
  //           />
  //         </div>
  //         <div>
  //           <Button
  //             variant="text"
  //             className="flex justify-center p-1"
  //             onClick={() => setOnReply(!onReply)}
  //           >
  //             <FaCommentAlt size={20} />
  //           </Button>
  //         </div>
  //       </div>
  //     </CardBody>
  //   </Card>
  //     ))}
  //   </div>
  // </div>

  return (
    <div className="overflow-auto ">
      <ul>
        {funfactArray.map((fact, i) => (
          <li key={fact.id}>
            <Card className="mt-6 w-96">
              <CardBody>
                <div className="flex justify-between">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    {fact.username}
                  </Typography>
                  <Typography className="font-serif">
                    {fact.createdAt === fact.updatedAt
                      ? formatedDate(fact.createdAt)
                      : formatedDate(fact.updatedAt)}
                  </Typography>
                </div>
                <Typography>{fact.factText}</Typography>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-2">
                    <ToggleButton reactionValue={'upvote'} Icon={FcLike} index={i} />
                    <Typography className="flex items-end">{fact.countVotes}</Typography>
                    <ToggleButton reactionValue={'downvote'} Icon={FcDislike} index={i} />
                  </div>
                  <div>
                    <Button>
                      <Link href={`/funfacts/${fact.id}/comments`}>Comments</Link>
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
