const audio = {
    palletTown: new Howl({
        src: './assets/map/palletTown-music.mp3',
        html5: true,
        volume: 0.1,
        onplay: function () {
            window.removeEventListener("keydown", audiotest)
        }
    }),
    battle: new Howl({
        src: './assets/battle/battleTheme.mp3',
        html5: true,
        volume: 0.1,
    })
}