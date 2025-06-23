import knex from "../knex.js";
import getUnixTime from "../utils/getUnixTime.js";

async function createUser(email, displayName, firebaseId) {
  const userData = {
    display_name: displayName,
    email: email,
    firebase_id: firebaseId,
    createdAt: getUnixTime(),
  };

  try {
    await knex("user_data").insert(userData);
    return userData;
  } catch (error) {
    console.error(error);
  }
}

export { createUser };
