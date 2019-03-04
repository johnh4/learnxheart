import React from 'react';
import CoursesView from '.';
import { renderWithProviders } from '../../utils/testUtils';

import axios from 'axios';
import {
  within,
  waitForElement,
  fireEvent
} from 'react-testing-library';

jest.mock('axios');

describe('CoursesView Container', () => {
  test('renders without crashing', () => {
    // execute
    const { getByTestId } = renderWithProviders(
      <CoursesView tab="My Courses"/>,
      { initialState: { sessions: { currentUser: { id: 1, token: 'fakeToken' }}} }
    );

    // verify
    expect(getByTestId('my-courses-view')).toBeInTheDocument();
  });

  describe('My Coursess tab', () => {
    describe('when logged in as a student', () => {
      describe('and the student is not following any courses', () => {
        test('displays a link to the browse page', async () => {
          // setup
          axios.mockReturnValue(new Promise(resolve => resolve({ data: courses })))

          // execute
          const { getByTestId } = renderWithProviders(
            <CoursesView tab="My Courses"/>,
            { initialState }
          );

          // verify
          await waitForElement(() => getByTestId('my-courses-view'));
          const notice = getByTestId('notice-card');
          expect(within(notice).getByText('Browse Courses'))
            .toBeInTheDocument();
        });
      })

      describe('and the student follows courses', () => {
        test('only displays the courses the student is following', async () => {
          // setup
          axios.mockReturnValue(new Promise(
            resolve => resolve({ data: coursesWithCourseStudentRelationshps })
          ));

          // execute
          const { getByTestId, getByText, queryByText } = renderWithProviders(
            <CoursesView tab="My Courses"/>,
            { initialState }
          );

          // verify
          await waitForElement(() => getByTestId('course-card'));
          expect(getByText(courses[0].name)).toBeInTheDocument();
          expect(getByText(courses[1].name)).toBeInTheDocument();
          expect(queryByText(courses[2].name)).not.toBeInTheDocument();
          expect(queryByText(courses[3].name)).not.toBeInTheDocument();
        });

        test('correctly filters courses', async () => {
          // setup
          axios.mockReturnValue(new Promise(
            resolve => resolve({ data: coursesWithCourseStudentRelationshps })
          ));
          const {
            getByTestId,
            getByText,
            queryByText,
            getByLabelText
          } = renderWithProviders(
            <CoursesView tab="My Courses"/>,
            { initialState }
          );
          await waitForElement(() => getByTestId('course-card'));
          const filter = getByLabelText(/filter/i);
          const filterText = 'mathematics';

          // execute
          fireEvent.change(filter, { target: { value: filterText }})
          fireEvent.submit(filter);

          // verify
          await waitForElement(() => getByTestId('active-filter'));
          expect(getByTestId('my-courses-view')).toBeInTheDocument();
          expect(getByText(courses[1].name)).toBeInTheDocument();
          expect(queryByText(courses[0].name)).not.toBeInTheDocument();
          expect(queryByText(courses[2].name)).not.toBeInTheDocument();
          expect(queryByText(courses[3].name)).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Browse Courses tab', () => {
    describe('when logged in as a student', () => {
      test('displays all courses', async () => {
        // setup
        axios.mockReturnValue(new Promise(
          resolve => resolve({ data: courses })
        ));

        // execute
        const { getByTestId, getByText, queryByText } = renderWithProviders(
          <CoursesView tab="Browse Courses"/>,
          { initialState }
        );

        //verify
        await waitForElement(() => getByTestId('course-card'));
        expect(getByTestId('browse-courses-view')).toBeInTheDocument();
        expect(getByText(courses[0].name)).toBeInTheDocument();
        const educator = educators[(courses[0].educatorId)];
        expect(
          getByText(`${educator.firstName} ${educator.lastName}`)
        ).toBeInTheDocument();
        expect(getByText(courses[1].name)).toBeInTheDocument();
        expect(queryByText(courses[2].name)).toBeInTheDocument();
        expect(queryByText(courses[3].name)).toBeInTheDocument();
      });

      test('correctly filters courses', async () => {
        // setup
        axios.mockReturnValue(new Promise(
          resolve => resolve({ data: courses })
        ));
        const {
          getByTestId,
          getByText,
          queryByText,
          getByLabelText
        } = renderWithProviders(
          <CoursesView tab="Browse Courses"/>,
          { initialState }
        );
        await waitForElement(() => getByTestId('course-card'));
        const filter = getByLabelText(/filter/i);
        const filterText = 'philosophy';

        // execute
        fireEvent.change(filter, { target: { value: filterText }})
        fireEvent.submit(filter);

        // verify
        await waitForElement(() => getByTestId('active-filter'));
        expect(getByTestId('browse-courses-view')).toBeInTheDocument();
        expect(getByText(courses[0].name)).toBeInTheDocument();
        expect(getByText(courses[2].name)).toBeInTheDocument();
        expect(queryByText(courses[1].name)).not.toBeInTheDocument();
        expect(queryByText(courses[3].name)).not.toBeInTheDocument();
      });

      test('allows you to remove filters', async () => {
        // setup
        axios.mockReturnValue(new Promise(
          resolve => resolve({ data: courses })
        ));
        const {
          getByTestId,
          getByText
        } = renderWithProviders(
          <CoursesView tab="Browse Courses"/>,
          { initialState: initialStateWithFilters }
        );
        await waitForElement(() => getByTestId('active-filter'));
        const activeFilter = getByTestId('active-filter');

        // execute
        fireEvent.click(activeFilter);

        // verify
        await waitForElement(() => getByText(courses[0].name));
        expect(getByTestId('browse-courses-view')).toBeInTheDocument();
        expect(getByText(courses[0].name)).toBeInTheDocument();
        expect(getByText(courses[1].name)).toBeInTheDocument();
        expect(getByText(courses[2].name)).toBeInTheDocument();
        expect(getByText(courses[3].name)).toBeInTheDocument();
      });

      test('allows you to follow courses', async () => {
        // setup
        axios.mockReturnValue(new Promise(
          resolve => resolve({ data: courses })
        ));
        const {
          getByTestId
        } = renderWithProviders(
          <CoursesView tab="Browse Courses"/>,
          { initialState: initialState }
        );
        await waitForElement(() => getByTestId('course-card'));
        const csr = { id: 5, courseId: courses[0].id, studentId: 1 };
        axios.mockReturnValue(new Promise(
          resolve => resolve({ data: csr })
        ));

        // execute
        const card = getByTestId('course-card');
        fireEvent.click(card);
        expect(within(card).getByText('Follow')).toBeInTheDocument();
        const followButton = within(card).getByText('Follow');
        fireEvent.click(followButton);

        // verify
        await waitForElement(() => within(card).getByText('Following'));
        expect(within(card).getByText('Following')).toBeInTheDocument();
      });

      test('allows you to unfollow courses', async () => {
        // setup
        axios.mockReturnValue(new Promise(
          resolve => resolve({ data: coursesWithCourseStudentRelationshps })
        ));
        const {
          getByTestId
        } = renderWithProviders(
          <CoursesView tab="Browse Courses"/>,
          { initialState: initialState }
        );
        await waitForElement(() => getByTestId('course-card'));
        axios.mockReturnValue(new Promise(
          resolve => resolve({ data: { status: 204 } })
        ));

        // execute
        const card = getByTestId('course-card');
        fireEvent.click(card);
        const unfollowButton = within(card).getByText('Following');
        fireEvent.click(unfollowButton);

        // verify
        await waitForElement(() => within(card).getByText('Follow'));
        expect(within(card).getByText('Follow')).toBeInTheDocument();
      });
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