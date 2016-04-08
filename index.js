var items= [
    {
        type:"line-chart",
        title: "API/MOCKDATA/1",
        ajax: {
            url: 'http://localhost:3300/api/mockdata/1',
            type: 'GET',
            async: true,
            timeout: 6000,
            dataType: "json",
            callback: function (data) {
                if(this.chart.series.length!=0) {
                    this.chart.series[0].setData(data.message);
                } else  {
                    this.chart.addSeries({data: data.message});
                }
            }
        },
        data:[29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        categories:[],
        style:{
            width: "400",
            height: "300",
            marginLeft: "10",
            backgroundColor:"purple"

        }
    },
        {
            type: "html",
            selector: "table1",
            data: ["<h1>Main Header</h1>" +
            " <h2>Import data table</h2>" +
                "<table>"+
                "<tr style='background-color:#00b3ee'>"+
                "<td>Col1</td>"+
                "<td>COl2</td>"+
                "<td>COl3</td>"+
                "</tr>"+
                "<tr class='tr2'>"+
                "<td>Foo1</td>"+
                "<td>Foo2</td>"+
                "<td>Foo33</td>"+
                "</tr>"+
                "</tr>"+
                "<tr>"+
                "<td>Bar1</td>"+
                "<td>Bar2</td>"+
                "<td>Bar3</td>"+
                "</tr>"+
                "</table>"+
                "<br>"
            ]
        }
    ,
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
        ajax: {
            url: 'http://localhost:3300/api/mockdata/2',
            type: 'GET',
            async: true,
            timeout: 3000,
            data: [29, 71],
            dataType: "json",
            callback: function (data) {
                if (this.chart.series.length != 0) {
                    this.chart.series[0].setData(data.message);
                } else {
                    this.chart.addSeries({data: data.message});
                }
            }
        },
        style:{
            width:"200",
            height:"200"
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
