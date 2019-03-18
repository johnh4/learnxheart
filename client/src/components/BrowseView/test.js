import React from 'react';
import BrowseView from '.';
import { renderWithProviders } from '../../utils/testUtils';
import axios from 'axios';
import {
  fireEvent,
  within,
  waitForElement
} from 'react-testing-library';

jest.mock('axios');

describe('BrowseView', () => {
  test('renders without crashing', () => {
    // execute
    const { getByText } = renderWithProviders(
      BrowseView,
      { route: '/browse', withinRoute: true, routePath: '/browse' }
    );

    // verify
    expect(getByText(/browse/i)).toBeInTheDocument();
  });

  test('allows students to visit the browse courses page', async () => {
    // setup
    const { getByTestId } = renderWithProviders(
      BrowseView,
      { route: '/browse', withinRoute: true, routePath: '/browse' }
    );
    const links = getByTestId('browse-links');
    const coursesLink = within(links).getByText(/courses/i);

    // execute
    fireEvent.click(coursesLink);

    // verify
    await waitForElement(() => getByTestId('browse-courses'));
    expect(getByTestId('browse-courses')).toBeInTheDocument();
  });

  test('allows students to visit the browse educators page', async () => {
    // setup
    const { getByTestId } = renderWithProviders(
      BrowseView,
      { route: '/browse', withinRoute: true, routePath: '/browse' }
    );
    const links = getByTestId('browse-links');
    const educatorsLink = within(links).getByText(/educators/i);

    // execute
    fireEvent.click(educatorsLink);

    // verify
    await waitForElement(() => getByTestId('browse-educators'));
    expect(getByTestId('browse-educators')).toBeInTheDocument();
  });

  describe('/courses', () => {
    test('displays all courses', async () => {
      // setup
      axios.mockReturnValueOnce(new Promise(
        resolve => resolve({ data: courseData })
      ));

      // execute
      const { getByText } = renderWithProviders(
        BrowseView,
        {
          route: '/browse/courses',
          withinRoute: true,
          routePath: '/browse'
        }
      );

      // verify
      await waitForElement(() => getByText(courseData[0].name));
      courseData.forEach(course => {
        expect(getByText(course.name)).toBeInTheDocument();
      })
    });

    test('enables students see course detail pages', async () => {
      // setup
      axios.mockReturnValueOnce(new Promise(
        resolve => resolve({ data: courseData })
      ));
      const { getByText, getByTestId } = renderWithProviders(
        BrowseView,
        {
          route: '/browse/courses',
          withinRoute: true,
          routePath: '/browse'
        }
      );

      // execute
      await waitForElement(() => getByText(courseData[0].name));
      const courseLink = getByText(courseData[0].name);
      fireEvent.click(courseLink);

      // verify
      const testId = `course-detail-${courseData[0].id}`;
      await waitForElement(() => getByTestId(testId));
      expect(getByTestId(testId)).toBeInTheDocument();
    });

    test('correctly filters courses', async () => {
      // setup
      axios.mockReturnValueOnce(new Promise(
        resolve => resolve({ data: courseData })
      ));
      const {
        getByText,
        getByTestId,
        queryByText,
        getByLabelText
      } = renderWithProviders(
        BrowseView,
        {
          route: '/browse/courses',
          withinRoute: true,
          routePath: '/browse'
        }
      );
      await waitForElement(
        () => getByTestId(`course-list-item-${courseData[0].id}`)
      );
      const filter = getByLabelText(/filter/i);
      const filterText = 'the office';

      // execute
      fireEvent.change(filter, { target: { value: filterText }})
      fireEvent.submit(filter);

      // verify
      await waitForElement(() => getByTestId('active-filter'));
      expect(getByTestId('browse-courses')).toBeInTheDocument();
      expect(getByText(courseData[0].name)).toBeInTheDocument();
      expect(queryByText(courseData[1].name)).not.toBeInTheDocument();
    });
  });

  describe('/educators', () => {
    test('displays all educators', async () => {
      // setup
      axios.mockReturnValueOnce(new Promise(
        resolve => resolve({ data: educatorData })
      ));

      // execute
      const { getByText } = renderWithProviders(
        BrowseView,
        {
          route: '/browse/educators',
          withinRoute: true,
          routePath: '/browse'
        }
      );

      // verify
      await waitForElement(() => getByText(educatorName(educatorData[0])));
      educatorData.forEach(educator => {
        expect(getByText(educatorName(educator))).toBeInTheDocument();
      })
    });

    test('enables students see educator detail pages', async () => {
      // setup
      axios.mockReturnValueOnce(new Promise(
        resolve => resolve({ data: educatorData })
      ));
      const { getByText, getByTestId } = renderWithProviders(
        BrowseView,
        {
          route: '/browse/educators',
          withinRoute: true,
          routePath: '/browse'
        }
      );

      // execute
      const name = educatorName(educatorData[0]);
      await waitForElement(() => getByText(name));
      const educatorLink = getByText(name);
      fireEvent.click(educatorLink);

      // verify
      const testId = `educator-detail-${educatorData[0].id}`;
      await waitForElement(() => getByTestId(testId));
      expect(getByTestId(testId)).toBeInTheDocument();
    });
  });
});

const courseData = [
  {
    id: 1,
    name: 'The Office 101'
  },
  {
    id: 2,
    name: 'Parks and Rec 201'
  }
];

const educatorName = (educator) => (
  `${educator.first_name} ${educator.last_name}`
);

const educatorData = [
  {
    id: 1,
    first_name: 'Michael',
    last_name: 'Scott'
  },
  {
    id: 2,
    first_name: 'Dwight',
    last_name: 'Schrute'
  }
];