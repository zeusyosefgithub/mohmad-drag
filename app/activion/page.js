'use client';
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import GetDocs from "../FireBase/getDocs";
import { AllPages } from "../Page Components/allPages";
import { addDoc, collection, count, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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

    const [showAddCus, setShowAddCus] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerHouseId, setCustomerHouseId] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerPostal, setCustomerPostal] = useState('');
    const [customerStreet, setCustomerStreet] = useState('');


    const [showDrag, setShowDrag] = useState(false);
    const [licenseid, setLicenseid] = useState(''); // מספר רישוי
    const [chassisnum, setChassisnum] = useState(''); // מספר שלדה
    const [prodction, setProdction] = useState(''); // תוצר
    const [model, setModel] = useState(''); // קוד דגם
    const [categore, setCategore] = useState(''); // קטגוריה
    const [color, setColor] = useState(''); // צבע
    const [kinddrag, setKinddrag] = useState(''); // סוג הרכב
    const [producer, setProducer] = useState(''); // יצרן
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

    const [masTaodatABTebos,setMasTaodatABTebos] = useState('');
    const [tableokefTaodatABTebos,setTokefTaodatABTebos] = useState('');
    const [masVTokefResheonYatsran,setMasVTokefResheonYatsran] = useState('');
    const [masAeshorYatsran,setMasAeshorYatsran] = useState('');
    const [masGlglemSrnem,setMasGlglemSrnem] = useState('');
    const [medatTsmgem,setMedatTsmgem] = useState('');

    const [sheshAehad,setSheshAehad] = useState('');
    const [sheshShtaeem,setSheshShtaeem] = useState('');
    const [sheshShlosh,setSheshShlosh] = useState('');

    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterLkhot');
    const counter2 = metadata.find((count) => count.id === 'counterAglot');

    const [errorMessageShem,setErrorMessageShem] = useState('');
    const [errorMessageTaodatZehot,setErrorMessageTaodatZehot] = useState('');
    const [errorMessageMsbarAgla,setErrorMessageMsbarAgla] = useState('');

   

    const GetIdWight = () => {
        let newDate = new Date();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        let id = 50 + counter2?.count;
        let yearr = year.toString();
        let idwight = `${yearr[2]}${yearr[3]}${(month + 1) < 10 ? "0" : null}${month + 1}-0${id}`;
        return idwight;
    }

    const checkAemLkohKeam = () => {
        for (let index = 0; index < lkhot.length; index++) {
            if(lkhot[index].name === customerName){
                setErrorMessageShem('שם הלקוח כבר קיים !!');
                return true;
            }
            if(lkhot[index].cusid === customerId){
                setErrorMessageTaodatZehot('ת.ז הלקוח כבר קיימת !!');
                return true;
            }
        }
        return false;
    }

    const hosfatLkoh = async () => {
        setErrorMessageShem('');
        setErrorMessageTaodatZehot('');
        if (lkohKeam) {
            setShowAddCus(false);
            setShowDrag(true);
            return;
        }
        if (checkAemLkohKeam()) {
            return;
        }
        setLoading(true);
        const customer = {
            city: customerCity,
            cusid: customerId,
            houseid: customerHouseId,
            idnum: counter?.count,
            lastname: customerLastName,
            name: customerName,
            phone: customerPhone,
            postal: customerPostal,
            street: customerStreet,
            yetera: 0,
        }
        console.log(123);
        await addDoc(collection(firestore, "customers"), customer);
        await updateDoc(doc(firestore, 'metadata', 'counterLkhot'), { count: counter?.count + 1 });
        setLoading(false);
        setShowAddCus(false); 
        setShowDrag(true);

    }

    const sendDataToPages = () => {
        let cus, drag;
        if (lkohKeam) {
            cus = lkoh;
        }
        else{
            cus = {
                city: customerCity,
                cusid: customerId,
                houseid: customerHouseId,
                idnum: counter?.count,
                lastname: customerLastName,
                name: customerName,
                phone: customerPhone,
                postal: customerPostal,
                street: customerStreet
            }
        }
        if(aglaKeamet){
            drag = Agla;
        }
        else{
            drag = {
                authorizedweight: authorizedweight,
                bodymodel: bodymodel,
                bodytype: bodytype,
                categore: categore,
                chassisnum: chassisnum,
                closedate: closedate,
                closetime: closetime,
                color: color,
                daterecord: currentdate,
                device: device,
                distributionloads: distributionloads,
                dragnum: dragnum,
                foundation: foundation,
                height: height,
                heightloading: heightloading,
                idnum: counter2?.count,
                idcustomer: counter?.count,
                idwight: GetIdWight(),
                installer: installer,
                kinddrag: kinddrag,
                labid: labid,
                labreport: labreport,
                lengthhatch: lengthhatch,
                licenseid: licenseid,
                long: long,
                model: model,
                opendate: opendate,
                opentime: opentime,
                prodction: prodction,
                producer: producer,
                rearextension: rearextension,
                reviewerid: reviewerid,
                safetyreview: safetyreview,
                selfweightaxles: selfweightaxles,
                sizeloading: sizeloading,
                space: space,
                totalselfweight: totalselfweight,
                undercarriage: undercarriage,
                wight: wight,
                masTaodatABTebos: masTaodatABTebos,
                tableokefTaodatABTebos: tableokefTaodatABTebos,
                masVTokefResheonYatsran: masVTokefResheonYatsran,
                masAeshorYatsran: masAeshorYatsran,
                masGlglemSrnem: masGlglemSrnem,
                medatTsmgem: medatTsmgem,
                sheshAehad: sheshAehad,
                sheshShtaeem: sheshShtaeem,
                sheshShlosh: sheshShlosh,
            }
        }
        return { cus, drag };
    }

    const checkAemAglaKeamt = () => {
        for (let index = 0; index < aglot.length; index++) {
            if(aglot[index].dragnum === dragnum){
                setErrorMessageMsbarAgla('מספר העגלה כבר קיים !!');
                return true;
            }
        }
        return false;
    }

    const addNewDrag = async () => {
        setErrorMessageMsbarAgla('');
        if(checkAemAglaKeamt()){
            return;
        }
        setLoading(true);
        const drag = {
            authorizedweight: authorizedweight,
            bodymodel: bodymodel,
            bodytype: bodytype,
            categore: categore,
            chassisnum: chassisnum,
            closedate: closedate,
            closetime: closetime,
            color: color,
            daterecord: currentdate,
            device: device,
            distributionloads: distributionloads,
            dragnum: dragnum,
            foundation: foundation,
            height: height,
            heightloading: heightloading,
            idnum: counter2?.count,
            idcustomer: lkohKeam ? lkoh.idnum : counter?.count,
            idwight: GetIdWight(),
            installer: installer,
            kinddrag: kinddrag,
            labid: labid,
            labreport: labreport,
            lengthhatch: lengthhatch,
            licenseid: licenseid,
            long: long,
            model: model,
            opendate: opendate,
            opentime: opentime,
            prodction: prodction,
            producer: producer,
            rearextension: rearextension,
            reviewerid: reviewerid,
            safetyreview: safetyreview,
            selfweightaxles: selfweightaxles,
            sizeloading: sizeloading,
            space: space,
            totalselfweight: totalselfweight,
            undercarriage: undercarriage,
            wight: wight,
            masTaodatABTebos: masTaodatABTebos,
            tableokefTaodatABTebos: tableokefTaodatABTebos,
            masVTokefResheonYatsran: masVTokefResheonYatsran,
            masAeshorYatsran: masAeshorYatsran,
            masGlglemSrnem: masGlglemSrnem,
            medatTsmgem: medatTsmgem,
            sheshAehad: sheshAehad,
            sheshShtaeem: sheshShtaeem,
            sheshShlosh: sheshShlosh,

        }
        !aglaKeamet && await addDoc(collection(firestore, "drags"), drag);
        !aglaKeamet && await updateDoc(doc(firestore, 'metadata', 'counterAglot'), { count: counter2?.count + 1 });
        setLoading(false);
        handlePrint();
        setShowAddCus(true); setShowDrag(false); setShowDragTwo(false); setShowDragThree(false); setShowDragFour(false);
        resetAllProps();
    }

    const resetAllProps = () => {
        setCustomerName('');
        setCustomerId('');
        setCustomerHouseId('');
        setCustomerCity('');
        setCustomerLastName('');
        setCustomerPhone('');
        setCustomerPostal('');
        setCustomerStreet('');
        setLicenseid('');
        setChassisnum('');
        setProdction('');
        setModel('');
        setCategore('');
        setColor('');
        setKinddrag('');
        setProducer('');
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
        setLabreport('');
        setLabid('');
        setOpendate('');
        setClosedate('');
        setOpentime('');
        setClosetime('');
        setWight('');
        setDragnum('');
    }

    const [lkohKeam,setLkohKeam] = useState(false);
    const [lkoh,setLkoh] = useState();
    const lkhot = GetDocs('customers');
    const [aglaKeamet,setAglaKeamet] = useState(false);
    const [Agla,setAgla] = useState();
    const aglot = GetDocs('drags');

    const [loading,setLoading] = useState(false);

    return (
        <div className="hebrow_font">
            <div className="flex justify-center">
                <div className="w-9/12">

                    <div className="mt-8 p-5 bg-white rounded-3xl shadow-2xl">
                        {
                            showAddCus && <div>
                                <div className="flex justify-center text-2xl">
                                    <div onClick={() => {setLkohKeam(false);setLkoh(null);}} className={`ml-1 mr-1 cursor-pointer ${!lkohKeam && 'text-primary'}`}>חדש</div>
                                    <div className="ml-1 mr-1">או</div>
                                    <div onClick={() => setLkohKeam(true)} className={`ml-1 mr-1 cursor-pointer ${lkohKeam && 'text-primary'}`}>קיים</div>
                                    <div className="ml-1 mr-1">לקוח</div>
                                </div>
                                {
                                    lkohKeam ?
                                        <>
                                            <div dir="rtl" className="mt-5 text-xl">
                                                פרטיים הלקוח הקיים :
                                            </div>
                                            <div dir="ltr" className="mt-5">
                                                <div className='mt-5 bg-gray-300 h-[450px] overflow-auto'>
                                                    <table className="w-full table-auto border-collapse">
                                                        <thead>
                                                            <tr className="bg-gray-500 dark:bg-gray-800 sticky top-0">
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-white to-gray-50">עיר</th>
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-gray-50 to-gray-100">מיקוד</th>
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-gray-100 to-gray-200">כתובת</th>
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-gray-200 to-gray-300">רחוב</th>
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-gray-300 to-gray-400">מספר טלפון</th>
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-gray-400 to-gray-500">מס ת.ז</th>
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-gray-500 to-gray-600">שם משפחה</th>
                                                                <th className="px-4 py-3 text-center font-medium text-black bg-gradient-to-r from-gray-600 to-gray-700">שם פרטי</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lkhot.map((item, index) => (
                                                                <tr onClick={() => setLkoh(item)} key={index} className={`border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-primary-200 ${lkoh?.idnum === item.idnum && 'bg-primary-200'}`}>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.city}</td>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item?.postal}</td>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.houseid}</td>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.street}</td>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.phone}</td>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.cusid}</td>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.lastname}</td>
                                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.name}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div dir="rtl" className="mt-5 text-xl">
                                                פרטיים הלקוח החדש :
                                            </div>
                                            <div dir="rtl" className="mt-5">
                                                <div className="flex justify-around">
                                                    <div className="w-1/3">
                                                        <Input errorMessage={errorMessageShem} color="primary" value={customerName} size="sm" onValueChange={(value) => { setCustomerName(value) }} type="text" label="שם לקוח" />
                                                        <Input color="primary" value={customerLastName} className="mt-10" size="sm" onValueChange={(value) => { setCustomerLastName(value) }} type="text" label="שם משפחה" />
                                                        <Input color="primary" value={customerPhone} className="mt-10" size="sm" onValueChange={(value) => { setCustomerPhone(value) }} type="number" label="מס טלפון" />
                                                        <Input color="primary" value={customerStreet} className="mt-10" size="sm" onValueChange={(value) => { setCustomerStreet(value) }} type="text" label="רחוב" />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <Input errorMessage={errorMessageTaodatZehot} color="primary" value={customerId} size="sm" onValueChange={(value) => { setCustomerId(value) }} type="number" label="מס תעודת זהות" />
                                                        <Input color="primary" value={customerPostal} className="mt-10" size="sm" onValueChange={(value) => { setCustomerPostal(value) }} type="number" label="מס מיקוד" />
                                                        <Input color="primary" value={customerHouseId} className="mt-10" size="sm" onValueChange={(value) => { setCustomerHouseId(value) }} type="number" label="מס בית" />
                                                        <Input color="primary" value={customerCity} className="mt-10" size="sm" onValueChange={(value) => { setCustomerCity(value) }} type="text" label="ישוב" />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                                <div className="flex justify-center mt-28">
                                    <Button isLoading={loading} isDisabled={lkohKeam ? (!lkoh) : (!customerName || !customerLastName || !customerPhone || !customerStreet || !customerId || !customerPostal || !customerHouseId || !customerCity)} onClick={hosfatLkoh} size="lg" color="primary">הוספה והמשך<MdOutlineArrowForward className="text-xl" /></Button>
                                </div>
                            </div>
                        }
                        {
                            showDrag && aglaKeamet &&
                            <div>
                                <div className="flex justify-center text-2xl">
                                    <div onClick={() => { setAglaKeamet(false); setAgla(null); }} className={`ml-1 mr-1 cursor-pointer ${!aglaKeamet && 'text-primary'}`}>חדשה</div>
                                    <div className="ml-1 mr-1">או</div>
                                    <div onClick={() => setAglaKeamet(true)} className={`ml-1 mr-1 cursor-pointer ${aglaKeamet && 'text-primary'}`}>קיימת</div>
                                    <div className="ml-1 mr-1">עגלה</div>
                                </div>
                                <div dir="ltr" className="mt-5">
                                    <div className='mt-5 bg-gray-300 h-[450px] overflow-auto'>
                                        <table className="w-full table-auto border-collapse">
                                            <thead>
                                                <tr className="sticky top-0">
                                                    <th className="px-4 py-3 text-center bg-gradient-to-r from-white to-gray-50 font-medium text-black">רוחב</th>
                                                    <th className="px-4 py-3 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-medium text-black">אורך</th>
                                                    <th className="px-4 py-3 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-medium text-black">משקל</th>
                                                    <th className="px-4 py-3 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-medium text-black">מספר עגלה</th>
                                                    <th className="px-4 py-3 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-medium text-black">זהות העגלה</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {aglot.map((item, index) => (
                                                    <tr onClick={() => setAgla(item)} key={index} className={`border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-primary-200 ${Agla?.idnum === item.idnum && 'bg-primary-200'}`}>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.space}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.long}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.wight}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.dragnum}</td>
                                                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">{item.idwight}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(true); setShowDrag(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="ml-10 mr-10"></div>
                                    <Button isDisabled={!Agla} onClick={addNewDrag} size="lg" color="primary">הוספה <IoMdAdd className="text-xl" /></Button>
                                </div>
                            </div>
                        }
                        {
                            showDrag && !aglaKeamet && <div>
                                <div className="flex justify-center text-2xl">
                                    <div onClick={() => {setAglaKeamet(false);setAgla(null);}} className={`ml-1 mr-1 cursor-pointer ${!aglaKeamet && 'text-primary'}`}>חדשה</div>
                                    <div className="ml-1 mr-1">או</div>
                                    <div onClick={() => setAglaKeamet(true)} className={`ml-1 mr-1 cursor-pointer ${aglaKeamet && 'text-primary'}`}>קיימת</div>
                                    <div className="ml-1 mr-1">עגלה</div>
                                </div>
                                <div dir="rtl" className="mt-5 text-xl">
                                    פרטיים העגלה החדשה :
                                </div>
                                <div dir="rtl" className="mt-5">
                                    <div className="flex justify-around">
                                        <div className="w-1/3">
                                            <Input color="primary" value={licenseid} size="sm" onValueChange={(value) => { setLicenseid(value) }} type="number" label="מספר רישוי" />
                                            <Input color="primary" value={chassisnum} className="mt-10" size="sm" onValueChange={(value) => { setChassisnum(value) }} type="number" label="מספר שלדה" />
                                            <Input color="primary" value={prodction} className="mt-10" size="sm" onValueChange={(value) => { setProdction(value) }} type="text" label="תוצר" />
                                            <Input color="primary" value={model} className="mt-10" size="sm" onValueChange={(value) => { setModel(value) }} type="text" label="קוד דגם" />
                                            <Input color="primary" value={masTaodatABTebos} className="mt-10" size="sm" onValueChange={(value) => { setMasTaodatABTebos(value) }} type="text" label="מס' תעודת אב טיפוס" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input color="primary" value={categore} size="sm" onValueChange={(value) => { setCategore(value) }} type="text" label="קטגוריה" />
                                            <Input color="primary" value={color} className="mt-10" size="sm" onValueChange={(value) => { setColor(value) }} type="text" label="צבע" />
                                            <Input color="primary" value={kinddrag} className="mt-10" size="sm" onValueChange={(value) => { setKinddrag(value) }} type="text" label="סוג הרכב" />
                                            <Input color="primary" value={producer} className="mt-10" size="sm" onValueChange={(value) => { setProducer(value) }} type="text" label="יצרן" />
                                            <Input color="primary" value={tableokefTaodatABTebos} className="mt-10" size="sm" onValueChange={(value) => { setTokefTaodatABTebos(value) }} type="text" label="תוקף תעודת אב טיפוס" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input color="primary" value={bodytype} size="sm" onValueChange={(value) => { setBodytype(value) }} type="text" label="סוג מרכב" />
                                            <Input color="primary" value={long} className="mt-10" size="sm" onValueChange={(value) => { setLong(value) }} type="text" label="אורך כללי" />
                                            <Input color="primary" value={space} className="mt-10" size="sm" onValueChange={(value) => { setSpace(value) }} type="text" label="רוחב כללי" />
                                            <Input color="primary" value={height} className="mt-10" size="sm" onValueChange={(value) => { setHeight(value) }} type="text" label="גובה כללי" />
                                            <Input color="primary" value={masVTokefResheonYatsran} className="mt-10" size="sm" onValueChange={(value) => { setMasVTokefResheonYatsran(value) }} type="text" label="מס' ותוקף רישיון יצרן" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(true); setShowDrag(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="ml-10 mr-10"></div>
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(false); setShowDragTwo(true) }} size="lg" color="primary">המשך <MdOutlineArrowForward className="text-xl" /></Button>
                                </div>
                            </div>
                        }
                        {
                            showDragTwo && <div>
                                <div className="text-center text-2xl">עגלה דף 2</div>
                                <div dir="rtl" className="mt-5 text-xl">
                                    פרטיים העגלה החדשה :
                                </div>
                                <div dir="rtl" className="mt-5">
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
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(true); setShowDragTwo(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="ml-10 mr-10"></div>
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(false); setShowDragTwo(false); setShowDragThree(true); }} size="lg" color="primary">המשך <MdOutlineArrowForward className="text-xl" /></Button>
                                </div>
                            </div>
                        }
                        {
                            showDragThree && <div>
                                <div className="text-center text-2xl">עגלה דף 3</div>
                                <div dir="rtl" className="mt-5 text-xl">
                                    פרטיים העגלה החדשה :
                                </div>
                                <div dir="rtl" className="mt-5">
                                    <div className="flex justify-around">
                                        <div className="w-1/3">
                                            <Input color="primary" value={foundation} size="sm" onValueChange={(value) => { setFoundation(value) }} type="text" label="מסד" />
                                            <Input color="primary" value={safetyreview} className="mt-10" size="sm" onValueChange={(value) => { setSafetyreview(value) }} type="text" label="תסקיר בטיחות" />
                                            <Input color="primary" value={reviewerid} className="mt-10" size="sm" onValueChange={(value) => { setReviewerid(value) }} type="number" label="זהות סוקר" />
                                            <Input color="primary" value={labreport} className="mt-10" size="sm" onValueChange={(value) => { setLabreport(value) }} type="text" label="דוח מעבדה" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input color="primary" value={labid} size="sm" onValueChange={(value) => { setLabid(value) }} type="number" label="זהות מעבדה" />
                                            <Input color="primary" value={sheshAehad} size="sm" className="mt-10" onValueChange={(value) => { setSheshAehad(value) }} type="number" label="6.1" />
                                            <Input color="primary" value={sheshShtaeem} size="sm" className="mt-10" onValueChange={(value) => { setSheshShtaeem(value) }} type="number" label="6.2" />
                                            <Input color="primary" value={sheshShlosh} size="sm" className="mt-10" onValueChange={(value) => { setSheshShlosh(value) }} type="number" label="6.3" />

                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(false); setShowDragTwo(true); setShowDragThree(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="ml-10 mr-10"></div>
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(false); setShowDragTwo(false); setShowDragThree(false); setShowDragFour(true); }} size="lg" color="primary">המשך <MdOutlineArrowForward className="text-xl" /></Button>
                                </div>
                            </div>
                        }
                        {
                            showDragFour && <div>
                                <div className="text-center text-2xl">תעודה</div>
                                <div dir="rtl" className="mt-5 text-xl">
                                    פרטיים העגלה החדשה :
                                </div>
                                <div dir="rtl" className="mt-5">
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
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(false); setShowDragTwo(false); setShowDragThree(true); setShowDragFour(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="ml-10 mr-10"></div>
                                    <Button isLoading={loading} onClick={addNewDrag} size="lg" color="primary">הוספה <IoMdAdd className="text-xl" /></Button>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
            <div className="hidden">
                <AllPages data={sendDataToPages()} ref={componentRefOne} />
            </div>
        </div>
    )
}