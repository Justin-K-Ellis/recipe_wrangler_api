export async function up(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.integer("ready_in_minutes");
    table.integer("servings");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.dropColumn("ready_in_minutes");
    table.dropColumn("servings");
  });
}
