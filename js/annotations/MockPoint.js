/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
import H from '../parts/Globals.js';
/**
 * @interface Highcharts.AnnotationMockLabelOptionsObject
 */ /**
* Point instance of the point.
* @name Highcharts.AnnotationMockLabelOptionsObject#point
* @type {Highcharts.AnnotationMockPoint}
*/ /**
* X value translated to x axis scale.
* @name Highcharts.AnnotationMockLabelOptionsObject#x
* @type {number|null}
*/ /**
* Y value translated to y axis scale.
* @name Highcharts.AnnotationMockLabelOptionsObject#y
* @type {number|null}
*/
/**
 * A mock series instance imitating a real series from a real point.
 *
 * @interface Highcharts.AnnotationMockSeries
 */ /**
* Whether a series is visible.
* @name Highcharts.AnnotationMockSeries#visible
* @type {boolean}
*/ /**
* A chart instance.
*
* @name Highcharts.AnnotationMockSeries#chart
* @type {Highcharts.Chart}
*/ /**
* @name Highcharts.AnnotationMockSeries#getPlotBox
* @type {Function}
*/
import U from '../parts/Utilities.js';
var defined = U.defined, extend = U.extend;
import '../parts/Axis.js';
import '../parts/Series.js';
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * A trimmed point object which imitates {@link Highchart.Point} class. It is
 * created when there is a need of pointing to some chart's position using axis
 * values or pixel values
 *
 * @requires modules/annotations
 *
 * @class
 * @name Highcharts.AnnotationMockPoint
 *
 * @param {Highcharts.Chart} chart
 * The chart instance.
 *
 * @param {Highcharts.AnnotationControllable|null} target
 * The related controllable.
 *
 * @param {Highcharts.AnnotationMockPointOptionsObject|Function} options
 * The options object.
 */
var MockPoint = function (chart, target, options) {
    /**
     * A mock series instance imitating a real series from a real point.
     *
     * @name Annotation.AnnotationMockPoint#series
     * @type {Highcharts.AnnotationMockSeries}
     */
    this.series = {
        visible: true,
        chart: chart,
        getPlotBox: H.Series.prototype.getPlotBox
    };
    /**
     * @name Annotation.AnnotationMockPoint#target
     * @type {Highcharts.AnnotationControllable|null}
     */
    this.target = target || null;
    /**
     * Options for the mock point.
     *
     * @name Annotation.AnnotationMockPoint#options
     * @type {Highcharts.AnnotationsMockPointOptionsObject}
     */
    this.options = options;
    /**
     * If an xAxis is set it represents the point's value in terms of the xAxis.
     *
     * @name Annotation.AnnotationMockPoint#x
     * @type {number|undefined}
     */
    /**
     * If an yAxis is set it represents the point's value in terms of the yAxis.
     *
     * @name Annotation.AnnotationMockPoint#y
     * @type {number|undefined}
     */
    /**
     * It represents the point's pixel x coordinate relative to its plot box.
     *
     * @name Annotation.AnnotationMockPoint#plotX
     * @type {number|undefined}
     */
    /**
     * It represents the point's pixel y position relative to its plot box.
     *
     * @name Annotation.AnnotationMockPoint#plotY
     * @type {number|undefined}
     */
    /**
     * Whether the point is inside the plot box.
     *
     * @name Annotation.AnnotationMockPoint#isInside
     * @type {boolean|undefined}
     */
    this.applyOptions(this.getOptions());
};
/**
 * Create a mock point from a real Highcharts point.
 *
 * @private
 * @static
 *
 * @param {Highcharts.Point} point
 *
 * @return {Highcharts.AnnotationMockPoint}
 * A mock point instance.
 */
MockPoint.fromPoint = function (point) {
    return new MockPoint(point.series.chart, null, {
        x: point.x,
        y: point.y,
        xAxis: point.series.xAxis,
        yAxis: point.series.yAxis
    });
};
/**
 * Get the pixel position from the point like object.
 *
 * @private
 * @static
 *
 * @param {Highcharts.AnnotationPointType} point
 *
 * @param {boolean} [paneCoordinates]
 *        whether the pixel position should be relative
 *
 * @return {Highcharts.PositionObject} pixel position
 */
MockPoint.pointToPixels = function (point, paneCoordinates) {
    var series = point.series, chart = series.chart, x = point.plotX, y = point.plotY, plotBox;
    if (chart.inverted) {
        if (point.mock) {
            x = point.plotY;
            y = point.plotX;
        }
        else {
            x = chart.plotWidth - point.plotY;
            y = chart.plotHeight - point.plotX;
        }
    }
    if (series && !paneCoordinates) {
        plotBox = series.getPlotBox();
        x += plotBox.translateX;
        y += plotBox.translateY;
    }
    return {
        x: x,
        y: y
    };
};
/**
 * Get fresh mock point options from the point like object.
 *
 * @private
 * @static
 *
 * @param {Highcharts.AnnotationPointType} point
 *
 * @return {Highcharts.AnnotationMockPointOptionsObject} mock point's options
 */
