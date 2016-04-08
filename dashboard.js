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
                        //TODO:  find a better way to find a chart div, not based on css rules.
                        var chartDiv= item.getElementsByClassName("content")[0];
                        if(chartDiv) {
                            var width=item.style.width.replace("px","");
                            var height=item.style.height.replace("px","")-headerHeight;
                            chartDiv.style.width=width;
                            chartDiv.style.height=height;
                            chartDiv.chart.setSize(width,height,false);
                            //TODO: For some reason chart object has wrong width & height, that's why need to add
                            // this ugly adjustment, figure out what's the problem.
                            chartDiv.parentDiv.style.width=parseInt(width)+10;
                            chartDiv.parentDiv.style.height=parseInt(height)+30;

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

            header.className = "panel-heading";
            header.style.height=headerHeight+"px";



            header.parentDiv=layoutDiv;
            contentDiv.parentDiv=layoutDiv;
            contentDiv.className="content";
            layoutDiv.draggable=true;
            layoutDiv.addEventListener("dragstart",drag,false);
            layoutDiv.addEventListener("dragover", allowDrag,false);
            layoutDiv.addEventListener("drop",drop,false);
            layoutDiv.className="panel panel-primary item";
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
    createHTMLNode: function(item) {
        var div = document.createElement("div");
        div.innerHTML=item.data[0];
        div.className=item.selector;
        return  div;
    },
    createGraph: function(element,item) {
        var type = item.type.replace("-chart","")
        var elemHeight=element.style.getPropertyValue("height").replace("px","");


        var chart= new Highcharts.Chart({
            title: {
                text:item.title
            },
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
                data:item.data
            }]
        });

        if(item.ajax) {
            var ajaxRequest= function() {
                item.ajax.chart=chart;
                $.ajax({
                    url: item.ajax.url,
                    type: item.ajax.type,
                    async: item.ajax.async,
                    dataType: item.ajax.dataType,
                    success: item.ajax.callback.bind(item.ajax)
                });
            };
            var timeout=5000;
            if(item.ajax.timeout){
                timeout=item.ajax.timeout;
            }
            var callWithTimeout= function (startTimeout) {
                setTimeout(function() {
                    ajaxRequest();
                    callWithTimeout(timeout);
                }, startTimeout
                );
            }
            callWithTimeout(20);
        }

        element.chart=chart;
    },
    setContent: function(element,item) {
        if(item.type == "text") {
            var node =this.createTextNode(item);
            element.appendChild(node);
        }
        else if (item.type=="html") {
            var node =this.createHTMLNode(item);
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