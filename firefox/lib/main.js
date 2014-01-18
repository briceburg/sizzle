var data = require("sdk/self").data,
	tabs = require("sdk/tabs"),
	pageMod = require("sdk/page-mod");




pageMod.PageMod({
	include: /.*\.tumblr\.com\/archive.*/,
	contentScriptFile: [data.url("vendor/jquery-2.0.3.min.js"),
	                    data.url("sizzle-archive-highlight.js")],
	contentStyleFile: data.url("sizzle-archive-highlight.css")
});


// tabs.open("http://gladyourenothere.tumblr.com/archive");


/*

var pageMod = require("")


var widgets = require("sdk/widget");
var tabs = require("sdk/tabs").on("ready", logURL);
var self = require("sdk/self");


function logURL(tab){
	console.log(tab.url);
}

var clockPanel = require("sdk/panel").Panel({
	width: 215,
	height: 160,
	contentURL: "http://www.mozilla.org/"
});


var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: "http://www.mozilla.org/favicon.ico",
  contentScriptFile: self.data.url("click-listener.js"),
  panel: clockPanel
});

widget.port.on("left-click", function(){
	console.log("LEFT");
});

widget.port.on("right-click", function(){
	console.log("RGHT");
});

*/
