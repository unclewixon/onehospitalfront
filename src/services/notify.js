import { BehaviorSubject } from 'rxjs';
import { toast, Bounce } from 'react-toastify';

const notifications = new BehaviorSubject(null);

class NotificationService {
	notifications = notifications.asObservable();
	configuration = {
		position: toast.POSITION.TOP_RIGHT,
		transition: Bounce,
	};

	sendNotification = (message, type, options = {}) => {
		try {
			if (message) {
				switch (type) {
					case AlertTypes.success:
						notifications.next(() =>
							toast.success(message, this.configuration)
						);
						break;
					case AlertTypes.info:
						notifications.next(() => toast.info(message, this.configuration));
						break;
					case AlertTypes.warn:
						notifications.next(() => toast.warn(message, this.configuration));
						break;
					case AlertTypes.error:
						notifications.next(() => toast.error(message, this.configuration));
						break;
					case AlertTypes.custom:
					default:
						notifications.next(() =>
							toast(message, { ...this.configuration, ...options })
						);
						break;
				}
			}
		} catch (ex) {
			notifications.next(() => toast.error(ex.message, this.configuration));
		}
		// notifications.next(null);
	};
}

const Notify = new NotificationService();

export default Notify;

const AlertTypes = Object.freeze({
	success: Symbol('success'),
	info: Symbol('info'),
	warn: Symbol('warn'),
	error: Symbol('error'),
	custom: Symbol('custom'),
});

export const notifyCustom = (message, options) => {
	Notify.sendNotification(message, AlertTypes.custom, options);
};

export const notifySuccess = message => {
	Notify.sendNotification(message, AlertTypes.success);
};

export const notifyInfo = message => {
	Notify.sendNotification(message, AlertTypes.info);
};

export const notifyWarn = message => {
	Notify.sendNotification(message, AlertTypes.warn);
};

export const notifyError = message => {
	Notify.sendNotification(message, AlertTypes.error);
};
