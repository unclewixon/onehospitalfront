import React from "react";

const ROLES = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="element-wrapper">
          <div className="element-box">
            <h5 className="form-header">Room Categories</h5>
            <div className="form-desc"></div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th class="text-right">Order Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Diamond Platinum</td>
                    <td>57,000.00</td>
                    <td>45%</td>
                    <td className="row-actions text-right">
                      <a href="#">
                        <i className="os-icon os-icon-ui-49"></i>
                      </a>
                      <a href="#">
                        <i className="os-icon os-icon-grid-10"></i>
                      </a>
                      <a class="danger" href="#">
                        <i className="os-icon os-icon-ui-15"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Presidential Room</td>
                    <td>45,000.00</td>
                    <td>90%</td>
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
                    <td>Aso Villa</td>
                    <td>250,000.00</td>
                    <td>50%</td>
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
                    <td>Deluxe Presidential</td>
                    <td>120,000.00</td>
                    <td>40%</td>
                    <td className="row-actions text-right">
                      <a href="#">
                        <i class="os-icon os-icon-ui-49"></i>
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
                    <td>Premium Standard</td>
                    <td>97000.00</td>
                    <td>65%</td>
                    <td className="row-actions text-right">
                      <a href="#">
                        <i class="os-icon os-icon-ui-49"></i>
                      </a>
                      <a href="#">
                        <i class="os-icon os-icon-grid-10"></i>
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
        <div className="pipeline white lined-warning">
          <form>
            <h6 className="form-header">Create Role</h6>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Role"
                type="text"
              />
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Description" type="text" />
            </div>
           
            <div className="form-buttons-w">
              <button className="btn btn-primary" type="submit">
                {" "}
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ROLES;
