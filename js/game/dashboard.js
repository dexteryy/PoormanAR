define([
  'mo/lang'
, 'jquery'
, './mainloop'
], function(_, $, MainLoop) {
  function Dashboard() {
    this.board = $('.dashboard')
    this.playerTmpl = $('#player-board').html() // failed using web componment with jQuery
  }

  _.mix(Dashboard.prototype, {
    addPlayer: function(player) {
      var oldUpdate = player.update
        , self = this
      this.initPlayerBoard(player)
      Object.observe(player, function(changes) {
        changes = changes.filter(function(change) {
          return change.name in { 'money':1, 'level': 1 }
        })
        if (changes.length) {
          self.updatePlayerBoard(player)
        }
      })
    }
  , initPlayerBoard: function(player) {
      player.board = $(this.playerTmpl)
      this.board.append(player.board)
      this.renderPlayerBoard(player)
    }
  , renderPlayerBoard: function(player) {
      player.board.find('.name').text(player.name)
      this.updatePlayerBoard(player)
    }
  , updatePlayerBoard: function(player) {
      player.board.find('.score').text(player.money)
      player.board.find('.level').text(player.level)
    }
  })

  return new Dashboard()
})
