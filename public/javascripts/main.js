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

            function newGame(type) {
                fetch("/newGame/" + type, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: "",
                }).then(() => location.reload());
            }