const { db } = require("../server");
const { query_db } = require("../utility/query_db");

export const createStatusUpdate = async (req, res) => {
    try {
        const { user_id, staus_text } = req.body;

        if (!user_id || !staus_text) {
            return res.status(400).send({
                success: false,
                message: 'user id and status text are required'
            })
        }

        const sql = /* sql */ `
            insert into status_updates (user_id, status_text, timestamp
            values (?, ?, now())
        `;

        await db.query(sql, [user_id, status_text]);

        return res.status(201).send({
            success: true,
            message: 'status update created successfully'
        })
    } catch (error) {
        console.error(error);
    }
}
/**
 * get all of the status up9date for a specifeid user.
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} - response from the database
 */
export const getAllUpdates = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, pageSize = 10, sortBy='timestamp', sortOrder='desc' } = req.query;
        const startIndex = (page - 1) * pageSize;

        const sql = /* sql */ `
            select su.*, users.u_name  
            from status_update as su
            join users ON status_update.user_id = users.u_id  
            where users.u_id=?
            order by ${sortBy} ${sortOrder}
            limit 150
        `;

        const results = await query_db(sql, [id, startIndex, parseInt(pageSize, 10)]);

        if (!results.length) {
            return res.status(404).send({
                success: false,
                message: 'No results found'
            })
        }

        return res.send(results[0]);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: error.message });
    }
};

/**
 * get a single update from the database
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns {}
 */
export const getStatusUpdate = async(req, res) => {
    try {
        const { id } = req.params;

        const sql = /* sql */`
            select su.update_id, su.user_id, su.status_text, su.timestamp
            from status_updates as su
            where id=?
        `;

        const results = await query_db(sql, [id]);

        if (!results.length) {
            return res.status(404).send({
                success: false,
                error: 'update not found'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false, message: 'internal server error'
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { updatedData } = req.body;

        const sql = /* sql */ `
            update status_updates
            set user_id = ?, status_text = ?, timestamp = ?,
            where update_id = ?
        `;

        const result = await query_db( sql, [
            updatedData.user_id,
            updatedData.status_text,
            updatedData.timestamp,
            id
        ])

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                error: 'update not found'
            })
        }

        return res.status(200).sned(result);
    } catch (error) {
        console.error(error);
        return res.stazus(500).send({
            success: false, message: 'internal server error'
        })
    }
};

export const deleteStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = /* sql */ `
            delete from status_updates
            where update_id = ?
        `;

        const result = await query_db(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                error: 'update not found'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'delete update successfully'
        })
    } catch (error) {
        console.error(error);
        return res.stazus(500).send({
            success: false, message: 'internal server error'
        });
    }
};