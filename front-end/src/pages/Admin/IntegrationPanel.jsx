import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Grid,
    Alert,
    Snackbar,
    Divider,
    Stack,
    CircularProgress
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import TableViewIcon from '@mui/icons-material/TableView';
import CodeIcon from '@mui/icons-material/Code';
import { integrationService } from '../../services';

const IntegrationPanel = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleExport = async (format) => {
        setLoading(true);
        try {
            await integrationService.exportData(format.toLowerCase());
            setNotification({
                open: true,
                message: `Exportação para ${format} realizada com sucesso!`,
                severity: 'success'
            });
        } catch (error) {
            console.error(error);
            setNotification({
                open: true,
                message: 'Erro ao exportar dados.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async () => {
        if (!file) {
            setNotification({
                open: true,
                message: 'Por favor, selecione um arquivo para importar.',
                severity: 'warning'
            });
            return;
        }

        setLoading(true);
        try {
            const result = await integrationService.importData(file);
            setNotification({
                open: true,
                message: `Arquivo "${file.name}" importado com sucesso! ${result.count} registros processados.`,
                severity: 'success'
            });
            setFile(null); // Reset file input
        } catch (error) {
            console.error(error);
            setNotification({
                open: true,
                message: 'Erro ao importar dados. Verifique o formato do arquivo.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e', mb: 4 }}>
                Painel de Integração
            </Typography>

            <Grid container spacing={4}>
                {/* Export Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <FileDownloadIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                                Exportar Dados
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                            Selecione o formato desejado para exportar a lista completa de pontos turísticos e hospedagens.
                        </Typography>

                        <Stack spacing={2} sx={{ mt: 'auto' }}>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<CodeIcon />}
                                onClick={() => handleExport('JSON')}
                                fullWidth
                                disabled={loading}
                                sx={{ justifyContent: 'flex-start', py: 1.5 }}
                            >
                                Exportar em JSON
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<TableViewIcon />}
                                onClick={() => handleExport('CSV')}
                                fullWidth
                                disabled={loading}
                                sx={{ justifyContent: 'flex-start', py: 1.5 }}
                            >
                                Exportar em CSV
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<DescriptionIcon />}
                                onClick={() => handleExport('XML')}
                                fullWidth
                                disabled={loading}
                                sx={{ justifyContent: 'flex-start', py: 1.5 }}
                            >
                                Exportar em XML
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Import Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <FileUploadIcon sx={{ fontSize: 40, color: '#2e7d32', mr: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                                Importar Dados
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                            Faça upload de arquivos JSON ou XML para atualização em lote. O arquivo deve seguir o esquema padrão.
                        </Typography>

                        <Box
                            sx={{
                                border: '2px dashed #ccc',
                                borderRadius: 2,
                                p: 4,
                                textAlign: 'center',
                                bgcolor: '#fafafa',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: '#f0f0f0', borderColor: '#2e7d32' },
                                mb: 3
                            }}
                            component="label"
                        >
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept=".json,.csv,.xml"
                            />
                            <CloudUploadIcon sx={{ fontSize: 48, color: '#9e9e9e', mb: 1 }} />
                            <Typography variant="body1" color="text.secondary">
                                {file ? file.name : "Clique para selecionar ou arraste o arquivo aqui"}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 1 }}>
                                Suporta: JSON
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FileUploadIcon />}
                            onClick={handleImport}
                            disabled={!file || loading}
                            color="success"
                            fullWidth
                            sx={{ mt: 'auto', py: 1.5 }}
                        >
                            {loading ? 'Processando...' : 'Enviar Arquivo'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Notifications */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default IntegrationPanel;
