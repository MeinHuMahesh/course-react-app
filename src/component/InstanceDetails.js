import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInstanceByYearSemesterAndCourseId } from '../services/api';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

const InstanceDetails = () => {
  
    const { year, semester, courseID } = useParams();
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getInstanceDetails = () => {
           

            getInstanceByYearSemesterAndCourseId(parseInt(year,10), parseInt(semester,10), parseInt(courseID,10))
                .then(response => {
                    setInstance(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching Instance Details", error);
                    setLoading(false);
                    setError(
                        error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred'
                    );
                });
        };

        getInstanceDetails();
    }, [courseID, year, semester]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    {instance && (
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>{instance.course.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{instance.course.code}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Year:</strong> {instance.year}<br/>
                                    <strong>Semester:</strong> {instance.semester}<br/>
                                    <strong>Description:</strong> {instance.course.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default InstanceDetails;
