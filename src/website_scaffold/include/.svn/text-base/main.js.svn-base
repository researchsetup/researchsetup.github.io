$buckets = {};

$(document).ready(function(){
	init();
});

function ge(id) {	return document.getElementById(id)}
function dbg(s, cleardisplay) {
	if (cleardisplay != null && cleardisplay == true)
		$("#debug").html(s)
	else {
		var div = $("<div/>")
		div.html(s)		
		$("#debug").append(div)
	}
}
function debug(s, cleardisplay) {dbg(s, cleardisplay)}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}


function init() {
	init_timeline()
}

function init_timeline() {
	var txt = "1939 : WWII Starts\n"+
		"baddate : this is a : bad record\n"+
		"1939 : Germany invades poland\n"+
		"June 22, 1941	 : 	Germany invades the Soviet Union\n" +
		"Dec 1941 : Jap attacks US\n"+
		"June 1942 : atomic bomb project given to army\n"+
		"September 30, 1944 : Document 1 Memorandum: Franklin D. Roosevelt\n"+
		"July 16, 1945 : First Trinity test\n"+
		"August 6, 1945 : little boy dropped\n";
	var out = "The following are the successfully parsed dates<br/>\n"
	
	var events = input_to_events(txt)
	$.each(events, function(eidx, event) {
		out += (event) + " <br/>\n"
	});
	debug(out)
		
	new_timeline("timeline_main", events)

	var historytable = $("#timeline_main .historytable"); //("#historytable");
	historytable.css({left: "0px"});
	setup(historytable)
	
}
