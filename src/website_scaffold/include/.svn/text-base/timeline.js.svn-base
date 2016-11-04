var _bucketid = 0
function Bucket(startdate, enddate, bktsize) {
	this.startdate = startdate
	this.enddate = enddate
	this.key = startdate.clone()
	this.key.add({years : (enddate.getYear() - startdate.getYear())/2, 
		days : (enddate.getDayOfYear() - startdate.getDayOfYear())/2 })
	this.bid = _bucketid++;
	this.events = []
	this.bktsize = bktsize
}
Bucket.prototype.startdate = null
Bucket.prototype.enddate = null
Bucket.prototype.key = null
Bucket.prototype.bktsize = null
Bucket.prototype.events = null
Bucket.prototype.bid = -1
Bucket.prototype.toString = function(format) {
	if (format == null) {
		var bktsize = this.bktsize
		if (bktsize.years != null) format = "yyyy"
		else if (bktsize.months != null) format = "MMM<br/>yyyy"
		else format = "MMM-d<br/>yyyy"
	}

	return this.key.toString(format)
}

var _eventid = 0
function Event(event) {
	this.time = event[0]
	this.content = event[1]
	this.eid = _eventid++
}
Event.prototype.eid = -1
Event.prototype.time = null
Event.prototype.content = null
Event.prototype.to_list = function() {
	return [this.time, this.content];
}



function make_bar(h) {
	var img = $("<img class='bar' " +
	"src='./images/bardot.gif' style='height:"+h+"px;' ></img>");
	return img;
}

function timeline_error() {
	
}


///////////////////////////////////////////
//
//	Bucket related Functions
//
///////////////////////////////////////////

// todo: will sort events array by date.  
function to_buckets(events, nbuckets) {
	var min = events[0][0]
	var max = events[events.length - 1][0]
	return to_buckets_w_range(events, nbuckets, min, max)
}


function to_buckets_w_range(events, nbuckets, min, max) {	
	var bktsize = dates_to_bucketsize(min, max, nbuckets)
	if (bktsize == null) throw "the range is 0 days"
	var buckets = []	
	var bkts = min
	
	var x = 0
	while (bkts < max) {
		x ++ 
		var bkte = bkts.clone()
		bkte.add(bktsize)
		var bucket = new Bucket(bkts, bkte, bktsize)
		
		$.each(events, function(idx, event) {
			var etime = event[0]
			if (bkts <= etime) {
				if (etime < bkte) 
					bucket.events.push(new Event(event))
				else 
					return;				
			}			
		});
		
		buckets.push(bucket)		
		bkts = bkte
	}
	
	return buckets
}


//function to_buckets_w_range(events, nbuckets, min, max) {	
//	var rng = max - min
//	var bktsize = Math.max(1, Math.ceil(rng / nbuckets))
//	var buckets = []
//	
//	for (var i = 0; i < nbuckets; i++) {
//		var bkts = (bktsize * i) + min
//		var bkte = ((i + 1) * bktsize) + min
//		var bucket = new Bucket(bkts, bkte)
//
//		for (var idx in events) {
//			var event = events[idx]
//			var etime = event[0]
//			if (etime >= bkts && etime < bkte)
//				bucket.events.push(new Event(event))
//		}
//		buckets.push(bucket)
//	}
//
//	return buckets
//}

function bucket_to_buckets(bucket) {
	var events = []
	for (var k in bucket.events)
		events.push(bucket.events[k].to_list())
	return to_buckets_w_range(events, 5, bucket.startdate, bucket.enddate)
}


///////////////////////////////////////////
//
//	Date Functions
//
///////////////////////////////////////////

// date 2 is later or equal to date 1
function dates_to_bucketsize(date1, date2, nbuckets) {
	if (date1 > date2) return null
	
	var d_year = date2.getYear() - date1.getYear();
	var d_month = date2.getMonth() - date1.getMonth();
	var d_day = date2.getDay() - date1.getDay();
	
	if (nbuckets != null && nbuckets > 0) {
		if (d_year > 0) return {years : d_year / 5 }
		if (d_month > 0) return {months : d_month / 5 }
		if (d_day > 0) return {days : d_days / 5 }
		return null
	}
	
	var ret = null

	if (d_year > 1000) return {years: 1000}
	if (d_year > 500) return {years : 100}
	if (d_year > 100) return {years : 50}
	if (d_year > 50) return {years : 10}
	if (d_year > 10) return {years : 5}
	if (d_year > 5) return {years : 1}
	if (d_year > 0) return {months : 6}
	if (d_month > 5) return {months : 1}
	if (d_month > 0) return {months : 0.5}
	if (d_day > 10) return {days : 7}
	if (d_day > 0) return {days : 0}
	return null		
}




///////////////////////////////////////////
//
//	Html rendering
//
///////////////////////////////////////////

function bucket_to_graph(bucket) {
	var id = bucket.bid
	var div = $("<td class='tsegment'/>")
	
	div.attr("id", "tseg_" + id)
	div.hover(tseg_hover_on("tdate_"+id, bucket),
						tseg_hover_off("tdate_"+id, bucket))
	div.dblclick(function(){alert("zoom not implemented")})
	
	try {		
		var bbuckets = bucket_to_buckets(bucket)		
		for (var i = 0; i < Math.min(bbuckets.length, 5); i++) 
			div.append(make_bar(bbuckets[i].events.length * 4))
	} catch (e) {
		for (var i = 1; i < 5; i++)
			div.append(make_bar(0));		
		div.append(make_bar(bucket.events.length * 4))
	}
		
	return div;
}

