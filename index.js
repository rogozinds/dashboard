var items= [
    {
        type:"line-chart",
        data:[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        style:{
            width: "400",
            height: "300",
            marginLeft: "10",
            backgroundColor:"purple"

        }
    },
    {
        type:"spline-chart",
        data:[1, 2, 3, 4, 5, 6, 12, 6],
        style:{
            width: "200",
            height: "300"
        }
    },
    {
        type:"pie-chart",
        data:[200, 220, 50, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 16, 54.4],
        style:{
            width: "200",
            height: "300",
            backgroundColor:"purple"
        }
    },
    {
        type:"text",
        data:["SOME"],
        style:{
            width: "200",
            height: "300"
        }
    },
    {
        type:"text",
        data:["SOME VERY IMPORTANT DATA"],
        style:{
            width: "200",
            height: "300"
        }
    }


]

document.addEventListener("DOMContentLoaded", function(event) {
    var dashboard=new Dashboard(items);
});
