/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { request } from "../../services/utilities";
import { API_URI } from "../../services/constants";
import searchingGIF from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';

const Appointment = () => {

  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    getAppointments();
  }, [])

  async function getAppointments() {
    try {
			const res = await request(`${API_URI}/front-desk/appointments/today`, 'GET', true);
      setAppointments(res); 
      setLoading(false);
		} catch (e) {
      setLoading(false);      
      notifyError(e.message || 'could not fetch appointments');
		}
  }
  return (
    <div className="tab-content">
      <div className="tab-pane active show" id="tab_overview">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-12">
                <div className="element-wrapper">
                  <div className="element-actions">
                    <form className="form-inline justify-content-sm-end">
                      <select className="form-control form-control-sm">
                        <option value="Pending">Today</option>
                        <option value="Active">Last Week </option>
                        <option value="Cancelled">Last 30 Days</option>
                      </select>
                    </form>
                  </div>
                  <div className="element-box-tp">
                    <div className="table-responsive">
                      <table className="table table-padded">
                        <thead>
                          <tr>
                            <th>Patient</th>
                            <th>Whom to see</th>
                            <th className="text-left">Satus</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="4" className="text-center">
                                <img alt="searching" src={searchingGIF} />
                              </td>
                            </tr>
                          ):(
                          appointments.map((appointment, i) => (
                            <tr key={i}>
                              <td>
                                <span>{`${appointment.patient.surname}, ${appointment.patient.other_names}`}</span>
                                <span className="smaller lighter">{appointment.patient.fileNumber}</span>
                              </td>
                              <td className="cell-with-media">
                                <span>
                                  {`${appointment.specialization.name} (${appointment.department.name})`}
                                </span>
                              </td>
                              <td className="nowrap">
                                <span className="status-pill smaller green"></span>
                                <span>Complete</span>
                              </td>
                              <td className="row-actions">
                                <a href="#">
                                  <i className="os-icon os-icon-folder"></i>
                                </a>
                                {/* <a
                                  href="#"
                                  data-target=".bd-example-modal-lg"
                                  data-toggle="modal"
                                >
                                  <i className="os-icon os-icon-user"></i>
                                </a>
                                <a className="danger" href="#">
                                  <i className="os-icon os-icon-ui-15"></i>
                                </a> */}
                              </td>
                            </tr>
                          )))}
                        </tbody>
                      </table>
                      <div className="controls-below-table">
                        <div className="table-records-info">
                          Showing records 1 - 5
                        </div>
                        <div className="table-records-pages">
                          <ul>
                            <li>
                              <a href="#">Previous</a>
                            </li>
                            <li>
                              <a className="current" href="#">
                                1
                              </a>
                            </li>
                            <li>
                              <a href="#">2</a>
                            </li>
                            <li>
                              <a href="#">3</a>
                            </li>
                            <li>
                              <a href="#">4</a>
                            </li>
                            <li>
                              <a href="#">Next</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Appointment;
