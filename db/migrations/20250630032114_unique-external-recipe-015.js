export async function up(knex) {
  await knex.schema.alterTable("external_recipe", (table) => {
    table.unique("dish_id");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("external_recipe", (table) => {
    table.dropUnique("dish_id");
  });
}
