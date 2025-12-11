export const mockPoints = [
    {
        id: 1,
        name: 'Cristo Redentor',
        city: 'Rio de Janeiro',
        state: 'RJ',
        image: 'https://images.unsplash.com/photo-1596627008709-j4e4e963b53c?auto=format&fit=crop&q=80&w=2070', // General view
        rating: 4.8,
        category: 'Monumento',
        description: 'O Cristo Redentor é uma estátua art déco que retrata Jesus Cristo, localizada no topo do morro do Corcovado, a 709 metros acima do nível do mar, no Parque Nacional da Tijuca, com vista para a maior parte da cidade do Rio de Janeiro, Brasil.',
        howToGetThere: 'O acesso pode ser feito pelo Trem do Corcovado, que parte da estação no bairro do Cosme Velho, ou pelas vans oficiais que saem de pontos como Copacabana e Largo do Machado.',
        images: [
            'https://images.unsplash.com/photo-1596627008709-j4e4e963b53c?auto=format&fit=crop&q=80&w=2070',
            'https://images.unsplash.com/photo-1563784115160-5f21228498f4?auto=format&fit=crop&q=80&w=2070',
            'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&q=80&w=2071'
        ],
        accommodations: [
            { name: 'Hotel Santa Teresa', price: 'R$ 1.200,00', link: '#' },
            { name: 'Ibis Copacabana', price: 'R$ 350,00', link: '#' },
            { name: 'Miramar Hotel', price: 'R$ 890,00', link: '#' }
        ],
        reviews: [
            { id: 1, user: 'Ana Silva', rating: 5, comment: 'Vista inesquecível! Vale cada centavo.', date: '2023-10-15' },
            { id: 2, user: 'Carlos Pereira', rating: 4, comment: 'Muito cheio, mas lindo.', date: '2023-11-02' }
        ]
    },
    {
        id: 2,
        name: 'Cataratas do Iguaçu',
        description: 'Conjunto de quedas d\'água no rio Iguaçu.',
        city: 'Foz do Iguaçu',
        state: 'PR',
        rating: 4.9,
        image: 'https://picsum.photos/seed/Cataratas/300/200',
        category: 'Natureza',
        howToGetThere: 'Aeroporto Internacional de Foz do Iguaçu e depois táxi, ônibus ou transfer até o parque.',
        images: ['https://picsum.photos/seed/Cataratas/300/200'],
        accommodations: [],
        reviews: []
    },
    {
        id: 3,
        name: 'Pelourinho',
        description: 'Centro histórico de Salvador com arquitetura colonial.',
        city: 'Salvador',
        state: 'BA',
        rating: 4.5,
        image: 'https://picsum.photos/seed/Pelourinho/300/200',
        category: 'Histórico',
        howToGetThere: 'Centro de Salvador.',
        images: ['https://picsum.photos/seed/Pelourinho/300/200'],
        accommodations: [],
        reviews: []
    },
    {
        id: 4,
        name: 'Jardim Botânico',
        description: 'Uma das mais belas áreas verdes do Brasil.',
        city: 'Curitiba',
        state: 'PR',
        rating: 4.7,
        image: 'https://picsum.photos/seed/JardimBotanico/300/200',
        category: 'Natureza',
        howToGetThere: 'Bairro Jardim Botânico, Curitiba.',
        images: ['https://picsum.photos/seed/JardimBotanico/300/200'],
        accommodations: [],
        reviews: []
    },
    {
        id: 5,
        name: 'Praia de Copacabana',
        description: 'Uma das praias mais famosas do mundo.',
        city: 'Rio de Janeiro',
        state: 'RJ',
        rating: 4.6,
        image: 'https://picsum.photos/seed/Copacabana/300/200',
        category: 'Praia',
        howToGetThere: 'Zona Sul do Rio de Janeiro.',
        images: ['https://picsum.photos/seed/Copacabana/300/200'],
        accommodations: [],
        reviews: []
    },
    {
        id: 6,
        name: 'MASP',
        description: 'Museu de Arte de São Paulo Assis Chateaubriand.',
        city: 'São Paulo',
        state: 'SP',
        rating: 4.7,
        image: 'https://picsum.photos/seed/MASP/300/200',
        category: 'Museu',
        howToGetThere: 'Avenida Paulista.',
        images: ['https://picsum.photos/seed/MASP/300/200'],
        accommodations: [],
        reviews: []
    },
];
