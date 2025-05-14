export async function up(knex) {
  await knex.schema.createTable("user_external_recipe", (table) => {
    table.integer("user_id");
    table.integer("external_recipe_id");
    table.foreign("user_id").references("id").inTable("user");
    table
      .foreign("external_recipe_id")
      .references("id")
      .inTable("external_recipe");
  });
}

export async function down(knex) {
  await knex.schema, dropTable("user_external_recipe");
}
