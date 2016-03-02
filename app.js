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

Ext.Loader.setConfig({
	enabled: true,
	paths: {
		  Perrin : 'app',
		  Chart : 'lib/Chart',
		  'Ext.ux' : 'extjs/ux'

		 }
});

Ext.application({

	name: 'Perrin',
	autoCreateViewport: true,
	controllers:[
			'Initializer',
			'VariableViewUpdater',
			'StationSelectionHandler',
			'VariableSelectionHandler',
			'TimeFilterHandler',
			'ResamplingFilterHandler',
			'TimeSeriesController',
			'HistogramController',
			'DailyCycleController',
			'AnnualCycleController',
			'VariableSummaryController',
			'TimeController',
			'ZorronRequester',
			'RequestMaker'
	],
	views: [ 
		'Viewport' 
	],
	models: [
		 	'Station',
			'Variable',
			'ArrayData',
			'VariableFeature',
			'StationFeature'
	],
	stores: [
			'Stations',
			'Variables',
			'TimeSeriesData',
			'HistogramData',
			'AnnualCycleData',
			'DailyCycleData',
			'StationInfo',
			'VariableInfo'
	],
	metaData: null,
	requestParameters: null,
	basicRequest: null,
	currentState: null
});
