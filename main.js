const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 960
canvas.height = 640

let heroWhere = "heroHouse"
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const mapImg = new Image()
mapImg.src = "assets/map/map.png"
const mapOverImg = new Image()
mapOverImg.src = "assets/map/map-over.png"

const playerImg = new Image()
playerImg.src = "assets/hero/female/female-front.png"
const offset = {
    x: -1250,
    y: -5300
}

const collisionMap = []
for (let i = 0; i < collisionJson.length; i += 148) {
    collisionMap.push(collisionJson.slice(i, 148 + i))
}

const collisionZone = []
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 48393)
            collisionZone.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const tpToFirstFloorMap = []
for (let i = 0; i < tpToFirstFloorJson.length; i += 148) {
    tpToFirstFloorMap.push(tpToFirstFloorJson.slice(i, 148 + i))
}

const tpToFirstFloorZone = []

tpToFirstFloorMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 48397)
            tpToFirstFloorZone.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})


const tpToSecondFloorMap = []
for (let i = 0; i < tpToSecondtFloorJson.length; i += 148) {
    tpToSecondFloorMap.push(tpToSecondtFloorJson.slice(i, 148 + i))
}

const tpToSecondFloorZone = []

tpToSecondFloorMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 48397)
            tpToSecondFloorZone.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const tpToOusideHouseMap = []
for (let i = 0; i < tpToOutsideJson.length; i += 148) {
    tpToOusideHouseMap.push(tpToOutsideJson.slice(i, 148 + i))
}

const tpToOusideHouseZone = []

tpToOusideHouseMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 48397)
            tpToOusideHouseZone.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})


const battleZoneMap = []
for (let i = 0; i < BattlezoneJson.length; i += 148) {
    battleZoneMap.push(BattlezoneJson.slice(i, 148 + i))
}

const battleZones = []

battleZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 48397)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})


const map = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapImg,
})

const mapOver = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapOverImg,
})

const playerInside = new Sprite({
    position: {
        x: canvas.width / 2 - 242 / 4 / 2,
        y: canvas.height / 2 - 78 / 4
    },
    image: playerImg,
    frames: { max: 4 },
    scale: 1.3
})

const playerOutside = new Sprite({
    position: {
        x: canvas.width / 2 - 242 / 4 / 2,
        y: canvas.height / 2 - 78 / 4
    },
    image: playerImg,
    frames: { max: 4 },
    scale: 0.8
})



let animation = false

const movingItems = [
    map, mapOver,
    ...collisionZone, ...tpToFirstFloorZone, ...tpToSecondFloorZone, ...tpToOusideHouseZone, ...battleZones
]
let audiotest = () => {
    if (heroWhere == "outsideHouse") {
        audio.palletTown.play()
    }
}


function preAnimate() {
    window.addEventListener("keydown", audiotest)
    animate()
}

