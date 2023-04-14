import { useFetch } from "../../hooks/useFetch";
const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:3001/posts");
  console.log(data);
  return <div></div>;
};

export default Home;
