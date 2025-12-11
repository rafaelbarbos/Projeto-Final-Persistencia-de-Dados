import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Stack,
    IconButton,
    Grid,
    Divider,
    CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { pointsService } from '../../services';

const BRAZIL_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const CATEGORIES = ['Parque', 'Museu', 'Praia', 'Monumento', 'Teatro', 'Histórico', 'Natureza'];

const PointForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        category: ''
    });

    const [images, setImages] = useState([]); // Array of File objects (for real upload) or strings (URLs)
    const [previewImages, setPreviewImages] = useState([]);

    // Accommodation State
    const [accommodations, setAccommodations] = useState([]);
    const [newAccommodation, setNewAccommodation] = useState({
        name: '',
        type: '',
        price: '',
        link: ''
    });

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);

    useEffect(() => {
        const fetchPoint = async () => {
            if (isEditMode) {
                try {
                    const point = await pointsService.getById(id);
                    if (point) {
                        setFormData({
                            name: point.name,
                            description: point.description,
                            address: point.address || '', // Fallback if missing in mock
                            city: point.city,
                            state: point.state,
                            category: point.category
                        });
                        setPreviewImages(point.images || []);
                        setImages(point.images || []); // Keep existing URLs
                        setAccommodations(point.accommodations || []);
                    } else {
                        toast.error('Ponto turístico não encontrado.');
                        navigate('/');
                    }
                } catch (error) {
                    console.error(error);
                    toast.error('Erro ao carregar dados.');
                } finally {
                    setInitialLoading(false);
                }
            }
        };
        fetchPoint();
    }, [isEditMode, id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 10) {
            toast.error("Máximo de 10 fotos permitidas.");
            return;
        }

        const newPreviews = files.map(file => URL.createObjectURL(file));
        // In a real app, we would upload these files. For mock, we keep the File object or Data URL.
        // To make it simple for localStorage, we'd convert to Base64, but for now let's just use the object URL for preview 
        // and mock the persistence of the URL (which won't persist across refresh if it's a blob url, so we simulate).
        // Since we want robust execution, let's treat new files as just adding to the array.

        setImages(prev => [...prev, ...files]);
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddAccommodation = () => {
        if (!newAccommodation.name || !newAccommodation.type) return;
        setAccommodations([...accommodations, newAccommodation]);
        setNewAccommodation({ name: '', type: '', price: '', link: '' });
    };

    const handleRemoveAccommodation = (index) => {
        setAccommodations(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.description || !formData.city || !formData.state || !formData.category) {
            toast.error("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setLoading(true);

        try {
            // Prepare payload
            // In a real scenario, we would upload images here and get URLs back.
            // For this mock, we'll just use the existing preview URLs or generated placeholders for new files.
            const finalImages = previewImages;

            const payload = {
                ...formData,
                images: finalImages,
                accommodations: accommodations
            };

            if (isEditMode) {
                await pointsService.update(id, payload);
                toast.success("Ponto turístico atualizado com sucesso!");
            } else {
                await pointsService.create(payload);
                toast.success("Ponto turístico criado com sucesso!");
            }
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar ponto turístico.");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                    {isEditMode ? 'Editar Ponto Turístico' : 'Novo Ponto Turístico'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 2 }}>
                            Informações Principais
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Nome do Local"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />

                            <TextField
                                fullWidth
                                label="Descrição"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                            />

                            <FormControl fullWidth required>
                                <InputLabel>Categoria</InputLabel>
                                <Select
                                    label="Categoria"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 2 }}>
                            Localização
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Endereço"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />

                            <FormControl fullWidth required>
                                <InputLabel>Estado (UF)</InputLabel>
                                <Select
                                    label="Estado (UF)"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                                >
                                    {BRAZIL_STATES.map((state) => (
                                        <MenuItem key={state} value={state}>
                                            {state}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Cidade"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                placeholder="Digite o nome da cidade"
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 2 }}>
                            Fotos do Local
                        </Typography>

                        <Box
                            sx={{
                                border: '2px dashed #bdbdbd',
                                p: 3,
                                textAlign: 'center',
                                borderRadius: 1,
                                bgcolor: '#fafafa',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: '#f5f5f5', borderColor: 'primary.main' }
                            }}
                            component="label"
                        >
                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                            <Typography color="text.secondary">
                                Clique para adicionar fotos ou arraste aqui
                            </Typography>
                        </Box>

                        {previewImages.length > 0 && (
                            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                {previewImages.map((src, index) => (
                                    <Box key={index} sx={{ position: 'relative', width: 100, height: 100 }}>
                                        <img
                                            src={src}
                                            alt={`Preview ${index}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveImage(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                bgcolor: 'error.main',
                                                color: 'white',
                                                '&:hover': { bgcolor: 'error.dark' }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        )}
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            * Máximo de 10 fotos.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 2 }}>
                            Hospedagens Próximas
                        </Typography>

                        <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                            <Typography variant="subtitle2" gutterBottom>Adicionar Nova Hospedagem</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth size="small"
                                        label="Nome da Hospedagem"
                                        value={newAccommodation.name}
                                        onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Tipo</InputLabel>
                                        <Select
                                            value={newAccommodation.type}
                                            label="Tipo"
                                            onChange={(e) => setNewAccommodation({ ...newAccommodation, type: e.target.value })}
                                        >
                                            <MenuItem value="Hotel">Hotel</MenuItem>
                                            <MenuItem value="Pousada">Pousada</MenuItem>
                                            <MenuItem value="Hostel">Hostel</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth size="small"
                                        label="Preço Médio (R$)"
                                        type="number"
                                        value={newAccommodation.price}
                                        onChange={(e) => setNewAccommodation({ ...newAccommodation, price: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth size="small"
                                        label="Link de Reserva (URL)"
                                        value={newAccommodation.link}
                                        onChange={(e) => setNewAccommodation({ ...newAccommodation, link: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="outlined"
                                        onClick={handleAddAccommodation}
                                        disabled={!newAccommodation.name || !newAccommodation.type}
                                    >
                                        Adicionar Hospedagem
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>

                        {accommodations.length > 0 && (
                            <Stack spacing={2}>
                                {accommodations.map((acc, index) => (
                                    <Paper key={index} elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">{acc.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {acc.type} • R$ {acc.price} • <a href={acc.link} target="_blank" rel="noopener noreferrer">Reserva</a>
                                            </Typography>
                                        </Box>
                                        <IconButton onClick={() => handleRemoveAccommodation(index)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Paper>
                                ))}
                            </Stack>
                        )}
                    </Box>

                    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default PointForm;
