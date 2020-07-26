import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointments';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListProvidersAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ){}

    public async execute({provider_id, month, year, day}:IRequest): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            day,
            month,
            provider_id,
            year
        })

        return appointments;
    }
}

export default ListProvidersAppointmentsService;
