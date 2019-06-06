
AFRAME.registerComponent('markerhandler', {

    init: function() {
        const animatedMarker = document.querySelector("#white-box-marker");
        const aEntity = document.querySelector("#white-box");

        // every click, we make our model grow in size :)
        animatedMarker.addEventListener('click', function(ev, target){
            console.log('u clicked it');
            console.log('ev', ev);
            console.log('target', target);
            console.log('ev.detail', ev.detail);
            console.log('ev.detail.intersectedEl', ev.detail.intersectedEl);
            const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
            if (aEntity && intersectedElement === aEntity) {
                const scale = aEntity.getAttribute('scale');
                Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                aEntity.setAttribute('scale', scale);
            }
        });
}});

AFRAME.registerComponent('bigboxhandler', {

    init: function() {
        const animatedMarker = document.querySelector("#big-box-marker");
        const aEntity = document.querySelector("#big-box");

        // every click, we make our model grow in size :)
        animatedMarker.addEventListener('click', function(ev, target){
            console.log(aEntity.position)
            const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
            if (aEntity && intersectedElement === aEntity) {
                const scale = aEntity.getAttribute('scale');
                Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                aEntity.setAttribute('scale', scale);
            }
        });
}});
