const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Full width & height
canvas.width = innerWidth
canvas.height = innerHeight

// Propiedades del jugador
class Player{
    constructor(x,y,radius,color){
        // Posiciones
        this.x = x
        this.y = y
        // Estilo
        this.radius = radius
        this.color = color
    }

    // Imprimir el jugador
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()            
    }
}

// Debemos indicar las coordenadas
const x = canvas.width / 2
const y = canvas.height / 2

// Parámetros para el constructor jugador
const player = new Player(x, y, 30, 'blue')

player.draw()

addEventListener('click', (event) => {
    // Capturar coordenadas ratón
    /*
    const projectile = new Projectile{
        
    }
    */
})