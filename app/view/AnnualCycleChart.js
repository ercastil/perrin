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

Ext.define('Perrin.view.AnnualCycleChart',{
	extend: 'Ext.panel.Panel',
	xtype: 'annualCycleChart',
	requires: [
			'Chart.ux.Highcharts',
			'Chart.ux.Highcharts.LineSerie',
			'Perrin.model.ArrayData'
	],
	layout : {
			type : 'vbox',
			align: 'stretch'
	},
	clear: function(){
		var chart = Ext.ComponentQuery.query( '#annualCycleChart' )[0];
		var store = Ext.create( 'Ext.data.Store', {
				model: 'Perrin.model.ArrayData',
				data: []
		});
		chart.store = store;
		
		//yaxis
		var yAxis = chart.chart.yAxis[0];
		yAxis.setTitle( { text: '' } );

		chart.update();
	},
	items: [
		{
			xtype: 'toolbar',
			height : 25,
			padding: 1,
			region: 'east',
			layout: {
				type : 'hbox',
				align : 'stretch'
			},
			items: [
				{
					xtype: 'tbspacer',
					flex: 1
				},
				{ 
					xtype: 'button',
					itemId: 'exportAnnualCycleButton',
					text: 'XLS',
					width: 40
				}
			]
				

		},
		{
			xtype : 'highchart',
			flex: 1,
			itemId: 'annualCycleChart',
			initAnimAfterLoad: false,
			store: 'AnnualCycleData',
			chartConfig:{
				chart: { 
					showAxes: true

				},
				title: {
					text: ''
				},
				legend: {
					enabled: false
				},
				xAxis: {
					categories: [ 
							'XXX',
							'Ene',
							'Feb',
							'Mar',
							'Abr',
							'May',
							'Jun',
							'Jul',
							'Ago',
							'Sep',
							'Oct',
							'Nov',
							'Dic'
					],
					labels:  {
							rotation : 45 
					}
				},
				tooltip:{
					valueDecimals: 2
				}
			},
			series: [
				{
					name: 'annualCycle',
					type: 'line',
					xField: 'x',
					yField: 'y'
				}
			]
		}
	]
});
