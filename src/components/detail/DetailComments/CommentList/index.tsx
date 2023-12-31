"use client";

import { Session } from "next-auth";
import { useMemo, useState } from "react";
import CommentModify from "./CommentModify";

interface Props {
  session: Session | null;
  postId: string;
  _id: string;
  commenterId: string;
  commenter: string;
  comment: string;
  createdAt: string;
}

const CommentList = ({
  _id: commentId,
  postId,
  commenterId,
  commenter,
  comment,
  createdAt,
  session,
}: Props) => {
  const [editMode, setEditMode] = useState(false);

  const commentDate = useMemo(() => {
    const date = new Date(createdAt);
    const browserLocale =
      typeof window !== "undefined" ? window.navigator.language : undefined;
    const dateFormatter = new Intl.DateTimeFormat(browserLocale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDate = dateFormatter
      .format(date)
      .replace(/(?!-)[^0-9.:]/g, "")
      .replace(/\./g, ". ");

    return formattedDate;
  }, []);

  const editModeClick = () => {
    setEditMode((prev) => !prev);
  };

  const isCommentOwner = session?.user.name === commenter;

  return (
    <li className="p-5 py-10 border-b-1 border-cyan-500/40">
      <div className="flex justify-between text-15">
        <p>{commenter}</p>
        <div className="gap-10 flex-center">
          <p>{commentDate}</p>
          {isCommentOwner && (
            <button
              onClick={editModeClick}
              className="px-5 py-2 font-semibold tracking-wider rounded-sm bg-cyan-500/25 text-12"
            >
              {editMode ? "CANCEL" : "EDIT"}
            </button>
          )}
        </div>
      </div>
      {editMode ? (
        <CommentModify
          postId={postId}
          commenterId={commenterId}
          commentId={commentId}
          comment={comment}
        />
      ) : (
        <p className="mt-10 font-light tracking-wide break-all">{comment}</p>
      )}
    </li>
  );
};

export default CommentList;
