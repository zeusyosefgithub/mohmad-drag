'use client';
import { Accordion, AccordionItem, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { differenceInMinutes, format, getDaysInMonth, isBefore, parseISO } from 'date-fns';
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import ModalHosfatAobed from "../Modals/ModalHosfatAobed";
import ModalBrtemNosfemAobed from '../Modals/ModalBrtemNosfemAobed';
import { useGetDataByConditionWithoutUseEffect } from "../FireBase/getDataByCondition";
import moment from "moment";
import { VscError } from "react-icons/vsc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
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

export default function Aobdem() {

    const { contactName, setContactName, customerSet, setCustomerSet, isNehol, setIsNehol } = useContext(ContactContext);
    const aobdem = GetDocs('aobdem');
    const router = useRouter();
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
    const [arrayResualt, setArrayResualt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [getAdconem, setGetAdconem] = useState(false);

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
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;

        for (let index = 0; index < knesotHeom.length; index++) {
            if (BdekatAefshrotUpdateDoc(knesotHeom[index].msbar)) {
                if (knesotHeom[index].knesa !== knesotHeomBdeka[index].knesa || knesotHeom[index].yetseah !== knesotHeomBdeka[index].yetseah || knesotHeom[index].headrot !== knesotHeomBdeka[index].headrot) {
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
                if (knesa.active) {
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
                }
            });
            setKnesotHeom(updatedKnesotHeom);
            setKnesotHeomBdeka(updatedKnesotHeom);
        }
        else if (!shaotHeomData?.length) {
            const updatedKnesotHeom = aobdem.map(knesa => {
                if (knesa.active) {
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
                }

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
            setLoading(true);

            if (!knesotKlale?.some(item => item.tarekh === val)) {
                useGetDataByConditionWithoutUseEffect('shaotAboda', 'tarekh', '==', val, (result) => {
                    if (Array.isArray(result)) {
                        const sortedResult = result.sort((a, b) => b.msbar - a.msbar);
                        setKnesotKlale(prev => {
                            if (Array.isArray(prev)) {
                                return [...prev, ...sortedResult];
                            }
                            return [...sortedResult];
                        });
                    } else {
                        console.error('Expected result to be an array, but got:', result);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }
    };

    const bdekatYomAemNbhar = (val) => {
        return !(knesotKlale && knesotKlale.some(item => item.tarekh === val));
    };

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
            if (knesotHeomBdeka[index]?.yetseah !== knesotHeom[index]?.yetseah ||
                knesotHeomBdeka[index]?.knesa !== knesotHeom[index]?.knesa ||
                knesotHeomBdeka[index]?.headrot !== knesotHeom[index]?.headrot) {
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


    const bdekatYomInKnestKlale = (yom) => {
        if (!knesotKlale?.length) {
            return false;
        }
        for (let index = 0; index < knesotKlale?.length; index++) {
            if (knesotKlale[index].tarekh === yom) {
                return true;
            }
        }
        return false;
    }

    const [showModalAdconHosfaKnesa, setShowModalAdconHosfaKnesa] = useState(false);
    const [typeAdcon, setTypeAdcon] = useState('');
    const [aobedLaedcon, setAobedLaedcon] = useState(null);
    const [knesaLaedcon, setKnesaLaedcon] = useState(null);
    const [yomLaedcon, setYomLaedcon] = useState(null);
    const [tarekhKlaleNbhar, setTarekhKlaleNbhar] = useState('');

    const isCurrentDateBefore = (date) => {
        const currentDate = new Date();
        return isBefore(currentDate, new Date(date));
    };

    const removeDuplicates = (array) => {
        let newArray = [];
        let resArray = [];
        for (let i = array.length - 1; i >= 0; i--) {
            if (!newArray.includes(array[i].msbar)) {
                resArray.push(array[i]);
                newArray.push(array[i].msbar);
            }
        }
        return resArray;
    };

    const GetKnesotKlaleLfeYom = (Yom) => {
        let newArray = [];
        for (let index = 0; index < knesotKlale?.length; index++) {
            if (knesotKlale[index].tarekh === Yom) {
                newArray.push(knesotKlale[index]);
            }
        }
        return newArray;
    }

    console.log(knesotKlale);

    // const GetReshmatAobdemYememHodesh = (Yom, newArrayWithouRpeat) => {
    //     let newArray = [];
    //     if (bdekatYomInKnestKlale(Yom?.tarekh) && btehotYom.includes(Yom?.tarekh)) {
    //         let arrayAobdemAbdo = [];
    //         for (let index = 0; index < newArrayWithouRpeat.length; index++) {
    //             if (newArrayWithouRpeat[index]?.tarekh === Yom?.tarekh) {
    //                 arrayAobdemAbdo.push(newArrayWithouRpeat[index].aobed);
    //                 newArray.push(<tr key={index}>
    //                     <td>{newArrayWithouRpeat[index]?.yetseah}</td>
    //                     <td>{newArrayWithouRpeat[index]?.knesa}</td>
    //                     <td></td>
    //                     <td></td>
    //                     <td>{newArrayWithouRpeat[index]?.headrot}</td>
    //                     <td>{GetTarekhShem(format(flipDate(newArrayWithouRpeat[index]?.tarekh), 'EEEE'))}</td>
    //                     <td>{newArrayWithouRpeat[index]?.tarekh}</td>
    //                     <td>{GetAobedBratem(newArrayWithouRpeat[index]?.aobed)?.shem}</td>
    //                     <td>
    //                         {newArrayWithouRpeat[index]?.headrot && newArrayWithouRpeat[index]?.yetseah && newArrayWithouRpeat[index]?.knesa
    //                             ?
    //                             <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setKnesaLaedcon(newArrayWithouRpeat[index]); setAobedLaedcon(GetAobedBratem(newArrayWithouRpeat[index].aobed)); setTypeAdcon('adcon'); setShowModalAdconHosfaKnesa(true); }} className="text-success cursor-pointer text-[18px]" />
    //                             : newArrayWithouRpeat[index]?.headrot || newArrayWithouRpeat[index]?.yetseah || newArrayWithouRpeat[index]?.knesa ?
    //                                 <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setKnesaLaedcon(newArrayWithouRpeat[index]); setAobedLaedcon(GetAobedBratem(newArrayWithouRpeat[index].aobed)); setTypeAdcon('adcon'); setShowModalAdconHosfaKnesa(true); }} className="text-danger cursor-pointer text-[17px]" />
    //                                 :
    //                                 <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh)?.tarekh; setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className="text-danger cursor-pointer text-[17px]" />}</td>
    //                 </tr>)

    //             }
    //         }
    //         for (let index = 0; index < aobdem.length; index++) {
    //             if (!arrayAobdemAbdo.includes(aobdem[index].msbar)) {
    //                 newArray.push(<tr key={index}>
    //                     <td></td>
    //                     <td></td>
    //                     <td></td>
    //                     <td></td>
    //                     <td></td>
    //                     <td></td>
    //                     <td></td>
    //                     <td><div className={!isCurrentDateBefore(flipDate(Yom?.tarekh)) && 'text-danger'}>{aobdem[index].shem}</div></td>
    //                     <td>
    //                         {
    //                             isCurrentDateBefore(flipDate(Yom?.tarekh)) ?
    //                                 <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-primary`} />
    //                                 :
    //                                 <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-danger`} />
    //                         }
    //                     </td>
    //                 </tr>);
    //             }
    //         }
    //     }
    //     else if (btehotYom.includes(Yom?.tarekh)) {
    //         for (let index = aobdem.length - 1; index >= 0; index--) {
    //             newArray.push(<tr key={index}>
    //                 <td></td>
    //                 <td></td>
    //                 <td></td>
    //                 <td></td>
    //                 <td></td>
    //                 <td></td>
    //                 <td></td>
    //                 <td><div className={!isCurrentDateBefore(flipDate(Yom?.tarekh)) && 'text-danger'}>{aobdem[index].shem}</div></td>
    //                 <td>
    //                     {
    //                         isCurrentDateBefore(flipDate(Yom?.tarekh)) ?
    //                             <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-primary`} />
    //                             :
    //                             <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-danger`} />
    //                     }
    //                 </td>
    //             </tr>);
    //         }
    //     }
    //     return newArray;
    // }

    const GetReshematShaotAobdem = (Yom, newArrayWithouRpeat) => {
        let newArray = [];
        if (bdekatYomInKnestKlale(Yom?.tarekh) && btehotYom.includes(Yom?.tarekh)) {
            let arrayAobdemAbdo = [];
            for (let index = 0; index < newArrayWithouRpeat.length; index++) {
                if (newArrayWithouRpeat[index]?.tarekh === Yom?.tarekh) {
                    arrayAobdemAbdo.push(newArrayWithouRpeat[index].aobed);
                    newArray.push(<TableRow key={index + Yom?.tarekh + '1'}>
                        <TableCell className="text-[10px] text-right">{newArrayWithouRpeat[index]?.yetseah}</TableCell>
                        <TableCell className="text-[10px] text-right">{newArrayWithouRpeat[index]?.knesa}</TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right">{newArrayWithouRpeat[index]?.headrot}</TableCell>
                        <TableCell className="text-[10px] text-right">{GetTarekhShem(format(flipDate(newArrayWithouRpeat[index]?.tarekh), 'EEEE'))}</TableCell>
                        <TableCell className="text-[10px] text-right">{newArrayWithouRpeat[index]?.tarekh}</TableCell>
                        <TableCell className="text-[10px] text-right">{GetAobedBratem(newArrayWithouRpeat[index]?.aobed)?.shem}</TableCell>
                        <TableCell className="text-[10px] text-right">
                            {newArrayWithouRpeat[index]?.headrot && newArrayWithouRpeat[index]?.yetseah && newArrayWithouRpeat[index]?.knesa
                                ?
                                <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setKnesaLaedcon(newArrayWithouRpeat[index]); setAobedLaedcon(GetAobedBratem(newArrayWithouRpeat[index].aobed)); setTypeAdcon('adcon'); setShowModalAdconHosfaKnesa(true); }} className="text-success cursor-pointer text-[18px]" />
                                : newArrayWithouRpeat[index]?.headrot || newArrayWithouRpeat[index]?.yetseah || newArrayWithouRpeat[index]?.knesa ?
                                    <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setKnesaLaedcon(newArrayWithouRpeat[index]); setAobedLaedcon(GetAobedBratem(newArrayWithouRpeat[index].aobed)); setTypeAdcon('adcon'); setShowModalAdconHosfaKnesa(true); }} className="text-danger cursor-pointer text-[17px]" />
                                    :
                                    <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh)?.tarekh; setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className="text-danger cursor-pointer text-[17px]" />}</TableCell>
                    </TableRow>)

                }
            }
            for (let index = 0; index < aobdem.length; index++) {
                if (!arrayAobdemAbdo.includes(aobdem[index].msbar)) {
                    newArray.push(<TableRow key={index + Yom?.tarekh + '2'}>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"></TableCell>
                        <TableCell className="text-[10px] text-right"><div className={!isCurrentDateBefore(flipDate(Yom?.tarekh)) && 'text-danger'}>{aobdem[index].shem}</div></TableCell>
                        <TableCell className="text-[10px] text-right">
                            {
                                isCurrentDateBefore(flipDate(Yom?.tarekh)) ?
                                    <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-primary`} />
                                    :
                                    <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-danger`} />
                            }
                        </TableCell>
                    </TableRow>);
                }
            }
        }
        else if (btehotYom.includes(Yom?.tarekh)) {
            for (let index = aobdem.length - 1; index >= 0; index--) {
                newArray.push(<TableRow key={index + Yom?.tarekh + '3'} >
                    <TableCell className="text-[10px] text-right"></TableCell>
                    <TableCell className="text-[10px] text-right"></TableCell>
                    <TableCell className="text-[10px] text-right"></TableCell>
                    <TableCell className="text-[10px] text-right"></TableCell>
                    <TableCell className="text-[10px] text-right"></TableCell>
                    <TableCell className="text-[10px] text-right"></TableCell>
                    <TableCell className="text-[10px] text-right"></TableCell>
                    <TableCell className="text-[10px] text-right"><div className={!isCurrentDateBefore(flipDate(Yom?.tarekh)) && 'text-danger'}>{aobdem[index].shem}</div></TableCell>
                    <TableCell className="text-[10px] text-right">
                        {
                            isCurrentDateBefore(flipDate(Yom?.tarekh)) ?
                                <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-primary`} />
                                :
                                <TbClockEdit onClick={() => { setYomLaedcon(Yom?.tarekh); setAobedLaedcon(aobdem[index]); setTypeAdcon('hosfaa'); setShowModalAdconHosfaKnesa(true); }} className={`text-[17px] cursor-pointer text-danger`} />
                        }
                    </TableCell>
                </TableRow>);
            }
        }
        return newArray;
    }

    const [showInfo, setShowInfo] = useState(false);
    useEffect(() => {
        if (isNehol) {
            router.push('/');
            setShowInfo(false);
        }
        else {
            setShowInfo(true);
        }
    }, [isNehol]);



    return showInfo && (
        <div>
            <ModalKnesaKlalet counter={counter} yom={yomLaedcon} hodesh={tarekhKlaleNbhar} aobed={aobedLaedcon} knesa={knesaLaedcon} type={typeAdcon} show={showModalAdconHosfaKnesa} disable={() => { setShowModalAdconHosfaKnesa(false); setTypeAdcon(''); setAobedLaedcon(null); setKnesaLaedcon(null); setYomLaedcon(null); }} />
            <ModalBrtemNosfemAobed aobed={aobed} show={showModalBrtemNosfemAobed} disable={() => setShowModalBrtemNosfemAobed(false)} />
            <ModalHosfatAobed show={showHosfatAobed} disable={() => setShowHosfatAobed(false)} />
            <ModalDafeShaot aobdem={aobdem} counter={counter} show={showModalDafeShaot} disable={() => setShowModalDafeShaot(false)} />
            <div className='w-full flex justify-between items-center mt-5 '>

                <div className="w-full flex items-center justify-around flex-wrap">
                    <div className="p-5 justify-center w-[900px] bg-white rounded-xl shadow-xl mb-20 h-[650px]">
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




                    <div className="p-5 justify-center w-[900px] bg-white rounded-xl shadow-xl mb-20 h-[650px]">
                        <div>
                            <div className="flex justify-around items-center mb-5">
                                <Button variant='flat' className={loh === 'לוח כללי' && 'font-extrabold text-base'} color={loh === 'לוח כללי' ? 'primary' : 'default'} onClick={() => setLoh('לוח כללי')}><FaList className="text-base" />לוח כללי</Button>
                                <Button variant='flat' className={loh === 'לוח היום' && 'font-extrabold text-base'} color={loh === 'לוח היום' ? 'primary' : 'default'} onClick={() => setLoh('לוח היום')}><FaListCheck className="text-base" />לוח היום</Button>
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
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">היעדרות</th>
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">יצאה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">כניסה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">שם עובד</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        knesotHeom.map((aobed, index) => {
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
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={aobed?.yetseah} onValueChange={(val) => handleChange(index, 'yetseah', handleTime2Change(val, aobed?.knesa))} type="time" size="sm" color={aobed?.yetseah ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={aobed?.knesa} onValueChange={(val) => handleChange(index, 'knesa', val)} type="time" size="sm" color={aobed?.knesa ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300">{aobed?.shem}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {
                                            BdekatAefshrotAedcon() &&
                                            <div className="flex justify-end">
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
                                                    return <div key={hodesh?.tarekh} className="flex items-center mt-1 mb-1 p-1 border-b-1">
                                                        <div className="w-full flex justify-center"><Button variant='flat' onClick={() => { setTarekhKlaleNbhar(hodesh?.tarekh) }} color="primary" size="sm">פתח</Button></div>
                                                        <div className="w-full text-center">{format(hodesh?.tarekh, 'MM-yyyy')}</div>
                                                        <div className="w-full text-center">{hodesh?.shem}</div>
                                                    </div>

                                                })
                                            }
                                            {
                                                tarekhKlaleNbhar &&
                                                <div className="overflow-x-auto h-[500px]">
                                                    <div className="flex justify-between items-start sticky top-0 z-20 bg-white">
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
                                                    {/* <table className="w-full table-auto border-collapse">
                                                            <thead>
                                                                <tr className="bg-gray-100 dark:bg-gray-800 sticky top-10 z-10">
                                                                    <th className="px-4 py-2 text-center text-[12px] font-extrabold text-black ">יצאה מתוקנת</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black ">כניסה מתוקנת</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black ">יצאה</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black ">כניסה</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black ">היעדרות</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black ">יום</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black ">תאריך</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black ">שם עובד</th>
                                                                    <th className="px-4 py-2 text-center text-[12px]  font-extrabold text-black "></th>
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
                                                                                            <Button onClick={() => toggleYom(Yom.tarekh)} size="sm" className="h-[20px]" color="primary" variant='faded'><MdKeyboardArrowUp className="text-lg" /></Button>
                                                                                            :
                                                                                            <Button onClick={() => { toggleYom(Yom.tarekh); setArrayResualt(index); }} size="sm" className="h-[20px]" color="primary" variant='faded'><MdKeyboardArrowDown className="text-lg" /></Button>
                                                                                    }
                                                                                </td>
                                                                                <td className="px-4 py-3 text-center text-[13px] text-black font-extrabold" colSpan={3}>{Yom?.shem}</td>
                                                                                <td className="px-4 py-3 text-center text-[13px] text-black font-extrabold" colSpan={4}>{Yom?.tarekh}</td>
                                                                            </tr>
                                                                            {(loading && (arrayResualt === index)) ?
                                                                                <tr key={index}><td colSpan={9} className="text-center"><Spinner /></td></tr>
                                                                                : GetReshmatAobdemYememHodesh(Yom, )}
                                                                        </>
                                                                    })
                                                                }
                                                            </tbody>
                                                            {
                                                                console.log(btehotYom)
                                                            }
                                                            {
                                                                console.log()
                                                            }

                                                        </table> */}
                                                    <div className="bg-white p-3">
                                                        <Accordion selectedKeys={btehotYom} onSelectionChange={(val) => {
                                                            console.log(val.currentKey);
                                                            val.currentKey && toggleYom(val.currentKey);
                                                            setBtehotYom((prev) => [...prev, val.currentKey]);
                                                        }} dir="rtl" className="w-full" variant="splitted" selectionMode='multiple'>
                                                            {
                                                                GetYmem()?.map((Yom, index) => (
                                                                    <AccordionItem
                                                                        dir="rtl"
                                                                        className="w-full table-row bg-gray-50"
                                                                        key={Yom?.tarekh}
                                                                        title={
                                                                            <div className="w-full flex items-center">
                                                                                <div className="w-full max-w-[100px]">{Yom?.shem}</div>
                                                                                <div>{Yom?.tarekh}</div>
                                                                            </div>
                                                                        }
                                                                    >
                                                                        <div className="p-1">
                                                                            <Table dir="ltr" aria-label="Example static collection table">
                                                                                <TableHeader>
                                                                                    <TableColumn className="text-right text-xs">יצאה מתוקנת</TableColumn>
                                                                                    <TableColumn className="text-right text-xs">כניסה מתוקנת</TableColumn>
                                                                                    <TableColumn className="text-right text-xs">יצאה</TableColumn>
                                                                                    <TableColumn className="text-right text-xs">כניסה</TableColumn>
                                                                                    <TableColumn className="text-right text-xs">היעדרות</TableColumn>
                                                                                    <TableColumn className="text-right text-xs">יום</TableColumn>
                                                                                    <TableColumn className="text-right text-xs">תאריך</TableColumn>
                                                                                    <TableColumn className="text-right text-xs">שם</TableColumn>
                                                                                    <TableColumn className="text-right text-xs"></TableColumn>
                                                                                </TableHeader>
                                                                                <TableBody>
                                                                                    {
                                                                                        (loading && (arrayResualt === index)) ? <TableRow><TableColumn className="text-center" colSpan={9}><Spinner/></TableColumn></TableRow> :
                                                                                        GetReshematShaotAobdem(Yom, removeDuplicates(GetKnesotKlaleLfeYom(Yom?.tarekh)))
                                                                                    }
                                                                                </TableBody>
                                                                            </Table>
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
            </div>

        </div>
    )
}


