AFRAME.registerState({
  initialState: {
    markers: {},
    markerDistance: {},
    color: 'blue'
  },
  handlers: {
    updatePostion: function (state, action) {
      let {x, y, z, id} = action
      state.markers[id] = {...state.markers[id], x: x, y: y, z: z}
    },
    handlePieceInit: function (state, action) {
      console.log(state);
      let {stage, id, color} = action
      state.markers[id] = {stage: stage, color: color}
      state.markerDistance[id] = {}
    }
  },
  computeState: function (newState, payload) {
    if (payload !== 'updatePostion') {return}
    let markerList = Object.keys(newState.markerDistance)
    let markerPositionList = {}
    markerList.forEach(marker => {
      markerPositionList[marker] = markerList.filter(mark=>mark !== marker).map(targetMarker => {
            let distance = 0
            let markerOne = newState.markers[marker]
            let markerTwo = newState.markers[targetMarker]
            distance =  Math.sqrt(
              Math.pow((markerTwo.x - markerOne.x), 2)+
              Math.pow((markerTwo.y - markerOne.y), 2)+
              Math.pow((markerTwo.z - markerOne.z), 2)
            )
            return {[targetMarker]: distance}
      })
    })
    newState.markerDistance = {...markerPositionList}
  }
})

AFRAME.registerComponent('gamepiece', {
  init: function() {
    let box = document.createElement('a-box')
    this.el.appendChild(box)
    this.el.emit('handlePieceInit', {id: this.el.id, stage: 0, color: 'blue'})
  },
  tick: function() {
    if (this.el.object3D.position.x !== 0) {
      let boxPosition = {...this.el.object3D.position, id: this.el.id}
      this.el.emit('updatePostion', boxPosition)
    }
  },
  update: function() {
    let box = this.el.querySelector('a-box')
    box.setAttribute('bind__color', `value: color`)
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