MockPoint.pointToOptions = function (point) {
    return {
        x: point.x,
        y: point.y,
        xAxis: point.series.xAxis,
        yAxis: point.series.yAxis
    };
};
extend(MockPoint.prototype, /** @lends Highcharts.AnnotationMockPoint# */ {
    /**
     * A flag indicating that a point is not the real one.
     *
     * @type {boolean}
     * @default true
     */
    mock: true,
    /**
     * Check if the point has dynamic options.
     * @private
     * @return {boolean}
     * A positive flag if the point has dynamic options.
     */
    hasDynamicOptions: function () {
        return typeof this.options === 'function';
    },
    /**
     * Get the point's options.
     * @private
     * @return {Highcharts.AnnotationMockPointOptionsObject}
     * The mock point's options.
     */
    getOptions: function () {
        return this.hasDynamicOptions() ?
            this.options(this.target) :
            this.options;
    },
    /**
     * Apply options for the point.
     * @private
     * @param {Highcharts.AnnotationMockPointOptionsObject} options
     */
    applyOptions: function (options) {
        this.command = options.command;
        this.setAxis(options, 'x');
        this.setAxis(options, 'y');
        this.refresh();
    },
    /**
     * Set x or y axis.
     * @private
     * @param {Highcharts.AnnotationMockPointOptionsObject} options
     * @param {string} xOrY
     * 'x' or 'y' string literal
     */
    setAxis: function (options, xOrY) {
        var axisName = (xOrY + 'Axis'), axisOptions = options[axisName], chart = this.series.chart;
        this.series[axisName] =
            axisOptions instanceof H.Axis ?
                axisOptions :
                defined(axisOptions) ?
                    (chart[axisName][axisOptions] ||
                        chart.get(axisOptions)) :
                    null;
    },
    /**
     * Transform the mock point to an anchor (relative position on the chart).
     * @private
     * @return {Array<number>}
     * A quadruple of numbers which denotes x, y, width and height of the box
     **/
    toAnchor: function () {
        var anchor = [this.plotX, this.plotY, 0, 0];
        if (this.series.chart.inverted) {
            anchor[0] = this.plotY;
            anchor[1] = this.plotX;
        }
        return anchor;
    },
    /**
     * Returns a label config object - the same as
     * Highcharts.Point.prototype.getLabelConfig
     * @private
     * @return {Annotation.MockPoint.LabelConfig} the point's label config
     */
    getLabelConfig: function () {
        return {
            x: this.x,
            y: this.y,
            point: this
        };
    },
    /**
     * Check if the point is inside its pane.
     * @private
     * @return {boolean} A flag indicating whether the point is inside the pane.
     */
    isInsidePane: function () {
        var plotX = this.plotX, plotY = this.plotY, xAxis = this.series.xAxis, yAxis = this.series.yAxis, isInside = true;
        if (xAxis) {
            isInside = defined(plotX) && plotX >= 0 && plotX <= xAxis.len;
        }
        if (yAxis) {
            isInside =
                isInside &&
                    defined(plotY) &&
                    plotY >= 0 && plotY <= yAxis.len;
        }
        return isInside;
    },
    /**
     * Refresh point values and coordinates based on its options.
     * @private
     */
    refresh: function () {
        var series = this.series, xAxis = series.xAxis, yAxis = series.yAxis, options = this.getOptions();
        if (xAxis) {
            this.x = options.x;
            this.plotX = xAxis.toPixels(options.x, true);
        }
        else {
            this.x = null;
            this.plotX = options.x;
        }
        if (yAxis) {
            this.y = options.y;
            this.plotY = yAxis.toPixels(options.y, true);
        }
        else {
            this.y = null;
            this.plotY = options.y;
        }
        this.isInside = this.isInsidePane();
    },
    /**
     * Translate the point.
     *
     * @private
     *
     * @param {number|undefined} cx
     * Origin x transformation.
     *
     * @param {number|undefined} cy
     * Origin y transformation.
     *
     * @param {number} dx
     * Translation for x coordinate.
     *
     * @param {number} dy
     * Translation for y coordinate.
     **/
    translate: function (_cx, _cy, dx, dy) {
        if (!this.hasDynamicOptions()) {
            this.plotX += dx;
            this.plotY += dy;
            this.refreshOptions();
        }
    },
    /**
     * Scale the point.
     *
     * @private
     *
     * @param {number} cx
     * Origin x transformation.
     *
     * @param {number} cy
     * Origin y transformation.
     *
     * @param {number} sx
     * Scale factor x.
     *
     * @param {number} sy
     * Scale factor y.
     */
    scale: function (cx, cy, sx, sy) {
        if (!this.hasDynamicOptions()) {
            var x = this.plotX * sx, y = this.plotY * sy, tx = (1 - sx) * cx, ty = (1 - sy) * cy;
            this.plotX = tx + x;
            this.plotY = ty + y;
            this.refreshOptions();
        }
    },
    /**
     * Rotate the point.
     * @private
     * @param {number} cx origin x rotation
     * @param {number} cy origin y rotation
     * @param {number} radians
     */
    rotate: function (cx, cy, radians) {
        if (!this.hasDynamicOptions()) {
            var cos = Math.cos(radians), sin = Math.sin(radians), x = this.plotX, y = this.plotY, tx, ty;
            x -= cx;
            y -= cy;
            tx = x * cos - y * sin;
            ty = x * sin + y * cos;
            this.plotX = tx + cx;
            this.plotY = ty + cy;
            this.refreshOptions();
        }
    },
    /**
     * Refresh point options based on its plot coordinates.
     * @private
     */
    refreshOptions: function () {
        var series = this.series, xAxis = series.xAxis, yAxis = series.yAxis;
        this.x = this.options.x = xAxis ?
            this.options.x = xAxis.toValue(this.plotX, true) :
            this.plotX;
        this.y = this.options.y = yAxis ?
            yAxis.toValue(this.plotY, true) :
            this.plotY;
    }
});
export default MockPoint;
