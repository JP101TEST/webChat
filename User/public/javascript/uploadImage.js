function openPopUpupLoadImage() {
    const popUpuploadImage = document.getElementById("popUpuploadImage");
    const previewNoFileInfo = document.getElementById("previewNoFileInfo");
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.style.display = "none";
    previewNoFileInfo.style.display = "flex";
    popUpuploadImage.style.display = "block";
}

function closePopUpupLoadImage() {
    const popUpuploadImage = document.getElementById("popUpuploadImage");
    const uploadFile = document.getElementById("uploadFile");
    popUpuploadImage.style.display = "none";
    uploadFile.value = null;
    memoryFile = undefined;
}

function chooseImageFile() {
    const uploadFile = document.getElementById("uploadFile");
    uploadFile.click();
}

const uploadFile = document.getElementById("uploadFile");
let memoryFile;


uploadFile.addEventListener("change", function () {
    const imagePreview = document.getElementById("imagePreview");
    const previewNoFileInfo = document.getElementById("previewNoFileInfo");
    const file = this.files[0];
    if (!checkFileType(file)) {
        alert("Please upload a PNG or JPG file.");
        return;
    }
    memoryFile = this.files[0];

    imagePreview.style.display = "block";
    previewNoFileInfo.style.display = "none";

    const reader = new FileReader(); // Create a new FileReader object
    reader.onload = function () {
        const result = reader.result;
        imagePreview.src = result;
    }
    reader.readAsDataURL(file); // Read the file as a data URL
});


function checkFileType(file) {
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    const fileType = file.type.split('/').pop().toLowerCase();
    return allowedExtensions.includes(fileType);
}

async function sendToServer() {
    if (memoryFile === undefined) {
        alert("Image file is undefined.");
        return;
    }
    const file = memoryFile;
    const formData = new FormData();
    formData.append('file', file);
    const userId = sessionStorage.getItem("userId");
    //console.log("userId :",userId);
    formData.append('userId', userId);

    try {
        const response = await fetch('http://localhost:8000/upload/imageUser', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (response.ok) {
            // Handle successful upload
            console.log('File uploaded successfully');
            chagenSessionDataAfterUploadImage(result.image);
            closePopUpupLoadImage();
        } else {
            // Handle error
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

function chagenSessionDataAfterUploadImage(image) {
    sessionStorage.setItem("image", image);
    setUpDataInHomePage();
    setUpDataInProfilePage();
}