define([
  'mo/lang'
, 'jquery'
, './mainloop'
], function(_, $, MainLoop) {
  function Game() {
    this.mainLoop = new MainLoop()
    this.mainLoop.preDraw = this.preDraw.bind(this)
    this.sprits = {}

    var canvas = $('.game .canvas')
      , bgCanvas = $('.game .canvas-bg')
    this.stage = {
      height: 720
    , width: 1024
    , x: 0
    , y: 0
    , elem: $('.game .stage')
    , ctx: canvas[0].getContext('2d')
    , bgCtx: bgCanvas[0].getContext('2d')
    }
    canvas.attr({height: this.stage.height, width: this.stage.width})
    bgCanvas.attr({height: this.stage.height, width: this.stage.width})
  }

  _.mix(Game.prototype, {
    start: function() {
      this.mainLoop.start()
      this.initScore()
    }

  , preDraw: function() {
      this.stage.ctx.clearRect(0, 0, this.stage.width, this.stage.height)
    }

  , addSprit: function(name, sprit) {
      if (typeof name == 'string') {
        this.sprits[name] = sprit
        sprit.curCtx = this.stage.ctx
        return this.mainLoop.addSprit(sprit)
      } else {
        return this.mainLoop.addSprit(name)
      }
    }

  , addBgSprit: function(sprit) {
      sprit.curCtx = this.stage.bgCtx
      sprit.draw()
    }

  , initScore: function() {
      this.score = 0
    }

  , random: function(arr) {
      var i = ~~(Math.random() * arr.length)
      return arr[i]
    }
  })

  return new Game()
})
