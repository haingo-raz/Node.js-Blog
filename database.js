const mysql = require('mysql');

//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "user1",
    password: "pass123",
    database: "Coursework3",
    debug: false
});

//Login 
async function loginUser(user, response) {
    //SQL query for login
	let sql = "SELECT * FROM users WHERE username = '" + user.username + "' AND password = '" + user.password + "';"  
		
	//Execute query and output results
	connectionPool.query(sql, (err, result) => {
		if (err) {//Check for errors
			console.error("Error executing query: " + JSON.stringify(err));
			response.send("error");
		} if (result.length > 0) { //result found
			//succesful login
			response.send('Login succesful'); //server response 
		} else { //No matching result
                //if the password or username is invalid, send error status
				response.status(400).json("{Error: Invalid username and / or password!}");
				return;
			}
		});
} //end loginUser()

//register a new user 
async function registerUser(newUser, response){

    //SQL query for sign in
	let sql = "INSERT INTO users (username, email, password) VALUES ('" + newUser.username + "', '" + newUser.email + "','" + newUser.password + "');"  

	//Execute query and output results
	connectionPool.query(sql, (err, result) => {
		if (err) {//Check for errors
			console.error("Error executing query: " + JSON.stringify(err));
			response.send(err);

		} else { 
            response.send(newUser.username + ", you have succesfully created an account"); //server response 
		}
    }); //end connectionPool
}

//update user information
async function updateUserInfo(user, response){
    //SQL query that will update the information of the user
    let sql = "UPDATE users SET email= " +
    "'" + user.email + "',password='" + user.password + "' WHERE username='" + user.username + "';";

    //Execute query and output results
    connectionPool.query(sql, (err, result) => {
    if (err) {//Check for errors
        console.error("Error executing query: " + JSON.stringify(err));
        response.send("error");
    } else {
        response.send("success");
    }
    });
}

//save post 
async function savePostDetails(userDetails, response) {

	if (userDetails.title && userDetails.country && userDetails.content){ //only executes when inputs are given

		//SQL query for new post 
		let sql = "INSERT INTO posts(author, title, country, content, date, time) " +
		"       VALUES ('" + userDetails.username + "', '" + userDetails.title + "', '" + userDetails.country + "', '" + userDetails.content + "', '" + userDetails.date + "', '" + userDetails.time + "')";	
		
		//Execute query and output results
		connectionPool.query(sql, (error, result) => {

			if (error) { //Check for errors
		
				response.send(error);
				console.log(error);
		
			} else {
				//Display the result on console line
				response.send("1 post succesfully added"); //server response 
			}
		});
	} else {
		//client side response
	}
}

//display post on the html page
async function loadAllPosts(response){ //function to display all the posts from the posts table 
	
    //Query to select all the elements
    let sql = "SELECT * FROM posts ORDER BY date DESC, time DESC";

    //Wrap the execution of the query in a promise
    let selectPromise = new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) { //Check for errors
               reject("Error executing query: " + JSON.stringify(err));
            } else { //Resolve promise with results
               resolve(result);
            }
        });
    });

   try {
       //Execute promise and output result
       let allPosts = await selectPromise;

       response.send(JSON.stringify(allPosts)); //Server response to the client side

   } catch (err) {

       throw err;
   }
}

//getting search results
async function getSearchResults(userSearch, response) { 

    //Build query
	let sql = "SELECT * FROM posts WHERE (country = '" + userSearch.keyword + "' OR title LIKE '%" + userSearch.keyword + "%' OR author LIKE '%" + userSearch.keyword + "%' OR content LIKE '%" + userSearch.keyword + "%');";

    //Wrap the execution of the query in a promise
	let selectPromise = new Promise((resolve, reject) => {
		connectionPool.query(sql, (err, result) => {
			if (err) { //Check for errors
			   reject("Error executing query: " + JSON.stringify(err));
			} else { //Resolve promise with results
			   resolve(result);
			}
		});
	});

	try {
	   //Execute promise and output result
	   let allPosts = await selectPromise;
	   response.send(JSON.stringify(allPosts)); //Server response to the client side

	} catch (err) {

	   throw err;
	   //Send response with status 400 for errors
	   //response.status(400).json(err);
	}
}

//Export the functions
module.exports.loginUser = loginUser;
module.exports.registerUser = registerUser;
module.exports.updateUserInfo = updateUserInfo;
module.exports.savePostDetails = savePostDetails;
module.exports.loadAllPosts = loadAllPosts;
module.exports.getSearchResults = getSearchResults;