import React from "react";
import style from "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Comment from "./../Comment/Comment";

export default function PostDetails() {
  // 1. Get the post ID from the URL.
  const { id } = useParams();

  // 2. Define the fetching function. It needs the `id` to fetch the correct post.
  async function getSinglePost() {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return data.post;
  }

  // 3. Use React Query to fetch the data.
  //    - The queryKey should include the `id` to be unique for each post.
  //    - The fetched data is aliased to `post` for clarity.
  const {
    data: post,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["singlePost", id],
    queryFn: getSinglePost,
  });

  // 4. Handle loading state.
  if (isLoading) {
    return <div className="text-center mt-8">Loading post details...</div>;
  }

  // 5. Handle error state.
  if (isError) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // 6. Render the component with the fetched data.
  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto rounded-md bg-stone-300 p-3 mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <img
              src={post.user.photo}
              className="size-[36px] rounded-full"
              alt={post.user.name}
            />
            <p>{post.user.name}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {post.body && <h2 className="mb-4">{post.body}</h2>}
        {post.image && (
          <img
            src={post.image}
            className="w-full rounded-md mb-4"
            alt={post.body || "Post image"}
          />
        )}
        <h3 className="font-bold text-lg mb-2">Comments:</h3>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
