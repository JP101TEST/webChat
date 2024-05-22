let allListChatRoomUserHave;
let currentSelectIdChatRoom;
let currentSelectFriendRelationship
let currentSelectFriendId;
let currentSelectUserFriendUsername;
let currentSelectUserFriendImage;
let currentIdUser = parseInt(sessionStorage.getItem("userId"));

const panelMenuList = document.getElementById("panelMenuList");
const buttonSendMessage = document.getElementById("buttonSendMessage");
const panelDetailUserB = document.getElementById("panelDetailUserB");
const panelDetailUserUB = document.getElementById("panelDetailUserUB");
const panelDetailEnabled = document.getElementById("panelDetailEnabled");
const usernameFriend = document.getElementById("usernameFriend");
const imagePerson = document.getElementById("imagePerson");
const blockDetail = document.getElementById("blockDetail");
const panelDetailChat = document.getElementById("panelDetailChat");
const myTextarea = document.getElementById("myTextarea");


async function searchRooms() {
    const listRooms = await getRooms();
    console.log(listRooms);
    allListChatRoomUserHave = listRooms;
    createListRooms(listRooms);
    if (listRooms.length > 0) {
        setDisplay(panelDetailEnabled, "flex");
        //console.log("listRooms[0].id_user :",listRooms[0].id_user);
        //console.log("start status:",status);
        const status = await getDataFriend(listRooms[0].id_user);
        const messageLists = await getMessageLists(listRooms[0].id_room);
        currentSelectIdChatRoom = listRooms[0].id_room;
        currentSelectFriendRelationship = status[0];
        currentSelectFriendId = listRooms[0].id_user;
        currentSelectUserFriendUsername = deleteFrontWord(listRooms[0].username);
        currentSelectUserFriendImage = listRooms[0].image;
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
                    <div class="friendSlot" title="${deleteFrontWord(lists[index].username)}" onclick="setUpChatPanel(${lists[index].id_room},${lists[index].id_user},'${deleteFrontWord(lists[index].username)}','${deleteFrontWord(lists[index].image)}')">
                        <div class="imagePerson">
                            <img src="http://localhost:8000/get/image/${deleteFrontWord(lists[index].image)}" alt="">
                        <div class="activeUser" id="idFriend${lists[index].id_user}"></div>
                        
                        </div>
                        <div class="name">
                            <p >${limitUsername(deleteFrontWord(lists[index].username), 7)}</p>
                        </div>
                    </div>
                    `
        }
    }
    setHTML(panelMenuList, list);

    // const idRoom = 1;
    // const idFriend = 2;
    // const testDiv = document.getElementById(`idRoom${idRoom}idFriend${idFriend}`);
    // if (testDiv) {
    //     testDiv.innerHTML = "TestHelper";
    // } else {
    //     console.error("Element not found");
    // }

    //console.log(friendSlots.children);
}

async function setUpChatPanel(idRoom, idUserFriend, friendUsername, image) {
    const status = await getDataFriend(idUserFriend);
    const messageLists = await getMessageLists(idRoom);
    currentSelectIdChatRoom = idRoom;
    currentSelectFriendRelationship = status[0];
    currentSelectFriendId = idUserFriend;
    currentSelectUserFriendUsername = friendUsername;
    currentSelectUserFriendImage = image;
    resetAllActionInPanelDetailEnabled();
    updateNameRoomInChatPanel();
    renderMessageLists(messageLists);
}

function updateNameRoomInChatPanel() {
    console.log("currentSelectUserFriend :", currentSelectFriendId);
    console.log("currentSelectIdChatRoom :", currentSelectIdChatRoom);
    console.log("currentSelectFriendRelationship :", currentSelectFriendRelationship);
    if (currentSelectFriendRelationship.status == 'unfriend') {
        setDisable(myTextarea, true);
        setDisable(buttonSendMessage, true);
        console.log("currentSelectFriendRelationship.id_user :", currentSelectFriendRelationship.id_user, "|currentIdUser :", currentIdUser);
        if (currentSelectFriendRelationship.id_user === currentIdUser) {
            //console.log("No");
            setText(blockDetail, `You have been blocked.`);
            setDisplay(blockDetail, "flex");
            setDisplay(panelDetailUserB, "none");
            setDisplay(panelDetailUserUB, "none");
        } else {
            setDisplay(panelDetailUserUB, "flex");
            setDisplay(panelDetailUserB, "none");
        }
    } 
    // else {
    //     setDisable(buttonSendMessage, false);
    // }
    setText(usernameFriend, currentSelectUserFriendUsername);
    setAttributeCustom(imagePerson, "src", `http://localhost:8000/get/image/${currentSelectUserFriendImage}`);
}

function hidBlockBottom() {
    setText(blockDetail, `You have been blocked.`);
    setDisplay(blockDetail, "flex");
    setDisplay(panelDetailUserB, "none");
    setDisplay(panelDetailUserUB, "none");
    setDisable(buttonSendMessage, true);
    setDisable(myTextarea, true);
}

function showBlockBottom() {
    setDisplay(blockDetail, "none");
    setDisplay(panelDetailUserUB, "none");
    setDisplay(panelDetailUserB, "flex");
    setDisable(buttonSendMessage, false);
    setDisable(myTextarea, false);
}

async function blockFriend() {
    try {
        // console.log("idFriend :", currentSelectFriendRelationship.id_friend);
        // console.log("idUserFriend :", currentSelectUserFriend);
        const response = await fetch('http://localhost:8000/chat/blockFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idFriend: currentSelectFriendRelationship.id_friend, idUserFriend: currentSelectFriendId })
        });
        if (response.ok) {
            displayBlockFriend();
            return { userIdWhoHashBlock: currentSelectFriendId, userIdWhoBlock: currentIdUser};
        } else {
            console.log("block error");
        }
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

function displayBlockFriend() {
    setDisable(buttonSendMessage, true);
    setDisable(myTextarea, true);
    setInputValue(myTextarea, "");
    setDisplay(panelDetailUserB, "none");
    setDisplay(panelDetailUserUB, "flex");
}
async function unblockFriend() {
    try {
        // console.log("idFriend :", currentSelectFriendRelationship.id_friend);
        const response = await fetch('http://localhost:8000/chat/unblockFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idFriend: currentSelectFriendRelationship.id_friend })
        });
        if (response.ok) {
            const result = await response.json();
            displayUnblockFriend();
            return { userIdWhoHashUnblock: currentSelectFriendId, userIdWhoUnblock: currentIdUser};
        } else {
            console.log("Unblock error");
        }
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

function displayUnblockFriend() {
    setDisable(buttonSendMessage, false);
    setDisable(myTextarea, false);
    setDisplay(panelDetailUserB, "flex");
    setDisplay(panelDetailUserUB, "none");
}

async function sendMessage() {
    try {
        // console.log("idRoom :", currentSelectIdChatRoom);
        // console.log("idUser :", currentIdUser);
        // console.log("myTextarea :", myTextarea.value);
        if (myTextarea.value == "") {
            alert("Message empty");
            return;
        }
        const response = await fetch('http://localhost:8000/chat/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idRoom: currentSelectIdChatRoom, idSendUser: currentIdUser, message: myTextarea.value })
        });
        if (response.ok) {
            //const result = await response.json();
            const oleMessage = myTextarea.value;
            addNewMessage(currentIdUser, myTextarea.value);
            setInputValue(myTextarea, "");
            setDisable(buttonSendMessage, true);
            return {userIdWhoSendMessage: currentIdUser,userIdWhoGetMessage: currentSelectFriendId,message: oleMessage}
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
        const chatBoxInSite = document.createElement("div");
        const messageBlock = document.createElement("div");
        chatBox.classList.add("chatBox");
        chatBoxInSite.classList.add("chatBoxInSite");
        messageBlock.classList.add("message");
        setText(messageBlock, list[index].message);
        if (list[index].id_user != currentIdUser) {
            chatBox.style.justifyContent = "start";
            setHTML(chatBoxInSite, `<div class="imagePerson"> <img src="http://localhost:8000/get/image/${currentSelectUserFriendImage}" alt=""> </div>`);
        } else {
            chatBox.style.justifyContent = "end";

        }
        chatBoxInSite.appendChild(messageBlock);
        chatBox.appendChild(chatBoxInSite);
        panelDetailChat.appendChild(chatBox);
    }
    panelDetailChat.scrollTop = panelDetailChat.scrollHeight;
}

function addNewMessage(idSendUser, message) {
    const chatBox = document.createElement("div");
    const chatBoxInSite = document.createElement("div");
    const messageBlock = document.createElement("div");
    chatBox.classList.add("chatBox");
    chatBoxInSite.classList.add("chatBoxInSite");
    messageBlock.classList.add("message");
    setText(messageBlock, message);
    if (idSendUser != currentIdUser) {
        chatBox.style.justifyContent = "start";
        setHTML(chatBoxInSite, `<div class="imagePerson"> <img src="http://localhost:8000/get/image/${currentSelectUserFriendImage}" alt=""> </div>`);
    } else {
        chatBox.style.justifyContent = "end";

    }
    chatBoxInSite.appendChild(messageBlock);
    chatBox.appendChild(chatBoxInSite);
    panelDetailChat.appendChild(chatBox);
    panelDetailChat.scrollTop = panelDetailChat.scrollHeight;
}

function resetAllActionInPanelDetailEnabled() {
    setDisable(buttonSendMessage, true);
    setDisable(myTextarea, false);
    setInputValue(myTextarea, "");
    setDisplay(panelDetailUserB, "flex");
    setDisplay(panelDetailUserUB, "none");
    setDisplay(blockDetail, "none");
    setHTML(panelDetailChat, ``);
}

function checkInputMessage() {
    if (myTextarea.value == "") {
        setDisable(buttonSendMessage, true);
    }else{
        setDisable(buttonSendMessage, false);
    }
}

function getAllListChatRoomUserHave() {
    return allListChatRoomUserHave;
}

function getCurrentSelectFriendId() {
    return currentSelectFriendId;
}

function getCurrentIdUser() {
    return currentIdUser;
}
