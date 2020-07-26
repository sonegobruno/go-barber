import { Request, Response} from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'
import ListProviderDayAvalibilityService from '@modules/appointments/services/ListProviderDayAvalibilityService';


export default class ProviderDayAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id } = request.params;
        const { month, year, day } = request.body;

        const listProvidersDay = container.resolve(ListProviderDayAvalibilityService);

        const availability = await listProvidersDay.execute({
            provider_id,
            month,
            year,
            day
        });

        return response.json(availability);
    }
}
