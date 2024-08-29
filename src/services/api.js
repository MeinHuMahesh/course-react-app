import axios from 'axios';

const API_URL='http://localhost:9090/api';


export const createCourse = (course)=>axios.post(`${API_URL}/course`,course);
export const getCourses =()=>axios.get(`${API_URL}/courses`);
export const getCoursebyId=(id)=>axios.get(`${API_URL}/course/${id}`);
export const deleteCoursebyId=(id)=>axios.delete(`${API_URL}/course/${id}`);

export const createInstance=(instance)=>axios.post(`${API_URL}/instance`,instance);
export const deleteInstanceById=(year,semester,id)=>axios.delete(`${API_URL}/instance/${year}/${semester}/${id}`);
export const getInstancesByYearAndSemester=(year,semester)=>axios.get(`${API_URL}/instance/${year}/${semester}`);
export const getInstanceByYearSemesterAndCourseId=(year,semester,id)=>axios.get(`${API_URL}/instance/${year}/${semester}/${id}`);