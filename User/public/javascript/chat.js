let currentIdRoom;
let currentFriend;
let currentIdUserFriend;
let currentIdUserFriendUsername;
let currentIdUserFriendImage;
let currentIdUser = parseInt(sessionStorage.getItem("userId"));

const panelMenuList = document.getElementById("panalMenuList");
const buttonSendMessage = document.getElementById("buttonSendMessage");
const panelDetailUserB = document.getElementById("panalDetailUserB");
const panelDetailUserUB = document.getElementById("panalDetailUserUB");
const panelDetailEnable = document.getElementById("panalDetailEnabale");
const usernameFrind = document.getElementById("usernameFrind");
const imagePerson = document.getElementById("imagePerson");
const blockDetail = document.getElementById("blockDetail");
const panelDetailChat = document.getElementById("panalDetailChat");
const myTextarea = document.getElementById("myTextarea");

async function searchRooms() {
    const listRooms = await getRooms();
    createListRooms(listRooms);
    if (listRooms.length > 0) {
        setDisplay(panelDetailEnable, "flex");
        //console.log("listRooms[0].id_user :",listRooms[0].id_user);
        //console.log("start status:",status);
        const status = await getDataFriend(listRooms[0].id_user);
        const messageLists = await getMessageLists(listRooms[0].id_room);
        currentIdRoom = listRooms[0].id_room;
        currentFriend = status[0];
        currentIdUserFriend = listRooms[0].id_user;
        currentIdUserFriendUsername = deletFrontWord(listRooms[0].username);
        currentIdUserFriendImage = listRooms[0].image;
        updateNameRoomInChatPanel();
        renderMessageLists(messageLists);
    }
}

function createListRooms(lists) {
    let list = ``;
    if (lists.length === 0) {
        list = `<div style="display:flex;justify-content: center;align-items: center;"><p>Room not found.</p></div>`;
    } else {
        for (let index = 0; index < lists.length; index++) {
            list += `
                    <div class="friendSlot" title="${deletFrontWord(lists[index].username)}" onclick="setUpChatPanel(${lists[index].id_room},${lists[index].id_user},'${deletFrontWord(lists[index].username)}','${deletFrontWord(lists[index].image)}')">
                        <div class="imagePerson">
                            <img src="http://localhost:8000/get/image/${deletFrontWord(lists[index].image)}" alt="">
                        </div>
                        <div class="name">
                            <p >${limitUsername(deletFrontWord(lists[index].username), 7)}</p>
                        </div>
                    </div>
                    `
        }
    }
    setHTML(panelMenuList, list)
    //console.log(friendSlots.children);
}

async function setUpChatPanel(idRoom, idUserFriend, friendUsername, image) {
    const status = await getDataFriend(idUserFriend);
    const messageLists = await getMessageLists(idRoom);
    currentIdRoom = idRoom;
    currentFriend = status[0];
    currentIdUserFriend = idUserFriend;
    currentIdUserFriendUsername = friendUsername;
    currentIdUserFriendImage = image;
    resetAllActionInPanelDetailEnable();
    updateNameRoomInChatPanel();
    renderMessageLists(messageLists);
}

function updateNameRoomInChatPanel() {
    // console.log("currentIdUserFriend :", currentIdUserFriend);
    // console.log("currentIdRoom :", currentIdRoom);
    // console.log("currentFriend :", currentFriend);
    if (currentFriend.status == 'unfriend') {
        setDisable(myTextarea, true);
        setDisable(buttonSendMessage, true);
        console.log("currentFriend.id_user :", currentFriend.id_user, "|currentIdUser :", currentIdUser);
        if (currentFriend.id_user === currentIdUser) {
            console.log("No");
            setText(blockDetail, `You have been blocked by ${limitUsername(currentIdUserFriendUsername, 9)}.`);
            setDisplay(blockDetail, "flex");
            setDisplay(panelDetailUserB, "none");
            setDisplay(panelDetailUserUB, "none");
        } else {
            setDisplay(panelDetailUserUB, "flex");
            setDisplay(panelDetailUserB, "none");
        }
    } else {
        setDisable(buttonSendMessage, false);
    }
    setText(usernameFrind, currentIdUserFriendUsername);
    setAttributeCustom(imagePerson, "src", `http://localhost:8000/get/image/${currentIdUserFriendImage}`);
}

