const { scryptSync, randomBytes } = require('crypto');

exports.hash = (password) => {
  const salt = randomBytes(32).toString('hex');
  const keylen = 64;
  const hashedPassword = scryptSync(password.normalize(), salt, keylen).toString('hex');
  return { hashedPassword, salt, keylen };
};

exports.compare = (clientPassword, dbPassword, salt, keylen) => {
  const hashedClientPassword = scryptSync(clientPassword.normalize(), salt, keylen).toString('hex');
  return hashedClientPassword === dbPassword;
};
