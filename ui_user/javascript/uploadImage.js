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
}

function chooseImageFile() {
    const uploadFile = document.getElementById("uploadFile");
    uploadFile.click();
}

const uploadFile = document.getElementById("uploadFile");
let memoryFileName;
let memoryFileValue;

uploadFile.addEventListener("change", function () {
    const imagePreview = document.getElementById("imagePreview");
    const previewNoFileInfo = document.getElementById("previewNoFileInfo");
    const file = this.files[0];
    if (!checkFileType(file)) {
        alert("Please upload a PNG or JPG file.");
        return;
    }
    memoryFileName = this.files[0].name;
    memoryFileValue = this.value;
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

function sendToServer() {
    console.log("memoryFileName :",memoryFileName);
    console.log("memoryFileValue :",memoryFileValue);
}