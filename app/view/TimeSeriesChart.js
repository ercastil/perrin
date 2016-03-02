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

Ext.define('Perrin.view.TimeSeriesChart',{
	extend: 'Ext.panel.Panel',
	xtype: 'timeSeriesChart',
	requires: [
			'Chart.ux.HighStock',
			'Chart.ux.HighStockSerie',
			'Perrin.model.ArrayData'
	],
	layout : {
		   type : 'vbox',
		   align: 'stretch'
	},
	clear: function(){

		//main area
		var chart = Ext.ComponentQuery.query( '#timeSeriesChart' )[0];	
		var store = Ext.create( 'Ext.data.Store', {
			model : 'Perrin.model.ArrayData',
			data : []
		});
		chart.stores[0] = store;

		//navigator
		chart.chartConfig.navigator.series.data = [];

		chart.refresh();
	},
	fireChartAreaSelection: function(e){
		console.log( e );		
	},
	echo: function(){
		console.log( 'echo' );
	},
	items: [
		{
			xtype: 'toolbar',
			padding: 1,
			height : 25,
			layout : {
				   type : 'hbox',
				   align: 'stretch'
			},
			items: [
				{
					xtype: 'tbspacer',
					flex: 1
				},

				{ 
					xtype: 'button',
					itemId: 'exportTimeSeriesButton',
					text: 'XLS',
					width: 40
				}
			]
				

		},
		{
			xtype : 'highstock',
			itemId: 'timeSeriesChart',
			store: 'TimeSeriesData',
			flex: 10,
			chartConfig:{
				chart: { 
					zoomType : 'x',
				},
				title: {
					text: 'Time Series'
				},
				rangeSelector: {
					enabled: false
				},
				navigator: {
					adpatToUpdatedData: false,
					series: {
						data: []
					}
				},
				scrollbar: {
					liveRedraw: false
				},
				xAxis: {
					events:{
						afterSetExtremes : function(e){
							var timeSeriesController = Perrin.app.getController( 'TimeSeriesController' );		
							timeSeriesController.onAfterSetExtremes( e );

						}
					}
				},
				tooltip: {
					valueDecimals: 3
				}
			},
			
			series: [
					{
						plot: 'line',
						xField: 'x',
						yField: 'y'
					 }
					
			]
		}
	]
});
