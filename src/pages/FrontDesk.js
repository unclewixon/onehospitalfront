/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState } from "react";

import Queue from "../components/Queue";
import Dashboard from "../components/FrontDeskDashboard";
import Appointments from "../components/FrontDeskAppointments";
import Incoming from "../components/Incoming"

const FrontDesk = () => {
	const [ShowDashboard, setDashboard] = useState(true)
	const [ShowAppointment, setAppointment] = useState(false)
	const [ShowIncoming, setIncoming] = useState(false)

	const onDashboard = () => {
		setDashboard(true)
		setAppointment(false)
		setIncoming(false)
	}

	const onAppointment = () => {
		setAppointment(true)
		setDashboard(false)
		setIncoming(false)
	}

	const onIncoming = () => {
		setIncoming(true)
		setDashboard(false)
		setAppointment(false)
	}



  return (
    <div className="content-i">
      <div className="content-box">
        <div className="row">
          <div className="col-sm-12">
            <div className="element-wrapper">
              <div className="os-tabs-w mx-1">
                <div className="os-tabs-controls">
                  <ul className="nav nav-tabs upper">
                    <li className="nav-item">
                      <a
                        aria-expanded="true"
                        className={ShowDashboard ? "nav-link active" : "nav-link"}
                        data-toggle="tab"
                        onClick={onDashboard}
                      >
                        DASHBOARD
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        aria-expanded="false"
                        className={ShowAppointment ? "nav-link active" : "nav-link"}
                        data-toggle="tab"
                        onClick={onAppointment}
                      >
                        APPOINTMENTS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        aria-expanded="false"
                        className={ShowIncoming ? "nav-link active" : "nav-link"}
                        data-toggle="tab"
                        onClick={onIncoming}
                      >
                        INCOMING
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {ShowAppointment === true && (<Appointments />)}
			  {ShowDashboard === true && (<Dashboard />)}
			  {ShowIncoming === true && (<Incoming />)}
            </div>
          </div>
        </div>
      </div>
      <div className="content-panel compact">
        <Queue />
      </div>
    </div>
  );
};

export default FrontDesk;
