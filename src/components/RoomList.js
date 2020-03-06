import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { confirmAction } from "../services/utilities";
import waiting from "../assets/images/waiting.gif";
import { notifySuccess, notifyError } from "../services/notify";
import {
	addRoom,
	getAllRooms,
	updateRoom,
	deleteRoom,
} from '../actions/settings';

const RoomList = props => {
	const initialState = {
		name: '',
		status: 'Occupied',
		floor: '',
		category: props.Room_Categories[0].id,
		create: true,
		edit: false,
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
			id: data.id,
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
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Floor"
                type="text"
                name="floor"
                value={floor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="status"
                value={status}
                onChange={handleInputChange}
              >
                <option value="Occupied">Occupied</option>
                <option value="Not occupied">Not Occupied</option>
              </select>
            </div>

            <div className="form-buttons-w">
              {create && (
                <button
                  className={
                    Loading ? "btn btn-primary disabled" : "btn btn-primary"
                  }
                >
                  {Loading ? (
                    <img src={waiting} alt="submitting" />
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
                      <img src={waiting} alt="submitting" />
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
		Rooms: state.settings.rooms,
	};
};

export default connect(mapStateToProps, {
	addRoom,
	getAllRooms,
	updateRoom,
	deleteRoom,
})(RoomList);
