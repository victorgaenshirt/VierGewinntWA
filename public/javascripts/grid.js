const grid = document.getElementById("grid");
const gridsize = Number(document.getElementById("gridsize").innerHTML)

for (let col = 0; col < gridsize; col++) {
    const column = document.createElement("div")
    column.className = "column"

    for (let r = gridsize - 1; r >= 0; r--) {
        const row = document.createElement("div")
        row.className = "circle"


        const color = document.getElementById("x" + col + "y" + r).innerHTML
        row.classList.add(color)
        row.addEventListener('click', function () {
            playMove(col)
        });
        column.appendChild(row)

    }
    grid.appendChild(column)
}