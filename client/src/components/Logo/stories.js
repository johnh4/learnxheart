import React from 'react';
import { storiesOf } from '@storybook/react';
import { AppWrapper } from '../../components/App';
import Logo from '.';

const AppDecorator = (storyFn) => (
  <AppWrapper userSignedIn={true}>{storyFn()}</AppWrapper>
);

const stories = storiesOf('Logo', module);

stories.addDecorator(AppDecorator);

stories.add('The logo', () => (
  <Logo />
));