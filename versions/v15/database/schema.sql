-- Création des tables principales

-- Table des saisons
CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false
);

-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'photographer', 'videographer', 'editor')),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP WITH TIME ZONE
);

-- Table des équipes
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison users_teams
CREATE TABLE users_teams (
    user_id INTEGER REFERENCES users(id),
    team_id INTEGER REFERENCES teams(id),
    PRIMARY KEY (user_id, team_id)
);

-- Table des préférences utilisateurs
CREATE TABLE user_preferences (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    theme VARCHAR(20) DEFAULT 'light',
    notifications_email BOOLEAN DEFAULT true,
    notifications_push BOOLEAN DEFAULT true,
    notifications_desktop BOOLEAN DEFAULT true,
    default_view VARCHAR(20) DEFAULT 'kanban'
);

-- Table des projets
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    season_id INTEGER REFERENCES seasons(id),
    project_type VARCHAR(20) NOT NULL CHECK (project_type IN ('wedding', 'studio', 'corporate')),
    couple_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    country VARCHAR(2) NOT NULL,
    delivery_days INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'en_cours',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table spécifique pour les projets mariage
CREATE TABLE wedding_projects (
    project_id INTEGER PRIMARY KEY REFERENCES projects(id),
    wedding_type VARCHAR(20) NOT NULL CHECK (wedding_type IN ('french', 'cameroonian')),
    location VARCHAR(255),
    formula_type VARCHAR(20) NOT NULL CHECK (formula_type IN ('photo_video', 'photo', 'video')),
    formula_name VARCHAR(100) NOT NULL,
    has_teaser BOOLEAN DEFAULT false,
    has_album BOOLEAN DEFAULT false
);

-- Table spécifique pour les projets studio
CREATE TABLE studio_projects (
    project_id INTEGER PRIMARY KEY REFERENCES projects(id),
    session_type VARCHAR(50) NOT NULL,
    package_name VARCHAR(100) NOT NULL,
    package_duration INTEGER NOT NULL,
    package_photos INTEGER NOT NULL,
    print_included BOOLEAN DEFAULT false,
    backdrop VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL
);

-- Table des accessoires pour les séances studio
CREATE TABLE studio_props (
    project_id INTEGER REFERENCES studio_projects(project_id),
    prop_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (project_id, prop_name)
);

-- Table spécifique pour les projets corporate
CREATE TABLE corporate_projects (
    project_id INTEGER PRIMARY KEY REFERENCES projects(id),
    event_type VARCHAR(50) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_contact VARCHAR(255) NOT NULL,
    contact_position VARCHAR(100),
    location VARCHAR(255),
    attendees INTEGER,
    photos_included BOOLEAN DEFAULT false,
    video_included BOOLEAN DEFAULT false,
    streaming_included BOOLEAN DEFAULT false,
    prints_included BOOLEAN DEFAULT false
);

-- Table des besoins spécifiques pour les projets corporate
CREATE TABLE corporate_requirements (
    project_id INTEGER REFERENCES corporate_projects(project_id),
    requirement TEXT NOT NULL,
    PRIMARY KEY (project_id, requirement)
);

-- Table des tâches
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    estimated_time INTEGER,
    actual_time INTEGER,
    completed_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des assignations de tâches
CREATE TABLE task_assignments (
    task_id INTEGER REFERENCES tasks(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (task_id, user_id)
);

-- Table des dépendances entre tâches
CREATE TABLE task_dependencies (
    task_id INTEGER REFERENCES tasks(id),
    depends_on_task_id INTEGER REFERENCES tasks(id),
    PRIMARY KEY (task_id, depends_on_task_id)
);

-- Table des sous-tâches
CREATE TABLE subtasks (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    estimated_time INTEGER,
    actual_time INTEGER
);

-- Table des assignations de sous-tâches
CREATE TABLE subtask_assignments (
    subtask_id INTEGER REFERENCES subtasks(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (subtask_id, user_id)
);

-- Table des commentaires
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des mentions dans les commentaires
CREATE TABLE comment_mentions (
    comment_id INTEGER REFERENCES comments(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (comment_id, user_id)
);

-- Table des tags
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Table de liaison projets_tags
CREATE TABLE project_tags (
    project_id INTEGER REFERENCES projects(id),
    tag_id INTEGER REFERENCES tags(id),
    PRIMARY KEY (project_id, tag_id)
);

-- Table de liaison tâches_tags
CREATE TABLE task_tags (
    task_id INTEGER REFERENCES tasks(id),
    tag_id INTEGER REFERENCES tags(id),
    PRIMARY KEY (task_id, tag_id)
);

-- Table des documents
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    uploaded_by INTEGER REFERENCES users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table du journal d'activité
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    user_id INTEGER REFERENCES users(id),
    action_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('info', 'warning', 'error')),
    read BOOLEAN DEFAULT false,
    link VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes pour optimiser les performances
CREATE INDEX idx_projects_season ON projects(season_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_comments_task ON comments(task_id);
CREATE INDEX idx_activity_logs_project ON activity_logs(project_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, read);
CREATE INDEX idx_documents_project ON documents(project_id);

-- Triggers pour la mise à jour automatique des timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();