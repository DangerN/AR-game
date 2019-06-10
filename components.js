// require('aframe-state-component')



AFRAME.registerState({
  intitialState: {
    stage: 0
  },
  handlers: {
    yeetAlert: function (state, action) {
      state.stage = action.stage
    }
  }
})

AFRAME.registerComponent('whiteboxhandler', {
    tick: function() {
      if (this.el.object3D.position.x !== 0) {
        let boxPosition = {...this.el.object3D.position, id: this.el.id}
        this.el.emit('position', boxPosition)
      }
    }
});

AFRAME.registerComponent('bigboxhandler', {
    schema: {
      color: { type: 'string', default: 'red'},
    },
    tick: function() {
      if (this.el.object3D.position.x !== 0) {
        let boxPosition = {...this.el.object3D.position, id: this.el.id}
        this.el.emit('position', boxPosition)
      }
    }
});

AFRAME.registerComponent('rotating-gem', {
  tick: function() {
    this.el.object3D.rotation += 1
  }
})
