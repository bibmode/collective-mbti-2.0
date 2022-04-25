// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

type Data = {
  message: string;
};

type FourLetters = {
  Extroverted: number;
  Feeling: number;
  Introverted: number;
  Intuitive: number;
  Judging: number;
  Perceiving: number;
  Sensor: number;
  Thinking: number;
};

type CognitiveFunctions = {
  Ne: number;
  Ni: number;
  Se: number;
  Si: number;
  Te: number;
  Ti: number;
  Fe: number;
  Fi: number;
};

type SelfTypeProps = {
  mbtiType: string;
  choices: string[];
  userId: string;
  cognitiveFunctions: CognitiveFunctions;
  fourLetters: FourLetters;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "POST") {
    const {
      mbtiType,
      choices,
      userId,
      cognitiveFunctions,
      fourLetters,
    }: SelfTypeProps = req.body;

    console.log(mbtiType, choices, userId);

    try {
      await prisma.selfType.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          results: {
            create: {
              mbtiType: mbtiType,
              choices: choices,
              cognitiveFunctions: {
                create: {
                  ne: cognitiveFunctions.Ne,
                  ni: cognitiveFunctions.Ni,
                  se: cognitiveFunctions.Se,
                  si: cognitiveFunctions.Si,
                  te: cognitiveFunctions.Te,
                  ti: cognitiveFunctions.Ti,
                  fe: cognitiveFunctions.Fe,
                  fi: cognitiveFunctions.Fi,
                },
              },
              fourLetters: {
                create: {
                  extroversion: fourLetters.Extroverted,
                  introversion: fourLetters.Introverted,
                  sensing: fourLetters.Sensor,
                  intuition: fourLetters.Intuitive,
                  thinking: fourLetters.Thinking,
                  feeling: fourLetters.Feeling,
                  perceiving: fourLetters.Perceiving,
                  judging: fourLetters.Judging,
                },
              },
            },
          },
        },
      });

      res.status(200).json({ message: "message added successfully" });
    } catch (error) {
      res.status(500).json({ message: `failed to send message ${error}` });
    }
  } else if (req.method === "GET") {
    const { userId } = req.query;

    const foundData = await prisma.selfType.findUnique({
      where: {
        userId: `${userId}`,
      },
      include: {
        results: true,
      },
    });

    res.status(200).json(foundData);
  } else if (req.method === "PATCH") {
    const { mbtiType, choices, userId, cognitiveFunctions, fourLetters } =
      req.body;

    await prisma.selfType.update({
      where: {
        userId: `${userId}`,
      },
      data: {
        results: {
          update: {
            mbtiType: mbtiType,
            choices: choices,
            cognitiveFunctions: {
              update: {
                ne: cognitiveFunctions.Ne,
                ni: cognitiveFunctions.Ni,
                se: cognitiveFunctions.Se,
                si: cognitiveFunctions.Si,
                te: cognitiveFunctions.Te,
                ti: cognitiveFunctions.Ti,
                fe: cognitiveFunctions.Fe,
                fi: cognitiveFunctions.Fi,
              },
            },
            fourLetters: {
              update: {
                extroversion: fourLetters.Extroverted,
                introversion: fourLetters.Introverted,
                sensing: fourLetters.Sensor,
                intuition: fourLetters.Intuitive,
                thinking: fourLetters.Thinking,
                feeling: fourLetters.Feeling,
                perceiving: fourLetters.Perceiving,
                judging: fourLetters.Judging,
              },
            },
          },
        },
      },
    });

    res.status(200).json({ message: "self test updated successfully" });
  } else {
    res.setHeader("Allow", ["POST", "GET", "PATCH"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
