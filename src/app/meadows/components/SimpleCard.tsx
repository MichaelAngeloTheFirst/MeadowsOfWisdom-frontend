'use client';
import React, { useState, useEffect, use } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button,
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
  const { funfactArray} = useFunfactStore();
  console.log('funfactArray in SimpleCard.tsx', funfactArray);
  if (!funfactArray) return null;


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
