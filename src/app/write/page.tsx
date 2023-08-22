"use client";

import Link from "next/link";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";

type InputElements = HTMLInputElement | HTMLTextAreaElement;

const WritePage = () => {
  const [forumData, setForumData] = useState({
    title: "",
    content: "",
  });

  const [regexState, setRegexState] = useState({
    title: false,
    content: false,
  });

  const handleChange = (e: React.ChangeEvent<InputElements>) => {
    const { name, value } = e.target;
    setForumData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() === "") {
      setRegexState((prev) => ({ ...prev, [name]: true }));
    } else {
      setRegexState((prev) => ({ ...prev, [name]: false }));
    }
  };

  const forumSubmitHanlder = (e: React.FormEvent<HTMLFormElement>) => {
    Object.entries(forumData).forEach(([key, value]) => {
      if (value.trim() === "") {
        e.preventDefault();
        setRegexState((prev) => ({ ...prev, [key]: true }));
      } else {
        setRegexState((prev) => ({ ...prev, [key]: false }));
      }
    });
  };

  return (
    <div>
      <div className="mx-auto flex-col-center mt-100 max-w-400">
        <h4 className="font-semibold text-18">게시글 작성</h4>
        <form
          onSubmit={(e) => forumSubmitHanlder(e)}
          action="/api/write"
          method="POST"
          className="w-full gap-40 mt-40 flex-col-center"
        >
          <div className="flex justify-between w-full">
            <label htmlFor="forum_title" className="font-semibold w-50">
              제목
            </label>
            <CustomInput
              id="forum_title"
              name="title"
              type="text"
              placeholder="글 제목"
              onChange={(e) => handleChange(e)}
              value={forumData.title}
              regexMessage={"제목을 입력해주세요"}
              regexState={regexState.title}
            />
          </div>
          <div className="flex justify-between w-full">
            <label htmlFor="forum_content" className="font-semibold w-50">
              내용
            </label>
            <CustomTextArea
              id="forum_content"
              name="content"
              placeholder="본문 내용"
              onChange={(e) => handleChange(e)}
              value={forumData.content}
              regexMessage={"내용을 입력해주세요"}
              regexState={regexState.content}
            />
          </div>
          <div className="flex justify-end w-full gap-20">
            <Link href={"/list"}>
              <button
                type="button"
                className="px-20 py-3 font-semibold border-black border-1 text-14"
              >
                취소
              </button>
            </Link>
            <button
              type="submit"
              className="px-20 py-3 font-semibold border-black border-1 text-14"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;
