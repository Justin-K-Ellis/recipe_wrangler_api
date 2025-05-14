export async function up(knex) {
  await knex.schema.alterTable("user", (table) => {
    table.dropColumn("firebase_id");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("user", (table) => {
    table.string("firebase_id");
  });
}
