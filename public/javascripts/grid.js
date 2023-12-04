
function createBlankPlayground() {
    this.playgroundExists = true;
    connectWebSocket();
    const oGrid = document.getElementById("grid");
    for (let iRow = 0; iRow < this.iGridSize; iRow++) {
        const oRow = document.createElement("div")
        oRow.className = "row d-flex justify-content-evenly"

        for (let iCol = 0; iCol < this.iGridSize; iCol++) {
            const oCellDiv = document.createElement("div");
            oCellDiv.className = "col-1";
            const oCellSpan = document.createElement("span");
            oCellSpan.id = `${iRow}.${iCol}`
            oCellSpan.className = "col bi bi-circle-fill";
            oCellSpan.style = "font-size: 2em";
            oCellSpan.classList.add("text");

            oCellDiv.addEventListener('click', function () {
                playMove(iCol)
            });
            oCellDiv.appendChild(oCellSpan)
            oRow.appendChild(oCellDiv)
        }
        oGrid.appendChild(oRow)
    }
}

function update() {
    this.aCells.forEach((cell) => {
        let oCell = document.getElementById(`${cell.row}.${cell.col}`);
        oCell.classList.remove("text", "text-warning", "text-danger", "text-success")
        switch (cell.chip) {
            case "YELLOW":
                oCell.classList.add("text-warning");
                break;
            case "RED":
                oCell.classList.add("text-danger");
                break;
            default:
                oCell.classList.add("text");
        }
    });

    if (this.sState.includes("won")) {
        this.fetchWinningChips();
    }
}

function playMove(column) {
    fetch("/insert/" + column, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: "",
    }).then((response) => {
        response.json().then((data) => this._parsePlayground(data))
    });
}

function newGame(type) {
    this.showToast('abc')
    fetch(`/newGame/${type}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: "",
    }).then((response) => {
        response.json().then((data) => this._parsePlayground(data))
    });

}

function load() {
    fetch(`/load`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: "",
    }).then((response) => {
        response.json().then((data) => this._parsePlayground(data))
    });
}

function save() {
    fetch(`/save`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: "",
    });
}

function undo() {
    fetch(`/undo`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: "",
    }).then((response) => {
        response.json().then((data) => this._parsePlayground(data))
    });
}

function redo() {
    fetch(`/redo`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: "",
    }).then((response) => {
        response.json().then((data) => this._parsePlayground(data))
    });
}

function fetchWinningChips() {
    fetch(`/winnerChips`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json().then((data) => this.winAnimation(data)));
}

function winAnimation(aChips) {
    const iPlayer = aC
    hips.values[0];
    const aChipCoordinates = aChips.values.splice(1, 4);

    const blinkInterval = setInterval(() => {
        aChipCoordinates.forEach(item => {
            const oChipElement = document.getElementById(`${item[0]}.${item[1]}`);
            if (iPlayer === 1) {
                if (oChipElement.classList.contains("text-warning")) {
                    oChipElement.classList.remove("text-warning");
                    oChipElement.classList.add("text-success");
                } else if (oChipElement.classList.contains("text-success")) {
                    oChipElement.classList.remove("text-success");
                    oChipElement.classList.add("text-warning");
                }
            } else if (iPlayer === 2) {
                if (oChipElement.classList.contains("text-danger")) {
                    oChipElement.classList.remove("text-danger");
                    oChipElement.classList.add("text-success");
                } else if (oChipElement.classList.contains("text-success")) {
                    oChipElement.classList.remove("text-success");
                    oChipElement.classList.add("text-danger");
                }
            }
        });
    }, 500);
    setTimeout(() => {
        clearInterval(blinkInterval);
    }, 5000);
}

function _parsePlayground(data) {
    const pg = data.playground;
    this.data = data;
    this.sState = data.state;
    this.iGridSize = pg.size;
    this.iGametype = pg.gameType;
    this.oCurrentPlayer = pg.currentPlayer;
    this.oOtherPlayer = pg.otherPlayer;
    this.aCells = pg.cells;
    if (!this.playgroundExists) {
        this.createBlankPlayground()
    }
    this.update();
}

function showToast(message) {
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = "abc";

    document.body.appendChild(toast);

    setTimeout(function () {
        document.body.removeChild(toast);
    }, 4000);
}

function suggestion(){
    fetch(`http://localhost:3011/api/suggestions`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: data
    }).then(response => response.json().then((data) => {
        oElement = document.getElementById("suggestion");
        oElement.innerHTML = `AI suggests Player ${data.player} to play column: ${data.suggestedColumn}`
    }));
}


function connectWebSocket() {
    console.log("connectWebSocket");
    const webSocket = new WebSocket("ws://localhost:9000/websocket");
    console.log("connected");
    webSocket.onopen = function (event) {
        console.log("onopen");
        webSocket.send("Trying to connect");
    }
    webSocket.onclose = function (event) {
        console.log("onclose");
    }
    webSocket.onerror = function (error) {
        console.log("Error" + error + "occurred");
    }
    webSocket.onmessage = function (event) {
        if(typeof event.data === "string"){
            console.log('String message received: ' + event.data);
        }
        else if(event.data instanceof ArrayBuffer){
            console.log('ArrayBuffer received: ' + event.data);
        }
        else if(event.data instanceof Blob){
            console.log('Blob received: ' + event.data);
        }
    }
}


