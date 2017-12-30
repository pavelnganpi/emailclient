import sgMail from '@sendgrid/mail';
import {ERROR_MESSAGES, HTTP_STATUS} from "./constants";

// SENGRID configuration
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// send email request body validation
function validateSendEmailReqBody(reqBody) {
	const { to, subject, body } = reqBody;
	const response = {
		status: 400,
		message: '',
	};

	if (subject == null || subject === '') {
		response.message = ERROR_MESSAGES.SUBJECT_MISSING;
	} else if (body == null || body === '') {
		response.message = ERROR_MESSAGES.BODY_MISSING;
	} else if (to == null || to === '') {
		response.message = ERROR_MESSAGES.TO_MISSING
	} else {
		response.status = HTTP_STATUS.OK;
	}

	return response;
}

export { sgMail as SG_MAIL, validateSendEmailReqBody };
