import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import CourseForm from '../components/CourseForm';
import { courseService } from '../services/courseService';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const result = await courseService.getCourses();
    if (result.success) setCourses(result.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    await courseService.toggleCourseStatus(id);
    fetchCourses();
  };

  const handleEdit = (id) => alert(`Editar curso con ID: ${id}`);
  const handleViewDetails = (id) => alert(`Ver detalles del curso con ID: ${id}`);

  return (
    <div className="courses-page">
      <h1>Cursos</h1>
      <CourseForm onCourseCreated={fetchCourses} />
      <div className="courses-list">
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
            onViewDetails={handleViewDetails} 
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
