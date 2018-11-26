/*
 * index.js
 * Put your JavaScript in here
 */

"use strict";

/*===========================*/
/* put global variables here */
/*===========================*/
var runButton, resetButton, output = null;

/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	runButton 	= document.getElementById("runButtonId");
	resetButton = document.getElementById("resetButtonId");
	output		= document.getElementById("outputId");

	runButton.addEventListener("click", runQuery, false);
	resetButton.addEventListener("click", resetQuery, false);
	resetQuery();
}

/*====================*/
/* put functions here */
/*====================*/

function runQuery() {

		MySql.Execute(
			"sql.wpc-is.online",	// mySQL server
			"demo", 				// login name
			"demo12345", 			// login password
			"BabyNames", 			// database to use
									// SQL query string:
			"SELECT 											\
				state, year, name, number 						\
			 FROM 												\
				NamesNumberByStateYear 							\
			 WHERE 												\
				state = 'AZ' AND sex = 'boy' AND year = '1964' 	\
			 ORDER BY number DESC 								\
			 LIMIT 5;",
	        function (data) {
	        	processQueryResult(data);
	    	}
	    );

   }

function processQueryResult(queryReturned) {
	if (!queryReturned.Success) {
		alert(queryReturned.Error)
	} else {
		output.innerHTML = JSON.stringify(queryReturned.Result, null, 2);
	}
}

function resetQuery() {
	output.innerHTML = "Test Query Results:";

}
