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
    this.stage = {
      height: 720
    , width: 1024
    , x: 0
    , y: 0
    , elem: $('.game .stage')
    , ctx: canvas[0].getContext('2d')
    }
    canvas.attr('height', this.stage.height)
    canvas.attr('width', this.stage.width)

  }

  _.mix(Game.prototype, {
    start: function() {
      this.mainLoop.start()
      this.initScore()
    }

  , preDraw: function() {
      this.stage.ctx.clearRect(0, 0, this.stage.width, this.stage.height)
    }

  , drawImage: function() {
      //this.stage.ctx.drawImage.apply(this.stage.ctx, arguments)
      //this.stage.ctx.drawImage(arguments[0], arguments[1], arguments[2], arguments[3])
      this.stage.ctx.drawImage(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4])

    }

  , addSprit: function(name, sprit) {
      if (typeof name == 'string') {
        this.sprits[name] = sprit
        return this.mainLoop.addSprit(sprit)
      } else {
        return this.mainLoop.addSprit(name)
      }
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
