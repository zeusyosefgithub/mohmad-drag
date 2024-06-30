'use client';
import { Autocomplete, AutocompleteItem, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner, Switch } from "@nextui-org/react";
import { useContext, useMemo, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { format } from 'date-fns';
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { Kbala } from "../Page Components/kbala";
import { useReactToPrint } from "react-to-print";
import ModalLohShaotAobdem from "../Modals/ModalLohShaotAobdem";
import ModalHosfatAobed from "../Modals/ModalHosfatAobed";
import { useRouter } from "next/navigation";
import ContactContext from "../auth/ContactContext";

export default function Management() {

    const { contactName, setContactName, customerSet, setCustomerSet } = useContext(ContactContext);
    const [entries, setEntries] = useState([{ msbarShek: '', msbarBank: '', shemBank: '', msbarHeshvonBank: '', tarekhBeraon: '', skhom: '' }]);
    const lkhot = GetDocs('customers');
    const [lkoh, setLkoh] = useState('');
    const sbkem = GetDocs('sbkem');
    const [sbak, setSbak] = useState('');
    const aobdem = GetDocs('aobdem');
    const router = useRouter();

    const handleInputChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const handleAddFields = () => {
        setEntries([...entries, { msbarShek: '', msbarBank: '', shemBank: '', msbarHeshvonBank: '', tarekhBeraon: '', skhom: '' }]);
        setTimeout(() => {
            endOfFormRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };
    const counter = GetDocs('metadata').find((count) => count.id === 'counterTnoahBmzomnem');
    const handleSubmit = async(e) => {
        e.preventDefault();
        await updateDoc(doc(firestore,'customers',lkoh.id),{
            yetera : lkoh.yetera - skhomKolel
        });
        await addDoc(collection(firestore, "tnoahBmzomnem"),{
            skhomKlle : skhomKolel,
            mezoman : kesefMezoman,
            shekem : entries,
            msbar : counter?.count,
            lkoh : lkoh.idnum,
            sogLkoh : selectedKeys1 === "עובדים" ? "C" : selectedKeys1 === "ספקים" ? "A" : "B",
            tarekh : format(new Date(),'dd-MM-yyyy'),

        });
        await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        handelPrintKbala();
        setLkoh('');
        setSbak('');
        setMezoman(false);
        setShekem(false);
        setSkhomKolel(0);
        setKesefMezoman(0);
        setEntries([{ msbarShek: '', msbarBank: '', shemBank: '', msbarHeshvonBank: '', tarekhBeraon: '', skhom: '' }]);
    };

    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);

    const scrollToRef = () => {
        topOfFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const scrollToBottomRef = () => {
        endOfFormRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const handleGetDigits = (number) => {
        const integerPart = Math.floor(number); // Get the integer part of the number
        const fractionalPart = (number % 1).toFixed(2).substring(2); // Get the first two digits after the decimal point
        const formatted = `${integerPart}.${fractionalPart}`; // Concatenate integer and fractional parts
        return formatted;
    };

    function removeItem(index) {
        const newItems = entries.filter((item, idx) => idx !== index);
        setEntries(newItems);
    }

    const GetSkhomShekem = () => {
        let sum = 0;
        for (let index = 0; index < entries.length; index++) {
            sum += entries[index].skhom;
        }
        return sum;
    }

    const [selectedKeys1, setSelectedKeys1] = useState("צד שני");
    const [selectedKeys, setSelectedKeys] = useState("סוג עסקה");
    const [mezoman, setMezoman] = useState(false);
    const [shekem, setShekem] = useState(false);

    const [skhomKolel, setSkhomKolel] = useState(0);
    const [kesefMezoman, setKesefMezoman] = useState(0);

    const componentRefOne = useRef();
    const handelPrintKbala = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });


    const [htsgatbrtem,sethtsagatBrtem] = useState('עובדים');
    const [showLohShaot,setShowLohShaot] = useState(false);
    const [showHosfatAobed,setShowHosfatAobed] = useState(false);

    const [loading,setLoading] = useState(false);

    return (
        <div>
            {loading && <Spinner className="absolute top-0 right-0 bottom-0 left-0"/>}
            {<ModalLohShaotAobdem show={showLohShaot} disable={() => setShowLohShaot(false)}/>}
            {<ModalHosfatAobed show={showHosfatAobed} disable={() => setShowHosfatAobed(false)}/>}

            <div className='flex justify-between flex-wrap items-center mt-20 mr-20 ml-20'>
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


                <div className="p-5 justify-center w-[1000px] h-[600px] bg-white rounded-xl shadow-xl">
                    <div className="w-full flex justify-around items-center">
                        <Button className={htsgatbrtem === 'סבקים' && 'font-extrabold text-base'} color={htsgatbrtem === 'סבקים' ? 'primary' : 'default'} onClick={() => sethtsagatBrtem('סבקים')}>סבקים</Button>
                        <Button className={htsgatbrtem === 'לקחות' && 'font-extrabold text-base'} color={htsgatbrtem === 'לקחות' ? 'primary' : 'default'} onClick={() => sethtsagatBrtem('לקחות')}>לקחות</Button>
                        <Button className={htsgatbrtem === 'עובדים' && 'font-extrabold text-base'} color={htsgatbrtem === 'עובדים' ? 'primary' : 'default'} onClick={() => sethtsagatBrtem('עובדים')}>עובדים</Button>
                    </div>
                    <Divider className="mt-5" />
                    <div className="overflow-auto h-fit w-full" dir="rtl">
                        {
                            htsgatbrtem === 'עובדים' && <div dir="ltr">
                                <div className="mt-5 mb-5 flex justify-around items-center">
                                    <Button onClick={() => setShowLohShaot(true)}>לוח שעות עובדים</Button>
                                    <Button onClick={() => setShowHosfatAobed(true)}><div className="text-[18px] mr-1">+</div>הוספת עובד חדש</Button>
                                </div>
                                <div className="overflow-x-auto h-[400px]">
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
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Button size="sm">פתח</Button></td>
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
                        }
                        {
                            htsgatbrtem === 'לקחות' && <div dir="ltr">
                                <div className="mt-5 mb-5 flex justify-around items-center">
                                    <Button onClick={() => {
                                        setLoading(true);
                                        router.push('/activion');
                                    }}><div className="text-[18px] mr-1">+</div>הוספת לקוח חדש</Button>
                                </div>
                                <div className="overflow-x-auto h-[400px]">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">פרטיים נוספיים</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">יתרת חישבון</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">ישוב</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">נייד</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">עיר</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">תז</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם לקוח</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black">מספר לקוח</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                lkhot.map((lkooh, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Button size="sm">פתח</Button></td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.yetera}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.street}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.phone}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.city}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.cusid}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.name}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.idnum}</td>
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
                                    <Button onClick={() => {
                                        setLoading(true);
                                        setContactName(true);
                                        router.push('/procurement');
                                    }}><div className="text-[18px] mr-1">+</div>הוספת סבק חדש</Button>
                                </div>
                                <div className="overflow-x-auto h-[400px]">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">פרטיים נוספיים</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">יתרת חישבון</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">ישוב</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">נייד</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">עיר</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">תפקיד</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם לקוח</th>
                                                <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black">מספר לקוח</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sbkem.map((lkooh, index) => {
                                                    return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Button size="sm">פתח</Button></td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.ytratHeshvon}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.yeshov}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.nead}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.aer}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.sherot}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.shem}</td>
                                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{lkooh?.msbar}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="p-5 flex justify-center w-[1000px] overflow-auto h-[600px] bg-white rounded-xl shadow-xl">
                    <form onSubmit={handleSubmit} className='w-full'>
                        <div ref={topOfFormRef} />
                        <div dir='rtl' className=''>
                            <div className='flex justify-center items-center'>
                                <Input defaultValue={format(new Date(), 'dd-MM-yyyy')} className="max-w-xs m-5" label='תאריך' />
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize w-full max-w-xs m-5"
                                            size="lg"
                                        >
                                            {selectedKeys1}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedKeys1}
                                        onSelectionChange={(val) => setSelectedKeys1(val.currentKey)}
                                    >
                                        <DropdownItem key="עובדים">עובדים</DropdownItem>
                                        <DropdownItem key="ספקים">ספקים</DropdownItem>
                                        <DropdownItem key="לקחות">לקחות</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize w-full max-w-xs m-5"
                                            isDisabled={(!(selectedKeys1 !== 'צד שני'))}
                                            size="lg"
                                        >
                                            {selectedKeys}
                                        </Button>
                                    </DropdownTrigger>
                                    {
                                        selectedKeys1 == 'עובדים' &&
                                        <DropdownMenu
                                            aria-label="Multiple selection example"
                                            variant="flat"
                                            closeOnSelect={true}
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selectedKeys}
                                            onSelectionChange={setSelectedKeys}
                                        >
                                            <DropdownItem key="תשלום שכר עבודה">תשלום שכר עבודה</DropdownItem>
                                            <DropdownItem key="תשלום ביטוח לאומי">תשלום ביטוח לאומי</DropdownItem>
                                            <DropdownItem key="תשולום ארנונה">תשולום מס הכנסה</DropdownItem>
                                            <DropdownItem key="הפרשת פנסיה">הפרשת פנסיה</DropdownItem>
                                            <DropdownItem key="הפרשת פיצוים">הפרשת פיצוים</DropdownItem>
                                            <DropdownItem key="הפרשת קרן השתלמות">הפרשת קרן השתלמות</DropdownItem>
                                        </DropdownMenu>
                                    }
                                    {
                                        selectedKeys1 == 'ספקים' &&
                                        <DropdownMenu
                                            aria-label="Multiple selection example"
                                            variant="flat"
                                            closeOnSelect={true}
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selectedKeys}
                                            onSelectionChange={setSelectedKeys}
                                        >
                                            <DropdownItem key="תשלום הלואה">תשלום הלואה</DropdownItem>
                                            <DropdownItem key="קבלת הלואה">קבלת הלואה</DropdownItem>
                                            <DropdownItem key="תשלום השכרה">תשלום השכרה</DropdownItem>
                                            <DropdownItem key="תשלום תקשורת">תשלום תקשורת</DropdownItem>
                                            <DropdownItem key="תשלום חומרי גלם">תשלום חומרי גלם</DropdownItem>
                                            <DropdownItem key="קבלת כסף מספק">קבלת כסף מספק</DropdownItem>
                                            <DropdownItem key="מס הכנסה">מס הכנסה</DropdownItem>
                                            <DropdownItem key="ביטוח לאומי">ביטוח לאומי</DropdownItem>
                                            <DropdownItem key="תשלום רואי חשבון">תשלום רואי חשבון</DropdownItem>
                                            <DropdownItem key="תשלום לתיקון">תשלום לתיקון</DropdownItem>
                                        </DropdownMenu>
                                    }
                                    {
                                        selectedKeys1 == 'לקחות' &&
                                        <DropdownMenu
                                            aria-label="Multiple selection example"
                                            variant="flat"
                                            closeOnSelect={true}
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selectedKeys}
                                            onSelectionChange={setSelectedKeys}
                                        >
                                            <DropdownItem key="קבלת כסף מלקוח">קבלת כסף מלקוח</DropdownItem>
                                            <DropdownItem key="החזרת כסף ללקוח">החזרת כסף ללקוח</DropdownItem>
                                        </DropdownMenu>
                                    }
                                </Dropdown>
                            </div>
                            <div className='flex justify-center items-center'>
                                {
                                    selectedKeys1 == 'לקחות' &&
                                    <Autocomplete
                                        bordered
                                        fullWidth
                                        label="לקוח"
                                        className="max-w-xs m-5"
                                        color="primary"
                                        defaultItems={lkhot}
                                        allowsCustomValue={false}
                                    >
                                        {
                                            lkhot.map((lkoh) => (
                                                <AutocompleteItem onClick={() => setLkoh(lkoh)} className='text-right' key={lkoh.id} value={lkoh.id}>
                                                    {lkoh.name}
                                                </AutocompleteItem>
                                            ))
                                        }
                                    </Autocomplete>
                                }
                                {
                                    selectedKeys1 == 'ספקים' &&
                                    <Autocomplete
                                        bordered
                                        fullWidth
                                        label="ספק"
                                        className="max-w-xs m-5"
                                        color="primary"
                                        defaultItems={sbkem}
                                        allowsCustomValue={false}
                                    >
                                        {
                                            sbkem.map((sbakkk) => (
                                                <AutocompleteItem onClick={() => setSbak(sbakkk)} className='text-right' key={sbakkk.id} value={sbakkk.id}>
                                                    {sbakkk.shem}
                                                </AutocompleteItem>
                                            ))
                                        }
                                    </Autocomplete>
                                }

                                <Input color="success" type="number" value={skhomKolel || ''} onValueChange={(val) => setSkhomKolel(Math.max(Math.min(val, lkoh?.yetera), 0))} className="max-w-xs m-5" label='סכום כולל' />
                                <Input readOnly value={lkoh?.yetera} color={((lkoh?.yetera - skhomKolel) === 0) ? 'success' : "danger"} className="max-w-xs m-5" label='יתרת חובה' />
                                <Input readOnly value={(lkoh?.yetera - skhomKolel) || ''} color={((lkoh?.yetera - skhomKolel) === 0) ? 'success' : "danger"} className="max-w-xs m-5" label='נשאר' />
                                {
                                    entries?.length > 1 &&
                                    <Button onClick={scrollToBottomRef} auto flat className='ml-5'>
                                        <FaArrowDown />
                                    </Button>
                                }
                            </div>
                        </div>
                        <Divider />
                        <div dir="rtl" className="flex items-center m-5">
                            <Switch value={mezoman} onValueChange={(e) => setMezoman(e)}>
                                <div className="mr-5">מזומן</div>
                            </Switch>
                            {
                                mezoman &&
                                <div className="flex items-center">
                                    <Input value={kesefMezoman || ''} onValueChange={(val) => setKesefMezoman(Math.min(val, skhomKolel))} color="primary" size="sm" className="max-w-[150px] mr-5" label='סכום' />
                                    <div className="mr-5">נשאר מהסכום - {skhomKolel - kesefMezoman - GetSkhomShekem()}</div>
                                </div>
                            }
                        </div>
                        <Divider />
                        <div dir="rtl" className="flex items-center m-5">
                            <Switch value={shekem} onValueChange={(e) => setShekem(e)}>
                                <div className="mr-5">שיקים</div>
                            </Switch>

                        </div>
                        {
                            shekem && (kesefMezoman != skhomKolel) &&
                            <div dir="rtl" className="mb-5">
                                {entries?.map((entry, index) => (
                                    <div className="flex items-center mt-2">
                                        <div>{index + 1}</div>
                                        <Input
                                            bordered
                                            fullWidth
                                            type="number"
                                            color="primary"
                                            className="max-w-xs m-2"
                                            size=""
                                            placeholder="מספר שיק"
                                            value={entry.msbarShek}
                                            onChange={(e) => handleInputChange(index, 'msbarShek', e.target.value)}
                                        />
                                        <Input
                                            bordered
                                            fullWidth
                                            type="number"
                                            color="primary"
                                            size=""
                                            className="max-w-xs m-2"
                                            placeholder="מספר בנק"
                                            value={entry.msbarBank}
                                            onChange={(e) => handleInputChange(index, 'msbarBank', e.target.value)}
                                        />
                                        <Input
                                            bordered
                                            fullWidth
                                            type="text"
                                            color="primary"
                                            className="max-w-xs m-2"
                                            size=""
                                            placeholder="שם בנק"
                                            value={entry.shemBank}
                                            onChange={(e) => handleInputChange(index, 'shemBank', e.target.value)}
                                        />
                                        <Input
                                            bordered
                                            fullWidth
                                            type="number"
                                            color="primary"
                                            className="max-w-xs m-2"
                                            size=""
                                            placeholder="מספר חשבון בנק"
                                            value={entry.msbarHeshvonBank}
                                            onChange={(e) => handleInputChange(index, 'msbarHeshvonBank', e.target.value)}
                                        />
                                        <Input
                                            bordered
                                            fullWidth
                                            type="date"
                                            color="primary"
                                            className="max-w-xs m-2"
                                            size=""
                                            placeholder="תאריך פרעון"
                                            value={entry.tarekhBeraon}
                                            onChange={(e) => handleInputChange(index, 'tarekhBeraon', e.target.value)}
                                        />
                                        <Input
                                            bordered
                                            fullWidth
                                            type="number"
                                            color="warning"
                                            size=""
                                            className="max-w-xs m-2"
                                            placeholder="סכום"
                                            value={entry.skhom}
                                            onChange={(e) => handleInputChange(index, 'skhom', Math.min(e.target.value, handleGetDigits(((skhomKolel - kesefMezoman) / entries.length))))}
                                        />
                                        {
                                            (index === entries.length - 1)
                                                ?
                                                <Button auto size="sm" color="primary" flat onClick={handleAddFields} className='m-2'>
                                                    <FiPlus className="text-xl" />
                                                </Button>
                                                :
                                                <Button auto size="sm" color="danger" flat onClick={() => removeItem(index)} className='m-2'>
                                                    <FaTrash className="text-lg" />
                                                </Button>
                                        }

                                    </div>
                                ))}
                            </div>
                        }
                        <Divider />

                        <div className='flex justify-center'>
                            <Button auto flat color="primary" type="submit" className='m-5'>
                                אישור
                            </Button>
                            {
                                entries?.length > 1 &&
                                <Button onClick={scrollToRef} auto flat className='m-5'>
                                    <FaArrowUp />
                                </Button>
                            }
                        </div>
                        <div ref={endOfFormRef} />
                    </form>
                </div>


            </div>
            <div className="hidden border-2 border-black">
                <Kbala kesefMezoman={kesefMezoman} shekem={entries} lkoh={lkoh} ref={componentRefOne} />
            </div>
        </div>
    )
}