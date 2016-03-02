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

Ext.define('Perrin.controller.VariableSelectionHandler',{

	extend: 'Ext.app.Controller',
	requires: [ 
			'Perrin.view.Viewport',
			'Perrin.view.VariableSelector',
			'Perrin.controller.VariableViewUpdater'
	],
	views: [
		'Perrin.view.Viewport',
		'Perrin.view.VariableSelector'
	],
	init: function(){
		this.control({
			'variableSelector': {
				select: this.onVariableSelect
			}
		});
	},
	enableWidgets: function(){
		
		var resamplingFilter = Ext.ComponentQuery.query( '#resamplingFilter' )[0];
		resamplingFilter.enable();

		var timeFilter = Ext.ComponentQuery.query( '#timeFilter' )[0];
		timeFilter.enable();
	},
	setNavigatorSeries: function(){
		
		var requestMaker = Perrin.app.getController( 'RequestMaker' );
		var request = requestMaker.makeBasicRequest();
		delete request.time;

		var async = false;
		var zorronRequester = Perrin.app.getController( 'ZorronRequester' );
		zorronRequester.execute( 
			request,
			function(response,textStatus,jqXHR){
				response = JSON.parse( response );
				var result = response.result[0];			
				var chart = Ext.ComponentQuery.query( '#timeSeriesChart' )[0];
				chart.chartConfig.navigator.series.data = result.data;

			},
			async
		);
	},
	onVariableSelect: function(selector,record){
	
		var currentState = Perrin.app.currentState;

		var requestParameters = Perrin.app.requestParameters;
		requestParameters.variable = record.data;

		switch( currentState )
		{
			case Perrin.app.states.STATION_SELECTION:
				this.enableWidgets();
				break;

			//case : Perrin.app.states.VARIABLE_SELECTION
			//case : Perrin.app.states.VARIABLE_VIEW_UPDATE
		}

		//set navitagor series
		this.setNavigatorSeries();

		//update widgets
		var updater = Perrin.app.getController( 'VariableViewUpdater' );	
		updater.execute();

		//set current state
		Perrin.app.currentState = Perrin.app.states.VARIABLE_SELECTION;
	}
});
