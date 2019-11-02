export function drawBitmapPopulation(game, combative, docile, populationRadius, populationColor, traitColors, trait_stroke, trait_outer_circle_percentage, trait_radius, trait_stroke_width){
    var bitmapSize = 2 * populationRadius;
    var bmd = game.add.bitmapData(bitmapSize, bitmapSize);

    // Draw background
    drawCircle(bmd, populationRadius, populationRadius, populationRadius, populationColor);
    // Draw traits
    var traitAngleShift = 360 / (combative.length + docile.length);
    var curr_trait_angle = 0;
    for (var i = combative.length - 1; i >= 0; i--) {
        var c = combative[i];
        drawTrait(bmd, populationRadius, populationRadius, populationRadius, curr_trait_angle * traitAngleShift, traitColors[c], undefined, trait_outer_circle_percentage, trait_radius, trait_stroke_width);
        curr_trait_angle++;
    }
    for (var i = docile.length - 1; i >= 0; i--) {
        var c = docile[i];
        drawTrait(bmd, populationRadius, populationRadius, populationRadius, curr_trait_angle * traitAngleShift, trait_stroke, traitColors[c], trait_outer_circle_percentage, trait_radius, trait_stroke_width); // reverse color of docile
        curr_trait_angle++;
    }
    return bmd;
}

export function drawTrait(bmd, popX, popY, popR, degree, color, stroke, trait_outer_circle_percentage, trait_radius, trait_stroke_width) {
    var traitAngle = -(degree * Math.PI)/180;
    var traitOuterCircle = trait_outer_circle_percentage * popR;
    // A point at angle theta on the circle whose centre is (x0,y0)
    // and whose radius is r is (x0 + r cos theta, y0 + r sin theta).
    // Now, choose theta values evenly spaced between 0 and 2pi.
    // http://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle
    var x = popX + traitOuterCircle * Math.cos(traitAngle);
    var y = popY + traitOuterCircle * Math.sin(traitAngle);
    var r = trait_radius;
    drawCircle(bmd, x, y, r, color, stroke, trait_stroke_width)
}

export function drawCircle(bmd, x, y, r, color, stroke, trait_stroke_width) {
    bmd.ctx.fillStyle = color;
    bmd.ctx.beginPath();
    bmd.ctx.arc(x, y, r, 0, 2*Math.PI);
    bmd.ctx.closePath();
    bmd.ctx.fill();
    if (stroke != undefined) {
        bmd.ctx.lineWidth=trait_stroke_width;
        bmd.ctx.strokeStyle=stroke;
        bmd.ctx.stroke();
    }
}