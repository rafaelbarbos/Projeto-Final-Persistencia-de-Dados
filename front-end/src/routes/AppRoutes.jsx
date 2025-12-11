import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from '../services';
import Home from '../pages/Home/Home';
import LoginRegister from '../pages/Auth/LoginRegister';
import TouristSpotDetails from '../pages/PontosTuristicos/TouristSpotDetails';
import PointForm from '../pages/Admin/PointForm';
import IntegrationPanel from '../pages/Admin/IntegrationPanel';

const AppRoutes = () => {
    // Basic protection logic placeholder
    const isAuthenticated = () => {
        return authService.isAuthenticated();
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/" element={<Home />} />
                <Route path="/detalhes/:id" element={<TouristSpotDetails />} />
                <Route path="/pontos/novo" element={<PrivateRoute><PointForm /></PrivateRoute>} />
                <Route path="/pontos/editar/:id" element={<PrivateRoute><PointForm /></PrivateRoute>} />
                <Route path="/admin/integracao" element={<PrivateRoute><IntegrationPanel /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
