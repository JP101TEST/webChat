const topBarDropdown = document.getElementById("topBarDropdown");
const topBarDropdownMenu = document.getElementById("topBarDropdownMenu");

topBarDropdown.addEventListener('click', function () {
    if (topBarDropdownMenu.style.display === 'block') {
        topBarDropdownMenu.style.display = 'none';
    } else {
        topBarDropdownMenu.style.display = 'block';
    }
});

function backHome() {
    window.location.href = "/html/home.html";
}