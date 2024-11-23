# Base de données Les Marvelous

Ce dossier contient tous les fichiers relatifs à la base de données de l'application Les Marvelous.

## Structure

- `schema.sql` : Schéma complet de la base de données
- `migrations/` : Scripts de migration pour les mises à jour
- `seeds/` : Données de test pour le développement

## Tables principales

1. **seasons** : Saisons de travail
2. **users** : Utilisateurs du système
3. **projects** : Projets (mariages, studio, corporate)
4. **tasks** : Tâches associées aux projets
5. **documents** : Documents liés aux projets
6. **activity_logs** : Journal d'activité

## Installation

1. Créer une base de données PostgreSQL
2. Exécuter le script de schéma :
   ```bash
   psql -d lesmarvelous -f schema.sql
   ```
3. Exécuter les migrations :
   ```bash
   psql -d lesmarvelous -f migrations/001_initial_schema.sql
   ```
4. Pour le développement, ajouter les données de test :
   ```bash
   psql -d lesmarvelous -f seeds/001_test_data.sql
   ```

## Maintenance

- Les modifications de schéma doivent passer par des migrations
- Toujours versionner les changements
- Maintenir la cohérence des données avec les triggers