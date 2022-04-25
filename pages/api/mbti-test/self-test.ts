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

    console.log(mbtiType, choices, userId);

    try {
      const newSelfTest = await prisma.selfType.create({
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
                  extroversion: 23,
                  introversion: 23,
                  sensing: 23,
                  intuition: 23,
                  thinking: 23,
                  feeling: 23,
                  perceiving: 23,
                  judging: 23,
                },
              },
            },
          },
        },
      });

      await console.log(newSelfTest);

      res.status(200).json({ message: "message added successfully" });
    } catch (error) {
      res.status(500).json({ message: `failed to send message ${error}` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
