const grid = document.getElementById("grid");
const gridsize = Number(document.getElementById("gridsize").innerHTML)

for (let col = 0; col < gridsize; col++)
{
    const column = document.createElement("div")
    column.className = "column"

    for (let r = gridsize -1; r >=0; r--)
    {
        const row = document.createElement("div")
        row.className = "circle"


       const color= document.getElementById("x"+col+"y"+r).innerHTML
       row.classList.add(color)
       row.addEventListener('click', function() {
            playMove(col)
       });
       column.appendChild(row)

    }
    grid.appendChild(column)
}



/*@for(col <- 0 until grid.size) {
            <div class="column">
            @for(row <- grid.size - 1 to 0 by -1) {
                @grid.getCell(row, col).value match {
                    case Chip.RED => {
                        <div class="circle chip-red x@col y@row" onclick="playMove(@col)"></div>
                    }
                    case Chip.YELLOW => {
                        <div class="circle chip-yellow x@col y@row" onclick="playMove(@col)"></div>
                    }
                    case _ => {
                        <div class="circle chip-empty x@col y@row" onclick="playMove(@col)"></div>
                    }
                }
            }

            */