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
    }
  , addSprit: function(name, sprit) {
      this.sprits[name] = sprit
      return this.mainLoop.addSprit(sprit)
    }
  })

  return new Game()
})
