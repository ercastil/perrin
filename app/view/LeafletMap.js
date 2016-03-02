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

Ext.define('Perrin.view.LeafletMap',{

	extend: 'Ext.Component',
	xtype : 'leafletMap',
	config: {
			map: null,
			selectedMarker: -1,
			markers: []
	},
	afterRender: function(t,eOpts){
		this.callParent(arguments);
		var map = L.map(this.getId());
		map.setView( [-33.45,-70.66],4 );
		L.tileLayer.provider( 'MapQuestOpen.Aerial' ).addTo( map );
		this.setMap( map );
	},
	selectMarker: function( idStation ){
			
	},
	addMarkers: function( stationInfo ){
		
		for( var index in stationInfo )
		{
			var info = stationInfo[index];

			//marker
			var marker = L.marker( info.loc );	
			marker.addTo( this.map );	
			this.markers.push( marker );
			
			/*
			//popup
			var popup = L.popup()
				.setLatLng( info.loc )
				.setContent( info.name )
				.openOn( this.map );
			*/
		}
	}

});
