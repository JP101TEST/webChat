async function searchFriend() {
    const inputUsername = document.getElementById('inputUsername');
    const userListsPenal = document.getElementById("userListsPenal");
    userListsPenal.innerHTML = ``;
    const userId = sessionStorage.getItem("userId");
    //console.log("inputUsername :", inputUsername.value);
    const response = await fetch('http://localhost:8000/get/searchFriends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: inputUsername.value, userId: userId })
    });
    const resultFromResponse = await response.json();
    // console.log(resultFromResponse.message);
    // console.log(resultFromResponse.list);
    // console.log(resultFromResponse.list.length);
    await creatListFriends(resultFromResponse.list);
}

async function searchRooms() {
    const inputUsername = document.getElementById('inputUsername');
    const panalMenuList = document.getElementById("panalMenuList");
    panalMenuList.innerHTML = ``;
    const userId = sessionStorage.getItem("userId");
    //console.log("inputUsername :", inputUsername.value);
    const response = await fetch('http://localhost:8000/get/searchRooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: inputUsername.value, userId: userId })
    });
    const resultFromResponse = await response.json();
    // console.log(resultFromResponse.message);
    //console.log(resultFromResponse.list);
    //console.log(resultFromResponse.list.length);
    await createListRooms(resultFromResponse.list);
}