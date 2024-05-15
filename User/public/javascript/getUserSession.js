function setUpDataInHomePage() {
    //Check login type
    if (sessionStorage.getItem("googleLogin")) {
        // If "googleLogin" is set, remove the "firebaseAuth@" prefix from the username
        const username = sessionStorage.getItem("username").replace(/^firebaseAuth@/, '');
        document.getElementById("username").innerText = username;
    } else {
        // If "googleLogin" is not set, display the username as it is
        document.getElementById("username").innerText = sessionStorage.getItem("username");
    }
    //Get image user
    const imageUserTop = document.getElementById("imageUserTop");
    const image = document.getElementById("image");
    imageUserTop.setAttribute("src", `http://localhost:8000/get/image/${sessionStorage.getItem("image")}`);
    image.setAttribute("src", `http://localhost:8000/get/image/${sessionStorage.getItem("image")}`);
}

function setUpDataInProfilePage() {
    const profileImage = document.getElementById("profileImage");
    const usernameForSession = document.getElementById("usernameForSession");
    const emailForSession = document.getElementById("emailForSession");
    profileImage.setAttribute("src", `http://localhost:8000/get/image/${sessionStorage.getItem("image")}`);
    const googleLogin = sessionStorage.getItem("googleLogin");
    console.log("googleLogin :",googleLogin);
    if (googleLogin === "true") {
        console.log("true");
        usernameForSession.innerText = deletFrontWord(sessionStorage.getItem("username"));
        emailForSession.innerText = deletFrontWord(sessionStorage.getItem("email"));
    } else {
        console.log("false");
        usernameForSession.innerText = sessionStorage.getItem("username")
        emailForSession.innerText = sessionStorage.getItem("email");
    }
}

