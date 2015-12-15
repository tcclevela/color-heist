/*
 * Color Heist is a utility built upon Lokesh Dhakar's Color Theif:
 * Lokesh Dhakkar: http://www.lokeshdhakar.com
 *
 * Authors
 * * * * * * 
 * Teddy Cleveland
 * Emma Posamentier
 */

/* * * * * * * * * * * * * * * * * * * * * *
 * Palette Class
 * * * * * * * * * * * * * * * * * * * * * *
 * Manages storing of colors and provides
 * functionality on which ColorHeist is 
 * built
 */

var Palette = function(colors, options) {
	this.colors = colors;
	this.options = options;
}

Palette.prototype.getDominantColor = function(){  
	return this.colors[0];
}

Palette.prototype.getAllColors = function() {
	return this.colors;
}


/* * * * * * * * * * * * * * * * * * * * * *
 * Base Class
 * * * * * * * * * * * * * * * * * * * * * *
 * ColorHeist class called by user to genrate
 * schemes. Supports default ColorThief methods
 */

var ColorHeist = function() {
	this.thief   = new ColorThief();
	this.palette = new Palette();
}

/* * * * * * * * * * * * * * * * * * * * * *
 * Support default usage from ColorThief
 * * * * * * * * * * * * * * * * * * * * * */

/*
 * getColor(sourceImage[, quality])
 * returns {r: num, g: num, b: num}
 * 
 * gets primary image color and returns it as an rgb
 */
ColorHeist.prototype.getColor   = function(image, quality) {
	return this.thief.getColor(image, quality)

}

/*
 * getPalette(sourceImage[, colorCount, quality])
 * returns [{r: num, g: num, b: num}, ... , {r: num, g: num, b: num}]
 * 
 * gets colorCount colors from the image
 */
ColorHeist.prototype.getPalette = function(image, colorCount, quality) {
	return this.thief.getPalette(image, colorCount, quality)
}


 
ColorHeist.prototype.getColorScheme = function(image, colorCount, options) {
	// this.palette.setColors(this.thief.getPallete(image, colorCount))
}
 

// Returns the color in the color scheme with the highest average rgb value
ColorHeist.prototype.getLightest = function(sourceImage, colorCount, quality) {
    if (typeof colorCount === 'undefined') {
        colorCount = 10;
    }
    if (typeof quality === 'undefined' || quality < 1) {
        quality = 10;
    }
    var palette = this.getPalette(sourceImage);
    var highestMean = 0;
    var mostNeutralColor = palette[0];
    for (var i = 0; i < palette.length; i++) {

        var mean =  ((palette[i][0]+ palette[i][1] + palette[i][2]) /  3);
        console.log("mean = "+mean)
        if (highestMean < mean) {
            highestMean = mean;
            lightNeutral = palette[i];
        }

    };
    console.log(lightNeutral)
    console.log(highestMean)
    return lightNeutral;


}


// Returns the color in the color scheme with the lowest average rgb value
ColorHeist.prototype.getDarkest = function(sourceImage, colorCount, quality) {
    if (typeof colorCount === 'undefined') {
        colorCount = 10;
    }
    if (typeof quality === 'undefined' || quality < 1) {
        quality = 10;
    }
    var palette = this.getPalette(sourceImage);
    var lowestMean = 255;
    for (var i = 0; i < palette.length; i++) {
        var mean =  ((palette[i][0]+ palette[i][1] + palette[i][2]) /  3);
        console.log("mean = "+mean)
        if (lowestMean > mean) {
            lowestMean = mean;
            darkNeutral = palette[i];
        }

    };
    console.log(darkNeutral)
    console.log(lowestMean)
    return darkNeutral;


}

/* Utility Functions
 */