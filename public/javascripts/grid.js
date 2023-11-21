const oGrid = document.getElementById("grid");
const iGridSize = Number(document.getElementById("gridsize").innerHTML)


for (let iRow = 0; iRow < iGridSize; iRow++) {
    const oRow = document.createElement("div")
    oRow.className = "row d-flex justify-content-evenly"

    for (let iCol = 0; iCol < iGridSize; iCol++) {
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
    oGrid.appendChild(oRow)
}

function playMove(column) {
    fetch("/insert/" + column, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: "",
    }).then(() => location.reload());
}
