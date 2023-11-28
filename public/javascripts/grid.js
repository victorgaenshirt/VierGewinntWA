function createBlankPlayground() {
    this.playgroundExists = true;
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
            case "RED":
                oCell.classList.add("text-warning");
                break;
            case "YELLOW":
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
    const iPlayer = aChips.values[0];
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

