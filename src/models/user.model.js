import knex from "../knex.js";
import getUnixTime from "../utils/getUnixTime.js";

async function createUser(user) {
  const userId = user.user_id;
  const email = user.email;

  const userData = {
    firebase_id: userId,
    display_name: email.split("@")[0],
    email: email,
    createdAt: getUnixTime(),
  };

  try {
    await knex("user").insert(userData);
    return userData;
  } catch (error) {
    console.error(error);
  }
}

export { createUser };
