/**
 * (c) 2010-2017 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import H from '../parts/Globals.js';
import '../parts/Utilities.js';
import '../parts/Options.js';
import '../parts/Point.js';
import '../parts-more/BubbleSeries.js';
var merge = H.merge,
	Point = H.Point,
	seriesType = H.seriesType,
	seriesTypes = H.seriesTypes;

// The mapbubble series type
if (seriesTypes.bubble) {

	/**
	 * A map bubble series is a bubble series laid out on top of a map series,
	 * where each bubble is tied to a specific map area.
	 *
	 * @sample maps/demo/map-bubble/ Map bubble chart
	 * 
	 * @extends {plotOptions.bubble}
	 * @product highmaps
	 * @optionparent plotOptions.mapbubble
	 */
	seriesType('mapbubble', 'bubble', {

		animationLimit: 500,

		tooltip: {
			pointFormat: '{point.name}: {point.z}'
		}

		/**
		 * The main color of the series. This color affects both the fill and
		 * the stroke of the bubble. For enhanced control, use `marker` options.
		 * 
		 * @type {Color}
		 * @sample {highmaps} maps/plotoptions/mapbubble-color/ Pink bubbles
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.color
		 */

		/**
		 * Whether to display negative sized bubbles. The threshold is given
		 * by the [zThreshold](#plotOptions.mapbubble.zThreshold) option, and negative
		 * bubbles can be visualized by setting [negativeColor](#plotOptions.
		 * bubble.negativeColor).
		 * 
		 * @type {Boolean}
		 * @default true
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.displayNegative
		 */

		/**
		 * Maximum bubble size. Bubbles will automatically size between the
		 * `minSize` and `maxSize` to reflect the `z` value of each bubble.
		 * Can be either pixels (when no unit is given), or a percentage of
		 * the smallest one of the plot width and height.
		 * 
		 * @type {String}
		 * @sample {highmaps} maps/demo/map-bubble/ Bubble size
		 * @default 20%
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.maxSize
		 */

		/**
		 * Minimum bubble size. Bubbles will automatically size between the
		 * `minSize` and `maxSize` to reflect the `z` value of each bubble.
		 * Can be either pixels (when no unit is given), or a percentage of
		 * the smallest one of the plot width and height.
		 * 
		 * @type {String}
		 * @sample {highmaps} maps/demo/map-bubble/ Bubble size
		 * @default 8
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.minSize
		 */

		/**
		 * When a point's Z value is below the [zThreshold](#plotOptions.mapbubble.
		 * zThreshold) setting, this color is used.
		 * 
		 * @type {Color}
		 * @sample {highmaps} maps/plotoptions/mapbubble-negativecolor/
		 *         Negative color below a threshold
		 * @default null
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.negativeColor
		 */

		/**
		 * Whether the bubble's value should be represented by the area or the
		 * width of the bubble. The default, `area`, corresponds best to the
		 * human perception of the size of each bubble.
		 * 
		 * @validvalue ["area", "width"]
		 * @type {String}
		 * @default area
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.sizeBy
		 */

		/**
		 * When this is true, the absolute value of z determines the size of
		 * the bubble. This means that with the default `zThreshold` of 0, a
		 * bubble of value -1 will have the same size as a bubble of value 1,
		 * while a bubble of value 0 will have a smaller size according to
		 * `minSize`.
		 * 
		 * @type {Boolean}
		 * @sample {highmaps} highcharts/plotoptions/bubble-sizebyabsolutevalue/
		 *         Size by absolute value, various thresholds
		 * @default false
		 * @since 1.1.9
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.sizeByAbsoluteValue
		 */

		/**
		 * The minimum for the Z value range. Defaults to the highest Z value
		 * in the data.
		 * 
		 * @type {Number}
		 * @see [zMax](#plotOptions.mapbubble.zMin)
		 * @sample {highmaps} highcharts/plotoptions/bubble-zmin-zmax/
		 *         Z has a possible range of 0-100
		 * @default null
		 * @since 1.0.3
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.zMax
		 */

		/**
		 * The minimum for the Z value range. Defaults to the lowest Z value
		 * in the data.
		 * 
		 * @type {Number}
		 * @see [zMax](#plotOptions.mapbubble.zMax)
		 * @sample {highmaps} highcharts/plotoptions/bubble-zmin-zmax/
		 *         Z has a possible range of 0-100
		 * @default null
		 * @since 1.0.3
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.zMin
		 */

		/**
		 * When [displayNegative](#plotOptions.mapbubble.displayNegative) is `false`,
		 * bubbles with lower Z values are skipped. When `displayNegative`
		 * is `true` and a [negativeColor](#plotOptions.mapbubble.negativeColor)
		 * is given, points with lower Z is colored.
		 * 
		 * @type {Number}
		 * @sample {highmaps} maps/plotoptions/mapbubble-negativecolor/
		 *         Negative color below a threshold
		 * @default 0
		 * @product highmaps
		 * @apioption plotOptions.mapbubble.zThreshold
		 */

	// Prototype members
	}, {
		xyFromShape: true,
		type: 'mapbubble',
		pointArrayMap: ['z'], // If one single value is passed, it is interpreted as z
		/**
		 * Return the map area identified by the dataJoinBy option
		 */
		getMapData: seriesTypes.map.prototype.getMapData,
		getBox: seriesTypes.map.prototype.getBox,
		setData: seriesTypes.map.prototype.setData

	// Point class
	}, {
		applyOptions: function (options, x) {
			var point;
			if (options && options.lat !== undefined && options.lon !== undefined) {
				point = Point.prototype.applyOptions.call(
					this,
					merge(options, this.series.chart.fromLatLonToPoint(options)),
					x
				);
			} else {
				point = seriesTypes.map.prototype.pointClass.prototype.applyOptions.call(this, options, x);
			}
			return point;
		},
		isValid: function () {
			return typeof this.z === 'number';
		},
		ttBelow: false
	});
}


