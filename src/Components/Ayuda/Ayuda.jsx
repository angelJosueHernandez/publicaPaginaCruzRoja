import React, { useState } from 'react';
import './Ayuda.css';
import { headerBooks2 } from '../../Data/Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import headerShape from '../../assets/header-shape.svg';
import { Link } from 'react-router-dom';

export default function Ayuda() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [routeUrl, setRouteUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const cruzRojaLocation = { latitude: 21.1435, longitude: -98.4197 }; // Coordenadas de la Cruz Roja en Huejutla de Reyes

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          getAddress(latitude, longitude);
          getRoute(cruzRojaLocation, { latitude, longitude });
        },
        (error) => {
          alert('Error obteniendo ubicación: ' + error.message);
        }
      );
    } else {
      alert('Geolocalización no es soportada por este navegador.');
    }
  };

  const getAddress = (latitude, longitude) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`)
      .then(response => response.json())
      .then(data => {
        if (data.address) {
          const address = `${data.address.road || ''}, ${data.address.neighbourhood || ''}, ${data.address.city || ''}, ${data.address.state || ''}, ${data.address.country || ''}`;
          setAddress(address);
          setModalIsOpen(true);
        } else {
          alert('No se pudo obtener la dirección.');
        }
      })
      .catch(error => {
        console.error('Error al obtener la dirección:', error);
        alert('Error al obtener la dirección.');
      });
  };

  const getRoute = (start, end) => {
    const origin = `${start.latitude},${start.longitude}`;
    const destination = `${end.latitude},${end.longitude}`;
    const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    setRouteUrl(routeUrl);
  };

  const handleConfirm = () => {
    setModalIsOpen(false);
    if (location) {
      const message = `Necesito ayuda. Mi ubicación es: ${address}. Coordenadas: https://www.google.com/maps?q=${location.latitude},${location.longitude}. Ruta: ${routeUrl}`;
      const whatsappLink = `https://wa.me/5535518659?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    } else {
      alert('No se pudo obtener la ubicación. Intenta nuevamente.');
    }
  };

  return (
    <header>
      <div className="header-container">
        <Swiper spaceBetween={50} slidesPerView={1} navigation pagination>
          {
            headerBooks2.map(({ title, info, img, btnLink }, index) => (
              <SwiperSlide key={index}>
                <div className="header-wrapper container">
                  <div className="header-left">
                    <h1>{title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: info }}></p>
                    <button className='btn btn-border2' onClick={getLocation}>Ayuda</button>
                  </div>
                  <div className="header-right">
                    <img src={img} alt='' />
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="header-shape">
          <img src={headerShape} alt='' />
        </div>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center text-red-700">Confirmación De Envío</h2>
            <p className="mb-4 text-gray-700">Estás a punto de enviar tu ubicación a un número de WhatsApp. Si envías información falsa, podrías recibir una penalización ciudadana.</p>
            <p className="mb-4 text-gray-700">Dirección: {address}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setModalIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
