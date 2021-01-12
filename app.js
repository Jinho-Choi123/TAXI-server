const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config({ path: '/home/ubuntu/LSM-server/.env' });

const authRouter = require('./routes/auth');
const groupRouter = require('./routes/group');
const geoRouter = require('./routes/geo');
const chatRouter = require('./routes/chat');

const app = express();
const server = require('http').createServer()
const io = require('socket.io')(server);

const PORT = 8080;
const CHAT_PORT = 8081;
const cors = require('cors');

//connect to mongodb
const db = require('./db/db');
db();



//allow frontend CORS policy
app.use(cors());

//Socket IO Connection with Client

const Chat = require('./models/Chat');

server.listen(CHAT_PORT, () => {
    console.log(`Socket IO Server Running at PORT: ${CHAT_PORT}`);
})
io.on('connection', (socket) => {
    console.log("user connected");

    //socket.broadcast.emit('hi');
    socket.on("join", (data) => {
        console.log("join group chatting room");
        console.log(data);
        socket.join(data);
    });
    socket.on("send", (data) => {
        console.log("hello world!!");
        socket.broadcast.emit("updateChat", data);
        console.log(data);
        const groupId = data.roomId;
        //if message arrive, then store it into database
        const chat = {
            message: data.message,
            sender: data.userId,
            timestamp: data.createdAt

        };

        Chat.updateOne({
            roomId: groupId
        }, {
            $push: {
                content: {
                    message: data.message,
                    sender: data.userId,
                    timestamp: data.createdAt
                }
            }
        }, (err, data) => {
            console.log(data);
            if (err) throw err;
        });


    })

    // socket.on('send:message', async(data) => {
    //     /*
    //     data: {
    //         msg: " ",
    //         userId: " ",
    //         roomId: " "
    //     }
    //     */
    //     const msg = data.message;
    //     const sender = data.userId;
    //     const timestamp = Date.now();
    //     const chat_message = {
    //         message: msg,
    //         sender: sender,
    //         timestamp: timestamp
    //     }
    //     await Chat.updateOne({ roomId: data.roomId }, { $push: { content: chat_message } })

    //     io.socket.in('room' + data.roomId).emit('send:message', data.message);
    // });

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/group', groupRouter);
app.use('/geo', geoRouter);
app.use('/chat', chatRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`Node Server Running at PORT: ${PORT}`);
})


module.exports = { app, io };