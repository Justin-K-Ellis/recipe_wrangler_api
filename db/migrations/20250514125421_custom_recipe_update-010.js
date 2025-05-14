export async function up(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.string("name");
    table.string("cuisine");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.dropColumn("name");
    table.dropColumn("cuisine");
  });
}
