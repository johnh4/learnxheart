import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import Filter from '.';
import './styles.scss';
import { AppWrapper } from '../../components/App';

const AppDecorator = (storyFn) => (
  <AppWrapper userSignedIn={true}>{storyFn()}</AppWrapper>
);

const stories = storiesOf('Filter', module);

stories.addDecorator(AppDecorator);
stories.addDecorator(withKnobs);

stories.add('With no data', () => (
  <Filter />
));

stories.add('With input text', () => (
  <Filter 
    inputText={text('inputText', 'philosophy')}
    placeholder={text('placeholder', 'Follow courses')}
    activeFilters={array('activeFilters', [])}
  />
));

stories.add('With 1 filter', () => (
  <Filter 
    inputText={text('inputText', '')}
    placeholder={text('placeholder', 'Follow courses')}
    activeFilters={array('activeFilters', ['philosophy'])}
  />
));

stories.add('With 2 filters', () => {
  const filters = ['philosophy', 'john'];

  return (
    <Filter 
      inputText={text('inputText', '')}
      placeholder={text('placeholder', 'Follow courses')}
      activeFilters={array('activeFilters', filters)}
    />
  );
});

stories.add('With 3 filters', () => {
  const filters = ['philosophy', 'math', 'john'];

  return (
    <Filter 
      inputText={text('inputText', '')}
      placeholder={text('placeholder', 'Follow courses')}
      activeFilters={array('activeFilters', filters)}
    />
  );
});