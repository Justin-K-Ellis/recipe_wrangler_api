export async function up(knex) {
  await knex.schema.alterTable("external_recipe", (table) => {
    table.string("name").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropColumn("external_recipe");
}
