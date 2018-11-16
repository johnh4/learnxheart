import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import  { CourseCardComponent } from '.';
import './styles.scss';
import { AppWrapper } from '../../components/App';

const AppDecorator = (storyFn) => (
  <AppWrapper>{storyFn()}</AppWrapper>
);

const stories = storiesOf('CourseCardComponent', module);

stories.addDecorator(AppDecorator);
stories.addDecorator(withKnobs);

stories.add('With no data', () => (
  <CourseCardComponent />
));

stories.add('A medium card user is following', () => (
  <CourseCardComponent 
    name={text("name", "Intro to Philosophy")}
    educatorName={text("educatorName", "Chelsea Ard")}
    description={text("description", "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?")}
    cardCount={number("cardCount", 45)}
    studentCount={number("studentCount", 30)}
    following={boolean("following", true)}
  />
));

stories.add('A medium card user is not following', () => (
  <CourseCardComponent 
    name={text("name", "Intro to Philosophy")}
    educatorName={text("educatorName", "Chelsea Ard")}
    description={text("description", "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?")}
    cardCount={number("cardCount", 45)}
    studentCount={number("studentCount", 30)}
    following={boolean("following", false)}
  />
));

stories.add('A small card', () => (
  <CourseCardComponent 
    name={text("name", "Intro to Philosophy")}
    educatorName={text("educatorName", "Chelsea Ard")}
    description={text("description", "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?")}
    cardCount={number("cardCount", 45)}
    studentCount={number("studentCount", 30)}
    size={text("size", "s")}
    following={boolean("following", true)}
  />
));

stories.add('A small card user is not following', () => (
  <CourseCardComponent 
    name={text("name", "Intro to Philosophy")}
    educatorName={text("educatorName", "Chelsea Ard")}
    description={text("description", "What is most real? Do humans have free will?")}
    cardCount={number("cardCount", 45)}
    studentCount={number("studentCount", 30)}
    size={text("size", "s")}
    following={boolean("following", false)}
  />
));

stories.add('A small card with a long description', () => (
  <CourseCardComponent 
    name={text("name", "Intro to Philosophy")}
    educatorName={text("educatorName", "Chelsea Ard")}
    description={text("description", "What is most real? Do humans have free will? Is there a best way to live? Is it better to be just or unjust (if one can get away with it)?")}
    cardCount={number("cardCount", 45)}
    studentCount={number("studentCount", 30)}
    size={text("size", "s")}
    following={boolean("following", true)}
  />
));