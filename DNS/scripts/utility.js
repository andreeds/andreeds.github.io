export function generateRandomColor(){
    // var colors = ["#38630e", "#6ea023", "#add285", "#add285", "#c3de00", "#49000e", "#7b000b", "#cf0029", "#fc4a66", "#fca5b1", "#fcd6e1", "#a0344e", "#8cac90", "#fece68", "#fe9600", "#cf5a00", "#416c85", "#afd1ea", "#aba0cd"];
    var colors = ["#FD090B", "#FF7F2B", "#FED5F5", "#FF2AD4", "#81007F", "#0058DD", "#76E4FF", "#00BB4A", "#FED42A"];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function circleOverlap(object1, object2, overlapCallback, processCallback, callbackContext) {
    // Circle intersection: (x2-x1)^2 + (y1-y2)^2 <= (r1+r2)^2
    var x1 = object1.sprite.x;
    var x2 = object2.sprite.x;
    var y1 = object1.sprite.y;
    var y2 = object2.sprite.y;
    var r1 = object1.radius * (1-object1.dn.PERCENTAGE_RADIUS_OF_COLLISION);
    var r2 = object2.radius * (1-object2.dn.PERCENTAGE_RADIUS_OF_COLLISION);
    var hasCollision = (Math.pow((x2-x1),2) + Math.pow((y1-y2),2)) <= Math.pow((r1+r2),2);
    if (hasCollision) {
        overlapCallback.call(callbackContext, object1, object2);
    }
}

export function generateRandomTraitColors(traits) {
	var traitColors = {};
    var generatedColors = [];
    for (var i = traits.length - 1; i >= 0; i--) {
        var color = generateRandomColor();
        while (generatedColors.indexOf(color) != -1){
            color = generateRandomColor();
        }
        generatedColors.push(color);
        traitColors[traits[i]] = color;
    }
    return traitColors;
}

export function arrayEqual(array1, array2) {
    return (array1.length == array2.length) && array1.every(function(element, index) {return element === array2[index]})
}

Set.prototype.equal = function(setB) {
    var setA = new Set(this);
    if (setA.size !== setB.size) return false;
    var setB = Array.from(setB);
    for (var i = setB.length - 1; i >= 0; i--) {
        var a = setB[i];
        if (!setA.has(a)){
            return false;
        }
    }
    return true;
}

Set.prototype.isSuperset = function(subset) {
    for (var elem of subset) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
}

Set.prototype.union = function(setB) {
    var union = new Set(this);
    var setB = Array.from(setB);
    for (var i = setB.length - 1; i >= 0; i--) {
        union.add(setB[i]);
    }
    return union;
}

Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    var setB = Array.from(setB);
    for (var i = setB.length - 1; i >= 0; i--) {
        if (this.has(setB[i])) {
            intersection.add(setB[i]);
        }
    }
    return intersection;
}

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    var setB = Array.from(setB);
    for (var i = setB.length - 1; i >= 0; i--) {
        difference.delete(setB[i]);
    }
    return difference;
}