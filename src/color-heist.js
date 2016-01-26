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
 * Provides helper functions for getting
 * specific colors and sorting colors in
 * a specific manner.
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
    avgs = this.__RGBAverage(colors);
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

Palette.prototype.getDullColors = function(colors) {
    var variances = this.__RGBVariance(colors);
    return variances.sort(function(a, b) {return a.variance > b.variance}).map(function(obj) {return obj.color});
}



/* * * * * * * * * * * * * * * * * * * * * *
 * ColorScheme Class
 * * * * * * * * * * * * * * * * * * * * * *
 * ColorScheme class returned by ColorHeist
 * get[Light,Dark]ColorScheme functions
 * contains details about ColorScheme,
 * conversion functions, color mutating
 * functions and other helpers
 */

var ColorScheme = function(colors) {
    this.colors = colors
    this.get = function(name) { 
        if(typeof this.colors[name] != "undefined") {
            var c = this.colors[name];
            return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
        }
        return undefined
    }
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


 
ColorHeist.prototype.getLightColorScheme = function(image, options) {
    colors = this.thief.getPalette(image, 15)
    lightest = this.palette.getLightestColors(colors).slice(0, 5);
    darkest = this.palette.getDarkestColors(colors).slice(0, 5);
    vibrant = this.palette.getVibrantColors(colors).slice(0, 5);

    schemeInput = {
        background: lightest[0],
        text: darkest[0],
        highlight: vibrant[0]
    }
    return new ColorScheme(schemeInput);
}
 

/* Utility Functions
 */