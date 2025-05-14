export async function up(knex) {
  await knex.schema.alterTable("user_external_recipe", (table) => {
    table.boolean("liked");
    table.boolean("want_to_try");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("user_external_recipe", (table) => {
    table.dropColumn("liked");
    table.dropColumn("want_to_try");
  });
}
