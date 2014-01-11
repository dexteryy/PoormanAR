define([
  'mo/lang'
, 'jquery'
, './game'
], function(_, $, game) {
  function Money() {
    this.x = game.stage.width / 2
    this.y = -30
    this.saveLastPos()

    this.collisions = []

    this.width = 30
    this.height = 30
    this.vx = 0
    this.vy = 50
    this.g = 1.008
    this.elem = $('<span>', {
      'class': 'money'
    }).appendTo(game.stage.elem)
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
  , draw: function() {
      if (!this.elem) {return}
      this.elem.css({
        left: this.x
      , top: this.y
      })
    }
  , destroy: function() {
      if (!this.elem) {return}
      this.elem.remove()
      this.elem = null
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
          s.money += 10
        }
      }).bind(this))
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
