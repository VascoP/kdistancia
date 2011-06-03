
	window.onload = init;
	
	var map;
	var marker = new Array();
	var polyline;
	var undo_poly = new Array();
	var distance = 0;
	
	var style = {
		strokeColor: "#ff0000",
		strokeOpacity: 0.5,
		strokeLinecap: "round",
		strokeWidth: 3
	};
	
	var recording = 0;
	var _closed = 0;

	function init(){
		map = new SAPO.Maps.Map("map");
		map.addControl(new SAPO.Maps.Control.Navigation(), new OpenLayers.Pixel(240,15));
		map.zoomTo(7);
		map.events.register('click', this, clicked);
		if (navigator.userAgent.indexOf('MSIE') !=-1)
			$('<p>Este site não está optimizado para Internet Explorer. Para uma melhor experiência usar um browser como o <a href="http://www.google.com/chrome" target="_ablank">Chrome</a> ou <a href="http://www.mozilla.com" target="_ablank">Firefox</a></p>').appendTo('#main');
	}
	
	function clicked(evt){
		if(recording)
		{
			var lonlat = map.getLonLatFromContainerPixel(evt.xy);
			if(marker.length < 2)
			{
				marker.push(new SAPO.Maps.Marker(lonlat));
				map.addOverlay(marker[marker.length-1]);
			}
			else
				marker[1].setLonLat(lonlat);
			
			if(polyline == null)
			{
				polyline = new SAPO.Maps.Polyline(lonlat, style);
				map.addOverlay(polyline);
			}
			if(polyline.getVertexCount() > 0)
				undo_poly[(polyline.getVertexCount()-1)] = polyline.clone();
			polyline.insertVertex(polyline.getVertexCount(), lonlat);
			
			updateDistance(laps.value);
		}
	}
	
	function startRecording(){
		recording = 1;
		document.getElementById("startbutton").style.color = "#ccc";
		document.getElementById("startbutton").style.WebkitBoxShadow = "0px 0px 0px #eee";
		document.getElementById("startbutton").style.MozBoxShadow = "0px 0px 0px #eee";
		document.getElementById("startbutton").style.boxShadow = "0px 0px 0px #eee";
	}
	
	function closeRun(){
		if(recording && marker.length > 1)
		{
			marker[1].setLonLat(polyline.getVertex(0));
			undo_poly[(polyline.getVertexCount()-1)] = polyline.clone();
			polyline.insertVertex(polyline.getVertexCount(), polyline.getVertex(0));
			updateDistance(laps.value);
			recording = 0;
			_closed = 1;
			document.getElementById("startbutton").style.color = "#666";
			document.getElementById("startbutton").style.WebkitBoxShadow = "0px 0px 8px #27d627";
			document.getElementById("startbutton").style.MozBoxShadow = "0px 0px 8px #27d627";
			document.getElementById("startbutton").style.boxShadow = "0px 0px 8px #27d627";
		}
	}
	
	function updateDistance(laps){
		if(polyline != null)
		{
			distance = Math.floor(polyline.getLength());
			if(parseFloat(laps) > 0)
				distance *= parseFloat(laps);
				
			if(distance > 1000)
			{
				var km = distance/1000;
				document.getElementById("distance").innerHTML = "Distância total: " + km.toFixed(2) + " km";
			}
			else
				document.getElementById("distance").innerHTML = "Distância total: " + distance.toFixed(2) + " m";
				
			updateStats(weight.value, hour.value, minute.value);
		}
		else
			document.getElementById("distance").innerHTML = "Distância total: 0 m";
	}
	
	function eraseRun(){
		map.removeOverlay(polyline);
		map.removeOverlay(marker[0]);
		if(marker[1])
			map.removeOverlay(marker[1]);
		marker.length = undo_poly.length = 0;
		polyline = null;
		recording = 0;
		document.getElementById("startbutton").style.color = "#666";
		document.getElementById("startbutton").style.WebkitBoxShadow = "0px 8px #27d627";
		document.getElementById("startbutton").style.MozBoxShadow = "0px 0px 8px #27d627";
		document.getElementById("startbutton").style.boxShadow = "0px 0px 8px #27d627";
		updateDistance(laps.value);
	}
	
	function undoPoint(){
		if(polyline)
		{
			var i = polyline.getVertexCount();
			
			if(i == 0)
				return;
			if(i == 1)
				eraseRun();
			else
			{
				map.removeOverlay(polyline);
				polyline = undo_poly.pop();			
				updateDistance(laps.value);
				marker[1].setLonLat(polyline.getLonLats().pop());
				map.addOverlay(polyline);
				if(_closed == 1)
				{
					recording = 1;
					_closed = 0;
					document.getElementById("startbutton").style.color = "#ccc";
					document.getElementById("startbutton").style.WebkitBoxShadow = "0px 0px 0px #eee";
					document.getElementById("startbutton").style.WebkitBoxShadow = "0px 0px 0px #eee";
					document.getElementById("startbutton").style.MozBoxShadow = "0px 0px 0px #eee";
					document.getElementById("startbutton").style.boxShadow = "0px 0px 0px #eee";
				}
			}
		}
	}
	
	
	function updateStats(weight, hour, minute){
		var calories = 0, kmh = 0, minkm = 0;
		
		distance = Math.floor(distance);
		weight = parseFloat(weight);
		hour = parseFloat(hour);
		minute = parseFloat(minute);

		if(distance > 0)
		{
			hour = hour + (minute/60);
			kmh = (hour == 0) ? 0 : (distance/1000)/hour;
			minkm = Math.floor((hour*60)/(distance/1000));
			seckm = Math.floor(((hour*60)/(distance/1000)%1)*60);
			
			if(kmh > 5)
				calories = Math.floor((0.75*(weight/0.453)*(distance/1.609))/1000);
			else
				calories = Math.floor((0.53*(weight/0.453)*(distance/1.609))/1000);
			
			document.getElementById("calories").innerHTML = "Calorias queimadas: " + calories + " kcal";
			document.getElementById("speed").innerHTML = "Velocidade média: " + kmh.toFixed(2) + " km/h";
			document.getElementById("min_km").innerHTML = "Velocidade média: " + minkm + ":" + seckm + " min/km";
		}
	}
	