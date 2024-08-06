//Access all the sections
var loginForm =  document.getElementById("login-container"); //login form
var SignUpForm = document.getElementById("signup-form"); //sign up form

//show the sign up form
function displaySignup(){
    SignUpForm.style.display = "block";
    loginForm.style.display = "none";
}

//show the login form
function displayLogin(){
    loginForm.style.display = "block";
    SignUpForm.style.display = "none";
}

function displayLoggedInUser() {
    let loggedInUser = document.getElementById("profile");
    loggedInUser.innerHTML = sessionStorage.loggedInUsername;
}
window.onload = displayLoggedInUser();

//Load all the posts after the page loads
window.onload = getPosts();
function getPosts() {
    //Create request object 
    let request = new XMLHttpRequest();

    //Set up request with HTTP method and URL 
    request.open("GET", "/displayPost", true);
    //Send request to the server
    request.send(); 

    //Create event handler that specifies what should happen when server responds
    request.onload = () => {
        //Check HTTP status code
        if (request.status == 200 && request.readyState == 4) {

            //Store data from server into global variable
            postsJson = request.responseText;

            //Call display function with data received from server
            displayAllPosts(postsJson);
        } else
            alert("Error communicating with server: " + request.status);
    };
}


//This display all the posts registered in the database in the posts page
function displayAllPosts(jsonPost) {

    //Convert JSON response (from the server) into an array
    let postArray = JSON.parse(jsonPost);

    htmlStr = "";

    //Loop through the element of the post array
    for (let i = 0; i < postArray.length; i++) {

        let date = new Date(postArray[i].date);
        let formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        htmlStr += '<div class="full_post">';     
        htmlStr += '<p class="post_date_time"> Posted on: ' + formattedDate  + ' at ' + postArray[i].time + '</p>';
        htmlStr += '<hr>';
        htmlStr += '<p><i class="fa fa-user-circle"></i> ' + postArray[i].author + '</p>';  
        htmlStr += '<h3>' + postArray[i].title + ', ' + postArray[i].country + '</h3>';      
        htmlStr += '<p>' + postArray[i].content + '</p>';
        // Check if the logged in user is the author of the post
        if (postArray[i].author === sessionStorage.loggedInUsername) {
            htmlStr += `<div class="btn-container"><button onclick="deletePost(${postArray[i].id})">Delete</button></div>`;
        }
        htmlStr += '</div>';
    }
    
    //Add all div into the posts container
    document.getElementById("full_post_container").innerHTML = htmlStr;
}

function displayUserForm(){

    //Generate the form
    htmlStr = "";

    htmlStr += '<h2>View or update your profile details</h2>';
    htmlStr += '   <div class="info_form">';
    htmlStr += '       <div>';
    htmlStr += '           <label>Username</label>';
    htmlStr += '            <input type="text" name="userUsername" id="userUsername" value ="' + sessionStorage.loggedInUsername + '">';
    htmlStr += '        </div>';
    htmlStr += '        <div>';
    htmlStr += '            <label>New Email</label>';
    htmlStr += '           <input type="email" name="userEmail" id="userEmail"/>';
    htmlStr += '        </div>';
    htmlStr += '        <div>';
    htmlStr += '            <label>New Password</label>';
    htmlStr += '            <input type="password" name="userPsw" id="userPsw"/>';
    htmlStr += '        </div>';
    htmlStr += '  <input type="checkbox" onclick="showNewPass()">Show Password';
    htmlStr += '  <input type="submit" onclick="updateUserInfo()" class="btn info_btn" value="Edit"/>';
    htmlStr += '  <p id="updateFeedback"></p>';
    htmlStr += '    </div>';

    //Add all div into the user form info container
    document.getElementById("user-info").innerHTML = htmlStr;
}

//update the information of the logged in user
function updateUserInfo(){

    //access to feedback section
    let updateFeedback = document.getElementById("updateFeedback");

    //access user input
    let username = document.getElementById("userUsername").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("userPsw").value;

    if (username == "" || email == "" || password == ""){
        //Notify users with error message
        updateFeedback.innerHTML = "Please fill in all fields!";
        
        //Delete feedback after 5 seconds
        setTimeout(() => {
            updateFeedback.innerHTML = "";
        }, 5000);
    } else{

        //Set up XMLHttpRequest
        let xhttp = new XMLHttpRequest();

        //Create object populated with input from the user
        let user = {
            username: username,
            email:email,
            password:password
        };

        //Send new user data to server
        xhttp.open("POST", "/updateuser", true); //'/auth' from node.js
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(user)); //send data to server

        //Response after authentification on the server side
        xhttp.onreadystatechange = function() {

            //if appropriate credentials entered
            if (this.readyState == 4 && this.status == 200) { //status ok
                
                //Notify users with error message
                updateFeedback.innerHTML = "Information updated succesfully!";
        
                //Delete feedback after 5 seconds
                setTimeout(() => {
                    updateFeedback.innerHTML = "";
                }, 5000);
            } else {
                //error

            }
        };
    }
}

