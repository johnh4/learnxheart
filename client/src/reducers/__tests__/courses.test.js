import coursesReducer from '../courses';
import rootReducer from '../index';
import * as actions from '../../actions/courses';

describe('coursesReducer', () => {
  it("loadCoursesSuccess loads multiple courses into the store", () => {
    const initialState = {};
    const courseId = 1;
    const course2Id = 2;
    const course = { id: courseId, email: "test@example.com" };
    const course2 = { id: course2Id, email: "test2@example.com" };
    const courses = { [courseId]: course, [course2Id]: course2 };
    const entities = { courses };
    const action = actions.loadCoursesSuccess(entities);

    let newState = coursesReducer(initialState, action);

    expect(newState[courseId]).toEqual(course);
    expect(newState[course2Id]).toEqual(course2);
  });

  it("loadCoursesSuccess loads a single course into the store", () => {
    const initialState = {};
    const courseId = 1;
    const course = { id: courseId, email: "test@example.com" };
    const courses = { [courseId]: course };
    const entities = { courses };
    const action = actions.loadCoursesSuccess(entities);

    let newState = coursesReducer(initialState, action);

    expect(newState[courseId]).toEqual(course);
  });

  it("loadCoursesSuccess loads courseStudentRelationship assocations", () => {
    const initialState = {};
    const courseId = 1;
    const course = { id: courseId, email: "test@example.com" };
    const courses = { [courseId]: course };
    const relId = 2;
    const rel = { id: relId, courseId: 1, studentId: 5};
    const courseStudentRelationships = { [relId]: rel }
    const entities = { courses, courseStudentRelationships };
    const action = actions.loadCoursesSuccess(entities);

    let newState = rootReducer(initialState, action);

    expect(newState.entities.courses[courseId]).toEqual(course);
    expect(newState.entities.courseStudentRelationships[relId]).toEqual(rel);
  });
});
