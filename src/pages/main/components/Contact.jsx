import styled from "styled-components"
import { LinkedIn, MailOutline, GitHub, Visibility } from '@mui/icons-material';
import { Tooltip } from "@mui/material";

const Contact = () => {
  return (
    <ContactComp id="contact">
      <div className="contact-me">
        <h2>Connect via </h2>
        <div className="contact-method">
          <div className="tip">
            <Tooltip title="Send me an email">
              <a href="mailto:oluseun.oladiipo@gmail.com">
                <MailOutline className="contact-icon" />
              </a>
            </Tooltip>
          </div>
          <div className="tip">
            <Tooltip title="View my LinkedIn profile">
              <a href="https://www.linkedin.com/in/oluseun-oladiipo-58a80491/" target="_blank" rel="noreferrer">
                <LinkedIn className="contact-icon" />
              </a>
            </Tooltip>
          </div>
          <div className="break"></div>
          <div className="tip">
            <Tooltip title="View my github profile">
              <a href="https://github.com/oluseunakintayo" target="_blank" rel="noreferrer">
                <GitHub className="contact-icon" />
              </a>
            </Tooltip>
          </div>
          <div className="tip">
            <Tooltip title="View my resume">
              <a href="/docs/Oluseun_Oladiipo_Resume.pdf" target="_blank" rel="noreferrer">
                <Visibility className="contact-icon" />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </ContactComp>
  )
}

export default Contact

const ContactComp = styled.section`
padding: 1rem;

.contact-method {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-me h2 {
  margin: 2rem 0;
  text-align: center;
}

.tip {
  margin: 0.75rem;
  transition: ease-in-out 0.3s;
  .contact-icon {
    font-size: 3.5rem;
    border: 1px solid rgba(245, 245, 245, 0.3);
    padding: 0.375rem;
    border-radius: 0.25rem;
    transition: ease-in-out 0.3s;
    &:hover {
      background: rgba(245, 245, 245, 0.1);
      border: transparent;
    }
  }
}

.break {
  display: none;
}

@media (max-width: 360px) {
  .tip {
    margin: 0.375rem;
  }
}
`;