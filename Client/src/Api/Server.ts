import { 
    createUser , 
    signIn ,
    app,
    auth,
    authChange,
    authState,
    getUser,
} from "./firebaseAPI";

import { getDatabase, ref, onValue, set } from "firebase/database";

export const database = getDatabase(app);

const room1_Users = ref(database, 'Room1/Users');
const room1_Objects = ref(database, 'Room1/Objects');

export const writeTest = () => {

    set(room1_Users, {
        uid: {
            name: "andrew"
        }
      });
};

export const placeTest = (x: number, y: number) => {

    set(room1_Objects, {
        andrew: {
            x: x,
            y: y
        }
      });
};

export const listenTest = () => {
    onValue( room1_Users, snapshot => {
        const data = snapshot.val();
        console.log(data);
    });
}

export const posTest = () => {
    onValue( room1_Objects, snapshot => {
        const data = snapshot.val();
        console.log(data);
    });
}
