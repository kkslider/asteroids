(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = Asteroids.Ship.buildShip([Game.DIM_X/2, Game.DIM_Y/2]);
    this.bullets = [];
    this.time = 0;
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 1000;
  Game.FPS = 100;

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++ ){
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++ ){
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        alert('You died!');
        this.stop();
      }
    }
  }

  Game.prototype.checkAllPositions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i];
      if (asteroid.centerX > Game.DIM_X || asteroid.centerY > Game.DIM_Y ||
        asteroid.centerX < 0 || asteroid.centerY < 0) {
          this.asteroids.splice(i, 1);
      }
    }

    for (var i = 0; i < this.bullets.length; i++) {
      var bullet = this.bullets[i];
      if (bullet.centerX > Game.DIM_X || bullet.centerY > Game.DIM_Y ||
        bullet.centerX < 0 || bullet.centerY < 0) {
          this.bullets.splice(i, 1);
      }
    }

    if (this.ship.centerX > Game.DIM_X || this.ship.centerY > Game.DIM_Y ||
      this.ship.centerX < 0 || this.ship.centerY < 0) {
        this.ship = null;
    }
  }

  Game.prototype.fireBullet = function() {
    var that = this;
    console.log(this.ship);
    that.bullets.push(that.ship.fireBullet());
  }



  Game.prototype.bindKeyHandlers = function() {
    var that = this;

    key('space', that.fireBullet.bind(that));

    key('w', function() {
      that.ship.power([0, -1]);
    });

    key('a', function() {
      that.ship.power([-1, 0]);
    });


    key('d', function() {
      that.ship.power([1, 0]);
    });

    key('s', function() {
      that.ship.power([0, 1]);
    });
  };

  Game.prototype.stop = function() {
    clearInterval(this.time);
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.getAttribute("width"), canvas.getAttribute("height"));
    this.ship.draw(ctx);
    this.bullets.forEach(function(bullet) {
      bullet.draw(ctx);
    });
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.removeAsteroids = function() {
    for (i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].hitAsteroids(this.asteroids)) {
        this.bullets.splice(i,1);
      }
    }
  }


  Game.prototype.move = function() {
    this.ship.move(this.ship.vel);
    this.asteroids.forEach(function(asteroid) {
      asteroid.move(asteroid.vel);
    });
    this.bullets.forEach(function(bullet) {
      bullet.move(bullet.vel);
    });
  };

  Game.prototype.step = function() {
    this.move();
    this.draw(this.ctx);
    this.checkCollisions();
    this.checkAllPositions();
    this.addAsteroids(3);
    this.removeAsteroids();
  };


  Game.prototype.start = function() {

    this.bindKeyHandlers();
    var that = this;
    this.time = root.setInterval(function() {
      that.step();
    }, Game.FPS);
  };

})(this);

