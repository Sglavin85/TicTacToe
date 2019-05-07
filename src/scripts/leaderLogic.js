let $leaderboard = document.querySelector(".leaderbrd")
let $leaderboardBtn = document.querySelector("#leaderBoard")
let $goBackBtn = document.querySelector("#ldrGoBack")


function leaderCard(playerobj, frag, div, num) {
    let name = document.createElement("h1")
    name.setAttribute("id", `user${num}`)
    name.textContent = `${counter}: ${playerobj.name} -${playerobj.wins}-${playerobj.losses}-${playerobj.ties} Win Percentage: ${playerobj.winPerc}`
    frag.appendChild(name)
    div.appendChild(frag)
}

$leaderboardBtn.addEventListener("click", () => {
    let playersArray = []
    displayToggleBtn("#players")
    displayToggleBtn(".leaders")
    API.getPlayers()
    .then(reply => {
        reply.forEach(player => {
            let pWins = parseInt(player.wins)
            let pLosses = parseInt(player.losses)
            let pTies = parseInt(player.ties)
            let winPercentage = pWins/(pWins + pLosses + pTies)
            let playerobj = {
                name: player.name,
                wins: pWins,
                losses: pLosses,
                ties: pTies,
                winPerc: winPercentage.toFixed(3)
            }
            playersArray.push(playerobj)
        })
    })
    .then(_reply => {
        playersArray = playersArray.sort(function (a, b) {
            a.winPerc - b.winPerc
        })
        counter = 1
        playersArray.forEach(player => {
            leaderCard(player, player2Dom, $leaderboard, counter)
            counter ++
        })
    })
})

$goBackBtn.addEventListener("click", () => {
    $leaderboard.innerHTML = ""
    displayToggleBtn("#players")
    displayToggleBtn(".leaders")
})

