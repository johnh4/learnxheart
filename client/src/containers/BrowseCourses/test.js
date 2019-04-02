import React from 'react';
import BrowseCourses from '.';
import { renderWithProviders } from '../../utils/testUtils';

import axios from 'axios';
import {
  within,
  waitForElement,
  fireEvent
} from 'react-testing-library';

jest.mock('axios');

const renderBrowseCourses = (state = {}, courseId = null) => {
  const route = courseId
    ? `/browse/courses/${courseId}`
    : '/browse/courses'
  return renderWithProviders(
    BrowseCourses,
    {
      route: route,
      routePath: '/browse/courses',
      withinRoute: true,
      initialState: state
    }
  );
}

describe('BrowseCourses Container', () => {
  test('renders without crashing', () => {
    // execute
    const { getByTestId } = renderBrowseCourses();

    // verify
    expect(getByTestId('browse-courses')).toBeInTheDocument();
  });

  describe('Following', () => {
    test('allows you to follow courses', async () => {
      // setup
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: courses })
      ));
      // a course that currentUser is not following
      const course = courses[2];
      const {
        getByText,
        getByTestId
      } = renderBrowseCourses(initialState, course.id);
      await waitForElement(() => getByText(course.name));

      const csr = { id: 5, courseId: course.id, studentId: 1 };
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: csr })
      ));

      // execute
      const cardTestId = `course-detail-${course.id}`;
      await waitForElement(() => getByTestId(cardTestId));
      const card = getByTestId(cardTestId);
      expect(within(card).getByText(/follow/i)).toBeInTheDocument();
      expect(
        within(card).queryByText(/following/i)
      ).not.toBeInTheDocument();
      const followButton = within(card).getByText(/follow/i);
      fireEvent.click(followButton);

      // verify
      await waitForElement(
        () => within(getByTestId(cardTestId)).getByText(/following/i)
      );
      expect(within(getByTestId(cardTestId)).getByText(/following/i)).toBeInTheDocument();
    });

    test('allows you to unfollow courses', async () => {
      // setup
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: coursesWithCourseStudentRelationshps })
      ));
      // a course that currentUser is following
      const course = courses[0];
      const {
        getByText,
        getByTestId
      } = renderBrowseCourses(initialState, course.id);
      await waitForElement(() => getByText(course.name));
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: { status: 204 } })
      ));

      // execute
      const cardTestId = `course-detail-${course.id}`;
      await waitForElement(() => getByTestId(cardTestId));
      const card = getByTestId(cardTestId);
      expect(within(card).getByText(/following/i)).toBeInTheDocument();
      const unfollowButton = within(card).getByText(/following/i);
      fireEvent.click(unfollowButton);

      // verify
      await waitForElement(
        () => within(getByTestId(cardTestId)).getByText(/follow$/i)
      );
      expect(within(getByTestId(cardTestId)).getByText(/follow$/i)).toBeInTheDocument();
      expect(
        within(getByTestId(cardTestId)).queryByText(/following/i)
      ).not.toBeInTheDocument();
    });
  });
});


const courses = [
  {
    id: 1,
    name: "Intro to Philosophy",
    educatorName: "Chelsea Ard",
    educatorId: 9,
    description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
    cardCount: 45,
    studentCount: 30,
    following: true
  },
  {
    id: 2,
    name: "Mathematics 101",
    educatorName: "Carlton Banks",
    educatorId: 10,
    description:  "Math is good, math is great. Math is nice, math oh boy. This is some mathy content. It's easy.",
    cardCount: 20,
    studentCount: 50,
    following: true
  },
  {
    id: 3,
    name: "Philosophy 201",
    educatorName: "Chelsea Ard",
    educatorId: 9,
    description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
    cardCount: 55,
    studentCount: 15,
    following: false
  },
  {
    id: 4,
    name: "Mathematics 201",
    educatorName: "Carlton Banks",
    educatorId: 10,
    description:  "Mathematics includes the study of such topics as quantity, structure, space, and change. Mathematicians seek and use patterns to formulate new conjectures.",
    cardCount: 30,
    studentCount: 25,
    following: false
  }
];

const coursesWithCourseStudentRelationshps = [
  {
    id: 1,
    name: "Intro to Philosophy",
    educatorName: "Chelsea Ard",
    educatorId: 9,
    description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
    cardCount: 45,
    studentCount: 30,
    following: true,
    courseStudentRelationships: [
      {
        id: 1,
        studentId: 1,
        courseId: 1
      }
    ]
  },
  {
    id: 2,
    name: "Mathematics 101",
    educatorName: "Carlton Banks",
    educatorId: 10,
    description:  "Math is good, math is great. Math is nice, math oh boy. This is some mathy content. It's easy.",
    cardCount: 20,
    studentCount: 50,
    following: true,
    courseStudentRelationships: [
      {
        id: 2,
        studentId: 1,
        courseId: 2
      }
    ]
  },
  {
    id: 3,
    name: "Philosophy 201",
    educatorName: "Chelsea Ard",
    educatorId: 9,
    description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
    cardCount: 55,
    studentCount: 15,
    following: false
  },
  {
    id: 4,
    name: "Mathematics 201",
    educatorName: "Carlton Banks",
    educatorId: 10,
    description:  "Mathematics includes the study of such topics as quantity, structure, space, and change. Mathematicians seek and use patterns to formulate new conjectures.",
    cardCount: 30,
    studentCount: 25,
    following: false
  }
];

const educators = {
  "9":  { id: 9, firstName: "Chelsea", lastName: "Ard" },
  "10": { id: 10, firstName: "Carlton", lastName: "Banks" }
}

const initialState = {
  entities: {
    educators,
  },
  sessions: {
    currentUser: {
      id: 1,
      token: "fake",
      type: "Student"
    }
  }
}

const initialStateWithFilters = {
  entities: {
    educators,
  },
  sessions: {
    currentUser: {
      id: 1,
      token: "fake",
      type: "Student"
    }
  },
  views: {
    filters: {
      courses: [courses[0].name]
    }
  }
}
