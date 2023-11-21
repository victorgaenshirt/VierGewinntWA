document.addEventListener("keydown", (event) => {
    const iGridSize = Number(document.getElementById("gridsize").innerHTML);

    const oKeyMappings = {};

    for (let i = 1; i <= iGridSize; i++) {
        oKeyMappings[i.toString()] = () => playMove((i - 1).toString());
    }
    oKeyMappings["n"] = () => newGame(0)

    const sKeyPressed = event.key;

    const fMoveFunction = oKeyMappings[sKeyPressed];

    if (fMoveFunction !== undefined) {
        fMoveFunction();
    }
});