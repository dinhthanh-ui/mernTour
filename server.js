import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// router
app.use("/api/v1/user", userRouter);

// server
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() =>
	{
		const PORT = 4200; app.listen(PORT, () =>
		{
			console.log('listening on port ' + PORT);
		})
	})
	.catch((error) => { console.log(`${error} did not connection `) })

