var items= [
    {
        type:"line-chart",
        ajax: {
            url: 'http://localhost:3300/api',
            type: 'GET',
            async: true,
            dataType: "json"
        },
        data:[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        data:["42"],
        style:{
            textAlign: "center",
            fontSize: "50px",
            width: "80",
            height: "80"
        }
    },
    {
        type:"text",
        data:["SOME VERY IMPORTANT DATA"],
        style:{
            width: "200",
            height: "300"
        }
    },
    {
        type:"spline-chart",
        data:[30, 12, 50, 129.2, 144.0, 40.0, 135.6, 148.5, 216.4, 194.1, 16, 54.4],
        style:{
            width: "500",
            height: "400",
            backgroundColor:"yellow"
        }
    },
    {
        type:"area-chart",
        data:[30, 12, 50, 129.2, 144.0, 40.0, 135.6, 148.5, 216.4, 194.1, 16, 54.4],
        style:{
            width: "500",
            height: "400",
            backgroundColor:"yellow",
            marginTop:"50"
        }
    },
        {
        type:"area-chart",
        data:[30, 40, 32, 420 ,432,32],
        style:{
            width: "500",
            height: "400",
            backgroundColor:"green"
        }
    },


]

document.addEventListener("DOMContentLoaded", function(event) {
    var dashboard=new Dashboard(items);
});
