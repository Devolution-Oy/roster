import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectConfigs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  componentDidMount() {
    this.setState({project: this.props.project});
  }

  render() {
    return (
      <div className='project_configs'>
        <div id='task_prices'>
          <h5>Task closing prices</h5>
          <label className='configs_label' id='config_label_dev'>dev</label>
          <input className='configs_input' id='config_input_dev' name='dev' type='number' onChange={this.props.change} />
          <label className='configs_label' id='config_label_ux'>UX</label>
          <input className='configs_input' id='config_input_ux' name='ux' type='number' onChange={this.props.change} />
          <label className='configs_label' id='config_label_testautomation'>test automation</label>
          <input className='configs_input' id='config_input_testautomation' name='testautomation' type='number' onChange={this.props.change} />
          <label className='configs_label' id='config_label_bug'>bug</label>
          <input className='configs_input' id='config_input_bug' name='bug' type='number' onChange={this.props.change} />
          <label className='configs_label' id='config_label_documentation'>documentation</label>
          <input className='configs_input' id='config_input_documentation' name='documentation' type='number' onChange={this.props.change} />
          <label className='configs_label' id='config_label_question'>question</label>
          <input className='configs_input' id='config_input_question' name='question' type='number' onChange={this.props.change} />
          <label className='configs_label' id='config_label_design'>design</label>
          <input className='configs_input' id='config_input_design' name='design' type='number' onChange={this.props.change} />
        </div>
        <div id='review_prices'>
          <h5>Review</h5>
          <label className='configs_label' id='config_label_review'>Review</label>
          <input className='configs_input' id='config_input_review' name='review' type='number' onChange={this.props.change} />
        </div>
        <div id='issue_creation'>
          <h5>Issue open</h5>
          <label className='configs_label' id='config_label_accepted'>Accepted</label>
          <input className='configs_input' id='config_input_accepted' name='accepted' type='number' onChange={this.props.change} />
        </div>
      </div>
    );
  }
}

ProjectConfigs.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired, 
    dev: PropTypes.number, 
    ux: PropTypes.number,
    testautomation: PropTypes.number,
    bug: PropTypes.number,
    documentation: PropTypes.number,
    question: PropTypes.number,
    design: PropTypes.number,
    review: PropTypes.number,
    accepted: PropTypes.number,
    contributors: PropTypes.arrayOf(PropTypes.string),
    github: PropTypes.bool
  }),
  change: PropTypes.func.isRequired
};

export default ProjectConfigs;