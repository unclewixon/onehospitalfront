/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { connect } from "react-redux";
import { uploadService } from "../actions/general";

const ServicesList = props => {
  const [moreDetailConsultation, setMoreDetailConsultation] = useState(false);

  const onMoreDetailConsultation = () => {
    setMoreDetailConsultation(!moreDetailConsultation);
  };

  const onUploadService = e => {
    e.preventDefault();
    props.uploadService(true);
  };

  return (
    <div className="pipelines-w">
      <div className="todo-app-w">
        <div className="todo-content">
          <div className="all-tasks-w">
            <div className="task-section">
              <div className="tasks-header-w">
                <a
                  className="tasks-header-toggler"
                  onClick={onMoreDetailConsultation}
                >
                  <i className="os-icon os-icon-ui-23"></i>
                </a>
                <h5 className="tasks-header">Consultation</h5>
                <span className="tasks-sub-header">Mon, Sep 23th</span>
                <a
                  className="add-task-btn"
                  data-target="#taskModal"
                  data-toggle="modal"
                  onClick={onUploadService}
                >
                  <i className="os-icon os-icon-ui-22"></i>
                  <span>Add service</span>
                </a>
              </div>
              {moreDetailConsultation === true && (
                <div className="tasks-list-w">
                  <div className="pipelines-w">
                    <div className="row">
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
                              <div className="pi-info">
                                <div className="h6 pi-name">
                                  Better Pharmacy
                                </div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Goldman</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Bosing Corp</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Fennel Inc</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Fennel Inc</div>
                                <div className="pi-sub">John Mayers</div>
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
                                <div className="h6 pi-name">Fennel Inc</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Zillow Farm</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Fennel Inc</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Fennel Inc</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
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
                                <div className="h6 pi-name">Fennel Inc</div>
                                <div className="pi-sub">John Mayers</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xxl-3">
                        <div>
                          <div></div>
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
                                  <div className="h6 pi-name">Corpus Comp</div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">
                                    Boiling Roast
                                  </div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">Ketchup Farm</div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">Milk Parade</div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">
                                    Better Pharmacy
                                  </div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xxl-3">
                        <div>
                          <div></div>
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
                                  <div className="h6 pi-name">Corpus Comp</div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">
                                    Boiling Roast
                                  </div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">Ketchup Farm</div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">Milk Parade</div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
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
                                  <div className="h6 pi-name">
                                    Better Pharmacy
                                  </div>
                                  <div className="pi-sub">John Mayers</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { uploadService })(ServicesList);
