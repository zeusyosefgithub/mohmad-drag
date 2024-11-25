'use client';
import { Accordion, AccordionItem, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { addYears, differenceInMinutes, format, getDaysInMonth, getYear, parse, parseISO, subYears } from 'date-fns';
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import ModalHosfatAobed from "../Modals/ModalHosfatAobed";
import ModalBrtemNosfemAobed from '../Modals/ModalBrtemNosfemAobed';
import { useGetDataByConditionWithoutUseEffect } from "../FireBase/getDataByCondition";
import moment from "moment";
import { VscError } from "react-icons/vsc";
import { IoIosArrowBack, IoIosArrowForward, IoMdCheckmarkCircleOutline } from "react-icons/io";
import ModalDafeShaot from "../Modals/ModalDafeShaot";
import { FaListCheck } from "react-icons/fa6";
import { FaList } from "react-icons/fa6";
import { FcOvertime } from "react-icons/fc";
import { he } from 'date-fns/locale';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { TbClockEdit } from "react-icons/tb";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import ModalKnesaKlalet from "../Modals/ModalKnesaKlalet";
import ContactContext from "../auth/ContactContext";
import { useRouter } from "next/navigation";
import { GrPowerReset } from "react-icons/gr";
import { Alert } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import ModalAddKnesot from "../Modals/ModalAddKnesot";

export default function Aobdem() {

    const { contactName, setContactName, customerSet, setCustomerSet, isNehol, setIsNehol } = useContext(ContactContext);
    const aobdem = GetDocs('aobdem');
    const router = useRouter();
    const [loh, setLoh] = useState('לוח היום');
    const [knesotHhodesh, setKnesotHhodesh] = useState([]);
    const [knesotHeom, setKnesotHeom] = useState([]);
    const [sogBaolaKnesot, setsogBaolaKnesot] = useState('');
    const [knesotHeomBdeka, setKnesotHeomBdeka] = useState([]);
    const [knesotKlale, setKnesotKlale] = useState(null);
    const [aobed, setAobed] = useState();
    const currentDate = format(new Date(), 'dd-MM-yyyy');
    const counter = GetDocs('metadata').find((count) => count.id === 'counterShaotAboda');
    const [showModalDafeShaot, setShowModalDafeShaot] = useState(false);
    const [showHosfatAobed, setShowHosfatAobed] = useState(false);
    const [showModalBrtemNosfemAobed, setShowModalBrtemNosfemAobed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState('');
    const [showAlertType, setShowAlertType] = useState('');

    const hosfatKnesaTest = async () => {
        if (sogBaolaKnesot === 'update' || sogBaolaKnesot === 'updateAdd') {
            let newArray = [];
            for (let index = 0; index < knesotHhodesh.length; index++) {
                if (knesotHhodesh[index].yom === format(new Date(), 'dd-MM-yyyy')) {
                    newArray.push({
                        yom: knesotHhodesh[index].yom,
                        knesot: knesotHeom
                    });
                }
                else {
                    newArray.push(knesotHhodesh[index]);
                }
            }
            await updateDoc(doc(firestore, 'shaotAbodaa', format(new Date(), 'MM-yyyy')), {
                knesot: newArray
            });
        }
        else if (sogBaolaKnesot === 'add') {
            const docRef = doc(firestore, "shaotAbodaa", format(new Date(), 'MM-yyyy'));
            await setDoc(docRef, {
                knesot: GetListKnesotMunth()
            });
        }
    }
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

    const isMsbarInKnesot = (array, msbar) => array.some(item => item.msbar === msbar);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const docRef = doc(firestore, "shaotAbodaa", format(new Date(), 'MM-yyyy'));
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setKnesotHhodesh(docSnap.data().knesot);
                const arrayKnesot = docSnap.data().knesot;
                const today = format(new Date(), 'dd-MM-yyyy');
                const todayKnesa = arrayKnesot.find((knesa) => knesa.yom === today);
                if (todayKnesa?.knesot?.length) {
                    let newArray = [...(todayKnesa?.knesot || [])];
                    for (const item of aobdem) {
                        if (item.active && !isMsbarInKnesot(todayKnesa?.knesot, item.msbar)) {
                            newArray.push({
                                msbar: item.msbar,
                                shem: item.shem,
                                yetseah: '',
                                knesa: '',
                                headrot: ''
                            });
                        }
                    }
                    setsogBaolaKnesot('update');
                    setKnesotHeom(newArray);
                    setKnesotHeomBdeka(newArray);
                } else {
                    setsogBaolaKnesot('updateAdd');
                    const updatedKnesotHeom = aobdem
                        .filter(knesa => knesa.active)
                        .map(knesa => ({
                            msbar: knesa.msbar,
                            shem: knesa.shem,
                            yetseah: '',
                            knesa: '',
                            headrot: ''
                        }));
                    setKnesotHeom(updatedKnesotHeom);
                    setKnesotHeomBdeka(updatedKnesotHeom);
                }
            } else {
                setsogBaolaKnesot('add');
                const updatedKnesotHeom = aobdem
                    .filter(knesa => knesa.active)
                    .map(knesa => ({
                        msbar: knesa.msbar,
                        shem: knesa.shem,
                        yetseah: '',
                        knesa: '',
                        headrot: ''
                    }));
                setKnesotHeom(updatedKnesotHeom);
                setKnesotHeomBdeka(updatedKnesotHeom);
            }
        });
        const delayTimeout = setTimeout(() => {
            setIsReady(true);
        }, 600);
        return () => {
            clearTimeout(delayTimeout);
            unsubscribe();
        };
    }, [currentDate, aobdem]);

    const [btehotYom, setBtehotYom] = useState([]);

    const handleChange = (index, field, value) => {
        setKnesotHeom(prevKnesotHeom => {
            const updatedKnesotHeom = [...prevKnesotHeom];
            updatedKnesotHeom[index] = {
                ...updatedKnesotHeom[index],
                [field]: value
            };
            return updatedKnesotHeom;
        });
    };

    const handleTime2Change = (value, knesa) => {
        const newTime2 = value;
        if (moment(newTime2, 'HH:mm').isBefore(moment(knesa, 'HH:mm'))) {
            return '';
        } else {
            return newTime2;
        }
    };

    const BdekatAefshrotAedconTest = () => {
        if (sogBaolaKnesot === 'add') {
            for (let index = 0; index < knesotHeomBdeka.length; index++) {
                if (knesotHeom[index]?.yetseah ||
                    knesotHeom[index]?.knesa ||
                    knesotHeom[index]?.headrot) {
                    return false;
                }
            }
            return true;
        }
        else if (sogBaolaKnesot === 'update' || sogBaolaKnesot === 'updateAdd') {
            for (let index = 0; index < knesotHeomBdeka.length; index++) {
                if (knesotHeomBdeka[index]?.yetseah !== knesotHeom[index]?.yetseah ||
                    knesotHeomBdeka[index]?.knesa !== knesotHeom[index]?.knesa ||
                    knesotHeomBdeka[index]?.headrot !== knesotHeom[index]?.headrot) {
                    return false;
                }
            }
            return true;
        }
    }


    const GetHodshem = () => {
        let newArray = [];
        let AadHkhshav = parseInt(format(new Date(), 'MM'));
        for (let index = 0; index < 12; index++) {
            let munth = `${format(new Date(), 'yyyy')}-${(index + 1) < 10 ? ('0' + (index + 1)) : (index + 1)}`;
            newArray.push({
                shem: format(munth, 'LLLL', { locale: he }),
                tarekh: `${format(new Date(), 'yyyy')}-${(index + 1) < 10 ? ('0' + (index + 1)) : (index + 1)}`,
                msbar: index + 1
            });
        }
        return newArray;
    }

    const GetYmem = () => {
        let newArray = [];
        let AadHkhshav = parseInt(getDaysInMonth(new Date(tarekhKlaleNbhar)));
        for (let index = 0; index < AadHkhshav; index++) {
            let day = `${format(new Date(), 'yyyy-MM')}-${index < 10 ? ('0' + (index + 1)) : index + 1}`;
            newArray.push({
                shem: GetTarekhShem(format(day, 'EEEE')),
                tarekh: `${index < 9 ? ('0' + (index + 1)) : index + 1}-${format(new Date(tarekhKlaleNbhar), 'MM-yyyy')}`,
                msbar: index + 1
            });
        }
        return newArray;
    }


    const [showModalAdconHosfaKnesa, setShowModalAdconHosfaKnesa] = useState(false);
    const [tarekhKlaleNbhar, setTarekhKlaleNbhar] = useState('');
    const [fetchedDataMunth, setFetchedDataMunth] = useState([]);
    const [brtemLaedconShaa, setBretemLaedconShaa] = useState({});



    useEffect(() => {
        if (tarekhKlaleNbhar) {
            console.log(tarekhKlaleNbhar);
            const docRef = doc(firestore, "shaotAbodaa", format(parse(tarekhKlaleNbhar, 'yyyy-MM', new Date()), 'MM-yyyy'));
            const unsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    console.log(1243)
                    const arrayKnesot = docSnap.data().knesot;
                    setFetchedDataMunth(arrayKnesot);
                } else {
                    console.log(1243)
                }
            });
            return () => unsubscribe();
        }
    }, [tarekhKlaleNbhar]);

    const GetReshematShaotAobdem = (Yom, newArrayWithouRpeat) => {
        let newArray = [];
        for (let index = 0; index < newArrayWithouRpeat.length; index++) {
            if (Yom.tarekh === newArrayWithouRpeat[index].yom) {
                let arrayKnesot = newArrayWithouRpeat[index].knesot;
                if (arrayKnesot.length) {
                    for (let index1 = 0; index1 < arrayKnesot.length; index1++) {
                        newArray.push(
                            <TableRow key={index + index1 + Yom?.tarekh}>
                                <TableCell className="text-xs text-right">{arrayKnesot[index1]?.yetseah}</TableCell>
                                <TableCell className="text-xs text-right">{arrayKnesot[index1]?.knesa}</TableCell>
                                <TableCell className="text-xs text-right">{arrayKnesot[index1]?.headrot}</TableCell>
                                <TableCell className="text-xs text-right">{arrayKnesot[index1]?.shem}</TableCell>
                                <TableCell className="text-xs text-right">
                                    {arrayKnesot[index1]?.headrot && arrayKnesot[index1]?.yetseah && arrayKnesot[index1]?.knesa
                                        ?
                                        <TbClockEdit onClick={() => {
                                            setBretemLaedconShaa({
                                                shem: arrayKnesot[index1]?.shem,
                                                knesa: arrayKnesot[index1]?.knesa,
                                                yetseah: arrayKnesot[index1]?.yetseah,
                                                msbar: arrayKnesot[index1]?.msbar,
                                                headrot: arrayKnesot[index1]?.headrot,
                                                yom: Yom.tarekh
                                            }); setShowModalAdconHosfaKnesa(true);
                                        }} className="text-success cursor-pointer text-[18px]" />
                                        :
                                        arrayKnesot[index1]?.headrot || arrayKnesot[index1]?.yetseah || arrayKnesot[index1]?.knesa
                                            ?
                                            <TbClockEdit onClick={() => {
                                                setBretemLaedconShaa({
                                                    shem: arrayKnesot[index1]?.shem,
                                                    knesa: arrayKnesot[index1]?.knesa,
                                                    yetseah: arrayKnesot[index1]?.yetseah,
                                                    msbar: arrayKnesot[index1]?.msbar,
                                                    headrot: arrayKnesot[index1]?.headrot,
                                                    yom: Yom.tarekh
                                                }); setShowModalAdconHosfaKnesa(true);
                                            }} className="text-danger cursor-pointer text-[17px]" />
                                            :
                                            null}</TableCell>
                            </TableRow>
                        );
                    }
                }
            }
        }
        return newArray;
    }

    const BdekatYomKnesotKeam = (yom, array) => {
        for (let index = 0; index < array.length; index++) {
            if (yom === array[index].yom) {
                if (array[index].knesot.length) {
                    return true;
                }
            }
        }
        return false;
    }

    const [showInfo, setShowInfo] = useState(true);

    // useEffect(() => {
    //     if (isNehol) {
    //         router.push('/');
    //         setShowInfo(false);
    //     }
    //     else {
    //         setShowInfo(true);
    //     }
    // }, [isNehol]);

    const [showModalAddKnesot, setShowModalAddKnesot] = useState(false);
    const [yomAddKnesa, setYomAddKnesa] = useState('');

    const getYearsRange = () => {
        const currentYear = getYear(new Date());
        const lastThreeYears = Array.from({ length: 3 }, (_, i) => getYear(subYears(new Date(), i + 1))).reverse();
        const nextThreeYears = Array.from({ length: 3 }, (_, i) => getYear(addYears(new Date(), i + 1)));
        return [...lastThreeYears, currentYear, ...nextThreeYears];
    };

    console.log(getYearsRange());

    return showInfo && (
        <div className="h-full pb-10">
            <ModalAddKnesot aeshor={(val1, val2, val3) => {
                if (val1) {
                    setShowAlertMessage(`השעות של ${val2} לתאריך ${val3} נוספו בהצלחה.`);
                    setShowAlertType('success');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 2500);
                    return;
                }
            }} aobdem={aobdem} hodesh={tarekhKlaleNbhar} knesotHhodesh={knesotHhodesh} yom={yomAddKnesa} show={showModalAddKnesot} disable={() => setShowModalAddKnesot(false)} />
            <ModalKnesaKlalet counter={counter} data={fetchedDataMunth} aeshor={(val1, val2, val3) => {
                if (val1) {
                    setShowAlertMessage(`השעות של ${val2} של תאריך ${val3} התעדכנו בהצלחה.`);
                    setShowAlertType('success');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 2500);
                    return;
                }
            }} hodesh={tarekhKlaleNbhar} brtem={brtemLaedconShaa} show={showModalAdconHosfaKnesa} disable={() => { setShowModalAdconHosfaKnesa(false); }} />
            <ModalBrtemNosfemAobed aobed={aobed} show={showModalBrtemNosfemAobed} disable={() => setShowModalBrtemNosfemAobed(false)} />
            <ModalHosfatAobed show={showHosfatAobed} disable={() => setShowHosfatAobed(false)} />
            <ModalDafeShaot aobdem={aobdem} counter={counter} show={showModalDafeShaot} disable={() => setShowModalDafeShaot(false)} />
            <div className="fixed right-1/2 transform translate-x-1/2 z-50">
                <div className={`w-[800px] transition-all duration-500 ease-in-out flex justify-center ${showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <Alert className="max-w-[600px] w-full" dir="rtl" severity={showAlertType}>
                        <div className="mr-2">{showAlertMessage}</div>
                    </Alert>
                </div>
            </div>
            <div className="h-full flex flex-wrap xl:flex-nowrap">
                <div className="p-5 m-5 justify-center w-full bg-white rounded-xl shadow-xl mb-20 h-full">
                    <div className="overflow-auto h-fit w-full" dir="rtl">
                        <div dir="ltr">
                            <div className="mt-5 mb-5 flex justify-around items-center">
                                <Button size="sm" variant="flat" color="primary" onClick={() => setShowHosfatAobed(true)}><div className="text-[18px] mr-1">+</div>הוספת עובד חדש</Button>
                                <Button size="sm" variant="flat" color="primary" onClick={() => setShowModalDafeShaot(true)}><FcOvertime className="text-2xl" />דפי שעות</Button>
                            </div>
                            <div className="overflow-x-auto h-[500px]">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black"></th>
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">תעריף לשעה</th>
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">תפקיד</th>
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">נייד</th>
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">עיר</th>
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">ישוב</th>
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">שם עובד</th>
                                            <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">מספר עובד</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            aobdem.map((aobed, index) => {
                                                return aobed.active && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Button variant="flat" color="primary" onClick={() => { setShowModalBrtemNosfemAobed(true); setAobed(aobed) }} size="sm">פתח</Button></td>
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.tarefLshaa}</td>
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.tfked}</td>
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.nead}</td>
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.aer}</td>
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.yeshov}</td>
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.shem}</td>
                                                    <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.msbar}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 m-5 w-full bg-white rounded-xl shadow-xl mb-20 h-full flex flex-col">
                    <div className="p-3 flex justify-around border-b-1">
                        <Button variant='flat' className={loh === 'לוח כללי' && 'font-extrabold text-base'} color={loh === 'לוח כללי' ? 'primary' : 'default'} onClick={() => setLoh('לוח כללי')}><FaList className="text-base" />לוח כללי</Button>
                        <Button variant='flat' className={loh === 'לוח היום' && 'font-extrabold text-base'} color={loh === 'לוח היום' ? 'primary' : 'default'} onClick={() => setLoh('לוח היום')}><FaListCheck className="text-base" />לוח היום</Button>
                    </div>
                    <div className="h-full overflow-auto">
                        {
                            loh === 'לוח היום' &&
                            <div className="h-full flex flex-col">
                                {
                                    isReady ?
                                        <div className="overflow-x-auto h-full">
                                            <table className="w-full table-auto border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-20">
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">היעדרות</th>
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">יצאה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">כניסה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">שם עובד</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        knesotHeom?.map((aobed, index) => {
                                                            return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><Dropdown dir="rtl">
                                                                    <DropdownTrigger>
                                                                        <Button color={aobed?.headrot ? 'success' : "danger"} variant='flat' size="sm" className='m-2'>
                                                                            {aobed?.headrot || 'בחר פריט'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={true}
                                                                        disallowEmptySelection
                                                                        selectionMode="single"
                                                                        onSelectionChange={(val) => handleChange(index, 'headrot', val.currentKey)}
                                                                    >
                                                                        <DropdownItem key={'חופשה'}>{'חופשה'}</DropdownItem>
                                                                        <DropdownItem key={'מחלה'}>{'מחלה'}</DropdownItem>
                                                                        <DropdownItem key={'נוכח'}>{'נוכח'}</DropdownItem>
                                                                        <DropdownItem key={'חופשה ללא תשלום'}>{'חופשה ללא תשלום'}</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown></td>
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center items-center"><Input value={aobed?.yetseah} onValueChange={(val) => { handleChange(index, 'yetseah', handleTime2Change(val, aobed?.knesa)); (val && aobed?.knesa) && handleChange(index, 'headrot', 'נוכח') }} type="time" size="xs" color={aobed?.yetseah ? 'success' : "danger"} className="max-w-[100px]" />{aobed?.yetseah ? <GrPowerReset onClick={() => handleChange(index, 'yetseah', '')} className="text-[25px] w-[25px] cursor-pointer hover:text-primary ml-1 bg-gray-100 p-1 rounded-full" /> : <div className="w-[30px]"></div>}</div></td>
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center items-center"><Input value={aobed?.knesa} onValueChange={(val) => { handleChange(index, 'knesa', val); (val && aobed?.yetseah) && handleChange(index, 'headrot', 'נוכח') }} type="time" size="xs" color={aobed?.knesa ? 'success' : "danger"} className="max-w-[100px]" />{aobed?.knesa ? <GrPowerReset onClick={() => handleChange(index, 'knesa', '')} className="text-[25px] w-[25px] cursor-pointer hover:text-primary ml-1 bg-gray-100 p-1 rounded-full" /> : <div className="w-[30px]"></div>}</div></td>
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300">{aobed?.shem}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className="h-full flex justify-center items-center">
                                            <Spinner />
                                        </div>
                                }
                                <div className="flex justify-end p-3">
                                    <Button variant="flat" isDisabled={BdekatAefshrotAedconTest()} onClick={hosfatKnesaTest} color="primary">
                                        שמירה
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            loh === 'לוח כללי' &&
                            <div className="h-full flex flex-col">
                                <div className="h-full flex flex-col justify-around">
                                    <div className="flex justify-center gap-24 items-center p-5 border-b-1">
                                        <div className="inline-block hover:animate-move-arrows cursor-pointer">
                                            <IoIosArrowForward className="text-4xl transform scale-x-[-1] hover:text-primary" />
                                        </div>
                                        <div className="text-lg text-primary">
                                            2024
                                        </div>
                                        <div className="inline-block hover:animate-move-arrows cursor-pointer">
                                            <IoIosArrowBack className="text-4xl transform scale-x-[-1] hover:text-primary" />
                                        </div>
                                    </div>
                                    {
                                        !tarekhKlaleNbhar && GetHodshem()?.map((hodesh, index) => {
                                            return <div key={hodesh?.tarekh} className="flex items-center mt-1 mb-1 p-1 border-b-1">
                                                <div className="w-full flex justify-center"><Button variant='flat' onClick={() => { setTarekhKlaleNbhar(hodesh?.tarekh) }} color={format(parse(hodesh?.tarekh, 'yyyy-MM', new Date()), 'MM-yyyy') === format(new Date(), 'MM-yyyy') ? 'primary' : 'default'} size="sm">פתח</Button></div>
                                                <div className={`w-full text-center min-w-[100px] ${format(parse(hodesh?.tarekh, 'yyyy-MM', new Date()), 'MM-yyyy') === format(new Date(), 'MM-yyyy') ? 'text-primary' : ''}`}>
                                                    <div className='flex items-center justify-end'>
                                                        {
                                                            format(parse(hodesh?.tarekh, 'yyyy-MM', new Date()), 'MM-yyyy') === format(new Date(), 'MM-yyyy') &&
                                                            <div className="mr-10 p-1 rounded-full bg-primary text-white text-xs font-semibold">תאריך נוכחי</div>
                                                        }
                                                        {format(hodesh?.tarekh, 'MM-yyyy')}
                                                    </div>
                                                </div>
                                                <div className={`w-full text-center ${format(parse(hodesh?.tarekh, 'yyyy-MM', new Date()), 'MM-yyyy') === format(new Date(), 'MM-yyyy') ? 'text-primary' : ''}`}>{hodesh?.shem}</div>
                                            </div>
                                        })
                                    }
                                    {
                                        tarekhKlaleNbhar &&
                                        <div className="">
                                            <div className="flex justify-between items-center sticky top-0 p-3 border-b-1 z-20 bg-white">
                                                <Tooltip placement='bottom' shadow='lg' closeDelay={100} content={
                                                    <div className="px-1 py-2 w-[250px]">
                                                        <div className="w-full text-primary text-sm text-center">
                                                            <div>עדכוני שעות</div>
                                                        </div>
                                                        <div className="mb-3 mt-3 w-full flex items-center justify-end">
                                                            <div className="text-[11px] mr-2">עדכון פרטים עברו או בעתיד שכולם נרשמו</div>
                                                            <div><TbClockEdit className="text-success cursor-pointer text-[18px]" /></div>
                                                        </div>
                                                        <div className="mb-3 w-full flex items-center justify-end">
                                                            <div className="text-[11px] mr-2">עדכון פרטים בעתיד שלא נרשמו</div>
                                                            <div><TbClockEdit className="text-primary cursor-pointer text-[18px]" /></div>
                                                        </div>
                                                        <div className="w-full flex items-center justify-end">
                                                            <div className="text-[11px] mr-2">עדכון פרטים שעברו וחלק מהם חסר או כולם</div>
                                                            <div><TbClockEdit className="text-danger cursor-pointer text-[18px]" /></div>
                                                        </div>
                                                    </div>
                                                }>
                                                    <div><HiMiniQuestionMarkCircle className="text-2xl text-primary ml-2" /></div>
                                                </Tooltip>
                                                <Button color="primary" variant='flat' className="mb-2 mr-2" onClick={() => setTarekhKlaleNbhar('')} size="sm"><FaArrowRightFromBracket />חזרה</Button>
                                            </div>
                                            <div className="bg-white p-3">
                                                <Accordion selectedKeys={btehotYom} dir="rtl" className="w-full" variant="splitted" selectionMode='multiple'>
                                                    {
                                                        GetYmem()?.map((Yom, index) => (
                                                            <AccordionItem
                                                                dir="rtl"
                                                                onPress={() => {
                                                                    if (btehotYom.includes(Yom?.tarekh)) {
                                                                        setBtehotYom((prevTest) => prevTest.filter((value) => value !== Yom?.tarekh));
                                                                    } else {
                                                                        setBtehotYom((prevTest) => [...prevTest, Yom?.tarekh]);
                                                                    }
                                                                }}
                                                                className="w-full table-row bg-gray-50"
                                                                key={Yom?.tarekh}
                                                                textValue={Yom?.tarekh}
                                                                title={
                                                                    <div className={`w-full flex items-center ${Yom?.tarekh === format(new Date(), 'dd-MM-yyyy') ? 'text-primary' : ""}`}>
                                                                        <div className="w-full max-w-[100px]">{Yom?.shem}</div>
                                                                        <div>{Yom?.tarekh}</div>
                                                                        {
                                                                            Yom?.tarekh === format(new Date(), 'dd-MM-yyyy') &&
                                                                            <div className="mr-10 p-1 rounded-full bg-primary text-white text-xs font-semibold">תאריך נוכחי</div>
                                                                        }
                                                                    </div>
                                                                }
                                                            >
                                                                <div><Button onClick={() => { setShowModalAddKnesot(true); setYomAddKnesa(Yom?.tarekh) }} size="sm" className="m-3" color="primary" variant="flat">הוספה<FaPlus className="text-base" /></Button></div>
                                                                <div className="p-1">
                                                                    {
                                                                        BdekatYomKnesotKeam(Yom.tarekh, fetchedDataMunth)
                                                                            ?
                                                                            <Table dir="ltr" aria-label="Example static collection table">
                                                                                <TableHeader>
                                                                                    <TableColumn className="text-right text-base">יצאה</TableColumn>
                                                                                    <TableColumn className="text-right text-base">כניסה</TableColumn>
                                                                                    <TableColumn className="text-right text-base">היעדרות</TableColumn>
                                                                                    <TableColumn className="text-right text-base">שם</TableColumn>
                                                                                    <TableColumn className="text-right text-base"></TableColumn>
                                                                                </TableHeader>
                                                                                <TableBody>
                                                                                    {
                                                                                        GetReshematShaotAobdem(Yom, fetchedDataMunth)
                                                                                    }
                                                                                </TableBody>
                                                                            </Table>
                                                                            :
                                                                            <div className="m-5 text-center text-danger"> אין שעות ליום הזה ...</div>
                                                                    }
                                                                </div>
                                                            </AccordionItem>
                                                        ))
                                                    }
                                                </Accordion>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


