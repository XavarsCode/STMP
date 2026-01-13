// Paris Metro Lines Data
const METRO_LINES = {
    '1': {
        name: 'Ligne 1',
        color: '#FFCD00',
        stations: [
            { name: 'La Défense', lat: 48.8919, lon: 2.2380 },
            { name: 'Esplanade de La Défense', lat: 48.8878, lon: 2.2506 },
            { name: 'Pont de Neuilly', lat: 48.8848, lon: 2.2598 },
            { name: 'Les Sablons', lat: 48.8808, lon: 2.2723 },
            { name: 'Porte Maillot', lat: 48.8782, lon: 2.2832 },
            { name: 'Argentine', lat: 48.8754, lon: 2.2895 },
            { name: 'Charles de Gaulle - Étoile', lat: 48.8738, lon: 2.2950 },
            { name: 'George V', lat: 48.8720, lon: 2.3009 },
            { name: 'Franklin D. Roosevelt', lat: 48.8689, lon: 2.3099 },
            { name: 'Champs-Élysées - Clemenceau', lat: 48.8677, lon: 2.3139 },
            { name: 'Concorde', lat: 48.8656, lon: 2.3213 },
            { name: 'Tuileries', lat: 48.8634, lon: 2.3297 },
            { name: 'Palais Royal - Musée du Louvre', lat: 48.8619, lon: 2.3366 },
            { name: 'Louvre - Rivoli', lat: 48.8606, lon: 2.3416 },
            { name: 'Châtelet', lat: 48.8583, lon: 2.3474 },
            { name: 'Hôtel de Ville', lat: 48.8575, lon: 2.3518 },
            { name: 'Saint-Paul', lat: 48.8554, lon: 2.3608 },
            { name: 'Bastille', lat: 48.8531, lon: 2.3692 },
            { name: 'Gare de Lyon', lat: 48.8444, lon: 2.3738 },
            { name: 'Reuilly - Diderot', lat: 48.8470, lon: 2.3862 },
            { name: 'Nation', lat: 48.8484, lon: 2.3956 },
            { name: 'Porte de Vincennes', lat: 48.8472, lon: 2.4104 },
            { name: 'Saint-Mandé', lat: 48.8456, lon: 2.4194 },
            { name: 'Bérault', lat: 48.8447, lon: 2.4282 },
            { name: 'Château de Vincennes', lat: 48.8443, lon: 2.4399 }
        ],
        model: 'MP14',
        avgSpeed: 25, // km/h
        interval: 105 // seconds between trains at peak
    },
    '4': {
        name: 'Ligne 4',
        color: '#A0006E',
        stations: [
            { name: 'Porte de Clignancourt', lat: 48.8971, lon: 2.3445 },
            { name: 'Simplon', lat: 48.8938, lon: 2.3497 },
            { name: 'Marcadet - Poissonniers', lat: 48.8910, lon: 2.3494 },
            { name: 'Château Rouge', lat: 48.8871, lon: 2.3495 },
            { name: 'Barbès - Rochechouart', lat: 48.8835, lon: 2.3509 },
            { name: 'Gare du Nord', lat: 48.8808, lon: 2.3552 },
            { name: 'Gare de l\'Est', lat: 48.8765, lon: 2.3594 },
            { name: 'Château d\'Eau', lat: 48.8723, lon: 2.3563 },
            { name: 'Strasbourg - Saint-Denis', lat: 48.8694, lon: 2.3542 },
            { name: 'Réaumur - Sébastopol', lat: 48.8663, lon: 2.3524 },
            { name: 'Étienne Marcel', lat: 48.8634, lon: 2.3486 },
            { name: 'Les Halles', lat: 48.8619, lon: 2.3458 },
            { name: 'Châtelet', lat: 48.8583, lon: 2.3474 },
            { name: 'Cité', lat: 48.8554, lon: 2.3474 },
            { name: 'Saint-Michel', lat: 48.8536, lon: 2.3445 },
            { name: 'Odéon', lat: 48.8520, lon: 2.3391 },
            { name: 'Saint-Germain-des-Prés', lat: 48.8537, lon: 2.3336 },
            { name: 'Saint-Sulpice', lat: 48.8512, lon: 2.3318 },
            { name: 'Saint-Placide', lat: 48.8468, lon: 2.3275 },
            { name: 'Montparnasse - Bienvenüe', lat: 48.8422, lon: 2.3213 },
            { name: 'Vavin', lat: 48.8421, lon: 2.3289 },
            { name: 'Raspail', lat: 48.8389, lon: 2.3307 },
            { name: 'Denfert-Rochereau', lat: 48.8335, lon: 2.3327 },
            { name: 'Mouton-Duvernet', lat: 48.8313, lon: 2.3313 },
            { name: 'Alésia', lat: 48.8281, lon: 2.3267 },
            { name: 'Porte d\'Orléans', lat: 48.8234, lon: 2.3261 },
            { name: 'Mairie de Montrouge', lat: 48.8172, lon: 2.3196 }
        ],
        model: 'MP14',
        avgSpeed: 23,
        interval: 110
    },
    '6': {
        name: 'Ligne 6',
        color: '#6ECA97',
        stations: [
            { name: 'Charles de Gaulle - Étoile', lat: 48.8738, lon: 2.2950 },
            { name: 'Kléber', lat: 48.8713, lon: 2.2931 },
            { name: 'Boissière', lat: 48.8683, lon: 2.2887 },
            { name: 'Trocadéro', lat: 48.8636, lon: 2.2876 },
            { name: 'Passy', lat: 48.8577, lon: 2.2856 },
            { name: 'Bir-Hakeim', lat: 48.8540, lon: 2.2895 },
            { name: 'Dupleix', lat: 48.8506, lon: 2.2941 },
            { name: 'La Motte-Picquet - Grenelle', lat: 48.8489, lon: 2.2983 },
            { name: 'Cambronne', lat: 48.8475, lon: 2.3020 },
            { name: 'Sèvres - Lecourbe', lat: 48.8453, lon: 2.3101 },
            { name: 'Pasteur', lat: 48.8428, lon: 2.3127 },
            { name: 'Montparnasse - Bienvenüe', lat: 48.8422, lon: 2.3213 },
            { name: 'Edgar Quinet', lat: 48.8406, lon: 2.3253 },
            { name: 'Raspail', lat: 48.8389, lon: 2.3307 },
            { name: 'Denfert-Rochereau', lat: 48.8335, lon: 2.3327 },
            { name: 'Saint-Jacques', lat: 48.8333, lon: 2.3391 },
            { name: 'Glacière', lat: 48.8311, lon: 2.3439 },
            { name: 'Corvisart', lat: 48.8296, lon: 2.3499 },
            { name: 'Place d\'Italie', lat: 48.8312, lon: 2.3555 },
            { name: 'Nationale', lat: 48.8335, lon: 2.3609 },
            { name: 'Chevaleret', lat: 48.8352, lon: 2.3680 },
            { name: 'Quai de la Gare', lat: 48.8366, lon: 2.3738 },
            { name: 'Bercy', lat: 48.8403, lon: 2.3792 },
            { name: 'Dugommier', lat: 48.8391, lon: 2.3885 },
            { name: 'Daumesnil', lat: 48.8396, lon: 2.3960 },
            { name: 'Bel-Air', lat: 48.8409, lon: 2.4007 },
            { name: 'Picpus', lat: 48.8443, lon: 2.4018 },
            { name: 'Nation', lat: 48.8484, lon: 2.3956 }
        ],
        model: 'MP73',
        avgSpeed: 22,
        interval: 120
    },
    '14': {
        name: 'Ligne 14',
        color: '#62259D',
        stations: [
            { name: 'Saint-Lazare', lat: 48.8757, lon: 2.3253 },
            { name: 'Madeleine', lat: 48.8700, lon: 2.3245 },
            { name: 'Pyramides', lat: 48.8660, lon: 2.3331 },
            { name: 'Châtelet', lat: 48.8583, lon: 2.3474 },
            { name: 'Gare de Lyon', lat: 48.8444, lon: 2.3738 },
            { name: 'Bercy', lat: 48.8403, lon: 2.3792 },
            { name: 'Cour Saint-Émilion', lat: 48.8333, lon: 2.3854 },
            { name: 'Bibliothèque François Mitterrand', lat: 48.8297, lon: 2.3762 },
            { name: 'Olympiades', lat: 48.8271, lon: 2.3670 }
        ],
        model: 'MP14',
        avgSpeed: 40,
        interval: 85
    }
};

