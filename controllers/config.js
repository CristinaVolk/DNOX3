const CONFIG = {
    DB_URL:'mongodb://admin:admin@ds139459.mlab.com:39459/users_of_flatsite',
    DB_URL_AUTH: {
        PASSWORD: "admin",
        USER: "admin"
      },
      HASH_PASSWORD_SECRET: process.env.HASH_PASSWORD_SECRET || 'shhhhh'
};

module.exports = CONFIG;
