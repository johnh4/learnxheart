import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { selectThing, toggleSelect } from './reducers/views';
import { loadEducatorsRequest, loadEducatorRequest } from './actions/educators';
import { getEducators, getEducatorIds } from './reducers/educators';

class Educators extends Component {
  componentDidMount() {
    this.getEducators();
  }

  handleGetEducators = () => {
    this.getEducators();
  }

  handleGetEducator = () => {
    this.getEducator("1");
  }

  async getEducators() {
    this.props.loadEducatorsRequest();
  }

  async getEducator(educatorId) {
    this.props.loadEducatorRequest(educatorId);
  }

  renderEducators() {
    const { educatorIds, educators } = this.props;

    return (
      <div>
        Educator count: {educators.length}
        { educatorIds.map((educatorId) => {
            const educator = educators[educatorId];

            return (
              <div key={educator.id}>
                <div>
                  email: {educator.email}
                </div>
                <div>
                  name: {`${educator.firstName} ${educator.lastName}`}
                </div>
              </div>
            )
            }
          )}
      </div>
    )
  }

  render() {
    const { educatorIds } = this.props;

    return (
      <div>
        <div onClick={this.handleGetEducators}>
          Get Educators
        </div>
        <div onClick={this.handleGetEducator}>
          Get Educator 1
        </div>
        <div>
          { educatorIds.length > 0
            ? this.renderEducators()
            : <div>There aren't any Educators yet.</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.views.selected,
  educators: getEducators(state),
  educatorIds: getEducatorIds(state)
});

export default connect(mapStateToProps, {
  selectThing,
  toggleSelect,
  loadEducatorsRequest,
  loadEducatorRequest
})(Educators);
