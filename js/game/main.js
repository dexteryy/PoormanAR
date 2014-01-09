define([
  'mo/lang'
, 'jquery'
, './game'
, './player'
, './money_emitter'
], function(_, $, game, Player, MoneyEmitter) {

  // Sprits
  var player1 = new Player()
    , player2 = new Player()
    , moneyEmitter = new MoneyEmitter([player1, player2])

  // Mouse
  $(document).on('mousemove', function(e) {
    player1.setPosition(e.clientX, e.clientY)
    player1.drawElem()
  })

  // Keyboard
  //var keyMap = {
    //40: 'down'
  //, 38: 'up'
  //, 37: 'left'
  //, 39: 'right'
  //}
  //$(document).on('keydown', function(e) {
    //var key = e.keyCode
    //if (!key in keyMap) { return }
    //e.preventDefault()
    //var vx = 0, vy = 0
    //switch(keyMap[key]) {
      //case 'up':
        //vy = -30;
        //break;
      //case 'down':
        //vy = 30;
        //break;
      //case 'left':
        //vx = -30;
        //break;
      //case 'right':
        //vx = 30;
        //break;
    //}
    //player2.setPosition(player2.x + vx, player2.y + vy)
    //player2.drawElem()
  //})

  window.playerArea = window.playerArea || []

  // color track
  var playerArea = window.playerArea
  player2.update = function(dt) {
    if (!window.playerArea[0]) {return}
    this.x = (playerArea[0][1] + playerArea[0][0]) / 2
    this.y = (playerArea[0][3] + playerArea[0][2]) / 2
    Player.prototype.update.apply(this, arguments)
  }
  player2.draw = function() {
    this.drawElem()
    Player.prototype.draw.apply(this, arguments)
  }

  game.addSprit('player1', player1)
  game.addSprit('player2', player2)

  moneyEmitter.start()
  game.start()
})
