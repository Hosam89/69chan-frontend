import { Card, Button } from "react-bootstrap";

import "./PostCard.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PostCard = ({
  imageUrl,
  title,
  description,
  postId,
  userName,

  userId,
}) => {
  const { user } = useAuthContext();
  return (
    <Card style={{ width: "30rem" }} className="postContainer mb-2">
      <Card.Img variant="top" src={imageUrl} />

      <Card.Body>
        <Card.Title>
          {title} {userName}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={`/post/${postId}`}>
          <Button variant="primary">see More</Button>
        </Link>

        {user._id === userId ? (
          <>
            <Link to={`/editpost/${postId}`}>
              <Button variant="success" className="ms-2">
                {" "}
                Edit Post
              </Button>
            </Link>
          </>
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
