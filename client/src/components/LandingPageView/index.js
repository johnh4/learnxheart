import React from 'react';
import { Link } from 'react-router-dom';
import TaggedIllustration from '../TaggedIllustration';
import Step from './Step';
import Footer from './Footer';
import Logo from '../Logo';
import {
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cardStack from '../../images/card stack.svg';
import emailBlast from '../../images/email blast.svg';
import heartBoard from '../../images/heart board.svg';
import studentsAtDesk from '../../images/students at desk.svg';
import studyCards from '../../images/study cards.svg';
import betaTag from '../../images/beta tag.svg';
import './styles.scss';

function LandingPageView() {
  return (
    <div className="LandingPageView App__landing-page-view"
      data-testid="landing-page-view"
    >
      <div className="LandingPageView__fold">
        <div className="LandingPageView__logo-back">
          <Link to='/' className='Link LandingPageView__logo-link'>
            <Logo />
          </Link>
        </div>
        {/* Hero */}
        <div className="Hero LandingPageView__hero">
          {/* Hero copy */}
          <div className="Hero__copy">
            <h1>Learning that lasts</h1>
            <h6>
              Software that helps your students remember the right thing at the right time
            </h6>
            <Link to='/sign-in' className='Link LandingPageView__cta Hero__cta '>
                GET STARTED <FontAwesomeIcon icon={faAngleRight} />
            </Link>
          </div>

          {/* Illustration */}
          <TaggedIllustration tag={betaTag}>
            <img src={heartBoard} className="Hero__illustration-main" alt={"Educator at a black board"} />
          </TaggedIllustration>
        </div>
      </div>

      {/* Steps */}
      <div className="Steps LandingPageView__steps">
        <h1>How to Get Started</h1>
        <div className="LandingPageView__divider"></div>
        <Step
          number={1}
          stepText={"Create your courses"}
          headline="Students study the right material"
          subheadline="These virtual flashcard will help students remember what they learn"
          classes="LandingPageView__step"
          illustration={cardStack}
        />
        <Step
          number={2}
          stepText={"Invite your students"}
          headline="Build your classroom"
          subheadline="Give your students the sign up link, and they'll be able to join easily"
          classes="LandingPageView__step"
          illustration={emailBlast}
        />
        <Step
          number={3}
          stepText={"Students study your content"}
          headline="Students study better"
          subheadline="Our algorithm determines when a student is likely to forget a given card, then shows it to them before they do"
          classes="LandingPageView__step"
          illustration={studyCards}
        />
        <Step
          number={4}
          stepText={"We'll do the rest"}
          headline="Your students will be ready"
          subheadline="When the time comes, your students will be ready"
          classes="LandingPageView__step"
          illustration={studentsAtDesk}
        />
      </div>

      {/* CTA */}
      <Link to='/sign-in' className='Link LandingPageView__cta LandingPageView__final-cta'>
          GET STARTED <FontAwesomeIcon icon={faAngleRight} />
      </Link>

      {/* Footer */}
      <Footer classes="LandingPageView__footer" />
    </div>
  );
}

export default LandingPageView;
