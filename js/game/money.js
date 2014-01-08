define([
  'mo/lang'
, 'jquery'
, './game'
], function(_, $, game) {
  function Money() {
    this.x = game.stage.width / 2
    this.y = 0
    this.saveLastPos()

    this.collisions = []

    this.width = 30
    this.height = 30
    this.elem = $('<span>', {
      'class': 'money'
    }).appendTo(game.stage.elem)
  }

  _.mix(Money.prototype, {
    update: function(dt) {
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
      this.elem.remove()
      this.elem = null
    }
  , saveLastPos: function() {
      this.lastX = this.x
      this.lastY = this.y
    }
  , setPosition: function(dt) {
      this.y += dt / 100
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
          console.log('catched')
        }
      }).bind(this))
    }
  , detectCollision: function(sprit) {
      //console.log(sprit.x, sprit.y, this.x, this.y)
      return (sprit.x < this.x
        && sprit.x + sprit.width > this.x + this.width
        && sprit.y < this.y + this.height
        && sprit.y + sprit.height > this.y + this.height)
    }
  , addCollision: function(sprit) {
      this.collisions.push(sprit)
    }
  })

  return Money
})