/**
 * A `mapbubble` series. If the [type](#series.mapbubble.type) option
 * is not specified, it is inherited from [chart.type](#chart.type).
 * 
 * 
 * For options that apply to multiple series, it is recommended to add
 * them to the [plotOptions.series](#plotOptions.series) options structure.
 * To apply to all series of this specific type, apply it to [plotOptions.
 * mapbubble](#plotOptions.mapbubble).
 * 
 * @type {Object}
 * @extends series,plotOptions.mapbubble
 * @excluding dataParser,dataURL
 * @product highmaps
 * @apioption series.mapbubble
 */

/**
 * An array of data points for the series. For the `mapbubble` series
 * type, points can be given in the following ways:
 * 
 * 1.  An array of numerical values. In this case, the numerical values
 * will be interpreted as `z` options. Example:
 * 
 *  ```js
 *  data: [0, 5, 3, 5]
 *  ```
 * 
 * 2.  An array of objects with named values. The objects are point
 * configuration objects as seen below. If the total number of data
 * points exceeds the series' [turboThreshold](#series.mapbubble.turboThreshold),
 * this option is not available.
 * 
 *  ```js
 *     data: [{
 *         z: 9,
 *         name: "Point2",
 *         color: "#00FF00"
 *     }, {
 *         z: 10,
 *         name: "Point1",
 *         color: "#FF00FF"
 *     }]
 *  ```
 * 
 * @type {Array<Object|Number>}
 * @extends series.mappoint.data
 * @excluding labelrank,middleX,middleY,path,value,x,y,lat,lon
 * @product highmaps
 * @apioption series.mapbubble.data
 */

/**
 * While the `x` and `y` values of the bubble are determined by the
 * underlying map, the `z` indicates the actual value that gives the
 * size of the bubble.
 * 
 * @type {Number}
 * @sample {highmaps} maps/demo/map-bubble/ Bubble
 * @product highmaps
 * @apioption series.mapbubble.data.z
 */
