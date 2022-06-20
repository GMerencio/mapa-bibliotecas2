const { app, connectToDB, closeDb } = require('../app');
const request = require('supertest')(app);

beforeAll(async () => {
	await connectToDB();
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

test('Teste do endpoint api/ies', async () => {
	const query = {
		"NO_UF_IES": "Acre",
		"TP_ORGANIZACAO_ACADEMICA":"3"
	};
	
    const resItem = await request
        .post('/api/ies')
        .send(query)
        .expect(200)
        .expect('Content-Type', /application\/json/);
        
    expect(resItem.body.length).toEqual(6);
});

test('Teste do endpoint api/qtd-ies', async () => {
	const query = {
		"NO_UF_IES": "Acre",
		"TP_ORGANIZACAO_ACADEMICA":"3"
	};
	
    const resItem = await request
        .post('/api/ies/qtd-ies')
        .send(query)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    
    expect(resItem.body.qtd).toEqual(6);
});

afterAll(async () => {
	await closeDb();
});