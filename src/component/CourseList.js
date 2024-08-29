import React,{useState,useEffect} from "react";
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {Table,Button} from 'react-bootstrap';
import { getCourses,deleteCoursebyId } from "../services/api";
import './CourseList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

 
const CourseList =()=>{
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        getCourses().then(response=>{
            setCourses(response.data);
        }).catch(err=>{
            console.error("There was an error fetching the courses!",err);
        });
    },[]);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            deleteCoursebyId(id)
                .then(() => {
                    CourseList(); // Refresh the course list after deletion
                })
                .catch(error => {
                    console.error("There was an error deleting the course!", error);
                });
        }
    };
    const tablestyle={
        width:"70%",
        margin:"10% auto",
        fontSize:"12px"
    }
   
    return (
 
        <Table striped bordered hover responsive style={tablestyle} >
            <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Course Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course=>(
                    <tr key={course.id}>
                        <td>{course.courseCode}</td>
                        <td>{course.title}</td>
                        <td>{course.description}</td>
                        <td>
                        <Link to={`/course/${course.id}`}>
                            <Button variant="info" size="sm" className="me-2"><FaEye/></Button>
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}> <FaTrash/> </Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default CourseList;