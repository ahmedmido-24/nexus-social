import React from "react";
// import style from './Comment.module.css'

export default function Comment({ comment }) {
  // If there's no comment object, don't render anything.
  if (!comment) {
    return null;
  }

  // Destructure properties from the comment object.
  // Assuming 'commentCreator' is the correct property name instead of 'commentCreatort'.
  const { commentCreator, createdAt, content } = comment;

  // Also check if commentCreator exists before trying to access its properties.
  if (!commentCreator) {
    return null;
  }
  return (
    <div className="w-full rounded-md border-2 my-2 border-slate-900 p-3 bg-slate-500 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src={commentCreator.photo}
            alt={commentCreator.name}
            className="size-[36px] rounded-full"
          />
          <p>{commentCreator.name}</p>
        </div>
        <span className="text-slate-300 text-sm">
          {new Date(createdAt).toLocaleString()}
        </span>
      </div>
      <p className="mt-2 px-12">{content}</p>
    </div>
  );
}
