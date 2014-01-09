define([
  'mo/lang'
, 'jquery'
, './mainloop'
], function(_, $, MainLoop) {
  function Game() {
    this.mainLoop = new MainLoop()
    this.sprits = {}

    this.stage = {
      height: 720
    , width: 1024
    , x: 0
    , y: 0
    , elem: $('.game .stage')
    }

  }

  _.mix(Game.prototype, {
    start: function() {
      this.mainLoop.start()
      this.initScore()
    }
  , addSprit: function(name, sprit) {
      this.sprits[name] = sprit
      return this.mainLoop.addSprit(sprit)
    }

  , initScore: function() {
      this.score = 0
    }
  })

  return new Game()
})
