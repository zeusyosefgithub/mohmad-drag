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


    const Customers = GetDocs('customers');
    const Drags = GetDocs('drags');

    const counter = GetDocs('metadata').find((count) => count.id === 'counterLkhot');
    const counter2 = GetDocs('metadata').find((count) => count.id === 'counterAglot');

    const GetIdWight = () => {
        let newDate = new Date();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        let id = 50 + counter2?.count;
        let yearr = year.toString();
        let idwight = `${yearr[2]}${yearr[3]}${(month + 1) < 10 ? "0" : null}${month + 1}-0${id}`;
        return idwight;
    }

    const sendDataToPages = () => {
        let cus,drag;
        if(lkohKeam){
            cus = lkoh;
        }
        else{
            cus = {
                city: customerCity,
                cusid: customerId,
                houseid: customerHouseId,
                idnum: counter?.count,
                lastname: customerName,
                name: customerLastName,
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
                wight: wight
            }
        }
        return { cus, drag };
    }

    const addNewDrag = async () => {
        const customer = {
            city: customerCity,
            cusid: customerId,
            houseid: customerHouseId,
            idnum: counter?.count,
            lastname: customerName,
            name: customerLastName,
            phone: customerPhone,
            postal: customerPostal,
            street: customerStreet
        }
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
            wight: wight
        }
        !lkohKeam && await addDoc(collection(firestore, "customers"), customer);
        !aglaKeamet && await addDoc(collection(firestore, "drags"), drag);
        !lkohKeam && await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        !aglaKeamet && await updateDoc(doc(firestore, 'metadata', counter2?.id), { count: counter2?.count + 1 });
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

    return (
        <div className="hebrow_font">
            <div className="flex justify-center">
                <div className="w-9/12 mt-20">

                    <div className="mt-8 p-5">
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
                                                                <th className="px-4 py-3 text-center font-medium text-white">עיר</th>
                                                                <th className="px-4 py-3 text-center font-medium text-white">מיקוד</th>
                                                                <th className="px-4 py-3 text-center font-medium text-white">כתובת</th>
                                                                <th className="px-4 py-3 text-center font-medium text-white">רחוב</th>
                                                                <th className="px-4 py-3 text-center font-medium text-white">מספר טלפון</th>
                                                                <th className="px-4 py-3 text-center font-medium text-white">מס ת.ז</th>
                                                                <th className="px-4 py-3 text-center font-medium text-white">שם משפחה</th>
                                                                <th className="px-4 py-3 text-center font-medium text-white">שם פרטי</th>
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
                                                        <Input value={customerName} size="sm" onValueChange={(value) => { setCustomerName(value) }} type="text" label="שם לקוח" />
                                                        <Input value={customerLastName} className="mt-10" size="sm" onValueChange={(value) => { setCustomerLastName(value) }} type="text" label="שם משפחה" />
                                                        <Input value={customerPhone} className="mt-10" size="sm" onValueChange={(value) => { setCustomerPhone(value) }} type="number" label="מס טלפון" />
                                                        <Input value={customerStreet} className="mt-10" size="sm" onValueChange={(value) => { setCustomerStreet(value) }} type="text" label="רחוב" />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <Input value={customerId} size="sm" onValueChange={(value) => { setCustomerId(value) }} type="number" label="מס תעודת זהות" />
                                                        <Input value={customerPostal} className="mt-10" size="sm" onValueChange={(value) => { setCustomerPostal(value) }} type="number" label="מס מיקוד" />
                                                        <Input value={customerHouseId} className="mt-10" size="sm" onValueChange={(value) => { setCustomerHouseId(value) }} type="number" label="מס בית" />
                                                        <Input value={customerCity} className="mt-10" size="sm" onValueChange={(value) => { setCustomerCity(value) }} type="text" label="ישוב" />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                                <div className="flex justify-center mt-28">
                                    <Button disabled={lkohKeam && !lkoh} onClick={() => { setShowAddCus(false); setShowDrag(true) }} size="lg" color="primary">המשך <MdOutlineArrowForward className="text-xl" /></Button>
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
                                                <tr className="bg-gray-500 dark:bg-gray-800 sticky top-0">
                                                    <th className="px-4 py-3 text-center font-medium text-white">רוחב</th>
                                                    <th className="px-4 py-3 text-center font-medium text-white">אורך</th>
                                                    <th className="px-4 py-3 text-center font-medium text-white">משקל</th>
                                                    <th className="px-4 py-3 text-center font-medium text-white">מספר עגלה</th>
                                                    <th className="px-4 py-3 text-center font-medium text-white">זהות העגלה</th>
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
                                    <div className="m-20"></div>
                                    <Button onClick={addNewDrag} size="lg" color="primary">הוספה <IoMdAdd className="text-xl" /></Button>
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
                                <div dir="rtl" className="mt-5">
                                    <div className="flex justify-around">
                                        <div className="w-1/3">
                                            <Input value={licenseid} size="sm" onValueChange={(value) => { setLicenseid(value) }} type="number" label="מספר רישוי" />
                                            <Input value={chassisnum} className="mt-10" size="sm" onValueChange={(value) => { setChassisnum(value) }} type="number" label="מספר שלדה" />
                                            <Input value={prodction} className="mt-10" size="sm" onValueChange={(value) => { setProdction(value) }} type="text" label="תוצר" />
                                            <Input value={model} className="mt-10" size="sm" onValueChange={(value) => { setModel(value) }} type="text" label="קוד דגם" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input value={categore} size="sm" onValueChange={(value) => { setCategore(value) }} type="text" label="קטגוריה" />
                                            <Input value={color} className="mt-10" size="sm" onValueChange={(value) => { setColor(value) }} type="text" label="צבע" />
                                            <Input value={kinddrag} className="mt-10" size="sm" onValueChange={(value) => { setKinddrag(value) }} type="text" label="סוג הרכב" />
                                            <Input value={producer} className="mt-10" size="sm" onValueChange={(value) => { setProducer(value) }} type="text" label="יצרן" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input value={bodytype} size="sm" onValueChange={(value) => { setBodytype(value) }} type="text" label="סוג מרכב" />
                                            <Input value={long} className="mt-10" size="sm" onValueChange={(value) => { setLong(value) }} type="text" label="אורך כללי" />
                                            <Input value={space} className="mt-10" size="sm" onValueChange={(value) => { setSpace(value) }} type="text" label="רוחב כללי" />
                                            <Input value={height} className="mt-10" size="sm" onValueChange={(value) => { setHeight(value) }} type="text" label="גובה כללי" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(true); setShowDrag(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="m-20"></div>
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
                                            <Input value={rearextension} size="sm" onValueChange={(value) => { setRearextension(value) }} type="text" label="שלוחה אחורית" />
                                            <Input value={lengthhatch} className="mt-10" size="sm" onValueChange={(value) => { setLengthhatch(value) }} type="text" label="אורך יצול" />
                                            <Input value={heightloading} className="mt-10" size="sm" onValueChange={(value) => { setHeightloading(value) }} type="text" label="גובה משטח העמסה" />
                                            <Input value={sizeloading} className="mt-10" size="sm" onValueChange={(value) => { setSizeloading(value) }} type="text" label="גובה משטח העמסה (מר)" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input value={bodymodel} size="sm" onValueChange={(value) => { setBodymodel(value) }} type="text" label="דגם מרכב" />
                                            <Input value={undercarriage} className="mt-10" size="sm" onValueChange={(value) => { setUndercarriage(value) }} type="text" label="מסד מרכב" />
                                            <Input value={selfweightaxles} className="mt-10" size="sm" onValueChange={(value) => { setSelfweightaxles(value) }} type="text" label="משקל עצמי על הסרנים" />
                                            <Input value={totalselfweight} className="mt-10" size="sm" onValueChange={(value) => { setTotalselfweight(value) }} type="text" label="משקל עצמי כולל" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input value={authorizedweight} size="sm" onValueChange={(value) => { setAuthorizedweight(value) }} type="text" label="משקל מורשה" />
                                            <Input value={distributionloads} className="mt-10" size="sm" onValueChange={(value) => { setDistributionloads(value) }} type="text" label="חלוקת העומסים" />
                                            <Input value={device} className="mt-10" size="sm" onValueChange={(value) => { setDevice(value) }} type="text" label="התקן" />
                                            <Input value={installer} className="mt-10" size="sm" onValueChange={(value) => { setInstaller(value) }} type="text" label="שם המתקין" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(true); setShowDragTwo(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="m-20"></div>
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
                                            <Input value={foundation} size="sm" onValueChange={(value) => { setFoundation(value) }} type="text" label="מסד" />
                                            <Input value={safetyreview} className="mt-10" size="sm" onValueChange={(value) => { setSafetyreview(value) }} type="text" label="תסקיר בטיחות" />
                                            <Input value={reviewerid} className="mt-10" size="sm" onValueChange={(value) => { setReviewerid(value) }} type="number" label="זהות סוקר" />
                                            <Input value={labreport} className="mt-10" size="sm" onValueChange={(value) => { setLabreport(value) }} type="text" label="דוח מעבדה" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input value={labid} size="sm" onValueChange={(value) => { setLabid(value) }} type="number" label="זהות מעבדה" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(false); setShowDragTwo(true); setShowDragThree(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="m-20"></div>
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
                                            <Input value={opendate} size="sm" onValueChange={(value) => { setOpendate(value) }} type="text" label="תאריך כניסה" />
                                            <Input value={closedate} className="mt-10" size="sm" onValueChange={(value) => { setClosedate(value) }} type="text" label="תאריך יציאה" />
                                            <Input value={opentime} className="mt-10" size="sm" onValueChange={(value) => { setOpentime(value) }} type="text" label="שעה כניסה" />
                                            <Input value={closetime} className="mt-10" size="sm" onValueChange={(value) => { setClosetime(value) }} type="text" label="שעה יציאה" />
                                        </div>
                                        <div className="m-10" />
                                        <div className="w-1/3">
                                            <Input value={wight} size="sm" onValueChange={(value) => { setWight(value) }} type="text" label="משקל" />
                                            <Input value={dragnum} className="mt-10" size="sm" onValueChange={(value) => { setDragnum(value) }} type="number" label="מספר גרור" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-28">
                                    <Button onClick={() => { setShowAddCus(false); setShowDrag(false); setShowDragTwo(false); setShowDragThree(true); setShowDragFour(false); }} size="lg" color="primary">לחזור <MdOutlineArrowBack className="text-xl" /></Button>
                                    <div className="m-20"></div>
                                    <Button onClick={addNewDrag} size="lg" color="primary">הוספה <IoMdAdd className="text-xl" /></Button>
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