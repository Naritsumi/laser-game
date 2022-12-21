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

// Propiedades del proyectil
class Projectile{
    constructor(x,y,radius,color, velocity){
        // Posiciones
        this.x = x
        this.y = y
        // Estilo
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    // Imprimir el proyectil
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()            
    }

    // Movimiento
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// Propiedades del proyectil
class Enemy{
    constructor(x,y,radius,color, velocity){
        // Posiciones
        this.x = x
        this.y = y
        // Estilo
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    // Imprimir el proyectil
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()            
    }

    // Movimiento
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}


// Debemos indicar las coordenadas
const x = canvas.width / 2
const y = canvas.height / 2

// Parámetros para el constructor jugador
const player = new Player(x, y, 30, 'blue')

// Array para un grupo de proyectiles
// y los recorrerá
// (múltiples instancias)
const projectiles = []

/*
function spawnEnemies(){

}
*/

function animate(){
    requestAnimationFrame(animate)   
    // Para evitar llenar el canvas de proyectiles
    c.clearRect(0, 0, canvas.width, canvas.height)    
    player.draw()
    projectiles.forEach(projectile =>
        {
            projectile.update() 
        })
}

addEventListener('click', (event) => {
    // Obtenemos el ángulo entre el cursor y el jugador
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,        
        event.clientX - canvas.width / 2)

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    // Generamos el proyectil con cada click
    projectiles.push(new Projectile(
        canvas.width/2,
        canvas.height/2,
        5,
        'red',
        velocity
        )) 
})

animate()
