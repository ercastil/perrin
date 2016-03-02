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

Ext.define( 'Perrin.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires : [
		'Perrin.view.BannerPanel',
		'Perrin.view.SelectorPanel',
		'Perrin.view.InfoPanel',
		'Perrin.view.VisualizationPanel',
		'Perrin.view.ControlPanel'
	],
	layout: {
			type: 'border',
			align: 'stretch',
			padding: 0
	},
	items: [
		{
			xtype: 'bannerPanel',
			region: 'north',
			split: true,
			collapsible: false,
			margins: '0 0 0 0'
		},
		{
			xtype: 'selectorPanel',
			region: 'west',
			split: true,
			collapsible: true,
			flex: 2
		},
		{
			xtype: 'infoPanel',
			region: 'east',
			split: true,
			collapsible: true,
			flex: 1.2

		},
		{
			xtype: 'visualizationPanel',
			region: 'center',
			split: true,
			flex: 4
		}
		/*
		{
			xtype: 'controlPanel',
			region: 'south',
			split: true,
			collapsible: true
		}
		*/
	]
});
