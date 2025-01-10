const { Client } = require('pg');

const client = new Client({
    user: 'postgres',  // your PostgreSQL username
    host: 'localhost',
    database: 'blog_app', // the database you created
    password: 'kannan',  // your PostgreSQL password
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Connection error', err.stack));

module.exports = client;
