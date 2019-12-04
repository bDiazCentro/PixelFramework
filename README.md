# PixelFramework

//DOCUMENTACION

Enum PF
{
	BACKSPACE: 		8,
	TAB: 			9,
	ENTER : 		13,
	SHIFT : 		16,
	CTRL : 			17,
	ALT : 			18,
	PAUSE : 		19,
	CAPSLOCK : 		20,
	ESCAPE : 		27,
	SPACE : 		32,
	PAGE_UP : 		33,
	PAGE_DOWN : 	34,
	END : 			35,
	HOME : 			36,
	LEFT_ARROW :	37,
	UP_ARROW : 		38,
	RIGHT_ARROW :	39,
	DOWN_ARROW : 	40,
	INSERT : 		45,
	DELETE : 		46,
	ALPHA0 : 		48,
	ALPHA1 : 		49,
	ALPHA2 : 		50,
	ALPHA3 : 		51,
	ALPHA4 : 		52,
	ALPHA5 : 		53,
	ALPHA6 : 		54,
	ALPHA7 : 		55,
	ALPHA8 : 		56,
	ALPHA9 : 		57,
	A : 			65,
	B : 			66,
	C : 			67,
	D : 			68,
	E : 			69,
	F : 			70,
	G : 			71,
	H : 			72,
	I : 			73,
	J : 			74,
	K : 			75,
	L : 			76,
	M : 			77,
	N : 			78,
	O : 			79,
	P : 			80,
	Q : 			81,
	R : 			82,
	S : 			83,
	T : 			84,
	U : 			85,
	V : 			86,
	W : 			87,
	X : 			88,
	Y : 			89,
	Z : 			90
}

//built-in variables
VERDADERO: constante con valor true
FALSO: constante con valor false
tiempo: variable que contiene cuanto tiempo en segundos ha pasado desde que se abrió la página
deltaTiempo: variable que contiene cuanto tiempo paso del frame anterior al actual
anchoCanvas: variable que contiene el ancho del Canvas en pixeles
altoCanvas: variable que contiene el alto del canvas en pixeles
tamanoTexel: tamano de cada texel en pixeles
posicionMouse: variable que contiene un Vector2 con la posición 'x' y 'y' del mouse

//built-in methods
CrearLienzo(ancho, alto):
	Crea un canvas en tu página con un alto y ancho determinado en pixeles
CrearAplicación(ancho, alto, tamano_texel):
	Crea una aplicación para crear pixel art en el canvas creado anteriormente por la 
	función CrearLienzo, los parametros ancho y alto se refiere a número de columnas y renglones,
	el tercer parametro, es de que tamaño sera el ancho y alto de cada texel
BorrarElementoDeArreglo(objeto, arreglo):
	Si el elemento que pasas como primer parametro, se encuentra en el arreglo que se pasa como
	segundo parametro, entonces lo elimina del arreglo
AleatorioEntre(minimo, maximo):
	Devuelve un número entero aleatorio entre el minimo [incluyente] y el máximo [incluyente]
Aleatorio():
	Devuelve un número flotante aleatorio entre 0 y 1
Color(r,g,b):
	Te regresa un string con la forma: 'rgba(r,g,b)', para reconocimiento de colores
DibujarPunto(xPos, yPos, color):
	Dibuja en las coordenadas especificadas sobre la cuadricula, un texel del color especificado
DibjarRectangulo(xPos, yPos, ancho, alto, color):
	Dibuja en las coordenadas especificadas sobre la cuadricula, un texel del color especificado,
	con el ancho y alto especificado
AjustarColorDeFondo(color):
	Pasas el color con el que se va a limpiar el canvas cada frame
Linea(x0, y0, x1, y1, color, ancho_de_linea):
	Para propositos de debug, dibujas una linea independiente a la cuadricula, de la 
	posición(x0, y0) a la posición(x1, y1) con el anchoy color especificados
LlamarCadaFrame(f):
	Recibe una función como parametro, dicha función será llamada cada frame
MostrarCuadricula(v):
	Dibuja la cuadricula de la aplicación si se pasa VERDADERO como parametro
MostrarCajasColisionadoras(v):
	Dibuja el contorno de las cajas colisionadoras si se pasa VERDADERO como parametro
AjustarColoresCajasColisionadoras(ct, cc):
	Si se estan dibujando las cajas colisionadoras, el primer parametro es para el color en caso de 
	ser trigger y el segundo para cuando no lo es

//buil'in prototypes
Vector2: contenedor para valores 'x' y 'y'
	/*constructor*/ Vector2(x, y)
Vector3: contenedor para valores 'x', 'y' y 'z'
	/*constructor*/ Vector3(x, y, z)
Vector4: contenedor para valores 'x', 'y', 'w' y 'h'
	/*constructor*/ Vector4(x, y, w, h)
Objeto: Prototipo base del framework
	/*constructor*/ Objeto(x, y, w, h, n)
	x: posición en x
	y: posición en y
	w: ancho del objeto
	h: alto del objeto
	nombre: nombre del objeto
	NOTA: Cualquier objeto que se crea usando este constructor, se agrega automaticamente a 
	una lista de objetos que llaman a su metodo draw y update automaticamente cada frame
CajaColisionadora: Hereda de prototipo Objeto
	/*constructor*/ CajaColisionadora(x, y, w, h, t, cEnter, cExit, collider)
	Su constructor llama al constructor de objeto
	t: isTrigger, identifica si se debe tratar al objeto como un trigger
	cEnter: callback que se llama cuando el collider entra en el trigger o cuando se le hace click
	al objeto
	cExit: callback que se llama cuando el collider sale del trigger
	collider: objeto que sera tomado en cuenta por la CajaColisionadora para cálculos
	NOTA 1: El collider, deberá o heredar de objeto o tener variables 'x', 'y', 'w' y 'h'
	NOTA 2: Si el collider choca y no es trigger, por lo tanto no sucede nada, se agregara a 
	prototipo objeto una posición anterior, para poder regresar al objeto en caso de CajaColisionadora
CuadroDeTexto: Hereda de objeto, es independiente a la cuadricula, y nos permite dibujar texto en 
	pantalla
/*constructor*/Cuadro de CuadroDeTexto(x,y,t)
	x: posición en x en pixeles
	y: posicion en y en pixeles
	t: texto que se dibujara
	mostrar: valor inicial VERDADERO
	NOTA 1: Si mostrar es FALSO, el texto no se dibujara
	NOTA 2: Valor por default de la fuente es "20px Arial"
	NuevoTexto(newText): Actualiza el valor de t con newText
	MostrarTexto(v): Actualiza el valor de mostrar con v

//built-in callbacks
TeclaAbajo(kc):
	Regresa si la tecla especificada como parametro fue oprimida
TeclaArriba(kc):
	Regresa si la tecla especificada como parametro fue liberada
MouseClick():
	Regresa si se hizo click en el botón izquierdo del mouse
ObtenerCoordenadasMouse():
	Te regrsa un Vector2 con el renglon y columna de la cuadricula a partir de la posición del mouse
