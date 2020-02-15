import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addLabTest,
  getAllLabTests,
  updateLabTest,
  deleteLabTest,
  getAllLabTestCategories,
  getAllLabTestParameters
} from "../actions/settings";

const LabTest = props => {
  const initialState = {
    name: "",
    categories: null,
    parameters: null
  };
  const [{ name, categories, parameters }, setState] = useState(initialState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddLabParameter = e => {
    e.preventDefault();
    props.addLabTest({ name, categories, parameters }).then(response => {
      setState({ ...initialState });
    });
  };

  const onDeleteLabParameter = data => {
    props
      .deleteLabTest(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    props.getAllLabTests();
    props.getAllLabTestCategories();
    props.getAllLabTestParameters();
  }, []);
  return (
    <div className="row">
      <div className="col-lg-8">
        <div>
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
                      <div className="h6 pi-name">Better Pharmacy</div>
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
                        <div className="h6 pi-name">Boiling Roast</div>
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
                        <div className="h6 pi-name">Better Pharmacy</div>
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
      <div className="col-lg-4 col-xxl-3  d-xxl-block">
        <div className="pipeline white lined-warning">
          <form>
            <h6 className="form-header">Create Test</h6>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Test Name"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={handleInputChange}
                value={categories}
              >
                {props.LabCategories.map(category => {
                  return <option value={category.id}>{category.name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <legend>
                <span>Parameters</span>
              </legend>
              <select
                className="form-control select2"
                multiple={true}
                onChange={handleInputChange}
                value={parameters}
              >
                {props.LabParameters.map(parameter => {
                  return <option value={parameter.id}>{parameter.name}</option>;
                })}
              </select>
            </div>
            <fieldset className="form-group">
              <legend></legend>

              <div className="form-group">
                <select className="form-control">
                  <option>Category</option>
                  <option>New York</option>
                  <option>California</option>
                  <option>Boston</option>
                  <option>Texas</option>
                  <option>Colorado</option>
                </select>
              </div>
            </fieldset>
            <div className="form-buttons-w">
              <button className="btn btn-primary" type="submit">
                {" "}
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    LabCategories: state.settings.lab_categories,
    LabParameters: state.settings.lab_parameters,
    LabTests: state.settings.lab_tests
  };
};

export default connect(mapStateToProps, {
  addLabTest,
  getAllLabTests,
  updateLabTest,
  deleteLabTest,
  getAllLabTestCategories,
  getAllLabTestParameters
})(LabTest);
