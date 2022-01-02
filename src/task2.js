import express from 'express';
import bodyParser from 'body-parser';
import router from './routers/userRouter.js';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', router);

app.listen(3000, () => {
    console.log('listening on port 3000!');
});
