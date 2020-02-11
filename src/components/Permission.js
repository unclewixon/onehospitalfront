import React from "react";

const Permission = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div>
          <div className="pipelines-w">
            <div className="projects-list">
              <div className="project-box">
                <div className="project-info">
                  <div className="element-wrapper compact pt-4">
                    <h6 className="element-header">Permissions</h6>
                    <div className="element-box-tp">
                      <table className="table table-clean">
                        <tbody>
                          <tr>
                            <td>
                              <div className="value">Amazon Store</div>
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
                            <td>
                              <div className="value">Dunkin Donuts</div>
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
                            <td>
                              <div className="value">Amazon Store</div>
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
                            <td>
                              <div className="value">Dunkin Donuts</div>
                            </td>
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
                        </tbody>
                      </table>
                      <a className="centered-load-more-link" href="#">
                        <span>Load More Categories</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-xxl-3">
        <div className="pipeline white lined-warning">
          <form>
            <h6 className="form-header">Grant Permission</h6>

            <div class="form-group">
              <input
                className="form-control"
                placeholder="Name of Category"
                type="text"
              />
            </div>

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
export default Permission;