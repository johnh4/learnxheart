import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

const reqContainers = require.context('../src/containers', true, /stories\.js$/);
const reqComponents = require.context('../src/components', true, /stories\.js$/);

function loadStories() {
  reqContainers.keys().forEach(filename => reqContainers(filename));
  reqComponents.keys().forEach(filename => reqComponents(filename));
}

addDecorator(
  withOptions({
    name: 'Learn X Heart',
    sortStoriesByKind: true
  })
);

configure(loadStories, module);