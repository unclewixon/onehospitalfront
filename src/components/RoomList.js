/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { confirmAction } from "../services/utilities";
import waiting from "../assets/images/waiting.gif";
import { notifySuccess, notifyError } from "../services/notify";
import {
  addRoom,
  getAllRooms,
  updateRoom,
  deleteRoom
} from "../actions/settings";

const RoomList = props => {
  const initialState = {
    name: "",
    status: "Occupied",
    floor: "",
    category: props.Room_Categories[0].id,
    create: true,
    edit: false
  };
  const [{ name, status, floor, category }, setState] = useState(initialState);
  const [Loading, setLoading] = useState(false);
  const [{ edit, create }, setSubmitButton] = useState(initialState);
  const [data, getDataToEdit] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onAddRoom = e => {
    e.preventDefault();
    setLoading(true);
    // console.log(props.Room_Categories[0].id);
    props
      .addRoom({ name, status, floor, category })
      .then(response => {
        setState({ ...initialState });
        setLoading(false);
      })
      .catch(error => {
        setState({ ...initialState });
        setLoading(false);
      });
  };

  const onEditRoom = e => {
    setLoading(true);
    e.preventDefault();
    props
      .updateRoom({ id: data.id, name, status, floor, category }, data)
      .then(response => {
        setState({ ...initialState });
        setLoading(false);
      })
      .catch(error => {
        setState({ ...initialState });
        setLoading(false);
      });
  };

  const onClickEdit = data => {
    console.log(data);
    setSubmitButton({ edit: true, create: false });
    setState(prevState => ({
      ...prevState,
      name: data.name,
      status: data.status,
      floor: data.floor,
      category: data.category,
      id: data.id
    }));
    getDataToEdit(data);
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

  const cancelEditButton = () => {
    setSubmitButton({ create: true, edit: false });
    setState({ ...initialState });
  };

  const confirmDelete = data => {
    confirmAction(onDeleteRoom, data);
  };

  useEffect(() => {
    if (!loaded) {
      props.getAllRooms();
    }
    setLoaded(true);
  }, [props, loaded]);
  return (
    <div className='row'>
      <div className='col-lg-8'>
        <div className='element-wrapper'>
          <div className='element-box'>
            <h5 className='form-header'>Room list</h5>
            <div className='form-desc'></div>
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th className='text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {props.Rooms.map(Room => {
                    return (
                      <tr>
                        <td>{Room.name}</td>
                        <td>{Room.category.price}</td>
                        <td>{Room.category.discount}</td>
                        <td className='row-actions text-right'>
                          <a href='#'>
                            <i
                              className='os-icon os-icon-ui-49'
                              onClick={() => onClickEdit(Room)}
                            ></i>
                          </a>
                          <a href='#'>
                            <i className='os-icon os-icon-grid-10'></i>
                          </a>
                          <a
                            className='danger'
                            onClick={() => confirmDelete(Room)}
                          >
                            <i className='os-icon os-icon-ui-15'></i>
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
      <div className='col-lg-4 col-xxl-3  d-xxl-block'>
        <div className='pipeline white lined-warning'>
          <form onSubmit={edit ? onEditRoom : onAddRoom}>
            <h6 className='form-header'>Add New Room</h6>
            <div className='form-group'>
              <input
                className='form-control'
                placeholder='Room Number'
                type='text'
                name='name'
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <select
                className='form-control'
                name='category'
                value={category}
                onChange={handleInputChange}
              >
                {props.Room_Categories.map(RoomCategory => {
                  return (
                    <option value={RoomCategory.name}>
                      {RoomCategory.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                placeholder='Floor'
                type='text'
                name='floor'
                value={floor}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <select
                className='form-control'
                name='status'
                value={status}
                onChange={handleInputChange}
              >
                <option value='Occupied'>Occupied</option>
                <option value='Not occupied'>Not Occupied</option>
              </select>
            </div>

            <div className='form-buttons-w'>
              {create && (
                <button
                  className={
                    Loading ? "btn btn-primary disabled" : "btn btn-primary"
                  }
                >
                  {Loading ? (
                    <img src={waiting} alt='submitting' />
                  ) : (
                    <span> create</span>
                  )}
                </button>
              )}
              {edit && (
                <>
                  <button
                    className={
                      Loading ? "btn btn-primary disabled" : "btn btn-primary"
                    }
                    onClick={cancelEditButton}
                  >
                    <span>{Loading ? "cancel" : "cancel"}</span>
                  </button>
                  <button
                    className={
                      Loading ? "btn btn-primary disabled" : "btn btn-primary"
                    }
                  >
                    {Loading ? (
                      <img src={waiting} alt='submitting' />
                    ) : (
                      <span>edit</span>
                    )}
                  </button>
                </>
              )}
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
