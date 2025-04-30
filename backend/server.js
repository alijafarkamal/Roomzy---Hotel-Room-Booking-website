const cors = require('cors');
const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});