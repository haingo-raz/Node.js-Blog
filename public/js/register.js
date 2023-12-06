function registerUser(){

    //access user input values
    let username = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("psw").value;

    //if any empty field
    if (username == "" || email == "" || password == "") {

        document.getElementById('signInFeedback').innerHTML = "Please fill in all fields!"; //notify users

        //delete feedaback after 5 seconds
        setTimeout(() => {
            document.getElementById('signInFeedback').innerHTML = "";
        }, 5000);

    } else { //all input given

        //Set up XMLHttpRequest
        let xhttp = new XMLHttpRequest();

        //Create object with user data
        let usrObj = {
            username: username ,
            email: email,
            password: password
        };

        //Send new user data to server
        xhttp.open("POST", "/register", true); //server.js
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(usrObj)); //send data to server


        //Set up function that is called when reply received from server.js
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {

                //Display successful message
                document.getElementById('signInFeedback').innerHTML = "Welcome " + username + ". You have registered successfully!";
                setTimeout(() => {
                    document.getElementById('signInFeedback').innerHTML = "";
                }, 5000);

            } else {
                //error
            }
        };
    }
} //end registerUser()