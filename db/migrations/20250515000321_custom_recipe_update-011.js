export async function up(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("user_data");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("custom_recipe", (table) => {
    table.dropColumn("user_id");
  });
}
