// utils/password.js
const bcrypt = require('bcryptjs');

const saltRounds = 10; 

/**
 * Hashes a plain text password.
 */
async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain text password with a stored hash.
 */
async function verifyPassword(password, storedHash) {
  return bcrypt.compare(password, storedHash);
}

module.exports = { hashPassword, verifyPassword };