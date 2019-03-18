import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ViewHeader from '.';
import './styles.scss';
import { AppWrapper } from '../../components/App';
import LinkButton from '../LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faStickyNote } from '@fortawesome/free-solid-svg-icons';

const AppDecorator = (storyFn) => (
  <AppWrapper>{storyFn()}</AppWrapper>
);

const stories = storiesOf('ViewHeader', module);

stories.addDecorator(AppDecorator);
stories.addDecorator(withKnobs);

stories.add('With no data', () => (
  <ViewHeader /> 
));

stories.add('With data', () => {
  const smallIcons = [
    {
      icon: <FontAwesomeIcon icon={faBook} />,
      label: 30,
      key: 'book-icon'
    },
    {
      icon: <FontAwesomeIcon icon={faStickyNote} />,
      label: 40,
      key: 'note-icon'
    }
  ];
  const buttons = [
    <LinkButton to="/study">Study Now</LinkButton>,
    <LinkButton to="browse">Browse Courses</LinkButton>
  ];
  const message = 'You have 5 important tasks today, some messages and notification. Finish them all! Or, you can also Edit Task.';
  return (
    <ViewHeader
      mainIcon={<FontAwesomeIcon icon={faBook} />}
      subHeader={text("Course Subheader", "Course Subheader")}
      smallIcons={smallIcons}
      title={text("Title", "My Courses")}
      message={text("Message", message)}
      buttons={buttons}
    /> 
  )
});