var MAX_FORCE = 5,
    MAX_VELOCITY = 10,
    MAX_ACCELERATION = 2,
    AIR_RESISTANCE = 0.95,
    MAX_PLAYER_HEALTH = 100;


function Player(x, y, mass){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.resistance = AIR_RESISTANCE;
    this.health = MAX_PLAYER_HEALTH;
    this.mass = mass;
    this.radius = 30;
    this.projectiles = [];
}

Player.prototype = {

    update: function(){
        this.updatePosition();
        this.updateProjectiles();
    },

    draw: function(){
        fill('white');
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
        this.drawHealth();
    },

    drawHealth: function(){
        fill('red');
        rect(this.position.x - 30, this.position.y - 40, 60, 15);
        fill('green');
        rect(this.position.x - 30, this.position.y - 40, this.health / MAX_PLAYER_HEALTH * 60, 15);
        fill('black');
        text(this.health, this.position.x - 10, this.position.y - 27);
    },

    updatePosition: function(){
        if (keyIsDown(87)){
            this.velocity.add(new p5.Vector(0, -MAX_FORCE / this.mass));
        }
        if (keyIsDown(83)){
            this.velocity.add(new p5.Vector(0, MAX_FORCE / this.mass));
        }
        if (keyIsDown(65)){
            this.velocity.add(new p5.Vector(-MAX_FORCE / this.mass, 0));
        }
        if (keyIsDown(68)){
            this.velocity.add(new p5.Vector(MAX_FORCE / this.mass, 0));
        }
        this.velocity.limit(MAX_VELOCITY);
        this.position.add(this.velocity.mult(this.resistance));
    },

    updateProjectiles: function(){
        if (this.projectiles.length > 0){
            for (i = this.projectiles.length - 1; i > 0; i--){
                if (!this.projectiles[i].checkbounds()){
                    this.projectiles[i].update();
                    fill('gray')
                    this.projectiles[i].draw();
                } else {
                    this.projectiles.splice(i, 1);
                }
            }
        }
    },

    addProjectile: function(){
        this.projectiles.push(new Projectile(createVector(mouseX, mouseY), this.position.copy(), 0.2));
    }
}
