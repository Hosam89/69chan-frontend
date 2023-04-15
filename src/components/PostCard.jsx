import { Card, Button } from "react-bootstrap";

import "./PostCard.css";
import { Link } from "react-router-dom";

const PostCard = ({ imageUrl, title, description, postId }) => {
  return (
    <Card style={{ width: "30rem" }} className="postContainer">
      <Card.Img variant="top" src={imageUrl} />

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={`/post/${postId}`}>
          <Button variant="primary">see More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
