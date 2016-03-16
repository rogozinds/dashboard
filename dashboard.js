var Dashboard = function (items) {
    this.items = items;
    this.build();
}
var headerHeight=20;
Dashboard.prototype = {

    addDrag: function (item) {
        var that =this;
        item.addEventListener('dblclick', function init() {
            item.draggable=false;
            item.removeEventListener('dblclick', init, false);
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
                        var chartDiv= item.getElementsByClassName("item")[1];
                        if(chartDiv) {
                            var width=item.style.width.replace("px","");
                            var height=item.style.height.replace("px","")-headerHeight;
                            chartDiv.style.width=width;
                            chartDiv.style.height=height;
                            chartDiv.parentDiv.style.width=width;
                            chartDiv.parentDiv.style.height=height;
                            chartDiv.chart.setSize(width,height,false);
                        }
                    };
                    var mouseUp = function (e) {
                        //remove listeners
                        document.documentElement.removeEventListener('mousemove', mouseMove, false);
                        document.documentElement.removeEventListener('mouseup', mouseUp, false);
                        item.draggable=true;
                        item.className=item.className.replace(" resizable","");
                        item.removeChild(resizer);
                        that.addDrag(item);
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
            var layoutDiv = document.createElement("div");
            var contentDiv = document.createElement("div");
            var header = document.createElement("div");

            header.setAttribute("class", "item header");
            header.style.height=headerHeight+"px";
            header.className = header.className + ' header';


            header.parentDiv=layoutDiv;
            contentDiv.parentDiv=layoutDiv;
            contentDiv.setAttribute("class", "item");
            layoutDiv.draggable=true;
            layoutDiv.addEventListener("dragstart",drag,false);
            layoutDiv.addEventListener("dragover", allowDrag,false);
            layoutDiv.addEventListener("drop",drop,false);
            layoutDiv.class="item";
            layoutDiv.setAttribute("id","item"+i);

            this.setStyle(contentDiv,item.style);
            this.addDrag(layoutDiv);

            layoutDiv.appendChild(header);
            layoutDiv.appendChild(contentDiv);
            container.appendChild(layoutDiv);
            this.setContent(contentDiv,item);
        }
    },
    createTextNode: function(item) {
      return  document.createTextNode(item.data[0]);
    },
    createGraph: function(element,item) {
        var type = item.type.replace("-chart","")
        var elemHeight=element.style.getPropertyValue("height").replace("px","");
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
    var container = document.getElementById("container");
    var dragedItem=document.getElementById(event.dataTransfer.getData("text"));
    var parent  = this;
    container.insertBefore(dragedItem,parent);
}