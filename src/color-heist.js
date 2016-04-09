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

var ColorScheme = function(colors, schemeName) {
    this.colors = colors;
    this.name = schemeName
    this.styleSheetId = "ColorHeistStyles";
    this.stylesheets = {};
    this.styles = document.getElementById(this.styleSheetId);
    

    this.getClassName = function(name) { 
        if(typeof this.colors[name] != "undefined") {
            var c = this.colors[name]["color"];
            return this.name+"-"+name
        }
        return undefined
    }

    this.getRGB = function(name) {
        if(typeof this.colors[name] != "undefined") {
            var c = this.colors[name]["color"]
            return "rgb("+c[0]+","+c[1]+","+c[2]+")"
        }
    }

    this.write = function() {
        var cssString = "", sheet
        if(!document.getElementById(this.styleSheetId)) {
            this.styles = document.createElement("div")
            document.body.appendChild(this.styles)            
            this.styles.setAttribute("id", this.styleSheetId);
        }
        if(!document.getElementById(this.name)) {
            sheet = document.createElement("style");
            sheet.setAttribute("id", this.name);
            this.styles.appendChild(sheet);
        } else {
            sheet = document.getElementById(this.name);
        }

        var keys = Object.keys(colors);

        for(var i = 0, len = keys.length; i < len; i++) {
            var rule = "."+this.name+"-"+keys[i]+"{"+colors[keys[i]]["property"]+":"+this.getRGB(keys[i])+"}"
            cssString += rule
        }

        sheet.innerHTML = cssString


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

ColorHeist.prototype.__getColorScheme = function(schemeName, lightest, darkest, vibrant) {
    schemeInput = {
        background: {
            color: lightest[0],
            property: "background"
        },
        backgroundAlt: {
            color: lightest[2],
            property: "background"
        },
        backgroundTextColor: {
            color: darkest[0],
            property: "background"
        },
        backgroundTextHighlight: {
            color: vibrant[0],
            property:"background"
        },
        backgroundTextHighlightAlt: {
            color: vibrant[1],
            property:"background"
        },
        text: {
            color: darkest[0],
            property: "color"
        },
        textLight: {
            color: lightest[0],
            property: "color"
        },
        textHighlight: {
            color: vibrant[0],
            property: "color"
        }
    }

    scheme = new ColorScheme(schemeInput, schemeName);
    scheme.write();
    return scheme
}
 
ColorHeist.prototype.getLightColorScheme = function(image, schemeName) {
    colors = this.thief.getPalette(image, 10)
    lightest = this.palette.getLightestColors(colors).slice(0, 3);
    darkest = this.palette.getDarkestColors(colors).slice(0, 3);
    vibrant = this.palette.getDarkestColors(this.palette.getVibrantColors(colors).slice(0, 5));
    return this.__getColorScheme(schemeName, lightest, darkest, vibrant)
}

ColorHeist.prototype.getDarkColorScheme = function(image, schemeName) {
    colors = this.thief.getPalette(image, 10)
    lightest = this.palette.getLightestColors(colors).slice(0, 3);
    darkest = this.palette.getDarkestColors(colors).slice(0, 3);
    vibrant = this.palette.getDarkestColors(this.palette.getVibrantColors(colors).slice(0, 5));
    return this.__getColorScheme(schemeName, darkest, lightest, vibrant)
}
 

/* Utility Functions
 */