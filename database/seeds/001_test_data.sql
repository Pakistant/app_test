-- Données de test pour le développement

BEGIN;

-- Insertion d'une saison
INSERT INTO seasons (name, start_date, end_date, is_active)
VALUES ('Saison 2024', '2024-01-01', '2024-12-31', true);

-- Insertion d'utilisateurs de test
INSERT INTO users (email, password_hash, display_name, role)
VALUES 
    ('admin@lesmarvelous.com', 'hashed_password', 'Admin', 'admin'),
    ('marvel@lesmarvelous.com', 'hashed_password', 'Marvel', 'manager'),
    ('damien@lesmarvelous.com', 'hashed_password', 'Damien', 'photographer'),
    ('luc@lesmarvelous.com', 'hashed_password', 'Luc', 'videographer');

-- Insertion des préférences utilisateurs
INSERT INTO user_preferences (user_id, theme, notifications_email)
SELECT id, 'light', true FROM users;

-- Insertion d'un projet de mariage de test
INSERT INTO projects (
    season_id,
    project_type,
    couple_name,
    date,
    email,
    phone,
    country,
    delivery_days,
    status
)
VALUES (
    1,
    'wedding',
    'Jean et Marie',
    '2024-06-15',
    'jean.marie@email.com',
    '0612345678',
    'fr',
    80,
    'en_cours'
);

-- Liaison avec wedding_projects
INSERT INTO wedding_projects (
    project_id,
    wedding_type,
    location,
    formula_type,
    formula_name,
    has_teaser,
    has_album
)
VALUES (
    1,
    'french',
    'Paris',
    'photo_video',
    'complete',
    true,
    true
);

-- Insertion de quelques tâches
INSERT INTO tasks (
    project_id,
    title,
    due_date,
    status
)
VALUES 
    (1, 'Obtenir vocal des chefs d''équipe', '2024-06-18', 'pending'),
    (1, 'Envoi photos brutes pour sélection', '2024-06-25', 'pending');

COMMIT;