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

Ext.define('Perrin.view.StationMap',{
	extend: 'Ext.panel.Panel',
	requires: [ 'Ext.ux.LeafletMap' ],
	xtype: 'stationMap',
	layout: { 
		type : 'fit'
	},
	markers: {},
	lastMarker: null,
	items: [
		{
			xtype : 'leafletmap',
			itemId: 'stationMap',
			tileLayerUrl: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
		}
	]
});
