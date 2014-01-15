define([
  'mo/lang'
, 'jquery'
, './game'
, './money'
], function(_, $, game, Money) {
  // Sprits
  function MoneyEmitter(players) {
    this.velocity = 8
    this.jitter = 5
    this.interval = 1000
    this.players = players
  }

  _.mix(MoneyEmitter.prototype, {
    start: function() {
      this.timer = setInterval(this.emit.bind(this), this.interval)
    }
  , stop: function() {
      if (!this.timer) {return}
      clearInterval(this.timer)
      this.timer = null
    }
  , emit: function() {
      var stageWidth = game.stage.width
      for(var i = 0, ilen = this.getCounts(); i < ilen; i++) {
        var xpos = stageWidth * Math.random()
        var money = new Money()
        money.x = xpos
        money.addCollision.apply(money, this.players)
        game.addSprit('money-' + Date.now() + i, money)
      }
    }
  , getCounts: function() {
      var velocity = this.velocity + (Math.random() - 0.5) * this.jitter
      return velocity * this.interval / 1000
    }
  })

  return MoneyEmitter
})
