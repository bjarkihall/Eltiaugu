(function (document){ //Reaches the bottom, I don't like indenting the whole thing
/**************************************************************************************/
// Globals!
var g_canvas = document.getElementById("myCanvas");
var ctx = g_canvas.getContext("2d");
g_canvas.width  = window.innerWidth;
g_canvas.height = window.innerHeight;
var eyes = [], eyeballs = [], rad = 15, max = 8, ballVisible = false, buffer;

/**************************************************************************************/
// Event listeners and their helpers!
window.addEventListener('mousemove', function(e){	
	var x = e.clientX - g_canvas.offsetLeft, 
		y = e.clientY - g_canvas.offsetLeft;
	for(var i = 0; i < eyeballs.length; i++)
		eyeballFollow(i, x, y);
	paintAll();
	ctx.lineWidth = 1;
	if(ballVisible)
		fillCircle(x, y, 10, "red", true);
}, false);

window.addEventListener('click', function(e){ ballVisible = !ballVisible;}, false);

window.addEventListener('resize', function(e){
	resize_canvas();
	init();
}, false);

function resize_canvas(){
	g_canvas = document.getElementById("myCanvas");
	if(g_canvas.width  != window.innerWidth)
		g_canvas.width  = window.innerWidth;
	if(g_canvas.height != window.innerHeight)
		g_canvas.height = window.innerHeight;
}

/**************************************************************************************/
// Painting eyes and eyeballs!
function eyeballFollow(i, x_mouse, y_mouse){
	var x = eyes[i][0], y = eyes[i][1];
	if(Math.abs(x_mouse - x) > max ||  Math.abs(y_mouse - y) > max){
		var angle = Math.atan2(y_mouse - y, x_mouse - x);
		eyeballs[i][0] = x + Math.cos(angle) * max;
		eyeballs[i][1] = y + Math.sin(angle) * max;
	} else{
		eyeballs[i][0] = x_mouse;
		eyeballs[i][1] = y_mouse;
	}
}

function fillCircle(x, y, r, c, s){
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	ctx.fillStyle = c;
	ctx.fill();
	if(s) ctx.stroke();
	ctx.closePath();
}

function paintAll(){
	ctx.putImageData(buffer, 0, 0);
	for(var i = 0; i < eyeballs.length; i++)
		fillCircle(eyeballs[i][0], eyeballs[i][1], rad*2/5, "black", false);
}

function createBuffer(){
	ctx.clearRect(0, 0, g_canvas.width, g_canvas.height);
	for(var i = 0; i < eyes.length; i++)
		fillCircle(eyes[i][0], eyes[i][1], rad, "white", true);
	buffer = ctx.getImageData(0, 0, g_canvas.width, g_canvas.height);
}

/**************************************************************************************/
// Initializer
function init(){
	eyes=[];
	eyeballs=[];
	ctx.lineWidth = 3;
	ctx.lineCap = 'round';
	var divider = 50;
	var cols = Math.round(g_canvas.width/divider);
	var rows = Math.round(g_canvas.height/divider);
	for(var i = 0; i < rows; i++){
		var y = (i+0.5)*divider;
		for(var j = 0; j < cols; j++){
			var x = (j+0.5)*divider;
			eyes.push([x, y]);
			eyeballs.push([x, y]);
		}
	}
	createBuffer();
	paintAll();
}

init(); // Kick it off!
}(document)); //Reaches the top, start when the doc is ready.