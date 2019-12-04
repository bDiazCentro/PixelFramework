var PF = 
{
	BACKSPACE: 8,
	TAB: 9,
	ENTER : 13,
	SHIFT : 16,
	CTRL : 17,
	ALT : 18,
	PAUSE : 19,
	CAPSLOCK : 20,
	ESCAPE : 27,
	SPACE : 32,
	PAGE_UP : 33,
	PAGE_DOWN : 34,
	END : 35,
	HOME : 36,
	LEFT_ARROW : 37,
	UP_ARROW : 38,
	RIGHT_ARROW : 39,
	DOWN_ARROW : 40,
	INSERT : 45,
	DELETE : 46,
	ALPHA0 : 48,
	ALPHA1 : 49,
	ALPHA2 : 50,
	ALPHA3 : 51,
	ALPHA4 : 52,
	ALPHA5 : 53,
	ALPHA6 : 54,
	ALPHA7 : 55,
	ALPHA8 : 56,
	ALPHA9 : 57,
	A : 65,
	B : 66,
	C : 67,
	D : 68,
	E : 69,
	F : 70,
	G : 71,
	H : 72,
	I : 73,
	J : 74,
	K : 75,
	L : 76,
	M : 77,
	N : 78,
	O : 79,
	P : 80,
	Q : 81,
	R : 82,
	S : 83,
	T : 84,
	U : 85,
	V : 86,
	W : 87,
	X : 88,
	Y : 89,
	Z : 90
}

let VERDADERO = true;
let FALSO = false;
var loopFunctions = [];
var canvas = null;
var aplicacion = null;
var lastUpdate = Date.now();
var timeInterval = setInterval(tick, 0);
var ctx = null;
var gameObjects = [];
var bgColor = 'rgba(0,0,0)';
var triggerColor = 'rgba(200,0,0)';
var collisionColor = 'rgba(0,200,0)';
var gridColor = 'rgba(255,255,255)';
var showColliders = false;
var showGrid = false;
var lastKeyDownPressed=-1;
var isKeyDown = false;
var lastKeyUpPressed=-1;
var isKeyUp = false;
var rightClick = false;
//BUILT-IN VARIABLES
var tiempo = 0;
var deltaTiempo = 0;
var anchoCanvas=0;
var altoCanvas=0;
var tamanoTexel=10;
var posicionMouse = new Vector2(0,0); 


function tick()
{
	var now = Date.now();
	deltaTiempo = now - lastUpdate;
	lastUpdate = now;
	tiempo += deltaTiempo * 0.001;
}

function CrearLienzo(w,h)
{
	if(null != canvas) {
		alert("CrearLienzo: Ya has creado un canvas.");
		return;
	}
	var c = document.createElement("Canvas");
	var body = document.querySelector("body");
	body.appendChild(c);
	canvas = c;
	//canvas.setAttribute("style","width:"+w+"px; height:"+h+"px;");
	canvas.setAttribute("width",w);
	canvas.setAttribute("height",h);
	ctx = canvas.getContext('2d');
	anchoCanvas = w;
	altoCanvas = h;
}

function CrearAplicacion(w, h, t)
{
	if(null != aplicacion)
	{
		alert("CrearAplicacion: Ya has creado una aplicacion");
		return;
	}
	tamanoTexel = t;
	aplicacion = new Aplicacion(w,h);
	loop();
}

function AjustarTamanoLienzo(w,h)
{
	if(null == canvas){
		alert("AjustarTamanoLienzo: No has creado algún canvas.");
		return;
	}
	canvas.setAttribute("style","width:"+w+"px; height:"+h+"px;");
	altoCanvas = h;
	anchoCanvas = w;
}

function BorrarElementoDeArreglo(obj, arr)
{
	var index = arr.indexOf(obj);
	if(index > -1)
		arr.splice(index, 1);
}

function AleatorioEntre(min, max)
{
	var num = Math.floor(Math.random() * (max-min)) + min;
	console.log(num);
	return num;
}

function Aleatorio()
{
	return Math.random();
}

function Vector2(x, y)
{
	this.x = x;
	this.y = y;
}

function Vector3(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}

