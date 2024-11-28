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
import { firestore, storagee } from "../FireBase/firebase";
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
import { FiUpload } from "react-icons/fi";
import ModalUploadFile from "../Modals/ModalUploadFile";
import { getMetadata, ref } from "firebase/storage";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

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

    // מוכן 
    // מספר עגלה
    const sortingFunction = (a, b) => {
        if (a?.drag?.dragnum && !b?.drag?.dragnum) {
            return -1;
        }
        if (!a?.drag?.dragnum && b?.drag?.dragnum) {
            return 1;
        }
        return a.msbar - b.msbar;
    };

    const aglotB = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'B').sort(sortingFunction);
    const aglotC = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'C').sort(sortingFunction);
    const aglotD = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'D').sort(sortingFunction);

    const aglotYetsor = [...aglotB, ...aglotC, ...aglotD].sort(sortingFunction);


    const [chossedAgla, setChoosedAgla] = useState({});
    const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);
    const [showModalAddCustomerAdcon, setShowModalAddCustomerAdcon] = useState(false);
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
            checks: checks || []
        }
        try {
            if (chossedAgla?.brtemLkoh?.id) {
                await updateDoc(doc(firestore, "tfaol", chossedAgla?.id), {
                    drag: drag,
                });
            }
            else {
                await updateDoc(doc(firestore, "tfaol", chossedAgla?.id), {
                    drag: drag,
                    brtemLkoh: GetCurrentLkoh()
                });
            }
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
        handlePrint();
    }

    const GetCurrentLkoh = () => {
        for (let index = 0; index < lkhot.length; index++) {
            if ((lkhot[index].name + ' ' + lkhot[index].lastname) === (chossedAgla?.newCustomer?.customerName + ' ' + chossedAgla?.newCustomer?.customerLastName)) {
                return lkhot[index];
            }
        }
    }

    const checkAemLkohKeam = () => {
        for (let index = 0; index < lkhot.length; index++) {
            if ((lkhot[index].name + ' ' + lkhot[index].lastname) === (chossedAgla?.newCustomer?.customerName + ' ' + chossedAgla?.newCustomer?.customerLastName)) {
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
        setMasTaodatABTebos('');
        setMasVTokefResheonYatsran('');
        setTokefTaodatABTebos('');
        setMasAeshorYatsran('');
        setMasGlglemSrnem('');
        setMedatTsmgem('');
        setSheshAehad(0);
        setSheshShtaeem(0);
        setSheshShlosh(0);
        setSheshArbaa(0);
        setSheshHamesh(0);
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
        setMasTaodatABTebos(agla?.masTaodatABTebos);
        setMasVTokefResheonYatsran(agla?.masVTokefResheonYatsran);
        setTokefTaodatABTebos(agla?.tableokefTaodatABTebos);
        setMasAeshorYatsran(agla?.masAeshorYatsran);
        setMasGlglemSrnem(agla?.masGlglemSrnem);
        setMedatTsmgem(agla?.medatTsmgem);
        setSheshAehad(agla?.sheshAehad);
        setSheshShtaeem(agla?.sheshShtaeem);
        setSheshShlosh(agla?.sheshShlosh);
        setSheshArbaa(agla?.sheshArbaa);
        setSheshHamesh(agla?.sheshHamesh);
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

    const [buttonsDocuments,setButtonsDocuments] = useState([]);

    useEffect(() => {
        if (tfaol?.msbar) {
            setChoosedAgla(tfaol);
        }
    }, [tfaol]);


    const [lkohHdash, setLkohHdash] = useState(false);
    const [lkohForAdd, setLkohForAdd] = useState('');
    const [brtemLkoh, setBrtemLkoh] = useState(null);
    const [showModalUploadFile, setShowModalUploadFile] = useState(false);
    const [showModalUploadFileIndex, setShowModalUploadFileIndex] = useState(false);
    const [fileExists, setFileExists] = useState({});
    const [showPropButtons,setShowPropButtons] = useState(false);

    useEffect(() => {
        if (lkohForAdd) {
            for (let index = 0; index < lkhot.length; index++) {
                if ((lkhot[index].name + ' ' + lkhot[index].lastname) === lkohForAdd) {
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
        <div className="hebrow_font mb-20 h-full w-full select-none">
            <div className="fixed right-1/2 transform translate-x-1/2 z-50">
                <div className={`w-[800px] transition-all duration-500 ease-in-out flex justify-center ${showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <Alert className="max-w-[600px] w-full" dir="rtl" severity='error'>
                        <div className="mr-2">{showAlertMessage}</div>
                    </Alert>
                </div>
            </div>
            <div className="">
                <ModalUploadFile aglaID={chossedAgla?.id} existsFiles={chossedAgla?.existsFiles} dragnum={chossedAgla?.drag?.dragnum} index={showModalUploadFileIndex} show={showModalUploadFile} disable={() => setShowModalUploadFile(false)} />
            </div>
            <ModalAddCustomer LkohHdash={async (val1, val2) => {
                if (val1) {
                    setLkohHdash(val1);
                    setLkohForAdd(val2);
                }
            }} brtem={{
                customerName: chossedAgla?.newCustomer?.customerName,
                customerCity: chossedAgla?.newCustomer?.customerCity,
                customerPhone: chossedAgla?.newCustomer?.customerPhone,
                msbarMezahehm: chossedAgla?.newCustomer?.msbarMezahehm
            }} brtemLkohKeam={chossedAgla?.brtemLkoh} aglaId={chossedAgla?.id} lkhot={lkhot} lkohId={chossedAgla?.brtemLkoh?.id} adcon={showModalAddCustomerAdcon} counter={counter} show={showModalAddCustomer} disable={() => { setShowModalAddCustomer(false); setShowModalAddCustomerAdcon(false); }} />
            <Modal placement="center" className="test-fontt" backdrop={"blur"} size="3xl" isOpen={showModalAddDrag} onClose={() => setShowModalAddDrag(false)}>
                <ModalContent>
                    <>
                        <ModalHeader className="shadow-2xl flex justify-center border-b-2 bg-white">פרטים משרד תחבורה</ModalHeader>
                        <ModalBody className="shadow-2xl bg-white h-full overflow-auto">
                            <div className="h-full">
                                <div className="overflow-hidden select-none h-full">
                                    {
                                        showDrag &&
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                className="h-full"
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="h-full">
                                                    <div dir="rtl" className="h-full">
                                                        <div className="flex items-start overflow-auto h-full">
                                                            <div className="w-full m-2">
                                                                <Input color="primary" value={licenseid} className="" size="sm" onValueChange={(value) => { setLicenseid(value) }} type="number" label="מספר רישוי" />
                                                                <Input color="primary" value={chassisnum} className="mt-10" size="sm" onValueChange={(value) => { setChassisnum(value) }} type="text" label="מספר שלדה" />
                                                                <Input color="primary" value={model} className="mt-10" size="sm" onValueChange={(value) => { setModel(value) }} type="text" label="קוד דגם" />
                                                                <Input color="primary" value={masTaodatABTebos} className="mt-10" size="sm" onValueChange={(value) => { setMasTaodatABTebos(value) }} type="text" label="מס' תעודת אב טיפוס" />
                                                                <Input color="primary" value={bodytype} className="mt-10" size="sm" onValueChange={(value) => { setBodytype(value) }} type="text" label="סוג מרכב" />
                                                            </div>
                                                            <div className="w-full m-2">
                                                                <Input color="primary" value={long} size="sm" onValueChange={(value) => { setLong(value) }} type="text" label="אורך כללי" />
                                                                <Input color="primary" value={space} className="mt-10" size="sm" onValueChange={(value) => { setSpace(value) }} type="text" label="רוחב כללי" />
                                                                <Input color="primary" value={height} className="mt-10" size="sm" onValueChange={(value) => { setHeight(value) }} type="text" label="גובה כללי" />
                                                                <Input color="primary" value={masVTokefResheonYatsran} className="mt-10" size="sm" onValueChange={(value) => { setMasVTokefResheonYatsran(value) }} type="text" label="מס' ותוקף רישיון יצרן" />
                                                                <Input color="primary" value={categore} size="sm" className="mt-10" onValueChange={(value) => { setCategore(value) }} type="text" label="קטגוריה" />
                                                            </div>
                                                            <div className="w-full m-2">
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
                                                className="h-full"
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="h-full">
                                                    <div dir="rtl" className="h-full">
                                                        <div className="flex items-start overflow-auto h-full">
                                                            <div className="w-full m-2">
                                                                <Input color="primary" value={rearextension} size="sm" onValueChange={(value) => { setRearextension(value) }} type="text" label="שלוחה אחורית" />
                                                                <Input color="primary" value={lengthhatch} className="mt-10" size="sm" onValueChange={(value) => { setLengthhatch(value) }} type="text" label="אורך יצול" />
                                                                <Input color="primary" value={heightloading} className="mt-10" size="sm" onValueChange={(value) => { setHeightloading(value) }} type="text" label="גובה משטח העמסה" />
                                                                <Input color="primary" value={sizeloading} className="mt-10" size="sm" onValueChange={(value) => { setSizeloading(value) }} type="text" label="גובה משטח העמסה (מר)" />
                                                                <Input color="primary" value={masAeshorYatsran} className="mt-10" size="sm" onValueChange={(value) => { setMasAeshorYatsran(value) }} type="text" label="מס' אישור יצרן" />
                                                            </div>
                                                            <div className="w-full m-2">
                                                                <Input color="primary" value={bodymodel} size="sm" onValueChange={(value) => { setBodymodel(value) }} type="text" label="דגם מרכב" />
                                                                <Input color="primary" value={undercarriage} className="mt-10" size="sm" onValueChange={(value) => { setUndercarriage(value) }} type="text" label="מסד מרכב" />
                                                                <Input color="primary" value={selfweightaxles} className="mt-10" size="sm" onValueChange={(value) => { setSelfweightaxles(value) }} type="text" label="משקל עצמי על הסרנים" />
                                                                <Input color="primary" value={totalselfweight} className="mt-10" size="sm" onValueChange={(value) => { setTotalselfweight(value) }} type="text" label="משקל עצמי כולל" />
                                                                <Input color="primary" value={masGlglemSrnem} className="mt-10" size="sm" onValueChange={(value) => { setMasGlglemSrnem(value) }} type="text" label="מס' גלגלים / סרנים" />
                                                            </div>
                                                            <div className="w-full m-2">
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
                                                className="h-full"
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="h-full">
                                                    <div dir="rtl" className="h-full">
                                                        <div className="flex items-start overflow-auto h-full">
                                                            <div className="w-full m-2">
                                                                <Input color="primary" value={foundation} size="sm" onValueChange={(value) => { setFoundation(value) }} type="text" label="מסד" />
                                                                <Input color="primary" value={safetyreview} className="mt-10" size="sm" onValueChange={(value) => { setSafetyreview(value) }} type="text" label="תסקיר בטיחות" />
                                                                <Input color="primary" value={reviewerid} className="mt-10" size="sm" onValueChange={(value) => { setReviewerid(value) }} type="number" label="זהות סוקר" />
                                                                <Input color="primary" value={labreport} className="mt-10" size="sm" onValueChange={(value) => { setLabreport(value) }} type="text" label="דוח מעבדה" />
                                                                <Input color="primary" value={labid} size="sm" className="mt-10" onValueChange={(value) => { setLabid(value) }} type="number" label="זהות מעבדה" />
                                                            </div>
                                                            <div className="w-full m-2">
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
                                                className="h-full"
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="h-full">
                                                    <div dir="rtl" className="h-full">
                                                        <div className="flex items-start overflow-auto h-full">
                                                            <div className="w-full m-2">
                                                                <Input color="primary" value={opendate} size="sm" onValueChange={(value) => { setOpendate(value) }} type="text" label="תאריך כניסה" />
                                                                <Input color="primary" value={closedate} className="mt-10" size="sm" onValueChange={(value) => { setClosedate(value) }} type="text" label="תאריך יציאה" />
                                                                <Input color="primary" value={opentime} className="mt-10" size="sm" onValueChange={(value) => { setOpentime(value) }} type="text" label="שעה כניסה" />
                                                                <Input color="primary" value={closetime} className="mt-10" size="sm" onValueChange={(value) => { setClosetime(value) }} type="text" label="שעה יציאה" />
                                                            </div>
                                                            <div className="w-full m-2">
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
                <Card className={`${chossedAgla?.msbar ? 'opacity-100 translate-y-0 z-30' : 'opacity-0 translate-y-4'} transition-all duration-1000 ease-in-out w-full h-full 2xl:hidden  fixed top-[64px] left-0 bottom-0 right-0 rounded-none`}>
                    <CardBody className="w-full h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="h-full w-full"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-full h-full flex flex-col">
                                    <div className="h-full overflow-auto" dir="ltr">
                                        <div className="border-b-1 flex w-full justify-center items-center text-xl pb-3 sticky top-0 bg-white z-40">
                                            פרטי עגלה
                                        </div>
                                        <div dir="rtl" className="flex flex-col h-full">
                                            <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                                <div className="w-full flex items-center">
                                                    <FaUser className="text-xl text-primary" />
                                                    <div className="w-full">
                                                        <div className="mr-2 border-r-2 pr-2 flex items-center justify-center border-b-1 pb-2 sm:hidden w-full">
                                                            {
                                                                chossedAgla?.brtemLkoh?.name ?
                                                                    <FaRegCircleCheck className="text-3xl text-success" />
                                                                    :
                                                                    <VscError className="text-3xl text-danger" />
                                                            }
                                                        </div>
                                                        <div className="mr-2 border-r-2 pr-2 flex items-center pt-2">
                                                            <Input isReadOnly value={chossedAgla?.brtemLkoh?.name || chossedAgla?.newCustomer?.customerName || 'שם לקוח'} color="primary" size="sm" className="max-w-[200px]" />
                                                            {
                                                                chossedAgla?.newCustomer?.customerName && !chossedAgla?.brtemLkoh?.id &&
                                                                <Button onClick={() => { setShowModalAddCustomer(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full mr-2">
                                                                    <MdMoreHoriz className="text-3xl" />
                                                                </Button>
                                                            }
                                                            {
                                                                chossedAgla?.brtemLkoh?.id &&
                                                                <Button onClick={() => { setShowModalAddCustomer(true); setShowModalAddCustomerAdcon(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full mr-2">
                                                                    <MdMoreHoriz className="text-3xl" />
                                                                </Button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block">
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
                                                    <div className="w-full">
                                                        <div className="mr-2 border-r-2 pr-2 flex justify-center items-center border-b-1 pb-2 sm:hidden w-full">
                                                            {
                                                                chossedAgla?.drag?.dragnum || dragnum ?
                                                                    <FaRegCircleCheck className="text-3xl text-success" />
                                                                    :
                                                                    <VscError className="text-3xl text-danger" />
                                                            }
                                                        </div>
                                                        <div className="mr-2 border-r-2 pr-2 flex items-center pt-2">
                                                            <Input isReadOnly value={chossedAgla?.msbar || 'מספר עגלה'} color="primary" size="sm" className="max-w-[200px]" />
                                                            {
                                                                chossedAgla?.msbar &&
                                                                <Button onClick={() => { setShowModalAddDrag(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full mr-2">
                                                                    <MdMoreHoriz className="text-3xl" />
                                                                </Button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block">
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
                                                    <div className="w-full">
                                                        <div className="mr-2 border-r-2 pr-2 flex justify-center items-center w-full border-b-1 pb-2 sm:hidden">
                                                            {
                                                                chossedAgla?.drag?.dragnum || dragnum ?
                                                                    <FaRegCircleCheck className="text-3xl text-success" />
                                                                    :
                                                                    <VscError className="text-3xl text-danger" />
                                                            }
                                                        </div>
                                                        <div className="mr-2 border-r-2 pr-2 flex items-center w-full pt-2">
                                                            <Table aria-labelledby="12ef3" aria-label="11233" dir="ltr" className="w-full ml-3">
                                                                <TableHeader>
                                                                    <TableColumn className="text-right w-fit"></TableColumn>
                                                                    <TableColumn className="text-right w-full"></TableColumn>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {documents.map((doc, index) => (
                                                                        <TableRow key={index} className="border-b-1">
                                                                            <TableCell className="text-right w-fit">
                                                                                <div className="flex items-center w-fit">
                                                                                    <div className="h-[35px]">

                                                                                    </div>
                                                                                    {
                                                                                        <div className=" absolute bg-white z-20 overflow-x-hidden pr-3 border-r-1 rounded-r-full">
                                                                                            <AnimatePresence mode="wait">
                                                                                                {
                                                                                                    buttonsDocuments.includes(index) &&
                                                                                                    <motion.div
                                                                                                    className="h-full w-full"
                                                                                                    initial={{ opacity: 0, x: -100 }}
                                                                                                    animate={{ opacity: 1, x: 0 }}
                                                                                                    exit={{ opacity: 0, x: -100 }}
                                                                                                    transition={{ duration: 0.5 }}
                                                                                                >
                                                                                                    <div className="flex items-center">
                                                                                                        <Button
                                                                                                            className={`sm:block}`}
                                                                                                            size='sm'
                                                                                                            variant='flat'
                                                                                                            color={checks?.includes(index) ? 'success' : 'default'}
                                                                                                            onClick={() => handleToggleCheck(index)}
                                                                                                        >
                                                                                                            {checks?.includes(index) ? <FaCheck /> : '-'}
                                                                                                        </Button>
                                                                                                        <Button size="sm" className={`ml-2 sm:block `} variant="flat" color={chossedAgla?.existsFiles?.includes(index) ? 'success' : 'default'} onClick={() => { setShowModalUploadFile(true); setShowModalUploadFileIndex(index) }}><FiUpload className="text-base" /></Button>
                                                                                                        <BiArrowFromRight onClick={() => { setButtonsDocuments(prev => prev.filter(item => item !== index)); }} className="h-[35px] ml-2 text-primary rounded-full w-[18px]" />
                                                                                                    </div>
                                                                                                </motion.div>
                                                                                                }
                                                                                            </AnimatePresence>
                                                                                        </div>
                                                                                    }
                                                                                    <div className="">
                                                                                        {
                                                                                            !buttonsDocuments.includes(index) &&
                                                                                                <BiArrowFromLeft onClick={() => { setButtonsDocuments(prev => [...prev, index]) }} className="h-[35px] text-primary rounded-full w-[18px]" />
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </TableCell>
                                                                            <TableCell className="text-right text-[11px] sm:text-base w-full">{doc}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block">
                                                    {
                                                        chossedAgla?.drag?.dragnum || dragnum ?
                                                            <FaRegCircleCheck className="text-3xl text-success" />
                                                            :
                                                            <VscError className="text-3xl text-danger" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t-1 mb-[64px] pt-2 pr-2 flex justify-end">
                                        <Button onClick={() => {
                                            setChoosedAgla(null);
                                            setChecks([]);
                                            resetAllProps();
                                        }} className="mr-2 ml-2" size="sm" variant="flat" color="warning">
                                            סגור
                                        </Button>
                                        <Button onClick={addNewDrag} isDisabled={!chossedAgla?.msbar} color="primary" variant="flat" size="sm">
                                            שמירה
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </CardBody>
                </Card>
                <Card className="w-full h-full m-2 hidden 2xl:block">
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
                                                    {
                                                        chossedAgla?.brtemLkoh?.id &&
                                                        <Button onClick={() => { setShowModalAddCustomer(true); setShowModalAddCustomerAdcon(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full mr-2">
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
                                                                <TableRow key={index} className="border-b-1">
                                                                    <TableCell className="text-right">
                                                                        <div className="flex items-center">
                                                                            <Button
                                                                                size='sm'
                                                                                variant='flat'
                                                                                color={checks?.includes(index) ? 'success' : 'default'}
                                                                                onClick={() => handleToggleCheck(index)}
                                                                            >
                                                                                {checks?.includes(index) ? <FaCheck /> : '-'}
                                                                            </Button>
                                                                            <Button size="sm" className="ml-2" variant="flat" color={chossedAgla?.existsFiles?.includes(index) ? 'success' : 'default'} onClick={() => { setShowModalUploadFile(true); setShowModalUploadFileIndex(index) }}><FiUpload className="text-base" /></Button>
                                                                        </div>
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
                <div className="h-full w-full m-0 sm:m-2">
                    <Table aria-labelledby="123" aria-label="1123" className="w-full h-full">
                        <TableHeader>
                            <TableColumn className="text-right text-[10px] lg:text-sm"></TableColumn>
                            <TableColumn className="text-right text-[10px] lg:text-sm">מצב רישוי</TableColumn>
                            <TableColumn className="text-right text-[10px] lg:text-sm hidden sm:table-cell">שלב</TableColumn>
                            <TableColumn className="text-right text-[10px] lg:text-sm">שם לקוח</TableColumn>
                            <TableColumn className="text-right text-[10px] lg:text-sm">מספר פעולה</TableColumn>
                            <TableColumn className="text-right text-[10px] lg:text-sm hidden xs:table-cell">סוג פעולה</TableColumn>
                            <TableColumn className="text-right text-[10px] lg:text-sm hidden sm:table-cell"></TableColumn>
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
                                        <TableCell className={`text-right text-[10px] lg:text-sm ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{agla?.drag?.dragnum ? <div className="text-success">מוכן</div> : <div className="text-danger">לא מוכן</div>}</TableCell>
                                        <TableCell className={`text-right text-[10px] lg:text-sm hidden sm:table-cell ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{GetShlavemInHebrow(agla.shlavNokhhe)}</TableCell>
                                        <TableCell className={`text-right text-[10px] lg:text-sm ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{agla.brtemLkoh?.name || agla.newCustomer.customerName}</TableCell>
                                        <TableCell className={`text-right text-[10px] lg:text-sm ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}>{agla.msbar}</TableCell>
                                        <TableCell className={`text-right text-[10px] lg:text-sm hidden xs:table-cell ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}><div className="flex items-center justify-end"><div className="mr-1">{agla.locationYetsorAgla === 'עארה' ? '(עארה)' : '(מעלה אפריים)'}</div><div>{agla.sogAskaa === 'ייצור' ? 'עגלה' : agla.sogAskaa}</div></div></TableCell>
                                        <TableCell className={`text-right text-[10px] lg:text-sm hidden sm:table-cell ${agla?.msbar === chossedAgla?.msbar ? 'text-primary' : ''}`}><div className="flex justify-center items-center">{GetTmonaLfeSog(agla.sogAskaa, agla.msbarAdefot, agla.locationYetsorAgla)}</div></TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="hidden">
                <AllPages data={chossedAgla} documents={documents} ref={componentRefOne} />
            </div>
        </div>
    )
}


