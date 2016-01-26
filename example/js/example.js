


$(function() {
	var image = $("#image");
	cH = new ColorHeist();
	image.load(function() {
		scheme = cH.getLightColorScheme(image[0]);
		$("body").css('background', scheme.get("background"));
		$("#image").css("border", "10px solid " + scheme.get("highlight"));
	})
})