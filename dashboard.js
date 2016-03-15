var Dashboard = function (items) {
    this.items = items;
    this.build();
}
var headerHeight=20;
Dashboard.prototype = {

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
                        if(item.chart) {
                         item.chart.setSize(item.style.width.replace("px",""),item.style.height.replace("px","")-headerHeight,false);
                        }
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
    build: function () {
        var container = document.createElement("div");
        container.setAttribute("class", "container");
        container.setAttribute("id", "container");
        document.body.appendChild(container);
        for (i = 0; i < this.items.length; i++) {
            var item=items[i];
            var header = document.createElement("div");

            header.setAttribute("class", "item header");
            header.style.height=headerHeight+"px";
            header.className = header.className + ' header';

            var layoutDiv = document.createElement("div");
            layoutDiv.setAttribute("class", "item");
            layoutDiv.draggable=false;
            layoutDiv.setAttribute("ondragstart", "drag(event)");
            layoutDiv.setAttribute("ondragover", "allowDrag(event)");
            layoutDiv.setAttribute("ondrop", "drop(event)");
            layoutDiv.class="item";
            layoutDiv.setAttribute("id","item"+i);
            header.addEventListener("dblclick",function(e){

                layoutDiv.draggable = !layoutDiv.draggable;
                if(layoutDiv.draggable) {
                    layoutDiv.class=layoutDiv.class +" foo";
                } else {
                    layoutDiv.class=layoutDiv.class.replace(" foo","");
                }

                console.log(layoutDiv.class);
            },false);



            this.setStyle(layoutDiv,item.style);
            this.addDrag.call(this,layoutDiv);

            layoutDiv.appendChild(header);
            container.appendChild(layoutDiv);
            this.setContent(layoutDiv,item);
        }
    },
    createTextNode: function(item) {
      return  document.createTextNode(item.data[0]);
    },
    createGraph: function(element,item) {
        var type = item.type.replace("-chart","")
        var elemHeight=element.style.getPropertyValue("height").replace("px","")-20;
        var chart= new Highcharts.Chart({
            chart: {
                type: type,
                marginTop: 50,
                renderTo: element,
                height: elemHeight
            },
            xAxis: {
                categories: item.categories
            },

            series: [{
                data: item.data
            }]
        });
        element.chart=chart;
    },
    setContent: function(element,item) {
        if(item.type == "text") {
            var node =this.createTextNode(item);
            element.appendChild(node);
        }
        else {
            this.createGraph(element,item);
        }

    },
    setStyle: function(element, styles) {
        for (var key in styles) {
            if (styles.hasOwnProperty(key)) {
                var cssProperty = camelToDash(key)
                element.style.setProperty(cssProperty,styles[key],"");
            }
        }
    }

}
function camelToDash(str) {
    return str.replace(/\W+/g, '-')
        .replace(/([a-z\d])([A-Z])/g, '$1-$2');
}
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function allowDrag(event) {
    event.preventDefault();
}
function drop(event) {
    console.log("DROPED FROM"+event.target.id+"ON"+event.dataTransfer.getData("text"));
    var container = document.getElementById("container");
    var dragedItem=document.getElementById(event.dataTransfer.getData("text"));
    container.insertBefore(dragedItem,event.target);
}