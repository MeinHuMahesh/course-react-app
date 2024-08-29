import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { getCourses, createInstance } from '../services/api';


const AddInstance = () => {
    const [courses, setCourses] = useState([]);
    const [courseID, setCourseID] = useState();
    const [year, setYear] = useState();
    const [semester, setSemester] = useState();
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        getCourses()
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the courses!", error);
            });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!courseID) formErrors.courseID = "Course is required.";
        if (!year || year < 2000 || year > new Date().getFullYear()) formErrors.year = "Enter a valid year.";
        if (!semester || ![1, 2].includes(parseInt(semester))) formErrors.semester = "Select a valid semester.";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const instanceData = { 
            courseID:parseInt(courseID,10),
            year:parseInt(year,10),
            semester:parseInt(semester,10)};
        createInstance(instanceData)
            .then(() => {
                setSuccessMessage('Course instance added successfully!');
                setCourseID('');
                setYear('');
                setSemester('');
                setErrors({});
            })
            .catch(error => {
                console.error("There was an error adding the course instance!", error);
            });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center my-4">Add Course Instance</h2>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="courseId">
                            <Form.Label>Course</Form.Label>
                            <Form.Control
                                as="select"
                                value={courseID}
                                onChange={(e) => setCourseID(e.target.value)}
                                isInvalid={!!errors.courseID}
                            >
                                <option value="">Select a course</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.courseID}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="year" className="mt-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                isInvalid={!!errors.year}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.year}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="semester" className="mt-3">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                                as="select"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                isInvalid={!!errors.semester}
                            >
                                <option value="">Select Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.semester}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Add Instance
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddInstance;
