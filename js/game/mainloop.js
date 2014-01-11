define([
  'mo/lang'
, 'jquery' // useless
], function(_, $) {
  window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      }
  }())
  window.cancelAnimationFrame = (function(){
    return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.clearTimeout
  })

  function MainLoop(opts) {
    this.sprits = []
  }

  _.mix(MainLoop.prototype, {
    start: function() {
      this.lasttime = Date.now()
      var step = (function () {
        this.tick()
        this.timer = requestAnimationFrame(step)
      }).bind(this)

      this.timer = requestAnimationFrame(step)
    }
  , stop: function() {
      cancelAnimationFrame(this.timer)
      this.timer = null
    }
  , isRunning: function() {
      return !!this.timer
    }
  , preUpdate: function() {}
  , preDraw: function() {}
  , tick: function() {
      var now = Date.now()
        , dt = (now - this.lasttime) / 1000
      this.lasttime = now

      this.preUpdate(dt)
      this.preDraw()

      this.sprits.forEach(function(sprit, i) {
        sprit.update(dt)
        sprit.draw()
      })
    }
  , addSprit: function(sprit) {
      var origDestroy = sprit.destroy
        , sprits = this.sprits

      sprit.destroy = function() {
        var index = sprits.indexOf(sprit)
        if (index > -1) {
            sprits.splice(index, 1);
        }
        origDestroy.apply(this, arguments)
      }

      sprits.push(sprit)
    }
  , resetSprit: function() {
      this.sprits = []
    }
  })

  return MainLoop
})
