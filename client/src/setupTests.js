import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/* for react-testing-library */
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

require('jest-localstorage-mock');

window.matchMedia = () => ({ 
  matches: true,
  addListener: () => {}, 
  removeListener: () => {} 
});

Enzyme.configure({ adapter: new Adapter() });