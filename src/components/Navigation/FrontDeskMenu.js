import React from "react";
import { Link } from "react-router-dom";

const FrontDeskMenu = () => {
  return (
    <>
      <li className='sub-header'>
        <span>FRONTDESK</span>
      </li>
      <li>
        <Link to='/front-desk'>
          <div className='icon-w'>
            <div className='os-icon os-icon-layers' />
          </div>
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/billing-paypoint'>
          <div className='icon-w'>
            <div className='os-icon os-icon-layers' />
          </div>
          <span>Pay Point</span>
        </Link>
      </li>
      <li>
        <Link to='/lab'>
          <div className='icon-w'>
            <div className='os-icon os-icon-layers' />
          </div>
          <span>Clinical Lab</span>
        </Link>
      </li>
    </>
  );
};

export default FrontDeskMenu;
