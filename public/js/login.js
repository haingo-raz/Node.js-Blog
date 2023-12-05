function loginUser() { //login on the client side

    //Retrieves inputs from login form
    let usrnm = document.getElementById("username").value;
    let psw = document.getElementById("password").value;

    //If no input given
    if (usrnm == "" || psw == "") {

        //Notify users with error message
        document.getElementById('loginFeedback').innerHTML = "Please fill in all fields!";
        
        //Delete feedback after 5 seconds
        setTimeout(() => {
            document.getElementById('loginFeedback').innerHTML = "";
        }, 5000);

    } else if (sessionStorage.loggedInUsername != null){ //a user is already logged in

        //Notify users with error message
        document.getElementById('loginFeedback').innerHTML = "A user is already logged in!";
        //Delete feedback after 5 seconds
        setTimeout(() => {
            document.getElementById('loginFeedback').innerHTML = "";
        }, 5000);

    }  else { //inputs given

        //Set up XMLHttpRequest
        let xhttp = new XMLHttpRequest();

        //Create object populated with input from the user
        let user = {
            username: usrnm,
            password: psw
        };

        //Send new user data to server
        xhttp.open("POST", "/auth", true); //'/auth' from node.js
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(user)); //send data to server

        //Response after authentification on the server side
        xhttp.onreadystatechange = function() {

            //if appropriate credentials entered
            if (this.readyState == 4 && this.status == 200) { //status ok
                
                //save username in session storage
                sessionStorage.loggedInUsername = usrnm;

                //display and hide sections
                document.getElementById("public_nav").style.display = "block";//public nav bar
                document.getElementById("searchContainer").style.display = "block";; //search bar
                document.getElementById("searchResult").style.display = "block";; //search results
                document.getElementById("login-container").style.display = "none"; //login form
                document.getElementById("banner").style.display = "none";//Banner   
                document.getElementById("section_two").style.display = "none";//recommendations and rules section 
                document.getElementById("full_post_container").style.display = "block"; //posts
                document.getElementById("profile-pic-section").style.display = "none"; //profile picture section

                setTimeout(() => {
                    alert('Login succesful'); //notify user after 0.5s
                }, 500);

                //Hide visibility of login and register links
                document.getElementById("loginLink").style.visibility="hidden";
                document.getElementById("registerLink").style.visibility="hidden";   

            } else {
                
                //Display error message for invalid credentials
                document.getElementById('loginFeedback').innerHTML = "Invalid Username and/or Password";

            }
        };
    }
} //end loginUser()


//logout function
function logOut() {

    //No access to the page if the user is not logged in
    if (sessionStorage.length == 0) {
        alert("You have to log in before logging out");      
    }

    else{

        //Clear sessionStorage
        sessionStorage.clear();

        alert('Log out successful');
        window.location.href = "/";

        //Set up XMLHttpRequest
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/logout", true); //'/auth' from node.js
        xhttp.setRequestHeader("Content-type", "application/json");
    }
} //end logOut()

