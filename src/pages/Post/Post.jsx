import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import imgPlaceHolder from "../../assets/no_image_placeholder.png";
const Post = () => {
  const { id } = useParams();
  const { data, error } = useFetch(`http://localhost:3001/posts/${id}`);

  return (
    <div className="homeContainer mt-4">
      <div className="text-center">
        <img src={data ? data[0]?.mediaUrl : imgPlaceHolder} alt="" />
      </div>
      <div className="mt-3">{data[0]?.title}</div>
      <div className="mt-3">{data[0]?.description}</div>
    </div>
  );
};

export default Post;
