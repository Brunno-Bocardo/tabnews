import { Client } from "pg";

async function query(queryObject) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
    });
    await client.connect();

    // Essa estrutura é bem importante aqui, já que mesmo se o banco receba uma uma query corrompida 
    // garantimos que o essa conexão seja encerrada (end()) -> finally 
    try {
        const result = await client.query(queryObject);
        return result;
    } catch (error) {
        console.error(error)
    } finally {
        await client.end();
    } 
}

export default {
    query: query,
};