import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskItem.css';

class TaskItem extends Component {
  render() {
    const labels = this.props.labels;
    return (
      <div className='task_item'>
        <label className='task_title'>{this.props.title}</label>
        <div className='task_labels'>
          {labels ? labels.map((label, i) => {
            const style = {
              background: '#' + label.color
            };
            return (
              <div style={style} key={i} className='task_label'>
                <label>{label.name}</label>
              </div>);
          }) : null}
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.object)
};

export default TaskItem;