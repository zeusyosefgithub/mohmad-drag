'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spinner } from "@nextui-org/react";
import { differenceInMinutes, format, getDaysInMonth, parse, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Hearts } from "react-loader-spinner";
import { useGetDataByCondition, useGetDataByConditionTwo, useGetDataByConditionWithoutUseEffect, useGetDataByConditionWithoutUseEffectTwoQueres } from "../FireBase/getDataByCondition";
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useAuth } from "../auth/authContext";
import { BiSolidPurchaseTag } from "react-icons/bi";
import Link from "next/link";
import { FaBell, FaClipboardList, FaTrailer } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { GiHook } from "react-icons/gi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import ModalAobedYetsor from "../Modals/ModalAobedYetsor";
import { AnimatePresence, motion } from "framer-motion";
import { Alert } from "@mui/material";

export default function aobedDaf({ aobed }) {
    const { signUp, signIn, signOutt, currentUser } = useAuth();
    const [loadingFitching, setLoadingFitching] = useState(true);
    const [loadingFitching1, setLoadingFitching1] = useState(true);
    const [loadingFitching2, setLoadingFitching2] = useState(true);
    const [showModalAobedYetsor, setShowModalAobedYetsor] = useState(false);
    const [agla, setAgla] = useState({});
    const [aobedNkhhe, setAobedNokhhe] = useState();
    const [aglotC,setAglotC] = useState([]);

    useEffect(() => {
        const unsubscribe = useGetDataByConditionWithoutUseEffectTwoQueres(
            'tfaol',
            'shlavNokhhe',
            '==',
            'C',
            'locationYetsorAgla',
            '==',
            aobedNkhhe?.snef || '',
            result => {
                if (result.length) {
                    const sortedResult = result.sort((a, b) => a.msbar - b.msbar);
                    setAglotC(sortedResult);
                } else {
                    setAglotC([]);
                }
            }
        );
        return () => unsubscribe();
    }, [aobedNkhhe?.snef]);

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
    const counter = GetDocs('metadata').find((count) => count.id === 'counterShaotAboda');

    console.log(aobedNkhhe);

    useEffect(() => {
        if (aobed?.name) {
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'aobdem',
                'taodatZhot',
                '==',
                aobed?.taodatZhot,
                result => {
                    setAobedNokhhe(...result || []);
                    setLoadingFitching1(false);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [aobed]);

    const handleTimeDiffrence = (yetseah, knesa) => {
        if (yetseah && knesa) {
            const start = parseISO(`1970-01-01T${knesa}:00`);
            const end = parseISO(`1970-01-01T${yetseah}:00`);
            const totalMinutes = differenceInMinutes(end, start);

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            return parseInt(formattedHours) + parseFloat((formattedMinutes / 60).toFixed(2));
        }
        return null;
    };


    const [page, setPage] = useState("דף הבית");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        "דף הבית",
        "תוכנית עבודה",
    ];

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
    const [isKnesaMAdminAndAobed,setIsKnesaMAdminAndAobed] = useState(false);
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

    return !isReady ? <Spinner className="absolute left-0 right-0 bottom-0 top-0" /> : (
        <>
            <div className="fixed right-1/2 transform translate-x-1/2 z-30 mt-32">
                <div className={`w-[300px] md:w-[800px] transition-all duration-500 ease-in-out flex justify-center ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <Alert className="max-w-[600px] w-full" dir="rtl" severity='success'>
                        <div className="mr-2">{showAlertMessage}</div>
                    </Alert>
                </div>
            </div>
            <Navbar dir="rtl" className="fixed z-50">
                <NavbarContent className="z-50" onClick={() => setIsMenuOpen(true)}>
                    <NavbarMenuToggle
                        onClick={() => setIsMenuOpen(true)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand onClick={() => setIsMenuOpen(true)}>
                        <div onClick={() => setIsMenuOpen(true)} className="font-bold text-inherit"></div>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden z-50 sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Button variant="light" color="primary" className="text-lg" onClick={() => setPage("דף הבית")}>דף הבית<MdHome className="text-3xl text-primary-400" /></Button>
                    </NavbarItem>

                    <NavbarItem>
                        <Button variant="light" color="danger" className="text-lg" onClick={() => setPage("תוכנית עבודה")}>תוכנית עבודה<FaClipboardList className="text-2xl text-danger" /></Button>
                    </NavbarItem>
                </NavbarContent>



                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button onClick={signOutt} color="danger" variant="flat">
                            יצאה מהחשבון
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                {
                    isMenuOpen &&
                    <NavbarMenu dir="rtl">
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Button
                                    color={page === item ? 'primary' : 'default'}
                                    variant="flat"
                                    className="w-full"
                                    size="lg"
                                    onClick={() => { setPage(item); setIsMenuOpen(false); }}
                                >
                                    {item}
                                </Button>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                }
            </Navbar>
            {
                page === "דף הבית" &&
                <div className="h-screen flex justify-center items-center">
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
            }
            {
                page === "תוכנית עבודה" &&
                <div className="h-screen flex justify-center items-center">
                    <ModalAobedYetsor aobed={aobed} agla={agla} show={showModalAobedYetsor} disable={() => setShowModalAobedYetsor(false)} />
                    <div className="absolute top-20 w-full p-5">
                        <Card dir="rtl" className="p-5">
                            <CardHeader>
                                <div className="w-full text-center font-bold text-lg">
                                    תוכנית עבודה
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div dir="ltr" className="w-full overflow-auto">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]"></th>
                                                <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]">שם לקוח</th>
                                                <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]">מספר פעולה</th>
                                                <th className="px-4 py-2 text-center  font-medium text-black text-[10px] w-30"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                aglotC.map((agla, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalAobedYetsor(true); setAgla(agla); }}>פתח</Button></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{agla.brtemLkoh?.name || agla.newCustomer?.customerName}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{agla.msbar}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{GetTmonaLfeSog(agla.sogAska)}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <div className="w-full ">
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            }

        </>

    )
}


//setTfaolAgla(agla); setMsbarDrag(agla.msbarAgla); setMsbarLkoh(agla.msbarLkoh);