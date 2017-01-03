'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import createFragment from 'react-addons-create-fragment';
import Link from 'react-router/lib/Link';
import PageView from './PageView';
import BreakView from './BreakView';


export default class PaginationBoxView extends Component {
  static propTypes = {
    pageCount             : PropTypes.number.isRequired,
    pageRangeDisplayed    : PropTypes.number.isRequired,
    marginPagesDisplayed  : PropTypes.number.isRequired,
    previousLabel         : PropTypes.node,
    nextLabel             : PropTypes.node,
    breakLabel            : PropTypes.node,
    onPageChange          : PropTypes.func,
    initialPage           : PropTypes.number,
    forcePage             : PropTypes.number,
    pathname              : PropTypes.string,
    containerClassName    : PropTypes.string,
    pageClassName         : PropTypes.string,
    pageLinkClassName     : PropTypes.string,
    activeClassName       : PropTypes.string,
    previousClassName     : PropTypes.string,
    nextClassName         : PropTypes.string,
    previousLinkClassName : PropTypes.string,
    nextLinkClassName     : PropTypes.string,
    disabledClassName     : PropTypes.string,
    breakClassName        : PropTypes.string
  };

  static defaultProps = {
    pageCount            : 10,
    pageRangeDisplayed   : 2,
    marginPagesDisplayed : 3,
    activeClassName      : "selected",
    previousClassName    : "previous",
    nextClassName        : "next",
    previousLabel        : "Previous",
    nextLabel            : "Next",
    breakLabel           : "...",
    disabledClassName    : "disabled"
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.initialPage ? props.initialPage :
                props.forcePage   ? props.forcePage :
                0
    };
  }

  componentDidMount() {
    // Call the callback with the initialPage item:
    if (typeof(this.props.initialPage) !== 'undefined') {
      this.callCallback(this.props.initialPage);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof(nextProps.forcePage) !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
      this.setState({selected: nextProps.forcePage});
    }
  }

  callCallback = (selectedItem) => {
    if (typeof(this.props.onPageChange) !== "undefined" &&
        typeof(this.props.onPageChange) === "function") {
      this.props.onPageChange({selected: selectedItem});
    }
  };

  pagination = () => {
    let items = {};

    if (this.props.pageCount <= this.props.pageRangeDisplayed) {

      for (let index = 0; index < this.props.pageCount; index++) {
        items['key' + index] = <PageView
          selected={this.state.selected === index}
          pathname={this.props.pathname}
          activeClassName={this.props.activeClassName}
          page={index + 1} />
      }

    } else {

      let leftSide  = (this.props.pageRangeDisplayed / 2);
      let rightSide = (this.props.pageRangeDisplayed - leftSide);

      if (this.state.selected > this.props.pageCount - this.props.pageRangeDisplayed / 2) {
        rightSide = this.props.pageCount - this.state.selected;
        leftSide  = this.props.pageRangeDisplayed - rightSide;
      }
      else if (this.state.selected < this.props.pageRangeDisplayed / 2) {
        leftSide  = this.state.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      let index;
      let page;
      let breakView;

      for (index = 0; index < this.props.pageCount; index++) {

        page = index + 1;

        let pageView = (
          <PageView
            selected={this.state.selected === index}
            pathname={this.props.pathname}
            activeClassName={this.props.activeClassName}
            page={index + 1} />
        );

        if (page <= this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if (page > this.props.pageCount - this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if ((index >= this.state.selected - leftSide) && (index <= this.state.selected + rightSide)) {
          items['key' + index] = pageView;
          continue;
        }

        let keys            = Object.keys(items);
        let breakLabelKey   = keys[keys.length - 1];
        let breakLabelValue = items[breakLabelKey];

        if (this.props.breakLabel && breakLabelValue !== breakView) {
          breakView = (
            <BreakView
              breakLabel={this.props.breakLabel}
              breakClassName={this.props.breakClassName}
            />
          );

          items['key' + index] = breakView;
        }
      }
    }

    return items;
  };

  render() {
    const { containerClassName, previousClassName, nextClassName,
      pathname, pageCount, disabledClassName, forcePage } = this.props
    const previousClasses = classNames(previousClassName,
      {[disabledClassName]: this.state.selected === 0});

    const nextClasses = classNames(nextClassName,
      {[disabledClassName]: this.state.selected === pageCount - 1});
    let relPrev = {};
    let relNext = {};
    if (forcePage > 0) relPrev = { rel: 'prev' };
    if (forcePage < pageCount - 1) relNext = { rel: 'next' };
    const prevLinkQuery = forcePage !== 1 ? { page: forcePage } : {};
    const nextLinkQuery = { page: forcePage + 2 }
    const prevLinkProps = Object.assign({ to: { pathname, query: prevLinkQuery } }, relPrev);
    const nextLinkProps = Object.assign({ to: { pathname, query: nextLinkQuery } }, relNext);
    
    return (
      <ul className={containerClassName}>
        <li className={previousClasses}>
          <Link {...prevLinkProps}>
            <i className="fa fa-chevron-left"/>
          </Link>
        </li>
        {createFragment(this.pagination())}
        <li className={nextClasses}>
          <Link {...nextLinkProps}>
            <i className="fa fa-chevron-right"/>
          </Link>
        </li>
      </ul>
    );
  }
};
