
define([
  'mo/lang'
, 'jquery'
, './game'
], function(_, $, game) {

  var ROOT = '../../'
  var images = {}
  initImageSets()

  function initImageSets() {
    var roles = ['james', 'mantou', 'rabbit']
    images = {}
    /*
     * images = {
     *   james: {
     *      poor: {
     *        src: ''
     *      , image: ''
     *      , loaded: ''
     *      }
     *   }
     * }
     *
     */
    roles.forEach(function(name){
      initImageConfig(name)
    })
  }

  function initImageConfig(name) {
    var states = ['poor', 'normal', 'rich', 'gold']
    var image = images[name] = {}
    states.forEach(function(e, i) {
      var state = image[e] = {}
      state.src = ROOT + 'pics/' + name + '-' + e + '.png'

      state.image = new Image()
      state.image.onload = function() {
        state.loaded = true
      }
      state.image.src = state.src
    })
  }


  var levelMap = {
    money: [-1, 50, 100, 200]
  , level: ['poor', 'normal', 'rich', 'gold']
  }

  function Player(opts) {
    opts = opts || {}
    this.roleName = opts.role || 'james'
    this.role = images[this.roleName]

    this.x = 0
    this.y = 0
    this.lastx = 0
    this.lasty = 0

    this.width = 185
    this.height = 30

    this.money = 0
    this.level = this.getLevel(this.money)

    this.lasttime = Date.now()

    this.initDrawing()
  }

  _.mix(Player.prototype, {
    update: function(dt) {
      this.level = this.getLevel(this.money)
      this.vx = (this.x - this.lastx) / dt
      this.vy = (this.y - this.lasty) / dt
      this.lastx = this.x
      this.lasty = this.y
    }
  , initDrawing: function() {
      //this.elem = $('<span>', {
        //'class': 'player'
      //}).appendTo(game.stage.elem)
    }
  , draw: function() {
      //this.elem.attr('level', this.level)
      if (!this.role[this.level].loaded) {return}
      var image = this.role[this.level].image

      this.drawRole(image)
    }

  , drawRole: function(image) {
      game.drawImage(image
        , this.x - 60, this.y - 200
        , image.width, image.height)
    }
  , drawElem: function() {
      //this.elem.css({
        //left: this.x
      //, top: this.y
      //})
    }
  , destroy: function() {
      //this.elem.remove()
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
