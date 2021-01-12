const mongoose = require('mongoose');

module.exports = () => {
    var connect = () => {
        mongoose
            .connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err) => {
                if (err) {
                    console.error('mongodb connection error', err);
                }
                console.log("mongodb connected");
            });
    }

    connect();
    mongoose.connection.on('disconnected', connect);
}