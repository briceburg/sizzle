
// @todo use an in-memory binary tree

var highlightStrategy = 'percent',	// ['percent','fixed'] method to determine number of posts highlighted
	highlightPercent = 30,			//  30% of visible posts will be highlighted,
	highlightFixed = 10,			// 10 visible posts will be highlighted
	visibleOffset = 120;			// pixels thumbnail can hang below viewport to remain eligible for highlighting

self.port.on("registerPrefs", function(prefs){
	highlightStrategy = prefs['highlightStrategy'];
	highlightPercent = prefs['highlightPercent'];
	highlightFixed = prefs['highlightFixed'];
	visibleOffset = prefs['visibleOffset'];
});

self.port.on("registerStyle", function(stylesheet){
	console.log('REGISTR STYLE...........................................................................................................................................................................................................................................................................................................................................................................................................................................................');
	console.log(stylesheet);
	$('head').append('<style type="text/css">' + stylesheet + '</style>');
});


function inViewPort(el) {
	var pos = el.getBoundingClientRect();
	
	return(
			pos.top >= 0 &&
			pos.left >= 0 &&
			(pos.bottom - visibleOffset) <= (window.innerHeight || document.documentElement.clientHeight) &&
			pos.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

function highlightVisiblePosts() {
	
	var notedPosts = [];
	
	$("div.post").each(function(){
		if(inViewPort(this))
		{
			var notes = $("span.post_notes",this).data('notes');
			if(notes)
			{
				notedPosts.push({id: this.id, notes: notes});
				$(this).removeClass('bb-sizzle-highlight');
			}
		}
	});
	
	notedPosts.sort(function(a,b){
		return b.notes - a.notes;
	});
	
	var highlightsToMake = (highlightStrategy == 'percent') ?
			Math.round(notedPosts.length * (highlightPercent / 100)) :
			highlightFixed;
			
	topPosts = notedPosts.slice(0,highlightsToMake);

	$.each(topPosts,function(i, post){
		$('#' + post.id).addClass('bb-sizzle-highlight');
	});
}

var sizzleTimeout = setTimeout(highlightVisiblePosts, 200);
$(window).on('resize scroll',function(){
	clearTimeout(sizzleTimeout);
	sizzleTimeout = setTimeout(highlightVisiblePosts, 200);
});