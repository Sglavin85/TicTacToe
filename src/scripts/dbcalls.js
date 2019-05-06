const API = {
    getPlayers: function () {
        return fetch("http://localhost:8088/players")
            .then(response => response.json());
    },
    searchPlayers: function (player) {
        return fetch(`http://localhost:8088/players?name=${player}`)
            .then(response => response.json())
    },
    addPlayers: function (player) {
        return fetch(`http://localhost:8088/players`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(player)
            })
            .then(response => response.json());
    },
    updateRecord: function (obj, player) {
        return fetch(`http://localhost:8088/players?name=${player}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(response => response.json());
    }
}