function bucket_to_date(bucket) {
	var id = bucket.bid
	var td = $("<td class='date' />")
	td.attr("id", "tdate_" + id)
	td.hover(tseg_hover_on("tdate_"+id, bucket),
						tseg_hover_off("tdate_"+id, bucket));
	td.html(bucket.toString())
	return td
}

function create_timeline_obj(tlineid) {
	
var html = "<table class='tmaintable' style='position: relative;'> \
	<tr>\
		<td class='leftarrow' onclick='moveright(\"#"+tlineid+" .historytable\")'  >\
			<img src='./images/left_arrow_small.gif'/>\
		</td>\
		<td>\
			<div class='histDiv'>\
			<table class='historytable'  style='position: relative; left: -50px;'>\
			</table>\
			</div>\
		</td>\
		<td class='rightarrow' onclick='moveleft(\"#"+tlineid+" .historytable\")' >\
			<img src='./images/right_arrow_small.gif'/>\
		</td>\
	</tr>\
	<tr><td colspan=3>\
	<div id='tcontent'></div></td></tr></table>";
	var timeline = $(html);
	return timeline;
}

function new_timeline(tlineid, events) {
	var timelinemain = $("#" + tlineid)
	timelinemain.empty()
	timelinemain.append(create_timeline_obj(tlineid))
	var buckets = to_buckets(events, -1)
	var htable = $("#" + tlineid + " .historytable");
	
	var tr = $("<tr/>")
	$.each(buckets, function(idx, bucket) {
		tr.append(bucket_to_graph(bucket))
	});

	htable.append(tr)
	tr = $("<tr/>")
	$.each(buckets, function(key, bucket) {
		tr.append(bucket_to_date(bucket))
	});
	htable.append(tr)
}



function input_to_events(txtblock) {
	var lines = txtblock.split("\n")
	var pairs = []

	for (var lineidx = 0; lineidx < lines.length; lineidx++) {
		var line = lines[lineidx];
		line = line.trim();
		if (line.length == 0) continue
		var idx = line.indexOf(" : ")
		if (idx == -1) {
			debug("couldn't parse: \"" + line + "\"")
			continue
		}
		try {
			var datestr = line.substring(0, idx)
			var rest = line.substring(idx + 3)
		
			var newdate = Date.parse(datestr.trim())
			if (newdate == null) 
				debug("couldn't parse: \"" + datestr + " : " + rest + "\"")
			else
				pairs.push([newdate, rest])
		} catch (ex) {
			debug(ex.toString())
		}
	}
	
	return pairs
}






































function moveleft(id) {
	var width = $(id).parent(".histDiv").width()
	move($(id),-(0.8 * width))
}
function moveright(id) {
	var width = $(id).parent(".histDiv").width()
	move($(id),(0.8 * width))
}
function move(o, mv) {
	if (mv == 0 || mv == null) return
	if (o.left == null) {
		var left = o.css("left")
		o.left = new Number(left.substring(0, left.length - 2))	
	}
	var tlineleft = o.left + mv
	setleft(o, tlineleft)
}

function setleft(o, left) {	
	var enc = o.parent(".histDiv")
	var encwidth = enc.width()
	var tlinewidth = o.width()
	if (((-1 *left) + encwidth) >= tlinewidth) 
		left = -1 * (tlinewidth - encwidth)
	else if (left > 0) 
		left = 0
	o.css("left", left + "px");
	o.left = left
}

function setup(tline) {
	//tline.parent("body").onclick = function(evt){alert("yo")};
	tline.mousedown(tline_down(tline))
}

function tline_down(tline){
	return function(evt) {
		evt.stopPropagation();
		$(document).mousemove(tline_move(tline, evt.pageX));
		$(document).mouseup(tline_up(tline));
	}
}
function tline_move(tline, startX){
	var prevX = startX
	return function(evt) {
		evt.stopPropagation()
		move(tline, evt.pageX - prevX)
		prevX = evt.pageX
	}
}
function tline_up(tline){
	return function(evt) {
		evt.stopPropagation();
		$(document).unbind("mousemove");
		$(document).unbind("mouseup");		
	}
}

function bucket_to_html(bucket) {	
	var events = bucket.events
	txt = "<table class='histSample'>";
	txt += "<tr class='header'><td>date</td><td>description</td></tr>"
	$.each(events, function(k, event) {		
		txt += "<tr>"
		txt += "<td class='key'>" + event.time.toString("MMM d, yyyy") + "</td>"
		txt += "<td class='val'>" + event.content + "</td>"
		txt += "</tr>"
		})
	if (events.length == 0) txt += "<tr><td colspan=2 style='text-align:center;'><i>no events</i></td></tr>"
	txt += "</table>";
	return txt;
}

function tseg_hover_on(id, bucket) {
	return function() {
		$("#"+id).css("background", "#dddddd")		
		$("#tcontent").html(bucket_to_html(bucket));
	}
}
function tseg_hover_off(id) {
	return function() {
		$("#"+id).css("background", "transparent")
	}
}
/*
function tseg_hover_on(id, bucketkey) {
	bucket = buckets[bucketkey]
	$("#"+id).css("background", "#dddddd")		
	$("#tcontent").html(bucket_to_html(bucket));
}
function tseg_hover_off(id) {
	$("#"+id).css("background", "transparent")
}
*/
