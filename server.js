//Import modules 
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//js file with database functions
const db = require('./database');

//create express app
const app = express();
//use  bodParser for json strings
app.use(bodyParser.json());

//Configure Express to use the file upload module
app.use(fileUpload());

//associate modules used with express
app.use(
    session({ //express session
        secret: 'secret',
        cookie: { maxAge: 60000 },
        resave: true,
        saveUninitialized: true
    })
);


app.use(express.urlencoded({ extended: true }));

//serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // css and js


//Set up application to handle GET requests 
app.get('/', loadHome);//Load the html page
app.get('/displayPost', displayPost); //Display posts on the front-end

//Set up application to handle POST requests
app.post('/auth', login);//Logs the user in
app.post('/register', register);//register a new user
app.post('/updateuser', updateUser); //update a user information
app.post('/uploadProfilePic', uploadProfilePic); //update a user information
app.post('/newpost', savePost); //Add a new post
app.post('/search', searchPost); //Handle searching




//Render the index page
function loadHome(request, response) {
	// Render the html page
	response.sendFile(path.join(__dirname + '/index.html'));
}


//login on the server side
async function login(request, response) {

	let user = request.body; 
    console.log("Data received: " + JSON.stringify(user)); //receive data from client

	// Ensure the input fields exists and are not empty before proceeding
	if (user.username && user.password) {

		//call the loginUser function in database.js
		db.loginUser(user, response, request);

	} else { //no value entered
		//client side response
	}
}


//Registering a new user
async function register(request, response) {

	let newUser = request.body;

    console.log("Data received: " + JSON.stringify(newUser)); //receive data from client

	// Ensure the input fields exists and are not empty before proceeding
	if (newUser.username && newUser.email && newUser.password) {

		//call the registerUser function in database.js
		db.registerUser(newUser, response);

	} else { //no input given
		//client side response
	}
} //end register



// performs update credentials of registered users
async function updateUser(request, response) { 

    // Capture data sent from the client 
	let user = request.body;

    // Ensure the input fields exists and are not empty before proceeding
	if (user.username && user.email && user.password) {

		//call function in database.js
		db.updateUserInfo(user, response)

	}//end if
}



async function savePost(request, response) {

	// Receive data from the client side
	let userDetails = request.body; 

	console.log("Post details received: " + JSON.stringify(userDetails)); //receive data from client

	//call function in database.js
	db.savePostDetails(userDetails, response);
}


// function that displays the posts on the client page
async function displayPost(request, response) {
	
	//call function in database.js
	db.loadAllPosts(response);
}
    

//Searching a keyword within a post
async function searchPost(request, response) {
   
    let userSearch = request.body;
    console.log("Keyword received: " + JSON.stringify(userSearch));

    db.getSearchResults(userSearch, response); //call the function that will get all matching results with keywords
}



function uploadProfilePic(request, response){ //upload file for the profile picture

	//Check to see if a file has been submitted on this path
	if (!request.files || Object.keys(request.files).length === 0) { //no files submitted
        return response.status(400).send('{"upload": false, "error": "Files missing"}');
    }

    //retrieve the uploaded file
    let myFile= request.files.myFile; 

	console.log(myFile);


    /* Use the mv() method to place the file in the folder called 'uploads' on the server.*/
    myFile.mv('./uploads/' + myFile.name, function(err) {
        if (err)
            return response.status(500).send('{"filename": "' +
				myFile.name + '", "upload": false, "error": "' +
                JSON.stringify(err) + '"}');

        //Send back confirmation of the upload to the client.
        response.send('{"filename": "' + myFile.name +
            '", "upload": true}');

		//change the profile picture into the uploaded file with src
		app.get("/uploadImg", (req, res) => {
			res.sendFile(path.join(__dirname, "./uploads/"+myFile.name));
		});
  });
}



//Export server for testing
module.exports = app;


//listen on the selected port
app.listen(8080);