async function blockFriend() {
    try {
        // console.log("idFrind :", currentFriend.id_friend);
        // console.log("idUserFriend :", currentIdUserFriend);
        const response = await fetch('http://localhost:8000/chat/blockFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idFrind: currentFriend.id_friend, idUserFriend: currentIdUserFriend })
        });
        const result = await response.json();
        if (result) {
            setDisable(buttonSendMessage, true);
            setDisable(myTextarea, true);
            setInputValue(myTextarea, "");
            setDisplay(panelDetailUserB, "none");
            setDisplay(panelDetailUserUB, "flex");
        } else {
            // console.log(error)
        }
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}
async function unblockFriend() {
    try {
        // console.log("idFriend :", currentFriend.id_friend);
        const response = await fetch('http://localhost:8000/chat/unblockFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idFriend: currentFriend.id_friend })
        });
        const result = await response.json();
        if (result) {
            setDisable(buttonSendMessage, false);
            setDisable(myTextarea, false);
            setDisplay(panelDetailUserB, "flex");
            setDisplay(panelDetailUserUB, "none");
        } else {
            // console.log(error)
        }
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

async function sendMessage() {
    try {
        // console.log("idRoom :", currentIdRoom);
        // console.log("idUser :", currentIdUser);
        // console.log("myTextarea :", myTextarea.value);
        const response = await fetch('http://localhost:8000/chat/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idRoom: currentIdRoom, idSendUser: currentIdUser, message: myTextarea.value })
        });
        if (response.ok) {
            const result = await response.json();
            addNewMessage(currentIdUser, myTextarea.value);
            setInputValue(myTextarea, "");
        } else {
            addNewMessage(currentIdUser, "Word is to long!");
        }
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

function renderMessageLists(list) {
    for (let index = 0; index < list.length; index++) {
        const chatBox = document.createElement("div");
        const chatBoxInsite = document.createElement("div");
        const messageBlock = document.createElement("div");
        chatBox.classList.add("chatBox");
        chatBoxInsite.classList.add("chatBoxInsite");
        messageBlock.classList.add("message");
        setText(messageBlock, list[index].message);
        if (list[index].id_user != currentIdUser) {
            chatBox.style.justifyContent = "start";
            setHTML(chatBoxInsite, `<div class="imagePerson"> <img src="http://localhost:8000/get/image/${currentIdUserFriendImage}" alt=""> </div>`);
        } else {
            chatBox.style.justifyContent = "end";

        }
        chatBoxInsite.appendChild(messageBlock);
        chatBox.appendChild(chatBoxInsite);
        panelDetailChat.appendChild(chatBox);
    }
    panelDetailChat.scrollTop = panelDetailChat.scrollHeight;
}

function addNewMessage(idSendUser, message) {
    const chatBox = document.createElement("div");
    const chatBoxInsite = document.createElement("div");
    const messageBlock = document.createElement("div");
    chatBox.classList.add("chatBox");
    chatBoxInsite.classList.add("chatBoxInsite");
    messageBlock.classList.add("message");
    setText(messageBlock, message);
    if (idSendUser != currentIdUser) {
        chatBox.style.justifyContent = "start";
        setHTML(chatBoxInsite, `<div class="imagePerson"> <img src="http://localhost:8000/get/image/${currentIdUserFriendImage}" alt=""> </div>`);
    } else {
        chatBox.style.justifyContent = "end";

    }
    chatBoxInsite.appendChild(messageBlock);
    chatBox.appendChild(chatBoxInsite);
    panelDetailChat.appendChild(chatBox);
    panelDetailChat.scrollTop = panelDetailChat.scrollHeight;
}

function resetAllActionInPanelDetailEnable() {
    setDisable(buttonSendMessage, false);
    setDisable(myTextarea, false);
    setInputValue(myTextarea, "");
    setDisplay(panelDetailUserB, "flex");
    setDisplay(panelDetailUserUB, "none");
    setDisplay(blockDetail, "none");
    setHTML(panelDetailChat, ``);
}