import React, { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";

import { useFetch } from "../hooks/useFetch";

import { useNavigate } from "react-router-dom";

function EditModel({ id }) {
  //Stats for the Update of the post
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [show, setShow] = useState(false);

  const [postPhotoError, setPostPhotoError] = useState("");
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    /** A clean up to the input type file so it will only take the last file we upload */
    setMediaUrl(null);

    let selected = e.target.files[0];

    if (!selected) {
      setPostPhotoError("Please select an image file");

      return;
    }
    /** To check if the file uploaded is an Image or not */
    if (!selected.type.includes("image")) {
      setPostPhotoError("The File must be an image");
      return;
    }
    /** To check to file size */
    if (selected.size > 900000) {
      setPostPhotoError("Image file must be less than 100kb");
      return;
    }
    setPostPhotoError(null);
    setMediaUrl(selected);
    console.log("thumbnail updated");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedForm = new FormData();
    updatedForm.append("title", title);
    updatedForm.append("description", description);
    updatedForm.append("mediaUrl", mediaUrl);
    try {
      const response = await fetch(`http://localhost:3001/posts/patch/${id}`, {
        method: "PATCH",

        body: updatedForm,
      });
      console.log("update response", response);
      setTimeout(() => {
        setShow(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button variant="success ms-2" onClick={handleShow}>
        Edit post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-between"
          >
            <Form className="lg-col-6" onSubmit={(e) => handleUpdate(e)}>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What is the Story"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Media:</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
                <Form.Text className="text-muted text-light">
                  {postPhotoError ? (
                    <div>{postPhotoError}</div>
                  ) : (
                    "Media should be imges only with 100Kb"
                  )}
                </Form.Text>
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModel;
