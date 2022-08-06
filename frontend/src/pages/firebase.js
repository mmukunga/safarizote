import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB5xhkVkyQE2ByTfLT_iRoRzvQXoyj-vLc",
    authDomain: "safarizote.firebaseapp.com",
    projectId: "safarizote",
    storageBucket: "safarizote.appspot.com",
    messagingSenderId: "576769298107",
    appId: "1:576769298107:web:4f21f566035dde78efe39e"
}

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth};