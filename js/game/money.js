define([
  'mo/lang'
, 'jquery'
, './game'
, './explosion/explosion'
], function(_, $, game, Explosion) {

  var TWO_PI = 6.283185307179586

  var ROOT = '../../'
  var images = {}
  function initImageSets() {
    var roles = ['bitcoin']
    images = {}
    /*
     * images = {
     *   bitcoin: {
     *      src: ''
     *    , image: ''
     *    , loaded: ''
     *   }
     * }
     *
     */
    roles.forEach(function(name){
      initImageConfig(name)
    })
  }

  function initImageConfig(name) {
    var image = images[name] = {}
    image.src = ROOT + 'pics/' + name + '.png'

    image.image = new Image()
    image.image.onload = function() {
      image.loaded = true
    }
    image.image.src = image.src
  }

  initImageSets()

  function Money(opts) {
    opts = opts || {}

    this.x = game.stage.width / 2
    this.y = -20
    this.saveLastPos()

    this.collisions = []

    var wander = Math.random() * 30 - 15
    this.radius = (40 + wander) / 2
    this.width = this.radius * 2
    this.height = this.radius * 2

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
    }
  , draw: function() {
      var image = images.bitcoin.image
      this.drawImage(image)
    }
  , drawImage: function(image) {
      var ctx = this.curCtx || game.stage.ctx
      ctx.drawImage(image
        , this.x, this.y
        , this.width
        , this.height)
    }
  , destroy: function() {
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
