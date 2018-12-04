import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function PageHeader({
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
      className={`PageHeader ${classes}`}
      data-testid={dataTestId}
    >
      <div className="PageHeader__icons">
        <div className="PageHeader__main-icon">
          {mainIcon}
        </div>
        <div className="PageHeader__icon-sub-header">
          {subHeader}
        </div>
        {!!smallIcons &&
          <div className="PageHeader__small-icon-group">
            {smallIcons.map(iconPair => (
              <div
                className="PageHeader__small-icon-pair"
                key={iconPair.key}
              >
                <div className="PageHeader__small-icon">
                  {iconPair.icon}
                </div>
                <div className="PageHeader__icon-label">
                  {iconPair.label}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      <div className="PageHeader__details">
        <div className="PageHeader__title">{title}</div>
        <div className="PageHeader__divider"></div>
        <div className="PageHeader__message">{message}</div>
        {buttons.length > 0 &&
          <div
            className="PageHeader__actions"
            data-testid="page-header-actions"
          >
            {buttons.map(buttonInfo => (
              <div className="PageHeader__button" key={buttonInfo.key}>
                {buttonInfo.button}
              </div>
            ))}
          </div>
        }
      </div>
    </header>
  )
}

PageHeader.propTypes = {
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

PageHeader.defaultProps = {
  classes: '',
  dataTestId: 'page-header',
  subHeader: '',
  smallIcons: [],
  title: '',
  message: '',
  buttons: []
}

export default PageHeader;
