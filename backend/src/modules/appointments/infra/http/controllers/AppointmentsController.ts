import { Request, Response} from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const provider_id = request.user.id;

        const { user_id, date } = request.body;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({provider_id, date, user_id})

        return response.json(appointment);
    }
}