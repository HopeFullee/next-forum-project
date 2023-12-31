import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

const nameRe = /^([a-z|A-Z|0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,12}$/;

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    if (!req.headers.authorization) {
      return res.status(403).json("접근 권한이 없습니다.");
    }

    const session = await getServerSession(req, res, authOptions);

    if (!nameRe.exec(req.body.name))
      return res.status(400).json("닉네임 형식이 틀렸습니다.");

    const db = (await connectDB).db("forum");

    const duplicateName = await db
      .collection("user_cred")
      .findOne({ name: req.body.name });

    if (duplicateName) {
      return res
        .status(400)
        .json({ duplicateName: "*사용할수 없는 닉네임입니다." });
    }

    const result = await db
      .collection("user_cred")
      .updateOne(
        { _id: new ObjectId(session?.user.id) },
        { $set: { name: req.body.name } }
      );

    return res.status(200).json("프로필 수정 완료.");
  }

  return res.status(500).json("server error");
};

export default profile;
