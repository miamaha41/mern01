import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //Contexts
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url } = newPost;
  const onChangeNewPost = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };
  const resetAddPostData = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };
  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  return (
    <>
      <Modal show={showAddPostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn?</Modal.Title>
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
                onChange={onChangeNewPost}
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
                onChange={onChangeNewPost}
                value={description}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control
                type="text"
                placeholder="Tutorial URL"
                name="url"
                onChange={onChangeNewPost}
                value={url}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Learn It
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddPostModal;
