define([
  'mo/lang'
, 'jquery'
, './../game'
, './fragment'
], function(_, $, game, Fragment) {

  var TWO_PI = 6.283185307179586

  function Explosion(opts) {
    this.init(opts)
  }

  _.mix(Explosion.prototype, {
    init: function(opts) {
      opts = opts || {}

      this.x = opts.x
      this.y = opts.y
      this.radius = opts.radius

      this.frameCount = 10

      this.initDrawing()
    }
  , update: function(dt) {
    }
  , initDrawing: function() {
      for(var i = 0, ilen = this.frameCount; i < ilen; i ++) {
        game.addSprit(new Fragment({ x: this.x, y: this.y , radius: this.radius}))
      }
    }
  , draw: function() {
    }
  , destroy: function() {
    }
  , outOfrange: function() {
      return (Date.now() - this.start) > this.life
    }
  })

  return Explosion
})
