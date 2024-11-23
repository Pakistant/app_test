import { Formula } from '../types';

export const formulas: Formula[] = [
  {
    id: 'complete',
    name: 'Photo classique + Film long + Album + Teaser',
    type: 'photo_video',
    description: 'Formule complète incluant photos retouchées, film long, album photo et teaser vidéo',
    tasks: [
      {
        title: 'Obtenir vocal des chefs d\'équipe',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Demander vocal aux mariés sur moments clés',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi photos brutes pour sélection',
        daysOffset: 10,
        assignedTo: 'damien'
      },
      {
        title: 'Envoi modèles covers pour album',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi des proxies',
        daysOffset: 10,
        assignedTo: 'narcisse'
      },
      {
        title: 'Vérification envoi photos brutes',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Demande musiques film long',
        daysOffset: 12,
        assignedTo: 'marvel'
      },
      {
        title: 'Début retouches globales',
        daysOffset: 42,
        assignedTo: 'retoucheur'
      },
      {
        title: 'Relance sélection photos classiques et album',
        daysOffset: 42,
        assignedTo: 'marvel'
      },
      {
        title: 'Relance sélection modèles covers',
        daysOffset: 42,
        assignedTo: 'marvel'
      },
      {
        title: 'Fabrication couverture album',
        daysOffset: 45,
        assignedTo: 'marvel'
      },
      {
        title: 'Montage teaser vidéo',
        daysOffset: 45,
        assignedTo: 'luc'
      },
      {
        title: 'Montage film long',
        daysOffset: 60,
        assignedTo: 'bruce'
      },
      {
        title: 'Vérification interne film long',
        daysOffset: 67,
        assignedTo: 'marvel'
      },
      {
        title: 'Étalonnage film long',
        daysOffset: 70,
        assignedTo: 'etalonneur'
      },
      {
        title: 'Finalisation teaser et DVD',
        daysOffset: 80,
        assignedTo: 'marvel'
      },
      {
        title: 'Livraison au client',
        daysOffset: 80,
        assignedTo: 'marvel'
      }
    ]
  },
  {
    id: 'photo_film_album',
    name: 'Photo classique + Film long + Album',
    type: 'photo_video',
    description: 'Photos retouchées, film long et album photo (sans teaser)',
    tasks: [
      {
        title: 'Obtenir vocal des chefs d\'équipe',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Demander vocal aux mariés sur moments clés',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi photos brutes pour sélection',
        daysOffset: 10,
        assignedTo: 'damien'
      },
      {
        title: 'Envoi modèles covers pour album',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi des proxies',
        daysOffset: 10,
        assignedTo: 'narcisse'
      },
      {
        title: 'Vérification envoi photos brutes',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Demande musiques film long',
        daysOffset: 12,
        assignedTo: 'marvel'
      },
      {
        title: 'Début retouches globales',
        daysOffset: 42,
        assignedTo: 'retoucheur'
      },
      {
        title: 'Relance sélection photos classiques et album',
        daysOffset: 42,
        assignedTo: 'marvel'
      },
      {
        title: 'Relance sélection modèles covers',
        daysOffset: 42,
        assignedTo: 'marvel'
      },
      {
        title: 'Fabrication couverture album',
        daysOffset: 45,
        assignedTo: 'marvel'
      },
      {
        title: 'Montage film long',
        daysOffset: 60,
        assignedTo: 'bruce'
      },
      {
        title: 'Vérification interne film long',
        daysOffset: 67,
        assignedTo: 'marvel'
      },
      {
        title: 'Étalonnage film long',
        daysOffset: 70,
        assignedTo: 'etalonneur'
      },
      {
        title: 'Livraison au client',
        daysOffset: 80,
        assignedTo: 'marvel'
      }
    ]
  },
  {
    id: 'photo_film_teaser',
    name: 'Photo classique + Film long + Teaser',
    type: 'photo_video',
    description: 'Photos retouchées, film long et teaser vidéo (sans album)',
    tasks: [
      {
        title: 'Obtenir vocal des chefs d\'équipe',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Demander vocal aux mariés sur moments clés',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi photos brutes pour sélection',
        daysOffset: 10,
        assignedTo: 'damien'
      },
      {
        title: 'Envoi des proxies',
        daysOffset: 10,
        assignedTo: 'narcisse'
      },
      {
        title: 'Vérification envoi photos brutes',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Demande musiques film long',
        daysOffset: 12,
        assignedTo: 'marvel'
      },
      {
        title: 'Début retouches globales',
        daysOffset: 42,
        assignedTo: 'retoucheur'
      },
      {
        title: 'Relance sélection photos classiques',
        daysOffset: 42,
        assignedTo: 'marvel'
      },
      {
        title: 'Montage teaser vidéo',
        daysOffset: 45,
        assignedTo: 'luc'
      },
      {
        title: 'Montage film long',
        daysOffset: 60,
        assignedTo: 'bruce'
      },
      {
        title: 'Vérification interne film long',
        daysOffset: 67,
        assignedTo: 'marvel'
      },
      {
        title: 'Étalonnage film long',
        daysOffset: 70,
        assignedTo: 'etalonneur'
      },
      {
        title: 'Finalisation teaser et DVD',
        daysOffset: 80,
        assignedTo: 'marvel'
      },
      {
        title: 'Livraison au client',
        daysOffset: 80,
        assignedTo: 'marvel'
      }
    ]
  },
  {
    id: 'photo_film',
    name: 'Photo classique + Film long',
    type: 'photo_video',
    description: 'Photos retouchées et film long uniquement',
    tasks: [
      {
        title: 'Obtenir vocal des chefs d\'équipe',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Demander vocal aux mariés',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi photos brutes pour sélection',
        daysOffset: 10,
        assignedTo: 'damien'
      },
      {
        title: 'Envoi des proxies',
        daysOffset: 10,
        assignedTo: 'narcisse'
      },
      {
        title: 'Vérification envoi photos brutes et proxies',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Relance sélection photos classiques',
        daysOffset: 35,
        assignedTo: 'marvel'
      },
      {
        title: 'Début retouches globales',
        daysOffset: 42,
        assignedTo: 'retoucheur'
      },
      {
        title: 'Montage film long',
        daysOffset: 60,
        assignedTo: 'bruce'
      },
      {
        title: 'Vérification interne film long',
        daysOffset: 67,
        assignedTo: 'marvel'
      },
      {
        title: 'Étalonnage',
        daysOffset: 70,
        assignedTo: 'etalonneur'
      },
      {
        title: 'Finalisation DVD',
        daysOffset: 80,
        assignedTo: 'marvel'
      },
      {
        title: 'Livraison au client',
        daysOffset: 80,
        assignedTo: 'marvel'
      }
    ]
  },
  {
    id: 'photo_album',
    name: 'Photo classique + Album',
    type: 'photo',
    description: 'Photos retouchées et album photo uniquement',
    tasks: [
      {
        title: 'Envoi photos brutes pour sélection',
        daysOffset: 10,
        assignedTo: 'damien'
      },
      {
        title: 'Envoi modèles covers pour album',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Vérification envoi photos brutes',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Relance sélection photos classiques et album',
        daysOffset: 35,
        assignedTo: 'marvel'
      },
      {
        title: 'Début retouches globales',
        daysOffset: 42,
        assignedTo: 'retoucheur'
      },
      {
        title: 'Fabrication couverture album',
        daysOffset: 45,
        assignedTo: 'marvel'
      },
      {
        title: 'Livraison au client',
        daysOffset: 70,
        assignedTo: 'marvel'
      }
    ]
  },
  {
    id: 'photo',
    name: 'Photo classique uniquement',
    type: 'photo',
    description: 'Photos retouchées uniquement',
    tasks: [
      {
        title: 'Envoi photos brutes pour sélection',
        daysOffset: 10,
        assignedTo: 'damien'
      },
      {
        title: 'Vérification envoi photos brutes',
        daysOffset: 10,
        assignedTo: 'marvel'
      },
      {
        title: 'Relance sélection photos classiques',
        daysOffset: 35,
        assignedTo: 'marvel'
      },
      {
        title: 'Début retouches globales',
        daysOffset: 42,
        assignedTo: 'retoucheur'
      },
      {
        title: 'Livraison photos au client',
        daysOffset: 70,
        assignedTo: 'marvel'
      }
    ]
  },
  {
    id: 'video_complete',
    name: 'Film long + Teaser',
    type: 'video',
    description: 'Film long et teaser vidéo',
    tasks: [
      {
        title: 'Obtenir vocal des chefs d\'équipe',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Demander vocal aux mariés sur moments clés',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi des proxies',
        daysOffset: 10,
        assignedTo: 'narcisse'
      },
      {
        title: 'Demande musiques film long',
        daysOffset: 12,
        assignedTo: 'marvel'
      },
      {
        title: 'Montage teaser vidéo',
        daysOffset: 45,
        assignedTo: 'luc'
      },
      {
        title: 'Montage film long',
        daysOffset: 60,
        assignedTo: 'bruce'
      },
      {
        title: 'Vérification interne film long',
        daysOffset: 67,
        assignedTo: 'marvel'
      },
      {
        title: 'Étalonnage film long',
        daysOffset: 70,
        assignedTo: 'etalonneur'
      },
      {
        title: 'Finalisation teaser et DVD',
        daysOffset: 80,
        assignedTo: 'marvel'
      },
      {
        title: 'Livraison au client',
        daysOffset: 80,
        assignedTo: 'marvel'
      }
    ]
  },
  {
    id: 'video_long',
    name: 'Film long uniquement',
    type: 'video',
    description: 'Film long uniquement',
    tasks: [
      {
        title: 'Obtenir vocal des chefs d\'équipe',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Demander vocal aux mariés',
        daysOffset: 3,
        assignedTo: 'marvel'
      },
      {
        title: 'Envoi des proxies',
        daysOffset: 10,
        assignedTo: 'narcisse'
      },
      {
        title: 'Demande musiques film long',
        daysOffset: 12,
        assignedTo: 'marvel'
      },
      {
        title: 'Montage film long',
        daysOffset: 60,
        assignedTo: 'bruce'
      },
      {
        title: 'Vérification interne film long',
        daysOffset: 67,
        assignedTo: 'marvel'
      },
      {
        title: 'Étalonnage',
        daysOffset: 70,
        assignedTo: 'etalonneur'
      },
      {
        title: 'Finalisation DVD',
        daysOffset: 80,
        assignedTo: 'marvel'
      },
      {
        title: 'Livraison au client',
        daysOffset: 80,
        assignedTo: 'marvel'
      }
    ]
  }
];