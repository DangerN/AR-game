AFRAME.registerState({
  intitialState: {
    markers: []
  },
  handlers: {
    // yeet4
    updatePostion: function (state, action) {
      let {x, y, z, id} = action
      state[id] = {...state[id], x: x, y: y, z: z}
      console.log(state);
    },
    setStage: function (state, action) {
      console.log(state);
      let {stage, id} = action
      console.log(stage, id);
      state[id] = { stage: stage}
      console.log(state);
    }
  }
})

AFRAME.registerComponent('gamepiece', {
  init: function() {
    // console.log(this)
    box = document.createElement('a-box')
    this.el.appendChild(box)
    // console.log(AFRAME.scenes[0]);
    // this.el.emit('updatePostion', {...this.el.object3D.position, id: this.el.id, stage: 0})
    this.el.emit('setStage', {id: this.el.id, stage: 0})
  },
  tick: function() {
    if (this.el.object3D.position.x !== 0) {
      let boxPosition = {...this.el.object3D.position, id: this.el.id}
      this.el.emit('updatePostion', boxPosition)
    }
  }
});

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
