const MongoClient = require("mongodb").MongoClient;
const User = require("./user")
//const bcrypt = require("bcryptjs")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.can3v.mongodb.net",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("test", "test")
		console.log(res)
		expect(res).toBe(0)
	})

	test("Duplicate username", async () => {
		const res = await User.register("test", "test")
		console.log(res)
		expect(res).toBe(0)
	})

	test("User login invalid username", async () => {
		const res = await User.login("test1", "test1")
		console.log(res)
		expect(res).toBe(null)
	})

	test("User login invalid password", async () => {
		const res = await User.login("nizam", "test12")
		console.log(res)
		expect(res).toBe(null)
	})

	test("User login successfully", async () => {
		const res = await User.login("nizam", "test123")
		console.log(res)
		expect(res).toBe(null)
	})
});