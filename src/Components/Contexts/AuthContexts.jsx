
/**
// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verificacionCorreo, setVerificacionCorreo] = useState(null);
  const [sig, setSig] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [metodo, setMetodo]=useState(null);
  const [contraActualizar, setContraActualizar] = useState(null);
  const [contraActualizar2, setContraActualizar2] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [numero, setNumero] = useState(null);
  const [isMethodSelected, setIsMethodSelected] = useState(false);
  const [contraCo, setContraCo]=useState(false);
  const [contraCo2, setContraCo2]=useState(false);
  const [correoGuardar, setCorreoGuardar] = useState(null);
  const [correoCookieUser, setCorreoCookieUser] = useState(null);
  const [idCookieUser, setIdCookieUser] = useState(null);
  const [nombreCookieUser, setNombreCookieUser] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, token, setToken, metodo, setMetodo, sig, setSig, isMethodSelected, setIsMethodSelected,
    contraActualizar, setContraActualizar, contraActualizar2, setContraActualizar2, correo, setCorreo,  numero, setNumero,
    contraCo, setContraCo, contraCo2, setContraCo2 , correoGuardar, setCorreoGuardar, correoCookieUser, setCorreoCookieUser, idCookieUser,
    setIdCookieUser, nombreCookieUser, setNombreCookieUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
 */




import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';




const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [user, setUser] = useState(null);
  const [avatarColor, setAvatarColor] = useState(null); // Estado para color del avatar
  const [token, setToken] = useState(null); // Si decides usarlo en el futuro
  const [metodo, setMetodo] = useState(null);
  const [contraActualizar, setContraActualizar] = useState(null);
  const [contraActualizar2, setContraActualizar2] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [numero, setNumero] = useState(null);
  const [isMethodSelected, setIsMethodSelected] = useState(false);
  const [contraCo, setContraCo] = useState(false);
  const [contraCo2, setContraCo2] = useState(false);
  const [correoGuardar, setCorreoGuardar] = useState(null);
  const [correoCookieUser, setCorreoCookieUser] = useState(null);
  const [idCookieUser, setIdCookieUser] = useState(null);
  const [nombreCookieUser, setNombreCookieUser] = useState(null);

  useEffect(() => {
    // Simula la verificación inicial del estado de autenticación
    const checkAuth = async () => {
      const token = Cookies.get('jwt');

      if (token) {
        try {
          const response = await fetch('https://api-beta-mocha-59.vercel.app/verifyToken', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
            credentials: 'include',
          });

          const result = await response.json();

          if (result.mensaje === "Token válido") {
            const decodedToken = jwtDecode(token);
            setIsAuthenticated(decodedToken.IsAuthenticated);
            setCorreoCookieUser(decodedToken.correo);
            setIdCookieUser(decodedToken.id);
            setNombreCookieUser(decodedToken.nombre);
            setUser(decodedToken.nombre);

          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error al verificar el token:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false); // Indica que la carga ha terminado
    };

    checkAuth();
  }, []);



  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      avatarColor,
      setAvatarColor,
      token,
      setToken,
      metodo,
      setMetodo,
      contraActualizar,
      setContraActualizar,
      contraActualizar2,
      setContraActualizar2,
      correo,
      setCorreo,
      numero,
      setNumero,
      isMethodSelected,
      setIsMethodSelected,
      contraCo,
      setContraCo,
      contraCo2,
      setContraCo2,
      correoGuardar,
      setCorreoGuardar,
      correoCookieUser,
      setCorreoCookieUser,
      idCookieUser,
      setIdCookieUser,
      nombreCookieUser,
      setNombreCookieUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};