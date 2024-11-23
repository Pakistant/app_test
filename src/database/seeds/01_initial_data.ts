import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Vider les tables existantes
  await knex('project_tags').del();
  await knex('tags').del();
  await knex('documents').del();
  await knex('tasks').del();
  await knex('projects').del();

  // Insérer des projets de test
  const [projectId] = await knex('projects').insert([
    {
      type: 'wedding',
      couple: 'Jean et Marie',
      date: new Date('2024-06-15'),
      email: 'jean.marie@email.com',
      phone: '0612345678',
      country: 'fr',
      delivery_days: 80,
      status: 'en_cours',
      location: 'Paris',
      price: 5000
    }
  ]).returning('id');

  // Insérer des tâches de test
  await knex('tasks').insert([
    {
      project_id: projectId,
      title: 'Obtenir vocal des chefs d\'équipe',
      due_date: new Date('2024-06-18'),
      status: 'pending',
      assigned_to: 'marvel'
    },
    {
      project_id: projectId,
      title: 'Envoi photos brutes pour sélection',
      due_date: new Date('2024-06-25'),
      status: 'pending',
      assigned_to: 'damien'
    }
  ]);

  // Insérer des tags de test
  const [tagId] = await knex('tags').insert([
    { name: 'Prioritaire' }
  ]).returning('id');

  // Lier le tag au projet
  await knex('project_tags').insert([
    { project_id: projectId, tag_id: tagId }
  ]);
}