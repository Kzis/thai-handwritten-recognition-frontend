(function()
{
	var canvas = document.querySelector( "#canvas" );
	var context = canvas.getContext( "2d" );
	canvas.width = 280;
	canvas.height = 280;
	
	var Mouse = { x: 0, y: 0 };
	var lastMouse = { x: 0, y: 0 };
	context.fillStyle="white";
	context.fillRect(0,0,canvas.width,canvas.height);
	context.color = "black";
	context.lineWidth = 6;
	context.lineJoin = context.lineCap = 'round';
	debug();
	canvas.addEventListener( "mousemove", function( e ){
		lastMouse.x = Mouse.x;
		lastMouse.y = Mouse.y;

		Mouse.x = e.pageX - this.offsetLeft;
		Mouse.y = e.pageY - this.offsetTop;

	}, false );

	canvas.addEventListener( "mousedown", function( e ){
		canvas.addEventListener( "mousemove", onPaint, false );
	}, false );

	canvas.addEventListener( "mouseup", function(){
		canvas.removeEventListener( "mousemove", onPaint, false );

	}, false );

	var onPaint = function(){	
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

	function debug(){
        var predictButton = $("#predictButton")
        predictButton.on("click", function() {

			var tblResult = document.getElementById('tbl-result')
			tblResult.removeAttribute("style")

            // var $SCRIPT_ROOT = "/api/predict/";
            var $SCRIPT_ROOT = "http://127.0.0.1:8000/predict/";

            var canvasObj = document.getElementById("canvas");
            var context = canvas.getContext( "2d" );
            var img = canvasObj.toDataURL();
            			
			$.ajax({
				type: 'POST',
				url: $SCRIPT_ROOT,
				data: JSON.stringify (img),
				success: function(data) {
					$("#result-1").text(data[0]);
					$("#result-2").text(data[1] || "-");
					$("#result-3").text(data[2] || "-");
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
			context.clearRect( 0, 0, 280, 280 );
			context.fillStyle="white";
			context.fillRect(0,0,canvas.width,canvas.height);
			
			var tblResult = document.getElementById('tbl-result')
			tblResult.style.display = "none"

		});

		$( "#colors" ).change(function(){
			var color = $( "#colors" ).val();
			context.color = color;
		});		
		
		$( "#lineWidth" ).change(function(){
			context.lineWidth = $( this ).val();
		});
	}
}());