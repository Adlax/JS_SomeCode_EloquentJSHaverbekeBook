<!doctype html>
<html>
	<head>
	</head>

	<body>
		<style>
			.progress{
				border: 1px solid blue;
				width: 100px;
				position: fixed;
				top: 10px;
				right: 10px;
			}
			.progress > div{
				height: 12px;
				background: blue;
				width: 0%;
			}
			body{
			height: 2000px;
			}
		</style>
		<div class="progress"><div></div></div>
		<p> Scroll my butt! </p>
		<script>
			var bar = document.querySelector(".progress div");
			addEventListener("scroll",function(){
				var max = document.body.scrollHeight - innerHeight;
				var percent = (pageYOffset / max)*100;
				bar.style.width = "percent" + "%";
			});

		</script>
	</body>
</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>
	<head>
	</head>

	<body>
		<style>
			body{
			height: 2000px;
			}
		</style>
		<p> Name: <input type="text" data-help="Your full name here"> </p>
		<p> Age: <input type="text" data-help="Age in years"> </p>
		<p id="help"> </p>
		<script>
			var help = document.querySelector("#help");
			var fields = document.querySelectorAll("input");
			for(var i =0; i < fields.length;i++){
				fields[i].addEventListener("focus",function(event){
					var text = event.target.getAttribute("data-help");
					help.textContent = text;
				});
				fields[i].addEventListener("blur",function(event){
					help.textContent = "";
				});

			}
		</script>
	</body>
</html>
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>
	<head>
	</head>

	<body>
		<style>
			body{
			height: 2000px;
			}
		</style>
		<script>
			document.body.style.background = "blue";
			setTimeout(function(){
				document.body.style.background = "yellow";
			},2000);
		</script>
	</body>
</html>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>
	<head>
	</head>

	<body>
		<style>
			body{
			height: 2000px;
			}
		</style>
		<script>
			var bombTimer = setTimeout(function(){
				console.log("BOOOMMMM!!");
			},2000);
			if(Math.random()<0,5){
				console.log("Bomb has been defused...");
				clearTimeout(bombTimer);
			}
		</script>
	</body>
</html>
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>
	<head>
	</head>

	<body>
		<style>
			body{
			height: 2000px;
			}
		</style>
		<script>
			var ticks = 0;
			var clock = setInterval(function(){
				console.log("tick",ticks++);
				if(ticks == 10){
					clearInterval(clock);
					console.log("STOP");
				}
			},500);
		</script>
	</body>
</html>
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>
	<head>
	</head>

	<body>
		<style>
			body{
			height: 2000px;
			}
		</style>
		<textarea> Type somethin here </textarea>
		<script>
			var textarea = document.querySelector("textarea");
			var timeout;
			textarea.addEventListener("keydown",function(){
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					console.log("You stopped typing.");
				},10000);
			});
		</script>
	</body>
</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>
	<head>
	</head>

	<body>
		<style>
			body{
			height: 2000px;
			}
		</style>
		<script>
			function displayCoords(event){
				document.body.textContent = "Mouse at " + event.pageX + ", " + event.pageY;
			}
			var scheduled = false, lastEvent;
			addEventListener("mousemove",function(event){
				lastEvent = event;
				if(!scheduled){
					scheduled = true;
					setTimeout(function(){
						scheduled =false;
						displayCoords(lastEvent)
					},250);
				}
			});
		</script>
	</body>
</html>