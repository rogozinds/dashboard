This is a prototype of a dashboard. The idea is that you can pass a configuration of the dashboard in JSON, and
get a dashboard where you can see the different presentation of your data, now either a chart or a text.
You can also move and resize items on the dashboard.

<h1>Setup and start</h1>
<ol>
 <li>To setup the app run node install in the home folder.</li>
 <li>Too run the application just start a web server in the home directory - "./dashboard$ serve".</li>
</ol>

<h1>Features</h1>
<ol>
 <li>To move the item, just click the header of the item and drag it to another place.</li>
 <li>To resize double click on the header and adjust the size by dragging a small square in the right bottom corner.</li>
 <li>To style you dashboard specify css rules in a "style" property of the configuration object see index.js as example.</li>
</ol>

<h1>Attach data to you dashboard</h1>
 To attach data to the dashboard you can specify it as an array in configuration object or specify an ajax query to another web service with data, see index.js
 for example.

 Server folder has a mock webservice which hosts data, to start it run: "npm ./server/server.js" to see that server is running
 go to http://localhost:3300/api/mockdata, you should see a json response with data.