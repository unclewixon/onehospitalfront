/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";

import { closeModals } from "../../actions/general";

class ModalViewPayPoint extends Component {
  componentDidMount() {
    document.body.classList.add("modal-open");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  render() {
    return (
      <div
        className='onboarding-modal modal fade animated show'
        role='dialog'
        style={{ display: "block" }}
      >
        <div className='modal-dialog modal-lg modal-centered' role='document'>
          <div className='modal-content text-center'>
            <button
              aria-label='Close'
              className='close'
              type='button'
              onClick={() => this.props.closeModals(false)}
            >
              <span className='os-icon os-icon-close'></span>
            </button>
            <div className='onboarding-content with-gradient'>
              <h6 className='element-header my-5'>Pay Point detail</h6>
              <div className='table table-responsive'>
                <table
                  id='table'
                  className='table table-theme v-middle table-hover'
                >
                  <thead>
                    <tr>
                      <th data-field='id'>
                        <div className='th-inner sortable both'>FOLDER ID</div>
                        <div className='fht-cell'></div>
                      </th>
                      <th data-field='owner'>
                        <div className='th-inner sortable both'>
                          PRESCRIPTION
                        </div>
                        <div className='fht-cell'></div>
                      </th>
                      <th data-field='project'>
                        <div className='th-inner sortable both'>
                          DON'T KNOW YET
                        </div>
                        <div className='fht-cell'></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-index='0' data-id='20'>
                      <td>
                        <a>
                          <span className='w-32 avatar gd-warning'>
                            IN32456789
                          </span>
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>
                          Netflix hackathon
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>blood</a>
                      </td>
                    </tr>
                    <tr data-index='0' data-id='20'>
                      <td>
                        <a>
                          <span className='w-32 avatar gd-warning'>
                            IN32456789
                          </span>
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>
                          Netflix hackathon
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>blood</a>
                      </td>
                    </tr>

                    <tr data-index='0' data-id='20'>
                      <td>
                        <a>
                          <span className='w-32 avatar gd-warning'>
                            IN32456789
                          </span>
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>
                          Netflix hackathon
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>blood</a>
                      </td>
                    </tr>

                    <tr data-index='0' data-id='20'>
                      <td>
                        <a>
                          <span className='w-32 avatar gd-warning'>
                            IN32456789
                          </span>
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>
                          Netflix hackathon
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>blood</a>
                      </td>
                    </tr>

                    <tr data-index='0' data-id='20'>
                      <td>
                        <a>
                          <span className='w-32 avatar gd-warning'>
                            IN32456789
                          </span>
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>
                          Netflix hackathon
                        </a>
                      </td>
                      <td className='flex'>
                        <a className='item-title text-color'>blood</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { closeModals })(ModalViewPayPoint);
