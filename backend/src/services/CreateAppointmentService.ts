import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import { startOfHour } from 'date-fns';

interface RequestDTO {
    provider_id: string,
    date: Date,
}

class CreateAppointmentService {

    public async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameData = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameData) {
            throw new AppError('This  is already schedule');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment)

        return appointment;
    }
}

export default CreateAppointmentService;
