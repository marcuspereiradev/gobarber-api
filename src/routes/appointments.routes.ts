import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
	const appointment = appointmentsRepository.all();

	return response.json(appointment);
});

appointmentsRouter.post('/', (request, response) => {
	try {
		const { provider, date } = request.body;

		const parseDate = parseISO(date);

		const createAppointment = new CreateAppointmentService(
			appointmentsRepository
		);

		const appointment = createAppointment.execute({
			provider,
			date: parseDate,
		});

		return response.json(appointment);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default appointmentsRouter;
