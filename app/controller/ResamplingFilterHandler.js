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

Ext.define( 'Perrin.controller.ResamplingFilterHandler', {
	extend: 'Ext.app.Controller',
	requires: [
			'Perrin.controller.VariableViewUpdater'
	],
	init: function(){
		this.control({
			'#adaptiveInterval' : {
				click : this.onIntervalSelect
			},
			'#hourlyInterval' : {
				click : this.onIntervalSelect
			},
			'#dailyInterval' : {
				click : this.onIntervalSelect
			},
			'#weeklyInterval' : {
				click : this.onIntervalSelect
			},
			'#monthlyInterval' : {
				click : this.onIntervalSelect
			},
			'#yearlyInterval' : {
				click : this.onIntervalSelect
			},
			'#dataFractionSlider' : {
				changecomplete : this.onDataFractionSliderChangeComplete,
				change: this.onDataFractionSliderChange,
			},
			'#resamplingStatistic' : {
				change: this.onStatisticChange
			},
			'#dataFractionField' : {
				keyup: this.onDataFractionFieldChange
			}
		});
	},
	updateDataFraction: function( newValue ){

		//change request parameters
		var resampling = Perrin.app.requestParameters.resampling; 
		resampling.minimumFraction = newValue/100;

		//update variable views
		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();

	},
	onDataFractionSliderChangeComplete: function(slider,newValue){

		this.updateDataFraction( newValue );
	},
	onDataFractionSliderChange: function(slider,newValue){

		var dataFractionField = Ext.ComponentQuery.query( '#dataFractionField' )[0];
		dataFractionField.setValue( newValue );
	},
	onDataFractionFieldChange: function(field, e){

		var rawValue = field.getRawValue();
		var newValue = field.getValue();
		console.log( rawValue );
		console.log( newValue );

		//change data fraction slider	
		var dataFractionSlider = Ext.ComponentQuery.query( '#dataFractionSlider' )[0];
		dataFractionSlider.setValue( newValue );

		//update data fraction
		this.updateDataFraction( newValue );
	},
	onIntervalSelect: function(button,e){
		
		console.log( button.data );
		
		var requestParameters = Perrin.app.requestParameters;
		var resamplingInterval = button.data;

		if( resamplingInterval == 'adaptive' )
		{
			requestParameters.resampling.interval = {  
								  type : 'adpative',
								  seriesLength : 800  
			};
		}
		else
		{
			requestParameters.resampling.interval = { 
								    type: 'fixed',
								    code : resamplingInterval,
								    units: 1
			};
			console.log( requestParameters.resampling.interval );
		}
	
		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();
	},

	onStatisticChange: function(radiogroup,newValue,oldValue){

		var statisticName = newValue;	
		var resampling = Perrin.app.requestParameters.resampling;
		resampling.statistic.name = newValue['statistic'];

		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.execute();
	},
			
});
