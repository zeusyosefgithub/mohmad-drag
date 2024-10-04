'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Hearts } from "react-loader-spinner";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect, useGetDataByConditionWithoutUseEffectTwoQueres } from "../FireBase/getDataByCondition";
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useAuth } from "../auth/authContext";
import { BiSolidPurchaseTag } from "react-icons/bi";
import Link from "next/link";
import { FaBell, FaClipboardList, FaTrailer } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { GiHook } from "react-icons/gi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import ModalAobedYetsor from "../Modals/ModalAobedYetsor";

export default function aobedDaf({ aobed }) {
    const { signUp, signIn, signOutt, currentUser } = useAuth();
    const [loadingFitching, setLoadingFitching] = useState(true);
    const [loadingFitching1, setLoadingFitching1] = useState(true);
    const [loadingFitching2, setLoadingFitching2] = useState(true);
    const [showModalAobedYetsor,setShowModalAobedYetsor] = useState(false);
    const [agla,setAgla] = useState({});



    const aglotC = useGetDataByCondition('tfaol', 'sogBaola', '==', 'C');





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
    const [aobedNkhhe, setAobedNokhhe] = useState();
    const [shaotHeomData, setShaotHeomData] = useState([]);
    const [knesotHeom, setKnesotHeom] = useState([]);
    const [knesotHeomBdeka, setKnesotHeomBdeka] = useState([]);
    const counter = GetDocs('metadata').find((count) => count.id === 'counterShaotAboda');

    useEffect(() => {
        if (aobedNkhhe && aobedNkhhe[0]?.msbar) {
            const unsubscribe = useGetDataByConditionWithoutUseEffectTwoQueres(
                'shaotAboda',
                'tarekh',
                '==',
                currentDate,
                'aobed',
                '==',
                aobedNkhhe[0]?.msbar,
                result => {
                    setShaotHeomData(result || []);
                    setLoadingFitching(false);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [aobedNkhhe]);
    useEffect(() => {
        if (aobed?.name) {
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'aobdem',
                'taodatZhot',
                '==',
                aobed?.taodatZhot,
                result => {
                    setAobedNokhhe(result || []);
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
    useEffect(() => {
        if (Array.isArray(shaotHeomData) && shaotHeomData.length > 0 && Array.isArray(aobedNkhhe) && aobedNkhhe.length > 0) {
            const updatedKnesotHeom = aobedNkhhe?.map(knesa => {
                const res = shaotHeomData.find(data => data.aobed === knesa.msbar);
                if (res) {
                    return {
                        id: res.id,
                        msbar: knesa.msbar,
                        shem: knesa.shem,
                        tfked: knesa.tfked,
                        yetseah: res.yetseah,
                        knesa: res.knesa,
                        headrot: res.headrot
                    };
                }
                return {
                    id: '',
                    msbar: knesa.msbar,
                    shem: knesa.shem,
                    tfked: knesa.tfked,
                    yetseah: '',
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: '',
                    headrot: ''
                };
            });
            setKnesotHeom(updatedKnesotHeom);
            setKnesotHeomBdeka(updatedKnesotHeom);
        }
        else if (!shaotHeomData?.length) {
            const updatedKnesotHeom = aobedNkhhe?.map(knesa => {
                return {
                    id: '',
                    msbar: knesa.msbar,
                    shem: knesa.shem,
                    tfked: knesa.tfked,
                    yetseah: '',
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: '',
                    headrot: ''
                };
            });
            setKnesotHeom(updatedKnesotHeom);
            setKnesotHeomBdeka(updatedKnesotHeom);
        }
        setLoadingFitching2(false);
    }, [shaotHeomData, aobedNkhhe]);

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

    const knesaa = async () => {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        if (!knesotHeom[0]?.knesa && !knesotHeom[0]?.headrot && !knesotHeom[0]?.yetseah) {
            try {
                await addDoc(collection(firestore, 'shaotAboda'), {
                    msbar: counter?.count,
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: format(new Date(), 'HH:mm'),
                    yetseah: '',
                    aobed: knesotHeom[0]?.msbar,
                    headrot: '',
                    hodesh: format(new Date(), 'MM-yyyy')
                });
                count1++;
                count2 += handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa);
                count3 += knesotHeom[0]?.tfked === 'A' ? (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa)) : 0;
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            console.log(2);
            try {
                await updateDoc(doc(firestore, 'shaotAboda', knesotHeom[0].id), {
                    yetseah: format(new Date(), 'HH:mm'),
                    headrot: 'נוכח'
                });
                count3 += knesotHeom[0]?.tfked === 'A' ? (counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa)) : (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa))) : 0;
                count2 += counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa)) : (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa));
            }
            catch (e) {
                console.log(e);
            }
        }
        await updateDoc(doc(firestore, 'metadata', 'counterShaotAboda'), {
            count: counter?.count + count1,
            countShaotAbodaKodemet: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAboda : counter?.countShaotAbodaKodemet,
            countShaotAboda: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAboda + count2) : count2,
            countShaotAbodaMunth: format(new Date(), 'MM-yyyy'),
            countShaotAbodaYetsor: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAbodaYetsor + count3) : count3,
            countShaotAbodaYetsorKodem: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAbodaYetsor : counter?.countShaotAbodaYetsorKodem,
        });
        setLoading(false);
    }

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



    console.log(aglotC);


    return (
        <>
            <Navbar dir="rtl" className="fixed">
                <NavbarContent onClick={() => setIsMenuOpen(true)}>
                    <NavbarMenuToggle
                        onClick={() => setIsMenuOpen(true)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand onClick={() => setIsMenuOpen(true)}>
                        <div onClick={() => setIsMenuOpen(true)} className="font-bold text-inherit"></div>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
                        <CardHeader>
                            <div className="w-full">
                                <div className="text-xl text-primary mt-2 flex justify-around font-bold items-center">
                                    <div>היי {aobed.name}</div>
                                </div>
                            </div>
                        </CardHeader>
                        <Divider />
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
                        <Divider />
                        <CardFooter>
                            {
                                (knesotHeom) &&
                                <div className="w-full ">
                                    {
                                        (knesotHeom[0]?.knesa && !knesotHeom[0]?.yetseah) ?
                                            <Button isLoading={loading} className="w-full mt-2 mb-2" color='danger' variant="flat" onClick={knesaa}>יצאה</Button>
                                            : (!knesotHeom[0]?.knesa && !knesotHeom[0]?.yetseah) ?
                                                <Button isLoading={loading} className="w-full mt-2 mb-2" color='success' variant="flat" onClick={knesaa}>כניסה</Button>
                                                :
                                                <div className="text-success text-center">
                                                    המשך יום נעים {aobed.name}
                                                </div>
                                    }
                                </div>
                            }
                        </CardFooter>
                    </Card>


                </div>
            }
            {
                page === "תוכנית עבודה" &&
                <div className="h-screen flex justify-center items-center">
                    <ModalAobedYetsor aobed={aobed} agla={agla} show={showModalAobedYetsor} disable={() => setShowModalAobedYetsor(false)}/>
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
                                                {/* <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]">תאריך אספקה</th> */}
                                                {/* <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]">זמן עבר</th> */}
                                                {/* <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]">שעת תחילה</th> */}
                                                {/* <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]">תאריך תחילה</th> */}
                                                <th className="px-4 py-2 text-center  font-extrabold text-black text-[10px]">מספר פעולה</th>
                                                <th className="px-4 py-2 text-center  font-medium text-black text-[10px] w-30"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                aglotC.map((agla, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalAobedYetsor(true);setAgla(agla);  }}>פתח</Button></td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{agla.shemLkoh}</td>
                                                        {/* <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]"></td> */}
                                                        {/* <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]"></td> */}
                                                        {/* <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]"></td> */}
                                                        {/* <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]"></td> */}
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