var Dashboard = function (items) {
    this.items = items;
    this.build();
}

Dashboard.prototype = {

    build: function () {

        var container = document.createElement("div");
        container.setAttribute("class", "container");
        container.setAttribute("id", "container");
        document.body.appendChild(container);
        for (i = 0; i < this.items.length; i++) {
            var item=items[i];
            var div = document.createElement("div");
            div.setAttribute("class", "item");
            div.setAttribute("draggable", "true");
            div.setAttribute("ondragstart", "drag(event)");
            div.setAttribute("ondragover", "allowDrag(event)");
            div.setAttribute("ondrop", "drop(event)");

            div.setAttribute("class", "item");
            div.setAttribute("id","item"+i);

            this.setStyle(div,item.style);
            container.appendChild(div);
            this.setContent(div,item);
        }
    },
    createTextNode: function(item) {
      return  document.createTextNode(item.data[0]);
    },
    createGraph: function(element,item) {
        var type = item.type.replace("-chart","")
        var elemHeight=element.style.getPropertyValue("height").replace("px","")-20;
         new Highcharts.Chart({
            chart: {
                type: type,
                marginTop: 50,
                renderTo: element,
                height: elemHeight
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
                data: item.data
            }]
        });
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