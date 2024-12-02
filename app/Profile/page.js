'use client';

import { useContext, useEffect, useState } from "react";
import ContactContext from "../auth/ContactContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/authContext";
import { useGetDataByConditionWithoutUseEffect, useGetDataByConditionWithoutUseEffectTwoQueres } from "../FireBase/getDataByCondition";
import { format } from "date-fns";
import GetDocs from "../FireBase/getDocs";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spinner } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Alert } from "@mui/material";
import { Hearts } from "react-loader-spinner";

export default function Profile() {
    const { isNehol } = useContext(ContactContext);
    const { currentUser } = useAuth();
    const [showInfo, setShowInfo] = useState(true);
    const router = useRouter();
    const admins = GetDocs('admins');

    const bdekatTafked = () => {
        for (let index = 0; index < admins.length; index++) {
            if (currentUser?.email === admins[index].email) {
                return admins[index];
            }
        }
    }

    const aobed = bdekatTafked();


    useEffect(() => {
        console.log(isNehol);
        if (isNehol !== null) {
            if (isNehol) {
                setShowInfo(true);
            }
            else if (!isNehol) {
                router.push('/');
                setShowInfo(false);
            }
        }
    }, [isNehol]);


    const [agla, setAgla] = useState({});
    const [aobedNkhhe, setAobedNokhhe] = useState();


    const GetHodatAobed = () => {
        if (parseFloat(format(new Date(), 'HH')) < 12) {
            return <div className="text-lg text-primary tracking-widest">
                בוקר טוב
            </div>;
        }
        else {
            return <div>
                צהריים טובים
            </div>
        }
    }

    function GetTarekhShem(val) {
        if (val === 'Sunday') {
            return 'ראשון';
        }
        else if (val === 'Monday') {
            return 'שני';
        }
        else if (val === 'Tuesday') {
            return 'שלשי';
        }
        else if (val === 'Wednesday') {
            return 'רבעי';
        }
        else if (val === 'Thursday') {
            return 'חמשי';
        }
        else if (val === 'Friday') {
            return 'שישי';
        }
        else if (val === 'Saturday') {
            return 'שבת';
        }
    }

    const [loading, setLoading] = useState(false);
    const currentDate = format(new Date(), 'dd-MM-yyyy');

    useEffect(() => {
        if (aobed?.name && aobed?.taodatZhot) {
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'aobdem',
                'taodatZhot',
                '==',
                aobed?.taodatZhot,
                result => {
                    setAobedNokhhe(...result || []);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [aobed]);

    useEffect(() => {
        if (agla && agla?.id) {
            const unsub = onSnapshot(doc(firestore, 'tfaol', agla?.id), (doc) => {
                if (doc.exists()) {
                    setAgla({ ...doc.data(), id: doc.id });
                }
            });
            return () => unsub();
        }
    }, [agla?.id]);


    const [knesotHhodesh, setKnesotHhodesh] = useState([]);
    const [knesotHeom, setKnesotHeom] = useState([]);
    const [knesotHeomBdeka, setKnesotHeomBdeka] = useState([]);
    const [isThereKnesa, setIsThereKnesa] = useState(null);
    const [isFullKnesa, setIsFullKnesa] = useState(null);
    const [isKnesaMAdminAndAobed, setIsKnesaMAdminAndAobed] = useState(false);
    const [typeHosfa, setTypeHosfa] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState('');

    useEffect(() => {
        const docRef = doc(firestore, "shaotAbodaa", format(new Date(), 'MM-yyyy'));
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setKnesotHhodesh(docSnap.data().knesot);
                const arrayKnesot = docSnap.data().knesot;
                const today = format(new Date(), 'dd-MM-yyyy');
                const todayKnesa = arrayKnesot.find((knesa) => knesa.yom === today);
                if (todayKnesa?.knesot?.length) {
                    setKnesotHeom(todayKnesa.knesot);
                    setKnesotHeomBdeka(todayKnesa.knesot);
                    const userEntries = todayKnesa.knesot.find(knesa => knesa.msbar === aobedNkhhe?.msbar);
                    const fulled = (userEntries?.yetseah && userEntries?.knesa && userEntries?.headrot) ? true : false;
                    const res = (userEntries?.yetseah || userEntries?.knesa || userEntries?.headrot) ? true : false;
                    setIsKnesaMAdminAndAobed((!fulled && !res && userEntries?.msbar) ? true : false);
                    setIsThereKnesa(res);
                    setIsFullKnesa(fulled);
                    setTypeHosfa('update');
                } else {
                    setIsThereKnesa(false);
                    setIsFullKnesa(false);
                    setTypeHosfa('newOb');
                }
            } else {
                setIsThereKnesa(false);
                setIsFullKnesa(false);
                setTypeHosfa('new');
            }
        });
        const delayTimeout = setTimeout(() => {
            setIsReady(true);
        }, 500);
        return () => {
            clearTimeout(delayTimeout);
            unsubscribe();
        };
    }, [aobedNkhhe, currentDate, currentUser, aobed]);


    const getReplacedData = () => {
        const today = format(new Date(), 'dd-MM-yyyy');
        const currentTime = format(new Date(), 'HH:mm');
        const todayItem = knesotHhodesh.find(item => item.yom === today);
        if (todayItem.knesot.length) {
            if (isThereKnesa || isKnesaMAdminAndAobed) {
                return todayItem.knesot.map(knesa => (
                    knesa.msbar === aobedNkhhe?.msbar
                        ? { headrot: '', knesa: currentTime, msbar: knesa.msbar, shem: knesa.shem, yetseah: '' }
                        : knesa
                ));
            }
            else {
                let newArray = [...(todayItem?.knesot || [])];
                newArray.push({
                    headrot: '',
                    knesa: currentTime,
                    msbar: aobedNkhhe.msbar,
                    shem: aobedNkhhe.shem,
                    yetseah: ''
                });
                return newArray;
            }
        }
        return [{
            headrot: '',
            knesa: currentTime,
            msbar: aobedNkhhe?.msbar,
            shem: aobedNkhhe?.shem,
            yetseah: ''
        }];
    };

    const getReplacedDataFull = () => {
        const today = format(new Date(), 'dd-MM-yyyy');
        const currentTime = format(new Date(), 'HH:mm');
        const todayItem = knesotHhodesh.find(item => item.yom === today);
        if (todayItem.knesot.length) {
            return todayItem.knesot.map(knesa => (
                knesa.msbar === aobedNkhhe?.msbar
                    ? { headrot: 'נוכח', knesa: knesa.knesa, msbar: knesa.msbar, shem: knesa.shem, yetseah: currentTime }
                    : knesa
            ));
        }
    };

    const GetListKnesotMunth = () => {
        let newArray = [];
        let AadHkhshav = parseInt(getDaysInMonth(format(new Date(), 'yyyy-MM')));
        for (let index = 0; index < AadHkhshav; index++) {
            let day = `${(index + 1) < 10 ? ('0' + (index + 1)) : (index + 1)}-${format(new Date(), 'MM-yyyy')}`;
            if (day === format(new Date(), 'dd-MM-yyyy')) {
                newArray.push({
                    yom: day,
                    knesot: knesotHeom
                });
            }
            else {
                newArray.push({
                    yom: day,
                    knesot: []
                });
            }
        }
        return newArray;
    }

    const knesaFunc = async () => {
        setLoading(true);
        console.log(typeHosfa);
        if (typeHosfa === 'update' || typeHosfa === 'newOb') {
            const updatedData = knesotHhodesh.map(item =>
                item.yom === format(new Date(), 'dd-MM-yyyy')
                    ? { ...item, knesot: getReplacedData() }
                    : item
            );
            await updateDoc(
                doc(
                    firestore,
                    'shaotAbodaa',
                    format(new Date(), 'MM-yyyy')
                ),
                { knesot: updatedData }
            );
        }
        else if (sogBaolaKnesot === 'new') {
            const docRef = doc(firestore, "shaotAbodaa", format(new Date(), 'MM-yyyy'));
            await setDoc(docRef, {
                knesot: GetListKnesotMunth()
            });
        }
        setLoading(false);
        setShowMessage(true);
        setShowAlertMessage('עדכון כניסה התבצע בהצלחה.');
        setTimeout(() => {
            setShowMessage(false);
        }, 1300);
    }

    const yetsaFunc = async () => {
        setLoading(true);
        const updatedData = knesotHhodesh.map(item =>
            item.yom === format(new Date(), 'dd-MM-yyyy')
                ? { ...item, knesot: getReplacedDataFull() }
                : item
        );
        await updateDoc(
            doc(
                firestore,
                'shaotAbodaa',
                format(new Date(), 'MM-yyyy')
            ),
            { knesot: updatedData }
        );
        setLoading(false);
        setShowMessage(true);
        setShowAlertMessage('עדכון יצאה התבצע בהצלחה.');
        setTimeout(() => {
            setShowMessage(false);
        }, 1300);
    }


    return !isReady ? <Spinner className="absolute left-0 right-0 bottom-0 top-0" /> : isNehol !== null && showInfo && (
        <>
            <div className="fixed right-1/2 transform translate-x-1/2 z-30 mt-32">
                <div className={`w-[300px] md:w-[800px] transition-all duration-500 ease-in-out flex justify-center ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <Alert className="max-w-[600px] w-full" dir="rtl" severity='success'>
                        <div className="mr-2">{showAlertMessage}</div>
                    </Alert>
                </div>
            </div>
            <div className="h-full flex justify-center items-center">
                <Card dir="rtl" className="w-[450px] m-5">
                    <CardHeader className="border-b-1">
                        <div className="w-full">
                            <div className="text-xl text-primary mt-2 flex justify-around font-bold items-center">
                                <div>היי {aobed.name}</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <div className="w-full text-[10px]">
                                <div className="flex items-center w-full ">
                                    <div className="w-[50px] text-right">שעה </div>
                                    <div className="">{format(new Date(), 'HH:mm')}</div>
                                </div>
                                <div className="flex items-center w-full mt-2">
                                    <div className="w-[50px] text-right">יום </div>
                                    <div className="">{GetTarekhShem(format(new Date(), 'EEEE'))}</div>
                                </div>
                                <div className="flex items-center w-full mt-2">
                                    <div className="w-[50px] text-right">תאריך </div>
                                    <div className="">{format(new Date(), 'dd-MM-yyyy')}</div>
                                </div>
                            </div>
                            <Divider className="mt-5" />
                            <div className="w-full justify-around flex items-center mt-2">
                                <div>
                                    {GetHodatAobed()}
                                </div>
                                <Hearts
                                    height="80"
                                    width="80"
                                    color="#ef4444"
                                    ariaLabel="hearts-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="border-t-1">
                        <div className="w-full">
                            {
                                !isThereKnesa && !isFullKnesa && (
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key="1"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.9 }}
                                        >
                                            <Button isLoading={loading} className="w-full" color="primary" onClick={knesaFunc} variant="flat">כניסה</Button>
                                        </motion.div>

                                    </AnimatePresence>
                                )
                            }
                            {
                                isThereKnesa && !isFullKnesa && !isKnesaMAdminAndAobed && (
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key="2"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.9 }}
                                        >
                                            <Button isLoading={loading} className="w-full" onClick={yetsaFunc} variant="flat" color="danger">יצאה</Button>
                                        </motion.div>
                                    </AnimatePresence>
                                )
                            }
                            {
                                isThereKnesa && isFullKnesa && (
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key="2"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.9 }}
                                        >
                                            <div className="w-full h-[40px] text-success flex items-center justify-center">
                                                המשך יום נעים {aobed.name}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                )
                            }
                        </div>
                    </CardFooter>
                </Card>


            </div>
        </>
    )
}














