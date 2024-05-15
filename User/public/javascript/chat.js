
function createListRooms(lists) {
    const friendSlots = document.getElementById("panalMenuList");
    let list = ``;
    if (lists.length === 0) {
        list = `<div style="display:flex;justify-content: center;align-items: center;"><p>Room not found.</p></div>`;
    } else {
        for (let index = 0; index < lists.length; index++) {
            list += `
                    <div class="friendSlot" title="${deletFrontWord(lists[index].username)}">
                        <div class="imagePerson">
                            <img src="http://localhost:8000/get/image/${deletFrontWord(lists[index].image)}" alt="">
                        </div>
                        <div class="name">
                            <p >${limitUsername(deletFrontWord(lists[index].username))}</p>
                        </div>
                    </div>
                    `
        }
    }
    friendSlots.innerHTML = list;
    //console.log(friendSlots.children);
}

function limitUsername(username) {
    //check size of username
    let resalt = username;
    if (resalt.length > 7) {
        resalt = resalt.substring(0, 7) + "...";
    }
    return resalt;
}