function Vector4(x,y,w,h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

function Color(r,g,b)
{
	return 'rgba('+r+','+g+','+b+')';
}

function DibujarPunto(x, y, c)
{
	ctx.fillStyle = c;
	ctx.fillRect(x * tamanoTexel, y*tamanoTexel, tamanoTexel, tamanoTexel);
}

function DibujarRectangulo(x, y, w, h, c)
{
	if(null == aplicacion)return;
	for(var i = y; i < y + h; ++i)
	{
		for(var j = x; j < x + w; ++j)
		{
			if(i >= aplicacion.height || i < 0
				|| j >= aplicacion.width || j < 0)continue;
			var pivot = aplicacion.GetId(j, i);
			if(pivot >= aplicacion.cells.length)
			{
				pivot = 0;
			}else if(pivot < 0)
			{
				pivot = aplicacion.cells.length -1;
			}
			DibujarPunto(aplicacion.cells[pivot].x,
				aplicacion.cells[pivot].y,c);
		}
	}
}

function AjustarColorDeFondo(c)
{
	bgColor = c;
}

function LimpiarFondo()
{
	ctx.fillStyle = bgColor;
	ctx.fillRect(0,0,anchoCanvas,altoCanvas);
}

function Linea(x0, y0, x1, y1, c, a)
{
	ctx.lineWidth = a;
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

function Objeto(x, y, w, h,n)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.nombre = n;
	this.escala = 1.0;
	gameObjects.push(this);
}

Objeto.prototype.draw = function()
{

}

Objeto.prototype.update = function()
{

}

function CajaColisionadora(x, y, w, h, t, cEnter, cExit, collider)
{
	Objeto.call(this,x,y,w,h,"collision box");
	this.isTrigger = t;
	this.isCollidingEnter = false;
	this.isCollidingExit = false;
	this.callbackEnter = cEnter;
	this.callbackExit = cExit;
	this.collider = collider;
}
CajaColisionadora.prototype = Object.create(Objeto.prototype);
CajaColisionadora.prototype.constructor = CajaColisionadora;

CajaColisionadora.prototype.update = function()
{
	if(this.isTrigger)
	{
		this.OnTriggerEnter(this.collider);
		this.OnTriggerExit(this.collider);
	}else{
		this.OnCollisionEnter(this.collider);
	}
}

CajaColisionadora.prototype.draw = function()
{
	if(showColliders)
	{
		var col = (this.isTrigger) ? triggerColor : collisionColor;
		Linea(this.x * PIXEL_SIZE, this.y * PIXEL_SIZE, (this.x+this.w)*PIXEL_SIZE, this.y*PIXEL_SIZE, col);
		Linea(this.x*PIXEL_SIZE, this.y*PIXEL_SIZE, this.x*PIXEL_SIZE, (this.y+this.h)*PIXEL_SIZE, col);
		Linea(this.x*PIXEL_SIZE, (this.y+this.h)*PIXEL_SIZE, (this.x+this.w)*PIXEL_SIZE, (this.y+this.h)*PIXEL_SIZE, col);
		Linea((this.x+this.w)*PIXEL_SIZE, this.y*PIXEL_SIZE, (this.x+this.w)*PIXEL_SIZE, (this.y+this.h)*PIXEL_SIZE, col);
	}
}

CajaColisionadora.prototype.CheckCollision = function(collider)
{
	var corners = [];
	corners.push(new Vector2(collider.x,collider.y));
	corners.push(new Vector2(collider.x,collider.y+collider.h));
	corners.push(new Vector2(collider.x+collider.w, collider.y));
	corners.push(new Vector2(collider.x+collider.w, collider.y+collider.h));
	for(var i = 0; i < 4; ++i)
	{
		if(corners[i].x > this.x && corners[i].x < this.x+this.w &&
			corners[i].y > this.y && corners[i].y < this.y+this.h)
		{
			return true;
		}
	}
	return false;
}

CajaColisionadora.prototype.CheckClickCollision = function(mouseCoords)
{
	return mouseCoords.x > this.x && mouseCoords.x < this.x+this.w &&
		mouseCoords.y > this.y && mouseCoords.y < this.y+this.h;
}

CajaColisionadora.prototype.OnTriggerEnter = function(collider)
{
	var wasColliding = this.isCollidingEnter;
	this.isCollidingEnter = this.CheckCollision(collider);
	if(this.isCollidingEnter && !wasColliding)
	{
		if(this.callbackEnter !=null)
		{
			this.callbackEnter.call();
		}
	}
}

CajaColisionadora.prototype.OnTriggerExit = function(collider)
{
	var wasColliding = this.isCollidingExit;
	this.isCollidingExit = this.CheckCollision(collider);
	if(!this.isCollidingExit && wasColliding)
	{
		if(this.callbackExit !=null)
		{
			this.callbackExit.call();
		}
	}
}

CajaColisionadora.prototype.OnCollisionEnter= function(collider)
{
	var wasColliding = this.isCollidingEnter;
	this.isCollidingEnter = this.CheckCollision(collider);
	if(this.isCollidingEnter && !wasColliding)
	{
		collider.x = collider.lastPos.x;
		collider.y = collider.lastPos.y;
	}
}

function AjustarColoresCajasColisionadoras(ct, cc)
{
	triggerColor = ct;
	collisionColor = cc;
}

function MostrarCajasColisionadoras(b)
{
	showColliders = b;
}

function MostrarCuadricula(b)
{
	showGrid = b;
}

function Aplicacion(horizontal, vertical)
{
	this.width = horizontal;
	this.height = vertical;
	this.cells = [];
	for(var i = 0; i < vertical; ++i)
	{
		for(var j = 0; j < horizontal; ++j)
		{
			var coord = new Vector2(j, i);
			this.cells.push(coord);
		}
	}
}

Aplicacion.prototype.ObtenerIndicePorValores = function(x, y)
{
	return x + this.width * y;
}

Aplicacion.prototype.ObtenerIndicePorMouse = function(mouseX, mouseY)
{
	return new Vector2(Math.floor(mouseX / PIXEL_SIZE)-1, Math.floor(mouseY / PIXEL_SIZE)-1);
}

Aplicacion.prototype.draw = function()
{
	var c = Color(255, 255, 255);
	if(showGrid)
	{
		for(var i = 0; i < this.width; ++i)
		{
			Linea(0, i * tamanoTexel, anchoCanvas, i * tamanoTexel, c);
		}

		for(var i = 0; i < this.height; ++i)
		{
			Linea(i * tamanoTexel, 0, i * tamanoTexel, altoCanvas, c);
		}
	}
}

Aplicacion.prototype.GetId = function(x, y)
{
	return x + this.width * y;
}

function CuadroDeTexto(x, y, t)
{
	Objeto.call(this, x, y, 0, 0, "Cuadro de texto");
	this.text = t;
	this.mostrar = true;
}

CuadroDeTexto.prototype = Object.create(Objeto.prototype);
CuadroDeTexto.prototype.constructor = CuadroDeTexto;

CuadroDeTexto.prototype.draw = function()
{
	if(!mostrar)return;
	ctx.font = "20px Arial";
	ctx.strokeText(this.text, this.x, this.y);
}

CuadroDeTexto.prototype.NuevoTexto = function(newText)
{
	this.text = newText;
}

CuadroDeTexto.prototype.MostrarTexto = function(b)
{
	this.mostrar = b;
}

function DrawObjects()
{
	for(var i = 0; i < gameObjects.length; ++i)
	{
		gameObjects[i].draw();
	}
}

function UpdateObjects()
{
	for(var i = 0; i < gameObjects.length; ++i)
	{
		gameObjects[i].update();
	}
}

function LoopFunctions()
{
	for(var i = 0; i < loopFunctions.length; ++i)
	{
		loopFunctions[i].call();
	}
}

function LlamarCadaFrame(f)
{
	loopFunctions.push(f);
}

function loop()
{
	UpdateObjects();
	LimpiarFondo();
	LoopFunctions();
	DrawObjects();
	aplicacion.draw();
	ResetEventsValues();
	requestAnimationFrame(loop);
}

function TeclaAbajo(kc)
{
	return isKeyDown && kc == lastKeyDownPressed;
}

function TeclaArriba(kc)
{
	return isKeyUp && kc == lastKeyUpPressed;
}

function MouseClick()
{
	return rightClick;
}

function ResetEventsValues()
{
	lastKeyUpPressed = -1;
	lastKeyDownPressed = -1;
	isKeyUp= false;
	isKeyDown=false;
	rightClick=false;
}

function ObtenerCoordenadasMouse(x, y)
{
	return new Vector2(Math.floor(x / tamanoTexel)-1,Math.floor(y/tamanoTexel)-1);
}

document.addEventListener('keydown', function(event)
{
	lastKeyDownPressed = event.keyCode;
	isKeyDown = true;
	//alert(lastKeyDownPressed);
});

document.addEventListener('keyup', function(event)
{
	lastKeyUpPressed = event.keyCode;
	isKeyUp = true;
});

document.addEventListener('click', function(event)
{
	rightClick = true;
	posicionMouse.x = event.clientX;
	posicionMouse.y = event.clientY;
});

(function(){
	document.onmousemove = handleMouseMove;
	function handleMouseMove(event)
	{
		posicionMouse.x = event.clientX;
		posicionMouse.y = event.clientY;
	}
})();
