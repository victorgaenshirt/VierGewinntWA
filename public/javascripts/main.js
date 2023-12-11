const {createApp, ref} = Vue

app = createApp({
    setup() {
        const message = ref('Hello vue!')
        return {
            message
        }
    }
})

app.component("state", {
        data() {
            const state = ref('Hello Staffte!');
            const player = ref('Player 1')
            return {
                state,
                player
            }
        },
        template: `
        <h2 v-if="state.includes('won')" class="text-center text-success">{{player}} you won!!</h2>
        <h2 v-else class="text-center">{{state}} {{player}} it's your turn!</h2>
        `
    }
)
app.mount('#app')

