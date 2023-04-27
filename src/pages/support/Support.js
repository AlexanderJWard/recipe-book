import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import { Card } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";

const Support = (props) => {
  const {
    id,
    owner,
    title,
    status,
    issue,
    email_address,
    screenshot,
    updated_at,
    supportPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/support_tickets/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/support_tickets/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card>
      <div className="d-flex align-items-center">
        <span>{updated_at}</span>
        {is_owner && supportPage && (
          <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </div>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {status && <Card.Text>{status}</Card.Text>}
        {issue && <Card.Text>{issue}</Card.Text>}
        {email_address && <Card.Text>{email_address}</Card.Text>}
        {screenshot && <Card.Img>{screenshot}</Card.Img>}
      </Card.Body>
    </Card>
  );
};

export default Support;
