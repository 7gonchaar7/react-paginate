'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _Link = require('react-router/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

var _PageView = require('./PageView');

var _PageView2 = _interopRequireDefault(_PageView);

var _BreakView = require('./BreakView');

var _BreakView2 = _interopRequireDefault(_BreakView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationBoxView = function (_Component) {
  _inherits(PaginationBoxView, _Component);

  function PaginationBoxView(props) {
    _classCallCheck(this, PaginationBoxView);

    var _this = _possibleConstructorReturn(this, (PaginationBoxView.__proto__ || Object.getPrototypeOf(PaginationBoxView)).call(this, props));

    _this.callCallback = function (selectedItem) {
      if (typeof _this.props.onPageChange !== "undefined" && typeof _this.props.onPageChange === "function") {
        _this.props.onPageChange({ selected: selectedItem });
      }
    };

    _this.pagination = function () {
      var items = {};

      if (_this.props.pageCount <= _this.props.pageRangeDisplayed) {

        for (var index = 0; index < _this.props.pageCount; index++) {
          items['key' + index] = _react2.default.createElement(_PageView2.default, {
            selected: _this.state.selected === index,
            pathname: _this.props.pathname,
            activeClassName: _this.props.activeClassName,
            page: index + 1 });
        }
      } else {

        var leftSide = _this.props.pageRangeDisplayed / 2;
        var rightSide = _this.props.pageRangeDisplayed - leftSide;

        if (_this.state.selected > _this.props.pageCount - _this.props.pageRangeDisplayed / 2) {
          rightSide = _this.props.pageCount - _this.state.selected;
          leftSide = _this.props.pageRangeDisplayed - rightSide;
        } else if (_this.state.selected < _this.props.pageRangeDisplayed / 2) {
          leftSide = _this.state.selected;
          rightSide = _this.props.pageRangeDisplayed - leftSide;
        }

        var _index = void 0;
        var page = void 0;
        var breakView = void 0;

        for (_index = 0; _index < _this.props.pageCount; _index++) {

          page = _index + 1;

          var pageView = _react2.default.createElement(_PageView2.default, {
            selected: _this.state.selected === _index,
            pathname: _this.props.pathname,
            activeClassName: _this.props.activeClassName,
            page: _index + 1 });

          if (page <= _this.props.marginPagesDisplayed) {
            items['key' + _index] = pageView;
            continue;
          }

          if (page > _this.props.pageCount - _this.props.marginPagesDisplayed) {
            items['key' + _index] = pageView;
            continue;
          }

          if (_index >= _this.state.selected - leftSide && _index <= _this.state.selected + rightSide) {
            items['key' + _index] = pageView;
            continue;
          }

          var keys = Object.keys(items);
          var breakLabelKey = keys[keys.length - 1];
          var breakLabelValue = items[breakLabelKey];

          if (_this.props.breakLabel && breakLabelValue !== breakView) {
            breakView = _react2.default.createElement(_BreakView2.default, {
              breakLabel: _this.props.breakLabel,
              breakClassName: _this.props.breakClassName
            });

            items['key' + _index] = breakView;
          }
        }
      }

      return items;
    };

    _this.state = {
      selected: props.initialPage ? props.initialPage : props.forcePage ? props.forcePage : 0
    };
    return _this;
  }

  _createClass(PaginationBoxView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Call the callback with the initialPage item:
      if (typeof this.props.initialPage !== 'undefined') {
        this.callCallback(this.props.initialPage);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.forcePage !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
        this.setState({ selected: nextProps.forcePage });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          containerClassName = _props.containerClassName,
          previousClassName = _props.previousClassName,
          nextClassName = _props.nextClassName,
          pathname = _props.pathname,
          pageCount = _props.pageCount,
          disabledClassName = _props.disabledClassName,
          forcePage = _props.forcePage;
      var selected = this.state.selected;

      var previousClasses = (0, _classnames2.default)(previousClassName, _defineProperty({}, disabledClassName, selected === 0));

      var nextClasses = (0, _classnames2.default)(nextClassName, _defineProperty({}, disabledClassName, selected === pageCount - 1));
      var prevLinkProps = {};
      var nextLinkProps = {};
      var prevLinkQuery = forcePage !== 1 ? { page: forcePage } : {};
      var nextLinkQuery = { page: forcePage + 2 };
      if (forcePage > 0) prevLinkProps = { to: { pathname: pathname, query: prevLinkQuery }, rel: 'prev' };
      if (forcePage < pageCount - 1) nextLinkProps = { to: { pathname: pathname, query: nextLinkQuery }, rel: 'next' };

      return _react2.default.createElement(
        'ul',
        { className: containerClassName },
        _react2.default.createElement(
          'li',
          { className: previousClasses },
          _react2.default.createElement(
            _Link2.default,
            prevLinkProps,
            _react2.default.createElement('i', { className: 'fa fa-chevron-left' })
          )
        ),
        (0, _reactAddonsCreateFragment2.default)(this.pagination()),
        _react2.default.createElement(
          'li',
          { className: nextClasses },
          _react2.default.createElement(
            _Link2.default,
            nextLinkProps,
            _react2.default.createElement('i', { className: 'fa fa-chevron-right' })
          )
        )
      );
    }
  }]);

  return PaginationBoxView;
}(_react.Component);

PaginationBoxView.propTypes = {
  pageCount: _react.PropTypes.number.isRequired,
  pageRangeDisplayed: _react.PropTypes.number.isRequired,
  marginPagesDisplayed: _react.PropTypes.number.isRequired,
  previousLabel: _react.PropTypes.node,
  nextLabel: _react.PropTypes.node,
  breakLabel: _react.PropTypes.node,
  onPageChange: _react.PropTypes.func,
  initialPage: _react.PropTypes.number,
  forcePage: _react.PropTypes.number,
  pathname: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  pageClassName: _react.PropTypes.string,
  pageLinkClassName: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string,
  previousClassName: _react.PropTypes.string,
  nextClassName: _react.PropTypes.string,
  previousLinkClassName: _react.PropTypes.string,
  nextLinkClassName: _react.PropTypes.string,
  disabledClassName: _react.PropTypes.string,
  breakClassName: _react.PropTypes.string
};
PaginationBoxView.defaultProps = {
  pageCount: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: "selected",
  previousClassName: "previous",
  nextClassName: "next",
  previousLabel: "Previous",
  nextLabel: "Next",
  breakLabel: "...",
  disabledClassName: "disabled"
};
exports.default = PaginationBoxView;
;
//# sourceMappingURL=PaginationBoxView.js.map