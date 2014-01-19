function compile(cssContent, replacements) {
	
	for(var name in replacements) {
		var regex = new RegExp('\`' + name + '\`', 'g');
		cssContent = cssContent.replace(regex, replacements[name]);
	}
	
	return cssContent;
}

function genFromPrefs(cssContent, prefs) {
	var replacements = {};
	
	for(var name in prefs) {
		if(name.indexOf("vcss_") == 0)
		{
			replacements[name.substr(5)] = prefs[name];
		}
	}
	
	return compile(cssContent,replacements);
}

exports.genFromPrefs = genFromPrefs;
exports.compile = compile;