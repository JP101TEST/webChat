async function searchFriend() {
    const inputUsername = document.getElementById('inputUsername');
    const userListsPenal = document.getElementById("userListsPenal");
    userListsPenal.innerHTML = ``;
    const userId = sessionStorage.getItem("userId");
    //console.log("inputUsername :", inputUsername.value);
    try {
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
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

async function getRooms() {
    const inputUsername = document.getElementById('inputUsername');
    const panelMenuList = document.getElementById("panelMenuList");
    panelMenuList.innerHTML = ``;
    const userId = sessionStorage.getItem("userId");
    //console.log("inputUsername :", inputUsername.value);
    try {
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
        return resultFromResponse.list;
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

async function getDataFriend(idUserFriend) {
    const userId = sessionStorage.getItem("userId");
    //console.log("getDataFriend idUserFriend:",idUserFriend);
    //console.log("getDataFriend userId:",userId );
    try {
        const response = await fetch('http://localhost:8000/get/getFriendStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userFriendId: idUserFriend, userId: userId })
        });
        const resultFromResponse = await response.json();
        //console.log(resultFromResponse.message);
        //console.log(resultFromResponse.status);
        return resultFromResponse.status;
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

async function getMessageLists(idRoom) {
    try {
        const response = await fetch('http://localhost:8000/get/getMessageLists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idRoom })
        });
        const resultFromResponse = await response.json();
        //console.log(resultFromResponse.message);
        //console.log(resultFromResponse.status);
        return resultFromResponse.lists;
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}