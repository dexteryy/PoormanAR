
define([
  'mo/lang'
, 'jquery'
, './game'
], function(_, $, game) {
  function Player(opts) {
    this.x = 0
    this.y = 0
    this.width = 80
    this.height = 30
    this.elem = $('<span>', {
      'class': 'player'
    }).appendTo(game.stage.elem)
  }

  _.mix(Player.prototype, {
    update: $.noop
  , draw: $.noop
  , drawElem: function() {
      this.elem.css({
        left: this.x
      , top: this.y
      })
    }
  , destroy: function() {
      this.elem.remove()
    }
  , setPosition: function(x, y) {
      this.x = x
      this.y = y
    }
  })

  return Player
})
