import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Loading from "../../components/Loading";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEdit.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    prep_time_minutes: 0,
    cooking_time_minutes: 0,
    ingredients: "",
    method: "",
    image: "",
    difficulty: "",
  });
  const {
    title,
    prep_time_minutes,
    cooking_time_minutes,
    ingredients,
    method,
    difficulty,
    image,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("prep_time_minutes", prep_time_minutes);
    formData.append("cooking_time_minutes", cooking_time_minutes);
    formData.append("method", method);
    formData.append("ingredients", ingredients);
    formData.append("difficulty", difficulty);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
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
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.ingredients?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Method</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="method"
          value={method}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.method?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Prep Time</Form.Label>
        <Form.Control
          type="number"
          name="prep_time_minutes"
          value={prep_time_minutes}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.prep_time_minutes?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Cooking Time</Form.Label>
        <Form.Control
          type="number"
          name="cooking_time_minutes"
          value={cooking_time_minutes}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.cooking_time_minutes?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Difficulty</Form.Label>
        <Form.Control
          as="select"
          defaultValue="medium"
          name="difficulty"
          onChange={handleChange}
          aria-label="difficulty"
        >
          <option value="beginner">Beginner</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </Form.Control>
      </Form.Group>

      <Button onClick={() => history.goBack()}>cancel</Button>
      <Button type="submit">create</Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={`d-flex flex-column justify-content-center`}>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={styles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label className={`btn`} htmlFor="image-upload">
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className={`d-flex justify-content-center`}
                  htmlFor="image-upload"
                >
                  <Loading
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

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

export default PostCreateForm;
