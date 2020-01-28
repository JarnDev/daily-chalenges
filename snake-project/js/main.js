const game = document.getElementById('gameArea')
const contexto = game.getContext('2d')
var direction = ''
var speed = 16
var score = 0
var lastPoint = 0
var wallCollision = 113


const fixSize = 16
const gameSize = {
    x: 800,
    y: 800
}

var foodTimeout

var jogo = {
    jogador: {
        body: [{
            x: Math.floor(Math.random() * (gameSize.x - fixSize)),
            y: Math.floor(Math.random() * (gameSize.y - fixSize))
        }]
    },
    food: {}
}

function updateFood() {
    console.log("TESTE")
    jogo.food.x = Math.floor(Math.random() * (gameSize.x - fixSize))
    jogo.food.y = Math.floor(Math.random() * (gameSize.y - fixSize))
    // foodTimeout = setTimeout(updateFood, (Math.floor(Math.random() * (10 - 4)) + 4) * 1000)
    // console.log(jogo.food)
}

document.addEventListener('keydown', keyHandler)
updateFood()



const moveSnake = {
    ArrowLeft() {
        if (jogo.jogador.body[0].x - speed >= 0) {
            jogo.jogador.body[0].x -= speed
            return
        }
        if (wColision()) {
            game.width -= wallCollision
            gameSize.x -= wallCollision
            direction = "ArrowRight"
        }
    },
    ArrowDown() {
        if (jogo.jogador.body[0].y + fixSize + speed <= game.height) {
            jogo.jogador.body[0].y += speed
            return
        }
        if (wColision()) {
            game.height -= wallCollision
            gameSize.y -= wallCollision
            jogo.jogador.body[0].y -= wallCollision
            direction = "ArrowUp"
        }
    },
    ArrowRight() {
        if (jogo.jogador.body[0].x + fixSize + speed <= game.width) {
            jogo.jogador.body[0].x += speed
            return
        }
        if (wColision()) {
            game.width -= wallCollision
            gameSize.x -= wallCollision
            jogo.jogador.body[0].x -= wallCollision
            direction = "ArrowLeft"
        }
    },
    ArrowUp() {
        if (jogo.jogador.body[0].y - speed >= 0) {
            jogo.jogador.body[0].y -= speed
            return
        }
        if (wColision()) {
            game.height -= wallCollision
            gameSize.y -= wallCollision
            direction = "ArrowDown"
        }
    }
}


renderGame()
setInterval(autoMove, 500)

function autoMove() {
    for (let i = jogo.jogador.body.length - 1; i > 0; i--) {
        jogo.jogador.body[i].x = jogo.jogador.body[i - 1].x;
        jogo.jogador.body[i].y = jogo.jogador.body[i - 1].y;
    }

    if (moveSnake[direction]) {
        moveSnake[direction]()
    }

    checkColision()

}


function renderGame() {

    contexto.clearRect(0, 0, 800, 800)
    contexto.fillStyle = 'black'


    contexto.fillRect(jogo.food.x, jogo.food.y, fixSize, fixSize)

    for (index in jogo.jogador.body) {
        if (index == 0) {
            contexto.fillStyle = 'red'
        } else {
            contexto.fillStyle = '#FFCCCB'
        }

        contexto.fillRect(jogo.jogador.body[index].x, jogo.jogador.body[index].y, fixSize, fixSize)
    }


    document.getElementById('point').innerHTML = 'Score: ' + score
    requestAnimationFrame(renderGame)

}

function keyHandler(event) {
    direction = event.key
    autoMove(direction)

}

function wColision() {
    if (game.width - wallCollision <= 0 || game.height - wallCollision <= 0) {
        finish()
        return false
    }
    return true
}

function checkColision() {

    let body = jogo.jogador.body
    let food = jogo.food

    if (body[0].x + fixSize >= food.x && body[0].x <= food.x + fixSize && body[0].y + fixSize >= food.y && body[0].y <= food.y + fixSize) {
        score++
        clearTimeout(foodTimeout)
        body.push({ x: body[body.length - 1].x, y: body[body.length - 1].y })
        updateFood()
    }

    if (food.x >= game.width || food.y >= game.height) {
        updateFood()
    }


    for (i in body) {
        if (i > 1) {
            if (body[0].x == body[i].x && body[0].y == body[i].y) {
                finish()
            }
        }
    }

}


function finish() {
    document.removeEventListener('keydown', keyHandler)
    direction = ''
}

