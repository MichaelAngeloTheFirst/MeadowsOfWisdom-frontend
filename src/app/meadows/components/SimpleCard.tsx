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
import axios from 'axios';
import { getFunFactsUrl } from '@/lib/urls';
import Link from 'next/link';

// Define a type for the fun fact data
interface FunFact {
  id: number;
  username: string;
  factText: string;
  createdAt: string;
  updatedAt: string;
}

export function SimpleCard() {
  const [facts, setFacts] = useState<FunFact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<FunFact[]>(getFunFactsUrl());
        console.log(response.status);
        console.log(response.data);
        setFacts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        'Finding Knowledge...'
      ) : (
        <ul>
          {facts.map((fact) => (
            <li key={fact.id}>
              <Card className="mt-6 w-96">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {fact.username} <br />
                  </Typography>
                  <strong>Fact:</strong> {fact.factText} <br />
                  <strong>Created At:</strong> {fact.createdAt} <br />
                  <strong>Updated At:</strong> {fact.updatedAt} <br />
                </CardBody>
                <CardFooter>
                  <div className="flex w-max flex-col gap-20 ">
                    <ButtonGroup variant="text" className="flex align-middle">
                      <Button className="align-left flex">Likes</Button>
                      <Button>
                        <Link href={`/funfacts/${fact.id}/comments`}>Comments</Link>
                      </Button>
                      <Button className="align-right">Dislikes</Button>
                    </ButtonGroup>
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
