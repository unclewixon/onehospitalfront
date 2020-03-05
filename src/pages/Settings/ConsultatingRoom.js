import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import waiting from "../../assets/images/waiting.gif";
import { notifySuccess, notifyError } from "../../services/notify";
import { confirmAction } from "../../services/utilities";
import {
	addConsultatingRoom,
	getAllConsultatingRooms,
	updateConsultatingRoom,
	deleteConsultatingRoom,
} from '../../actions/settings';

const ConsultatingRoom = props => {
	const initialState = {
		name: '',
		save: true,
		edit: false,
		id: '',
	};
	const [{ name }, setState] = useState(initialState);
	const [Loading, setLoading] = useState(false);
	const [{ edit, save }, setSubmitButton] = useState(initialState);
	const [data, getDataToEdit] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

  const onAddConsultatingRoom = e => {
    e.preventDefault();
    setLoading(true);
    props
      .addConsultatingRoom({ name })
      .then(response => {
        setLoading(false);
        setState({ ...initialState });
        notifySuccess("Consultating room added");
      })
      .catch(error => {
        setLoading(false);
        notifyError("Error creating consultating room");
      });
  };

  const onEditConsultatingRoom = e => {
    setLoading(true);
    e.preventDefault();
    props
      .updateConsultatingRoom({ id: data.id, name }, data)
      .then(response => {
        setState({ ...initialState });
        setSubmitButton({ save: true, edit: false });
        setLoading(false);
        notifySuccess("Consultating room updated");
      })
      .catch(error => {
        setState({ ...initialState });
        setSubmitButton({ save: true, edit: false });
        setLoading(false);
        notifyError("Error editing consultating room");
      });
  };

	const onClickEdit = data => {
		setSubmitButton({ edit: true, save: false });
		setState(prevState => ({
			...prevState,
			name: data.name,
			duration: data.duration,
			id: data.id,
		}));
		getDataToEdit(data);
	};

  const onDeleteConsultatingRoom = data => {
    props
      .deleteConsultatingRoom(data)
      .then(data => {
        setLoading(false);
        notifySuccess("Consultating room deleted");
      })
      .catch(error => {
        setLoading(false);
        notifyError("Error deleting consultating room");
      });
  };

  const confirmDelete = data => {
    confirmAction(onDeleteConsultatingRoom, data);
  };

	const cancelEditButton = () => {
		setSubmitButton({ save: true, edit: false });
		setState({ ...initialState });
	};

	useEffect(() => {
		if (!loaded) {
			props.getAllConsultatingRooms();
		}
		setLoaded(true);
	}, [loaded, props]);

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="element-wrapper">
					<div className="os-tabs-w mx-1">
						<div className="os-tabs-controls">
							<ul className="nav nav-tabs upper">
								<li className="nav-item">
									<a
										aria-expanded="true"
										className="nav-link active"
										data-toggle="tab"
									>
										Consultating Room
									</a>
								</li>
							</ul>
						</div>
					</div>
                    <div className="form-buttons-w text-right compact">
                      {save && (
                        <button
                          className={
                            Loading
                              ? "btn btn-primary disabled"
                              : "btn btn-primary"
                          }
                        >
                          {Loading ? (
                            <img src={waiting} alt="submitting" />
                          ) : (
                            <span> save</span>
                          )}
                        </button>
                      )}
                      {edit && (
                        <>
                          <button
                            className={
                              Loading
                                ? "btn btn-primary disabled"
                                : "btn btn-primary"
                            }
                            onClick={cancelEditButton}
                          >
                            <span>{Loading ? "cancel" : "cancel"}</span>
                          </button>
                          <button
                            className={
                              Loading
                                ? "btn btn-primary disabled"
                                : "btn btn-primary"
                            }
                          >
                            {Loading ? (
                              <img src={waiting} alt="submitting" />
                            ) : (
                              <span> edit</span>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
	return {
		ConsultatingRooms: state.settings.consultating_room,
	};
};
export default connect(mapStateToProps, {
	addConsultatingRoom,
	getAllConsultatingRooms,
	updateConsultatingRoom,
	deleteConsultatingRoom,
})(ConsultatingRoom);
