import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function EditPost() {
  const { id } = useParams();
  const { data, error } = useFetch(`http://localhost:3001/posts/${id}`);
  const [show, setShow] = useState(false);

  //Form state

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [tags, setTags] = useState("");

  //Show and hide the Edit input for the Fields
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showDescEdit, setShowDescEdit] = useState(false);

  setTimeout(() => {
    setShow(true);

    data[0].tags.map((tag) => console.log(tag));
  }, 900);
  return (
    <div className="homeContainer">
      {show && (
        <Form>
          <div>
            <p>
              {data[0].title}{" "}
              {/** An Input type Button to stop the Default action fo a button in the From  */}
              <input
                onClick={() => setShowTitleEdit(!showTitleEdit)}
                type="button"
                value="Edit"
              />
            </p>
            {showTitleEdit && (
              <input
                className="d-block"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            )}
          </div>
          <div>
            <p>
              {data[0].description}{" "}
              {/** An Input type Button to stop the Default action fo a button in the From  */}
              <input
                onClick={() => setShowDescEdit(!showDescEdit)}
                type="button"
                value="Edit"
              />
            </p>
            {showDescEdit && (
              <input
                className="d-block"
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "100px" }}
              />
            )}
          </div>
          <div>
            <p>
              {data[0]?.tags?.map((tag) => (
                <span>{tag.label}</span>
              ))}
            </p>
          </div>
          <Button type="submit">Save Changes</Button>
        </Form>
      )}
    </div>
  );
}
