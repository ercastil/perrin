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

Ext.define('Perrin.view.ResamplingFilter', {
	extend: 'Ext.form.FieldSet',
	title : 'Resampling Filter',
	xtype: 'resamplingFilter',
	layout: {
		  type: 'vbox',
		  align: 'stretch'
	},
	items: [
		{
			xtype: 'panel',
			flex:1,
			layout: { 
				  type: 'hbox',
				  align: 'stretch'
			},
			items: [
				{
					xtype: 'button',
					text: 'Adaptive',
					data: 'adaptive',
					itemId: 'adaptiveInterval',
					enableToggle: true,
					pressed: true,
					toggleGroup: 'resamplingInterval'
				},
				{
					xtype: 'button',
					text: 'Daily',
					data: 'D',
					itemId: 'dailyInterval',
					enableToggle: true,
					toggleGroup: 'resamplingInterval'
				},
				{
					xtype: 'button',
					text: 'Weekly',
					data: 'W',
					itemId: 'weeklyInterval',
					enableToggle: true,
					toggleGroup: 'resamplingInterval'
				},
				{
					xtype: 'button',
					text: 'Monthly',
					data: 'MS',
					itemId: 'monthlyInterval',
					enableToggle: true,
					toggleGroup: 'resamplingInterval'

				},
				{
					xtype: 'button',
					text: 'Yearly',
					data: 'A',
					itemId : 'yearlyInterval',
					enableToggle: true,
					toggleGroup: 'resamplingInterval'
				}
			]
		},
		{
			xtype: 'radiogroup',
			fieldLabel: 'Statistic',
			itemId: 'resamplingStatistic',
			cls: 'x-check-group-alt',
			flex:1,
			items: [
				{
					boxLabel: 'mean',
					name: 'statistic',
					inputValue: 'mean',
					checked: true
				},
				{
					boxLabel: 'max',
					name: 'statistic',
					inputValue: 'max'
				},
				{
					boxLabel: 'min',
					name: 'statistic',
					inputValue: 'min'
				},
				{
					boxLabel: 'stdev',
					name: 'statistic',
					inputValue: 'std'
				},
				{
					boxLabel: 'fraction',
					name: 'statistic',
					inputValue: 'fraction'
				}
			]
			
		},
		{
			xtype : 'panel',
			layout: {
				 type : 'hbox',
				 align: 'stretch'
			},
			flex: 1,
			items: [
				{
					xtype: 'sliderfield',
					itemId: 'dataFractionSlider',
					fieldLabel: 'Data Fraction',
					flex: 4,
					minValue: 0,
					maxValue: 100,
					value: 95,
					increment: 1,
					tipText: function( thumb ){
						return String(thumb.value) + '%';
					},
					useTips: true
				},
				{
					xtype: 'numberfield',
					itemId: 'dataFractionField',
					spinDownEnabled: false,
					spinUpEnabled: false,
					enableKeyEvents: true,
					value: 95,
					flex: 1,
					minValue: 0,
					maxValue: 100
				}
			]
		}
	]
});
