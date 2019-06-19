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
      let distanceList = newState.markerDistance[marker].map(distance => Object.values(distance)[0])
      switch (newState.markers[marker].stage) {
        case 0:
          let closeList = distanceList.filter(distance => distance < 2)
            if (closeList.length > 0) {
              newState.markers[marker].changeStage(1)
              newState.markers[marker].stage += 1
            }
          break
        case 1:
          let farList = distanceList.filter(distance => distance < 2.5)
          if (farList.length === 0) {
            newState.markers[marker].changeStage(2)
            newState.markers[marker].stage += 1
          }
          break
        case 2:
          let lineList = distanceList.filter(distance => distance < 2)
          if (lineList.length > 1) {
            newState.markers[marker].changeStage(3)
            newState.markers[marker].stage += 1
          }
          break
        case 3:
          if (!newState.fullyEvloved.includes(marker)) {
            newState.fullyEvloved.push(marker)
          }
          if (newState.fullyEvloved.length === 5 && newState.victory === false) {
            newState.victory = true
            let time = Date.now() - newState.startTime
            let win = new CustomEvent('win', {detail: time})
            let menu = document.querySelector('.menu')
            menu.dispatchEvent(win)
          }
          break
      }
     })
  }
})

AFRAME.registerComponent('gamemarker', {
  init: function() {
    let changeStage = stage => {
      this.el.setAttribute('piecedisplay', {stage: stage})
    }
    this.el.emit('handleMarkerInit', {id: this.el.id, stage: 2, changeStage: changeStage})
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

AFRAME.registerComponent('piecedisplay', {
  schema: {
    stage: { type: 'number', default: 0 }
  },
  init: function() {
  },
  update: function() {
    switch (this.data.stage) {
      case 0:
          this.el.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 1')
        break
      case 1:
          this.el.setAttribute('animation', 'property: components.material.material.color; type: color; from: white; to: green; dur: 750')
        break
      case 2:
          this.el.setAttribute('animation', 'property: components.material.material.color; type: color; from: green; to: red; dur: 750')
        break
      case 3:
          this.el.setAttribute('animation', 'property: components.material.material.color; type: color; from: red; to: blue; dur: 750')
        break
      case 4:
          // this.el.setAttribute('animation', 'property: scale' )
      default:
    }
  }
})
