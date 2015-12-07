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

Palette.prototype.setColors = function(colors) {
	this.colors = colors;
}

Palette.prototype.setOptions = function(options) {
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
	this.palette.setColors([this.thief.getColor(image, quality)]);
	return this.palette.getDominantColor();

}

/*
 * getPalette(sourceImage[, colorCount, quality])
 * returns [{r: num, g: num, b: num}, ... , {r: num, g: num, b: num}]
 * 
 * gets colorCount colors from the image
 */
ColorHeist.prototype.getPalette = function(image, colorCount, quality) {
	this.palette.setColors(this.thief.getPalette(image, colorCount, quality))
	return this.palette.getAllColors()
}


/* 
ColorHeist.prototype.getScheme
 */



/* Utility Functions
 */