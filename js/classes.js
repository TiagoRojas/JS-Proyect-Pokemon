class Boundary {
    static width = 18
    static height = 18
    constructor({ position }) {
        this.position = position
        this.width = 18
        this.height = 18
    }
    draw() {
        ctx.fillStyle = "rgba(0, 255, 0, 0.4)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1 },
        scale = 1,
        actualFrame = 0
    }) {
        this.position = position
        this.image = new Image()
        this.frames = frames


        this.image.onload = () => {
            this.width = (this.image.width / this.frames.max) * scale
            this.height = this.image.height * scale
        }
        this.image.src = image.src
        this.scale = scale
        this.actualFrame = actualFrame
    }



    draw() {
        const image = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.image.width / this.frames.max,
            height: this.image.height
        }

        ctx.drawImage(
            this.image,
            this.actualFrame,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            image.width * this.scale,
            image.height * this.scale
        )
    }
}