import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function TodoCreateForm() {
  const [errors, setErrors] = useState({});

  const [todoData, setTodoData] = useState({
    title: "",
    task_complete: false,
  });
  const { title, task_complete } = todoData;

  const history = useHistory();

  const handleChange = (event) => {
    setTodoData({
      ...todoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("task_complete", task_complete);

    try {
      const { data } = await axiosReq.post("/todo/", formData);
      history.push(`/todo/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const inputFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Task Complete? (TRUE / FALSE)</Form.Label>
        <Form.Control
          type="text"
          name="task_complete"
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button onClick={() => history.goBack()}>cancel</Button>
      <Button type="submit">create</Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={`d-flex flex-column justify-content-center`}>
            <div className="d-md-none">{inputFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container>{inputFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TodoCreateForm;
