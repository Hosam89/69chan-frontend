import { Card, Button } from "react-bootstrap";

import "./PostCard.css";

const PostCard = ({ imageUrl, title, description, user }) => {
  return (
    <Card style={{ width: "30rem" }} className="postContainer">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>
          {title} {user}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">see More</Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
