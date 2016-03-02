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

Ext.define( 'Perrin.controller.RequestMaker', {
	extend: 'Ext.app.Controller',
	makeBasicRequest: function(){

		var requestParameters = Perrin.app.requestParameters;
		var basicRequest = { type : 'data' };			

		//station
		if( requestParameters.station != null )
		{
			var station = requestParameters.station;
			basicRequest['table'] = { 'code' : station.code 
			};
		}

		//variable
		if( requestParameters.variable != null )
		{
			var variable = requestParameters.variable;
			basicRequest['variable'] = {
							'type' : variable.type,
							'statistic': variable.statistic,
							'altitude' : variable.altitude
			};
		}

		//time filter
		if( requestParameters.time != null )
		{
			var time = requestParameters.time;
			basicRequest['time'] = {};

			if( 'startDate' in time )
				basicRequest.time['lowerBound'] = Ext.String.format("{0}T{1}",time.startDate,time.startTime);

			if( 'endDate' in time )
				basicRequest.time['upperBound'] = Ext.String.format("{0}T{1}",time.endDate,time.endTime);

			basicRequest.time['hours'] = time.hours;
			basicRequest.time['months'] = time.months;

			//years
			var years = [];
			for( var i=0;i<time.allYears.length;i++)
			{
				var year = time.allYears[i];
				if( time.selectedYears.indexOf(year) < 0 )
					years.push( year );		
			}
			requestParameters.time.years = years;

			basicRequest.time['years'] = time.years;
		};

		//transformation
		if( requestParameters.transformation != null )
		{
			var transformation = requestParameters.transformation;	
		}

		//resampling
		if( requestParameters.resampling != null )
		{
			var resampling = requestParameters.resampling;
			basicRequest['resampling'] = {
							interval : resampling.interval,
							statistic : resampling.statistic,
			};
			if( resampling.minimumFraction != null )
				basicRequest.resampling[ 'minimumFraction' ] = resampling.minimumFraction;
		}

		//output format
		basicRequest['outputFormat'] = {
						'type': 'json'
		};
		
		return basicRequest;
	},
});