// Train models information
const TRAIN_MODELS = {
    'MP14': {
        name: 'MP 14 (Métro sur Pneumatiques du 21e siècle)',
        manufacturer: 'Alstom',
        years: '2018-présent',
        lines: ['1', '4', '14'],
        description: 'Matériel roulant sur pneumatiques entièrement automatique, dernière génération de métro parisien.',
        features: ['100% automatique', 'Climatisation', 'Vidéo surveillance', 'Portes palières'],
        capacity: '708 passagers',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Metro_de_Paris_-_Ligne_14_-_MP_14_01.jpg/320px-Metro_de_Paris_-_Ligne_14_-_MP_14_01.jpg'
    },
    'MP73': {
        name: 'MP 73 (Matériel sur Pneumatiques de 1973)',
        manufacturer: 'ANF/CIMT',
        years: '1974-1978',
        lines: ['6'],
        description: 'Matériel roulant sur pneumatiques, l\'un des plus anciens encore en service sur le réseau RATP.',
        features: ['Conduite manuelle', 'Portes à commande électrique'],
        capacity: '394 passagers',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MP73_Nation.jpg/320px-MP73_Nation.jpg'
    },
    'MF77': {
        name: 'MF 77 (Matériel sur Fer de 1977)',
        manufacturer: 'ANF/Alsthom',
        years: '1978-1984',
        lines: ['7', '8', '13'],
        description: 'Matériel roulant sur fer classique avec roues en acier.',
        features: ['Conduite manuelle', 'Freinage électrique'],
        capacity: '522 passagers',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/MF77_Mairie_d%27Ivry.jpg/320px-MF77_Mairie_d%27Ivry.jpg'
    },
    'MP89': {
        name: 'MP 89 (Matériel sur Pneumatiques de 1989)',
        manufacturer: 'Alstom',
        years: '1993-2011',
        lines: ['1', '4', '14'],
        description: 'Matériel roulant automatique sur pneumatiques, première génération de métro automatique.',
        features: ['Conduite automatique', 'Freinage récupératif'],
        capacity: '665 passagers',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MP89_CC_-_Ligne_1.jpg/320px-MP89_CC_-_Ligne_1.jpg'
    }
};

// API configuration for future real-time integration
// Currently using simulation; in production, this would call RATP/Île-de-France Mobilités API
const API_CONFIG = {
    baseUrl: 'https://api-ratp.pierre-grimaud.fr/v4',
    updateInterval: 30000 // 30 seconds
};
