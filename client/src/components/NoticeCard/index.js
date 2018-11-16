import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Card from '../Card';
import LinkButton from '../LinkButton';

function NoticeCard({ noticeText, linkPath, linkText }) {
  return (
    <Card
      classes="NoticeCard CardSection__card"
      size="m"
      dataTestId="notice-card"
    >
      <div className="NoticeCard__body">
        {noticeText}
      </div>
      <div className="NoticeCard__footer">
        <LinkButton to={linkPath}>
          {linkText}
        </LinkButton>
      </div>
    </Card>
  )
}

NoticeCard.propTypes = {
  noticeText: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
}

NoticeCard.defaultProps = {
  noticeText: "",
  linkPath: "",
  linkText: ""
}

export default NoticeCard;