import { PostCard } from "../../components/index";
import { useFetch } from "../../hooks/useFetch";
const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:3001/posts");

  return (
    <div className="homeContainer mt-5">
      {data &&
        data?.map((post) => (
          <PostCard
            imageUrl={post.mediaUrl}
            title={post.title}
            description={post.description}
          />
        ))}
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Home;
