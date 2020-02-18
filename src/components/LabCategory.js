import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addLabTestCategory,
  getAllLabTestCategories,
  updateLabTestCategory,
  deleteLabTestCategory
} from "../actions/settings";

const LabCategory = props => {
  const initialState = {
    name: ""
  };
  const [{ name }, setState] = useState(initialState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddLabCategory = e => {
    e.preventDefault();
    props.addLabTestCategory({ name }).then(response => {
      setState({ ...initialState });
    });
  };

  const onDeleteLabCategory = data => {
    props
      .deleteLabTestCategory(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    props.getAllLabTestCategories();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-8">
        <div>
          <div className="pipelines-w">
            <div className="row">
              {props.LabCategories.map(LabCategory => {
                return (
                  <div className="col-lg-4 col-xxl-3">
                    <div className="pt-3">
                      <div className="pipeline-item">
                        <div className="pi-controls">
                          <div className="pi-settings os-dropdown-trigger">
                            <i className="os-icon os-icon-ui-49"></i>
                          </div>
                          <div className="pi-settings os-dropdown-trigger">
                            <i
                              className="os-icon os-icon-ui-15"
                              onClick={() => onDeleteLabCategory(LabCategory)}
                            ></i>
                          </div>
                        </div>
                        <div className="pi-body">
                          <div className="pi-info">
                            <div className="h6 pi-name">{LabCategory.name}</div>
                            <div className="pi-sub">{LabCategory.name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-xxl-3  d-xxl-block">
        <div className="pipeline white lined-warning">
          <form onSubmit={onAddLabCategory}>
            <h6 className="form-header">Create category</h6>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Category name"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={name}
              />
            </div>
            {/* <div class="form-group">
              <input
                className="form-control"
                placeholder="Test Name"
                type="text"
              />
            </div> */}

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
    LabCategories: state.settings.lab_categories
  };
};

export default connect(mapStateToProps, {
  addLabTestCategory,
  getAllLabTestCategories,
  updateLabTestCategory,
  deleteLabTestCategory
})(LabCategory);
