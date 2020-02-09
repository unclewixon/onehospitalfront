import React from "react";

const Departments = () => {
  return (
    <div className="content-i">
      <div className="content-box">
        <div className="element-wrapper">
          <div className="os-tabs-w mx-1">
            <div className="os-tabs-controls">
              <ul className="nav nav-tabs upper">
                <li className="nav-item">
                  <a
                    aria-expanded="true"
                    className="nav-link active"
                    data-toggle="tab"
                  >
                    Deda Departments
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="element-wrapper">
                <div className="element-box-tp">
                  <div className="table-responsive">
                    <table className="table table-padded">
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Head of Department</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="nowrap">
                            <span className="status-pill smaller green"></span>
                            <span>Clinical Laboratory Department</span>
                          </td>
                          <td>
                            <span>Philip Okudo</span>
                          </td>
                          <td className="row-actions text-right">
                            <a href="#">
                              <i className="os-icon os-icon-ui-49"></i>
                            </a>
                            <a href="#">
                              <i className="os-icon os-icon-grid-10"></i>
                            </a>
                            <a className="danger" href="#">
                              <i className="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="nowrap">
                            <span className="status-pill smaller red"></span>
                            <span>Medicine & Consultation Department</span>
                          </td>
                          <td>
                            <span>Sunday Onuh</span>
                          </td>
                          <td className="row-actions text-right">
                            <a href="#">
                              <i className="os-icon os-icon-ui-49"></i>
                            </a>
                            <a href="#">
                              <i className="os-icon os-icon-grid-10"></i>
                            </a>
                            <a className="danger" href="#">
                              <i className="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="nowrap">
                            <span className="status-pill smaller yellow"></span>
                            <span>Nursing Department</span>
                          </td>
                          <td>
                            <span>Elsie Onwuama</span>
                          </td>
                          <td className="row-actions text-right">
                            <a href="#">
                              <i className="os-icon os-icon-ui-49"></i>
                            </a>
                            <a href="#">
                              <i className="os-icon os-icon-grid-10"></i>
                            </a>
                            <a className="danger" href="#">
                              <i className="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="nowrap">
                            <span className="status-pill smaller yellow"></span>
                            <span>Quality Assurance Department</span>
                          </td>
                          <td>
                            <span>Stella Etubi</span>
                          </td>
                          <td className="row-actions text-right">
                            <a href="#">
                              <i className="os-icon os-icon-ui-49"></i>
                            </a>
                            <a href="#">
                              <i className="os-icon os-icon-grid-10"></i>
                            </a>
                            <a className="danger" href="#">
                              <i className="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="nowrap">
                            <span className="status-pill smaller green"></span>
                            <span>
                              Health Management Organizations Department
                            </span>
                          </td>
                          <td>
                            <span>Joy Onuh</span>
                          </td>
                          <td className="row-actions text-right">
                            <a href="#">
                              <i className="os-icon os-icon-ui-49"></i>
                            </a>
                            <a href="#">
                              <i className="os-icon os-icon-grid-10"></i>
                            </a>
                            <a className="danger" href="#">
                              <i className="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="nowrap">
                            <span className="status-pill smaller yellow"></span>
                            <span>Pharmacy Department</span>
                          </td>
                          <td>
                            <span>Chris Ngigechukwu</span>
                          </td>
                          <td className="row-actions text-right">
                            <a href="#">
                              <i className="os-icon os-icon-ui-49"></i>
                            </a>
                            <a href="#">
                              <i className="os-icon os-icon-grid-10"></i>
                            </a>
                            <a className="danger" href="#">
                              <i className="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3  d-xxl-block">
              <div className="element-wrapper">
                <div className="element-box">
                  <form>
                    <h5 className="element-box-header">Add New Department</h5>
                    <div className="form-group">
                      <label className="lighter" for="">
                        Name of Department
                      </label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <input
                          className="form-control"
                          placeholder="Enter Department Name..."
                          type="text"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">Dept</div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="lighter" for="">
                        Head of Department
                      </label>
                      <select class="form-control">
                        <option value="">Pharmacy</option>
                        <option value="">Clinical Laboratory</option>
                        <option value="">Front-Desk</option>
                      </select>
                    </div>

                    <div className="form-buttons-w text-right compact">
                      <a className="btn btn-primary" href="#">
                        <span>Save</span>
                        <i class="os-icon os-icon-grid-18"></i>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
