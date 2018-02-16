

function setup() {
    createCanvas(600,500);
    frameRate(60);
    background(52);
    maxIterations = 30;
    xFactor = 3 / width;
    yFactor = 3 / height;
    done = false;
}

function draw() {
  if (!done){
    for (var y = 0; y < height; y++){
      cIm = -1.5 + (yFactor * y);
      for (var x = 0; x < width; x++){
        cRe = -2 + (xFactor * x);

        zRe = cRe, zIm = cIm;
        isInside = true;
        for (var i = 0; i < maxIterations; i++){
          zReSquare = zRe * zRe;
          zImSquare = zIm * zIm;
          if(zReSquare + zImSquare > 4){
            isInside = false;
            break;
          }
          zIm = (2*zRe*zIm) + cIm;
          zRe = (zReSquare - zImSquare) + cRe;

        }
        if (isInside){
          c = color(zReSquare * 255, cRe * 255, zRe * 255)
          stroke(c);
          point(x, y);
        }
      }
    }
    done = true;
  }
}
