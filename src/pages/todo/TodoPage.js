import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Todo from "./Todo";

function TodoPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState({ results: [] });


  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: todo }] = await Promise.all([
          axiosReq.get(`/todo/${id}`),
        ]);
        setTodo({ results: [todo] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Todo {...todo.results[0]} setTodo={setTodo} todoPage />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default TodoPage;
