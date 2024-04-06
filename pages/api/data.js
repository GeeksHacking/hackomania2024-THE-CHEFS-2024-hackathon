import { query } from '../../lib/db';

export default async function handler(req, res) {
    try {
        const result = await query('SELECT * FROM trips_hyper LIMIT 10');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
