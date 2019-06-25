const ADVANCE_CONDITIONS = {
  0: {
    distance: 1.75,
    condition: (list, marker) => {
      return list.length > 0 && ACTION.advanceStage(marker) && false
    }
  },
  1: {
    distance: 2,
    condition: (list, marker) => {
      return list.length === 0 && ACTION.advanceStage(marker) && false
    }
  },
  2: {
    distance: 1.75,
    condition: (list, marker) => {
      return list.length > 1 && ACTION.advanceStage(marker) && false
    }
  },
  3: {
    condition: (list, marker) => {
      return true
    }
  }
}

const STAGE = {
  0: {
    attribute: 'geometry',
    property: 'primitive: box; width: 1; height: 1; depth: 1'
  },
  1: {
    attribute: 'animation',
    property: 'property: components.material.material.color; type: color; from: white; to: green; dur: 750'
  },
  2: {
    attribute: 'animation',
    property: 'property: components.material.material.color; type: color; from: green; to: red; dur: 750'
  },
  3: {
    attribute: 'animation',
    property: 'property: components.material.material.color; type: color; from: red; to: blue; dur: 750'
  }
}

const LIST = {
  distanceAll: (marker) => {
    return marker.map(distance => Object.values(distance)[0])
  },
  filteredDistance: (marker, distanceList) => {
    return distanceList.map(distance => Object.values(distance)[0])
      .filter(distance => distance < ADVANCE_CONDITIONS[marker.stage].distance)
  }
}

const SPACE_MATH = {
  computeDistance: (markerOne, markerTwo) => {
    return Math.sqrt(
      Math.pow((markerTwo.x - markerOne.x), 2)+
      Math.pow((markerTwo.y - markerOne.y), 2)+
      Math.pow((markerTwo.z - markerOne.z), 2)
    )
  },
  truncatePosition: (float) => {
    return (Math.trunc(float * 1000)) / 1000
  }
}

const ACTION = {
  advanceStage: (marker) => {
    marker.stage += 1
    marker.changeStage(marker.stage)
    return true
  },
  packageMarkerPosition: (position, id) => {
    return {
      x: SPACE_MATH.truncatePosition(position.x),
      y: SPACE_MATH.truncatePosition(position.y),
      z: SPACE_MATH.truncatePosition(position.z),
      id: id
    }
  },
  checkAdvance: (marker, distanceList) => {
    return ADVANCE_CONDITIONS[marker.stage].condition(LIST.filteredDistance(marker, distanceList), marker)
  },
  checkEvolveEligibility: (evolvedList, marker) => {
    return !evolvedList.includes(marker)
  },
  addToEvolvedList: (evolvedList, marker) => {
    evolvedList.push(marker)
    return evolvedList.length === 2 ? true : false
  },
  victory: (startTime, victoryStatus) => {
    victoryStatus = true
    let win = new CustomEvent('win', {detail: (Date.now() - startTime)})
    let menu = document.querySelector('.menu')
    menu.dispatchEvent(win)
  }
}
