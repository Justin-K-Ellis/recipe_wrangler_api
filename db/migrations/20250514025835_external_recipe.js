export async function up(knex) {
  await knex.schema.createTable("external_recipe", (table) => {
    table.increments().notNullable();
    table.string("dish_id").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("external_recipe");
}
