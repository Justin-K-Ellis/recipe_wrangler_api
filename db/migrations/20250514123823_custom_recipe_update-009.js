export async function up(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.string("notes", 1024);
  });
}

export async function down(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.dropColumn("notes");
  });
}
