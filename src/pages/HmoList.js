import React from "react";

const HmoList = () => {
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
                    HEALTH MANAGEMENT ORGANIZATIONS
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div class="col-lg-8 col-xxl-8">
              <div class="element-wrapper">
                <div class="element-box-tp">
                  <div class="table-responsive">
                    <table class="table table-padded">
                      <thead>
                        <tr>
                          <th>Logo</th>
                          <th>Name</th>
                          <th class="text-center">Phone</th>

                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="user-with-avatar">
                              <img alt="" src={require("../assets/images/avatar1.jpg")} />
                            </div>
                          </td>
                          <td>
                            <div class="smaller lighter">Precious HMO</div>
                          </td>
                          <td>
                            <span>08025087899</span>
                          </td>

                          <td class="nowrap">
                            <span>support@hygeiahmo.com</span>
                          </td>
                          <td class="row-actions">
                            <a href="#">
                              <i class="os-icon os-icon-grid-10"></i>
                            </a>
                            <a href="#">
                              <i class="os-icon os-icon-ui-44"></i>
                            </a>
                            <a class="danger" href="#">
                              <i class="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="user-with-avatar">
                              <img alt="" src={require("../assets/images/avatar2.jpg")} />
                            </div>
                          </td>
                          <td>
                            <div class="smaller lighter">Staff HMO</div>
                          </td>
                          <td>
                            <span>08059275150</span>
                          </td>

                          <td class="nowrap">
                            <span>kachi.agu@dedahospital.com</span>
                          </td>
                          <td class="row-actions">
                            <a href="#">
                              <i class="os-icon os-icon-grid-10"></i>
                            </a>
                            <a href="#">
                              <i class="os-icon os-icon-ui-44"></i>
                            </a>
                            <a class="danger" href="#">
                              <i class="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="user-with-avatar">
                              <img alt="" src={require("../assets/images/avatar3.jpg")} />
                            </div>
                          </td>
                          <td>
                            <div class="smaller lighter">Mansard HMO</div>
                          </td>
                          <td>
                            <span>07038142372</span>
                          </td>

                          <td class="nowrap">
                            <span>benevolence@yahoo.com</span>
                          </td>
                          <td class="row-actions">
                            <a href="#">
                              <i class="os-icon os-icon-grid-10"></i>
                            </a>
                            <a href="#">
                              <i class="os-icon os-icon-ui-44"></i>
                            </a>
                            <a class="danger" href="#">
                              <i class="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="user-with-avatar">
                              <img alt="" src="img/avatar1.jpg" />
                            </div>
                          </td>
                          <td>
                            <div class="smaller lighter">Zenith HMO</div>
                          </td>
                          <td>
                            <span>09054736477</span>
                          </td>

                          <td class="nowrap">
                            <span>welcome@hospital.com</span>
                          </td>
                          <td class="row-actions">
                            <a href="#">
                              <i class="os-icon os-icon-grid-10"></i>
                            </a>
                            <a href="#">
                              <i class="os-icon os-icon-ui-44"></i>
                            </a>
                            <a class="danger" href="#">
                              <i class="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="user-with-avatar">
                              <img alt="" src={require("../assets/images/avatar4.jpg")} />
                            </div>
                          </td>
                          <td>
                            <div class="smaller lighter">Central Bank</div>
                          </td>
                          <td>
                            <span>08187273749</span>
                          </td>

                          <td class="nowrap">
                            <span>dedahospital@dedahospital.com</span>
                          </td>
                          <td class="row-actions">
                            <a href="#">
                              <i class="os-icon os-icon-grid-10"></i>
                            </a>
                            <a href="#">
                              <i class="os-icon os-icon-ui-44"></i>
                            </a>
                            <a class="danger" href="#">
                              <i class="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="user-with-avatar">
                              <img alt="" src={require("../assets/images/avatar2.jpg")} />
                            </div>
                          </td>
                          <td>
                            <div class="smaller lighter">Reliance HMO</div>
                          </td>
                          <td>
                            <span>08077355932</span>
                          </td>

                          <td class="nowrap">
                            <span>emmanuelozomah@yahoo.com</span>
                          </td>
                          <td class="row-actions">
                            <a href="#">
                              <i class="os-icon os-icon-grid-10"></i>
                            </a>
                            <a href="#">
                              <i class="os-icon os-icon-ui-44"></i>
                            </a>
                            <a class="danger" href="#">
                              <i class="os-icon os-icon-ui-15"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
            <div className="col-lg-4 col-xxl-3  d-xxl-block">
              <div className="pipeline white lined-warning">
                <form>
                  <h6 className="form-header">Add New HMO</h6>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="HMO Name"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="E-mail"
                      type="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Phone"
                      type="Phone"
                    />
                  </div>
                  <legend>
                    <span>Upload Logo</span>
                  </legend>
                  <div className="form-group">
                    <form>
                      <div className="form-group">
                        <input
                          type="file"
                          class="form-control"
                          placeholder="Upload Logo"
                          id="exampleFormControlFile1"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="form-buttons-w">
                    <button className="btn btn-primary" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HmoList;
