const {createApp, ref} = Vue

const app = createApp({})

app.component("mybutton", {
    props: {
        onClick: Function,
        label: String,
        styling: String,
        icon: String
    },
    template: `
    <button class="btn btn-lg m-2 btn-primary" :class="styling" @click="onClick">{{ label }}
        <i :class="icon"></i>
    </button>`
})

app.component("grid-component", {
        data() {
            return {
                dataset: {}
            }
        },
        methods: {
            connectWebSocket() {
                const webSocket = new WebSocket("ws://localhost:9000/websocket");
                webSocket.onopen = async function (event) {
                    webSocket.send("Trying to connect");
                    this.dataset = await handleSocketMessages(event);
                }.bind(this)
                webSocket.onclose = function (event) {
                    console.log("onclose");
                }
                webSocket.onerror = function (error) {
                    console.log("Error" + error + "occurred");
                }
                webSocket.onmessage = async function (event) {
                    this.dataset = await handleSocketMessages(event);
                }.bind(this)
            }
        },
        watch: {},
        created() {
            this.connectWebSocket()
        },
        template: `
        <h2 v-if="dataset.state && dataset.playground.currentPlayer && dataset.state.includes('won')"
        class="text-center text-success">{{dataset.playground.currentPlayer.name}} you won!!</h2>
        <h2 v-else-if="dataset.state && dataset.playground.currentPlayer" class="text-center">
            {{dataset.state}} {{dataset.playground.currentPlayer.name}} it's your turn!</h2>
        <div id="grid" class="mt-5 container-fluid text-center" style=" max-width: 500px"></div>
        `
    }
)
app.mount('#app')
