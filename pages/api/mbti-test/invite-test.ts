import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { CognitiveFunctions, FourLetters } from "../../../types/result-types";

type InviteTestProps = {
  mbtiType: string;
  choices: string[];
  userId: string;
  cognitiveFunctions: CognitiveFunctions;
  fourLetters: FourLetters;
  comment: string;
  name: string;
  relationship: string;
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
      comment,
      name,
      relationship,
    }: InviteTestProps = req.body;

    console.log(mbtiType, choices, userId);

    try {
      await prisma.typology.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          comment: comment,
          relationship: relationship,
          name: name,
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

      res.status(200).json({ message: "invite result added successfully" });
    } catch (error) {
      res.status(500).json({ message: `failed to save result: ${error}` });
    }
  } else if (req.method === "GET") {
    const { userId } = req.query;

    console.log(userId);
    try {
      const foundData = await prisma.selfType.findUnique({
        where: {
          userId: `${userId}`,
        },
        include: {
          results: true,
        },
      });

      console.log(foundData);

      res.status(200).json(foundData);
    } catch (error) {
      console.log("hello");
      res.status(500).json({ message: `failed to send message ${error}` });
    }
  } else if (req.method === "PATCH") {
    const { mbtiType, choices, userId, cognitiveFunctions, fourLetters } =
      req.body;

    await prisma.selfType.update({
      where: {
        userId: userId,
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
