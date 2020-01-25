const game = document.getElementById('gameArea')
const contexto = game.getContext('2d')
var direction = 'ArrowDown'
var speed = 6

const jogador = {
    "head": { x: 0, y: 0, color: 'red' }
}

const food = {
    'comida': { x: 200, y: 200 },
    'comida2': { x: 300, y: 300 }
}

document.addEventListener('keydown', keyHandler)

const moveSnake = {
    ArrowLeft() {
        if (jogador.head.x - speed >= 0) {
            jogador.head.x -= speed
            return
        }
        if (reduceArea()) {
            game.width -= 113
            direction = "ArrowRight"
        }
    },
    ArrowDown() {
        if (jogador.head.y + 15 + speed <= game.height) {
            jogador.head.y += speed
            return
        }
        if (reduceArea()) {
            game.height -= 113
            jogador.head.y -= 113
            direction = "ArrowUp"
        }
    },
    ArrowRight() {
        if (jogador.head.x + 15 + speed <= game.width) {
            jogador.head.x += speed
            return
        }
        if (reduceArea()) {
            game.width -= 113
            jogador.head.x -= 113
            direction = "ArrowLeft"
        }
    },
    ArrowUp() {
        if (jogador.head.y - speed >= 0) {
            jogador.head.y -= speed
            return
        }
        if (reduceArea()) {
            game.height -= 113
            direction = "ArrowDown"
        }
    }
}


renderGame()

function renderGame() {

    contexto.clearRect(0, 0, 800, 800)
    contexto.fillStyle = 'black'
    for (item in food) {
        contexto.fillRect(food[item]["x"], food[item]["y"], 16, 16)
    };
    contexto.fillStyle = 'red'
    contexto.fillRect(jogador.head.x, jogador.head.y, 16, 16)

    moveSnake[direction]()
    requestAnimationFrame(renderGame)

}

function keyHandler(event) {
    if (moveSnake[event.key]) {
        direction = event.key
    }
}

function reduceArea() {
    if (game.width - 113 <= 0 || game.height - 113 <= 0) {
        document.removeEventListener('keydown')
        return false
    }
    return true
}


