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
  
      const color = 'green';
  
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
  
function animate(){
    requestAnimationFrame(animate)   
    // Para evitar llenar el canvas de proyectiles
    c.clearRect(0, 0, canvas.width, canvas.height)    
    player.draw()
    projectiles.forEach((projectile) => {
            projectile.update() 
        })

    enemies.forEach((enemy, enemyIndex) => {
            enemy.update() 

            projectiles.forEach((projectile, projectileIndex) => {
                // Distancia entre dos puntos
                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

                if (distance - enemy.radius - projectile.radius < 1){
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
spawnEnemies()