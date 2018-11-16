import React from 'react';
import { Link } from '@reach/router';
import '../Button/styles.scss';
import './styles.scss';

function LinkButton({ children, ...otherProps }) {
  return (
    <Link {...otherProps}>
      <button className="LinkButton Button Button_size_default Button_style_raised">
        {children}
      </button>
    </Link>
  )
}

export default LinkButton;