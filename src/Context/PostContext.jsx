import axios from "axios";
import { createContext } from "react";

export let PostContext = createContext();

export default function PostContextProvider(props) {
  // function getAllPosts() {
  //   // The endpoint was changed from /users/signup to /posts which is more appropriate for getting posts.
  //   // The .catch block was removed to allow promise rejection on API error.
  //   return axios
  //     .get(`https://linked-posts.routemisr.com/posts`, {
  //       headers: {
  //         token: localStorage.getItem("userToken"),
  //       },
  //     })
  //     .then((res) => res.data.posts);
  // }
  return (
    <>
      <PostContext.Provider value={{}}>
        {" "}
        {/*getAllPosts */}
        {props.children}
      </PostContext.Provider>
    </>
  );
}
