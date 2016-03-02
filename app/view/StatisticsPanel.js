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

Ext.define('Perrin.view.StatisticsPanel',{
	extend: 'Ext.tab.Panel',
	xtype: 'statisticsPanel',
	requires: [
			'Perrin.view.HistogramChart',
			'Perrin.view.DailyCycleChart',
			'Perrin.view.AnnualCycleChart'
	],
	layout : 'fit',
	clear: function(){
		
		var histogramPanel = Ext.ComponentQuery.query( '#histogramPanel' )[0];
		histogramPanel.clear();

		var dailyCyclePanel = Ext.ComponentQuery.query( '#dailyCyclePanel' )[0];
		dailyCyclePanel.clear();

		var annualCyclePanel = Ext.ComponentQuery.query( '#annualCyclePanel' )[0];
		annualCyclePanel.clear();
	},
	items: [
		{
			title: 'Histogram',
			xtype : 'histogramChart',
			itemId: 'histogramPanel'

		},
		{
			title: 'Daily Cycle',
			xtype: 'dailyCycleChart',
			itemId: 'dailyCyclePanel'
		},
		{
			title: 'Annual Cycle',
			xtype: 'annualCycleChart',
			itemId: 'annualCyclePanel'
		}
	]
});
