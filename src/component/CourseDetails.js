import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoursebyId } from '../services/api';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CourseDetail = () => {
    const { id } = useParams();  // Retrieve the 'id' from the URL
    const [course, setCourse] = useState(null);  // State to store the course details
    const [loading, setLoading] = useState(true);  // State to handle loading

    useEffect(() => {
        // Fetch the course details using the id
        getCoursebyId(id)
            .then(response => {
                setCourse(response.data);  // Update the course state with fetched data
                setLoading(false);  // Stop the loading state
            })
            .catch(error => {
                console.error("There was an error fetching the course details!", error);
                setLoading(false);  // Stop the loading state even if there's an error
            });
    }, [id]);

    // If still loading, display "Loading..."
    if (loading) {
        return <p>Loading...</p>;
    }

    // If the course is null or undefined after loading, display an error message
    if (!course) {
        return <p>Course not found or an error occurred.</p>;
    }

    // Display the course details
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="my-4">
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{course.courseCode}</Card.Subtitle>
                            <Card.Text>{course.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CourseDetail;
