'use client';
import React, { useEffect, useState } from 'react';
import { Input, Button, Divider, Tooltip } from '@nextui-org/react';
import { FaArrowUp, FaTrailer } from "react-icons/fa";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect } from '../FireBase/getDataByCondition';
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
import ModalCreate from '../Modals/ModalCreate';
import ModalMkhera from '../Modals/ModalMkhera';
import { GetTmonatHelek } from '../page';
import Image from 'next/image';
import rep6 from '../../images/rep6.png';
import rep23 from '../../images/rep23.png';
import rep78 from '../../images/rep78.png';
import { MutatingDots, Puff, Radio, ThreeCircles } from 'react-loader-spinner';
import { GiHook } from 'react-icons/gi';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import GetDocs from '../FireBase/getDocs';
import { format } from 'date-fns';
import ModalCreateTest from '../Modals/ModalCreateTest';


export default function Sales() {

    const aglotD = useGetDataByCondition('tfaol', 'sogBaola', '==', 'D');
    const aglotE = useGetDataByCondition('tfaol', 'sogBaola', '==', 'E');
    const category = GetDocs('category');
    const [mlae, setMlae] = useState([]);
    const hotsaot = GetDocs('hotsaot');
    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterTfaol');
    const counterShaotAboda = metadata.find((count) => count.id === 'counterShaotAboda');
    const counterHkhnsotAhrot = metadata.find((count) => count.id === 'counterHkhnsotAhrot');
    const counterNekoeMaam = metadata.find((count) => count.id === 'counterNekoeMaam');
    

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

    const handleData = (documents) => {
        setMlae(documents);
    };

    console.log(mlae)


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

    useEffect(() => {
        const unsubscribe = useGetDataByConditionWithoutUseEffect('mlae', 'active', '==', true, handleData);
        return () => unsubscribe();
    }, []);

    function GetTmonaLfeSog(val) {
        if (val === 'ייצור') {
            return <FaTrailer className="text-3xl text-primary" />;
        }
        else if (val === 'הרכבת וו') {
            return <GiHook className="text-3xl text-primary" />;
        }
        else if (val === 'תיקון') {
            return <HiOutlineWrenchScrewdriver className="text-3xl text-primary" />;
        }
    }

    const [showModalMkhera, setShowModalMkhera] = useState(false);

    const GetHotsaotShoteft = (val) => {
        let skhomHotsaot = 0;
        let skhomTkofte = 0;
        for (let index = 0; index < hotsaot.length; index++) {
            if(hotsaot[index].sogHotsaa === val){
                skhomHotsaot += hotsaot[index].count2;
                if(hotsaot[index].hotsaaShoteft && hotsaot[index].hotsaaShoteftClicks){
                    skhomTkofte += (hotsaot[index].hotsaaShoteft / hotsaot[index].hotsaaShoteftClicks);
                }
            }
        }
        return {
            hadBame : ((skhomTkofte * (parseInt(format(new Date(),'dd')) / 30)) + skhomHotsaot).toFixed(0)
        }
    } 

    const GetHotsaotLfeSog = (sog) => {
        let newArray = [];
        for (let index = 0; index < hotsaot.length; index++) {
            if(sog === hotsaot[index].sogHotsaa){
                newArray.push(hotsaot[index]);
            }
        }
        return newArray;
    }

    const GetRvahNke = () => {
        return parseFloat((((counter?.countESumAglotMunth - counter?.countESumHnhotAglotMunth) - (counter?.countESumHGAglotMunth) - (GetHotsaotShoteft('הוצאות שוטפות').hadBame) - (counterShaotAboda?.countShaotAboda * (counterShaotAboda?.hotsaotSkhar / counterShaotAboda?.shaotKodmet)) - (counterHkhnsotAhrot?.count) - (GetHotsaotShoteft('מסים').hadBame - counterNekoeMaam?.count + counterNekoeMaam?.countHotsaotMaam))).toFixed(0));
    }


    return (
        <div>
            {<ModalCreateTest mlae={mlae} category={category} lkohTfaol={lkoh} agla={tfaolAgla} show={showModalYetsorMatsav} disable={() => setShowModalYetsorMatsav(false)} />}
            {<ModalMkhera mlae={mlae} category={category} show={showModalMkhera} disable={() => setShowModalMkhera(false)} />}

            <div className="w-full pl-16 pr-16">
                <div className="bg-white shadow-2xl rounded-2xl p-5 flex justify-around">
                    <Button className='' onClick={() => setShowModalMkhera(true)}>מכירה</Button>
                </div>
            </div>
            <div className='flex justify-center items-center mt-2 mr-10 ml-10 mb-10 pt-6 flex-wrap'>
                <div className='w-full h-[700px] max-w-[755px] mr-10 ml-10 mb-5 overflow-y-auto bg-white rounded-xl shadow-2xl'>
                    <div className="flex justify-center items-center">
                        <div className="w-full">
                            <div className="flex justify-center mt-5 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <div className="ml-5 w-[150px] text-green-500"></div>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="primary" value={`ממוצע`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="primary" value={`אחוז`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="primary" value={`חודש 7`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <div className="ml-5 w-[150px] text-danger-500">הנחות</div>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${(parseFloat((counter?.countEHnhotAglot / counter?.countEAglot).toFixed(1)) || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`%${(parseFloat(((counter?.countEHnhotAglot / counter?.countESumAglot) * 100).toFixed(1)) || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${(counter?.countESumHnhotAglotMunth || "")}`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <div className="ml-5 w-[150px] text-success-500">מכירות</div>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${(parseFloat(((counter?.countESumAglot - counter?.countESumAglotMunth) / counter?.countESumAglotSumMunths).toFixed(1)) || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="success" value={`%${(parseFloat(((((counter?.countESumAglot / counter?.countEAglot) - (counter?.countEHnhotAglot / counter?.countEAglot)) / (counter?.countESumAglot / counter?.countEAglot)) * 100).toFixed(1)) || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="success" value={`₪${((counter?.countESumAglotMunth - counter?.countESumHnhotAglotMunth) || "")}`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <div className="ml-5 w-[150px] text-danger-500">הוצאות חו"ג</div>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${(parseFloat(((counter?.countESumHGAglot - counter?.countESumHGAglotMunth) / counter?.countESumAglotSumMunths).toFixed(1)) || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`%${parseFloat((((counter?.countESumHGAglot / counter?.countEAglot) / (counter?.countESumAglot / counter?.countEAglot) * 100)).toFixed(1)) || ""}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${(counter?.countESumHGAglotMunth || "")}`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <Tooltip closeDelay={100} content={
                                        <div className="px-1 py-2 w-[150px]">
                                            <div className='text-primary text-center mb-2'>הוצאות שוטפות
                                            </div>
                                            <Divider/>
                                            {
                                                GetHotsaotLfeSog('הוצאות שוטפות')?.map((hotsaaa,index) => {
                                                    return <div className='flex items-center mt-2 mb-2 justify-end'>
                                                        <div>
                                                        {
                                                            hotsaaa.shem
                                                        }
                                                        </div>
                                                        <div className='ml-3'>
                                                            .{index + 1}
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    }>
                                        <div className="ml-5 w-[150px] text-danger-500">הוצאות שוטפות</div>
                                    </Tooltip>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${'0'}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${("" || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${(GetHotsaotShoteft('הוצאות שוטפות').hadBame || "")}`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <div className="ml-5 w-[150px] text-danger-500">הוצאות שכר</div>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${'0'}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${("" || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${((counterShaotAboda?.countShaotAboda * (counterShaotAboda?.hotsaotSkhar / counterShaotAboda?.shaotKodmet)).toFixed(2) || "")}`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <div className="ml-5 w-[150px] text-danger-500">הכנסות/הוצאות אחרות</div>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${((counterHkhnsotAhrot?.countAll - counterHkhnsotAhrot?.count) / counterHkhnsotAhrot?.countMunths)}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${("" || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${(counterHkhnsotAhrot?.count || "")}`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-2">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <Tooltip closeDelay={100} content={
                                        <div className="px-1 py-2 w-[150px]">
                                            <div className='text-primary text-center mb-2'>הוצאות מס
                                            </div>
                                            <Divider />
                                            {
                                                GetHotsaotLfeSog('מסים')?.map((hotsaaa, index) => {
                                                    return <div className='flex items-center mt-2 mb-2 justify-end'>
                                                        <div>
                                                            {
                                                                hotsaaa.shem
                                                            }
                                                        </div>
                                                        <div className='ml-3'>
                                                            .{index + 1}
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    }>
                                        <div className="ml-5 w-[150px] text-danger-500">הוצאות מס</div>
                                    </Tooltip>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${("" || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${("" || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="danger" value={`₪${((GetHotsaotShoteft('מסים').hadBame - counterNekoeMaam?.count + counterNekoeMaam?.countHotsaotMaam) || "")}`} />
                                </div>
                            </div>
                            <div className="flex justify-center"><Divider className="w-[500px]" /></div>
                            <div className="flex justify-center mt-2 mb-10">
                                <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                    <div className="ml-5 w-[150px] text-green-500">רווח נקי</div>
                                    <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${("" || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="success" value={`₪${("" || "")}`} />
                                    <Input isReadOnly size="xs" className="w-[100px] mr-4" color="success" value={`₪${(GetRvahNke() || "")}`} />
                                </div>
                            </div>
                            <div className='flex justify-start m-5'>
                                <Button onClick={async() => {
                                    let day = parseInt(format(new Date(),'dd'));
                                    await updateDoc(doc(firestore,'metadata','counterHotsaaShoteft'),{
                                        resault : ((day / 30) * (counterHotsaaShoteft.hotsaaShoteftHodshet / counterHotsaaShoteft.hotsaaShoteftHodshetClicks))
                                    })
                                }}>עדכון</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className="flex flex-col w-full mb-5 mx-auto border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
                        <div className="flex items-center h-full w-full">
                            {
                                <div className="overflow-x-auto h-[300px] w-full">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black text-xs">זמן עבר</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black text-xs">תחילת תהליך</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black text-xs">תאריך תחילה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black text-xs">סוג עסקה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black text-xs">מצב עסקה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black text-xs">מספר מכירה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black text-xs"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                aglotD.map((agla, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.sogAska}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAska)}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                            <div className="h-[300px] rounded-xl min-w-[90px]">
                                <div className="h-full w-full tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center">
                                    <div className="w-full">
                                        <div className="text-center w-full text-primary mb-3">סיום</div>
                                        <div className="flex justify-center w-full">
                                            <Puff
                                                visible={true}
                                                height="50"
                                                width="50"
                                                color="#3b82f6"
                                                ariaLabel="puff-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full mb-5 mx-auto border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
                        <div className="flex items-center h-full">
                            {
                                <div className="overflow-x-auto h-[300px] w-full">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black text-xs">זמן עבר</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black text-xs">תחילת תהליך</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black text-xs">תאריך תחילה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black text-xs">סוג עסקה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black text-xs">מצב עסקה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black text-xs">מספר מכירה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black text-xs"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                aglotE.map((agla, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.sogAska}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAska)}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                            <div className="h-[300px] rounded-xl min-w-[90px]">
                                <div className="h-full w-full tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center">
                                    <div className="w-full">
                                        <div className="text-center w-full text-primary mb-3">מכר</div>
                                        <div className="flex justify-center w-full">
                                            <Radio
                                                visible={true}
                                                height="50"
                                                width="50"
                                                colors={['#3b82f6', '#3b82f6', '#3b82f6']}
                                                ariaLabel="radio-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}