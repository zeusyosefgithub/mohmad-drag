'use client';
import React, { useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { FaArrowUp } from "react-icons/fa";
import { useGetDataByCondition } from '../FireBase/getDataByCondition';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
import ModalCreate from '../Modals/ModalCreate';
import ModalMkhera from '../Modals/ModalMkhera';
import { GetTmonatHelek } from '../page';
import Image from 'next/image';
import rep6 from '../../images/rep6.png';
import rep23 from '../../images/rep23.png';
import rep78 from '../../images/rep78.png';


export default function Sales() {

    const aglotD = useGetDataByCondition('tfaol', 'sogBaola', '==', 'D');
    const aglotE = useGetDataByCondition('tfaol', 'sogBaola', '==', 'E');


    const [showModalYetsorMatsav, setShowModalYetsorMatsav] = useState(false);
    const [tfaolAgla, setTfaolAgla] = useState({});
    const [lkoh, setLkoh] = useState();
    const [msbarLkoh, setMsbarLkoh] = useState();
    const fetchCustomerData = async (customerId) => {
        try {
            const customersRef = collection(firestore, 'customers');
            const q = query(customersRef, where("idnum", "==", customerId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // Assuming customerId is unique, return the first document found
                setLkoh({ ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id });
            } else {
                setLkoh(null);
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setLkoh(null);
        }
    };

    useEffect(() => {
        if (msbarLkoh) {
            fetchCustomerData(msbarLkoh);
        }
    }, [msbarLkoh]);

    useEffect(() => {
        if (lkoh && lkoh.id) {
            const unsub = onSnapshot(doc(firestore, 'customers', lkoh.id), (doc) => {
                if (doc.exists()) {
                    setLkoh({ ...doc.data(), id: doc.id });
                } else {
                    setLkoh(null);
                }
            });
            return () => unsub();
        }
    }, [lkoh?.id]);

    useEffect(() => {
        if (tfaolAgla && tfaolAgla.id) {
            const unsub = onSnapshot(doc(firestore, 'tfaol', tfaolAgla.id), (doc) => {
                if (doc.exists()) {
                    setTfaolAgla({ ...doc.data(), id: doc.id });
                } else {
                    setLkoh(null);
                }
            });
            return () => unsub();
        }
    }, [tfaolAgla?.id]);

    function GetTmonaLfeSog(val) {
        if (val === 'ייצור') {
            return <Image src={rep6} className="h-[50px] w-[80px] bg-primary-100 rounded-full" />;
        }
        else if (val === 'הרכבת וו') {
            return <Image src={rep23} className="h-[50px] w-[80px] bg-primary-100 rounded-full" />;
        }
        else if (val === 'תיקון') {
            return <Image src={rep78} className="h-[50px] w-[80px] bg-primary-100 rounded-full" />;
        }
    }

    const [showModalMkhera, setShowModalMkhera] = useState(false);

    return (
        <div>
            {<ModalCreate lkohTfaol={lkoh} agla={tfaolAgla} show={showModalYetsorMatsav} disable={() => setShowModalYetsorMatsav(false)} />}
            {<ModalMkhera show={showModalMkhera} disable={() => setShowModalMkhera(false)} />}
            <div className='flex flex-wrap justify-center items-center mt-20 mr-20 ml-20 mb-56'>
                <div className="flex flex-col w-full mr-10 ml-10 max-w-4xl mx-auto mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
                    <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
                        מכר
                    </div>
                    {
                        (aglotE.length > 0) &&
                        <div className="overflow-x-auto h-[400px]">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">זמן עבר</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">תחילת תהליך</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תאריך תחילה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">סוג עסקה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">מצב עסקה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מספר מכירה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        aglotE.map((agla, index) => {
                                            return <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla) }}>המשך</Button></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">הצעה</td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{GetTmonaLfeSog(agla.sogAska)}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className="flex flex-col w-full mr-10 ml-10 max-w-4xl mx-auto mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
                    <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
                        סיום
                    </div>
                    {
                        (aglotD.length > 0) &&
                        <div className="overflow-x-auto h-[400px]">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">זמן עבר</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">תחילת תהליך</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תאריך תחילה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">סוג עסקה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">מצב עסקה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מספר מכירה</th>
                                        <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        aglotD.map((agla, index) => {
                                            return <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">הצעה</td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                                                <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{GetTmonaLfeSog(agla.sogAska)}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
            <div className=''>
                <Button className='m-5' onClick={() => setShowModalMkhera(true)}>sell</Button>
            </div>
            <div className='flex justify-between items-center mr-20 ml-20'>
                <div className="flex justify-center m-20 max-w-[800px]">

                </div>
            </div>
        </div>
    )
}