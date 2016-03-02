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

Ext.define( 'Perrin.view.SelectorPanel',{
	extend: 'Ext.panel.Panel',
	xtype : 'selectorPanel',
	title: 'Selector Panel',
	width: 200,
	requires: [
			'Perrin.view.StationSelector',
			'Perrin.view.VariableSelector'
	],
	layout: {
			type : 'vbox',
			align: 'stretch'
	},
	items: [
		{
			xtype: 'fieldset',
			itemId: 'stationSelectorPanel',
			title: 'Select Station',
			flex: 1,
			layout : 'fit',
			items: [
				{
					xtype: 'stationSelector',
					itemId: 'stationSelector',
				}
			]
		},
		{
			xtype: 'fieldset',
			itemId: 'variableSelectorPanel',
			title: 'Select Variable',
			flex: 1,
			layout: 'fit',
			items: [
				{
					xtype: 'variableSelector',
					itemId: 'variableSelector',
				}
			]
		}
	]
});
