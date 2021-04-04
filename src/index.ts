import "reflect-metadata"
import { createConnection } from 'typeorm';
import app from './app';

async function startServer() {
    await createConnection().then().catch(error => console.log(error));
    app.listen(app.get('port'), () => {
        console.log("server on port", app.get('port'))
    })
}

startServer()