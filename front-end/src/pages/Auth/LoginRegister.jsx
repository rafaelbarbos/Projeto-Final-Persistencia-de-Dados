import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Tabs,
    Tab,
    Fade,
    useTheme,
    InputAdornment,
    IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff, Email, Person, Lock } from '@mui/icons-material';
import { authService } from '../../services';

const LoginRegister = () => {
    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();
    const theme = useTheme();

    // Form states
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!loginData.email || !loginData.password) {
            toast.error("Preencha todos os campos!");
            return;
        }

        setLoading(true);
        try {
            await authService.login(loginData.email, loginData.password);
            toast.success("Login realizado com sucesso!");
            nav('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Erro ao fazer login.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!registerData.name || !registerData.email || !registerData.password) {
            toast.error("Preencha todos os campos!");
            return;
        }
        // Email validation regex (simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registerData.email)) {
            toast.error("Email inválido!");
            return;
        }

        setLoading(true);
        try {
            await authService.register(registerData);
            toast.success("Cadastro realizado com sucesso!");
            nav('/');
        } catch (error) {
            console.error(error);
            toast.error("Erro ao registrar usuário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Example Deep Blue Gradient
                padding: 2
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.9)', // Glass-ish
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label="Login" />
                    <Tab label="Registrar" />
                </Tabs>

                <Box sx={{ p: 4 }}>
                    {/* LOGIN FORM */}
                    {tabValue === 0 && (
                        <Fade in={tabValue === 0}>
                            <form onSubmit={handleLoginSubmit}>
                                <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="primary">
                                    Bem-vindo de volta!
                                </Typography>
                                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                                    Acesse sua conta para continuar.
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    margin="normal"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Senha"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    margin="normal"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    disabled={loading}
                                    sx={{ mt: 3, mb: 2, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem' }}
                                >
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </Button>
                            </form>
                        </Fade>
                    )}

                    {/* REGISTER FORM */}
                    {tabValue === 1 && (
                        <Fade in={tabValue === 1}>
                            <form onSubmit={handleRegisterSubmit}>
                                <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="primary">
                                    Crie sua conta
                                </Typography>
                                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                                    Preencha os dados abaixo para se cadastrar.
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="Nome Completo"
                                    name="name"
                                    variant="outlined"
                                    margin="normal"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    margin="normal"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Senha"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    margin="normal"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    disabled={loading}
                                    sx={{ mt: 3, mb: 2, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem' }}
                                >
                                    {loading ? 'Registrando...' : 'Registrar'}
                                </Button>
                            </form>
                        </Fade>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginRegister;
