(function() {


  function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  function createFishes(n){
    var fishes = [];
    for(var i=0; i<n; i++){
        var size = 20 + Math.random() * 70;
        fishes[i] = {
          x: 10 + Math.random() * 800 ,
          y: 150 + Math.random() * 250,
          height: size,
          width: size,
          color: getRandomColor(),
          xVelocity: (size-15)/100,
          yVelocity: (size-15)/100,
          src: 'https://crossorigin.me/http://spacee.xyz/aqua/fish'+ (Math.floor(Math.random() * 5) + 1),
          reverseImg: 1
        };
    }
    return fishes.sort(function(a, b) {
      if(a.height > b.height)
        return 1;
      if(a.height < b.height)
        return -1;
      return 0;
    });
  }

  var fishes = createFishes(15);
  var context = document.getElementById("canvas").getContext("2d");

  var background = new Image();
  background.src = "https://crossorigin.me/http://spacee.xyz/aqua/background.jpg";

  function draw() {
      context.drawImage(background, 0, 0, 1000, 500);

      fishes.forEach(function(el){

          el.x += el.xVelocity;
          el.y += el.yVelocity;

          if(el.x <= 10 || el.x + el.width >= 980){
              el.xVelocity *= -1;
              el.reverseImg *= -1;
          }
          if(el.y <= 150 || el.y + el.height >= 450){
              el.yVelocity *= -1;
          }

          var fish = new Image();
          fish.src = el.src + el.reverseImg + '.png';
          context.drawImage(fish, el.x, el.y, el.width, el.height)
      });
    }

    var loop = function() {
      draw();
      window.requestAnimationFrame(loop);
    };

    loop();
})();
