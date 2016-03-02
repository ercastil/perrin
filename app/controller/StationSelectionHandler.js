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

Ext.define('Perrin.controller.StationSelectionHandler',{

	extend: 'Ext.app.Controller',
	requires: [ 
			'Perrin.view.Viewport',
			'Perrin.view.SelectorPanel',
			'Perrin.view.StationSelector'
	],
	views: [
		'Perrin.view.Viewport',
		'Perrin.view.SelectorPanel',
		'Perrin.view.StationSelector'
	],
	init: function(){
		this.control({
			'stationSelector': {
				select : this.onStationRowSelect
			}
		});
	},
	showStationSummary: function(stationMetaData){

		var stationSummary = Ext.ComponentQuery.query( '#stationSummary' )[0];
		var store = stationSummary.getStore();
		var records = [ 
				{ name : 'Group' , value : stationMetaData.group },
				{ name : 'Code' , value : stationMetaData.code },
				{ name : 'Name', value : stationMetaData.name },
				{ name : 'Lat', value : Ext.util.Format.number( stationMetaData.latitude, '0,000.00') },
				{ name : 'Long', value : Ext.util.Format.number( stationMetaData.longitude, '0,000.00') }
		];
		store.removeAll();
		store.add( records );
		stationSummary.enable();
	},
	showStationLocation: function(stationMetaData){

		var stationMap = Ext.ComponentQuery.query( '#stationMap')[0];
		var map = stationMap.map;

		var latitude = stationMetaData.latitude;
		var longitude = stationMetaData.longitude;
		var loc = [ latitude, longitude ];

		//set selectedIcon
		var selectedIcon = L.icon({ iconUrl: 'img/icons/red_icon.png' });
		var stationCode = stationMetaData.code;
		var selectedMarker = map.markers[stationCode];
		selectedMarker.openPopup();
		selectedMarker.setIcon( selectedIcon );
		map.setView( loc, 10 );

		//set unselectedIcon
		//var solarIcon =  L.icon({ iconUrl: 'img/icons/solar.png', iconSize: [30,30] });
		//var eoloIcon = L.icon({ iconUrl: 'img/icons/eolo.jpg', iconSize:[30,30] });
		var unselectedIcon = L.icon( { iconUrl: 'img/icons/blue_icon.png' } );
		//if( stationMetaData.group == 'eolo' )
		//	unselectedIcon = eoloIcon;
		if( map.lastSelectedMarker != null )
		{
			map.lastSelectedMarker.setIcon( unselectedIcon );
			map.lastSelectedMarker.closePopup();
		}

		map.lastSelectedMarker = selectedMarker;

	},
	showVariables: function(stationMetaData){

		var variableSelector = Ext.ComponentQuery.query( '#variableSelector' )[0];	
		var variableSelectionHandler = Perrin.app.getController( 'VariableSelectionHandler' );
		var store = variableSelector.getStore();
		store.removeAll(true);

		var stationCode = stationMetaData.code;
		var records = [];

		var metaData = Perrin.app.metaData;

		for(var index in stationMetaData.variables )
		{
			var variable = stationMetaData.variables[index];
			variable['stationCode'] = stationCode

			//variable type
			if( variable.type in metaData.variable )
				variable['type_name'] = metaData.variable[ variable.type ].name;
			else	
				variable['type_name'] = 'NN'

			//variable statistic
			if( variable.statistic in metaData.statistic )
				variable['statistic_name'] = metaData.statistic[ variable.statistic ];
			else
				variable['statistic_name'] = variable.statistic

			records.push( variable );

		}
		store.add( records );
		variableSelector.getSelectionModel().clearSelections();
		variableSelector.getView().refresh();
		variableSelector.enable();

	},
	reinitWidgets: function(){

		//variable summary
		var variableSummary = Ext.ComponentQuery.query( '#variableSummary' )[0];
		variableSummary.clear();
		variableSummary.disable();

		//statistics panel
		var statisticsPanel  = Ext.ComponentQuery.query( '#statisticsPanel' )[0];
		statisticsPanel.clear();
		statisticsPanel.disable();
		
		//time filter
		var timeFilter  = Ext.ComponentQuery.query( '#timeFilter' )[0];
		timeFilter.clear();
		timeFilter.disable();

		//resampling filter
		var resamplingFilter  = Ext.ComponentQuery.query( '#resamplingFilter' )[0];
		resamplingFilter.disable();

		//time series panel
		var timeSeriesPanel  = Ext.ComponentQuery.query( '#timeSeriesPanel' )[0];
		timeSeriesPanel.clear();
		timeSeriesPanel.disable();
				
	},
	onStationSelect: function( stationCode ){

		var stationMetaData = Perrin.app.metaData['tables'][stationCode];

		var requestParameters = Perrin.app.requestParameters;
		requestParameters['station'] = stationMetaData;

		var currentState = Perrin.app.currentState;
		switch( currentState ){

			case Perrin.app.states.VARIABLE_SELECTION:
			case Perrin.app.states.VARIABLE_VIEW_UPDATE:
				this.reinitWidgets();
		}

		this.showStationLocation(stationMetaData);
		this.showStationSummary(stationMetaData);
		this.showVariables(stationMetaData);
		Perrin.app.currentState = Perrin.app.states.STATION_SELECTION;

	},
	onStationMapSelect: function(e){
		
		var stationCode = e.target.stationCode;
		var stationSelector = Ext.ComponentQuery.query( '#stationSelector' )[0];
		var store = stationSelector.getStore();
		var index = store.find( 'code' , stationCode );
		stationSelector.getSelectionModel().select( index );
		
	},
	onStationRowSelect: function(selector,record,index){
		
		var stationCode = record.data.code;
		this.onStationSelect( stationCode );
	}
});
