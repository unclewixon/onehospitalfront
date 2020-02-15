import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";

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
    category: "",
    price: "",
    testType: "single"
  };
  const [{ name, category, price, testType }, setState] = useState(
    initialState
  );

  const [parameters, setParameter] = useState(null);

  const handleMultipleSelectInput = selectedOption => {
    setParameter(selectedOption);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddLabTest = e => {
    e.preventDefault();
    console.log(name, price, category, parameters, testType);
    props
      .addLabTest({ name, price, category, parameters, testType })
      .then(response => {
        setState({ ...initialState });
        setParameter(null)
      });
  };

  const onDeleteLabTest = data => {
    console.log(data)
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

  const options = props.LabParameters.map(Par => {
    return { value: Par.name, label: Par.name };
  });
  console.log(options);
  return (
    <div className="row">
      <div className="col-lg-8">
        <div>
          <div className="row">
            {props.LabTests.map(LabTest => {
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
                            onClick={() => onDeleteLabTest(LabTest)}
                          ></i>
                        </div>
                      </div>
                      <div className="pi-body">
                        <div className="pi-info">
                          <div className="h6 pi-name">{LabTest.name}</div>
                          <div className="pi-sub">{LabTest.name}</div>
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
      <div className="col-lg-4 col-xxl-3  d-xxl-block">
        <div className="pipeline white lined-warning">
          <form onSubmit={onAddLabTest}>
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
              <input
                className="form-control"
                placeholder="Test Price"
                type="text"
                name="price"
                onChange={handleInputChange}
                value={price}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="testType"
                onChange={handleInputChange}
              >
                <option value="single">Single</option>;
                <option value="combo">Combo</option>;
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="category"
                onChange={handleInputChange}
                value={category}
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
              <Select
                className="form-control select2"
                isMulti
                onChange={handleMultipleSelectInput}
                options={options}
                value={parameters}
              />
            </div>
            <fieldset className="form-group">
              <legend></legend>
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
