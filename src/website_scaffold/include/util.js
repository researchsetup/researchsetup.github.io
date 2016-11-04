Function.prototype.inherits = function(parent) {
	if (parent == null) return;
	var me = this;
	me.uber = {};
	me.prototype.uber = {};
	
	$.extend(me.uber, parent);
	$.each(parent.prototype, function(key, val){
		if ("function" == typeof val) {
			var thefun = function(obj) {
				return val.apply(obj, Array.prototype.slice.apply(arguments, [1]));
			}
			me.prototype[key] = val;
			me.prototype.uber[key] = thefun;
		} else {
			me.prototype[key] = val;
		}
	});
	
	return this;
}





function Util() {};
// obj is {}
// filter is array of keywords to keep
Util.filter = function(obj, filter) {
	var ret = {};
	if (obj != null && filter != null) {		$.each(filter, function(idx, keyword){
			if (obj[keyword] != null) 
				ret[keyword] = obj[keyword];
		});
	}
	return ret;
}

Util.noopEventHandler = function(evt){	
		evt.stopPropagation();	
}


Util.eventToXY = function(evt) {
	var width = calendar.width;
	var height = calendar.height;
	var y = Math.min(Math.max(Math.floor((evt.pageY-calendar.top)/ height), 0), 47);
	var x = Math.min(Math.max(Math.floor((evt.pageX-calendar.left) / width), 0), 6);
	var topVal = (y * height) + 1 + "px";
	var leftVal = (x * width) + 2 + "px";
	return {width:width, height: height, x:x, y:y, top:topVal, left:leftVal};	
}

Util.rowToY = function(row) {
	var y = row * calendar.height;
	y += 1;
	return y;
}

Util.dayToX = function(day) {
	var x = day * calendar.width;
	x += 2;
	return x;
}

Util.dayToShortString = function(day) {
	switch (day) {
		case 0:
			return "Su";
		case 1:
			return "M";
		case 2:
			return "Tu";
		case 3:
			return "W";
		case 4:
			return "Th";
		case 5:
			return "F";
		case 6:
			return "Sa";
		default:
			return "";
	}
}
Util.dayToString = function(day) {
	switch (day) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
		default:
			return "";
	}
}


// string: 5:30pm
// y: the row on the calendar
// time: 5.5 for 5:30am
Util.rowToString = function(y) {
	var mod = y % 2;
	var hr = (Math.floor(y / 2) % 12);
	hr = (hr == 0)? 12 : hr;
	var min = (mod == 0)? "00" : "30";
	var ap = (y/2 >= 12)? "pm" : "am";
	hr = (hr == 0)? 12 : hr;
	
	return hr + ":" + min + ap;
}
Util.stringToTime = function(str) {
	if (str == null || str.length < 5) return -1;
	if (str.match("[0-9]+\:[0-9]+a?p?m") == null) return -1;
	str = str.toLowerCase();
	var ap = str.substr(str.length - 2);
	var split = str.substr(0, str.length-2).split(":");
	var hr = new Number(split[0]);
	var mn = new Number(split[1]);
	var ret = hr + ((mn == 0)? 0 : 0.5) + ((ap == "pm")? ((hr == 12)?0 : 12) : 0);
	return ret;	
}
Util.stringToRow = function(str) {
	var time = Util.stringToTime(str);
	if (time == -1) return -1;
	return Util.timeToRow(time);
}
Util.rowToTime = function(y) {
	return y / 2;
}
Util.timeToRow = function(time) {
	return time * 2;
}


/*
Function.swiss = function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
};
Function.inheritsold = function (parent) {
    var d = {}, p = (this.prototype = new parent());
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
};*/