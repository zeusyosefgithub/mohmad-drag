'use client';
import { useReactToPrint } from "react-to-print";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Input, Table, TableCell, TableColumn, TableHeader, TableBody, TableRow, Autocomplete, AutocompleteItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { MdMoreHoriz, MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import GetDocs from "../FireBase/getDocs";
import { AllPages } from "../Page Components/allPages";
import { addDoc, collection, count, doc, onSnapshot, updateDoc, where } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { differenceInDays, format, parse } from "date-fns";
import { FaCheck, FaTrailer, FaUser, FaUserEdit } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect } from "../FireBase/getDataByCondition";
import { GiHook } from "react-icons/gi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaLocationDot, FaRegCircleCheck } from "react-icons/fa6";
import { VscError } from "react-icons/vsc";
import ModalAddCustomer from "../Modals/ModalAddCustomer";
import { FiFilePlus } from "react-icons/fi";
import ContactContext from "../auth/ContactContext";
import { Alert } from "@mui/material";

export default function Activion() {

    const componentRefOne = useRef();

    const handlePrint = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });

    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let time = date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });
    let currentdate = `${day}/${month + 1}/${year}`;
    let currenttime = `${time}/${day}/${month}/${year}`;

    const { tfaol, setTfaol } = useContext(ContactContext);


    const [skhom, setSkhom] = useState(0);

    const [showDrag, setShowDrag] = useState(true);
    const [licenseid, setLicenseid] = useState(''); // מספר רישוי
    const [chassisnum, setChassisnum] = useState(''); // מספר שלדה
    const [model, setModel] = useState(''); // קוד דגם
    const [categore, setCategore] = useState(''); // קטגוריה
    const [color, setColor] = useState(''); // צבע
    const [kinddrag, setKinddrag] = useState(''); // סוג הרכב
    const [bodytype, setBodytype] = useState(''); // סוג מרכב
    const [long, setLong] = useState(''); // אורך כללי
    const [space, setSpace] = useState('');  // רוחב כללי
    const [height, setHeight] = useState(''); // גובה כללי

    const [showDragTwo, setShowDragTwo] = useState(false);
    const [rearextension, setRearextension] = useState(''); // שלוחה אחורית
    const [lengthhatch, setLengthhatch] = useState(''); // אורך יצול
    const [heightloading, setHeightloading] = useState(''); // גובה משטח העמסה
    const [sizeloading, setSizeloading] = useState(''); // גובה משטח העמסה (מ"ר)
    const [bodymodel, setBodymodel] = useState(''); // דגם מרכב
    const [undercarriage, setUndercarriage] = useState(''); // מס"ד מרכב
    const [selfweightaxles, setSelfweightaxles] = useState(''); // משקל עצמי על הסרנים
    const [totalselfweight, setTotalselfweight] = useState(''); // משקל עצמי כולל
    const [authorizedweight, setAuthorizedweight] = useState(''); // משקל מורשה
    const [distributionloads, setDistributionloads] = useState(''); // חלוקת העומסים
    const [device, setDevice] = useState(''); // התקן
    const [installer, setInstaller] = useState(''); // שם המתקין

    const [showDragThree, setShowDragThree] = useState(false);
    const [foundation, setFoundation] = useState(''); // מס"ד
    const [safetyreview, setSafetyreview] = useState(''); // תסקיר בטיחות
    const [reviewerid, setReviewerid] = useState(''); // זהות סוקר
    const [labreport, setLabreport] = useState(''); // דו"ח מעבדה
    const [labid, setLabid] = useState(''); // זהות מעבדה

    const [showDragFour, setShowDragFour] = useState(false);
    const [opendate, setOpendate] = useState(''); // תאריך כניסה
    const [closedate, setClosedate] = useState(''); // תאריך יציאה
    const [opentime, setOpentime] = useState(''); // שעה כניסה
    const [closetime, setClosetime] = useState(''); // שעה יציאה
    const [wight, setWight] = useState(''); // משקל
    const [dragnum, setDragnum] = useState(''); // מספר גרור

    const [masTaodatABTebos, setMasTaodatABTebos] = useState('');
    const [tableokefTaodatABTebos, setTokefTaodatABTebos] = useState('');
    const [masVTokefResheonYatsran, setMasVTokefResheonYatsran] = useState('');
    const [masAeshorYatsran, setMasAeshorYatsran] = useState('');
    const [masGlglemSrnem, setMasGlglemSrnem] = useState('');
    const [medatTsmgem, setMedatTsmgem] = useState('');

    const [sheshAehad, setSheshAehad] = useState('');
    const [sheshShtaeem, setSheshShtaeem] = useState('');
    const [sheshShlosh, setSheshShlosh] = useState('');
    const [sheshArbaa, setSheshArbaa] = useState('');
    const [sheshHamesh, setSheshHamesh,] = useState('');

    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterLkhot');
    const [errorMessageMsbarAgla, setErrorMessageMsbarAgla] = useState('');

    const lkhot = GetDocs('customers');
    const aglot = GetDocs('drags');
    const [loading, setLoading] = useState(false);

    const aglotB = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'B').sort((a, b) => {
        if (a.msbarAdefot !== b.msbarAdefot) {
            return a.msbarAdefot - b.msbarAdefot;
        }
        const dateA = new Date(a.tarekhAsbka);
        const dateB = new Date(b.tarekhAsbka);
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB;
        }
        return a.msbar - b.msbar;
    });
    const aglotC = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'C').sort((a, b) => {
        if (a.msbarAdefot !== b.msbarAdefot) {
            return a.msbarAdefot - b.msbarAdefot;
        }
        const dateA = new Date(a.tarekhAsbka);
        const dateB = new Date(b.tarekhAsbka);
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB;
        }
        return a.msbar - b.msbar;
    });
    const aglotD = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'D').sort((a, b) => {
        if (a.msbarAdefot !== b.msbarAdefot) {
            return a.msbarAdefot - b.msbarAdefot;
        }
        const dateA = new Date(a.tarekhAsbka);
        const dateB = new Date(b.tarekhAsbka);
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB;
        }
        return a.msbar - b.msbar;
    });

    const aglotYetsor = [...aglotB, ...aglotC, ...aglotD];

    const [chossedAgla, setChoosedAgla] = useState({});
    const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);
    const [showModalAddDrag, setShowModalAddDrag] = useState(false);
    const [checks, setChecks] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState('');

    const GetIdWight = () => {
        const newDate = new Date();
        const month = format(newDate, 'MM'); // Formats month as "MM"
        const year = format(newDate, 'yy');  // Formats year as "yy"
        const id = 50 + parseInt(chossedAgla?.msbar); // Assuming counter2 is available in the scope
        const idwight = `${year}${month}-0${id}`;
        return idwight;
    };

    const checkAemAglaKeamt = () => {
        if (!dragnum && !chossedAgla?.drag?.dragnum) {
            setErrorMessageMsbarAgla('אין מספר העגלה !!');
            return true;
        }
        for (let index = 0; index < aglot.length; index++) {
            if (aglot[index].dragnum === dragnum && !chossedAgla?.drag?.dragnum) {
                setErrorMessageMsbarAgla('מספר העגלה כבר קיים !!');
                return true;
            }
        }
        return false;
    }

    const addNewDrag = async () => {
        setShowAlertMessage('');
        setErrorMessageMsbarAgla('');
        if (!checkAemLkohKeam() && !chossedAgla?.brtemLkoh?.id) {
            setShowAlertMessage('משהו לא תקין בלקוח או שהוא לא נוסף!');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2500);
            return;
        }
        if (checkAemAglaKeamt()) {
            setShowAlertMessage('משהו לא תקין בפרטים העגלה!');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2500);
            return;
        }
        setLoading(true);
        const drag = {
            authorizedweight: authorizedweight || '',
            bodymodel: bodymodel || '',
            bodytype: bodytype || '',
            categore: categore || '',
            chassisnum: chassisnum || '',
            closedate: closedate || '',
            closetime: closetime || '',
            color: color || '',
            daterecord: currentdate || '',
            device: device || '',
            distributionloads: distributionloads || '',
            dragnum: dragnum || '',
            foundation: foundation || '',
            height: height || '',
            heightloading: heightloading || '',
            idwight: GetIdWight() || '',
            installer: installer || '',
            kinddrag: kinddrag || '',
            labid: labid || '',
            labreport: labreport || '',
            lengthhatch: lengthhatch || '',
            licenseid: licenseid || '',
            long: long || '',
            skhom: skhom || '',
            model: model || '',
            opendate: opendate || '',
            opentime: opentime || '',
            rearextension: rearextension || '',
            reviewerid: reviewerid || '',
            safetyreview: safetyreview || '',
            selfweightaxles: selfweightaxles || '',
            sizeloading: sizeloading || '',
            space: space || '',
            totalselfweight: totalselfweight || '',
            undercarriage: undercarriage || '',
            wight: wight || '',
            masTaodatABTebos: masTaodatABTebos || '',
            tableokefTaodatABTebos: tableokefTaodatABTebos || '',
            masVTokefResheonYatsran: masVTokefResheonYatsran || '',
            masAeshorYatsran: masAeshorYatsran || '',
            masGlglemSrnem: masGlglemSrnem || '',
            medatTsmgem: medatTsmgem || '',
            sheshAehad: sheshAehad || '',
            sheshShtaeem: sheshShtaeem || '',
            sheshShlosh: sheshShlosh || '',
            sheshArbaa: sheshArbaa || '',
            sheshHamesh: sheshHamesh || '',
            checks : checks || []
        }
        try {
            await updateDoc(doc(firestore, "tfaol", chossedAgla?.id), {
                drag: drag,
                brtemLkoh : GetCurrentLkoh()
            });
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
        handlePrint();
    }

    const GetCurrentLkoh = () => {
        console.log(1);
        for (let index = 0; index < lkhot.length; index++) {
            if (lkhot[index].name === chossedAgla?.newCustomer?.customerName) {
                console.log(lkhot[index]);
                return lkhot[index];
            }
        }
    }

    const checkAemLkohKeam = () => {
        console.log(1);
        for (let index = 0; index < lkhot.length; index++) {
            if (lkhot[index].name === chossedAgla?.newCustomer?.customerName) {
                return true;
            }
        }
        return false;
    }

    const resetAllProps = () => {
        setLicenseid('');
        setChassisnum('');
        setModel('');
        setCategore('');
        setColor('');
        setKinddrag('');
        setBodytype('');
        setLong('');
        setSpace('');
        setHeight('');
        setRearextension('');
        setLengthhatch('');
        setHeightloading('');
        setSizeloading('');
        setBodymodel('');
        setUndercarriage('');
        setSelfweightaxles('');
        setTotalselfweight('');
        setAuthorizedweight('');
        setDistributionloads('');
        setDevice('');
        setInstaller('');
        setFoundation('');
        setSafetyreview('');
        setReviewerid('');
        setSkhom(0);
        setLabreport('');
        setLabid('');
        setOpendate('');
        setClosedate('');
        setOpentime('');
        setClosetime('');
        setWight('');
        setDragnum('');
    }

    const setAllProps = (agla) => {
        setLicenseid(agla?.licenseid);
        setChassisnum(agla?.chassisnum);
        setModel(agla?.model);
        setCategore(agla?.categore);
        setColor(agla?.color);
        setKinddrag(agla?.kinddrag);
        setBodytype(agla?.bodytype);
        setLong(agla?.long);
        setSpace(agla?.space);
        setHeight(agla?.height);
        setRearextension(agla?.rearextension);
        setLengthhatch(agla?.lengthhatch);
        setHeightloading(agla?.heightloading);
        setSizeloading(agla?.sizeloading);
        setBodymodel(agla?.bodymodel);
        setUndercarriage(agla?.undercarriage);
        setSelfweightaxles(agla?.selfweightaxles);
        setTotalselfweight(agla?.totalselfweight);
        setAuthorizedweight(agla?.authorizedweight);
        setDistributionloads(agla?.distributionloads);
        setDevice(agla?.device);
        setInstaller(agla?.installer);
        setFoundation(agla?.foundation);
        setSafetyreview(agla?.safetyreview);
        setReviewerid(agla?.reviewerid);
        setSkhom(agla?.skhom);
        setLabreport(agla?.labreport);
        setLabid(agla?.labid);
        setOpendate(agla?.opendate);
        setClosedate(agla?.closedate);
        setOpentime(agla?.opentime);
        setClosetime(agla?.closetime);
        setWight(agla?.wight);
        setDragnum(agla?.dragnum);
    }

    const GetColorMsbarAdefot = (val) => {
        if (val === 1) {
            return 'text-danger';
        }
        else if (val === 2) {
            return 'text-[#f97316]';
        }
        else if (val === 3) {
            return 'text-[#facc15]';
        }
        else if (val === 4) {
            return 'text-[#a3e635]';
        }
        else {
            return 'text-[#34d399]';
        }
    }


    const GetShlavemInHebrow = (shlav, val) => {
        if (shlav === 'A') {
            return val ? 'הצעת מחיר' : 'שלב הצעה';
        }
        else if (shlav === 'B') {
            return val ? 'הזמנה' : 'שלב הזמנה';
        }
        else if (shlav === 'C') {
            return val ? 'ייצור' : 'שלב ייצור';
        }
        else if (shlav === 'D') {
            return val ? 'סיום' : 'שלב סיום';
        }
        else if (shlav === 'E') {
            return 'שלב מכר';
        }
    };

    function GetTmonaLfeSog(val, val1, val3) {
        if (val === 'ייצור') {
            if (val3 === 'עארה') {
                return <div><FaTrailer className={`text-3xl ${GetColorMsbarAdefot(val1)}`} /></div>;
            }
            else {
                return <div className="relative w-[45px]"><div className=" absolute right-0 bg-white"><FaLocationDot className={`${GetColorMsbarAdefot(val1)} text-base`} /></div><FaTrailer className={`text-3xl ${GetColorMsbarAdefot(val1)}`} /></div>;
            }
        }
        else if (val === 'הרכבת וו') {
            return <GiHook className={`text-3xl ${GetColorMsbarAdefot(val1)}`} />;
        }
        else if (val === 'תיקון') {
            return <HiOutlineWrenchScrewdriver className={`text-3xl ${GetColorMsbarAdefot(val1)}`} />;
        }
    }



    const handleToggleCheck = (index) => {
        setChecks((prevChecks) =>
            prevChecks?.includes(index)
                ? prevChecks?.filter((i) => i !== index) // Remove index if it exists
                : [...prevChecks, index]                 // Add index if it doesn't exist
        );
    };
    

    const documents = [
        "הסכם מכירה / טופס הזמנה",
        "צילום חשבונית רכישה של הנגרר",
        "הוראת רישום בתוקף",
        "תעודות / אישורים נלווים מחוררים בלבד",
        "תעודת ביטוח חובה",
        "תעדות זהות רוכש / ייפוי כוח",
        "טופס טסט ראשוני של הנגר במכון הרישוי (בקשה לרישום רכב)",
        "נספח בקשה לרישום רכב כולל תוצאות שקילה",
        "העתק מרישיון הרכב הזמני והקבוע כפי שנמסר לבעל הרכב",
        "נספח לרישיון הרכב במידה ונדרש",
        "אישור וטופס בדיקה פרטני",
        "צילום נגרר ומספר שלדה עם מספר רישוי",
        "רשומון יבוא במקרה של יבואן",
    ];

    useEffect(() => {
        if (tfaol?.msbar) {
            setChoosedAgla(tfaol);
        }
    }, [tfaol]);


    const [lkohHdash, setLkohHdash] = useState(false);
    const [lkohForAdd, setLkohForAdd] = useState('');
    const [brtemLkoh, setBrtemLkoh] = useState(null);


    useEffect(() => {
        if (lkohForAdd) {
            for (let index = 0; index < lkhot.length; index++) {
                if (lkhot[index].name === lkohForAdd) {
                    setBrtemLkoh(lkhot[index]);
                }
            }
        }
    }, [lkohHdash]);



    useEffect(() => {
        if (chossedAgla && chossedAgla.id) {
            const unsub = onSnapshot(doc(firestore, 'tfaol', chossedAgla.id), (doc) => {
                if (doc.exists()) {
                    setChoosedAgla({ ...doc.data(), id: doc.id });
                    setChecks(doc.data()?.drag?.checks || []);
                    setAllProps(doc.data()?.drag);
                }
            });
            return () => unsub();
        }
    }, [chossedAgla?.id]);

    return (
        <div className="hebrow_font mb-20 h-full w-full">
            <div className="fixed right-1/2 transform translate-x-1/2 z-50">
                <div className={`w-[800px] transition-all duration-500 ease-in-out flex justify-center ${showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <Alert className="max-w-[600px] w-full" dir="rtl" severity='error'>
                        <div className="mr-2">{showAlertMessage}</div>
                    </Alert>
                </div>
            </div>
            <ModalAddCustomer LkohHdash={async(val1, val2) => {
                if (val1) {
                    setLkohHdash(val1);
                    setLkohForAdd(val2);
                }
            }} brtem={{
                customerName: chossedAgla?.newCustomer?.customerName,
                customerCity: chossedAgla?.newCustomer?.customerCity,
                customerPhone: chossedAgla?.newCustomer?.customerPhone,
                msbarMezahehm: chossedAgla?.newCustomer?.msbarMezahehm
            }} lkhot={lkhot} counter={counter} show={showModalAddCustomer} disable={() => setShowModalAddCustomer(false)} />
            <Modal placement="center" className="test-fontt" backdrop={"blur"} size="3xl" isOpen={showModalAddDrag} onClose={() => setShowModalAddDrag(false)}>
                <ModalContent>
                    <>
                        <ModalHeader className="shadow-2xl flex justify-center border-b-2 bg-white">פרטים משרד תחבורה</ModalHeader>
                        <ModalBody className="shadow-2xl bg-white">
                            <div className="m-5">
                                <div className="overflow-hidden select-none">
                                    {
                                        showDrag &&
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div>
                                                    <div dir="rtl" className="">
                                                        <div className="flex justify-around">
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={licenseid} size="sm" onValueChange={(value) => { setLicenseid(value) }} type="number" label="מספר רישוי" />
                                                                <Input color="primary" value={chassisnum} className="mt-10" size="sm" onValueChange={(value) => { setChassisnum(value) }} type="text" label="מספר שלדה" />
                                                                <Input color="primary" value={model} className="mt-10" size="sm" onValueChange={(value) => { setModel(value) }} type="text" label="קוד דגם" />
                                                                <Input color="primary" value={masTaodatABTebos} className="mt-10" size="sm" onValueChange={(value) => { setMasTaodatABTebos(value) }} type="text" label="מס' תעודת אב טיפוס" />
                                                                <Input color="primary" value={bodytype} className="mt-10" size="sm" onValueChange={(value) => { setBodytype(value) }} type="text" label="סוג מרכב" />
                                                            </div>
                                                            <div className="m-10" />
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={long} size="sm" onValueChange={(value) => { setLong(value) }} type="text" label="אורך כללי" />
                                                                <Input color="primary" value={space} className="mt-10" size="sm" onValueChange={(value) => { setSpace(value) }} type="text" label="רוחב כללי" />
                                                                <Input color="primary" value={height} className="mt-10" size="sm" onValueChange={(value) => { setHeight(value) }} type="text" label="גובה כללי" />
                                                                <Input color="primary" value={masVTokefResheonYatsran} className="mt-10" size="sm" onValueChange={(value) => { setMasVTokefResheonYatsran(value) }} type="text" label="מס' ותוקף רישיון יצרן" />
                                                                <Input color="primary" value={categore} size="sm" className="mt-10" onValueChange={(value) => { setCategore(value) }} type="text" label="קטגוריה" />
                                                            </div>
                                                            <div className="m-10" />
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={color} size="sm" onValueChange={(value) => { setColor(value) }} type="text" label="צבע" />
                                                                <Input color="primary" value={kinddrag} className="mt-10" size="sm" onValueChange={(value) => { setKinddrag(value) }} type="text" label="סוג הרכב" />
                                                                <Input color="primary" value={tableokefTaodatABTebos} className="mt-10" size="sm" onValueChange={(value) => { setTokefTaodatABTebos(value) }} type="text" label="תוקף תעודת אב טיפוס" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    }
                                    {
                                        showDragTwo &&
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div>
                                                    <div dir="rtl" className="">
                                                        <div className="flex justify-around">
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={rearextension} size="sm" onValueChange={(value) => { setRearextension(value) }} type="text" label="שלוחה אחורית" />
                                                                <Input color="primary" value={lengthhatch} className="mt-10" size="sm" onValueChange={(value) => { setLengthhatch(value) }} type="text" label="אורך יצול" />
                                                                <Input color="primary" value={heightloading} className="mt-10" size="sm" onValueChange={(value) => { setHeightloading(value) }} type="text" label="גובה משטח העמסה" />
                                                                <Input color="primary" value={sizeloading} className="mt-10" size="sm" onValueChange={(value) => { setSizeloading(value) }} type="text" label="גובה משטח העמסה (מר)" />
                                                                <Input color="primary" value={masAeshorYatsran} className="mt-10" size="sm" onValueChange={(value) => { setMasAeshorYatsran(value) }} type="text" label="מס' אישור יצרן" />
                                                            </div>
                                                            <div className="m-10" />
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={bodymodel} size="sm" onValueChange={(value) => { setBodymodel(value) }} type="text" label="דגם מרכב" />
                                                                <Input color="primary" value={undercarriage} className="mt-10" size="sm" onValueChange={(value) => { setUndercarriage(value) }} type="text" label="מסד מרכב" />
                                                                <Input color="primary" value={selfweightaxles} className="mt-10" size="sm" onValueChange={(value) => { setSelfweightaxles(value) }} type="text" label="משקל עצמי על הסרנים" />
                                                                <Input color="primary" value={totalselfweight} className="mt-10" size="sm" onValueChange={(value) => { setTotalselfweight(value) }} type="text" label="משקל עצמי כולל" />
                                                                <Input color="primary" value={masGlglemSrnem} className="mt-10" size="sm" onValueChange={(value) => { setMasGlglemSrnem(value) }} type="text" label="מס' גלגלים / סרנים" />
                                                            </div>
                                                            <div className="m-10" />
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={authorizedweight} size="sm" onValueChange={(value) => { setAuthorizedweight(value) }} type="text" label="משקל מורשה" />
                                                                <Input color="primary" value={distributionloads} className="mt-10" size="sm" onValueChange={(value) => { setDistributionloads(value) }} type="text" label="חלוקת העומסים" />
                                                                <Input color="primary" value={device} className="mt-10" size="sm" onValueChange={(value) => { setDevice(value) }} type="text" label="התקן" />
                                                                <Input color="primary" value={installer} className="mt-10" size="sm" onValueChange={(value) => { setInstaller(value) }} type="text" label="שם המתקין" />
                                                                <Input color="primary" value={medatTsmgem} className="mt-10" size="sm" onValueChange={(value) => { setMedatTsmgem(value) }} type="text" label="מידת צמגים" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    }
                                    {
                                        showDragThree && <AnimatePresence mode="wait">
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div>
                                                    <div dir="rtl" className="">
                                                        <div className="flex justify-around">
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={foundation} size="sm" onValueChange={(value) => { setFoundation(value) }} type="text" label="מסד" />
                                                                <Input color="primary" value={safetyreview} className="mt-10" size="sm" onValueChange={(value) => { setSafetyreview(value) }} type="text" label="תסקיר בטיחות" />
                                                                <Input color="primary" value={reviewerid} className="mt-10" size="sm" onValueChange={(value) => { setReviewerid(value) }} type="number" label="זהות סוקר" />
                                                                <Input color="primary" value={labreport} className="mt-10" size="sm" onValueChange={(value) => { setLabreport(value) }} type="text" label="דוח מעבדה" />
                                                                <Input color="primary" value={labid} size="sm" className="mt-10" onValueChange={(value) => { setLabid(value) }} type="number" label="זהות מעבדה" />
                                                            </div>
                                                            <div className="m-10" />
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={sheshAehad} size="sm" className="" onValueChange={(value) => { setSheshAehad(value) }} type="number" label="6.1" />
                                                                <Input color="primary" value={sheshShtaeem} size="sm" className="mt-10" onValueChange={(value) => { setSheshShtaeem(value) }} type="number" label="6.2" />
                                                                <Input color="primary" value={sheshShlosh} size="sm" className="mt-10" onValueChange={(value) => { setSheshShlosh(value) }} type="number" label="6.3" />
                                                                <Input color="primary" value={sheshArbaa} size="sm" className="mt-10" onValueChange={(value) => { setSheshArbaa(value) }} type="number" label="6.4" />
                                                                <Input color="primary" value={sheshHamesh} size="sm" className="mt-10" onValueChange={(value) => { setSheshHamesh(value) }} type="number" label="6.5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    }
                                    {
                                        showDragFour &&
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div>
                                                    <div dir="rtl" className="">
                                                        <div className="flex justify-around">
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={opendate} size="sm" onValueChange={(value) => { setOpendate(value) }} type="text" label="תאריך כניסה" />
                                                                <Input color="primary" value={closedate} className="mt-10" size="sm" onValueChange={(value) => { setClosedate(value) }} type="text" label="תאריך יציאה" />
                                                                <Input color="primary" value={opentime} className="mt-10" size="sm" onValueChange={(value) => { setOpentime(value) }} type="text" label="שעה כניסה" />
                                                                <Input color="primary" value={closetime} className="mt-10" size="sm" onValueChange={(value) => { setClosetime(value) }} type="text" label="שעה יציאה" />
                                                            </div>
                                                            <div className="m-10" />
                                                            <div className="w-1/3">
                                                                <Input color="primary" value={wight} size="sm" onValueChange={(value) => { setWight(value) }} type="text" label="משקל" />
                                                                <Input errorMessage={errorMessageMsbarAgla} color="primary" value={dragnum} className="mt-10" size="sm" onValueChange={(value) => { setDragnum(value) }} type="number" label="מספר גרור" />
                                                                <Input color="primary" value={skhom || ''} className="mt-10" size="sm" onValueChange={(value) => { setSkhom(value) }} type="number" label="סכום אגרה" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    }
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="bg-white border-t-2">
                            {
                                showDrag &&
                                <>
                                    <Button onClick={() => { setShowDrag(false); setShowDragTwo(true) }} size="sm" variant="flat" color="primary">המשך <MdOutlineArrowForward className="text-xl" /></Button>
                                </>
                            }
                            {
                                showDragTwo &&
                                <>
                                    <Button onClick={() => { setShowDrag(true); setShowDragTwo(false); }} size="sm" variant="flat" color="warning">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <Button onClick={() => { setShowDrag(false); setShowDragTwo(false); setShowDragThree(true); }} variant="flat" size="sm" color="primary">המשך <MdOutlineArrowForward className="text-xl" /></Button>
                                </>
                            }
                            {
                                showDragThree &&
                                <>
                                    <Button onClick={() => { setShowDrag(false); setShowDragTwo(true); setShowDragThree(false); }} size="sm" variant="flat" color="warning">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <Button onClick={() => { setShowDrag(false); setShowDragTwo(false); setShowDragThree(false); setShowDragFour(true); }} size="sm" variant="flat" color="primary">המשך <MdOutlineArrowForward className="text-xl" /></Button>
                                </>
                            }
                            {
                                showDragFour &&
                                <>
                                    <Button onClick={() => { setShowDrag(false); setShowDragTwo(false); setShowDragThree(true); setShowDragFour(false); }} size="sm" variant="flat" color="warning">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <Button onClick={() => { setShowModalAddDrag(false); setShowDrag(true); setShowDragTwo(false); setShowDragThree(false); setShowDragFour(false); }} size="sm" variant="flat" color="primary">סגירה</Button>
                                </>
                            }
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
            <div className="h-full flex flex-wrap 2xl:flex-nowrap items-center w-full">
                <Card className="w-full h-full mr-5">
                    <CardBody className="w-full h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div dir="rtl" className="w-full h-full flex flex-col">
                                    <div className="border-b-1 flex w-full justify-center items-center text-xl pb-3 sticky top-0 bg-white z-40">
                                        פרטי עגלה
                                    </div>
                                    <div className="flex flex-col h-full overflow-auto">
                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                            <div className="w-full flex items-center">
                                                <FaUser className="text-xl text-primary" />
                                                <div className="mr-2 border-r-2 pr-2 flex items-center">
                                                    <Input isReadOnly value={chossedAgla?.brtemLkoh?.name || chossedAgla?.newCustomer?.customerName || 'שם לקוח'} color="primary" size="sm" className="max-w-[200px]" />
                                                    {
                                                        chossedAgla?.newCustomer?.customerName && !chossedAgla?.brtemLkoh?.id &&
                                                        <Button onClick={() => { setShowModalAddCustomer(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full mr-2">
                                                            <MdMoreHoriz className="text-3xl" />
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    chossedAgla?.brtemLkoh?.name ?
                                                        <FaRegCircleCheck className="text-3xl text-success" />
                                                        :
                                                        <VscError className="text-3xl text-danger" />
                                                }
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                            <div className="w-full flex items-center">
                                                <FaTrailer className="text-xl text-primary" />
                                                <div className="mr-2 border-r-2 pr-2 flex items-center">
                                                    <Input isReadOnly value={chossedAgla?.msbar || 'מספר עגלה'} color="primary" size="sm" className="max-w-[200px]" />
                                                    {
                                                        chossedAgla?.msbar &&
                                                        <Button onClick={() => { setShowModalAddDrag(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full mr-2">
                                                            <MdMoreHoriz className="text-3xl" />
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    chossedAgla?.drag?.dragnum || dragnum ?
                                                        <FaRegCircleCheck className="text-3xl text-success" />
                                                        :
                                                        <VscError className="text-3xl text-danger" />
                                                }
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                            <div className="w-full flex items-center">
                                                <FiFilePlus className="text-xl text-primary" />
                                                <div className="mr-2 border-r-2 pr-2 flex items-center w-full">
                                                    <Table aria-labelledby="12ef3" aria-label="11233" dir="ltr" className="w-full ml-3">
                                                        <TableHeader>
                                                            <TableColumn className="text-right"></TableColumn>
                                                            <TableColumn className="text-right"></TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {documents.map((doc, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell className="text-right">
                                                                        <Button
                                                                            size='sm'
                                                                            variant='flat'
                                                                            onClick={() => handleToggleCheck(index)}
                                                                        >
                                                                            {checks?.includes(index) ? <FaCheck /> : '-'}
                                                                        </Button>
                                                                    </TableCell>
                                                                    <TableCell className="text-right">{doc}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    chossedAgla?.drag?.dragnum || dragnum ?
                                                        <FaRegCircleCheck className="text-3xl text-success" />
                                                        :
                                                        <VscError className="text-3xl text-danger" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center sticky bottom-0 pt-4 bg-white mr-4">
                                        <Button onClick={addNewDrag} isDisabled={!chossedAgla?.msbar} color="primary" variant="flat" size="sm">
                                            שמירה
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </CardBody>
                </Card>
                <Card className="h-full w-full ml-5">
                    <CardBody>
                        <div className="h-full flex justify-start items-center gap-[100px] flex-col p-5 overflow-auto">                           
                            <Table aria-labelledby="123" aria-label="1123" className="">
                                <TableHeader>
                                    <TableColumn className="text-right"></TableColumn>
                                    <TableColumn className="text-right">מצב רישוי</TableColumn>
                                    <TableColumn className="text-right">שלב</TableColumn>
                                    <TableColumn className="text-right">שם לקוח</TableColumn>
                                    <TableColumn className="text-right">מספר פעולה</TableColumn>
                                    <TableColumn className="text-right">סוג פעולה</TableColumn>
                                    <TableColumn className="text-right"></TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {
                                        aglotYetsor.map((agla, index) => {
                                            return <TableRow key={index} >
                                                <TableCell className={`text-right ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}><Button onClick={() => {
                                                    if (agla?.msbar === chossedAgla?.msbar) {
                                                        setChoosedAgla(null);
                                                        setChecks([]);
                                                        resetAllProps();
                                                    }
                                                    else {
                                                        setChoosedAgla(agla);
                                                        setChecks(agla?.drag?.checks || []);
                                                        setAllProps(agla?.drag);
                                                    }
                                                }} className="" size="sm" variant="flat" color={agla?.msbar === chossedAgla?.msbar ? 'danger' : 'default'}>{agla?.msbar === chossedAgla?.msbar ? 'דחות' : 'בחר'}</Button></TableCell>
                                                <TableCell className={`text-right ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{agla?.drag?.dragnum ? <div className="text-success">קיים</div> : <div className="text-danger">לא קיים</div>}</TableCell>
                                                <TableCell className={`text-right ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{GetShlavemInHebrow(agla.shlavNokhhe)}</TableCell>
                                                <TableCell className={`text-right ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{agla.brtemLkoh?.name || agla.newCustomer.customerName}</TableCell>
                                                <TableCell className={`text-right ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{agla.msbar}</TableCell>
                                                <TableCell className={`text-right ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}><div className="flex items-center justify-end"><div className="mr-1">{agla.locationYetsor === 'עארה' ? '(עארה)' : '(מעלה אפריים)'}</div><div>{agla.sogAskaa === 'ייצור' ? 'עגלה' : agla.sogAskaa}</div></div></TableCell>
                                                <TableCell className={`text-right ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}><div className="flex justify-center items-center">{GetTmonaLfeSog(agla.sogAskaa, agla.msbarAdefot, agla.locationYetsor)}</div></TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="hidden">
                <AllPages data={chossedAgla} documents={documents} ref={componentRefOne} />
            </div>
        </div>
    )
}


