(function()
{
	
	var canvas,ctx;

	var mouseX,mouseY,mouseDown=0;

	var touchX,touchY;

	var Mouse = { x: 0, y: 0 };
	var lastMouse = { x: 0, y: 0 };


	function drawDot(ctx,x,y,size) {
		r=0; g=0; b=0; a=255;

		ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	} 

	function clearCanvas(canvas,ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function sketchpad_mouseDown() {
		var canvas = document.querySelector( "#canvas" );
		canvas.addEventListener( "mousemove", onPaint, false );
	}

	function sketchpad_mouseUp() {
		var canvas = document.querySelector( "#canvas" );
		canvas.removeEventListener( "mousemove", onPaint, false );
	}

	function sketchpad_mouseMove(e) { 

		var canvas = document.querySelector( "#canvas" );
		var context = canvas.getContext( "2d" );

		context.color = "black";
		context.lineWidth = 10;

		lastMouse.x = Mouse.x;
		lastMouse.y = Mouse.y;

		Mouse.x = e.pageX - this.offsetLeft;
		Mouse.y = e.pageY - this.offsetTop;
	}

	function getMousePos(e) {
		if (!e)
			var e = event;

		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		}
		else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
	}

	function sketchpad_touchStart() {
		getTouchPos();

		drawDot(ctx,touchX,touchY,6);

		event.preventDefault();
	}

	function sketchpad_touchMove(e) { 
		getTouchPos(e);

		drawDot(ctx,touchX,touchY,6); 

		event.preventDefault();
	}


	function getTouchPos(e) {
		if (!e)
			var e = event;

		if(e.touches) {
			if (e.touches.length == 1) { 
				var touch = e.touches[0];
				touchX=touch.pageX-touch.target.offsetLeft;
				touchY=touch.pageY-touch.target.offsetTop;
			}
		}
	}

	function onPaint(){	
		context.lineWidth = context.lineWidth;
		context.lineJoin = "round";
		context.lineCap = "round";
		context.strokeStyle = context.color;

		context.beginPath();
		context.moveTo( lastMouse.x, lastMouse.y );
		context.lineTo( Mouse.x, Mouse.y );
		context.closePath();
		context.stroke();
	};


	function init() {
		canvas = document.getElementById('canvas');

		if (canvas.getContext)
			ctx = canvas.getContext('2d');

		if (ctx) {
			// React to mouse events on the canvas, and mouseup on the entire document
			canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
			canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
			window.addEventListener('mouseup', sketchpad_mouseUp, false);

			// React to touch events on the canvas
			canvas.addEventListener('touchstart', sketchpad_touchStart, false);
			canvas.addEventListener('touchmove', sketchpad_touchMove, false);
		}
	}

	function debug(){

		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');

        var predictButton = $("#predictButton")
        predictButton.on("click", function() {

			var tblResult = document.getElementById('tbl-result')
			tblResult.removeAttribute("style")

            // var $SCRIPT_ROOT = "/api/predict/";
			// var $SCRIPT_ROOT = "http://127.0.0.1:8000/predict/";
			var $SCRIPT_ROOT =  "https://murmuring-bayou-92841.herokuapp.com/predict/";

            var canvasObj = document.getElementById("canvas");
            var context = canvas.getContext( "2d" );
            var img = canvasObj.toDataURL();
            			
			$.ajax({
				type: 'POST',
				url: $SCRIPT_ROOT,
				data: JSON.stringify (img),
				success: function(data) {
					$("#result-1").text(data[0]);
					// $("#result-2").text(data[1] || "-");
					// $("#result-3").text(data[2] || "-");
                    context.clearRect( 0, 0, 280, 280 );
                    context.fillStyle="white";
                    context.fillRect(0,0,canvas.width,canvas.height);
                },
                error: function (req, err) {
					console.log(err)      
				},
				contentType: "application/json",
				dataType: 'json'
			});
        });

		/* CLEAR BUTTON */
		var clearButton = $( "#clearButton" );
		clearButton.on( "click", function(){
			// context.clearRect( 0, 0, 280, 280 );
			// context.fillStyle="white";
			// context.fillRect(0,0,canvas.width,canvas.height);

			clearCanvas(canvas,context)
			
			var tblResult = document.getElementById('tbl-result')
			tblResult.style.display = "none"

		});

	}

	debug();
	init()

}());