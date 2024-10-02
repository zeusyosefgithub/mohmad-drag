'use client';
import { Autocomplete, AutocompleteItem, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner, Switch } from "@nextui-org/react";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaRegCalendarCheck, FaSleigh, FaTrailer, FaTrash, FaUser, FaUserTag, FaWarehouse } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { addMonths, differenceInDays, differenceInHours, differenceInMinutes, format, parseISO, setDate, subMonths } from 'date-fns';
import GetDocs, { GetDocsWithLimit } from "../FireBase/getDocs";
import { addDoc, collection, deleteDoc, doc, limit, onSnapshot, query, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { Kbala } from "../Page Components/kbala";
import { useReactToPrint } from "react-to-print";
import ModalLohShaotAobdem from "../Modals/ModalLohShaotAobdem";
import ModalHosfatAobed from "../Modals/ModalHosfatAobed";
import { useRouter } from "next/navigation";
import ContactContext from "../auth/ContactContext";
import ModalBrtemNosfemAobed from '../Modals/ModalBrtemNosfemAobed';
import ModalKsfem from "../Modals/ModalKsfem";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";
import moment from "moment";
import { VscError } from "react-icons/vsc";
import { IoIosWater, IoMdCheckmarkCircleOutline } from "react-icons/io";
import ModalDafeShaot from "../Modals/ModalDafeShaot";
import ModalHosfatHotsaaHdasha from "../Modals/ModalHosfatHotsaaHdasha";
import ModalHtsgatHotsaa from "../Modals/ModalHtsgatHotsaa";
import { orderBy } from "lodash";
import ModalShowBerotAska from "../Modals/ModalShowBerotAska";
import ModalAddSobak from "../Modals/ModalAddSbak";
import ModalNetonemThltem from "../Modals/ModalNetonemThltem";
import { FaUsers } from "react-icons/fa";
import { GiExpense, GiHook } from "react-icons/gi";
import { MdElectricBolt, MdOutlineShoppingBag } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import ModalBerotAskatKsfem from "../Modals/ModalBerotAskatKsfem";
import { FaBoxOpen } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";


export default function Management() {

    const { contactName, setContactName, customerSet, setCustomerSet } = useContext(ContactContext);
    const lkhot = GetDocs('customers');
    const sbkem = GetDocs('sbkem');
    const hotsaot = GetDocs('hotsaot');
    const aobdem = GetDocs('aobdem');
    const mlae = GetDocs('mlae');
    const tnoahBmzomnem = GetDocsWithLimit('tnoahBmzomnem', 15);
    const router = useRouter();
    const [htsgatbrtem, sethtsagatBrtem] = useState('לקחות');
    const [loading, setLoading] = useState(false);
    const [showModalKsfem, setShowModalKsfem] = useState(false);
    const [showModalHtsgatHotsaa, setShowModalHtsgatHotsaa] = useState(false);
    const [hotsaa, setHotsaa] = useState(null);
    const [brtemMhtsgatHotsaa, setBrtemMhtsgatHotsaa] = useState({});
    const [afshrotArekha, setAfshrotRekha] = useState(false);
    const [aska, setAska] = useState(null);
    const [showBerotAska, setShowBerotAska] = useState(false);
    const previousMonthDate = subMonths(new Date(), 1);
    const [GetData, setGetData] = useState(false);
    const [heshovShaotAboda, setHeshovShaotAboda] = useState([]);
    const [askatKsfem, setAskatKsfem] = useState(null);
    const [showModalBerotAskatKsfem, setShowModalBerotAskatKsfem] = useState(false);
    const [hotsaaType, setHotsaaType] = useState('hotsaot');

    const hdbsatDafeShaot = async () => {

        await updateDoc(doc(firestore, 'metadata', counter?.id), {
            hotsaotDafeShaot: format(new Date, 'MM-yyyy')
        });
        setGetData(true);
    }

    useEffect(() => {
        if (GetData) {
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'shaotAboda',
                'hodesh',
                '==',
                format(previousMonthDate, 'MM-yyyy'),
                result => {
                    result.length && sumTimeDifferences(result);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [GetData]);

    const GetTarefLeshaa = (val) => {
        for (let index = 0; index < aobdem.length; index++) {
            if (aobdem[index].msbar === val) {
                return aobdem[index].tarefLshaa;
            }
        }
        return null;
    }

    const GetSkhomSofe = (result) => {
        let sum = 0;
        for (let index = 0; index < result.length; index++) {
            sum += (result[index].tarefLeshaaa * result[index].totalDifference)
        }
        return sum;
    }

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

    const sumTimeDifferences = async (arr) => {
        const groupedByAobed = arr.reduce((acc, obj) => {
            if (!acc[obj.aobed]) {
                acc[obj.aobed] = {
                    totalDifference: 0,
                    id: obj.id,
                    tarekh: obj.tarekh,
                    tarefLeshaaa: 0
                };
            }
            const difference = handleTimeDiffrence(obj.yetseah, obj.knesa);
            if (difference) {
                acc[obj.aobed].totalDifference += difference;
            }
            return acc;
        }, {});
        const result = Object.keys(groupedByAobed).map(aobed => ({
            aobed: parseInt(aobed),
            totalDifference: groupedByAobed[aobed].totalDifference,
            id: groupedByAobed[aobed].id,
            tarekh: groupedByAobed[aobed].tarekh,
            tarefLeshaaa: GetTarefLeshaa(parseInt(aobed))
        }));
        if (!result.length) return;
        await updateDoc(doc(firestore, 'metadata', 'counterShaotAboda'), {
            hotsaotSkhar: parseFloat(GetSkhomSofe(result).toFixed(2))
        });
        return result;
    };

    const [hestoriaKneot, setHestoriaKneot] = useState([]);
    useEffect(() => {
        const q = query(
            collection(firestore, 'tnoahBkneot'),
            limit(20)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            items.sort((a, b) => b.msbar - a.msbar);
            setHestoriaKneot(items);
        });

        return () => unsubscribe();
    }, []);

    function flipDate(dateStr) {
        if (dateStr === '') {
            return null;
        }
        if (!dateStr || typeof dateStr !== 'string') {
            return null;
        }

        const [day, month, year] = dateStr.split('-');

        if (!day || !month || !year) {
            console.error('Date string is not in the expected format (dd-mm-yyyy):', dateStr);
        }

        const flippedDateStr = `${year}-${month}-${day}`;
        return flippedDateStr;
    }

    function mtsavArekha(val) {
        if (fetchClosestDateDoc()?.adconAhron === '') {
            return null;
        }
        return differenceInDays(flipDate(fetchClosestDateDoc()?.adconAhron), val);
    }

    const fetchClosestDateDoc = () => {
        try {
            let closestPastDoc = null;
            let closestFutureDoc = null;
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];
            mlae.forEach(doc => {
                const adconAhron = doc.adconAhron;
                const docDate = parse(adconAhron, 'dd-MM-yyyy', new Date());

                if (isValid(docDate)) {
                    if (docDate <= today && (!closestPastDoc || docDate > parse(closestPastDoc.adconAhron, 'dd-MM-yyyy', new Date()))) {
                        closestPastDoc = doc;
                    } else if (docDate >= today && (!closestFutureDoc || docDate < parse(closestFutureDoc.adconAhron, 'dd-MM-yyyy', new Date()))) {
                        closestFutureDoc = doc;
                    }
                }
            });
            const calculateDistance = (doc) => {
                const adconAhron = doc.adconAhron;
                const docDate = parse(adconAhron, 'dd-MM-yyyy', new Date());
                return formatDistanceToNow(docDate);
            };
            if (closestPastDoc && closestFutureDoc) {
                const pastDistance = calculateDistance(closestPastDoc);
                const futureDistance = calculateDistance(closestFutureDoc);
                return (pastDistance < futureDistance ? { ...closestPastDoc, distance: pastDistance } : { ...closestFutureDoc, distance: futureDistance });
            } else if (closestPastDoc) {
                return ({ ...closestPastDoc, distance: calculateDistance(closestPastDoc) });
            } else if (closestFutureDoc) {
                return ({ ...closestFutureDoc, distance: calculateDistance(closestFutureDoc) });
            } else {
                return (null);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };
    const formatNumberWithCommas = (num) => {
        return '₪' + num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const [showModalAddSbak, setShowModalAddSbak] = useState(false);


    const [showModalNetonemThltem, setShowModalNetonemThltem] = useState(false);

    const tnoahBmz12omnem = GetDocs('tnoahBmzomnem');




    return (
        <div>
            <ModalBerotAskatKsfem Aska={askatKsfem} show={showModalBerotAskatKsfem} disable={() => setShowModalBerotAskatKsfem(false)} />
            <ModalNetonemThltem show={showModalNetonemThltem} disable={() => setShowModalNetonemThltem(false)} />
            {<ModalShowBerotAska afshrotArekha={afshrotArekha} mlae={mlae} aska={aska} show={showBerotAska} disable={() => { console.log(aska); setShowBerotAska(false) }} />}
            <ModalAddSobak show={showModalAddSbak} disable={() => setShowModalAddSbak(false)} />
            <ModalHtsgatHotsaa sbkemA={sbkem} aobdem={aobdem} aemTshlom={(val1, val2, val3, val4, val5) => {
                if (val1) {
                    setShowModalKsfem(true);
                    setBrtemMhtsgatHotsaa({
                        skhom: val2,
                        sbak: val3,
                        sogHotsaa: val4,
                        sbakAoLkoh: val5
                    });
                }
                else {
                    setShowModalKsfem(false);
                    setBrtemMhtsgatHotsaa({
                        skhom: val2,
                        sbak: val3,
                        sogHotsaa: val4,
                        sbakAoLkoh: val5
                    });
                }
            }} show={showModalHtsgatHotsaa} disable={(val) => {
                setShowModalHtsgatHotsaa(false);
                if (val) {
                    setShowModalAddSbak(true);
                }
            }} hotsaa={hotsaa} />
            <ModalKsfem aobdem={aobdem} lkhot={lkhot} sbkem={sbkem} brtemMhtgatHotsaa={brtemMhtsgatHotsaa} show={showModalKsfem} disable={() => setShowModalKsfem(false)} />
            {loading && <Spinner className="absolute top-0 right-0 bottom-0 left-0" />}
            <div className="w-full pl-16 pr-16">
                <div className="bg-white shadow-2xl rounded-2xl p-5 flex justify-around">
                    <Button onClick={() => setShowModalNetonemThltem(true)}>נתונים תחלתיים</Button>
                    <Button onClick={() => setShowModalKsfem(true)}>הנהלת חשבונות</Button>
                    {/* <Button onClick={async() => {
                        for (let index = 0; index < tnoahBmzomnem.length; index++) {
                            await deleteDoc(doc(firestore,'tnoahBmzomnem',tnoahBmzomnem[index].id));
                            
                        }
                    }}>
                        delete
                    </Button> */}
                </div>
            </div>
            <div className='w-full flex justify-between items-center mt-5 '>
                {/* <div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto">
                        <div className="text-center text-2xl">
                            לקחות
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מיקוד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם משפחה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תז</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מס בית</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">יתרת חישבון</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">עיר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">ישוב</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם לקוח</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר לקוח</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2000</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">0503209026</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            ספקים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">יתרת חישבון</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">עיר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">ישוב</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם ספק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר ספק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            עובדים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תעריף לשעה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תפקיד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">עיר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">ישוב</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם עובד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר עובד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">יצור</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            שיקים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">נייד</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר פעל שיק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">פעל שיק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סכום</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך פרעון</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר חשבון בנק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם בנק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר בנק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר שיק</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">30</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">יצור</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-5xl mx-auto mt-20">
                        <div className="text-center text-2xl">
                            תנועה במזומנים
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">פירוט</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סכום כולל</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סוג תנועה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר תנועה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">יצור</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">2020.15.01</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">40</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1200</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">מחמוד</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}




                <div className="w-full flex items-center justify-center flex-wrap">


                    <div className="p-5 justify-center w-full max-w-[750px] ml-10 mr-10 bg-white rounded-xl shadow-xl mb-5 h-[650px]">
                        <div className="w-full flex justify-around items-center">
                            <Button variant='faded' className={htsgatbrtem === 'סבקים' && 'font-extrabold text-base'} color={htsgatbrtem === 'סבקים' ? 'primary' : 'default'} onClick={() => sethtsagatBrtem('סבקים')}><MdOutlineShoppingBag className="text-base" />ספקים/שלטנות</Button>
                            <Button variant='faded' className={htsgatbrtem === 'לקחות' && 'font-extrabold text-base'} color={htsgatbrtem === 'לקחות' ? 'primary' : 'default'} onClick={() => sethtsagatBrtem('לקחות')}><FaUsers className="text-base" />לקחות</Button>
                            <Button variant='faded' className={htsgatbrtem === 'תנועה בהצאות' && 'font-extrabold text-base'} color={htsgatbrtem === 'תנועה בהצאות' ? 'primary' : 'default'} onClick={() => sethtsagatBrtem('תנועה בהצאות')}><GiExpense className="text-base" />תנועה בהצאות</Button>
                            <Button variant='faded' className={htsgatbrtem === 'תנועה בכספים' && 'font-extrabold text-base'} color={htsgatbrtem === 'תנועה בכספים' ? 'primary' : 'default'} onClick={() => sethtsagatBrtem('תנועה בכספים')}><FaMoneyBillTrendUp className="text-base" />תנועה בכספים</Button>
                        </div>
                        <Divider className="mt-5" />
                        <div className="overflow-auto h-fit w-full" dir="rtl">
                            {
                                htsgatbrtem === 'לקחות' && <div dir="ltr">
                                    <div className="mt-5 mb-5 flex justify-around items-center">
                                        <Button size="sm" variant="faded" onClick={() => {
                                            setLoading(true);
                                            router.push('/activion');
                                        }}><div className="text-[18px] mr-1">+</div>הוספת לקוח חדש</Button>
                                    </div>
                                    <div className="overflow-x-auto h-[450px]">
                                        <table className="w-full table-auto border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">פרטיים נוספיים</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">יתרת חישבון</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">ישוב</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">נייד</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">עיר</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">תז</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם לקוח</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black">מספר לקוח</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    lkhot.map((lkooh, index) => {
                                                        return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm">פתח</Button></td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.yetera}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.street}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.phone}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.city}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.cusid}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.name}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.idnum}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {
                                htsgatbrtem === 'סבקים' && <div dir="ltr">
                                    <div className="mt-5 mb-5 flex justify-around items-center">
                                        <Button size="sm" variant="faded" onClick={() => setShowModalAddSbak(true)}><div className="text-[18px] mr-1">+</div>הוספת ספק/שלטנות חדש</Button>
                                    </div>
                                    <div className="overflow-x-auto h-[450px]">
                                        <table className="w-full table-auto border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">פרטיים נוספיים</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">יתרת חישבון</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">ישוב</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">נייד</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">עיר</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">תפקיד</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם לקוח</th>
                                                    <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black">מספר לקוח</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    sbkem.map((lkooh, index) => {
                                                        return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm">פתח</Button></td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.ytratHeshvon}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.yeshov}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.nead}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.aer}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.sherot}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.shem}</td>
                                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{lkooh?.msbar}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {
                                htsgatbrtem === 'תנועה בהצאות' &&
                                <div dir="ltr" className="overflow-x-auto h-[520px]">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">פירוט הוצאה</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">מצב עריכה</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">תאריך הוצאה</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">שעה</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מחיר כולל</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם הוצאה</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black">מספר</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                hestoriaKneot.map((item, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setShowBerotAska(true); setAfshrotRekha(mtsavArekha(item.tarekh) >= 0 ? false : true); setAska(item); }}>פירוט</Button></td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{!mtsavArekha(item.tarekh) ? <div className='text-danger'>לא זמין</div> : mtsavArekha(item.tarekh) >= 0 ? <div className='text-danger'>לא זמין</div> : <div className='text-success'>זמין</div>}</td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{flipDate(item.tarekh)}</td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{item.shaa}</td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{formatNumberWithCommas(item.skhom)}</td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{item.sog}</td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{item.msbar}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                            {
                                htsgatbrtem === 'תנועה בכספים' &&
                                <div dir="ltr" className="overflow-x-auto h-[520px]">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תאריך עסקה</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">פירוט עסקה</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">מחיר כולל</th>
                                                <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מספר</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tnoahBmzomnem?.map((tnoah, index) => {
                                                    return (tnoah.active) && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{tnoah.tarekh}</td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setShowModalBerotAskatKsfem(true); setAskatKsfem(tnoah) }}>פירוט</Button></td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{formatNumberWithCommas(tnoah.skhomKlle)}</td>
                                                        <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{tnoah.msbar}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="p-5 justify-center w-full max-w-[750px] ml-10 mr-10 bg-white rounded-xl shadow-xl mb-5 h-[650px]">
                        <div className="w-full flex justify-around items-center">
                            <Button size="sm" onClick={() => setHotsaaType('tkbolem')} variant='flat' color={hotsaaType === 'tkbolem' ? 'primary' : 'default'}>תקבולים / תשלומים</Button>
                            <Button size="sm" onClick={() => setHotsaaType('hkhnsot')} variant='flat' color={hotsaaType === 'hkhnsot' ? 'primary' : 'default'}>הכנסות</Button>
                            <Button size="sm" onClick={() => setHotsaaType('hotsaot')} variant='flat' color={hotsaaType === 'hotsaot' ? 'primary' : 'default'}>הוצאות</Button>
                        </div>
                        <Divider className="mt-5 mb-5" />
                        {
                            hotsaaType === 'hotsaot' &&
                            <div className="overflow-x-auto h-[500px]">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                            <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black"></th>
                                            {/* <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">מועד חוב</th> */}
                                            <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-200 font-extrabold text-black">סוג הוצאה</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הוצאות',
                                                hotsaa: 'קניית מוצרים'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300 "><div className="w-full flex items-center justify-end"> קניית מוצרים<FaBoxOpen className="ml-2 text-2xl text-[#ca8a04]" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הוצאות',
                                                hotsaa: 'הוצאות שכר'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> הוצאות שכר<GrUserWorker className="ml-2 text-2xl text-primary" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הוצאות',
                                                hotsaa: 'דלק'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> דלק<BsFillFuelPumpFill className="ml-2 text-2xl text-danger" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הוצאות',
                                                hotsaa: 'חשמל'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> חשמל<MdElectricBolt className="ml-2 text-2xl text-yellow-400" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הוצאות',
                                                hotsaa: 'מים'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> מים<IoIosWater className="ml-2 text-2xl text-blue-400" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הוצאות',
                                                hotsaa: 'שכירות'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> שכירות<FaWarehouse className="ml-2 text-2xl text-success" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הוצאות',
                                                hotsaa: 'הוצאות אחרות'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> הוצאות אחרות<CgMoreO className="ml-2 text-2xl text-[#334155]" /></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                        {
                            hotsaaType === 'hkhnsot' &&
                            <div className="overflow-x-auto h-[500px]">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                            <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black"></th>
                                            {/* <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">מועד חוב</th> */}
                                            <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-200 font-extrabold text-black">סוג הכנסה</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'ייצור עגלות'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300 "><div className="w-full flex items-center justify-end"> ייצור עגלות<FaTrailer className="ml-2 text-2xl text-success" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'הרכבת ווי גרירה'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> הרכבת ווי גרירה<GiHook className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'תיקונים'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> תיקונים<HiOutlineWrenchScrewdriver className="ml-2 text-2xl text-danger" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'טסטים'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> טסטים<FaRegCalendarCheck className="ml-2 text-2xl text-primary" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'מכירת מוצרים'
                                            }); setShowModalHtsgatHotsaa(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> מכירת מוצרים<FaBoxOpen className="ml-2 text-2xl text-[#ca8a04]" /></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                        {
                            hotsaaType === 'tkbolem' &&
                            <div className="overflow-x-auto h-[500px]">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                            <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black"></th>
                                            {/* <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">מועד חוב</th> */}
                                            <th className="px-4 py-2 text-center text-[12px] bg-gradient-to-r from-gray-50 to-gray-200 font-extrabold text-black">סוג הכנסה</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'קבלת כסף מלקוחות'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300 "><div className="w-full flex items-center justify-end">קבלת כסף מלקוחות<FaUser className="ml-2 text-2xl text-success" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'החזר כסף מלקוחות'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300 "><div className="w-full flex items-center justify-end">החזר כסף מלקוחות<FaUser className="ml-2 text-2xl text-success" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'עובדים שכר'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">עובדים שכר<GrUserWorker className="ml-2 text-2xl text-primary" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'עובדים פנסייה'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">עובדים פנסייה<GrUserWorker className="ml-2 text-2xl text-primary" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'הכנסות',
                                                hotsaa: 'עובדים פיצויים'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end"> עובדים פיצויים<GrUserWorker className="ml-2 text-2xl text-primary" /></div></td>
                                        </tr>







                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'הוצאות שכר'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">הוצאות שכר ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'קניות מוצרים'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">קניות מוצרים ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'מסים'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">מסים ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'הוצאות שוטפות'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">הוצאות שוטפות ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'הוצאות אחרות'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">הוצאות אחרות ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'החזר הוצאות שכר'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">החזר הוצאות שכר ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'החזר קניות מוצרים'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">החזר קניות מוצרים ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'החזר מסים'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">החזר מסים ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'החזר הוצאות שוטפות'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">החזר הוצאות שוטפות ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300"><Button size="sm" onClick={() => { setHotsaa({
                                                baola:'ספקים',
                                                hotsaa: 'החזר הוצאות אחרות'
                                            }); setShowModalKsfem(true); }}>פתח</Button></td>
                                            {/* <td className="px-4 py-3 text-center text-[10px] text-gray-700 dark:text-gray-300">{hotsaa?.zmanTshlom === 'תקופתי' && hotsaa?.diff === 0 ? format(setDate(addMonths(hotsaa?.hovKrov, hotsaa?.count), hotsaa?.moaedHov), 'dd-MM-yyyy') : null}</td> */}
                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><div className="w-full flex items-center justify-end">החזר הוצאות אחרות ספקים<FaUserTag className="ml-2 text-2xl text-warning" /></div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>


                </div>
            </div>
        </div>
    )
}

{/* <div className="text-right">
<Button onClick={() => {
    setAobed(null);
    setKnesa('');
    setYetseah('');
}} isDisabled={(!aobed || !knesa || !yetseah) ? true : false}>ניקוי</Button>
</div>
<div dir="rtl" className="flex items-end">
<Autocomplete
    label="בחר לקוח"
    className="max-w-[200px] mt-5"
    size="sm"
    color="primary"
    defaultItems={aobdem}
    onSelectionChange={(val) => setAobed(val)}
>
    {(item) => (BdekatKnesatAobed(item?.msbar) === 'bg-danger') && <AutocompleteItem
    className="text-right"
    key={item.msbar}>{item.shem}
    </AutocompleteItem>}
    {/* {
        aobdem.map((aobed, index) => (
            <AutocompleteItem value={aobed?.msbar}>
                {aobed?.shem}
            </AutocompleteItem>
        ))
    }
</Autocomplete>
<div className="w-full flex justify-around items-center">
    <Input value={knesa} onValueChange={setKnesa} type="time" size="lg" color="danger" className="max-w-[80px]" label={<div className="ml-2 text-lg">כניסה</div>} labelPlacement="outside-left" />
    <Input isReadOnly={!knesa} value={yetseah} onValueChange={(val) => handleTime2Change(val)} type="time" size="lg" color="danger" className="max-w-[80px]" label={<div className="ml-2 text-lg">יצאה</div>} labelPlacement="outside-left" />
    <Input isReadOnly size="lg" value={(knesa && yetseah) ? `${String(moment.duration(moment(yetseah, 'HH:mm').diff(moment(knesa, 'HH:mm'))).hours()).padStart(2, '0')}:${String(moment.duration(moment(yetseah, 'HH:mm').diff(moment(knesa, 'HH:mm'))).minutes()).padStart(2, '0')}` : ""} color="success" className="max-w-[170px]" label={<div className="ml-2 text-base w-max">{`סה"כ שעות`}</div>} labelPlacement="outside-left" />
</div>
</div> */}