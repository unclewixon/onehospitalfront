import React from "react";

class LabGroup extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <div className="padded-lg">
            <div className="projects-list">
              <div className="project-box">
                <div className="">
                  <div className="row align-items-center">
                    <div className="col-sm-12">
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 b-l-lg">
          <div className="padded-lg">
            <div className="element-wrapper">
              <div className="element-box">
              <form>
        <h5 className="form-header">
          Create Parameters
        </h5>
        <div className="form-group">
        <input className="form-control" placeholder="Name" type="text" />
        </div>
        <div className="form-group">
        <input className="form-control" placeholder="Price" type="text" />
        </div>
        <div className="form-group">
        <select className="form-control">
            <option>
              Category
            </option>
            <option>
              New York
            </option>
            <option>
              California
            </option>
            <option>
              Boston
            </option>
            <option>
              Texas
            </option>
            <option>
              Colorado
            </option>
          </select>
        </div>
        <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
            <input className="form-control" placeholder="First Name" type="text" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
        <select className="form-control">
            <option>
              Category
            </option>
            <option>
              New York
            </option>
            <option>
              California
            </option>
            <option>
              Boston
            </option>
            <option>
              Texas
            </option>
            <option>
              Colorado
            </option>
          </select>
        </div>
            </div>
          </div>
        <div className="form-buttons-w">
          <button className="btn btn-primary" type="submit"> Create</button>
        </div>
      </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LabGroup;
