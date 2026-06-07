import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";

// ✅ 1. Define the fetching function OUTSIDE the component (only once)
async function getAllPosts() {
  const response = await axios.get(
    "https://linked-posts.routemisr.com/posts?limit=50",
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return response.data.posts; // return the actual posts array directly
}

export default function Home() {
  // ✅ 2. Use React Query properly
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  // ✅ 3. Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading posts...</p>
      </div>
    );
  }

  // ✅ 4. Handle error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error fetching posts: {error.message}</p>
      </div>
    );
  }

  // ✅ 5. Handle empty data
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center mt-8">
        <p>No posts to display at the moment.</p>
      </div>
    );
  }

  // ✅ 6. Render posts
  return (
    // Wrap the map function in a container div
    <div>
      {posts.map((post) => (
        <Link key={post.id} to={`/postdetails/${post.id}`}>
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="w-full md:w-[80%] lg:w-[60%] rounded-md bg-stone-300 p-3">
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
                  className="w-full rounded-md"
                  alt={post.body || "Post image"}
                />
              )}
              <Comment comment={post.comments[0]} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
