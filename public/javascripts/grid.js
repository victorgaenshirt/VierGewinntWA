const grid = document.getElementById("grid");
const gridsize = Number(document.getElementById("gridsize").innerHTML)

for (let iRow = 0; iRow < gridsize; iRow++) {
    const oRow = document.createElement("div")
    oRow.className = "row d-flex justify-content-evenly"

    for (let iCol = 0; iCol < gridsize; iCol++) {
        const oCellDiv = document.createElement("div");
        oCellDiv.className = "col-1";
        const oCellSpan = document.createElement("span");
        oCellSpan.className = "col bi bi-circle-fill";
        oCellSpan.style = "font-size: 2.5em";


        const sColor = document.getElementById(`${iRow}.${iCol}`).innerHTML
        console.log((sColor))
        if (sColor === "RED") {
            oCellSpan.classList.add("text-warning")
        } else if (sColor === "YELLOW") {
            oCellSpan.classList.add("text-danger")
        } else {
            oCellSpan.classList.add("text")
        }
        oCellDiv.addEventListener('click', function () {
            playMove(iCol)
        });
        oCellDiv.appendChild(oCellSpan)
        oRow.appendChild(oCellDiv)

    }
    grid.appendChild(oRow)
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
