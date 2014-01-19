var data = require("sdk/self").data,
	tabs = require("sdk/tabs"),
	widgets = require("sdk/widget"),
	pageMod = require("sdk/page-mod"),
	prefs = require('sdk/simple-prefs').prefs;


pageMod.PageMod({
	include: /.*\.tumblr\.com\/archive.*/,
	contentScriptFile: [data.url("vendor/jquery-2.0.3.min.js"),
	                    data.url("sizzle-archive-highlight.js")],
	contentStyleFile: data.url("sizzle-archive-highlight.css")
});

var widget = widgets.Widget({
	id: "sizzle-widget",
	label: "sizzle",
	contentURL: data.url("sizzle.ico")
});


//debug
//tabs.open("http://gladyourenothere.tumblr.com/archive");
console.log(prefs['color']);
// !debug

