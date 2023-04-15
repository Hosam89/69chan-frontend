import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import imgPlaceHolder from "../../assets/no_image_placeholder.png";
import { useEffect, useState } from "react";

const Post = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const { data, error } = useFetch(`http://localhost:3001/posts/${id}`);
  setTimeout(() => {
    setShow(true);
  }, 500);

  return (
    <div className="homeContainer mt-4">
      {show && (
        <>
          <div className="text-center">
            <img src={data[0] ? data[0]?.mediaUrl : imgPlaceHolder} alt="" />
          </div>
          <div className="mt-3">{data[0]?.title}</div>
          <div className="mt-3">{data[0]?.description}</div>
        </>
      )}
    </div>
  );
};

export default Post;
