import { Button } from "react-bootstrap";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
const ActionButtons = ({ url, _id }) => {
  const { deletePost, setShowToast, findPost, setShowUpdatePostModal } =
    useContext(PostContext);
  const onClickHandler = async () => {
    const { success, message } = await deletePost(_id);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  const choosePost = () => {
    findPost(_id);
    setShowUpdatePostModal(true);
  };
  return (
    <>
      <Button
        className="post-button mr-3"
        href={url}
        target="_blank"
        variant="outline-info"
      >
        <img src={playIcon} alt="play" height="20" weight="20" />
      </Button>
      <Button
        className="post-button"
        onClick={choosePost}
        variant="outline-success"
      >
        <img src={editIcon} alt="edit" height="20" weight="20" />
      </Button>
      <Button
        className="post-button"
        onClick={onClickHandler}
        variant="outline-danger"
      >
        <img src={deleteIcon} alt="delete" height="20" weight="20" />
      </Button>
    </>
  );
};

export default ActionButtons;
