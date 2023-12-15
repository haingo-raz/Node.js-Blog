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

            let imgElement = document.getElementById("pictureImg");
            imgElement.src = '/uploadImg';          
        }
        
    };
    //Send off message to upload file
    httpReq.open('POST', '/uploadProfilePic'); 
    httpReq.send(formData); //send data to the server
}
