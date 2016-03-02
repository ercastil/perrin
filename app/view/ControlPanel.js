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

Ext.define( 'Perrin.view.ControlPanel',{
	extend: 'Ext.panel.Panel',
	xtype : 'controlPanel',
	title: 'Control Panel',
	requires: [
			'Perrin.view.TimeFilter',
			'Perrin.view.TransformationFilter',
			'Perrin.view.ResamplingFilter'
	],
	height: 150,
	layout: {
		  type: 'hbox',
		  align: 'stretch'
	},
	items: [
		{
			xtype: 'timeFilter',
			itemId: 'timeFilter',
			flex : 1
		},
		{
			xtype: 'resamplingFilter',
			itemId: 'resamplingFilter',
			flex: 1
		}
	]
});
