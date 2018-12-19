import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from '.';
import './styles.scss';
import { AppWrapper } from '../../components/App';

const AppDecorator = (storyFn) => (
  <AppWrapper>{storyFn()}</AppWrapper>
);

const stories = storiesOf('Card', module);

stories.addDecorator(AppDecorator);

stories.add('With no data', () => (
  <Card />
));
