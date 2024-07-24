'use client';
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import LoginForm from "../Components/LoginForm";
import ContactContext from "./ContactContext";
import AobedDaf from "../Components/AobedDaf";
import GetDocs from "../FireBase/getDocs";

export default function CheckAuth({ children }) {

    const [loading, setLoading] = useState(true);
    const { signUp, signIn, signOutt, currentUser } = useAuth();
    const router = useRouter();
    const [contactName, setContactName] = useState(null);
    const [customerSet, setCustomerSet] = useState(null);
    const admins = GetDocs('admins');


    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((res) => setTimeout(res, 50));
            setLoading(false);
        };
        checkAuth();
    }, [currentUser]);

    const bdekatTafked = () => {
        for (let index = 0; index < admins.length; index++) {
            if(currentUser?.email === admins[index].email){
                return admins[index];
            }
        }
    }

    return (
        <div>
            {
                !loading && !currentUser ?
                    <LoginForm />
                    :
                    !loading && currentUser ?
                        <div>
                            <ContactContext.Provider value={{ contactName, setContactName, customerSet, setCustomerSet }}>
                                {
                                    bdekatTafked()?.tfked === 'admin' ?
                                        <div>
                                            <div>
                                                <NavBar />
                                            </div>
                                            <div className='mt-10'>
                                                {children}
                                            </div>
                                        </div>
                                        : bdekatTafked()?.tfked === 'yetsor' ?
                                            <AobedDaf aobed={bdekatTafked()}/>
                                            :
                                            null
                                }

                            </ContactContext.Provider>
                        </div>
                        :
                        null
            }
        </div>
    )
}