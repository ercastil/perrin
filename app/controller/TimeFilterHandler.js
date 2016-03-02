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

Ext.define( 'Perrin.controller.TimeFilterHandler', {
	extend: 'Ext.app.Controller',
	requires: [
			'Perrin.controller.VariableViewUpdater'
	],
	init: function(){
		this.control({
			'#startDate' : {
				select : this.onStartDateSelect,
				writebleChange: this.onStartDateSelect
			},
			'#startTime' : {
				select: this.onStartTimeSelect,
				writebleChange: this.onStartTimeSelect

			},
			'#endDate' : {
				select : this.onEndDateSelect,
				writebleChange: this.onEndDateSelect
			},
			'#endTime' : {
				select : this.onEndTimeSelect,
				writebleChange: this.onEndTimeSelect
			}
		});	
	},
	onStartDateSelect: function(field,value){
		
		var startDate = Ext.Date.format( value, 'Y-m-d');
		var requestParameters = Perrin.app.requestParameters;
		requestParameters.time.startDate = startDate;

		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();
	},
	onStartTimeSelect: function(field,value){
	
		var startTime = Ext.Date.format( value, 'H:i' );
		var requestParameters = Perrin.app.requestParameters;
		requestParameters.time.startTime = startTime;
		
		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();

	},
	onEndDateSelect: function(field,value){

		var endDate = Ext.Date.format( value, 'Y-m-d');
		var requestParameters = Perrin.app.requestParameters;
		requestParameters.time.endDate = endDate;

		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();
	},
	onEndTimeSelect: function(field,value){
		
		var endTime = Ext.Date.format( value, 'H:i' );
		var requestParameters = Perrin.app.requestParameters;
		requestParameters.time.endTime = endTime;
		
		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();
	},
	onYearSelect: function(button){
		var year = button.data;
		var yearArray = Perrin.app.requestParameters.time.selectedYears;
		if( button.pressed )
		{
			//add year
			yearArray.push( year );

		}
		else
		{
			//remove year
			var index = yearArray.indexOf( year );
			yearArray.splice( index, 1 );

		}
		Perrin.app.getController( 'VariableViewUpdater' ).execute();

	},
	onMonthSelect: function(button,e){
		
		var month = button.data;
		var monthArray = Perrin.app.requestParameters.time.months;
		if( button.pressed )
		{
			//remove month
			var index = monthArray.indexOf( month );
			monthArray.splice( index, 1 );
		}
		else
		{
			//add month
			monthArray.push( month );
		}
		Perrin.app.getController( 'VariableViewUpdater' ).execute();
	},
	onHourSelect: function(button,e){

		var hour = button.data;
		var hourArray = Perrin.app.requestParameters.time.hours;
		if( button.pressed )
		{

			//remove hour
			var index = hourArray.indexOf( hour );
			hourArray.splice( index, 1 );
		}
		else
		{
			hourArray.push( hour );
		}
		Perrin.app.getController( 'VariableViewUpdater' ).execute();
	}
});
