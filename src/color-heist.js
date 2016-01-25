/*
 * Color Heist is a utility built upon Lokesh Dhakar's Color Theif:
 * Lokesh Dhakkar: http://www.lokeshdhakar.com
 *
 * Authors
 * * * * * * 
 * Teddy Cleveland
 * Emma Posamentier
 */

Math.average = function(values) {
    var sum = 0;

    for(var i = 0, len = values.length; i < len; i++) {
        sum += values[i];
    }

    return sum / values.length;
}

Math.variance = function(values) {
    var numerator = 0,
    average = Math.average(values);

    for(var i = 0, len = values.length; i < len; i++) {
        numerator += Math.pow((values[i] - average), 2);
    }
    return numerator / values.length;
}

/* * * * * * * * * * * * * * * * * * * * * *
 * Palette Class
 * * * * * * * * * * * * * * * * * * * * * *
 * Manages storing of colors and provides
 * functionality on which ColorHeist is 
 * built
 */


var Palette = function(options) {
	this.options = options;
}

Palette.prototype.getDominantColor = function(colors) {  
	return colors[0];
}

Palette.prototype.getAllColors = function(colors) {
	return colors;
}

Palette.prototype.__RGBAverage = function(colors) {
    var i, avg, len,
    avgs = [];

    for(i = 0, len = colors.length; i < len; i++) {
        avg = Math.average(colors[i]);
        avgs[i] = {color: colors[i], average: avg};
    }
    return avgs;
}

Palette.prototype.__RGBVariance = function(colors) {
    var i, variance, len
    variances = [];

    for(i = 0, len = colors.length; i < len; i++) {
        variance = Math.variance(colors[i]);
        variances[i] = {color: colors[i], variance: variance};
    }
    return variances
}

Palette.prototype.getLightestColors = function(colors) {
    avgs = Palette.__RGBAverage(colors);
    return avgs.sort(function(a, b) {return a.average < b.average}).map(function(obj) {return obj.color});
}

Palette.prototype.getDarkestColors = function(colors) {
    avgs = this.__RGBAverage(colors);
    return avgs.sort(function(a, b) {return a.average > b.average}).map(function(obj) {return obj.color});    
}

Palette.prototype.getVibrantColors = function(colors) {
    var variances = this.__RGBVariance(colors);
    return variances.sort(function(a, b) {return a.variance < b.variance}).map(function(obj) {return obj.color});

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


 
ColorHeist.prototype.getLightColorScheme = function(image, colorCount, options) {
    colors = this.thief.getPalette(image, colorCount)
    return this.palette.getVibrantColors(colors);
	// this.palette.setColors(this.thief.getPallete(image, colorCount))
}
 

// Returns the color in the color scheme with the highest average rgb value
/*ColorHeist.prototype.getLightest = function(sourceImage, colorCount, quality) {
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