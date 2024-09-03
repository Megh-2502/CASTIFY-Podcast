// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import morgan from 'morgan';

// //routes
// import authRoutes from './routes/auth.js';
// import podcastsRoutes from './routes/podcast.js';
// import userRoutes from './routes/user.js';

// const app = express();
// dotenv.config();

// /** Middlewares */
// app.use(express.json());
// const corsConfig = {
//     credentials: true,
//     origin: true,
// };
// app.use(cors(corsConfig));
// app.use(morgan('tiny'));
// // app.disable('x-powered-by');
// // app.use(function (request, response, next) {
// //     response.header("Access-Control-Allow-Origin", "*");
// //     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //     next();
// //   });

// const port = process.env.PORT || 2502;

// // const connect = () => {
// //     mongoose.set('strictQuery', true);
// //     mongoose.connect(process.env.MONGO_URL).then(() => {
// //         console.log('MongoDB connected');
// //     }).catch((err) => {
// //         console.log(err);
// //     });
// // };
// const connect = () => {
//     mongoose.set('strictQuery', true);
//     mongoose.connect(process.env.MONGO_URL, { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     })
//     .then(() => {
//         console.log('MongoDB connected');
//     })
//     .catch((err) => {
//         console.error('Failed to connect to MongoDB:', err);
//         process.exit(1); // Exit the process with failure
//     });
// };



// app.use(express.json())
// // app.enable('trust proxy'); // optional, not needed for secure cookies
// // app.use(express.session({
// //     secret : '123456',
// //     key : 'sid',
// //     proxy : true, // add this when behind a reverse proxy, if you need secure cookies
// //     cookie : {
// //         secure : true,
// //         maxAge: 5184000000 // 2 months
// //     }
// // }));

// app.use("/api/auth", authRoutes)
// app.use("/api/podcasts", podcastsRoutes)
// app.use("/api/user", userRoutes)
// // app.use("/api/project", projectRoutes)
// // app.use("/api/team", teamRoutes)

// app.use((err, req, res, next) => {
//     const status = err.status || 500;
//     const message = err.message || "Something went wrong";
//     return res.status(status).json({
//         success: false,
//         status,
//         message
//     })
// })

// app.listen(port, () => {
//     console.log("Connected")
//     connect();
// })
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

// Import routes
import authRoutes from './routes/auth.js';
import podcastsRoutes from './routes/podcast.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

/** Middlewares */
app.use(express.json());

const corsConfig = {
    credentials: true,
    origin: 'http://localhost:3000',  // Your frontend URL
};
app.use(cors(corsConfig));
app.use(morgan('tiny'));  // Logs HTTP requests

const port = process.env.PORT || 2502;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process with failure
    });
};

app.use("/api/auth", authRoutes);
app.use("/api/podcasts", podcastsRoutes);
app.use("/api/user", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    console.error(`Error: ${message}, Status: ${status}, Stack: ${err.stack}`);
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connect();
});
