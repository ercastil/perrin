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

Ext.define('Perrin.view.MonthSelector',{
	extend: 'Ext.panel.Panel',
	xtype: 'monthSelector',
	layout: {
		 type: 'hbox',
		 align: 'stretch'
	},
	initComponent: function(){
		this.items = [
				{
					xtype: 'label',
					text: 'Month:',
					width: 50
				}
		];
		var months = 12;
		var timeFilterHandler = Perrin.app.getController( 'TimeFilterHandler' );
		for(var i=1;i<=months;i++)
		{
			var button = { 
					xtype: 'button',
					text: i.toString(),
					width: 50,
					enableToggle: true,
					data: i,
					handler: timeFilterHandler.onMonthSelect
			};
			this.items.push( button );
		}
		this.callParent();
	}
});
