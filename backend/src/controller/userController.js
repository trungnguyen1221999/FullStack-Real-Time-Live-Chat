export const authMe = async (req, res) => {
    res.status(200).json({ message: 'Authenticated user', success: true, error: false, user: req.user });
}