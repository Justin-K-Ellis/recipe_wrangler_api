export async function up(knex) {
  await knex.schema.alterTable("user_data", (table) => {
    table.unique("firebase_id");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("user_data", (table) => {
    table.dropUnique("firebase_id");
  });
}
