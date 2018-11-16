import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectThing, toggleSelect } from './reducers/views';

class List extends Component {
  handleSelect = (e) => {
    this.props.selectThing();
    e.preventDefault();
  }

  handleToggle = (e) => {
    this.props.toggleSelect();
    e.preventDefault();
  }

  renderSelected() {
    const { selected } = this.props

    return (
        selected === true
          ? <div>Selected: True </div>
          : <div>Selected: False </div>
    )
  }

  render() {
    return (
      <div>
        <div onClick={this.handleSelect}>
          <p>Click me.</p>
          <div>
            {this.renderSelected()}
          </div>
        </div>
        <div onClick={this.handleToggle}>
            Toggle
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.views.selected
});

export default connect(mapStateToProps, {
  selectThing,
  toggleSelect
})(List);
