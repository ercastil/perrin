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

Ext.define( 'Perrin.controller.AnnualCycleController', {
	extend: 'Ext.app.Controller',
	requires: [ 
			'Perrin.controller.VariableViewUpdater',
			'Perrin.model.ArrayData'
	],
	init: function(application){
		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.attach( this );
		
		this.control({
			'#exportAnnualCycleButton' : {
				click: this.exportToExcel 
			}
		});

	},
	update: function(){

		//request data
		var request = Perrin.app.basicRequest;
		request["computation"] =  { 
						  "name" : "annualCycle",
						  "statistic" : { "name" : "mean" }
		};

		var async = true;
		zorronRequester.execute( 
			request, 
			function(response,textStatus,jqXHR){

				response = JSON.parse( response );
				var result = response.result[0];
				var chart = Ext.ComponentQuery.query( '#annualCycleChart' )[0];
				var store = Ext.create( 'Ext.data.Store', {
						model: 'Perrin.model.ArrayData',
						data: result.data
				});
				chart.store = store;
				chart.draw();
			
				//axis titles
				var yAxisTitle = result.variableType;
				var metaData = Perrin.app.metaData;
				if( result.variableType in metaData.variable )
				{
					var variable = metaData.variable[ result.variableType ];
					yAxisTitle = variable.name + '  (' + variable.unit + ')';
				}

				var yAxis = chart.chart.yAxis[0];
				yAxis.setTitle( { text : yAxisTitle } );

			},
		async);

	},
	exportToExcel: function( button ){

		//execute request
		var requestMaker = Perrin.app.getController( 'RequestMaker' );
		var request = requestMaker.makeBasicRequest();
		
		request["computation"] =  { 
						  "name" : "annualCycle",
						  "statistic" : { "name" : "mean" }
		};
		request.outputFormat.type = "excel";
		delete request['resampling']
		var async = true;
		var zorronRequester = Perrin.app.getController( 'ZorronRequester' );
		zorronRequester.execute( 
			request, 
			function(response,textStatus,jqXHR){

				var fileUrl = response;
				window.open( fileUrl, 'Download' );
			},
			async
		);
	}
});
