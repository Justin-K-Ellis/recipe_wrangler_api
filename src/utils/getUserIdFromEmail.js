import knex from "../knex.js";

async function getUseIdFromEmail(email) {
  const rows = await knex.select("id").from("user_data").where("email", email);
  const user_id = rows[0].id;
  return user_id;
}

export default getUseIdFromEmail;
