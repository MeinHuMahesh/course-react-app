
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createCourse } from '../services/api';

const AddCourse = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        createCourse(data)
            .then(() => {
                reset();
                alert("Course created successfully!");
            })
            .catch((error) => {
                console.error("There was an error creating the course!", error);
            });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center my-4">Add New Course</h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="title">
                            <Form.Label>Course Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course title"
                                {...register("title", { required: "Title is required" })}
                                isInvalid={errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="courseCode" className="mt-3">
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course code"
                                {...register("courseCode", { required: "Course code is required" })}
                                isInvalid={errors.courseCode}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.courseCode?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="description" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter course description"
                                {...register("description", { required: "Description is required" })}
                                isInvalid={errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddCourse;
