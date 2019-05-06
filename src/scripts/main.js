let x = "images/x.jpg"
let o = "images/o.png"
let click = 0
let $game = document.querySelector("#game")
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
                    alert(`${player.toUpperCase()} has won!`)

                    if(player != "x") {
                        updateRecord("x", "loss")
                        updateRecord(player, "win")
                    }else{
                        updateRecord(player, "win")
                        updaterecord("o", "loss")
                    }
                }
            }
        })
    }else if(tieCheck === 9){
        alert("The game is a tie!")
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


