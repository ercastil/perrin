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

Ext.define( 'Perrin.controller.TimeSeriesController', {
	extend: 'Ext.app.Controller',
	requires: [ 
			'Perrin.controller.VariableViewUpdater',
			'Perrin.model.ArrayData'
	],
	init: function(application){
		
		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.attach( this );
		
		this.control({
			'#exportTimeSeriesButton' : {
				click: this.exportToExcel 
			}
		});

	},
	onAfterSetExtremes: function( e ){
		
		var time = Perrin.app.requestParameters.time;
		var minDate = 3*3600*1000;

		var lowerBound = new Date( e.min-minDate).toISOString().split('T');
		time['startDate'] = lowerBound[0];
		time['startTime'] = lowerBound[1];

		var upperBound = new Date( e.max-minDate).toISOString().split('T');
		time['endDate'] = upperBound[0]; 
		time['endTime'] = upperBound[1];

		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();
			
	},
	update: function()
	{
		//var request = JSON.parse( JSON.stringify(Perrin.app.basicRequest) );
		var request = Perrin.app.basicRequest;

		var async = true;
		zorronRequester.execute( 
			request, 
			function(response,textStatus,jqXHR){

				//plot histogram to highstock
				response = JSON.parse( response );
				var result = response.result[0];
				var chart = Ext.ComponentQuery.query( '#timeSeriesChart' )[0];
				var store = Ext.create( 'Ext.data.Store',{
					model: 'Perrin.model.ArrayData',
					data: result.data
				});
				chart.stores[0] = store;

				//chart title
				var chartTitle = result.variableType;
				var metaData = Perrin.app.metaData;
				if( result.variableType in metaData.variable )
				{
					var variable = metaData.variable[ result.variableType ];
					chartTitle = variable.name + '  (' + variable.unit + ')';
				}

				chart.refresh();

				chart.chart.setTitle( { text : chartTitle } );
				//enable time series panel
				var timeSeriesPanel = Ext.ComponentQuery.query( '#timeSeriesPanel' )[0];
				timeSeriesPanel.enable();
			},
			async
		);

	},
	exportToExcel: function(button){
		
		//execute request
		var requestMaker = Perrin.app.getController( 'RequestMaker' );
		var request = requestMaker.makeBasicRequest();
		
		request.outputFormat.type = "excel";
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
