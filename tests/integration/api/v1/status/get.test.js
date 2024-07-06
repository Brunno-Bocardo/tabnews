test("GET to /api/v1/status should return 200", async () => {
    // Aqui nós estamos fazendo um teste que escuta esse endpoint e 
    // espera que o seu response.status seja 200 
    const response = await fetch("http://localhost:3000/api/v1/status")
    expect(response.status).toBe(200);

    // depois, pegamos o response (que veio como um texto puro) 
    // e transformamos ele em um json, em algo que possamos mexer
    const responseBody = await response.json()

    // Aqui esperamos que, mesmo definida, o valor de updated_at 
    // seja algo válido, e não algo aleatório (ou outra data)
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()    
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

    expect(responseBody.dependencies.database.version).toEqual("16.0")
    expect(responseBody.dependencies.database.max_connections).toEqual(100)
    expect(responseBody.dependencies.database.opened_connections).toEqual(1)

    console.log(responseBody)
})