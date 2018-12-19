import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ViewHeader({
  mainIcon,
  subHeader,
  smallIcons,
  title,
  message,
  buttons,
  classes,
  dataTestId
}) {
  return (
    <header
      className={`ViewHeader ${classes}`}
      data-testid={dataTestId}
    >
      <div className="ViewHeader__icons">
        <div className="ViewHeader__main-icon">
          {mainIcon}
        </div>
        <div className="ViewHeader__icon-sub-header">
          {subHeader}
        </div>
        {!!smallIcons &&
          <div className="ViewHeader__small-icon-group">
            {smallIcons.map(iconPair => (
              <div
                className="ViewHeader__small-icon-pair"
                key={iconPair.key}
              >
                <div className="ViewHeader__small-icon">
                  {iconPair.icon}
                </div>
                <div className="ViewHeader__icon-label">
                  {iconPair.label}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      <div className="ViewHeader__details">
        <div className="ViewHeader__title">{title}</div>
        <div className="ViewHeader__divider"></div>
        <div className="ViewHeader__message">{message}</div>
        {buttons.length > 0 &&
          <div
            className="ViewHeader__actions"
            data-testid="page-header-actions"
          >
            {buttons.map(buttonInfo => (
              <div className="ViewHeader__button" key={buttonInfo.key}>
                {buttonInfo.button}
              </div>
            ))}
          </div>
        }
      </div>
    </header>
  )
}

ViewHeader.propTypes = {
  classes: PropTypes.string,
  dataTestId: PropTypes.string,
  subHeader: PropTypes.string,
  smallIcons: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    label: PropTypes.number,
    key: PropTypes.string
  })),
  title: PropTypes.string,
  message: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    button: PropTypes.node,
    key: PropTypes.string
  }))
}

ViewHeader.defaultProps = {
  classes: '',
  dataTestId: 'page-header',
  subHeader: '',
  smallIcons: [],
  title: '',
  message: '',
  buttons: []
}

export default ViewHeader;
