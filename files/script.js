/*
Inspirado no canal Veslasoft:
https://www.youtube.com/watch?v=CzvSokPj4gs,
https://www.youtube.com/channel/UCv6aZVQz8IHrhgemxZrNRmQ
*/

var canvas = document.getElementById("mycanvas"); // canvas
			var ctx = canvas.getContext("2d");
			
			
			
			var teclas = {};
			
			
			var bola = {
				x: canvas.width / 2 - 15,
				y: canvas.height /2 -15,
				altura: 30,
				largura: 30,
				dirx: -1,
				diry: 1,
				mod: 0,
				speed: 1.5
			};
			
			var esquerda = {
				x: 10,
				y: canvas.height / 2 - 60,
				altura: 120,
				largura: 30,
				score:0,
				speed: 15
			};
			
			var direita = {
				x: 560,
				y: canvas.height / 2 - 60,
				altura: 120,
				largura: 30,
				score:0,
				speed: 15
			};
			
			document.addEventListener("keydown", function(e) {
				teclas[e.keyCode] = true;
				// alert(e.keyCode)
			}, false);
			
			document.addEventListener("keyup", function(e) {
				delete teclas[e.keyCode];
			}, false);
			
			function movebloco() {
				if(87 in teclas && esquerda.y > 0)
					esquerda.y -= esquerda.speed;
				else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height)
					esquerda.y += esquerda.speed;
				if(38 in teclas && direita.y > 0)
					direita.y -= direita.speed;
				else if(40 in teclas && direita.y + direita.altura < canvas.height)
					direita.y += direita.speed;
			}
			
			function movebola() {
				if(bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura) {
					bola.dirx = 1;
					 bola.mod += 1.0;
				}
				else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x) {
					bola.dirx = -1;
					bola.mod += 1.0;
				}
				if(bola.y <= 0)
					bola.diry = 1;
					
				else if(bola.y + bola.altura >= canvas.height)
					bola.diry = -1;
					
				bola.x += (bola.speed + bola.mod) * bola.dirx;
				bola.y += (bola.speed + bola.mod) * bola.diry;
				
				if(bola.x < esquerda.x + esquerda.largura - 15)
					newgame("player 2");
					
				else if(bola.x + bola.largura > direita.x + 15)
					newgame("player 1");
			};
			
			function newgame(winner) {
				if(winner == "player 1")
					++esquerda.score; // add score
				else
					++direita.score; // add score 

				esquerda.y = canvas.height / 2 - esquerda.altura / 2;
				direita.y = esquerda.y;
				bola.y = canvas.height / 2 - bola.altura / 2;
				bola.x = canvas.width / 2 - bola.largura /2;
				bola.mod = 0;
			};
			
			function desenha() {
			
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				
				movebloco();
				movebola();
				
				ctx.fillStyle = "white";
				ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
				ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
				ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);
				
				ctx.font = "20px Arial";
				ctx.fillText("Player 1: " + esquerda.score, 50, 20);
				ctx.fillText("Player 2: " + direita.score, canvas.width - 150, 20);
				
			}
			
			setInterval(desenha, 15); // renderiza o game
