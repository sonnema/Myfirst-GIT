var statusData = '';
$(document).ready(function(){
	var dataUrl = 'sampleData.txt';
	//alert(dataUrl);
	loadStatusData(dataUrl);
	
	$.each(dataUrl, function (i, point) 
		{
			point.y = point.data;
		});


		var chart = new Highcharts.Chart({

			chart:  {
				renderTo: 'container',
				type: 'pie'
					},
				series: [{
					type: 'pie',
					name: 'Browser share',
					data: dataUrl
					}]
		});
});




function showStatusInfo(taskStatus) {

	taskStatusCount = taskStatus.items.length;
	
	/*
	var message = "<h3>" + campaigns.header + "</h3>" +
	                      "On " + campaigns.timestamp +
	                " we'll run " + campaignsCount + " campaigns.";

    locationUI.innerHTML = message + locationUI.innerHTML;
	resizeMapLink.style.visibility = "visible";
	*/

	createTaskStatusPie(taskStatus);
}

function loadStatusData(dataUrl) {
	alert(" Inside load status : ");
 var xhr = new XMLHttpRequest();
 xhr.open('GET', "sampleData.txt");
 alert(" loaded file  : ");
 xhr.onreadystatechange = function() {
	 alert(" Inside  funtion file  :");
 	if (xhr.readyState == 4) {
 		if ((xhr.status >= 200 && xhr.status < 300) ||
                                    xhr.status === 304) {
 	 	var jsonData = xhr.responseText;
 	 	 alert(" Reponse status file  : "+jsonData);
 	 	alert(" jsonData : " + jsonData);
 	 	statusData = JSON.parse(jsonData).taskStatus;
 	 	alert("statusData : " + statusData);
 	 	showStatusInfo(statusData);
 	 } 
     else 
     {
 	 	console.log(xhr.statusText);
/*
           tempContainer.innerHTML += '<p class="error">Error getting ' +
                 target.name + ": "+ xhr.statusText +
                 ",code: "+ xhr.status + "</p>"; */
 	 }
 	}
 };
 xhr.send();
}

