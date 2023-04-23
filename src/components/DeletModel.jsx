import React from "react";
import { Alert, Button } from "react-bootstrap";

export default function DeletModel({ state, setState, handleDelete }) {
  return (
    <>
      {state && (
        <div className="popup">
          <Alert variant="danger">
            Are you sure you want to delete the Post
            <Button
              variant="success"
              className="outline-secondary"
              onClick={() => handleDelete()}
            >
              Yes Delete
            </Button>
            <Button variant="info" onClick={() => setState(!state)}>
              Cancel
            </Button>
          </Alert>
        </div>
      )}
    </>
  );
}
