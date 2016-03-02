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

Ext.define( 'Perrin.controller.TimeController', {
	extend: 'Ext.app.Controller',
	requires: [ 
			'Perrin.controller.VariableViewUpdater' 
	],
	init: function(application){
		var updater = Perrin.app.getController( 'VariableViewUpdater' );
		updater.attach( this );
	},
	update: function(){

		var timeFilter = Ext.ComponentQuery.query( '#timeFilter' )[0];
		var panels = timeFilter.query( 'panel' );
		var requestParameters = Perrin.app.requestParameters;

		//start datetime
		if( 'startDate' in requestParameters.time )
		{
			//start date
			var startDateField = panels[0].queryById( 'startDate' );
			var startDate = requestParameters.time.startDate;
			startDateField.setValue( startDate );

			//start time
			var startTimeField = panels[0].queryById( 'startTime' );
			var startTime = requestParameters.time.startTime;
			startTime = startTime.substring(0,5);
			startTimeField.setValue( startTime );
			
		}

		//end datetime
		if( 'endDate' in requestParameters.time )
		{
			//end date
			var endDateField = panels[1].queryById( 'endDate' );
			var endDate = requestParameters.time.endDate;
			endDateField.setValue( endDate );

			//end time
			var endTimeField = panels[1].queryById( 'endTime' );
			var endTime = requestParameters.time.endTime;
			endTime = endTime.substring(0,5);
			endTimeField.setValue( endTime );
		}

		/*
		//years
		if( requestParameters.time.allYears != null )
		{
			var yearSelector = Ext.ComponentQuery.query( '#yearSelector' )[0];		
			yearSelector.removeAll();
			var label = Ext.create( 'Ext.form.Label',{
						text: 'Year:',
						width: 50
			});
			yearSelector.add( label );

			var timeFilterHandler = Perrin.app.getController( 'TimeFilterHandler' );

			for(var index in requestParameters.time.allYears )
			{
				var year = requestParameters.time.allYears[index];
				var selected = false;
				if( requestParameters.time.selectedYears != null )
					selected = requestParameters.time.selectedYears.indexOf( year ) >= 0 ? true: false;
				var button = Ext.create( 'Ext.Button', {
								text : year.toString(),
								data: year,
								width: 50,
								enableToggle: true,
								pressed: selected,
								handler: timeFilterHandler.onYearSelect
				});
				yearSelector.add( button );	
			}
			yearSelector.update();	
		}
		*/
	}
});
