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

Ext.define( 'Perrin.controller.VariableViewUpdater' , {
	extend: 'Ext.app.Controller',
	firstUpdater: null,
	observers: [],
	attach: function(observer){
		this.observers.push( observer );		
	},
	execute: function(){

		var variableSummaryController = Perrin.app.getController( 'VariableSummaryController' );
		variableSummaryController.update();		

		var requestMaker = Perrin.app.getController( 'RequestMaker' );
		Perrin.app.basicRequest = requestMaker.makeBasicRequest();

		for(var index in this.observers)
		{
			var observer = this.observers[index];
			observer.update();
		}
	}
});
