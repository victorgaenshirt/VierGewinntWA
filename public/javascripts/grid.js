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
    })

    for (let iRow = 0; iRow < this.iGridSize; iRow++) {
        const oRow = document.createElement("div")
        oRow.className = "row d-flex justify-content-evenly"

        for (let iCol = 0; iCol < this.iGridSize; iCol++) {
            const oCellDiv = document.createElement("div");
            oCellDiv.className = "col-1";
            const oCellSpan = document.createElement("span");
            oCellSpan.className = "col bi bi-circle-fill";
            oCellSpan.style = "font-size: 2em";


            const sColor = document.getElementById(`${iRow}.${iCol}`).innerHTML

            switch (sColor) {
                case "RED":
                    oCellSpan.classList.add("text-warning");
                    break;
                case "YELLOW":
                    oCellSpan.classList.add("text-danger");
                    break;
                default:
                    oCellSpan.classList.add("text");
            }
            oCellDiv.addEventListener('click', function () {
                playMove(iCol)
            });
            oCellDiv.appendChild(oCellSpan)
            oRow.appendChild(oCellDiv)

        }
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
    }).then(() => {
        this.iGridSize = 7;
        if(!this.playgroundExists) {
            this.createBlankPlayground()
        }
    });
}

function _parsePlayground(data){
    const pg = data.playground;
    this.sState = data.state;
    this.iGridSize = pg.size;
    this.iGametype = pg.gameType;
    this.oCurrentPlayer = pg.currentPlayer;
    this.oOtherPlayer = pg.otherPlayer;
    this.aCells = pg.cells;
    this.update();
}

