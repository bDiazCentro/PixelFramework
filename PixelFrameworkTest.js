var x = 5;
var y = 53;
var c = Color(255,0,255);
var speed = 2;
CrearLienzo(700,700);
CrearAplicacion(70,70,10);
MostrarCuadricula(VERDADERO);

function GetInputs()
{
	if(TeclaAbajo(PF.LEFT_ARROW))
		x-=speed;
	if(TeclaAbajo(PF.RIGHT_ARROW))
		x+=speed;
	if(TeclaAbajo(PF.UP_ARROW))
		y-=speed;
	if(TeclaAbajo(PF.DOWN_ARROW))
		y+=speed;
	if(TeclaArriba(PF.SPACE))
	{
		c = Color(AleatorioEntre(0,255),AleatorioEntre(0,255), AleatorioEntre(0,255))
	}
	if(MouseClick())
	{
		var coords = ObtenerCoordenadasMouse(posicionMouse.x, posicionMouse.y);
		x = coords.x;
		y = coords.y;
	}
}

function DibujarFondo()
{
	DibujarRectangulo(0,0,70,50, Color(0,180,255));
	DibujarRectangulo(0,51,70,19,Color(0,180,0));
}

function DibujaPersonaje()
{
	var coords = ObtenerCoordenadasMouse(posicionMouse.x, posicionMouse.y);
	x = coords.x;
	y = coords.y;
	DibujarRectangulo(x,y,5,5, c);
	DibujarPunto(x+1,y+1, Color(0,0,0));
	DibujarPunto(x+3,y+1, Color(0,0,0));
	DibujarRectangulo(x+1,y+3,3,1, Color(0,0,0));
}

LlamarCadaFrame(GetInputs);
LlamarCadaFrame(DibujarFondo);
LlamarCadaFrame(DibujaPersonaje);
