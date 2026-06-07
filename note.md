{...register("name")}


        {/* 
  <div class="flex items-center mb-4">
    <input id="country-option-1" type="radio" name="countries" value="USA" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked />
    <label for="country-option-1" class="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
      United States
    </label>
  </div> */}



  how context work 

  its mean data i can use from any where and didn't make props 
  how to use it 
  1- create folder Context in component
  2- create file in it and named it {about whats will do}
  3- import React, { useContext } from 'react' 


home page.jsx 



//*********************************************************** */   //
  // 1. Destructure getAllPosts from the context
  // let { getAllPosts } = useContext(PostContext);

  // // 2. Add state for posts, loading, and errors
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // 3. Create an async function to fetch data and handle state
  // async function getPosts() {
  //   try {
  //     setLoading(true);
  //     let fetchedPosts = await getAllPosts();
  //     setPosts(fetchedPosts);
  //   } catch (err) {
  //     setError("Failed to fetch posts. Please try again later.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  // 4. Render UI based on loading and error states
  // if (loading) {
  //   return <div className="text-center mt-8">Loading posts...</div>;
  // }

  // if (error) {
  //   return <div className="text-center mt-8 text-red-500">{error}</div>;
  // }