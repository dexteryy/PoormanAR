
define([
  'mo/lang'
, 'jquery'
, './game'
], function(_, $, game) {
  var levelMap = {
    money: [-1, 50, 100, 200]
  , level: ['', 'well', 'rich', 'tuhao']
  }

  function Player(opts) {
    this.x = 0
    this.y = 0
    this.lastx = 0
    this.lasty = 0
    this.width = 80
    this.height = 30
    this.elem = $('<span>', {
      'class': 'player'
    }).appendTo(game.stage.elem)
    this.money = 0
    this.level = this.getLevel(this.money)

    this.lasttime = Date.now()
  }

  _.mix(Player.prototype, {
    update: function(dt) {
      this.level = this.getLevel(this.money)
      this.vx = (this.x - this.lastx) / dt
      this.vy = (this.y - this.lasty) / dt
      this.lastx = this.x
      this.lasty = this.y
    }
  , draw: function() {
      this.elem.attr('level', this.level)
    }
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
  , getLevel: function(money) {
      return levelMap.level[
        levelMap.money.concat([money])
        .sort(function(a, b) { return a > b })
        .indexOf(money) - 1
      ]
    }
  })

  return Player
})
