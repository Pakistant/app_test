import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Table des employés
  await knex.schema.createTable('employees', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.integer('age').notNullable();
    table.specificType('role', 'text[]').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone');
    table.string('avatar');
    table.date('start_date').notNullable();
    table.string('department').notNullable();
    table.enum('status', ['active', 'inactive']).defaultTo('active');
    table.timestamps(true, true);
  });

  // Table des sessions de travail
  await knex.schema.createTable('work_sessions', (table) => {
    table.string('id').primary();
    table.string('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
    table.string('task_id').notNullable();
    table.timestamp('start_time').notNullable();
    table.timestamp('end_time');
    table.integer('duration');
    table.enum('status', ['ongoing', 'completed']).defaultTo('ongoing');
    table.text('notes');
    table.timestamps(true, true);
  });

  // Table des rapports de retard
  await knex.schema.createTable('delay_reports', (table) => {
    table.string('id').primary();
    table.string('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
    table.string('task_id').notNullable();
    table.timestamp('date').notNullable();
    table.string('reason').notNullable();
    table.enum('category', ['absence', 'workload', 'technical', 'other']).notNullable();
    table.text('description');
    table.enum('status', ['pending', 'reviewed', 'resolved']).defaultTo('pending');
    table.string('reviewed_by');
    table.text('resolution');
    table.timestamps(true, true);
  });

  // Table des performances
  await knex.schema.createTable('employee_performance', (table) => {
    table.string('employee_id').references('id').inTable('employees').onDelete('CASCADE');
    table.integer('on_time_delivery').defaultTo(0);
    table.integer('delayed_projects').defaultTo(0);
    table.integer('total_projects').defaultTo(0);
    table.primary(['employee_id']);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('employee_performance');
  await knex.schema.dropTableIfExists('delay_reports');
  await knex.schema.dropTableIfExists('work_sessions');
  await knex.schema.dropTableIfExists('employees');
}