


$(function() {
	var image = $("#image");
	cH = new ColorHeist();
	image.load(function() {
		console.log(cH.getLightColorScheme(image[0], 10))
	})
})