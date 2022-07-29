function displaySection(){
    //hide sections
    document.getElementById("banner").style.display = "none";
    document.getElementById("section_two").style.display = "none";
    document.getElementById("new_post").style.display = "none";
    document.getElementById("full_post_container").style.display = "none";

    //Display appropriate blocks after the profile picture is uploaded
    document.getElementById("user_nav").style.display="block";//private nav bar
    document.getElementById("profile-pic-section").style.display="block";////profile pic form
    document.getElementById("user-info").style.display="block";////info form 
}

//Reference to profileResponse div
let profileResponse = document.getElementById("profileResponse");

//upload file for profile picture change 
function uploadProfilePic(){

    //Clear server response
    profileResponse.innerHTML = "";

    //Get file that we want to upload
    let fileArray = document.getElementById("FilePicInput").files;

    if(fileArray.length !== 1){ //no file selected
        profileResponse.innerHTML = "Please select file to upload."; //feedback
        return;
    }

    //Otherwise, put file inside FormData object
    const formData = new FormData();
    formData.append('myFile', fileArray[0]); //key is what the server is looking for
    //Set up HTTP Request
    let httpReq = new XMLHttpRequest();

    //response
    httpReq.onload = () => {
        let response = JSON.parse(httpReq.responseText);
        if("error" in response) //Error from server
            profileResponse.innerHTML = response.error;
        else {
            profileResponse.innerHTML = "File uploaded successfully";
             //call the section to display the block we need
             window.onload = function() {
                var reloading = sessionStorage.getItem("reloading");
                if (reloading) {
                    sessionStorage.removeItem("reloading");
                    displaySection();
                }
            }
            
        }
        
    };

    //Send off message to upload file
    httpReq.open('POST', '/uploadProfilePic'); 
    httpReq.send(formData); //send data to the server
}// end uploadProfilePic()