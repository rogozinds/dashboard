var Resize = function () {
    this.build();
}
var startX, startY, startWidth, startHeight;

Resize.prototype = {

    addDrag: function (item) {
        item.addEventListener('click', function init() {
            item.removeEventListener('click', init, false);
            item.className = item.className + ' resizable';
            var resizer = document.createElement('div');
            resizer.className = 'resizer';
            item.appendChild(resizer);
            resizer.addEventListener('mousedown',
                function (e) {
                    startX = e.clientX;
                    startY = e.clientY;
                    startWidth = parseInt(document.defaultView.getComputedStyle(item).width, 10);
                    startHeight = parseInt(document.defaultView.getComputedStyle(item).height, 10);
                    var mouseMove = function (e) {
                        item.style.width = (startWidth + e.clientX - startX) + 'px';
                        item.style.height = (startHeight + e.clientY - startY) + 'px';
                    };
                    var mouseUp = function (e) {
                        //remove listeners
                        document.documentElement.removeEventListener('mousemove', mouseMove, false);
                        document.documentElement.removeEventListener('mouseup', mouseUp, false);
                    };

                    document.documentElement.addEventListener('mousemove', mouseMove, false);
                    document.documentElement.addEventListener('mouseup', mouseUp, false);
                }
                , false);
        }, false);
    },

    build: function() {
        var item = document.createElement("div");
        item.id = "foobar";
        item.style.setProperty("width","200px","");
        item.style.setProperty("height","200px","");
        item.style.setProperty("background-color","red","");

        document.body.appendChild(item);
        this.addDrag.call(this,item);
    }
}