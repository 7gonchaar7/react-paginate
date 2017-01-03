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

    return (
        <li className={cssClassName}>
            <Link to={{pathname, query: { page }}} className={linkClassName} tabIndex="0">
              {page}
            </Link>
        </li>
    );
  }
};
