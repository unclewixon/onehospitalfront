import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addRoom,
  getAllRooms,
  updateRoom,
  deleteRoom
} from "../actions/settings";

const RoomList = props => {
  const initialState = {
    name: "",
    status: "",
    floor: "",
    room_category_id: ""
  };
  const [{ name, status, floor, room_category_id }, setState] = useState(
    initialState
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddRoom = e => {
    e.preventDefault();
    props.addRoom({ name, status, floor, room_category_id }).then(response => {
      setState({ ...initialState });
    });
  };

  const onDeleteRoom = data => {
    props
      .deleteRoom(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    props.getAllRooms();
  }, []);
  console.log(props.Rooms);
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="element-wrapper">
          <div className="element-box">
            <h5 className="form-header">Room list</h5>
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
                  {props.Rooms.map(Room => {
                    return (
                      <tr>
                        <td>{Room.name}</td>
                        <td>{Room.category.price}</td>
                        <td>{Room.category.discount}</td>
                        <td className="row-actions text-right">
                          <a href="#">
                            <i className="os-icon os-icon-ui-49"></i>
                          </a>
                          <a href="#">
                            <i className="os-icon os-icon-grid-10"></i>
                          </a>
                          <a class="danger" onClick={() => onDeleteRoom(Room)}>
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
            <h6 className="form-header">Add New Room</h6>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Room Number"
                type="text"
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="room_category_id"
                value={room_category_id}
                onChange={handleInputChange}
              >
                {props.Room_Categories.map(RoomCategory => {
                  return (
                    <option value={RoomCategory.id}>{RoomCategory.name}</option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Floor"
                type="text"
                name="floor"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                value="status"
                onChange={handleInputChange}
              >
                <option value={"Occupied"}>Occupied</option>
                <option value={"Not occupied"}>Not Occupied</option>
              </select>
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
    Room_Categories: state.settings.room_categories,
    Rooms: state.settings.rooms
  };
};

export default connect(mapStateToProps, {
  addRoom,
  getAllRooms,
  updateRoom,
  deleteRoom
})(RoomList);
