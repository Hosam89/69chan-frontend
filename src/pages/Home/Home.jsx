import { PostCard } from "../../components/index";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:3001/posts");
  const [post, setPost] = useState(null);
  setTimeout(() => {
    setPost(data);
  }, 1000);

  return (
    <div className="homeContainer mt-5">
      <h4 className="text-center">New Posts</h4>
      {post &&
        post
          ?.map((post) => (
            <PostCard
              imageUrl={post.mediaUrl}
              title={post.title}
              description={post.description}
              postId={post._id}
              key={post._id}
              userName={post.userName}
              userId={post.user}
            />
          ))
          .reverse()}
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Home;
