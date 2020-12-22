import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectConfigs extends Component {
  render() {
    const dev = this.props.dev;
    const ux = this.props.ux;
    const testautomation = this.props.testautomation;
    const bug = this.props.bug;
    const documentation = this.props.documentation;
    const question = this.props.question;
    const design = this.props.design;
    const review = this.props.review;
    const accepted = this.props.accepted;
    return (
      <div className='project_configs'>
        <div id='task_prices'>
          <h5>Task closing prices</h5>
          <label className='configs_label' id='config_label_dev'>dev</label>
          <input className='configs_input' id='config_input_dev' name='dev' type='number' onChange={this.props.change} value={Number(dev).toFixed(2)} />
          <label className='configs_label' id='config_label_ux'>UX</label>
          <input className='configs_input' id='config_input_ux' name='ux' type='number' onChange={this.props.change} value={Number(ux).toFixed(2)} />
          <label className='configs_label' id='config_label_testautomation'>test automation</label>
          <input className='configs_input' id='config_input_testautomation' name='testautomation' type='number' onChange={this.props.change} value={Number(testautomation).toFixed(2)} />
          <label className='configs_label' id='config_label_bug'>bug</label>
          <input className='configs_input' id='config_input_bug' name='bug' type='number' onChange={this.props.change} value={Number(bug).toFixed(2)} />
          <label className='configs_label' id='config_label_documentation'>documentation</label>
          <input className='configs_input' id='config_input_documentation' name='documentation' type='number' onChange={this.props.change} value={Number(documentation).toFixed(2)} />
          <label className='configs_label' id='config_label_question'>question</label>
          <input className='configs_input' id='config_input_question' name='question' type='number' onChange={this.props.change} value={Number(question).toFixed(2)} />
          <label className='configs_label' id='config_label_design'>design</label>
          <input className='configs_input' id='config_input_design' name='design' type='number' onChange={this.props.change} value={Number(design).toFixed(2)} />
        </div>
        <div id='review_prices'>
          <h5>Review</h5>
          <label className='configs_label' id='config_label_review'>Review</label>
          <input className='configs_input' id='config_input_review' name='review' type='number' onChange={this.props.change} value={Number(review).toFixed(2)} />
        </div>
        <div id='issue_creation'>
          <h5>Issue open</h5>
          <label className='configs_label' id='config_label_accepted'>Accepted</label>
          <input className='configs_input' id='config_input_accepted' name='accepted' type='number' onChange={this.props.change} value={Number(accepted).toFixed(2)}  />
        </div>
      </div>
    );
  }
}

ProjectConfigs.propTypes = {
  dev: PropTypes.number.isRequired,
  ux: PropTypes.number.isRequired,
  testautomation: PropTypes.number.isRequired,
  bug: PropTypes.number.isRequired,
  documentation: PropTypes.number.isRequired,
  question: PropTypes.number.isRequired,
  design: PropTypes.number.isRequired,
  review: PropTypes.number.isRequired,
  accepted: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired
};

export default ProjectConfigs;