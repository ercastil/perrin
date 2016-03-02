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

Ext.define('Perrin.view.HourSelector',{
	extend: 'Ext.panel.Panel',
	xtype: 'hourSelector',
	layout: {
		 type: 'hbox',
		 align: 'stretch'
	},
	initComponent: function(){
		this.items = [
				{
					xtype: 'label',
					text: 'Hour: ',
					width: 50
				}
		];
		var timeFilterHandler = Perrin.app.getController( 'TimeFilterHandler' );
		var hours = 23;
		for(var i=0;i<=hours;i++)
		{
			var button = { 
					xtype: 'button',
					text: i.toString(),
					flex:1,
					width: 20,
					enableToggle: true,
					data: i,
					handler: timeFilterHandler.onHourSelect
			};
			this.items.push( button );
		}
		this.callParent();
	}
});
