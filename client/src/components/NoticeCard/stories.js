import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import NoticeCard from '.';
import './styles.scss';
import { AppWrapper } from '../../components/App';

const AppDecorator = (storyFn) => (
  <AppWrapper>{storyFn()}</AppWrapper>
);

const stories = storiesOf('NoticeCard', module);

stories.addDecorator(AppDecorator);
stories.addDecorator(withKnobs);

stories.add('With no data', () => (
  <NoticeCard />
));

stories.add('With all fields', () => (
  <NoticeCard 
    noticeText={text('noticeText', 'This is notice text')}
    linkPath={text('linkPath', '/linkPath')}
    linkText={text('linkText', 'Link Text')}
  />
));