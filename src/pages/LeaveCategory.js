import React from "react";

const LeaveCategory = () => {
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
                    Leave categories
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
              <div className="col-lg-8">
              <div className="row">
            <div class="col-lg-4 col-xxl-3">
              <div className="pipeline-body">
                <div className="pipeline-item">
                  <div className="pi-controls">
                    <div className="pi-settings os-dropdown-trigger">
                      <i className="os-icon os-icon-ui-49"></i>
                    </div>
                    <div className="pi-settings os-dropdown-trigger">
                      <i className="os-icon os-icon-ui-15"></i>
                    </div>
                  </div>
                  <div className="pi-body">
                    <div className="pi-info">
                      <div className="h6 pi-name">Casual Leave</div>
                      <div className="pi-sub">Thirty Days (30 days)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3">
              <div className="pipeline-body">
                <div className="pipeline-item">
                  <div className="pi-controls">
                    <div className="pi-settings os-dropdown-trigger">
                      <i className="os-icon os-icon-ui-49"></i>
                    </div>
                    <div className="pi-settings os-dropdown-trigger">
                      <i className="os-icon os-icon-ui-15"></i>
                    </div>
                  </div>
                  <div className="pi-body">
                    <div></div>
                    <div className="pi-info">
                      <div className="h6 pi-name">Sick Leave</div>
                      <div className="pi-sub">Twenty Five Days (25)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3">
              <div className="pipeline-body">
                <div className="pipeline-item">
                  <div className="pi-controls">
                    <div className="pi-settings os-dropdown-trigger">
                      <i className="os-icon os-icon-ui-49"></i>
                    </div>
                    <div className="pi-settings os-dropdown-trigger">
                      <i className="os-icon os-icon-ui-15"></i>
                    </div>
                  </div>
                  <div className="pi-body">
                    <div></div>
                    <div className="pi-info">
                      <div className="h6 pi-name">Sick Leave</div>
                      <div className="pi-sub">Twenty Five Days (25)</div>
                    </div>
                  </div>
                </div>
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

export default LeaveCategory;
