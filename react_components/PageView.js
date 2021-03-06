'use strict';

import React from 'react';
import Link from 'react-router/lib/Link';

export default class PageView extends React.Component {
  render() {
    const { linkClassName, selected, activeClassName, pathname, page } = this.props;
    let { cssClassName } = this.props;
    if (selected) {
      if (typeof(cssClassName) !== 'undefined') {
        cssClassName = cssClassName + ' ' + activeClassName;
      } else {
        cssClassName = activeClassName;
      }
    }
    const query = page !== 1 ? { page } : {};
    const linkTo = selected ? {} : {pathname, query};
 
    return (
        <li className={cssClassName}>
            <Link to={linkTo} className={linkClassName}>
              {page}
            </Link>
        </li>
    );
  }
};
