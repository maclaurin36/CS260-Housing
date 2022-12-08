import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Renters from "./pages/Renters/Renters";
import Listings from "./pages/Listings/Listings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";

export default function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route 
                        path="renters" 
                        element={
                            <ProtectedRoute>
                                <Renters />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="listings" 
                        element={
                            <ProtectedRoute>
                                <Listings />
                            </ProtectedRoute>
                        } 
                    />
                    <Route
                        path="register"
                        element={
                            <ProtectedRoute>
                                <Register />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />}  />
                  </Route>
              </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
