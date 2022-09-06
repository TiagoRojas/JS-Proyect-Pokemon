function isColliding({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
let pokemonDefeated = 0

const battlePrincipal = new Image();
battlePrincipal.src = "./assets/battle/background-battle.png"
const battleBar = new Image()
battleBar.src = "./assets/battle/battleBar-principal.png"
const battleBarFight = new Image();
battleBarFight.src = "./assets/battle/battleBar-fight.png"

let movementPoint = 250
function startBattle(id) {
    let menuZone = "principal"
    async function heroPokemonSelect() {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/25")
        const json = await res.json()
        return json
    }
    pokemonRandom(id).then((pokemon) => {
        const pokemonSource = new Image();
        pokemonSource.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const progressBar = document.createElement("progress");
        progressBar.id = "health";
        const healthBarCreator = document.createElement("img");
        healthBarCreator.src = "./assets/battle/health-bar.png";

        const gamespace = document.getElementById("gamezone");
        for (let i = 1; i <= 2; i++) {
            healthBarCreator.setAttribute("id", `healthBar${i}`);
            gamespace.appendChild(healthBarCreator.cloneNode(true));
            progressBar.setAttribute("id", `health${i}`);
            gamespace.appendChild(progressBar.cloneNode(true));
        };



        const backToPrincipal = window.addEventListener("keydown", (e) => {
            switch (e.key.toUpperCase()) {
                case "ESCAPE":
                    menuZone = "principal"
                    document.getElementById("movement0").remove()
                    document.getElementById("movement1").remove()
                    document.getElementById("movement2").remove()
                    document.getElementById("movement3").remove()
                    window.removeEventListener("keydown", backToPrincipal)
                    break;
            }
        })


        const hitMark = document.createElement("div")
        for (let i = 0; i <= 3; i++) {
            hitMark.setAttribute("id", `hitMark${i}`)
            gamespace.append(hitMark.cloneNode(true))
        }
        const fightButton = document.getElementById("hitMark0")
        const pokemonButton = document.getElementById("hitMark1")
        const bagButton = document.getElementById("hitMark2")
        const escapeButton = document.getElementById("hitMark3")


        let enemyHealth = pokemon.stats[0].base_stat

        const name = pokemon.species.name;
        const level = getRandomInt(1, 15);
        const healthProgress = document.getElementById("health1");
        healthProgress.setAttribute("max", enemyHealth)
        healthProgress.setAttribute("value", enemyHealth)

        const heroPokemon = new Image()
        heroPokemon.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png"
        inBattle();
        function inBattle() {
            window.requestAnimationFrame(inBattle)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(battlePrincipal, 0, 0, canvas.width, canvas.height)
            ctx.drawImage(heroPokemon, 100, 250, 300, 300)
            if (menuZone == "principal") {
                ctx.drawImage(battleBar, 0, 0)

            }
            if (menuZone == "fight") {
                ctx.drawImage(battleBarFight, 0, 0)
                ctx.font = "30px pokmon_firered__leafgreen_fRg"
                ctx.fillText("PP", 800, 520)
                ctx.fillText(movementPoint, 740, 520)
            }
            ctx.font = "30px pokmon_firered__leafgreen_fRg"
            ctx.fillText(name.charAt(0).toUpperCase() + name.slice(1), 80, 105)
            ctx.fillStyle = "#000000"
            ctx.fillText("lvl.", 300, 105)
            ctx.fillText(level, 365, 105)
            ctx.drawImage(pokemonSource, 575, 60, 250, 250)
            ctx.fillStyle = "#000000"
            ctx.fillText("lvl.", 780, 350)
            ctx.fillText(level, 840, 350)
            ctx.fillText("Pikachu", 570, 350)


            fightButton.onclick = () => {
                if (menuZone == "principal" && movementPoint > 0) {
                    menuZone = "fight"
                    const movement = document.createElement("p")
                    movement.innerText = "-"
                    for (let i = 0; i <= 3; i++) {
                        movement.setAttribute("id", `movement${i}`)
                        gamespace.append(movement.cloneNode(true))
                    }
                    fetch("https://pokeapi.co/api/v2/pokemon/25")
                        .then((res) => res.json())
                        .then((data) => {
                            let movement1P = document.getElementById("movement0")
                            let movement2P = document.getElementById("movement1")

                            movement1P.innerText = "Placaje"
                            movement2P.innerText = data.abilities[1].ability.name
                            movement1P.onclick = () => {
                                if (movementPoint > 10) {
                                    enemyHealth -= 8
                                    healthProgress.value -= 8
                                    movementPoint -= 5
                                }
                            }
                            movement2P.onclick = () => {
                                if (movementPoint > 10) {
                                    enemyHealth -= 13
                                    healthProgress.value -= 13
                                    movementPoint -= 10
                                } else {
                                    alertify.error('No tienes suficientes puntos de movimiento');
                                }
                            }
                        })
                } else {
                    alertify.error(`No tienes suficientes puntos de movimiento.`);
                    alertify.error(`Es recomendable huir..`)

                }
            }

            pokemonButton.onclick = () => {
                alertify.error(`En desarrollo`)

            }

            bagButton.onclick = () => {
                alertify.error(`En desarrollo`)
            }

            escapeButton.onclick = () => {
                document.getElementById("healthBar1").remove()
                document.getElementById("healthBar2").remove()
                document.getElementById("health1").remove()
                document.getElementById("health2").remove()
                document.getElementById("hitMark0").remove()
                document.getElementById("hitMark1").remove()
                document.getElementById("hitMark2").remove()
                document.getElementById("hitMark3").remove()
                audio.battle.stop()
                audio.palletTown.play()
                animate()
            }
            if (enemyHealth < 0) {
                document.getElementById("movement0").remove()
                document.getElementById("movement1").remove()
                document.getElementById("movement2").remove()
                document.getElementById("movement3").remove()
                document.getElementById("healthBar1").remove()
                document.getElementById("healthBar2").remove()
                document.getElementById("health1").remove()
                document.getElementById("health2").remove()
                document.getElementById("hitMark0").remove()
                document.getElementById("hitMark1").remove()
                document.getElementById("hitMark2").remove()
                document.getElementById("hitMark3").remove()
                enemyHealth = 1
                pokemonDefeated += 1
                localStorage.setItem("Pokemon Derrotados", pokemonDefeated)
                audio.battle.stop()
                audio.palletTown.play()
                animate()
            }
        }
    })
}
async function pokemonRandom(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const json = await res.json()
    return json
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