//call function to display user form
displayUserForm();

//publish a new post 
function publishPost(){

    //Acess the feedback paragraph
    let postFeedback = document.getElementById("postFeedback");

    if (document.getElementById("title_input").value == "" || document.getElementById("content_input").value == "") {
        postFeedback.innerHTML = "Fill out all required fields!";
        //Delete feedback after 5 seconds
        setTimeout(() => {
            postFeedback.innerHTML = "";
        }, 5000);
    } else if (document.getElementById("title_input").value.length < 15){
        postFeedback.innerHTML = "The title should have at least 15 characters!";
        //Delete feedback after 5 seconds
        setTimeout(() => {
            postFeedback.innerHTML = "";
        }, 5000);
    } else {

        //Get current date and time
        let today = new Date();
        let dd = today.getDate(); 
        let mm = today.getMonth() + 1; 
        let yyyy = today.getFullYear();

        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }

        let finalDate = yyyy + '-' + mm + '-' + dd; //the date in year - month - day 

        let title = document.getElementById("title_input").value; //access the title 
        let country = document.getElementById("country_input").value; //access the entered country
        let content = document.getElementById("content_input").value; //access the content 

        let time = new Date();
        let finalTime = (time.toTimeString()).substr(0, 8); //the time

        //Set up XMLHttpRequest
        let xhttp = new XMLHttpRequest();

        //Create object populated with the data
        let postObj = {
            username: sessionStorage.loggedInUsername,
            title: title,
            country: country,
            content: content,
            date: finalDate,
            time: finalTime
        };

        xhttp.open("POST", "/newpost", true); //server
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(postObj)); //send object data to the server in JSON format

        //Upon receiving server's response
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                //Inform user if story has been posted
                postFeedback.innerHTML = "Your post has been added!";
                setTimeout(() => {
                    postFeedback.innerHTML = "";
                    window.location.replace("/posts");
                }, 5000);

            } else {
                //Inform for errors
                postFeedback.innerHTML = "Error! Please try again!";
                setTimeout(() => {
                    postFeedback.innerHTML = "";

                }, 5000);

            }
        };
    }
}

//get the posts from user search
function loadSearchResults(){
    
    let keyword = document.getElementById("searchInput").value; //search entered by user

    if(keyword == ""){
            //if empty do nothing
    } else{
        //Set up XMLHttpRequest
        let xhttp = new XMLHttpRequest();

        //object populated with user input 
        let result = {
            keyword: keyword
        };

        //Send data to the server
        xhttp.open("POST", "/search", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(result)); //send object data to the server in JSON format


        //Upon receiving server's response
        xhttp.onload = () => {

            if (xhttp.readyState == 4 && xhttp.status == 200) {

                //Store data from server into global variable
                postsJson = xhttp.responseText;
                
                //Call display function with data received from server
                displaySearchedPosts(postsJson);

            } else { 
                //error
            }
        };
    }
}

//Display the posts that correspond to the user search
function displaySearchedPosts(jsonPost) {

    //Convert JSON response from server into array
    let postArray = JSON.parse(jsonPost);

    //Display form
    htmlStr = "";
    htmlStr += "<h2>Search results</h2>";

    //Loop till end of array
    for (let i = 0; i < postArray.length; i++) {

        htmlStr += '<div class="full_post">';     
        htmlStr += '<p class="post_date_time">' + postArray[i].date + ' and ' + postArray[i].time + '</p>';
        htmlStr += '<hr>';
        htmlStr += '<p><i class="fa fa-user-circle"></i> ' + postArray[i].author + '</p>';  
        htmlStr += '<h3>' + postArray[i].title + ', ' + postArray[i].country + '</h3>';      
        htmlStr += '<p>' + postArray[i].content + '</p>';
        htmlStr += '</div>';
        htmlStr += '<hr>';
    }
    //Add all div into the search result
    document.getElementById("searchResult").innerHTML = htmlStr;

}

function deletePost(postId) {
    
        //Set up XMLHttpRequest
        let xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", `/delete/${postId}`, true);
    
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status == 200) { 
                alert("Post deleted successfully!")
                location.reload();
            } else {
                console.error('Error:', xhttp.responseText);
            }
        };
    
        xhttp.send(); // Send the request
}