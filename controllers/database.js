const knex = require("knex");

const getDatabase = (env) => {
    if (env === "dev") {
        const db = knex({
            client: "pg",
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            },
        });
        return db;
    } else {
        const db = knex({
            client: "pg",
            connection: {
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false,
                },
            },
        });
        return db;
    }
};

module.exports = {
    getDatabase,
};
