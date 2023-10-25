import { Children, createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, } from "firebase/auth";
import axios from "axios";
import Loader from "../ShearSection/Loader/Loader";

// import axios from "axios";



export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)


    const newUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login 
    const exitingUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logoout user 
    const logOutUser = () => {
        setLoading(true)
        return signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error.message)
            // An error happened.
        });
    }

    //    update Profile and name 
    const updateProfileName = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged((auth), currentUser => {
            setUser(currentUser)
            console.log(currentUser);
            if (currentUser) {
                 axios.post(`${import.meta.env.VITE_lOCAL_Server}/jwt`, {email:currentUser?.email})
                    .then(data => {
                        console.log(data.data);
                        localStorage.setItem('access-token', data.data.token)
                    })
            } else {
                localStorage.removeItem('access-token')
            }

            setLoading(false)
        })
        return () => {
            return unSubscribe
        }
    }, [])




    const authInfo = {
        user,
        loading,
        setLoading,
        newUser,
        logOutUser,
        exitingUser,
        updateProfileName,
    }

    return (
        <AuthContext.Provider value={authInfo}>
        {loading ? ( // Render the loading spinner while loading is true
          <Loader />
        ) : (
          children // Render the children (your app content) when loading is false
        )}
      </AuthContext.Provider>
    );
};

export default AuthProvider;