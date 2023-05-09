import { Card, Button } from "react-bootstrap";

import "./PostCard.css";
import { Link } from "react-router-dom";

const PostCard = ({ imageUrl, title, description, postId, tags }) => {
  return (
    <Card className="postContainer mb-2 col-lg-3 col-xl-4 ">
      <Card.Img variant="top" src={imageUrl} />

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {" "}
          <p>{description}</p>{" "}
          <p>
            {" "}
            {tags &&
              tags[0]
                ?.split(",")
                .map((tag) => <span className="ms-1">#{tag}</span>)}
          </p>
        </Card.Text>
      </Card.Body>
      <Link className="button-body" to={`/post/${postId}`}>
        <Button variant="primary">see More</Button>
      </Link>
    </Card>
  );
};

export default PostCard;
