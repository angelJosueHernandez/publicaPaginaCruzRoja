import React from 'react';
import { DefaultSkeleton } from '../Servicios/DefaultSkeleton';
import { useAuth } from '../../Components/Contexts/AuthContexts';
import { Navigate } from 'react-router-dom';
import TableContratacion from '../../Components/Tables/TableContratacion';
import TableCitas from '../../Components/Tables/TableCitas';
import TablePerfil from '../../Components/Tables/TablePerfil';
import './Perfil.css'

export default function Perfil() {
  const { isAuthenticated, loading, user, avatarColor } = useAuth();

  if (loading) {
    return <DefaultSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  return (
    <div>
      <div className='contenedorPerfil'>
        <TablePerfil/>
        <TableCitas/>
        <TableContratacion/>
      </div>
    </div>
  );
}
