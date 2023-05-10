// Import required packages and modules
import { useNavigate, useParams } from "react-router-dom"; // For creating links and getting URL parameters
import { useFetch } from "../../hooks/useFetch"; // Custom hook for fetching data
import imgPlaceHolder from "../../assets/no_image_placeholder.png"; // Default image to display if post has no image
import { useState } from "react"; // For using state in the component
import { Alert, Button } from "react-bootstrap"; // Bootstrap components for displaying alerts and buttons
import { DeletModel, EditModel } from "../../components/index"; // Component for confirming deletion
import { useAuthContext } from "../../hooks/useAuthContext"; // Custom hook for getting user information from context

import "./Post.css";
// Define Post component
const Post = () => {
  // Get user information from context
  const { user } = useAuthContext();
  // Get post ID from URL parameters
  const { id } = useParams();
  // Use state to determine when to display post details
  const [show, setShow] = useState(false);
  // Fetch post data using custom hook and post ID
  const { data, error } = useFetch(`http://localhost:3001/posts/${id}`);
  // Use state to determine if user wants to delete post
  const [deletePost, setDeletePost] = useState(false);
  // Use state to display any errors that occur during post deletion
  const [deleteError, setDeleteError] = useState();
  // Use setTimeout to delay displaying post details until fetch is complete

  const navigate = useNavigate();

  setTimeout(() => {
    setShow(true);
  }, 500);
  // Define function to handle post deletion
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the API to delete the post with the given ID
      const response = await fetch(`http://localhost:3001/posts/delete/${id}`, {
        method: "DELETE",
      });
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      // If there is an error during deletion, display the error message
      setDeleteError(err);
    }
  };
  // Render the component
  return (
    <div className="homeContainer showPostContainer ">
      {/* Display post details if show is true */}
      {show && (
        <>
          <div className="text-center container">
            {/* Display post image, or default image if post has no image */}
            <img
              src={data[0] ? data[0]?.mediaUrl : imgPlaceHolder}
              alt=""
              style={{ width: "200px" }}
            />
          </div>
          <div className="mt-3 text-container">{data[0]?.title}</div>
          <div className="mt-3 text-container">{data[0]?.description}</div>
          {/* Display Delete and Edit buttons if user is the author of the post */}
          {user._id === data[0].user ? (
            <>
              <Button
                variant="danger"
                onClick={() => setDeletePost(!deletePost)}
              >
                Delete Post
              </Button>
              {/* Link to edit post page
              <Link to={`/editpost/:${data[0]._id}`}>
                <Button variant="success" className="ms-2">
                  {" "}
                  Edit Post
                </Button>
              </Link> */}

              <EditModel id={id} />
            </>
          ) : (
            // If user is not the author, do not display any buttons
            ""
          )}
          {/* Display delete confirmation modal */}
          <DeletModel
            state={deletePost}
            setState={setDeletePost}
            handleDelete={handleDelete}
          />
        </>
      )}
      {/* Display any errors that occur during post deletion */}
      {error && <Alert variant="danger">{error || deleteError}</Alert>}
    </div>
  );
};

export default Post;
