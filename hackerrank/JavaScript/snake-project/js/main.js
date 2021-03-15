const game = document.getElementById('gameArea')
const contexto = game.getContext('2d')
var direction = ''
var lastDirection = ''
var speed = 16
var score = 0
var lastPoint = undefined
var wallCollision = 113


const playerSize = 16
var foodSize = 16
const gameSize = {}

var foodTimeout
var moveTime

var jogo = {
    jogador: {
        body: []
    },
    food: {},
    type: 'normal'
}

function updateFood() {

    jogo.type = Math.random()

    clearTimeout(foodTimeout)
    if (jogo.type < 0.8) {
        foodSize = 16
        foodTimeout = setTimeout(updateFood, (Math.floor(Math.random() * (10 - 4)) + 4) * 1000)
        jogo.food.x = Math.floor(Math.random() * (gameSize.x - (foodSize * 3)))
        jogo.food.y = Math.floor(Math.random() * (gameSize.y - (foodSize * 3)))
    } else {
        foodSize = 28
        foodTimeout = setTimeout(updateFood, (Math.floor(Math.random() * (5 - 1)) + 1) * 1000)
        jogo.food.x = Math.floor(Math.random() * (gameSize.x - (foodSize * 3)))
        jogo.food.y = Math.floor(Math.random() * (gameSize.y - (foodSize * 3)))
    }

}



startGame()


const moveSnake = {
    ArrowLeft() {
        if (lastDirection == "ArrowRight") {
            direction = "ArrowRight"
            return true
        }
        jogo.jogador.body[0].x -= speed
        lastDirection = "ArrowLeft"

        if (wColision() && (jogo.jogador.body[0].x - speed <= 0)) {
            game.width -= wallCollision
            gameSize.x -= wallCollision
            direction = "ArrowRight"
            lastDirection = "ArrowRight"
            jogo.jogador.body = jogo.jogador.body.reverse()
        }

    },
    ArrowDown() {
        if (lastDirection == "ArrowUp") {
            direction = "ArrowUp"
            return true
        }

        jogo.jogador.body[0].y += speed
        lastDirection = "ArrowDown"

        if (wColision() && (jogo.jogador.body[0].y + playerSize + speed >= game.height)) {
            game.height -= wallCollision
            gameSize.y -= wallCollision
            for (let peace of jogo.jogador.body) {
                peace.y -= wallCollision
            }
            direction = "ArrowUp"
            lastDirection = "ArrowUp"
            jogo.jogador.body = jogo.jogador.body.reverse()
        }
    },
    ArrowRight() {
        if (lastDirection == "ArrowLeft") {
            direction = "ArrowLeft"
            return true
        }

        jogo.jogador.body[0].x += speed
        lastDirection = "ArrowRight"

        if (wColision() && (jogo.jogador.body[0].x + playerSize + speed >= game.width)) {
            game.width -= wallCollision
            gameSize.x -= wallCollision
            for (let peace of jogo.jogador.body) {
                peace.x -= wallCollision
            }
            direction = "ArrowLeft"
            lastDirection = "ArrowLeft"
            jogo.jogador.body = jogo.jogador.body.reverse()
        }

    },
    ArrowUp() {
        if (lastDirection == "ArrowDown") {
            direction = "ArrowDown"
            return true
        }
        jogo.jogador.body[0].y -= speed
        lastDirection = "ArrowUp"
        if (wColision() && (jogo.jogador.body[0].y - speed <= 0)) {
            game.height -= wallCollision
            gameSize.y -= wallCollision
            direction = "ArrowDown"
            lastDirection = "ArrowDown"
            jogo.jogador.body = jogo.jogador.body.reverse()
        }
    }
}



function autoMove() {
    for (let i = jogo.jogador.body.length - 1; i > 0; i--) {
        jogo.jogador.body[i].x = jogo.jogador.body[i - 1].x;
        jogo.jogador.body[i].y = jogo.jogador.body[i - 1].y;
    }

    if (moveSnake[direction]) {
        if (!moveSnake[direction]()) {
            checkColision()
        }
    }


}


function renderGame() {

    contexto.clearRect(0, 0, 800, 800)
    if (jogo.type < 0.8) {
        contexto.fillStyle = 'black'
        contexto.fillRect(jogo.food.x, jogo.food.y, foodSize, foodSize)
    } else {
        contexto.fillStyle = "#" + ((1 << 24) * Math.random() | 0).toString(16)
        contexto.fillRect(jogo.food.x, jogo.food.y, foodSize, foodSize)
    }

    for (index in jogo.jogador.body) {
        if (index == 0) {
            contexto.fillStyle = '#2a7623'
        } else {
            contexto.fillStyle = '#9dd7e2'
        }

        contexto.fillRect(jogo.jogador.body[index].x, jogo.jogador.body[index].y, playerSize, playerSize)
    }

    checkScore()
    document.getElementById('point').innerHTML = 'Score: ' + score
    requestAnimationFrame(renderGame)

}

function checkScore() {
    if (lastPoint) {
        if (score > lastPoint) {
            document.getElementById('point').style.color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
            document.getElementById('lastPoint').style.textDecoration = "line-through"
            lastPoint = undefined
        }
    }
}


function keyHandler(event) {
    if (moveSnake[event.key]) {
        direction = event.key
        autoMove(direction)
    }

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

    if (body[0].x + playerSize >= food.x && body[0].x <= food.x + foodSize && body[0].y + playerSize >= food.y && body[0].y <= food.y + foodSize) {
        if (jogo.type < 0.8) {
            score++
            body.push({ x: body[body.length - 1].x + 1, y: body[body.length - 1].y + 1 })
        } else {
            score += 9
            for (let i = 0; i < 2; i++) {
                body.push({ x: body[body.length - 1].x + 1, y: body[body.length - 1].y + 1 })
            }
        }
        updateFood()
    }

    if (food.x >= game.width || food.y >= game.height) {
        updateFood()
    }


    for (i in body) {
        if (i >= 1) {
            if (body[0].x == body[i].x && body[0].y == body[i].y) {
                finish()
            }
        }
    }

}

function finish() {
    document.removeEventListener('keydown', keyHandler)
    document.getElementById('playAgain').style.display = 'inline-block'
    contexto.fillStyle = "red"
    clearTimeout(foodTimeout)
    clearInterval(moveTime)
    direction = ''
    lastPoint = score
}

function startGame() {
    document.getElementById('playAgain').style.display = 'none'
    document.getElementById('point').style.color = 'black'
    document.getElementById('lastPoint').style.textDecoration = "none"
    if (lastPoint) {
        document.getElementById('lastPoint').innerHTML = "Last: " + lastPoint
    }
    score = 0
    lastDirection = ''
    gameSize.x = 800
    gameSize.y = 800
    game.width = 800
    game.height = 800
    jogo.jogador.body = []
    jogo.jogador.body.push({
        x: Math.floor(Math.random() * (gameSize.x - playerSize)),
        y: Math.floor(Math.random() * (gameSize.y - playerSize))
    })
    document.addEventListener('keydown', keyHandler)
    requestAnimationFrame(renderGame)
    updateFood()
    moveTime = setInterval(autoMove, 30)

}