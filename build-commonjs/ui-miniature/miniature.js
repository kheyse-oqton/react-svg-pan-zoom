'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Miniature;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _transformationMatrix = require('transformation-matrix');

var _miniatureToggleButton = require('./miniature-toggle-button');

var _miniatureToggleButton2 = _interopRequireDefault(_miniatureToggleButton);

var _miniatureMask = require('./miniature-mask');

var _miniatureMask2 = _interopRequireDefault(_miniatureMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var min = Math.min,
    max = Math.max;
function Miniature(props) {
  var _style;

  var value = props.value,
      onChangeValue = props.onChangeValue,
      position = props.position,
      children = props.children,
      background = props.background,
      SVGBackground = props.SVGBackground,
      miniatureWidth = props.width,
      miniatureHeight = props.height;
  var SVGViewBoxX = value.SVGViewBoxX,
      SVGViewBoxY = value.SVGViewBoxY,
      SVGWidth = value.SVGWidth,
      SVGHeight = value.SVGHeight,
      viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;


  var ratio = SVGHeight / SVGWidth;

  var zoomToFit = ratio >= 1 ? miniatureHeight / SVGHeight : miniatureWidth / SVGWidth;

  var _applyToPoints = (0, _transformationMatrix.applyToPoints)((0, _transformationMatrix.inverse)(value), [{ x: 0, y: 0 }, { x: viewerWidth, y: viewerHeight }]),
      _applyToPoints2 = _slicedToArray(_applyToPoints, 2),
      _applyToPoints2$ = _applyToPoints2[0],
      x1 = _applyToPoints2$.x,
      y1 = _applyToPoints2$.y,
      _applyToPoints2$2 = _applyToPoints2[1],
      x2 = _applyToPoints2$2.x,
      y2 = _applyToPoints2$2.y;

  var width = void 0,
      height = void 0;
  if (value.miniatureOpen) {
    width = miniatureWidth;
    height = miniatureHeight;
  } else {
    width = 24;
    height = 24;
  }

  var style = (_style = {
    position: "absolute",
    overflow: "hidden",
    outline: "1px solid rgba(19, 20, 22, 0.90)",
    transition: "width 200ms ease, height 200ms ease, bottom 200ms ease",
    width: width + "px",
    height: height + "px",
    bottom: "6px"
  }, _defineProperty(_style, position === _constants.POSITION_LEFT ? 'left' : 'right', "6px"), _defineProperty(_style, 'background', background), _style);

  var centerTranslation = ratio >= 1 ? 'translate(' + (miniatureWidth - SVGWidth * zoomToFit) / 2 + ', ' + -SVGViewBoxY * zoomToFit + ')' : 'translate(' + -SVGViewBoxX * zoomToFit + ', ' + (miniatureHeight - SVGHeight * zoomToFit) / 2 + ')';

  return _react2.default.createElement(
    'div',
    { role: 'navigation', style: style },
    _react2.default.createElement(
      'svg',
      {
        width: miniatureWidth,
        height: miniatureHeight,
        style: { pointerEvents: "none" } },
      _react2.default.createElement(
        'g',
        { transform: centerTranslation },
        _react2.default.createElement(
          'g',
          { transform: 'scale(' + zoomToFit + ', ' + zoomToFit + ')' },
          _react2.default.createElement('rect', {
            fill: SVGBackground,
            x: value.SVGViewBoxX,
            y: value.SVGViewBoxY,
            width: value.SVGWidth,
            height: value.SVGHeight }),
          children,
          _react2.default.createElement(_miniatureMask2.default, {
            SVGViewBoxX: value.SVGViewBoxX,
            SVGViewBoxY: value.SVGViewBoxY,
            SVGWidth: SVGWidth,
            SVGHeight: SVGHeight,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            zoomToFit: zoomToFit
          })
        )
      )
    ),
    _react2.default.createElement(_miniatureToggleButton2.default, { value: value, onChangeValue: onChangeValue, position: position })
  );
}

Miniature.propTypes = {
  position: _propTypes2.default.oneOf([_constants.POSITION_RIGHT, _constants.POSITION_LEFT]).isRequired,
  value: _propTypes2.default.object.isRequired,
  onChangeValue: _propTypes2.default.func.isRequired,
  background: _propTypes2.default.string.isRequired,
  SVGBackground: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number.isRequired
};