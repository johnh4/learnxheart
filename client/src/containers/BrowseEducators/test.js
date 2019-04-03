import React from 'react';
import BrowseEducators from '.';
import { renderWithProviders } from '../../utils/testUtils';

import axios from 'axios';
import {
  within,
  waitForElement,
  fireEvent
} from 'react-testing-library';

jest.mock('axios');

const renderBrowseEducators = (state = {}, educatorId = null) => {
  const route = educatorId
    ? `/browse/educators/${educatorId}`
    : '/browse/educators'
  return renderWithProviders(
    BrowseEducators,
    {
      route: route,
      routePath: '/browse/educators',
      withinRoute: true,
      initialState: state
    }
  );
}

describe('BrowseEducators Container', () => {
  test('renders without crashing', () => {
    // execute
    const { getByTestId } = renderBrowseEducators();

    // verify
    expect(getByTestId('browse-educators')).toBeInTheDocument();
  });

  describe('Following', () => {
    test('allows you to follow educators', async () => {
      // setup
      // a educator that currentUser is not following
      const educator = educators[0];
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: educators })
      ));
      // axios.mockReturnValue(new Promise(
      //   resolve => resolve({ data: educator })
      // ));
      const {
        getByText,
        getByTestId
      } = renderBrowseEducators(initialState, educator.id);
      await waitForElement(() => getByText(getEducatorName(educator)));

      const esr = { id: 5, educatorId: educator.id, studentId: 1 };
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: esr })
      ));

      // execute
      const cardTestId = `educator-detail-${educator.id}`;
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

    test('allows you to unfollow educators', async () => {
      // setup
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: educatorsWithEducatorStudentRelationshps })
      ));
      // a educator that currentUser is following
      const educator = educators[0];
      const {
        getByText,
        getByTestId
      } = renderBrowseEducators(initialState, educator.id);
      await waitForElement(() => getByText(getEducatorName(educator)));
      axios.mockReturnValue(new Promise(
        resolve => resolve({ data: { status: 204 } })
      ));

      // execute
      const cardTestId = `educator-detail-${educator.id}`;
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


// const educators = [
//   {
//     id: 1,
//     name: "Intro to Philosophy",
//     educatorName: "Chelsea Ard",
//     educatorId: 9,
//     description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
//     cardCount: 45,
//     studentCount: 30,
//     following: true
//   },
//   {
//     id: 2,
//     name: "Mathematics 101",
//     educatorName: "Carlton Banks",
//     educatorId: 10,
//     description:  "Math is good, math is great. Math is nice, math oh boy. This is some mathy content. It's easy.",
//     cardCount: 20,
//     studentCount: 50,
//     following: true
//   },
//   {
//     id: 3,
//     name: "Philosophy 201",
//     educatorName: "Chelsea Ard",
//     educatorId: 9,
//     description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
//     cardCount: 55,
//     studentCount: 15,
//     following: false
//   },
//   {
//     id: 4,
//     name: "Mathematics 201",
//     educatorName: "Carlton Banks",
//     educatorId: 10,
//     description:  "Mathematics includes the study of such topics as quantity, structure, space, and change. Mathematicians seek and use patterns to formulate new conjectures.",
//     cardCount: 30,
//     studentCount: 25,
//     following: false
//   }
// ];

// const educatorsWithEducatorStudentRelationshps = [
//   {
//     id: 1,
//     name: "Intro to Philosophy",
//     educatorName: "Chelsea Ard",
//     educatorId: 9,
//     description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
//     cardCount: 45,
//     studentCount: 30,
//     following: true,
//     educatorStudentRelationships: [
//       {
//         id: 1,
//         studentId: 1,
//         educatorId: 1
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: "Mathematics 101",
//     educatorName: "Carlton Banks",
//     educatorId: 10,
//     description:  "Math is good, math is great. Math is nice, math oh boy. This is some mathy content. It's easy.",
//     cardCount: 20,
//     studentCount: 50,
//     following: true,
//     educatorStudentRelationships: [
//       {
//         id: 2,
//         studentId: 1,
//         educatorId: 2
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: "Philosophy 201",
//     educatorName: "Chelsea Ard",
//     educatorId: 9,
//     description:  "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?",
//     cardCount: 55,
//     studentCount: 15,
//     following: false
//   },
//   {
//     id: 4,
//     name: "Mathematics 201",
//     educatorName: "Carlton Banks",
//     educatorId: 10,
//     description:  "Mathematics includes the study of such topics as quantity, structure, space, and change. Mathematicians seek and use patterns to formulate new conjectures.",
//     cardCount: 30,
//     studentCount: 25,
//     following: false
//   }
// ];

const getEducatorName = (educator) => (
  `${educator.firstName} ${educator.lastName}`
);

const educators = [
  {
    id: 9,
    firstName: "Chelsea",
    lastName: "Ard",
  },
  {
    id: 10,
    firstName: "Carlton",
    lastName: "Banks",
  },
  {
    id: 11,
    firstName: "Will",
    lastName: "Smith"
  }
];

const educatorsWithEducatorStudentRelationshps = [
  {
    id: 9,
    firstName: "Chelsea",
    lastName: "Ard",
    educatorStudentRelationships: [
      {
        id: 1,
        studentId: 1,
        educatorId: 9
      }
    ]
  },
  {
    id: 10,
    firstName: "Carlton",
    lastName: "Banks",
    educatorStudentRelationships: [
      {
        id: 2,
        studentId: 1,
        educatorId: 10
      }
    ]
  },
  {
    id: 11,
    firstName: "Will",
    lastName: "Smith"
  }
];


// const educators = {
//   "9":  { id: 9, firstName: "Chelsea", lastName: "Ard" },
//   "10": { id: 10, firstName: "Carlton", lastName: "Banks" }
// }

const initialState = {
  entities: {
    // educators,
  },
  sessions: {
    currentUser: {
      id: 1,
      token: "fake",
      type: "Student"
    }
  }
}