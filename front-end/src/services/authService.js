const AUTH_KEY = 'spd_auth_user';

export const authService = {
    login(email, password) {
        // Mock login logic
        if (email && password) {
            const user = {
                id: 1,
                name: 'Usuário Teste',
                email: email,
                role: email.includes('admin') ? 'admin' : 'user'
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            window.dispatchEvent(new Event('auth-change'));
            return Promise.resolve(user);
        }
        return Promise.reject(new Error('Credenciais inválidas'));
    },

    register(userData) {
        // Mock registration
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'user'
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
        window.dispatchEvent(new Event('auth-change'));
        return Promise.resolve(newUser);
    },

    logout() {
        localStorage.removeItem(AUTH_KEY);
        window.dispatchEvent(new Event('auth-change'));
        return Promise.resolve();
    },

    getCurrentUser() {
        try {
            const user = localStorage.getItem(AUTH_KEY);
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    },

    isAuthenticated() {
        return !!this.getCurrentUser();
    },

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
};
