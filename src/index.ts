import config from './config';
import server from './server';
import { dbConnect } from './server/db';

const port = config.PORT;
dbConnect();

server.listen(port, () => console.log(`✅ Server is running on ${port}`));
