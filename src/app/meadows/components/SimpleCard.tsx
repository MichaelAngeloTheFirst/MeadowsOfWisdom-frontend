import React, { useState, useEffect, use } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import axios from "axios";
import { getFunFactsUrl } from "@/lib/urls";

// Define a type for the fun fact data
interface FunFact {
  id: number;
  username: string;
  fact_text: string;
  upvote: number;
  downvote: number;
  created_at: string;
  updated_at: string;
}

export function SimpleCard() {
  const [facts, setFacts] = useState<FunFact[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<FunFact[]>(getFunFactsUrl());
        console.log(response.status);
        setFacts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const redirectComments = () => {
    window.location.href = "/comments";
  };


  return (
        <a>
        {loading ? (
          "Finding Knowledge..."
        ) : (
            <ul>
                {facts.map((fact) => (
                <li key={fact.id}>
                    <Card className="mt-6 w-96">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                  {fact.username} <br />
                            </Typography>
                            <strong>Fact:</strong> {fact.fact_text} <br />
                            <strong>Upvotes:</strong> {fact.upvote} <br />
                            <strong>Downvotes:</strong> {fact.downvote} <br />
                            <strong>Created At:</strong> {fact.created_at} <br />
                            <strong>Updated At:</strong> {fact.updated_at} <br />
                        </CardBody>
                        <CardFooter>
                        <div className="flex w-max flex-col gap-20 ">
                          <ButtonGroup variant="text" className="flex align-middle">
                            <Button className="flex align-left">Likes</Button>
                            <Button onClick={redirectComments}>Comments</Button>
                            <Button className="align-right">Dislikes</Button>
                          </ButtonGroup>
                        </div>
                        </CardFooter>

                    </Card>
                </li>
                ))}
            </ul>
            )}
    </a>
  );
}
