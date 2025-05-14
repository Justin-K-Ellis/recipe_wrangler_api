export async function up(knex) {
  await knex.schema.createTable("custom_recipe", (table) => {
    table.increments().notNullable();
    table.uuid("uuid").defaultTo(knex.fn.uuid());
    table.integer("created_at");
    table.json("ingredients");
    table.json("steps");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("custom_recipe");
}
