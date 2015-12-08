


$(function() {
	var image = $("#image");
	cH = new ColorHeist();
	image.load(function() {
		console.log(cH.getPalette(image[0], 10))
	})
})