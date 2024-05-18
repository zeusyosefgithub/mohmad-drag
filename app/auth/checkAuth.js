'use client';
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import LoginForm from "../Components/LoginForm";
import ContactContext from "./ContactContext";

export default function CheckAuth({children}) {

    const [loading, setLoading] = useState(true);
    const { signUp, signIn, signOutt ,currentUser } = useAuth();
    const router = useRouter();
    const [contactName, setContactName] = useState(null);
    const [customerSet,setCustomerSet] = useState(null);


    useEffect(() => {
        const checkAuth = async () => {
            await new Promise((res) => setTimeout(res, 50));
            setLoading(false);
        };
        checkAuth();
    }, [currentUser])

    return (
        <div>
            {
                // user && !loading && !NotAnAdmin() ?
                // <>
                //     <NotAdmin/>
                // </>
                // :
                !loading && !currentUser ?
                    <LoginForm />
                    :
                    !loading && currentUser ?
                        <div>
                            <ContactContext.Provider value={{ contactName, setContactName,customerSet,setCustomerSet }}>
                                <div>
                                    <NavBar />
                                </div>
                                <div className='mt-10'>
                                    {children}
                                </div>
                            </ContactContext.Provider>
                        </div>
                        :
                        null
            }
        </div>
    )
}