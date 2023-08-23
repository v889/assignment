import {app} from "./app.js"
import { connectdb } from "./database/connectDb.js";
connectdb();
app.listen(process.env.PORT,()=>{
    console.log(`server is working run in ${process.env.NODE_ENV}`)
})