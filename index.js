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
const player = new Player(x, y, 15, 'white')

// Array para un grupo de proyectiles / enemigos
// y los recorrerá
// (múltiples instancias)
const projectiles = []
const enemies = []

// All enemies
function spawnEnemies() {
    setInterval(() => {
      // Radio del enemigo min - max => 25 - 35
      const radius = Math.random() * (30 - 5) + 5;
      let x;
      let y;
      // Random spawn de enemigos
      if (Math.random() < 0.5) {
        // Si spawnea izquierda o derecha
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
        y = Math.random() * canvas.height
      } else {
        x = Math.random() * canvas.width
        // Si spawnea arriba o abajo
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
      }
      
      // Tienen que ser ` estas comillas para que pueda funcionar el aislamiento del $
      const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
  
      // Ángulo desde el centro del canvas al cursor
       const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
  
      // const power = 1;
  
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }
  
      enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000) //1 seg
}
  
let animationId

function animate(){
    animationId = requestAnimationFrame(animate)  
    c.fillStyle = 'rgba(0, 0, 0, 0.1)' 
    // Para evitar llenar el canvas de proyectiles
    c.fillRect(0, 0, canvas.width, canvas.height)    
    player.draw()
    projectiles.forEach((projectile, index) => {
        projectile.update() 

        // Optimización y borrado de proyectiles offscreen
        // tanto izquierda || derecha || bottom || top
        if(projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width  ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height){
            setTimeout(() => {
                projectiles.splice(index, 1)
                }, 0) 
            }
    })

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update() 

        const distanceGameOver = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        // Game over
        if (distanceGameOver - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationId)
        }

        projectiles.forEach((projectile, projectileIndex) => {
            // Distancia entre dos puntos
            const distanceHitBox = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            if (distanceHitBox - enemy.radius - projectile.radius < 1){
                setTimeout(() => {
                // Eliminamos los items colisionados de cada array
                enemies.splice(enemyIndex, 1)
                projectiles.splice(projectileIndex, 1)
                }, 0) 
            }
        })
    })
}

addEventListener('click', (event) => {
    // Obtenemos el ángulo entre el cursor y el jugador
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,        
        event.clientX - canvas.width / 2)
    
    const velocity = {
        x: Math.cos(angle) * 4,
        y: Math.sin(angle) * 4
    }
    // Generamos el proyectil con cada click
    projectiles.push(new Projectile(
        canvas.width/2,
        canvas.height/2,
        5,
        'rgb(207, 207, 207)',
        velocity
        )) 
})

animate()
spawnEnemies()