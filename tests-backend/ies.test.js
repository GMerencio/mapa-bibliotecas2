const { app, connectToDB } = require('../app');
const request = require('supertest')(app);

beforeAll(async () => {
	console.log("beforeAll, connect to DB");
	await connectToDB();
	console.log("Finished beforeAll");
});

test('Teste do endpoint api/ies/{cod}', async () => {
    const resItem = await request
        .get('/api/ies/29')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    // Código 29 = UECE (Universidade Estadual do Ceará)
    expect(resItem.body['SG_IES']).toEqual('UECE');
});

test('Teste do endpoint api/ies/estados/{cod}', async () => {
    const resItem = await request
        .get('/api/ies/estados/12')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    // Código 12 = Acre. Quantidade de IES: 11
    expect(resItem.body.length).toEqual(11);
});

test('Teste do endpoint api/ies/municipios/{cod}', async () => {
    const resItem = await request
        .get('/api/ies/municipios/1200203')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    // Código 1200203 = Rio Branco, AC. Quantidade de IES: 1
    expect(resItem.body.length).toEqual(1);
});