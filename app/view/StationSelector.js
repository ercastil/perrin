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

Ext.define( 'Perrin.view.StationSelector',{
	extend: 'Ext.grid.Panel',
	xtype : 'stationSelector',
	multiSelect: false,
	store: 'Stations',
	forceFit: true,
	columns : [
			{
				header: 'Icon',
				dataIndex: 'group',
				width: 15,
				renderer: function( value, metaData, record, rowIndex, colIndex, store ){
					
					var imageFile = 'interrogation.png';
					var stationGroup = record.raw.group;

					if( stationGroup == 'eolo' )

						imageFile = 'eolo.jpg';

					else if( stationGroup == 'solar' )

						imageFile = 'solar.png';

					return "<img width=25px height=25px src=\"img/icons/" + imageFile + "\"/>";
					
				}
			},
			{
				text: 'Name',
				sortable: true,
				dataIndex: 'name',
				width: 45
			},
			{
				text: 'Latitude',
				sortable: true,
				dataIndex: 'latitude',
				width: 20
			},
			{
				text: 'Longitude',
				sortable: true,
				dataIndex: 'longitude',
				width: 20
			}
		]
});
