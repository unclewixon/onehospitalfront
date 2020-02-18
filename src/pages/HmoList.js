import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addHmo, getAllHmos, updateHmo, deleteHmo } from "../actions/hmo";

const HmoList = props => {
  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
  };
  const [{ name, email, phoneNumber, address }, setState] = useState(
    initialState
  );
  const [logo, setLogo] = useState(null);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = e => {
    setLogo(e.target.files[0]);
  };

  const onAddHmo = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber);
    data.append("address", address);
    data.append("logo", logo);

    props.addHmo(data).then(response => {
      setState({ ...initialState });
    });
  };

  const onDeleteHmo = data => {
    console.log(data);
    props
      .deleteHmo(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    props.getAllHmos();
  }, []);

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
                        {props.hmoList.map(hmo => {
                          return (
                            <tr>
                              <td>
                                <div class="user-with-avatar">
                                  <img
                                    alt=""
                                    src={require("../assets/images/avatar1.jpg")}
                                  />
                                </div>
                              </td>
                              <td>
                                <div class="smaller lighter">{hmo.name}</div>
                              </td>
                              <td>
                                <span>{hmo.phoneNumber}</span>
                              </td>

                              <td class="nowrap">
                                <span>{hmo.email}</span>
                              </td>
                              <td class="row-actions">
                                <a href="#">
                                  <i class="os-icon os-icon-grid-10"></i>
                                </a>
                                <a href="#">
                                  <i class="os-icon os-icon-ui-44"></i>
                                </a>
                                <a
                                  class="danger"
                                  onClick={() => onDeleteHmo(hmo)}
                                >
                                  <i class="os-icon os-icon-ui-15"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
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
                <form onSubmit={onAddHmo}>
                  <h6 className="form-header">Add New HMO</h6>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="HMO Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="E-mail"
                      type="email"
                      name="email"
                      onChange={handleInputChange}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Phone Number"
                      type="Phone"
                      name="phoneNumber"
                      onChange={handleInputChange}
                      value={phoneNumber}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Address"
                      name="address"
                      type="text"
                      onChange={handleInputChange}
                      value={address}
                    />
                  </div>
                  <legend>
                    <span>Upload Logo</span>
                  </legend>
                  <div className="form-group">
                    <div className="form-group">
                      <input
                        type="file"
                        class="form-control"
                        placeholder="Upload Logo"
                        id="exampleFormControlFile1"
                        name="logo"
                        onChange={handleFileChange}
                      />
                    </div>
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

const mapStateToProps = state => {
  return {
    hmoList: state.hmo.hmo_list
  };
};

export default connect(mapStateToProps, {
  addHmo,
  getAllHmos,
  updateHmo,
  deleteHmo
})(HmoList);
