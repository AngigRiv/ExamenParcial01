"use client";
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function PropiedadesForm() {
  const [propiedad, setPropiedad] = useState({
    nombre: "",
    direccion: "",
    caracteristicas: "",
    estado: "",
    precioalquiler: "",
  });

  const options = [
    { value: 'List', label: 'List' },
    { value: 'Ocupada', label: 'Ocupada' },
    { value: 'Mantenimiento', label: 'Mantenimiento' },
  ];

  const [selectedState, setSelectedState] = useState('');

  const validateNombre = (value) => {
    if (!value) {
      return "El nombre es obligatorio";
    }
    return "";
  };

  const validateDireccion = (value) => {
    if (!value) {
      return "La dirección es obligatoria";
    }
    return "";
  };

  const validateCaracteristicas = (value) => {
    if (!value) {
      return "Las caracteristicas son obligatorias";
    }
    return "";
  };

  const validateEstado = (value) => {
    if (!value) {
      return "Elige un tipo de estado";
    }
    return "";
  };

  const validatePrecioAlquiler = (value) => {
    if (!value) {
      return "El precio de alquiler es obligatorio";
    }
    return "";
  };

  const [errors, setErrors] = useState({
    nombre: "",
    direccion: "",
    caracteristicas: "",
    precioalquiler: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "nombre") {
      error = validateNombre(value);
    } else if (name === "direccion") {
      error = validateDireccion(value);
    } else if (name === "caracteristicas"){
      error = validateCaracteristicas(value);
    } else if (name === "estado"){
      error = validateEstado(value);
    } else if (name == "precioalquiler"){
      error = validatePrecioAlquiler(value);
    }

    setErrors({ ...errors, [name]: error });

    if (name === "estado") {
      setSelectedState(value);
    } else {
      setPropiedad({
        ...propiedad,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    if (!selectedState) {
      newErrors.estado = "Debes seleccionar un estado";
      formIsValid = false;
    }

    if (!propiedad.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
      formIsValid = false;
    }

    if (!propiedad.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria";
      formIsValid = false;
    }

    if (!propiedad.caracteristicas.trim()) {
      newErrors.caracteristicas = "Las caracteristicas son obligatorias";
      formIsValid = false;
    }

    if (!propiedad.precioalquiler.trim()) {
      newErrors.estado = "El precio alquiler es obligatorio";
      formIsValid = false;
    }

    if (formIsValid) {
      const updatedPropiedad = {
        ...propiedad,
        estado: selectedState,
      };

      const res = await axios.post('/api/propiedades', updatedPropiedad);

      if (res.status === 200) {
        location.href = "/propiedades";
      } else {
        alert("Error en el registro");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='m-8'>
      <h2 className="text-2xl font-extrabold text-gray-400 hover:text-gray-800">Propiedades
        <a href="/propiedades/" className="bg-blue-500 hover-bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mt-5"> Regresar </a>
      </h2>
      <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4 rounded-md shadow-md bg-gray-50'>
        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="nombre">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          onChange={handleChange}
          value={propiedad.nombre}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
          placeholder="Ingrese el nombre"
        />
        {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="direccion">
          Dirección
        </label>
        <input
          type="text"
          name="direccion"
          onChange={handleChange}
          value={propiedad.direccion}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
          placeholder="Ingrese la dirección"
        />
        {errors.direccion && <div className="text-red-500">{errors.direccion}</div>}

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="caracteristicas">
          Características
        </label>
        <input
          type="text"
          name="caracteristicas"
          onChange={handleChange}
          value={propiedad.caracteristicas}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
          placeholder="Ingrese las características"
        />
        {errors.caracteristicas && <div className="text-red-500">{errors.caracteristicas}</div>}

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="estado">
          Estado
        </label>
        <select
          name="estado"
          onChange={handleChange}
          value={selectedState}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
        >
          <option value="">Selecciona un estado</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.estado && <div className="text-red-500">{errors.estado}</div>}

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="precioalquiler">
          Precio Alquiler
        </label>
        <input
          type="text"
          name="precioalquiler"
          onChange={handleChange}
          value={propiedad.precioalquiler}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
          placeholder="Ingrese el precio de alquiler"
          
        />
        {errors.precioalquiler && <div className="text-red-500">{errors.precioalquiler}</div>}
        <button className='bg-blue-500 hover-bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mt-5'>Guardar</button>
      </form>
    </div>
  );
}

export default PropiedadesForm;