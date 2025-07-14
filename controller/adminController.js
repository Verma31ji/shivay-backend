import AdminModel from '../Models/adminModel.js';

export const getAdminData = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.adminId).select('-password');
        if (!admin) {
            return res.status(404).json({ success: false, msg: "Admin not found" });
        }

        res.status(200).json({
            success: true,
            admin,
            msg: "Admin data fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server error while fetching admin data" });
    }
};
