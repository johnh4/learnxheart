import React from 'react';
import { storiesOf } from '@storybook/react';
import TaggedIllustration from '.';
import './styles.scss';
import { AppWrapper } from '../../components/App';
import heartBoard from '../../images/heart board.svg';
import betaTag from '../../images/beta tag.svg';
import authentication from '../../images/authentication.svg';

const stories = storiesOf('TaggedIllustration', module);

stories.add('The hero illustration with a beta tag', () => (
  <TaggedIllustration tag={betaTag}>
    <img
      src={heartBoard}
      className="Hero__illustration-main"
      alt={"Educator at a white board"}
    />
  </TaggedIllustration>
));

stories.add('The sign in illustration with a beta tag', () => (
  <AppWrapper userSignedIn={true}>
    <TaggedIllustration tag={betaTag}>
      <img
        src={authentication}
        className="SignInView__illustration"
        alt="Person signing in"
      />
    </TaggedIllustration>
  </AppWrapper>
));