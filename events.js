
AFRAME.registerComponent('whiteboxhandler', {
    // init: function() {
    //     const whiteBoxMarker = document.querySelector("#white-box-marker")
    //     const whiteBox = document.querySelector("#white-box")
    //     let whiteBoxMarkerPosition = whiteBoxMarker.object3D.position
    //     whiteBoxMarker.addEventListener('click', function(ev, target){
    //         const intersectedElement = ev && ev.detail && ev.detail.intersectedEl
    //         if (whiteBox && intersectedElement === whiteBox) {
    //             alert('you clicked the white box!')
    //         }
    //     })
    // },
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
    // init: function() {
    //     const bigBoxMarker = document.querySelector("#big-box-marker");
    //     const bigBox = document.querySelector("#big-box");
    // },
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
