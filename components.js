AFRAME.registerState({
  initialState: {
    markers: {},
    markerDistance: {},
    startTime: Date.now(),
    victory: false,
    fullyEvloved: []
  },
  handlers: {
    updatePostion: function (state, action) {
      let {x, y, z, id} = action
      state.markers[id] = {...state.markers[id], x: x, y: y, z: z}
    },
    handleMarkerInit: function (state, action) {
      let {stage, id, changeStage} = action
      changeStage(stage)
      state.markers[id] = {stage: stage, changeStage: changeStage}
      state.markerDistance[id] = {}
    },
  },
  computeState: function (newState, payload) {
    if (payload !== 'updatePostion') {return}
    let markerList = Object.keys(newState.markerDistance)
    let markerPositionList = {}
    markerList.forEach(marker => {
      markerPositionList[marker] = LIST.filterSelf(marker, markerList).map(targetMarker => {
            return {
              [targetMarker]: SPACE_MATH.computeDistance(newState.markers[marker], newState.markers[targetMarker])
            }
      })
    })
    newState.markerDistance = {...markerPositionList}
    markerList.forEach(marker => {
      ACTION.checkAdvance(newState.markers[marker], newState.markerDistance[marker])
        && ACTION.checkEvolveEligibility(newState.fullyEvloved, marker)
        && ACTION.addToEvolvedList(newState.fullyEvloved, marker)
        && !newState.victory
        && ACTION.victory(newState.startTime, newState.victory)
     })
  }
})

AFRAME.registerComponent('gamemarker', {
  init: function() {
    let changeStage = stage => {
      this.el.setAttribute('piecedisplay', {stage: stage})
    }
    this.el.emit('handleMarkerInit', {id: this.el.id, stage: 0, changeStage: changeStage})
  },
  tick: function() {
      this.el.object3D.position.x !== 0 &&
      this.el.emit('updatePostion', ACTION.packageMarkerPosition(this.el.object3D.position, this.el.id))
    }
})

AFRAME.registerComponent('piecedisplay', {
  schema: {
    stage: { type: 'number', default: 0 }
  },
  update: function() {
    this.el.setAttribute(STAGE[this.data.stage].attribute, STAGE[this.data.stage].property)
  }
})
