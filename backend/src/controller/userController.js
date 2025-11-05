export const authMe = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ message: 'User authenticated successfully', success: true, error: false, user }); 
    }
    catch (error) {
        console.error('Error in authMe controller:', error);
        return res.status(500).json({ message: 'Internal server error', success: false, error: true });
    }
}

export const test = async (req, res) => {
    return res.status(200).json({ message: 'Test route is working!', success: true, error: false });
}