/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import ServiceCategoryList from "../../components/ServiceCategoryList";
import ServicesList from "../../components/ServicesList";

const ServicesCategory = () => {
  const [ShowServiceCategoryList, setServiceCategoryList] = useState(true);
  const [ShowServicesList, SetServicesList] = useState(false);

  const onServiceCategoryList = () => {
    setServiceCategoryList(true);
    SetServicesList(false);
  };

  const onServicesList = () => {
    setServiceCategoryList(false);
    SetServicesList(true);
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
                        className={
                          ShowServiceCategoryList
                            ? "nav-link active"
                            : "nav-link"
                        }
                        data-toggle="tab"
                        onClick={onServiceCategoryList}
                      >
                        SERVICES CATEGORIES
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        aria-expanded="false"
                        className={
                          ShowServicesList ? "nav-link active" : "nav-link"
                        }
                        data-toggle="tab"
                        onClick={onServicesList}
                      >
                        SERVICES
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {ShowServiceCategoryList === true && <ServiceCategoryList />}
              {ShowServicesList === true && <ServicesList />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCategory;
