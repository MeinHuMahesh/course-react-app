import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import { getInstancesByYearAndSemester,deleteInstanceById } from '../services/api';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';

const ListInstance = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [instances, setInstances] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchInstances = () => {
        setLoading(true);
        getInstancesByYearAndSemester(year, semester)
            .then(response => {
                setInstances(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the course instances!", error);
                setLoading(false);
            });
    };
    const handleDelete = (year,semester,id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            deleteInstanceById(year,semester,id)
                .then(() => {
                    ListInstance(); // Refresh the instance list after deletion
                })
                .catch(error => {
                    console.error("There was an error deleting the course!", error);
                });
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1 className="text-center">Course Instances</h1>
                    <Form>
                        <Form.Group controlId="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="semester">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                                as="select"
                                value={semester} required
                                onChange={(e) => setSemester(e.target.value)}
                            >
                                <option value="">Select Semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="mt-3"
                            onClick={handleFetchInstances}
                            disabled={loading || !year || !semester}
                        >
                            {loading ? 'Loading...' : 'Get Instances'}
                        </Button>
                    </Form>

                    {instances.length > 0 && (
                        <Table striped bordered hover responsive className="mt-4">
                            <thead>
                                <tr>
                                    <th>Course Title</th>
                                    <th>Year-Semester</th>
                                    <th>Course Code</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instances.map(instance => (
                                    <tr key={instance.id}>
                                        <td>{instance.course.title}</td>
                                        <td>{instance.year}-{instance.semester}</td>
                                        <td>{instance.course.courseCode}</td>
                                        <td>
                                            <Link to={`/instance/${instance.year}/${instance.semester}/${instance.course.id}`}>
                                            <Button variant="info" size="sm"><FaEye/></Button>
                                            </Link>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(instance.year,instance.semester,instance.course.id)}> <FaTrash/> </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    {instances.length === 0 && !loading && year && semester && (
                        <p>No instances found for the selected year and semester.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ListInstance;
