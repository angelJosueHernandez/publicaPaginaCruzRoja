import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyCalendar from '../../Components/Calendar/Calendario';
const RegistroCitasForm = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [estado, setEstado] = useState(false);
  const [tipoServicio, setTipoServicio] = useState("");
  const [correo, setCorreo] = useState("");
  const [idCargo, setIdCargo] = useState("");

  const [tiposServicio, setTiposServicio] = useState([]);
  const [tiposCargo, setTiposCargo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada a la API para obtener los tipos de servicio
        const responseServicios = await fetch('https://apicruzroja.onrender.com/tiposServicio');
        const servicios = await responseServicios.json();
        
        // Llamada a la API para obtener los tipos de cargo (ajusta la URL si es necesario)
        const responseCargos = await fetch('');
        const cargos = await responseCargos.json();

        // Establece los datos en el estado
        setTiposServicio(servicios);
        setTiposCargo(cargos);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCita = {
      IdCita: Date.now(), // Generar un ID único
      Nombre: nombre,
      ApellidoP: apellidoP,
      ApellidoM: apellidoM,
      Fecha: fecha,
      Horario: horario,
      Estado: estado,
      TipoServicio: tipoServicio,
      Correo: correo,
      IdCargo: idCargo,
    };

    onSubmit(nuevaCita);

    // Limpiar el formulario
    setNombre("");
    setApellidoP("");
    setApellidoM("");
    setFecha("");
    setHorario("");
    setEstado(false);
    setTipoServicio("");
    setCorreo("");
    setIdCargo("");
  };

  return (
    <div>
    
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Registrar Cita</h2>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apellidoP" className="block text-gray-700">Apellido Paterno:</label>
        <input
          type="text"
          id="apellidoP"
          value={apellidoP}
          onChange={(e) => setApellidoP(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apellidoM" className="block text-gray-700">Apellido Materno:</label>
        <input
          type="text"
          id="apellidoM"
          value={apellidoM}
          onChange={(e) => setApellidoM(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fecha" className="block text-gray-700">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="horario" className="block text-gray-700">Horario:</label>
        <input
          type="time"
          id="horario"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
     
      <div className="mb-4">
        <label htmlFor="tipoServicio" className="block text-gray-700">Tipo de Servicio:</label>
        <select
          id="tipoServicio"
          value={tipoServicio}
          onChange={(e) => setTipoServicio(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        >
          <option value="">Selecciona un tipo de servicio</option>
          {tiposServicio.map((tipoServicio, index) => (
            <option key={index} value={tipoServicio.tipo_Servicio}>{tipoServicio.tipo_Servicio}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="correo" className="block text-gray-700">Correo:</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
    
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Registrar Cita</button>
    </form>
    <MyCalendar></MyCalendar>
   </div>
  );
};

RegistroCitasForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegistroCitasForm;
