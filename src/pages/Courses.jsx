import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";
import { courseService } from "../services/courseService";
import { PlusCircle } from "lucide-react";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
      {/* Header */}
      <div className="courses-header">
        <h1>📚 Cursos</h1>
        <button onClick={() => setShowForm(!showForm)}>
          <PlusCircle size={20} />
          {showForm ? "Cerrar" : "Nuevo Curso"}
        </button>
      </div>

      {/* Contenedor principal: formulario + lista */}
      <div className="courses-main">
        {/* Formulario */}
        {showForm && (
          <div className="courses-form">
            <CourseForm onCourseCreated={fetchCourses} />
          </div>
        )}

        {/* Lista de cursos */}
        <div className="courses-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <div className="courses-empty">
              No hay cursos disponibles. 🚀
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
