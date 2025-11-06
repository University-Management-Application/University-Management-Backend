import express, { Request, Response } from 'express';
import { UserRoutes } from './app/modules/users/user.routes';
import { AuthRoutes } from './app/modules/auth/auth.routes';
const app = express();

app.use(express.json())

//where is all route defined
app.use("/api/user", UserRoutes)
app.use("/api/auth", AuthRoutes)


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to University Management Backend"
    })
})

export default app;