import React, { useState } from 'react';
import { courseService } from '../services/courseService';

const CourseForm = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    category: '',
    is_active: true
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await courseService.createCourse({
        ...formData,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price)
      });

      if (result.success) {
        setMessage('Curso creado exitosamente!');
        setFormData({
          title: '',
          description: '',
          instructor: '',
          duration: '',
          price: '',
          category: '',
          is_active: true
        });
        if (onCourseCreated) onCourseCreated();
      } else {
        setMessage('Error al crear el curso: ' + result.error);
      }
    } catch (error) {
      setMessage('Error al conectar con el backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form">
      <h2>Crear Nuevo Curso</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" required />
        <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor" required />
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duración (horas)" required />
        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Precio" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Categoría" required />
        <label>
          <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
          Curso activo
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear Curso'}</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CourseForm;
