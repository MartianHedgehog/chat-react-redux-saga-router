import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-chat-elements';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { push } from 'connected-react-router';
import { disconnectFromServer } from '../store/modules/connection';
// eslint-disable-next-line no-unused-vars
import SettingsMenu from './SettingsMenu';
// eslint-disable-next-line no-unused-vars
import ListOfDialogs from './ListOfDialogs';
import './SideMenu.css';

const SideMenu = () => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(true);

  const openSettingsHandler = () => {
    setSettingsIsOpen(!settingsIsOpen);
  };

  return (
    <div className="side-menu">
      <Button
        text={settingsIsOpen ? 'Dialogs' : 'Settings'}
        type="Button"
        onClick={() => openSettingsHandler()}
      />
      <div className="div-container">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={settingsIsOpen}
            classNames="fade"
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
          >
            {settingsIsOpen ? <ListOfDialogs /> : <SettingsMenu />}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { dialogs } = state;
  return {
    dialogs,
  };
};

export default connect(mapStateToProps, { push, disconnectFromServer })(SideMenu);
