/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from "react";

import TopBar from "../components/TopBar";
import ROLES from "../components/ROLES";
import Permission from "../components/Permission";

const Roles = () => {
  const [ShowROLES, setROLES] = useState(true);
  const [ShowPermission, SetPermission] = useState(false);

  const onROLES = () => {
    setROLES(true);
    SetPermission(false);

  };

  const onPermission = () => {
    setROLES(false);
    SetPermission(true);

  };



  return (
    <div className="content-i">
      <div className="content-box">
        <div className="row">
          <div className="col-sm-12">
            <div className="element-wrapper">
              <div className="os-tabs-w mx-1">
                <div className="os-tabs-controls">
                  <ul className="nav nav-tabs upper">
                    <li className="nav-item">
                      <a
                        aria-expanded="true"
                        className={ShowROLES ? "nav-link active"  : "nav-link"}
                        data-toggle="tab"
                        onClick={onROLES}
                      >
                        ROLES
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        aria-expanded="false"
                        className={ShowPermission ? "nav-link active"  : "nav-link"}
                        data-toggle="tab"
                        onClick={onPermission}
                      >
                        PERMISSIONS
                      </a>
                    </li>

                  </ul>
                </div>
              </div>
              {ShowROLES === true && <ROLES />}
              {ShowPermission === true && <Permission />}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
