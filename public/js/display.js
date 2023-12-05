//Access all the sections
var publicnav = document.getElementById("public_nav");//public navigation bar  
var bannerSection = document.getElementById("banner");//Banner  
var infoSection = document.getElementById("user-info");//user information   
var picSection = document.getElementById("profile-pic-section");//profile picture section
var section = document.getElementById("section_two");//recommendations and rules section 
var createPostSection = document.getElementById("new_post"); //create post
var PostSection = document.getElementById("full_post_container");  //posts section
var loginForm =  document.getElementById("login-container"); //login form
var signInForm = document.getElementById("signup-form"); //sign up form
var searchBar = document.getElementById("searchContainer"); //search bar
var searchResults = document.getElementById("searchResult"); //search results

//Loading necessary sections as homepage
function loadHomepage(){

    publicnav.style.display = "block";
    createPostSection.style.display = "none";
    PostSection.style.display = "none";
    infoSection.style.display = "none";
    picSection.style.display = "none";
    searchBar.style.display = "none";
    searchResults.style.display = "none";
}

loadHomepage(); //load the homepage

//show the sign up form
function displaySignup(){
    loadHomepage();
    signInForm.style.display = "block";
    loginForm.style.display = "none";//hide login
}

//show the login form
function displayLogin(){
    loadHomepage();
    loginForm.style.display = "block";
    signInForm.style.display = "none";
}

//Display user information upon Profile click
function displayProfile(){ 

    //No access to the page if the user is not logged in
    if (sessionStorage.length == 0) {
        alert("You have to log in to view this page");      
    }
    else {
        infoSection.style.display = "block";
        picSection.style.display = "block";
        bannerSection.style.display = "none";
        section.style.display = "none";
        createPostSection.style.display = "none";
        PostSection.style.display = "none";  
        loginForm.style.display = "none";
        signInForm.style.display = "none";
        searchResults.style.display = "none";
        searchBar.style.display = "none";
    }
}


//Display post creation upon click
function displayCreatePost(){
    //No access to the page if the user is not logged in
    if (sessionStorage.length == 0) {
        alert("You have to log in to view this page");      
    } else{
        createPostSection.style.display = "block";
        bannerSection.style.display = "none";
        section.style.display = "none";
        PostSection.style.display = "none";
        infoSection.style.display = "none";
        picSection.style.display = "none";
        loginForm.style.display = "none";
        searchBar.style.display = "none";
        searchResults.style.display = "none";
    }
}

//Display full post section
function displayPosts(){
    //No access to the page if the user is not logged in
    if (sessionStorage.length == 0) {
        alert("You have to log in to view this page");      
    } else{
        PostSection.style.display = "block";
        searchBar.style.display = "block";
        searchResults.style.display = "block";
        bannerSection.style.display = "none";
        section.style.display = "none";
        infoSection.style.display = "none";
        createPostSection.style.display = "none"; 
        picSection.style.display = "none"; 
        loginForm.style.display = "none";
    }
}

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

    //Loop through all posts
    for (let i = 0; i < postArray.length; i++) {

        htmlStr += '<div class="full_post">';     
        htmlStr += '<p class="post_date_time">' + postArray[i].date + ' and ' + postArray[i].time + '</p>';
        htmlStr += '<hr>';
        htmlStr += '<p><i class="fa fa-user-circle"></i> ' + postArray[i].author + '</p>';  
        htmlStr += '<h3>' + postArray[i].title + ', ' + postArray[i].country + '</h3>';      
        htmlStr += '<p>' + postArray[i].content + '</p>';
        htmlStr += '</div>';
    }
    
    //Add all div into the posts container
    document.getElementById("full_post_container").innerHTML = htmlStr;
}


function displayUserForm(){

    //Generate the form
    htmlStr = "";

    htmlStr += '<h2>Edit email and/or password</h2>';
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
} // end updateUserInfo()

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
                    window.location.href = "/"; //bring to the homepage
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
} //end publishPost()

window.onload= loadSearchResults(); 

//get the posts from user search
function loadSearchResults(){
    
    let keyword = document.getElementById("searchInput").value; //search entered by user

    if(keyword == ""){
            //if empty do nothing
    }

    else{

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
} //end loadSearchResults()

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

}//end displaySearchedPosts()