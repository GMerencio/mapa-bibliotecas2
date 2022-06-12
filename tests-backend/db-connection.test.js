const dbo = require('../db-connection');

test("Testar conexão com BD", () => {
	dbo.connectToServer(function (err) {
		expect(err).toBeFalsy();
	});
});

afterAll(async () => {
	await dbo.closeDb();
});