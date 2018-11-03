import educatorsReducer from '../educators';
import * as actions from '../../actions/educators';

describe('educatorsReducer', () => {
  it("loadEducatorsSuccess loads multiple educators into the store", function() {
    const initialState = {};
    const educatorId = 1;
    const educator2Id = 2;
    const educator = { id: educatorId, email: "test@example.com" };
    const educator2 = { id: educator2Id, email: "test2@example.com" };
    const educators = { [educatorId]: educator, [educator2Id]: educator2 };
    const action = actions.loadEducatorsSuccess(educators);

    let newState = educatorsReducer(initialState, action);

    expect(newState[educatorId]).toEqual(educator);
    expect(newState[educator2Id]).toEqual(educator2);
  });

  it("loadEducatorsSuccess loads a single educator into the store", function() {
    const initialState = {};
    const educatorId = 1;
    const educator = { id: educatorId, email: "test@example.com" };
    const educators = { [educatorId]: educator };
    const action = actions.loadEducatorsSuccess(educators);

    let newState = educatorsReducer(initialState, action);

    expect(newState[educatorId]).toEqual(educator);
  });
});