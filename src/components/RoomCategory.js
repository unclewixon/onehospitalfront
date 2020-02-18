import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addRoomCategory,
  getAllRoomCategories,
  updateRoomCategory,
  deleteRoomCategory
} from "../actions/settings";

const RoomCategory = props => {
  const initialState = {
    name: "",
    price: "",
    discount: ""
  };
  const [{ name, price, discount }, setState] = useState(initialState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddRoom = e => {
    e.preventDefault();
    props.addRoomCategory({ name, price, discount }).then(response => {
      setState({ ...initialState });
    });
  };

  const onDeleteRoomCategory = data => {
    props
      .deleteRoomCategory(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    props.getAllRoomCategories();
  }, []);

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
                  {props.Room_Categories.map(RoomCategory => {
                    return (
                      <tr>
                        <td>{RoomCategory.name}</td>
                        <td>{RoomCategory.price}</td>
                        <td>{RoomCategory.discount}</td>
                        <td className="row-actions text-right">
                          <a href="#">
                            <i className="os-icon os-icon-ui-49"></i>
                          </a>
                          <a href="#">
                            <i className="os-icon os-icon-grid-10"></i>
                          </a>
                          <a
                            class="danger"
                            onClick={() => onDeleteRoomCategory(RoomCategory)}
                          >
                            <i className="os-icon os-icon-ui-15"></i>
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
      </div>
      <div className="col-lg-4 col-xxl-3  d-xxl-block">
        <div className="pipeline white lined-warning">
          <form onSubmit={onAddRoom}>
            <h6 className="form-header">New category</h6>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Category Name"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Price"
                type="text"
                name="price"
                onChange={handleInputChange}
                value={price}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Discount Rate"
                type="text"
                name="discount"
                onChange={handleInputChange}
                value={discount}
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

const mapStateToProps = state => {
  return {
    Room_Categories: state.settings.room_categories
  };
};

export default connect(mapStateToProps, {
  addRoomCategory,
  getAllRoomCategories,
  updateRoomCategory,
  deleteRoomCategory
})(RoomCategory);
