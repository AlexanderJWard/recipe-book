import React from "react";
import styles from "../../styles/Todo.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Todo = (props) => {
  const {
    id,
    owner,
    title,
    task_complete,
    updated_at,
    todoPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/todo/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/todo/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Todo}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && todoPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        <p>test</p>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {task_complete && <Card.Title className="">{task_complete}</Card.Title>}
      </Card.Body>
    </Card>
  );
};

export default Todo;