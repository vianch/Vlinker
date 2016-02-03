function ColorLed(_isCommonAnode) {
	this.isCommonAnode = _isCommonAnode;
}

ColorLed.prototype.hexToRgb = function(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? this.setColorRGBColor(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)) : null;
};

ColorLed.prototype.setColorRGBColor = function(r,g,b) {
	return (this.isCommonAnode) ? { red: 255-r, green: 255-g, blue: 255-b} : { red: r, green: g, blue: b};
}

module.exports = new ColorLed(false);