export async function up(knex) {
  await knex.schema.renameTable("user", "user_data");
}

export async function down(knex) {
  await knex.schema.renameTable("user_data", "user");
}
