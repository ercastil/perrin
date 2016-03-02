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

Ext.define( 'Perrin.view.VariableSelector',{
	extend: 'Ext.grid.Panel',
	xtype : 'variableSelector',
	multiSelect: false,
	store: 'Variables',
	forceFit: true,
	columns : [
			{
				header: 'Icon',
				dataIndex: 'type',
				width: 15,
				renderer: function( value, metaData, record, rowIndex, colIndex, store ) {

					var globalMetaData = Perrin.app.metaData;
					var imageFile = 'img/icons/interrogation.png';
					var variableType = record.raw.type;

					if( config.icons[variableType] != null )
						imageFile = config.icons[variableType];

					return "<img width=25px height=25px src=\"" + imageFile + "\"/>";
				}
			},
			{
				text: 'Type',
				sortable: true,
				dataIndex: 'type_name',
				width: 40
			},
			{
				text: 'Statistic',
				sortable: true,
				dataIndex: 'statistic_name',
				width: 30
			},
			{
				text: 'Altitude',
				sortable: true,
				dataIndex: 'altitude',
				width: 15
			}
	]
});
