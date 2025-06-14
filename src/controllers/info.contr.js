export default {
  GET: async (req, res) => {
    try {
      
    } catch (err) {
      res.status(err?.status || 400).send(err.message);
    }
  },
};
