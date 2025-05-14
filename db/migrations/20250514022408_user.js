export async function up(knex) {
  await knex.schema.createTable("user", (table) => {
    table.increments().notNullable();
    table.uuid("uuid").defaultTo(knex.fn.uuid());
    table.string("display_name");
    table.string("email").notNullable();
    table.integer("createdAt");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user");
}
