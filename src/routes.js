import { Router } from 'express';
import { SG_MAIL, validateSendEmailReqBody } from './util';
import { HTTP_STATUS } from './constants';
const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
	res.status(200).json({message: " welcome to email client APIs"});
});

/**
 * Send email
 */
routes.post('/email', (req, res) => {

  // error checking
	const valResult = validateSendEmailReqBody(req.body, res);
	if (valResult.status === HTTP_STATUS.BAD_REQUEST) {
		return res.status(valResult.status).json(valResult);
	}
	const { to, subject, body } = req.body;
	const msg = {
		from: 'paveynganpi@emailapi.com',
		to,
		subject,
		text: body,
	};

	SG_MAIL.send(msg, () => {
		return res.status(HTTP_STATUS.CREATED).json({ message: 'success' });
	});
});

export default routes;
