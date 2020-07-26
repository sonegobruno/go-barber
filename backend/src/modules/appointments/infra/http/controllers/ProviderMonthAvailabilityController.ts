import { Request, Response} from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'
import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailability';


export default class ProviderMonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id } = request.params;
        const { month, year } = request.body;

        const listProvidersMonth = container.resolve(ListProviderMonthAvailability);

        const availability = await listProvidersMonth.execute({
            provider_id,
            month,
            year
        });

        return response.json(availability);
    }
}
