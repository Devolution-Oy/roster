import React from 'react';
import PropTypes from 'prop-types';
import ProjectView from './ProjectView';

import './ProjectContainer.css';

const ProjectContainer = projects => {
  return (
    <div className='project_container'>
      <h2>My Projects</h2>
      <div className='user_projects'>
        {
          projects.projects ? projects.projects.map((project, i) => {
            return <ProjectView key={i} project={project} />;
          }) : null
        }
      </div>
    </div>
  );
};

ProjectContainer.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    github: PropTypes.bool,
    contributors: PropTypes.arrayOf(PropTypes.string).isRequired
  }))
};

export default ProjectContainer;