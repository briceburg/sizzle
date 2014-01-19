var data = require("sdk/self").data,
	tabs = require("sdk/tabs"),
	widgets = require("sdk/widget"),
	pageMod = require("sdk/page-mod"),
	prefs = require("sdk/simple-prefs").prefs,
	css = require("./vcss"),
	stylesheet = css.genFromPrefs(data.load("sizzle-archive-highlight.vcss"), prefs),
	workers = [];


pageMod.PageMod({
	include: /.*\.tumblr\.com\/archive.*/,
	contentScriptFile: [data.url("vendor/jquery-2.0.3.min.js"),
	                    data.url("sizzle-archive-highlight.js")],
	contentStyle: stylesheet,
	onAttach: function(worker){
		registerWorker(worker);
		worker.port.emit("registerPrefs", prefs);
	}
});

var widget = widgets.Widget({
	id: "sizzle-widget",
	label: "sizzle",
	contentURL: data.url("sizzle.ico")
});


//
// when preference changes occur, re-compile variable-CSS
//

function onPrefChange(prefName){
	if(prefName.indexOf("vcss_") == 0)
	{
		stylesheet = css.genFromPrefs(data.load("sizzle-archive-highlight.vcss"), prefs);
	}
}
require("sdk/simple-prefs").on("", onPrefChange);


//
// worker registry
//

function registerWorker(worker) {
	workers.push(worker);
	worker.on('detach', function(){
		var index = workers.indexOf(this);
		if(index != -1)
		{
			workers.splice(index, 1);
		}
	});
}

//debug

tabs.open("http://gladyourenothere.tumblr.com/archive");
console.log(prefs['color']);

// !debug

