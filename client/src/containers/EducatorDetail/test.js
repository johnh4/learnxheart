import React from 'react';
import EducatorDetail from '.';
import { renderWithProviders } from '../../utils/testUtils';
import axios from 'axios';
import {
  fireEvent,
  within,
  waitForElement
} from 'react-testing-library';

jest.mock('axios');

describe('EducatorDetail', () => {
  xtest('renders without crashing', () => {
    // execute
    const { getByText } = renderWithProviders(
      EducatorDetail,
      { route: '/1', withinRoute: true, routePath: '/:educatorId' }
    );

    // verify
    expect(getByText(/follow/i)).toBeInTheDocument();
  });

  test('displays the educators courses', async () => {
    // setup
    const educator = educatorData[0];
    axios.mockReturnValueOnce(new Promise(
      resolve => resolve({ data: educator })
    ));

    // execute
    const { getByText } = renderWithProviders(
      EducatorDetail,
      { route: '/1', withinRoute: true, routePath: '/:educatorId' }
    );

    // verify
    await waitForElement(() => getByText(educatorName(educator)));
    expect(getByText(courseData[0].name)).toBeInTheDocument();
    expect(getByText(courseData[1].name)).toBeInTheDocument();
    expect(queryByText(courseData[2].name)).not.toBeInTheDocument();
  });
});

const courseData = [
  {
    id: 1,
    name: 'The Office 101',
    educator_id: 1
  },
  {
    id: 2,
    name: 'Parks and Rec 201',
    educator_id: 1
  },
  {
    id: 3,
    name: 'The Good Place',
    educator_id: 2
  }
];

const educatorName = (educator) => (
  `${educator.first_name} ${educator.last_name}`
);

const educatorData = [
  {
    id: 1,
    first_name: 'Michael',
    last_name: 'Scott',
    courses: [courseData[0], courseData[1]]
  },
  {
    id: 2,
    first_name: 'Dwight',
    last_name: 'Schrute',
    courses: [courseData[2]]
  }
];