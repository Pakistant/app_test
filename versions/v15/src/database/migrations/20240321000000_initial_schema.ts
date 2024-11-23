import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Table des projets
  await knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.enum('type', ['wedding', 'studio', 'corporate']).notNullable();
    table.string('couple').notNullable();
    table.date('date').notNullable();
    table.string('email');
    table.string('phone');
    table.string('country', 2).notNullable();
    table.integer('delivery_days').notNullable();
    table.enum('status', ['en_cours', 'en_retard', 'termine', 'a_venir']).defaultTo('en_cours');
    table.text('notes');
    table.decimal('price', 10, 2);
    table.string('location');
    table.timestamps(true, true);
  });

  // Table des tâches
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description');
    table.date('due_date').notNullable();
    table.enum('status', ['pending', 'in_progress', 'completed']).defaultTo('pending');
    table.string('assigned_to');
    table.enum('priority', ['low', 'medium', 'high']).defaultTo('medium');
    table.timestamps(true, true);
  });

  // Table des documents
  await knex.schema.createTable('documents', (table) => {
    table.increments('id').primary();
    table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.string('type');
    table.string('uploaded_by');
    table.timestamps(true, true);
  });

  // Table des tags
  await knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
  });

  // Table de liaison projets_tags
  await knex.schema.createTable('project_tags', (table) => {
    table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
    table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE');
    table.primary(['project_id', 'tag_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('project_tags');
  await knex.schema.dropTableIfExists('tags');
  await knex.schema.dropTableIfExists('documents');
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('projects');
}