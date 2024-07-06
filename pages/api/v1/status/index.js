import database from "infra/database.js"

async function status (request, response) {
    const updatedAt = new Date().toISOString()

    const postgresVersionResult = await database.query('SHOW server_version;')
    const postgresVersionValue = postgresVersionResult.rows[0].server_version

    const databaseMaxConnectionsResult = await database.query("SHOW max_connections")
    const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections

    // Esse método de sanitização evitam SQL injection 
    // sendo uma ferramenta do próprio node-postgress 
    // em quem a query é um objeto contendo o text (query) e values (valores injetados)
    const databaseName = process.env.POSTGRES_DB
    const databadeOpenedConnectionsResult = await database.query({
        text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
        values: [databaseName]
    })
    const databadeOpenedConnectionsValue = databadeOpenedConnectionsResult.rows[0].count

    
    response.status(200).json({
        updated_at: updatedAt,
        dependencies: {
            database: {
                version: postgresVersionValue,
                max_connections: parseInt(databaseMaxConnectionsValue),
                opened_connections: databadeOpenedConnectionsValue
            }
        }
    })
    
    
}

export default status