import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import PostCard from "../../components/PostCard";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserPosts = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { data, error } = useFetch(
    `http://localhost:3001/posts/userPost/${id}`
  );
  const [show, setShow] = useState([]);
  console.log(data);
  setTimeout(() => {
    setShow(data);
  }, 1000);
  return (
    <div className="homeContainer">
      <h3 className="text-center">{user.name} posts</h3>
      {show &&
        show?.map((post) => (
          <PostCard
            title={post.title}
            description={post.description}
            imageUrl={post.mediaUrl}
            postId={post._id}
          />
        ))}
    </div>
  );
};

export default UserPosts;
