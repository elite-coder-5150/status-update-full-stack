const { db } = require("../server");

export const getAllUpdates = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = /* sql */ `
            SELECT status_update.*, users.u_name  
            FROM status_update 
            JOIN users ON status_update.user_id = users.u_id  
            WHERE users.u_id=?
        `;

        db.query(sql, [id], (error, results) => {
            if (error) {
                console.error(error);
                return res
                    .status(500)
                    .send({ success: false, message: error.message });
            }

            if (!results.length) {
                return res
                    .status(404)
                    .send({ success: false, message: "No updates found" });
            }

            return res.send(results);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: error.message });
    }
};
