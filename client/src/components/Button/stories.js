import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '.';
import './styles.scss';
import { AppWrapper } from '../../components/App';

const AppDecorator = (storyFn) => (
  <AppWrapper>{storyFn()}</AppWrapper>
);

const stories = storiesOf('Button', module);

stories.addDecorator(AppDecorator);

stories.add('A button w/o props', () => (
  <Button> 
    Click here
  </Button>
));

stories.add('A default size button', () => (
  <Button classes="Button_size_default"> 
    Click here
  </Button>
));

stories.add('A raised styled button', () => (
  <Button classes="Button_style_raised">
    Click here
  </Button>
));

stories.add('An empty styled button', () => (
  <Button classes="Button_style_empty">
    Click here
  </Button>
));