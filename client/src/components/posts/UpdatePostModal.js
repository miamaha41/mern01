import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  //Contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);
  //Local state
  const [updatedPost, setUpdatedPost] = useState(post);
  const { title, description, url, status } = updatedPost;
  const onChangeUpdatedPost = (event) => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => setUpdatedPost(post), [post]);
  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  return (
    <>
      <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                onChange={onChangeUpdatedPost}
                value={title}
              />
              <Form.Text _id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                name="description"
                onChange={onChangeUpdatedPost}
                value={description}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control
                type="text"
                placeholder="Tutorial URL"
                name="url"
                onChange={onChangeUpdatedPost}
                value={url}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Control
                as="select"
                value={status}
                onChange={onChangeUpdatedPost}
                name="status"
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNED">LEARNED</option>
                <option value="LEARNING">LEARNING</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePostModal;
