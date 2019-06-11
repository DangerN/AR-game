// let hamburger = document.querySelector('#hamburger')
// hamburger.addEventListener('click', (event => {
//   let menuItems = document.querySelector('.menu-items')
//   console.log(menuItems.style.display);
//   menuItems.style.display==='none' ? menuItems.style.diplay = 'block' : menuItems.style.display = 'none'
// }))

let store = {
  canEvolve: true,
  markerPositions: {},
  stage: 0
}

let scene = document.querySelector('#scene')
scene.addEventListener('position', event => {
  store.markerPositions[event.detail.id] = {x: event.detail.x, y: event.detail.y, z: event.detail.z}
  }
)

setInterval(checkMarkerPositions, 1000)
function resetEvolve() {
  store.canEvolve = false
  setTimeout(_=>store.canEvolve = true, 5000)
}

function checkMarkerPositions() {
  if (store.canEvolve && store.stage === 0) {
      distanceBetweenMarkers(store.markerPositions['white-box-marker'], store.markerPositions['big-box-marker'] ) < 2
        ? changeStage(Object.keys(store.markerPositions), 1)
        : null
    } else if (store.canEvolve && store.stage === 1) {
      distanceBetweenMarkers(store.markerPositions['white-box-marker'], store.markerPositions['big-box-marker'] ) > 3
        ? changeStage(Object.keys(store.markerPositions), 2)
        : null
    }
}

function rotateGem(gem) {
  console.log('rotaning gem');
  gem.object3D.rotation.y += 5
}

function changeStage(entityId, stage) {
    switch (stage) {
      case 1:
          entityId.forEach(id => {
            let entity = document.querySelector(`#${/^(.*)-\w+$/.exec(id)[1]}`)
            console.log(entity);
            entity.setAttribute('color', 'green')
          })
          store.stage = 1
        break;
      case 2:
          entityId.forEach(id => {
            let entity = document.querySelector(`#${/^(.*)-\w+$/.exec(id)[1]}`)
            let gem = document.createElement('a-octahedron')
            gem.object3D.position.set(0, 2, 0)
            gem.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur 1000')
            gem.setAttribute('color', 'blue')
            console.log(entity);
            entity.appendChild(gem)
            store.canEvolve = false
          })
        break;
      default:
    }
}

function distanceBetweenMarkers(markerOne, markerTwo ) {
  let result = 0
  result = Math.sqrt(
              Math.pow((markerTwo.x - markerOne.x), 2)+
              Math.pow((markerTwo.y - markerOne.y), 2)+
              Math.pow((markerTwo.z - markerOne.z), 2)
          )
  return result
}
