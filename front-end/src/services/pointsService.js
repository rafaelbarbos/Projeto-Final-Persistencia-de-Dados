import { mockPoints } from '../components/Shared/mockData';

const STORAGE_KEY = 'spd_points_data';

export const pointsService = {
    // Initialize data from localStorage or mock
    init() {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPoints));
        }
    },

    getAll(filters = {}) {
        this.init();
        let points = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        // Apply filters
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            points = points.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
        }

        if (filters.city) {
            points = points.filter(p => p.city === filters.city);
        }

        if (filters.category) {
            points = points.filter(p => p.category === filters.category);
        }

        if (filters.rating) {
            points = points.filter(p => p.rating >= Number(filters.rating));
        }

        return Promise.resolve(points);
    },

    getById(id) {
        this.init();
        const points = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const point = points.find(p => p.id === Number(id));
        return Promise.resolve(point || null);
    },

    create(pointData) {
        this.init();
        const points = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        const newPoint = {
            ...pointData,
            id: Date.now(), // Generate ID
            rating: 0,
            reviews: [],
            images: pointData.images || [],
            accommodations: pointData.accommodations || []
        };

        points.push(newPoint);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(points));

        return Promise.resolve(newPoint);
    },

    update(id, data) {
        this.init();
        const points = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const index = points.findIndex(p => p.id === Number(id));

        if (index !== -1) {
            points[index] = { ...points[index], ...data };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(points));
            return Promise.resolve(points[index]);
        }
        return Promise.reject(new Error('Point not found'));
    },

    delete(id) {
        this.init();
        const points = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const newPoints = points.filter(p => p.id !== Number(id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPoints));
        return Promise.resolve(true);
    },

    // Helper to get unique values for filters
    getCities() {
        this.init();
        const points = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Promise.resolve([...new Set(points.map(p => p.city))]);
    },

    getCategories() {
        this.init();
        const points = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Promise.resolve([...new Set(points.map(p => p.category))]);
    }
};
