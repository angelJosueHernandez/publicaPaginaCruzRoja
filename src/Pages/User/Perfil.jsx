import React from 'react';
import { DefaultSkeleton } from '../Servicios/DefaultSkeleton';
import { useAuth } from '../../Components/Contexts/AuthContexts';
import { Navigate } from 'react-router-dom';

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
      <h1>Perfil Privado</h1>
      <div style={{ backgroundColor: avatarColor, width: '50px', height: '50px', borderRadius: '50%' }}></div>
      <p>Username: {user}</p>
      {/* Aquí puedes mostrar más detalles del perfil si es necesario */}
    </div>
  );
}
