let x = "images/x.jpg"
let o = "images/o.png"
let click = 0
let $game = document.querySelector("#game")
let $newGame = document.querySelector("#newGame")
let $endGameBtn = document.querySelector("#endGame")
let winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
oTurn = false
xArray = []
oArray = []
let counter;

function winChecker(playerArray, winArray, player) {
    let tieCheck = document.querySelectorAll(".taken").length
    if(tieCheck < 9) {
        winArray.forEach(condition => {
            counter = 0
            for(i=0; i < playerArray.length; i++){
                if(condition.find(element => element === playerArray[i]) != undefined){
                    counter += 1
                }
                if(counter === 3){
                    let winner = document.querySelector(`#${player}Player h1`).innerHTML
                    document.querySelector("#gameResult").innerHTML = `${winner.toUpperCase()} has won!`
                    if(player != "x") {
                        displayToggleBtn(".gameOver")
                        updateRecord("x", "loss")
                        updateRecord("o", "win")
                    }else{
                        displayToggleBtn(".gameOver")
                        updateRecord("x", "win")
                        updateRecord("o", "loss")
                    }
                }
            }
        })
    }else if(tieCheck === 9){
        document.querySelector("#gameResult").innerHTML = "The game is a tie!"
        displayToggleBtn(".gameOver")
        updateRecord("x", "tie")
        updateRecord("o", "tie")
    }
}

function placePiece(event, img){
    event.target.style.backgroundImage = `url('${img}')`;
    event.target.className += " taken"
}

$game.addEventListener("click", event => {
    if(event.target.attributes.class.nodeValue === "box taken") {
        alert("That square is taken, please choose a different square")
    } else if(oTurn === false) {
        placePiece(event, x)
        let xMove = parseInt(event.target.id)
        xArray.push(xMove)
        winChecker(xArray, winningConditions, "x")
        oTurn = true
    }else{
        placePiece(event, o)
        let oMove = parseInt(event.target.id)
        oArray.push(oMove)
        winChecker(oArray, winningConditions, "o")
        oTurn = false
    }
})

$newGame.addEventListener("click", () => {
    let box = document.querySelectorAll(".box")
    box.forEach(box => {
        box.style.backgroundImage = "none"
        box.className = "box"
    })
    displayToggleBtn(".gameOver")
    let playerX = document.querySelector(`#xPlayer h1`).innerHTML
    API.searchPlayers(playerX)
    .then(reply => {
        createPlayerCard(reply[0], player1Dom, $player1Display, 1)
    })
    let playerO = document.querySelector(`#oPlayer h1`).innerHTML
    API.searchPlayers(playerO)
    .then(reply => {
        createPlayerCard(reply[0], player2Dom, $player2Display, 2)
    })
})

$endGameBtn.addEventListener("click", () => {
    let box = document.querySelectorAll(".box")
    box.forEach(box => {
        box.style.backgroundImage = "none"
        box.className = "box"
    })
    displayToggleBtn("#players")
    displayToggleBtn(".gameOver")
})


