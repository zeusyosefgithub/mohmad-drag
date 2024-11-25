'use client';
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { NextUIProvider, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import LoginForm from "../Components/LoginForm";
import ContactContext from "./ContactContext";
import AobedDaf from "../Components/AobedDaf";
import GetDocs from "../FireBase/getDocs";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";

export default function CheckAuth({ children }) {

    console.log(1);

    const [loading, setLoading] = useState(true);
    const { signUp, signIn, signOutt, currentUser } = useAuth();
    const router = useRouter();
    const [contactName, setContactName] = useState(null);
    const [customerSet, setCustomerSet] = useState(null);
    const [tfaol,setTfaol] = useState(null);
    const [isNehol, setIsNehol] = useState(null);
    const [aobedAuth, setaobedAuth] = useState(null);
    const [admins,setAdmins] = useState([]);

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((res) => setTimeout(res, 50));
            setLoading(false);
        };
        checkAuth();
    }, [currentUser]);

    useEffect(() => {
        if(!admins.length ){
            console.log(123);
            const colle = collection(firestore, 'admins');
            const unsubscribe = onSnapshot(colle, (snap) => {
                setAdmins(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
            return () => unsubscribe();
        }
    },[currentUser]);

    const bdekatTafked = () => {
        for (let index = 0; index < admins.length; index++) {
            if(currentUser?.email === admins[index].email){
                return admins[index];
            }
        }
    }

    useEffect(() => {
        if(currentUser?.email && admins.length > 0){
            if(bdekatTafked()?.tfked === 'nehol'){
                setIsNehol(true);
                setaobedAuth(bdekatTafked());
            }
            else{
                setIsNehol(false);
                setaobedAuth(bdekatTafked());
            }
        }
    },[currentUser,admins]);

    return (
        <div>
            {
                !loading && !currentUser ?
                    <LoginForm />
                    :
                    !loading && currentUser ?
                        <div>
                            <ContactContext.Provider value={{ contactName, setContactName, customerSet, setCustomerSet,isNehol, setIsNehol,aobedAuth,tfaol,setTfaol }}>
                                {
                                    bdekatTafked()?.tfked && (bdekatTafked()?.tfked === 'admin') || (bdekatTafked()?.tfked === 'nehol') ?
                                    <div className="flex flex-col h-screen">
                                        <div className=" sticky top-0 z-50">
                                            <NavBar />
                                        </div>
                                        <div className='p-3 h-full z-10'>
                                            {children}
                                        </div>
                                    </div>
                                    : bdekatTafked()?.tfked === 'yetsor' ?
                                        <AobedDaf aobed={bdekatTafked()}/>
                                        :
                                        <Spinner className="absolute left-0 right-0 bottom-0 top-0"/>
                                }
                            </ContactContext.Provider>
                        </div>
                        :
                        null
            }
        </div>
    )
}
///
