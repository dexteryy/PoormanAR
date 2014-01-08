define([
  'mo/lang'
, 'jquery'
, './game'
, './player'
, './money'
], function(_, $, game, Player, Money) {


  // Sprits
  var player1 = new Player()
    , money1 = new Money()
  money1.addCollision(player1)

  // Mouse
  $(document).on('mousemove', function(e) {
    player1.setPosition(e.clientX, e.clientY)
    player1.drawElem()
  })

  game.addSprit('player1', player1)
  game.addSprit('money1', money1)
  game.start()
})
