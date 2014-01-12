define([
  'mo/lang'
, 'jquery'
, './game'
, './explosion/explosion'
], function(_, $, game, Explosion) {

  var ROOT = '../../'
  var images = {}
  initImageSets()

  function initImageSets() {
    var roles = ['james', 'mantou', 'rabbit']
    images = {}
    /*
     * images = {
     *   james: {
     *      poor: {
     *        src: ''
     *      , image: ''
     *      , loaded: ''
     *      }
     *   }
     * }
     *
     */
    roles.forEach(function(name){
      initImageConfig(name)
    })
  }

  function initImageConfig(name) {
    var states = ['poor', 'normal', 'rich', 'gold']
    var image = images[name] = {}
    states.forEach(function(e, i) {
      var state = image[e] = {}
      state.src = ROOT + 'pics/' + name + '-' + e + '.png'

      state.image = new Image()
      state.image.onload = function() {
        state.loaded = true
      }
      state.image.src = state.src
    })
  }

  var TWO_PI = 6.283185307179586

  function Money(opts) {
    opts = opts || {}
    this.roleName = opts.role || 'james'
    this.role = images[this.roleName]

    this.x = game.stage.width / 2
    this.y = -20
    this.saveLastPos()

    this.collisions = []

    this.radius = 20
    this.width = this.radius
    this.height = this.radius

    this.vx = 0
    this.vy = 50
    this.g = 1.008

    this.initDrawing()
  }

  _.mix(Money.prototype, {
    update: function(dt) {
      this.vx += 10 * (Math.random() - 0.5)
      this.vy *= this.g
      this.saveLastPos()
      this.setPosition(dt)
      this.detect()
      if (this.outOfrange()) {
        this.destroy()
      }
    }
  , initDrawing: function() {
      //this.elem = $('<span>', {
        //'class': 'money'
      //}).appendTo(game.stage.elem)
    }
  , draw: function() {
      //if (!this.role.rich.loaded) {return}
      //var image = this.role.rich.image

      //game.drawImage(image
        //, this.x, this.y
        //, image.width, image.height)
      var ctx = game.stage.ctx
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, TWO_PI )
      ctx.fillStyle = '#fff600'
      ctx.fill()
    }
  , destroy: function() {
      //if (!this.elem) {return}
      //this.elem.remove()
      //this.elem = null
    }
  , saveLastPos: function() {
      this.lastX = this.x
      this.lastY = this.y
    }
  , setPosition: function(dt) {
      this.y += this.vy * dt
      this.x += this.vx * dt
    }
  , outOfrange: function() {
      return (this.x + this.width < 0
        || this.y + this.height < 0
        || this.x > game.stage.width
        || this.y > game.stage.height)
    }
  , detect: function() {
      this.collisions.forEach((function(s, i) {
        if(this.detectCollision(s)) {
          this.destroy()
          // Boom !
          this.collideTo(s)
        }
      }).bind(this))
    }
  , collideTo: function(s) {
      new Explosion({
        x: this.x
      , y: this.y
      , vx: s.vx - this.vx
      , vy: s.vy - this.vy
      , radius: this.radius * 1.4
      })
      if (s.collideTo) {
        s.collideTo(this)
      }
    }
  , detectCollision: function(sprit) {
      return (sprit.x < this.x + this.width / 2
        && sprit.x + sprit.width > this.x + this.width / 2
        && sprit.y < this.y + this.height / 2
        && sprit.y + sprit.height > this.y + this.height
        && this.vy - sprit.vy > - 10)
    }
  , addCollision: function() {
      Array.prototype.push.apply(this.collisions, arguments)
    }
  })

  return Money
})
