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

Ext.define( 'Perrin.controller.HistogramController', {
	extend: 'Ext.app.Controller',
	requires: [
			'Perrin.controller.VariableViewUpdater',
			'Perrin.controller.ZorronRequester',
			'Perrin.model.ArrayData'
	],
	init: function(application){

		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.attach( this );

		this.control({
			'#exportHistogramButton' : {
				click: this.exportToExcel 
			}
		});
	},
	update:	function(){
		
		var request = Perrin.app.basicRequest;
		
		request["computation"] =  { 
						  "name" : "histogram",
						  "bins" : 100,
						  "density" : true
		};


		var async = true;
		var zorronRequester = Perrin.app.getController( 'ZorronRequester' );
		zorronRequester.execute( 
			request, 
			function(response,textStatus,jqXHR){


				//plot series to highcharts
				response = JSON.parse( response );
				var result = response.result[0];
				var dataArray = [];
				for(var index in result.data)
				{
					var item = result.data[index];
					var x = item[0][0];
					var y = item[1];
					dataArray.push( [x,y] );
				}
				var chart = Ext.ComponentQuery.query( '#histogramChart' )[0];
				var store = Ext.create( 'Ext.data.Store', {
					model: 'Perrin.model.ArrayData',
					data: dataArray
				});
				chart.store = store;

				//enable statistics panel
				var statisticsPanel = Ext.ComponentQuery.query( '#statisticsPanel' )[0];
				statisticsPanel.enable();

				//TODO: define store for histogram
				chart.draw();

				//axis titles
				var xAxisTitle = result.variableType;
				var metaData = Perrin.app.metaData;
				if( result.variableType in metaData.variable )
				{
					var variable = metaData.variable[ result.variableType ];
					xAxisTitle = variable.name + '  (' + variable.unit + ')';
				}

				var xAxis = chart.chart.xAxis[0];
				xAxis.setTitle( { text : xAxisTitle } );

				var yAxis = chart.chart.yAxis[0];
				yAxis.setTitle( { text : 'Densidad (%)' } );
			},
		async);
	},
	exportToExcel: function(button){
		
		//execute request
		var requestMaker = Perrin.app.getController( 'RequestMaker' );
		var request = requestMaker.makeBasicRequest();
		
		request["computation"] =  { 
						  "name" : "histogram",
						  "bins" : 100,
						  "density" : true
		};

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
})

