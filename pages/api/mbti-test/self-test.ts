// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

type Data = {
  message: string;
};

type SelfTypeProps = {
  mbtiType: string;
  choices: string[];
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "POST") {
    const { mbtiType, choices, userId }: SelfTypeProps = req.body;

    try {
      // connect to user
      await prisma.selfType.update({
        where: {
          userId: userId,
        },
        data: {
          // TODO: connect self test result to user
          results: {
            upsert: {
              create: {
                mbtiType,
                choices,
                cognitiveFunctions: {
                  create: {
                    ne: 22,
                    ni: 22,
                    se: 22,
                    si: 22,
                    te: 22,
                    ti: 22,
                    fe: 22,
                    fi: 22,
                  },
                },
                fourLetters: {
                  create: {
                    extroversion: 22,
                    introversion: 22,
                    intuition: 22,
                    sensing: 22,
                    thinking: 22,
                    feeling: 22,
                    perceiving: 22,
                    judging: 22,
                  },
                },
              },
              update: {
                mbtiType,
                choices,
                cognitiveFunctions: {
                  update: {
                    ne: 22,
                    ni: 22,
                    se: 22,
                    si: 22,
                    te: 22,
                    ti: 22,
                    fe: 22,
                    fi: 22,
                  },
                },
                fourLetters: {
                  update: {
                    extroversion: 22,
                    introversion: 22,
                    intuition: 22,
                    sensing: 22,
                    thinking: 22,
                    feeling: 22,
                    perceiving: 22,
                    judging: 22,
                  },
                },
              },
            },
          },
        },
      });

      res.status(200).json({ message: "message added successfully" });
    } catch (error) {
      res.status(500).json({ message: "failed to send message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
