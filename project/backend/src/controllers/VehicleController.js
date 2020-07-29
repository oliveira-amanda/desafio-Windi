const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('vehicles').count();

        const vehicles = await connection('vehicles')
            .join('users', 'users.id', '=', 'vehicles.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'vehicles.*', 
                'users.name', 
                'users.email',
                'users.city',
                'users.uf',
            ]);
        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(vehicles);
    },

    async create(request, response) {
        const { vehiclePlate, brand, modelYear, mileage, optional } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('vehicles').insert({
            vehiclePlate,
            brand,
            modelYear,
            mileage, 
            optional,
            user_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const vehicle = await connection('vehicles')
            .where('id', id)
            .select('user_id')
            .first();

        if (vehicle.user_id !== user_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('vehicles').where('id', id).delete();

        return response.status(204).send();
    }
};