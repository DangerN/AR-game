AFRAME.registerState({
  initialState: {
    markers: {},
    markerDistance: {},
  },
  handlers: {
    updatePostion: function (state, action) {
      let {x, y, z, id} = action
      state.markers[id] = {...state.markers[id], x: x, y: y, z: z}
    },
    handlePieceInit: function (state, action) {
      let {stage, id} = action
      state.markers[id] = {stage: stage}
      state.markerDistance[id] = {}
      setInterval(_=>console.log(id, state.markers[id]), 5000)
    },
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
    markerList.forEach(marker => {
      let closeMarkerList = newState.markerDistance[marker].filter(distance => {
        return Object.values(distance)[0] < 2 ? true : false
      })
      if (closeMarkerList.length > 0 && newState.markers[marker].stage === 0) {
        newState.markers[marker].stage = 1
        console.log(newState);
      }
    })
  }
})

AFRAME.registerComponent('gamepiece', {
  init: function() {
    this.el.emit('handlePieceInit', {id: this.el.id, stage: 0})
    this.el.setAttribute('bind__stage', `markers.${this.el.id}.stage`)
  },
  update: function(oldData) {
    console.log(this.el.id, 'has updated');
    console.log(oldData);
  },
  tick: function() {
    let position = this.el.object3D.position
    function truncatePosition(float) {return (Math.trunc(float * 1000)) / 1000}
    if (this.el.object3D.position.x !== 0) {
      let markerPosition = {
        x: truncatePosition(position.x),
        y: truncatePosition(position.y),
        z: truncatePosition(position.z),
        id: this.el.id
      }
      this.el.emit('updatePostion', markerPosition)
    }
  }
})
