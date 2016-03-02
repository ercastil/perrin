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

Ext.define('Perrin.controller.Initializer',{
	extend:	'Ext.app.Controller',
	
	showStationRows: function(result){

		var stationSelector= Ext.ComponentQuery.query('stationSelector')[0];
		var store = stationSelector.getStore();

		var stationMetaData = result.tables;
		var records = [];
		var stationCounter = 1;
		for(var key in stationMetaData )
		{
			var metaData = stationMetaData[key];

			var variables = [];
			var variableCounter = 1;
			for(var index in metaData.variables)
			{
				var variable = metaData.variables[index];
				variable['station_id'] = stationCounter;
				variable['id'] = variableCounter;
				variables.push( variable );

				variableCounter = variableCounter + 1;
			}
			var record = { 
					id : stationCounter,
					code : metaData.code,
					group: metaData.group,
					name: metaData.name,
					latitude: Ext.util.Format.number( metaData.latitude, '0,000.00' ),
					longitude: Ext.util.Format.number( metaData.longitude, '0,000.00' )
			};

			records.push( record );	

			stationCounter = stationCounter + 1;
		}
		store.add( records );
		store.sort( 'group', 'DESC' );
	},
	showStationsOnMap: function(result){
		
		var stationMap = Ext.ComponentQuery.query( '#stationMap')[0];
		var map = stationMap.map;
		map.markers = {};
		var stationInfo = [];

		//var solarIcon =  L.icon({ iconUrl: 'img/icons/solar.png', iconSize:[30,30] });
		//var eoloIcon = L.icon({ iconUrl: 'img/icons/eolo.jpg', iconSize: [30,30] });

		var selectedIcon = L.icon({
			iconUrl: 'img/icons/red_icon.png'
		});

		var unselectedIcon = L.icon({
			iconUrl: 'img/icons/blue_icon.png'
		});

		for( var key in result.tables )
		{
			//location
			var metaData = result.tables[key];
			var latitude = metaData.latitude;
			var longitude = metaData.longitude;
			var loc = [ latitude, longitude ];


			//marker
			//unselectedIcon = eoloIcon;
			//if( metaData.group == 'solar' )
			//	unselectedIcon = solarIcon;
			
			var marker = L.marker( loc, { icon: unselectedIcon} );

			marker.stationCode = metaData.code;

			var popupTemplate = new Ext.XTemplate(
				'<b>Name:</b> {name}<br>',
				'<b>Lat:</b> {latitude}<br>',
				'<b>Long</b> {longitude}'
			);

			var popup = popupTemplate.apply( metaData );

			marker.bindPopup( popup );

			//popup
			marker.on( 'mouseover', function(e) {
				this.openPopup();			
			});
			marker.on( 'mouseout', function(e) {
				if( map.lastSelectedMarker != null )
					if( e.target.stationCode != map.lastSelectedMarker.stationCode )	
						this.closePopup();
			});

			//selection
			marker.on( 'click' , function(e) {
				var stationSelectionHandler = Perrin.app.getController( 'StationSelectionHandler' );
				stationSelectionHandler.onStationMapSelect( e );
			});
			
			marker.addTo( map );

			map.markers[metaData.code] = marker;

		}
		stationMap.map.setView( [-30, -70], 5 ); 
		
	},
	disableWidgets: function()
	{
		//variable selector 
		var variableSelector = Ext.ComponentQuery.query( '#variableSelector')[0];
		variableSelector.disable();

		//station summary 
		var stationSummary = Ext.ComponentQuery.query( '#stationSummary' )[0];
		stationSummary.disable();

		//variable summary panel
		var variableSummary = Ext.ComponentQuery.query( '#variableSummary' )[0];
		variableSummary.disable();

		//time filter
		var timeFilter = Ext.ComponentQuery.query( '#timeFilter' )[0];
		timeFilter.disable();

		//resampling filter
		var resamplingFilter = Ext.ComponentQuery.query( '#resamplingFilter' )[0];
		resamplingFilter.disable();

		//time series panel
		var timeSeriesPanel = Ext.ComponentQuery.query( '#timeSeriesPanel' )[0];
		timeSeriesPanel.disable();

		//statistics panel
		var statisticsPanel = Ext.ComponentQuery.query( '#statisticsPanel' )[0];
		statisticsPanel.disable();
	},
	initRequestParameters: function(){

		var months = [];
		for(var i=1;i<=12;i++)
			months.push( i );

		var hours  = [];
		for(var i=0;i<24;i++)
			hours.push( i );
			
		Perrin.app.requestParameters = {
						 station: null,
						 variable: null,
						 time: {
						 	 allYears: [],
						 	 years : null,
							 selectedYears: [],
						 	 months : months,
							 hours : hours
						 },
						 resampling: {
						 		interval: { 
										type: 'adaptive',
									 	seriesLength: 1024
								},
								statistic: {
										name : 'mean'
								},
								minimumFraction : null
						},
						transformation: null,
						standardSummary: null
		};

	},
	initStates: function(){
		var states = {
			STATION_SELECTION : 0,
			VARIABLE_SELECTION : 1,
			VARIABLE_VIEW_UPDATE: 2
		};
		Perrin.app['states'] = states;
		Perrin.app.currentState = states.STATION_SELECTION;
	},
	requestMetaData: function(){
		
		zorronRequester = Perrin.app.getController('ZorronRequester');
		request = { 
				"type": "metaData",
				"name" : "allMetaData",
				"outputFormat" : { "type" : "json" }
		};
		var async = false;
		zorronRequester.execute( 
					request,
					function( response, textStatus, jqXHR ){
						response = JSON.parse( response );

						var metaData = response.result;
						Perrin.app.metaData = metaData;
						/*
						for( var tableCode in metaData['tables'] )
						{
							var table = metaData['tables'][tableCode];
							for( var i in table.variables.length )
							{
								var variable = table.variables[i];

								//add variable type name
								variable.type_name = metaData.variable[ variable.type ].name;

								//add variable statistic name
								variable.statistic_name = metaData.variable[ variable.statistic ];
							}
						}
						*/
					},
					async 
		);

	},
	onLaunch : function(){

		this.initRequestParameters();
		this.initStates();
		this.requestMetaData();
		var metaData = Perrin.app.metaData;
		this.showStationRows( metaData );
		this.showStationsOnMap( metaData );
		this.disableWidgets();
	}
}); 
