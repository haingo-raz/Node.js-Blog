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

                setTimeout(() => {
                    alert('Login succesful'); //notify user after 0.5s
                }, 500);

                //Hide visibility of login and register links
                document.getElementById("loginLink").style.visibility="hidden";
                document.getElementById("registerLink").style.visibility="hidden";   
                window.location.replace("/posts");
            } else {
                //Display error message for invalid credentials
                document.getElementById('loginFeedback').innerHTML = "Invalid Username and/or Password";
            }
        };
    }
}


//logout function
function logOut() {
    //Clear sessionStorage
    sessionStorage.clear();

    alert('Log out successful');
    window.location.href = "/";

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/logout", true); //'/auth' from node.js
    xhttp.setRequestHeader("Content-type", "application/json");
}

