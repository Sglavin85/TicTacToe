let player1Dom = document.createDocumentFragment()
let player2Dom = document.createDocumentFragment()

function addPlayer(player) {
let newPlayer = {
    name: player.toLowerCase(),
    wins: 0,
    losses: 0,
    ties: 0
}
    return API.addPlayers(newPlayer)
}

function queryPlayer(player) {
    let playerQuery = player.toLowerCase()
    return API.searchPlayers(playerQuery)
}

function createPlayerCard(playerobj, frag, div, num) {
    let name = document.createElement("h1")
    name.setAttribute("id", `user${num}`)
    name.textContent = `${playerobj.name}`
    frag.appendChild(name)
    let record = document.createElement("h2")
    record.textContent = `${playerobj.wins}-${playerobj.losses}-${playerobj.ties}`
    frag.appendChild(record)
    div.innerHTML = ""
    div.appendChild(frag)
}

function updateRecord (player, wlt) {
    let player2Update = document.querySelector(`#${player}Player h1`).innerHTML
    if(wlt === "win"){
    queryPlayer(player2Update)
        .then(reply => {
            console.log(reply)
            let player = reply[0].id
            let newWins = reply[0].wins +1
            let record = {wins: newWins}
            console.log(record)
            API.updateRecord(record, player)
    })
    }else if(wlt === "loss"){
        API.searchPlayers(player2Update)
        .then(reply => {
                let player = reply[0].id
                let newLosses = reply[0].losses +1
                let record = {losses: newLosses}
                API.updateRecord(record, player)
        })
    }else if(wlt === "tie"){
        API.searchPlayers(player2Update)
        .then(reply => {
                let player = reply[0].id
                let newTies = reply[0].ties +1
                let record = {ties: newTies}
                API.updateRecord(record, player)
        })
    }
}

const $player1Return = document.querySelector("#return1")
const $player1SearchBtn = document.querySelector("#search1btn")
const $player1AddBtn = document.querySelector("#add1btn")
const $player1Display = document.querySelector("#xPlayer")
const $player1ReadyBtn = document.querySelector("#ready1")
let player1;


$player1SearchBtn.addEventListener("click", () => {
    let userName = document.querySelector("#search1").value.toLowerCase()
    queryPlayer(userName)
        .then(reply => {
            player1 = reply
            createPlayerCard(reply[0], player1Dom, $player1Return, 1)
        })
    document.querySelector("#search1").value = ""
})

$player1AddBtn.addEventListener("click", () => {
    let userName = document.querySelector("#add1").value.toLowerCase()
    queryPlayer(userName)
        .then(reply => {
            if(reply.length < 1){
                addPlayer(userName)
                    .then(getBack => {
                        createPlayerCard(getBack, player1Dom, $player1Return, 1)
                    })
            }else{
                    document.querySelector("#exist1").innerHTML = `<h1>Existing Player Found</h1>`
                    createPlayerCard(reply[0], player1Dom, $player1Return, 1)
            }
        })
    document.querySelector("#add1").value = ""
})

$player1ReadyBtn.addEventListener("click", () => {
    document.querySelector("#exist1").innerHTML = ""
    if($player1Return.innerHTML === "") {
        let userName = document.querySelector("#user1").innerHTML
        $player1Display.innerHTML = ""
        queryPlayer(userName)
        .then(reply => {
            player1 = reply
            createPlayerCard(reply[0], player1Dom, $player1Return, 1)
        })
    }else if($player1Display.innerHTML === "") {
        let userName = document.querySelector("#user1").innerHTML
        $player1Return.innerHTML = ""
        queryPlayer(userName)
        .then(reply => {
            player1 = reply
            createPlayerCard(reply[0], player1Dom, $player1Display, 1)
            checkForReady(1)
        })
    }
})




const $player2Return = document.querySelector("#return2")
const $player2SearchBtn = document.querySelector("#search2btn")
const $player2AddBtn = document.querySelector("#add2btn")
const $player2Display = document.querySelector("#oPlayer")
const $player2ReadyBtn = document.querySelector("#ready2")
let player2;


$player2SearchBtn.addEventListener("click", () => {
    let userName = document.querySelector("#search2").value.toLowerCase()
    queryPlayer(userName)
        .then(reply => {
            createPlayerCard(reply[0], player2Dom, $player2Return, 2)
        })
    document.querySelector("#search2").value = ""

})

$player2AddBtn.addEventListener("click", () => {
    let userName = document.querySelector("#add2").value.toLowerCase()
    queryPlayer(userName)
        .then(reply => {
            if(reply.length < 1){
                addPlayer(userName)
                    .then(getBack => {
                        createPlayerCard(getBack, player2Dom, $player2Return, 2)
                    })
            }else{
                    document.querySelector("#exist2").innerHTML += `<h1>Existing Player Found</h1>`
                    createPlayerCard(reply, player2Dom, $player2Return, 2)
            }
        })
    document.querySelector("#add2").value = ""
})

$player2ReadyBtn.addEventListener("click", () => {
    document.querySelector("#exist2").innerHTML = ""
    if($player2Return.innerHTML === "") {
        let userName = document.querySelector("#user2").innerHTML
        $player2Display.innerHTML = ""
        queryPlayer(userName)
        .then(reply => {
            player2 = reply
            createPlayerCard(reply[0], player2Dom, $player2Return, 2)
        })
    }else if($player2Display.innerHTML === "") {
        let userName = document.querySelector("#user2").innerHTML
        $player2Return.innerHTML = ""
        queryPlayer(userName)
        .then(reply => {
            player2 = reply
            createPlayerCard(reply[0], player2Dom, $player2Display, 2)
            checkForReady(2)
        })
    }
})

function checkForReady (num) {
    if(num === 1){
        if($player2Display.innerHTML != ""){
            displayToggleBtn("#players")
        }
    }else{
        if($player1Display.innerHTML != ""){
            displayToggleBtn("#players")
        }
    }
}

function displayToggleBtn (element) {
    let div = document.querySelector(element)
    div.classList.toggle("off")
    div.classList.toggle("on")
}