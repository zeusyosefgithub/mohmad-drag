'use client';
import { Autocomplete, AutocompleteItem, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner, Switch } from "@nextui-org/react";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSleigh, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { differenceInHours, differenceInMinutes, format, getDaysInMonth, parseISO } from 'date-fns';
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { Kbala } from "../Page Components/kbala";
import { useReactToPrint } from "react-to-print";
import ModalLohShaotAobdem from "../Modals/ModalLohShaotAobdem";
import ModalHosfatAobed from "../Modals/ModalHosfatAobed";
import { useRouter } from "next/navigation";
import ContactContext from "../auth/ContactContext";
import ModalBrtemNosfemAobed from '../Modals/ModalBrtemNosfemAobed';
import ModalKsfem from "../Modals/ModalKsfem";
import { useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";
import moment from "moment";
import { VscError } from "react-icons/vsc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ModalDafeShaot from "../Modals/ModalDafeShaot";
import ModalNetonemThltem from "../Modals/ModalNetonemThltem";
import { FaListCheck } from "react-icons/fa6";
import { FaList } from "react-icons/fa6";
import { FcOvertime } from "react-icons/fc";
import { LuPencilLine } from "react-icons/lu";
import ModalHosfatKnesaYdnet from "../Modals/ModalHosfatKnesaYdnet";
import { he } from 'date-fns/locale';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function Aobdem() {

    const aobdem = GetDocs('aobdem');
    const [loh, setLoh] = useState('לוח היום');
    const [knesotHeom, setKnesotHeom] = useState([]);
    const [knesotHeomBdeka, setKnesotHeomBdeka] = useState([]);
    const [knesotKlale, setKnesotKlale] = useState(null);
    const [aobed, setAobed] = useState();
    const currentDate = format(new Date(), 'dd-MM-yyyy');
    const [shaotHeomData, setShaotHeomData] = useState([]);
    const counter = GetDocs('metadata').find((count) => count.id === 'counterShaotAboda');
    const [showModalDafeShaot, setShowModalDafeShaot] = useState(false);
    const [showHosfatAobed, setShowHosfatAobed] = useState(false);
    const [showModalBrtemNosfemAobed, setShowModalBrtemNosfemAobed] = useState(false);
    const [showModalHosfatKnesaYdnet, setShowModalHosfatKnesaYdnet] = useState(false);
    const [loading,setLoading] = useState(false);

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
    const hosfatKnesa = async () => {
        let count1 = 1;
        let count2 = 0;
        let count3 = 0;

        for (let index = 0; index < knesotHeom.length; index++) {
            if (BdekatAefshrotUpdateDoc(knesotHeom[index].msbar)) {
                if (knesotHeom[index].knesa !== knesotHeomBdeka[index].knesa || knesotHeom[index].yetseah !== knesotHeomBdeka[index].yetseah || knesotHeom[index].headrot !== knesotHeomBdeka[index].headrot) {
                    console.log(knesotHeom[index]);
                    console.log(knesotHeomBdeka[index]);
                    await updateDoc(doc(firestore, 'shaotAboda', knesotHeom[index].id), {
                        knesa: knesotHeom[index].knesa,
                        yetseah: knesotHeom[index].yetseah,
                        headrot: knesotHeom[index].headrot,
                    });
                    count3 += knesotHeom[index]?.tfked === 'A' ? (counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesotHeom[index].yetseah, knesotHeom[index].knesa) - handleTimeDiffrence(knesotHeomBdeka[index].yetseah, knesotHeomBdeka[index].knesa)) : (handleTimeDiffrence(knesotHeom[index].yetseah, knesotHeom[index].knesa) - handleTimeDiffrence(knesotHeomBdeka[index].yetseah, knesotHeomBdeka[index].knesa))) : 0;
                    count2 += counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesotHeom[index].yetseah, knesotHeom[index].knesa) - handleTimeDiffrence(knesotHeomBdeka[index].yetseah, knesotHeomBdeka[index].knesa)) : (handleTimeDiffrence(knesotHeom[index].yetseah, knesotHeom[index].knesa) - handleTimeDiffrence(knesotHeomBdeka[index].yetseah, knesotHeomBdeka[index].knesa));
                }
            }
            else if (knesotHeom[index].knesa || knesotHeom[index].yetseah || knesotHeom[index].headrot) {
                await addDoc(collection(firestore, 'shaotAboda'), {
                    msbar: counter?.count + count1++,
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: knesotHeom[index].knesa,
                    yetseah: knesotHeom[index].yetseah,
                    aobed: knesotHeom[index].msbar,
                    headrot: knesotHeom[index].headrot,
                    hodesh: format(new Date(), 'MM-yyyy')
                });
                count2 += handleTimeDiffrence(knesotHeom[index].yetseah, knesotHeom[index].knesa);
                count3 += knesotHeom[index]?.tfked === 'A' ? (handleTimeDiffrence(knesotHeom[index].yetseah, knesotHeom[index].knesa)) : 0;
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
        setAobed(null);
        setLoh('לוח היום');
    }
    const BdekatAefshrotUpdateDoc = (val) => {
        if (!shaotHeomData.length) return false;
        for (let index = 0; index < shaotHeomData.length; index++) {
            if (shaotHeomData[index].aobed === val) {
                return true;
            }
        }
        return false;
    }
    function GetAobedBratem(val) {
        for (let index = 0; index < aobdem.length; index++) {
            if (aobdem[index].msbar === val) {
                return aobdem[index];
            }
        }
    }
    function flipDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        const flippedDateStr = `${year}-${month}-${day}`;
        return flippedDateStr;
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
    useEffect(() => {
        const unsubscribe = useGetDataByConditionWithoutUseEffect(
            'shaotAboda',
            'tarekh',
            '==',
            currentDate,
            result => {
                setShaotHeomData(result || []);
            }
        );
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [currentDate]);
    useEffect(() => {
        if (Array.isArray(shaotHeomData) && shaotHeomData.length > 0 && Array.isArray(aobdem) && aobdem.length > 0) {
            const updatedKnesotHeom = aobdem.map(knesa => {
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
            const updatedKnesotHeom = aobdem.map(knesa => {
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
    }, [shaotHeomData, aobdem]);
    

    const [btehotYom, setBtehotYom] = useState([]);

    const handleRemoveYom = (val) => {
        const newArray = btehotYom.filter(item => item !== val);
        setBtehotYom(newArray);
    };

    const toggleYom = (val) => {
        if (btehotYom.includes(val)) {
            handleRemoveYom(val);
        } else {
            setBtehotYom([...btehotYom, val]);
        }
    };


    const bdekatYomAemNbhar = (val) => {
        return !(knesotKlale && knesotKlale.some(item => item.tarekh === val));
    };

    
    useEffect(() => {
        setLoading(true);
        let newArray = [];
        if(knesotKlale?.length){
            for (let index = 0; index < knesotKlale.length; index++) {
                newArray.push(knesotKlale[index]);
            }
        }
        for (let index = 0; index < btehotYom.length; index++) {
            if (bdekatYomAemNbhar(btehotYom[index])) {
                const unsubscribe = useGetDataByConditionWithoutUseEffect('shaotAboda', 'tarekh', '==', btehotYom[index], (result) => {
                    const sortedResult = result.sort((a, b) => b.msbar - a.msbar);
                    for (let index1 = 0; index1 < sortedResult.length; index1++) {
                        newArray.push(sortedResult[index1]); 
                    }
                });
            }
        }
        setKnesotKlale(newArray);
        setLoading(false);
    }, [btehotYom]);

    console.log(knesotKlale);
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
    const BdekatAefshrotAedcon = () => {
        for (let index = 0; index < knesotHeomBdeka.length; index++) {
            if (knesotHeomBdeka[index].yetseah !== knesotHeom[index].yetseah ||
                knesotHeomBdeka[index].knesa !== knesotHeom[index].knesa ||
                knesotHeomBdeka[index].headrot !== knesotHeom[index].headrot) {
                return true;
            }
        }
        return false;
    }


    const GetHodshem = () => {
        let newArray = [];
        let AadHkhshav = parseInt(format(new Date(), 'MM'));
        for (let index = 0; index < 12; index++) {
            let munth = `${format(new Date(), 'yyyy')}-${index < 10 ? ('0' + (index + 1)) : index + 1}`;
            newArray.push({
                shem: format(munth, 'LLLL', { locale: he }),
                tarekh: `${format(new Date(), 'yyyy')}-${index < 10 ? ('0' + (index + 1)) : index + 1}`,
                msbar: index + 1
            });
        }
        return newArray;
    }

    const GetYmem = () => {
        let newArray = [];
        let AadHkhshav = parseInt(getDaysInMonth(new Date()));
        for (let index = 0; index < AadHkhshav; index++) {
            let day = `${format(new Date(), 'yyyy-MM')}-${index < 10 ? ('0' + (index + 1)) : index + 1}`;
            newArray.push({
                shem: GetTarekhShem(format(day, 'EEEE')),
                tarekh: `${index < 10 ? ('0' + (index + 1)) : index + 1}-${format(new Date(), 'MM-yyyy')}`,
                msbar: index + 1
            });
        }
        return newArray;
    }


    const bdekatYomInKnestKlale = (yom) => {
        if (!knesotKlale?.length) {
            return;
        }
        for (let index = 0; index < knesotKlale?.length; index++) {
            if (knesotKlale[index].tarekh === yom) {
                return true;
            }
        }
        return false;
    }

    const [tarekhKlaleNbhar, setTarekhKlaleNbhar] = useState('');


    const GetReshmatAobdemYememHodesh = (Yom,knesot,aobdemmm,btehot) => {
        console.log(knesot);
        console.log(btehot);
        let newArray = [];
        if(knesot.length > 0){
            if (bdekatYomInKnestKlale(Yom?.tarekh) && btehot.includes(Yom?.tarekh)) {
                for (let index = 0; index < knesot.length; index++) {
                    if (knesot[index]?.tarekh === Yom?.tarekh) {
                        newArray.push(<tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesot[index]?.yetseah}</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesot[index]?.knesa}</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{ }</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{ }</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesot[index]?.headrot}</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{GetTarekhShem(format(flipDate(knesot[index]?.tarekh), 'EEEE'))}</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesot[index]?.tarekh}</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{GetAobedBratem(knesot[index]?.aobed)?.shem}</td>
                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesot[index]?.headrot && knesot[index]?.yetseah && knesot[index]?.knesa ? <IoMdCheckmarkCircleOutline className="text-success text-[15px]" /> : <VscError className="text-danger text-[15px]" />}</td>
                        </tr>);
                    }
                }
            }
            else if (btehot.includes(Yom?.tarekh)) {
                for (let index = aobdemmm.length - 1; index >= 0; index--) {
                    newArray.push(<tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{aobdemmm[index].shem}</td>
                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"></td>
                    </tr>);
                }
            }
        }
        return newArray;
    }

    

    return (
        <div>
            {
                loading && <Spinner className="absolute top-0 bottom-0 right-0 left-0"/>
            }
            <ModalHosfatKnesaYdnet aobdem={aobdem} show={showModalHosfatKnesaYdnet} disable={() => setShowModalHosfatKnesaYdnet(false)} />
            <ModalBrtemNosfemAobed aobed={aobed} show={showModalBrtemNosfemAobed} disable={() => setShowModalBrtemNosfemAobed(false)} />
            <ModalHosfatAobed show={showHosfatAobed} disable={() => setShowHosfatAobed(false)} />
            <ModalDafeShaot aobdem={aobdem} counter={counter} show={showModalDafeShaot} disable={() => setShowModalDafeShaot(false)} />
            <div className='w-full flex justify-between items-center mt-5 '>

                <div className="w-full flex items-center justify-around flex-wrap">
                    <div className="p-5 justify-center w-[800px] bg-white rounded-xl shadow-xl mb-20 h-[650px]">
                        <div className="overflow-auto h-fit w-full" dir="rtl">
                            <div dir="ltr">
                                <div className="mt-5 mb-5 flex justify-around items-center">
                                    <Button size="sm" variant="faded" onClick={() => setShowHosfatAobed(true)}><div className="text-[18px] mr-1">+</div>הוספת עובד חדש</Button>
                                    <Button onClick={() => setShowModalDafeShaot(true)}><FcOvertime className="text-2xl" />דפי שעות</Button>
                                </div>
                                <div className="overflow-x-auto h-[500px]">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">פרטיים נוספיים</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">תעריף לשעה</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תפקיד</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">נייד</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">עיר</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">ישוב</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם עובד</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black">מספר עובד</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                aobdem.map((aobed, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowModalBrtemNosfemAobed(true); setAobed(aobed) }} size="sm">פתח</Button></td>
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




                    <div className="p-5 justify-center w-[800px] bg-white rounded-xl shadow-xl mb-20 h-[650px]">
                        <div>
                            <div className="flex justify-around items-center mb-5">
                                <Button variant='faded' className={loh === 'לוח כללי' && 'font-extrabold text-base'} color={loh === 'לוח כללי' ? 'primary' : 'default'} onClick={() => setLoh('לוח כללי')}><FaList className="text-base" />לוח כללי</Button>
                                <Button variant='faded' className={loh === 'לוח היום' && 'font-extrabold text-base'} color={loh === 'לוח היום' ? 'primary' : 'default'} onClick={() => setLoh('לוח היום')}><FaListCheck className="text-base" />לוח היום</Button>
                                <Button variant='faded' onClick={() => setShowModalHosfatKnesaYdnet(true)}><LuPencilLine className="text-base" />הוספה ידנית</Button>
                            </div>
                            <Divider />
                            <div className="mt-5 mb-5">
                                {
                                    loh === 'לוח היום' &&
                                    <div>
                                        <div className="overflow-x-auto h-[500px]">
                                            <table className="w-full table-auto border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-20">
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">היעדרות</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">יצאה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">כניסה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם עובד</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        knesotHeom.map((aobed, index) => {
                                                            return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><Dropdown dir="rtl">
                                                                    <DropdownTrigger>
                                                                        <Button color={aobed.headrot ? 'success' : "danger"} variant='flat' size="sm" className='m-2'>
                                                                            {aobed.headrot || 'בחר פריט'}
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
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={aobed.yetseah} onValueChange={(val) => handleChange(index, 'yetseah', handleTime2Change(val, aobed.knesa))} type="time" size="sm" color={aobed.yetseah ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={aobed.knesa} onValueChange={(val) => handleChange(index, 'knesa', val)} type="time" size="sm" color={aobed.knesa ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300">{aobed.shem}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {
                                            BdekatAefshrotAedcon() &&
                                            <div className="flex justify-end mt-4 mr-5">
                                                <Button onClick={hosfatKnesa} color="primary">
                                                    אישור
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                }
                                {
                                    loh === 'לוח כללי' &&
                                    <div>
                                        <div className="overflow-x-auto h-[500px]">
                                            {
                                                !tarekhKlaleNbhar && GetHodshem()?.map((hodesh, index) => {
                                                    return (hodesh?.msbar >= parseInt(format(new Date(), 'MM'))) && <>
                                                        <div className="flex items-center mt-1 mb-1 p-1 border-b-1">
                                                            <div className="w-full flex justify-center"><Button isDisabled={hodesh?.msbar !== parseInt(format(new Date(), 'MM'))} onClick={() => { setTarekhKlaleNbhar(hodesh?.tarekh) }} color="primary" variant='light' size="sm">פתח</Button></div>
                                                            <div className="w-full text-center">{format(hodesh?.tarekh, 'MM-yyyy')}</div>
                                                            <div className="w-full text-center">{hodesh?.shem}</div>
                                                        </div>
                                                    </>
                                                })
                                            }
                                            {
                                                tarekhKlaleNbhar &&
                                                <div className="overflow-x-auto h-[500px]">
                                                    <div className="flex justify-end">

                                                        <Button color="primary" variant='light' className="mb-2" onClick={() => setTarekhKlaleNbhar('')} size="sm"><FaArrowRightFromBracket />חזרה</Button>
                                                    </div>
                                                    <table className="w-full table-auto border-collapse">
                                                        <thead>
                                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black ">יצאה מתוקנת</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black ">כניסה מתוקנת</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black ">יצאה</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black ">כניסה</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black ">היעדרות</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black ">יום</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black ">תאריך</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-700 to-gray-800 font-extrabold text-black ">שם עובד</th>
                                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-800 to-gray-900 font-extrabold text-black "></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                GetYmem()?.map((Yom, index) => {
                                                                    return <>
                                                                        <tr key={index} className="border-t-4 border-gray-200 dark:border-gray-700">
                                                                            <td className="px-4 py-3 text-center text-[13px] text-black font-extrabold" colSpan={2}>
                                                                                {
                                                                                    btehotYom.includes(Yom.tarekh) ?
                                                                                    <Button onClick={() => toggleYom(Yom.tarekh)} size="sm" className="h-[20px]" color="primary" variant='light'><MdKeyboardArrowUp className="text-lg" /></Button>
                                                                                    :
                                                                                    <Button onClick={() => toggleYom(Yom.tarekh)} size="sm" className="h-[20px]" color="primary" variant='light'><MdKeyboardArrowDown className="text-lg" /></Button>
                                                                                }
                                                                            </td>
                                                                            <td className="px-4 py-3 text-center text-[13px] text-black font-extrabold" colSpan={3}>{Yom?.shem}</td>
                                                                            <td className="px-4 py-3 text-center text-[13px] text-black font-extrabold" colSpan={3}>{Yom?.tarekh}</td>
                                                                        </tr>
                                                                        {loading ? <tr><td colSpan={9} className="text-center">Loading...</td></tr> : GetReshmatAobdemYememHodesh(Yom,knesotKlale,aobdem,btehotYom)}
                                                                    </>
                                                                })
                                                            }
                                                            {/* {
                                                                knesotKlale?.map((knesa, index) => {
                                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesa?.yetseah}</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesa?.knesa}</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{ }</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{ }</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesa?.headrot}</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{GetTarekhShem(format(flipDate(knesa?.tarekh), 'EEEE'))}</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesa?.tarekh}</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{GetAobedBratem(knesa?.aobed)?.shem}</td>
                                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{knesa?.headrot && knesa?.yetseah && knesa?.knesa ? <IoMdCheckmarkCircleOutline className="text-success text-[15px]" /> : <VscError className="text-danger text-[15px]" />}</td>
                                                                    </tr>
                                                                })
                                                            } */}
                                                        </tbody>
                                                    </table>
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
            </div>

        </div>
    )
}