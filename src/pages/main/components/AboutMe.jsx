import React from 'react';
import styled from 'styled-components';

const AboutMe = () => {
  return (
    <AboutSection id="about">
      <div className="about-wrapper">
        <h2>About Me</h2>
        <div className="profile-summary">
          <p>I am a frontend web application developer with the following tech stack:  HTML, CSS, Tailwind CSS, JavaScript, and React JS. I also have skills in planning, collaboration and teamwork, effective communication and customer relationship management.</p>
          <p>I specialize in creating responsive, pixel-perfect, user-friendly interfaces for web applications with the singular purpose of ensuring great end-user experience. Implemented web applications are responsive and accessible on all platforms - desktops, tablets, and mobile.</p>
          <p>You may check out some of my work <a href="#portfolio">below</a>.</p>
        </div> 
      </div>
    </AboutSection>
  )
}

export default AboutMe;

const AboutSection = styled.section`
height: auto;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding: 1rem;
background: rgb(10, 14, 23);
color: whitesmoke;

.about-wrapper {
  max-width: 750px;
  display: flex;
  flex-direction: column;
  text-align: justify;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

  h2 {
    text-align: center;
    margin: 2rem auto;
  }

  .profile-summary {
    line-height: 1.625rem;
  }

  a {
    color: gray;
    &:hover {
      text-decoration: underline;
    }
  }
}

@media(max-width: 600px) {
  padding-top: 3rem;
}
`;









