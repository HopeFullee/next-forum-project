import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

const comment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.headers.authorization) {
      return res.status(403).json("접근 권한이 없습니다.");
    }

    const { postId, commenter, comment } = req.body;

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(postId) },
      {
        comments: {
          $push: {
            comment: {
              commenter: commenter,
              comment: comment,
            },
          },
        },
      }
    );
  }
};
