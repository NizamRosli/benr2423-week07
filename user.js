let users;
class User {
	static async injectDB(conn) {
		users = await conn.db("sample_training").collection("users")
	}

	static async register(username, password) {
		// TODO: Check if username exists
		let res = await users.findOne({'username':username});
			console.log(username)
			console.log(res);
			if (res == null){
				// TODO: Hash password
				const bcrypt = require("bcryptjs")
				const saltRounds = 10;
				bcrypt.genSalt(saltRounds, function (saltError, salt) {
					if (saltError) {
						throw saltError
					} else {
						bcrypt.hash(password, salt, function(hashError, hash) {
							if (hashError) {
								throw hashError
							}  else {
			// TODO: Save user to database
								users.insertOne({
									"userName": username,
									"Password": password,
									"HashedPassword": hash});
							}
							console.log("Inserted!!!")
							return 1;

						})
					
					}
				})
			}
			else{
				console.log("Please choose other username!")
				return 0;
			} return 0;
			
		 }
		
		

	static async login(username, password) {
		// TODO: Check if username exists
		let result = await users.findOne({'username':username});
			//console.log(result)
			//console.log(result[0].Password)
			if (result == null){
				return null
			}
			else{
			// TODO: Validate password
			const bcrypt = require("bcryptjs")
            bcrypt.compare(password, result.HashedPassword).then(function(result) {
                //result == true
                //console.log(result);
                if (result == true){
                    console.log("Login Successfully!")
					return 1;
                }
                else{
                    console.log("Login failed!")
                }return 0;
            });
			}

		// TODO: Return user object
		
	}
}

module.exports = User;