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

Ext.define('Perrin.view.TimeFilter', {
	extend: 'Ext.form.FieldSet',
	title: 'Time Filter',
	xtype: 'timeFilter',
	requires: [
			'Perrin.view.YearSelector',
			'Perrin.view.MonthSelector',
			'Perrin.view.HourSelector'
	],
	frame: false,
	layout: { 
		 type: 'vbox',
		 align: 'stretch'
	},
	clear: function(){
		
		var time = Perrin.app.requestParameters.time;
		var timeFilter = Ext.ComponentQuery.query( '#timeFilter' )[0];
		var panels = timeFilter.query( 'panel' );

		//start 
		delete time['startDate'];
		delete time['startTime'];

		var startDateField = panels[0].queryById( 'startDate' );
		startDateField.setValue( '' );
		var startTimeField = panels[0].queryById( 'startTime' );
		startTimeField.setValue ( '' );

		//end
		delete time['endDate'];
		delete time['endTime'];

		var endDateField = panels[1].queryById( 'endDate' );
		endDateField.setValue( '' );
		var endTimeField = panels[1].queryById( 'endTime' );
		endTimeField.setValue( '' );
	},
	items: [

		{
			xtype: 'panel',
			frame: false,
			flex: 1,
			layout: {
				 type: 'hbox',
				 align: 'stretch'
			},
			items: [
				{
					xtype: 'label',
					text: 'Start:',
					flex:1
				},
				{
					xtype: 'datefield',
					itemId: 'startDate',
					format: 'Y-m-d',
					flex: 1
				},
				{
					xtype: 'timefield',
					itemId: 'startTime',
					format: 'H:i',
					increment: 10,
					flex: 1
				}
			]
		},
		{
			xtype: 'panel',
			frame: false,
			flex: 1,
			layout: {
				 type: 'hbox',
				 align: 'stretch'
			},
			items: [
				{
					xtype: 'label',
					text: 'End:',
					flex:1
				},
				{
					xtype: 'datefield',
					itemId: 'endDate',
					format: 'Y-m-d',
					flex: 1
				},
				{
					xtype: 'timefield',
					itemId: 'endTime',
					format: 'H:i',
					increment: 10,
					flex: 1
				}
			]
		}
	]
});
