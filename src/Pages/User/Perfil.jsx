import React, { useState, useEffect } from 'react';
import { DefaultSkeleton } from '../Servicios/DefaultSkeleton';
import { useAuth } from '../../Components/Contexts/AuthContexts';
import { Navigate } from 'react-router-dom';
import TableContratacion from '../../Components/Tables/TableContratacion';
import TableCitas from '../../Components/Tables/TableCitas';
import TablePerfil from '../../Components/Tables/TablePerfil';
import './Perfil.css'

export default function Perfil() {
  const { isAuthenticated, loading, user, avatarColor } = useAuth();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // Simula un retardo de 3 segundos antes de ocultar el skeleton
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);

    // Limpia el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSkeleton) {
    return <DefaultSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Iniciar Sesion" />;
  }

  return (
    <div>
      <div className='contenedorPerfil'>
        <TablePerfil />
        <TableCitas />
        <TableContratacion />
      </div>
    </div>
  );
}
