import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const nameRe = /^([a-z|A-Z|0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,12}$/;
const passwordRe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      let { email, name, password, confirmPassword } = req.body;

      // check regular expression for Email, name and Password
      if (
        !emailRe.exec(email) ||
        !nameRe.exec(name) ||
        !passwordRe.exec(password)
      ) {
        return res
          .status(400)
          .json("이메일 또는 비밀번호의 형식이 틀렸습니다.");
      }

      // check password is same with confirm password
      if (password !== confirmPassword) {
        return res.status(400).json("비밀번호 확인이 일치하지 않습니다.");
      }

      const db = (await connectDB).db("forum");

      // check for any overlapping emails on DB
      const duplicateEmail = await db
        .collection("user_cred")
        .findOne({ email: email });

      if (duplicateEmail) {
        return res.status(400).json({
          duplicateEmail: "*사용할수 없는 이메일입니다.",
        });
      }

      const duplicateName = await db
        .collection("user_cred")
        .findOne({ name: name });

      if (duplicateName) {
        return res.status(400).json({
          duplicateName: "*사용할수 없는 닉네임입니다.",
        });
      }

      // hash password with bycrpt
      password = await bcrypt.hash(password, 10);

      const userRole = "normal";

      const registerUser = await db
        .collection("user_cred")
        .insertOne({ email, name, password, userRole });

      return res.status(200).json("회원가입 완료");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handleRegister;
