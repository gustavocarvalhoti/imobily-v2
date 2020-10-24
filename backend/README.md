## Available Scripts
In the project directory, you can run:

### `yarn start`
Runs the app in the development mode. <br/>
Open [http://localhost:3000](http://localhost:3333) to view it in the browser. <br/>
yarn dev <br/>

### `yarn install`
yarn init -y <br/>
yarn add express <br/>
yarn add @types/express -D <br/>
yarn add typescript -D <br/>
yarn tsc --init <- For use Typescript <br/>
yarn add ts-node-dev -D <- For use tsc and node <br/>
yarn add typeorm sqlite3 <br/>
yarn typeorm migration:create -n create_orphanages <- Create migration <br/>
yarn typeorm migration:run <- Run migration <br/>
yarn add multer <- For use upload files <br/>
yarn add @types/multer -D <br/>
yarn add express-async-errors <- For validate errors <br/>
yarn add yup <- For validations
yarn add @types/yup -D
yarn add cors <- Cross origin
yarn add @types/cors -D

### About
#### Package.json
--transpile-only -> Not compile all time <br/>
--ignore-watch   -> Ignore node_modules <br/>

#### For use images
Select Multipart on the Insomnia <br/>
````
No images above
{
    "name": "TESTE",
    "latitude": -27.2104336,    
    "longitude": -49.629111,
    "about": "TESTE",    
    "instructions": "TESTE",   
    "opening_hours": "TESTE",    
    "open_on_weekends": true
}
Select File on the Right for test, you can set 1 or N images
Verify the images on backend/uploads
````