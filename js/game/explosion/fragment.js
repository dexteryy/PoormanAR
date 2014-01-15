define([
  'mo/lang'
, 'jquery'
, './../game'
], function(_, $, game) {

  var TWO_PI = 6.283185307179586

  function Fragment(opts) {
    this.init(opts)
  }

  var COLORS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ]

  _.mix(Fragment.prototype, {
    init: function(opts) {
      this.stay = true
      opts = opts || {}
      this.x = opts.x
      this.y = opts.y

      this.vx = opts.vx || 0
      this.vy = opts.vy || 0

      this.theta = Math.random() * TWO_PI
      this.wander = 0.15
      this.radius = opts.radius || 10
      this.drag = 0.92

      this.wander = Math.random() * 1.5 + 0.5
      this.color = game.random(COLORS)
      this.drag = Math.random() * 0.09 + 0.9

      var force = Math.random() * 6 + 500
      this.vx += Math.sin( this.theta ) * force
      this.vy += Math.cos( this.theta ) * force

      this.initDrawing()
    }
  , update: function(dt) {
      this.radius *= 0.95

      this.vx *= this.drag
      this.vy *= this.drag

      this.theta += (Math.random() - 0.5) * this.wander
      this.vx += Math.sin( this.theta ) * 30
      this.vy += Math.cos( this.theta ) * 30
      this.radius *= 0.96

      if (this.lock()) {
        this.update = function() {}
        game.addBgSprit(this)
        this.destroy()
      }

      if (this.dead()) {
        this.destroy()
      }

      this.setPosition(dt)
    }
  , initDrawing: function() {
    }
  , draw: function() {
      var ctx = this.curCtx || game.stage.ctx
      //ctx.globalCompositeOperation = 'lighter'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, TWO_PI)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  , destroy: function() {
    }
  , setPosition: function(dt) {
      this.y += this.vy * dt
      this.x += this.vx * dt
    }
  , dead: function() {
      return (this.radius < 0.2)
    }
  , lock: function() {
      return this.stay
        && this.radius < 20
        && ~~(Math.random() * 1.05)
    }
  })

  return Fragment
})
