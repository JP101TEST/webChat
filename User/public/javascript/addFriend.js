

function creatListFriends(lists) {
    const userListsPenal = document.getElementById("userListsPenal");
    if (lists.length === 0) {
        userListsPenal.innerHTML = `<div style="display:flex;justify-content: center;align-items: center;"><p>User not found.</p></div>`;
    } else {
        for (let index = 0; index < lists.length; index++) {
            const list = document.createElement("div");
            list.classList.add("list")
            list.innerHTML = `
                            <div class="listHead" id="${index}">
                                <div>
                                    <img src="http://localhost:8000/get/image/${lists[index].image}" alt="Flowers in Chania">
                                </div>
                                <div>
                                    <p>${deletFrontWord(lists[index].username)}</p>
                                </div>
                            </div>
                            <div class="listButton">
                                <button onclick="addFriend(${lists[index].id_user})">add</button>
                            </div>
    `;
            userListsPenal.appendChild(list);
        }
    }
}

async function addFriend(idFriend) {
    const userListsPenal = document.getElementById("userListsPenal");
    userListsPenal.innerHTML = ``;
    const userId = sessionStorage.getItem("userId");
    //console.log("idFriend:",idFriend);
    try {
        const response = await fetch('http://localhost:8000/add/addfriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ friendId: idFriend, userId: userId })
        });
        const resultFromResponse = await response.json();
        console.log(resultFromResponse.message);

        await searchFriend();
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
}

// function deletFrontWord(word) {
//     return word.split("firebaseAuth@").join("");
// }