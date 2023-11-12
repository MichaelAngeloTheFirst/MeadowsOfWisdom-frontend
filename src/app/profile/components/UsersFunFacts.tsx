'use client';

import { Card, CardBody, Typography } from '@material-tailwind/react';
import DeletefunfactButton from './DeletefunfactButton';
interface FunFact {
  id: number;
  username: string;
  factText: string;
  createdAt: string;
  updatedAt: string;
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

export default function UsersFunFacts({ funfact, index }: { funfact: FunFact; index: number }) {
  return (
    <div className="relative ">
      <Card className=" relative -mt-2 mb-6 flex-row p-2">
        <CardBody className="flex w-full flex-col gap-3 p-1">
          <div className="flex justify-between">
            <DeletefunfactButton funfact={funfact} index={index} />

            <Typography variant="h6" color="blue-gray" className="mb-1">
              {funfact.username}
            </Typography>

            <Typography className="font-serif">
              {funfact.createdAt === funfact.updatedAt
                ? formatedDate(funfact.createdAt)
                : formatedDate(funfact.updatedAt)}
            </Typography>
          </div>
          <Typography>{funfact.factText}</Typography>
        </CardBody>
      </Card>
    </div>
  );
}
