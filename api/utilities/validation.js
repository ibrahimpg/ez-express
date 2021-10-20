exports.validateNewUser = (username, password, email, companyName, companyDescription) => {
  const validationErrors = [];

  if (typeof username !== 'string') validationErrors.push('Username wrong data type.');
  if (!/^[a-z0-9]+$/.test(username)) validationErrors.push('Username not lowercase alphanumeric.');
  if (username.length < 6) validationErrors.push('Username too short.');
  if (username.length > 16) validationErrors.push('Username too long.');

  if (password.length < 8) validationErrors.push('Password too short.');
  if (password.length > 32) validationErrors.push('Password too long.');

  if (!/^\w+([.-]?\w)*@\w+([.-]?\w+)*(\.\w{2,7})+$/.test(email)) validationErrors.push('Invalid email address.');

  if (companyName.length > 50 || typeof companyName !== 'string') validationErrors.push('Invalid company name.');
  if (companyDescription.length > 125 || typeof companyDescription !== 'string') validationErrors.push('Invalid company description.');

  if (validationErrors.length > 0) return [false, validationErrors];
  return [true];
};

exports.validateUsername = (username) => {
  const validationErrors = [];

  if (typeof username !== 'string') validationErrors.push('Username wrong data type.');
  if (!/^[a-z0-9]+$/.test(username)) validationErrors.push('Username not lowercase alphanumeric.');
  if (username.length < 6) validationErrors.push('Username too short.');
  if (username.length > 16) validationErrors.push('Username too long.');

  if (validationErrors.length > 0) return [false, validationErrors];
  return [true];
};

exports.validatePassword = (password) => {
  const validationErrors = [];

  if (password.length < 8) validationErrors.push('Password too short.');
  if (password.length > 32) validationErrors.push('Password too long.');

  if (validationErrors.length > 0) return [false, validationErrors];
  return [true];
};

exports.validateEmail = (email) => {
  const validationErrors = [];

  if (!/^\w+([.-]?\w)*@\w+([.-]?\w+)*(\.\w{2,7})+$/.test(email)) validationErrors.push('Invalid email address.');

  if (validationErrors.length > 0) return [false, validationErrors];
  return [true];
};
