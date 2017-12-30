import request from 'supertest';
import { HTTP_STATUS, ERROR_MESSAGES } from '../src/constants';
import app from '../src/app.js';

describe('GET /', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(HTTP_STATUS.OK);
  });
});

describe('POST /email', () => {
  it('should return bad request for subject field missing', async () => {
    await request(app)
      .post('/email')
			.expect(HTTP_STATUS.BAD_REQUEST, {
				status: HTTP_STATUS.BAD_REQUEST,
				message: ERROR_MESSAGES.SUBJECT_MISSING
			});
  });

	it('should return bad request for body field missing', async () => {
		await request(app)
			.post('/email')
			.send({
				'subject': 'subject',
			})
			.expect(HTTP_STATUS.BAD_REQUEST, {
				status: HTTP_STATUS.BAD_REQUEST,
				message: ERROR_MESSAGES.BODY_MISSING
			});
	});

	it('should return bad request for to field missing', async () => {
		await request(app)
			.post('/email')
			.send({
				'subject': 'subject',
				'body': 'body',

			})
			.expect(HTTP_STATUS.BAD_REQUEST, {
				status: HTTP_STATUS.BAD_REQUEST,
				message: ERROR_MESSAGES.TO_MISSING
			});
	});

	it('should successfully send email', async () => {
		await request(app)
			.post('/email')
			.send({
				'subject': 'subject',
				'body': 'body',
				'to': 'test@email.com'
			})
			.expect(HTTP_STATUS.CREATED, {
				message: 'success',
			});
	});
});

describe('GET /404', () => {
  it('should return 404 for non-existent URLs', async () => {
    await request(app).get('/404').expect(404);
    await request(app).get('/notfound').expect(404);
  });
});
