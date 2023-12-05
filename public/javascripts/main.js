$( document ).ready(function() {
    console.log( "Document is ready" );
    connectWebSocket()
});

function connectWebSocket() {
    const webSocket = new WebSocket("ws://localhost:9000/websocket");
    console.log("WebSocket connected");
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
        if (typeof event.data === "string") {
            console.log('String message received: ' + event.data);
            //new pg
        } else if (event.data instanceof ArrayBuffer) {
            console.log('ArrayBuffer received: ' + event.data);
        } else if (event.data instanceof Blob) {
            console.log('Blob received: ' + event.data);
        }
    }
}

//reactions += {
//  case event:  Changed     =>
//    out ! pgToJson(controller.playground, controller.printState)
//}