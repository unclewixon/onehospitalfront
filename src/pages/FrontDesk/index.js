/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  registerNewPatient,
  createNewAppointment
} from "../../actions/general";
import { Switch, Route } from "react-router-dom";
import Queue from "../../components/Queue";
import Dashboard from "../../components/FrontDesk/FrontDeskDashboard";
import Appointments from "../../components/FrontDesk/FrontDeskAppointments";
import Incoming from "../../components/FrontDesk/Incoming";

import NoMatch from "../NoMatch";
import PayPointPage from "./PayPoint";

const FrontDesk = props => {
  const [ShowDashboard, setDashboard] = useState(true);
  const [ShowAppointment, setAppointment] = useState(false);
  const [ShowIncoming, setIncoming] = useState(false);
  const { match, location } = props;

  const page = location.pathname.split("/").pop();

  const onDashboard = () => {
    setDashboard(true);
    setAppointment(false);
    setIncoming(false);
  };

  const onAppointment = () => {
    setAppointment(true);
    setDashboard(false);
    setIncoming(false);
  };

  const onIncoming = () => {
    setIncoming(true);
    setDashboard(false);
    setAppointment(false);
  };

  const RegisterNewPatient = e => {
    e.preventDefault();
    props.registerNewPatient(true);
  };

  const CreateNewAppointment = e => {
    e.preventDefault();
    props.createNewAppointment(true);
  };

  return (
    <div className='content-i'>
      <div className='content-box'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='element-wrapper'>
              <div className='element-actions'>
                <button
                  className='btn btn-primary'
                  type='submit'
                  onClick={RegisterNewPatient}
                >
                  <i className='os-icon os-icon-plus'></i>
                  Add New Patient
                </button>
                <button
                  className='btn btn-primary'
                  type='submit'
                  onClick={CreateNewAppointment}
                >
                  <i className='os-icon os-icon-plus'></i>
                  New Appointment
                </button>
              </div>
              <h6 className='element-header mb-3'>TODAY's APPOINTMENTS</h6>
              <Switch>
                <Route exact path={`${match.url}/`} component={Appointments} />
                <Route
                  path={`${match.url}/paypoint`}
                  component={PayPointPage}
                />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <div className='content-panel compact'>
        <Queue />
      </div>
    </div>
  );
};

export default connect(null, { registerNewPatient, createNewAppointment })(
  FrontDesk
);
