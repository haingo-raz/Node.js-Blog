//Change the image src on the review slides
let images = ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg', 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg'];

let index = 0;
const imgElement = document.querySelector('#displayed_img');//get id

//set src each of the element index of the images array
function changeImg() {
    
   imgElement.src = images[index];
   index > 1 ? index = 0 : index++;
}

function gallery() {
    setInterval(changeImg, 3000);  
}

gallery(); //call the function

/*Toggling password for login form*/
function passwordVisibility() { 
    var pass = document.getElementById("password"); //access the password input field
    if (pass.type === "password") { /*check datatype and compare values*/
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

/*Toggling password for sign in form*/
function showPass() {
    var pass = document.getElementById("psw");//access the password input field
    if (pass.type === "password") { /*check datatype and compare values*/
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

/*Toggling password for user info form*/
function showNewPass() {
    var pass = document.getElementById("userPsw");//access the password input field
    if (pass.type === "password") { /*check datatype and compare values*/
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}


//Cancel a new post by deleting values inside the input fields
function cancelPost(){

    //Acess the feedback paragraph
    let postFeedback = document.getElementById("postFeedback");
    
    document.getElementById("title_input").value = "";//clear input fields
    document.getElementById("country_input").value = "";
    document.getElementById("content_input").value = "";

    postFeedback.innerHTML = "You canceled the post publication.";

    setTimeout(() => {
        postFeedback.innerHTML = "";
        window.location.href = "/"; //bring to the homepage
    }, 5000);  

} //end cancelPost()