function animate() {
    const animationRepeater = window.requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    map.draw()
    if (heroWhere === "heroHouse") {
        playerInside.draw()
    }
    if (heroWhere === "outsideHouse") {
        playerOutside.draw()
    }
    mapOver.draw()
    let moving = true
    if (keys.w.pressed == true && lastKey == "W") {
        if (heroWhere === "heroHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerInside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 8
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
        }
        if (heroWhere == "outsideHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerOutside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 8
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
        }
        if (moving === true) {
            movingItems.forEach((movable) => {
                movable.position.y += 8
            })
        }
    }
    if (keys.s.pressed == true && lastKey == "S") {
        if (heroWhere === "heroHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerInside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 8
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
            for (let i = 0; i < tpToOusideHouseZone.length; i++) {
                const boundary = tpToOusideHouseZone[i]
                if (
                    isColliding({
                        rectangle1: playerInside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 8
                            }
                        }
                    })
                ) {
                    movingItems.forEach(movingItem => {
                        heroWhere = "outsideHouse"
                        movingItem.position.y += 1650
                        movingItem.position.x -= 680
                    })
                    break
                }
            }
        }
        if (heroWhere == "outsideHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerOutside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 8
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
        }
        if (moving) {
            movingItems.forEach(movingItem => {
                movingItem.position.y -= 8
            })
        }
    }
    if (keys.a.pressed == true && lastKey == "A") {
        if (heroWhere === "heroHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerInside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + 8,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
            for (let i = 0; i < tpToFirstFloorZone.length; i++) {
                const TPZone = tpToFirstFloorZone[i]
                if (
                    isColliding({
                        rectangle1: playerInside,
                        rectangle2: {
                            ...TPZone,
                            position: {
                                x: TPZone.position.x + 8,
                                y: TPZone.position.y
                            }
                        }
                    })
                ) {
                    movingItems.forEach(movingItem => {
                        movingItem.position.x += 1420
                    })
                    break
                }
            }
        }
        if (heroWhere == "outsideHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerOutside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + 8,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
        }
        if (moving) {
            movingItems.forEach(movingItem => {
                movingItem.position.x += 8
            })
        }
    }
    if (keys.d.pressed == true && lastKey == "D") {
        if (heroWhere === "heroHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerInside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - 8,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
            for (let i = 0; i < tpToSecondFloorZone.length; i++) {
                const TPZone = tpToSecondFloorZone[i]
                if (
                    isColliding({
                        rectangle1: playerInside,
                        rectangle2: {
                            ...TPZone,
                            position: {
                                x: TPZone.position.x - 8,
                                y: TPZone.position.y
                            }
                        }
                    })
                ) {
                    movingItems.forEach(movingItem => {
                        movingItem.position.x -= 1420
                    })
                    break
                }
            }
        }
        if (heroWhere == "outsideHouse") {
            for (let i = 0; i < collisionZone.length; i++) {
                const boundary = collisionZone[i]
                if (
                    isColliding({
                        rectangle1: playerOutside,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - 8,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    moving = false
                    break
                }
            }
        }
        if (moving) {
            movingItems.forEach(movingItem => {
                movingItem.position.x -= 8
            })
        }
    }

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlap =
                (Math.min(
                    playerOutside.position.x + playerOutside.width,
                    battleZone.position.x + battleZone.width
                ) -
                    Math.max(playerOutside.position.x, battleZone.position.x)) *
                (Math.min(
                    playerOutside.position.y + playerOutside.height,
                    battleZone.position.y + battleZone.height
                ) -
                    Math.max(playerOutside.position.y, battleZone.position.y))
            if (
                isColliding({
                    rectangle1: playerOutside,
                    rectangle2: battleZone
                }) &&
                overlap < (playerOutside.width * playerOutside.height) / 2 && Math.random() < 0.001) {
                audio.palletTown.stop()
                audio.battle.play()
                window.cancelAnimationFrame(animationRepeater)
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4
                                })
                                ctx.clearRect(0, 0, canvas.width, canvas.height)

                                startBattle(getRandomInt(1, 150))
                            }
                        })
                    }
                })
                break
            }
        }
    }

    const pokemonDefeatedDiv = document.getElementById("pokemonDefeated")
    let localStorageItem = localStorage.getItem("Pokemon Derrotados") ?? 0
    pokemonDefeatedDiv.innerText = "Pokemon derrotados: " + localStorageItem
}
preAnimate()

window.addEventListener("keydown", (e) => {
    switch (e.key.toUpperCase()) {
        case "W": {
            keys.w.pressed = true
            lastKey = "W"
            break
        }
        case "A": {
            keys.a.pressed = true
            lastKey = "A"
            break
        }
        case "S": {
            keys.s.pressed = true
            lastKey = "S"
            break
        }
        case "D": {
            keys.d.pressed = true
            lastKey = "D"
            break
        }
    }
})
window.addEventListener("keyup", (e) => {
    switch (e.key.toUpperCase()) {
        case "W": {
            keys.w.pressed = false
            break
        }
        case "A": {
            keys.a.pressed = false
            break
        }
        case "S": {
            keys.s.pressed = false
            break
        }
        case "D": {
            keys.d.pressed = false
            break
        }
    }
})

