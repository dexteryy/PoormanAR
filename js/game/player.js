
define([
  'mo/lang'
, 'jquery'
, './game'
], function(_, $, game) {

  var ROOT = '../../'
  var images = {}
  var states = ['poor-0', 'poor-1', 'well-0', 'well-1'
        , 'rich-0', 'rich-1', 'gold-0', 'gold-1']

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

  initImageSets()

  var levelMap = {
    money: [-1, 200, 500, 100]
  , level: ['poor', 'well', 'rich', 'gold']
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
    }
  , runStep: 0
  , draw: function() {
      var image
      if (this.isRun()) {
        image = this.role[this.level + '-' + ~~((this.runStep++ % 10) / 5)].image
      } else {
        image = this.role[this.level + '-0'].image
      }

      this.drawImage(image)
    }

  , drawImage: function(image) {
      var ctx = this.curCtx || game.stage.ctx
      ctx.drawImage(image
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
  , collideTo: function() {
      this.money += 10
    }
  , getLevel: function(money) {
      return levelMap.level[
        levelMap.money.concat([money])
        .sort(function(a, b) { return a > b })
        .indexOf(money) - 1
      ]
    }
  , isRun: function() {
      return (Math.abs(this.vx) + Math.abs(this.vy)) > 100
    }
  })

  return Player
})
