const GRAVITATIONAL_CONSTANT = 0.003;
const PI = 3.14159;
const OBJECT_DENSITY = 0.5;
const MAX_OBJECT_RADIUS = 100;
const MIN_OBJECT_RADIUS = 20;
const MAX_OBJECT_MASS = 1.333 * PI * MAX_OBJECT_RADIUS * MAX_OBJECT_RADIUS * MAX_OBJECT_RADIUS * OBJECT_DENSITY;
const MAX_OBJECTS = 5;
const SPAWN_CHANCE = 0.1;

function Object(radius, x, y, isFixed) {
	this.position = createVector(x, y);
	this.velocity = createVector(Math.random() * 10 - 5, Math.random() * 10 - 5);
	this.acceleration = createVector(0, 0);
	this.setRadius(radius);
	this.fixed = isFixed;

	this.collided = false;
	this.history = [];
	this.last = millis()
	this.timer = 0;
}

Object.prototype = {
	update: function (force) {
		if (!this.fixed) {
			this.acceleration = force.div(this.mass);
			this.velocity.add(this.acceleration);
			this.position.add(this.velocity);
			
			delta = millis() - this.last;
			this.last = millis();

			this.timer += delta;
			if (this.timer > 100){
				this.history.push(this.position.copy());
				this.timer = 0;
			}
			
			if (this.history.length > 100){
				this.history.splice(0, 1);
			}
		}
	},

	draw: function () {
		if (!this.fixed){
			arrowend = this.position.copy().add(this.acceleration.copy().mult(1000).limit(100))
			stroke(255)
			line(this.position.x, this.position.y, arrowend.x, arrowend.y);
			ellipse(arrowend.x, arrowend.y, 5, 5)
		}

		for (l = 0; l < this.history.length; l++){
			pos = this.history[l];
			colour = l / this.history.length * 255
			size = Math.log10(1 / l) * 5
			stroke(0)
			fill(colour);
			ellipse(pos.x, pos.y, size, size);
		}
		fill(255 - this.mass / MAX_OBJECT_MASS * 150);
		ellipse(this.position.x, this.position.y, this.radius, this.radius);
	},

	setRadius: function (radius) {
		this.mass = 1.333 * PI * radius * radius * radius * OBJECT_DENSITY;
		this.radius = radius;
	},
}

var objects = [];

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0)
	canvas.style('z-index', -1)
	//objects.push(new Object(MAX_OBJECT_RADIUS, 0.75 * windowWidth, 0.5 * windowHeight, true))
	//objects.push(new Object(MAX_OBJECT_RADIUS, 0.25 * windowWidth, 0.5 * windowHeight, true))
	objects.push(new Object(MAX_OBJECT_RADIUS, 0.5 * windowWidth, 0.5 * windowHeight, true))
}

function draw() {
	background(40);

	for (p = objects.length - 1; p >= 0; p--) { if (objects[p].collided || objects[p].position.x < -windowWidth || objects[p].position.x > 2 * windowWidth || objects[p].position.y < -windowHeight || objects[p].position.x > 2 * windowHeight)  { objects.splice(p, 1) } }
	if (Math.random() < SPAWN_CHANCE && objects.length < MAX_OBJECTS && document.getElementById("spawncheckbox").checked) { objects.push(new Object(Math.random() * (MAX_OBJECT_RADIUS - MIN_OBJECT_RADIUS - 20) + MIN_OBJECT_RADIUS, Math.random() * windowWidth, Math.random() * windowHeight, false)) }

	for (i = 0; i < objects.length; i++) {
		forceSum = createVector(0, 0);
		for (j = 0; j < objects.length; j++) {
			if (i == j) { continue; }
			dist = p5.Vector.dist(objects[i].position, objects[j].position);
			if (dist < 0.5 * (objects[i].radius + objects[j].radius) && objects[i].radius > objects[j].radius) {
				objects[j].collided = true;
				break;
			}
			mag = (GRAVITATIONAL_CONSTANT * objects[i].mass * objects[j].mass) / (dist * dist);
			forceSum.add((objects[j].position.copy().sub(objects[i].position.copy())).normalize().mult(mag));
		}
		objects[i].update(forceSum)
		objects[i].draw();
	}
}

function mouseClicked() {
	object = new Object(Math.random() * (MAX_OBJECT_RADIUS - MIN_OBJECT_RADIUS) + MIN_OBJECT_RADIUS, mouseX, mouseY, false)
	objects.push(object)
}
