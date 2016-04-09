 


$(function() {
	var loaded = 0,
	schemes = [],
	$examples = $(".example");
	cH = new ColorHeist();

	var $intro = $("#intro");




	$examples.each(function(j, example) {
		var $bg = $($(example).find(".background")[0]),
		$i = $($(example).find(".source-image img")[0]),
		$highlight = $($bg.find(".aside .highlight-line")[0]);
		$i.load(function() {
			
			scheme = cH.getDarkColorScheme($i[0], "scheme-"+j);

			schemes.push(scheme);
			loaded += 1
			if (loaded == $examples.length) {
				var index = 0
				window.setInterval(function() {
					$intro.removeClass();
					$intro.addClass(schemes[index % $examples.length].getClassName("background"))
					$($intro.find("h1")[0]).removeClass()
					$($intro.find("h1")[0]).addClass(schemes[index % $examples.length].getClassName("textHighlight"))
					$($intro.find("p")[0]).removeClass()
					$($intro.find("p")[0]).addClass(schemes[index % $examples.length].getClassName("text"))
					$(".background-alt-swatch").removeClass().addClass("swatch background-alt-swatch")
					$(".background-alt-swatch").addClass(schemes[index % $examples.length].getClassName("backgroundAlt"))
					$(".text-swatch").removeClass().addClass("swatch text-swatch")
					$(".text-swatch").addClass(schemes[index % $examples.length].getClassName("backgroundTextColor"))
					$(".text-highlight-swatch").removeClass().addClass("swatch text-highlight-swatch")
					$(".text-highlight-swatch").addClass(schemes[index % $examples.length].getClassName("backgroundTextHighlight"))
					$(".text-highlight-alt-swatch").removeClass().addClass("swatch text-highlight-alt-swatch")
					$(".text-highlight-alt-swatch").addClass(schemes[index % $examples.length].getClassName("backgroundTextHighlightAlt"))

					index += 1;
				}, 4000)

			}
			
		})
	})
	
})