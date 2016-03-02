/*
pErRin - Meteorological Time Series Web Explorer
Copyright (C) 2014 - Ernesto Castillo Navarrete

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

Ext.define( 'Perrin.controller.VariableSummaryController' , {

	extend: 'Ext.app.Controller',
	requires: [ 
			'Perrin.controller.VariableViewUpdater' 
	],
	updateVariableStandardSummary: function()
	{
		var requestMaker = Perrin.app.getController( 'RequestMaker' );
		var request = requestMaker.makeBasicRequest();
		delete request["time"];
		request["computation"] = { "name" : "standardSummary" 
		};
		var async = false;
		zorronRequester.execute( 
			request, 
			function(response,textStatus,jqXHR){

				response = JSON.parse( response );
				var result = response.result[0];
				var requestParameters = Perrin.app.requestParameters;
				requestParameters.standardSummary = result;
			},
			async
		);

	},
	updateYearsFilter: function(){
	
		//all years
		var requestParameters = Perrin.app.requestParameters;
		var standardSummary= requestParameters.standardSummary;
		var startTimeStamp = standardSummary.firstTimeStamp.split('T');
		var endTimeStamp = standardSummary.lastTimeStamp.split('T');

		var allYears = [];
		var firstYear =parseInt( startTimeStamp[0].substring(0,4) );
		var lastYear = parseInt( endTimeStamp[0].substring(0,4) );
		for(var year= firstYear;year<=lastYear;year++)
			allYears.push( year );
		requestParameters.time.allYears = allYears;
		
	},
	updateVariableInfo: function()
	{
		var requestMaker = Perrin.app.getController( 'RequestMaker' );
		var request = requestMaker.makeBasicRequest();
		
		request["computation"] = { "name" : "standardSummary" 
		};
		var async = false;
		zorronRequester.execute( 
			request, 
			function(response,textStatus,jqXHR){

				response = JSON.parse( response );
				var result = response.result[0];
							
				
				var variableSummary = Ext.ComponentQuery.query( '#variableSummary' )[0];	
				var store = variableSummary.getStore();

				console.log( result );

				var start = result.firstTimeStamp.split("T");
				var end = result.lastTimeStamp.split("T");
				var interval = result.interval.units + " " + result.interval.code

				var records = [
						{ name : 'StartDate', value : start[0] },
						{ name : 'StartTime', value : start[1] },
						{ name : 'EndDate', value : end[0] },
						{ name : 'EndTime', value: end[1] },
						{ name : 'Min', value : Ext.util.Format.number( result.data.min, '0,000.00' ) },
						{ name : 'Max', value : Ext.util.Format.number( result.data.max, '0,000.00' ) },
						{ name : 'Std', value : Ext.util.Format.number( result.data.stdev , '0,000.00' )},
						{ name : 'Avaible', value : Ext.util.Format.number( (result.data.fraction*100) , '0,000.00' ) .toString().concat( '%' ) },
						{ name : 'Interval', value : interval }
				];
				store.removeAll();
				store.add( records );

				//start end datetime
				var variableSummaryController = Perrin.app.getController( 'VariableSummaryController' );
				variableSummaryController.updateStartEndDateTime(result);
			},
			async
		);

		//enable variable summary
		var variableSummary = Ext.ComponentQuery.query( '#variableSummary')[0];
		variableSummary.enable();

	},
	updateStartEndDateTime: function(result)
	{
		var requestParameters = Perrin.app.requestParameters;
		var startTimeStamp = result.firstTimeStamp.split('T');
		var endTimeStamp = result.lastTimeStamp.split('T');

		requestParameters.time.startDate = startTimeStamp[0];
		requestParameters.time.startTime = startTimeStamp[1];

		requestParameters.time.endDate = endTimeStamp[0];
		requestParameters.time.endTime = endTimeStamp[1];
	},
	update: function(){
		
		this.updateVariableStandardSummary();
		this.updateYearsFilter();
		this.updateVariableInfo();
	}
});
