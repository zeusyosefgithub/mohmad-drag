'use client';
import { Autocomplete, AutocompleteItem, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Switch } from "@nextui-org/react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import ModalBrtemNosfemAobed from '../Modals/ModalBrtemNosfemAobed';
export default function ModalKsfem({ disable, show, brtemMhtgatHotsaa, lkhot, sbkem, aobdem }) {


    const { contactName, setContactName, customerSet, setCustomerSet } = useContext(ContactContext);
    const [entries, setEntries] = useState([{ msbarShek: '', msbarBank: '', shemBank: '', msbarHeshvonBank: '', tarekhBeraon: '', skhom: '' }]);
    const [lkoh, setLkoh] = useState('');
    const [sbak, setSbak] = useState('');
    const [aobed, setAobed] = useState('');
    const [loading,setLoading] = useState(false);

    const [sbakID,setSbakID] = useState(null);    
    const [lkohID,setLkohID] = useState(null);
    const [aobedID,setAobedID] = useState(null);
    
    const ResetAll = () => {
        setSbakID(null);
        setLkohID(null);
        setAobedID(null);
        disable();
        setLkoh('');
        setSbak('');
        setAobed('');
        setMezoman(false);
        setShekem(false);
        setSkhomKolel(0);
        setSelectedKeys1("צד שני");
        setSelectedKeys("סוג עסקה");
        setKesefMezoman(0);
        setEntries([{ msbarShek: '', msbarBank: '', shemBank: '', msbarHeshvonBank: '', tarekhBeraon: '', skhom: '' }]);
    }

    const handleInputChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const handleAddFields = () => {
        setEntries([...entries, { msbarShek: '', msbarBank: '', shemBank: '', msbarHeshvonBank: '', tarekhBeraon: '', skhom: '' }]);
    };
    const counter = GetDocs('metadata').find((count) => count.id === 'counterTnoahBmzomnem');
    const handleSubmit = async (e) => {
        setLoading(true);
        if (selectedKeys1 === 'עובדים') {
            if (selectedKeys.currentKey === "תשלום שכר עבודה") {
                let res = hehzer ? (aobed.skharBroto - skhomKolel) : (aobed.skharBroto + skhomKolel);
                await updateDoc(doc(firestore, 'aobdem', aobed.id), {
                    skharBroto: aobed.skharBroto + skhomKolel
                });
            }
            else if (selectedKeys.currentKey === "הפרשת פנסיה") {
                let res = hehzer ? (aobed.bensea - skhomKolel) : (aobed.bensea + skhomKolel);
                await updateDoc(doc(firestore, 'aobdem', aobed.id), {
                    bensea: aobed.bensea + skhomKolel
                });
            }
            else if (selectedKeys.currentKey === "הפרשת פיצוים") {
                let res = hehzer ? (aobed.betsoeem - skhomKolel) : (aobed.betsoeem + skhomKolel);
                await updateDoc(doc(firestore, 'aobdem', aobed.id), {
                    betsoeem: aobed.betsoeem + skhomKolel
                });
            }
            await addDoc(collection(firestore, "tnoahBmzomnem"), {
            skhomKlle: skhomKolel,
            mezoman: kesefMezoman,
            shekem: entries,
            sogAska: selectedKeys.currentKey,
            msbar: counter?.count,
            lkoh: aobed.msbar,
            active : true,
            sogLkoh: "C",
            tarekh: format(new Date(), 'dd-MM-yyyy'),
        });
        }
        else if (selectedKeys1 === 'ספקים') {
            let res = hehzer ? (sbak.ytratHeshvon - skhomKolel) : (sbak.ytratHeshvon + skhomKolel);
            console.log("res ------" + res);
            console.log("hehzer ------" + hehzer);
            await updateDoc(doc(firestore, 'sbkem', sbak.id), {
                ytratHeshvon: res
            });
            await addDoc(collection(firestore, "tnoahBmzomnem"), {
            skhomKlle: skhomKolel,
            mezoman: kesefMezoman,
            shekem: entries,
            sogAska: selectedKeys.currentKey,
            msbar: counter?.count,
            lkoh: sbak.msbar,
            active : true,
            sogLkoh: "A",
            tarekh: format(new Date(), 'dd-MM-yyyy'),
        });
        }
        else if (selectedKeys1 === 'לקחות') {
            let res = hehzer ? (lkoh.yetera + skhomKolel) : (lkoh.yetera - skhomKolel);
            await updateDoc(doc(firestore, 'customers', lkoh.id), {
                yetera: res
            });
            await addDoc(collection(firestore, "tnoahBmzomnem"), {
            skhomKlle: skhomKolel,
            mezoman: kesefMezoman,
            shekem: entries,
            sogAska: selectedKeys.currentKey,
            msbar: counter?.count,
            lkoh: lkoh.idnum,
            active : true,
            sogLkoh: "B",
            tarekh: format(new Date(), 'dd-MM-yyyy'),
        });
        }
        
        await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        handelPrintKbala();
        ResetAll();
        setLoading(false);
    };

    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);
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

    useEffect(() => {
        console.log(sbakID);
        if (brtemMhtgatHotsaa.skhom && brtemMhtgatHotsaa.sbak) {
            setSkhomKolel(parseFloat(brtemMhtgatHotsaa.skhom));
            if (brtemMhtgatHotsaa.sbakAoLkoh === 'sbak') {
                setAobed(brtemMhtgatHotsaa.sbak);
                setSelectedKeys1('עובדים');
            }
            else {
                setSbakID(brtemMhtgatHotsaa.sbak.id);
                setSbak(brtemMhtgatHotsaa.sbak);
                setSelectedKeys1("ספקים");
            }
            setSelectedKeys(brtemMhtgatHotsaa.sogHotsaa);
        }
    }, [brtemMhtgatHotsaa]);

    console.log(sbakID);

    const bdekatTkenotAeshorNehol = () => {
        if (!selectedKeys || !selectedKeys1 || !skhomKolel) {
            return true;
        }
        if ((parseFloat(kesefMezoman) + parseFloat(GetSkhomShekem())) != skhomKolel) {
            return true;
        }
    }

    const [hehzer,setHehzer] = useState(false);

    const GetSbakMtaem = (val1, val2) => {
        if (val2 === 'החזר הוצאות שכר') {
            return val1 === 'הוצאות שכר';
        }
        if (val2 === 'החזר קניות מוצרים') {
            return val1 === 'קניות מוצרים';
        }
        if (val2 === 'החזר מסים') {
            return val1 === 'מסים';
        }
        if (val2 === 'החזר הוצאות שוטפות') {
            return val1 === 'הוצאות שוטפות';
        }
        if (val2 === 'החזר הוצאות אחרות') {
            return val1 === 'הוצאות אחרות';
        }
        if (val1 === val2) {
            return true;
        }
    }

    useEffect(() => {
        if(selectedKeys.currentKey === 'החזר הוצאות שכר'){
            setHehzer(true);
        }
        else if(selectedKeys.currentKey === 'החזר קניות מוצרים'){
            setHehzer(true);
        }
        else if(selectedKeys.currentKey === 'החזר מסים'){
            setHehzer(true);
        }
        else if(selectedKeys.currentKey === 'החזר הוצאות שוטפות'){
            setHehzer(true);
        }
        else if(selectedKeys.currentKey === 'החזר הוצאות אחרות'){
            setHehzer(true);
        }
        else if(selectedKeys.currentKey === "החזרת כסף ללקוח"){
            setHehzer(true);
        }
        else{
            setHehzer(false);
        }
    },[selectedKeys])


    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הנהלת חשבונות</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div>
                            <div className="p-5 flex justify-center mb-5">
                                <form className='w-full'>
                                    <div ref={topOfFormRef} />
                                    <div dir='rtl' className=''>
                                        <div className='flex justify-center items-center'>
                                            <Input size="sm" defaultValue={format(new Date(), 'dd-MM-yyyy')} className="max-w-[200px] ml-2 mr-2" label='תאריך' />
                                            <Dropdown dir="rtl">
                                                <DropdownTrigger>
                                                    <Button
                                                        variant="bordered"
                                                        className="capitalize ml-2 mr-2"

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
                                                        className="capitalize ml-2 mr-2"
                                                        isDisabled={(!(selectedKeys1 !== 'צד שני'))}

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
                                                        onSelectionChange={(val) => setSelectedKeys(val.currentKey)}
                                                    >
                                                        <DropdownItem key="תשלום שכר עבודה">תשלום שכר עבודה</DropdownItem>
                                                        <DropdownItem key="הפרשת פנסיה">הפרשת פנסיה</DropdownItem>
                                                        <DropdownItem key="הפרשת פיצוים">הפרשת פיצוים</DropdownItem>
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
                                                        onSelectionChange={(val) => setSelectedKeys(val.currentKey)}
                                                    >
                                                        <DropdownItem key={'הוצאות שכר'}>{'הוצאות שכר '}</DropdownItem>
                                                        <DropdownItem key={'קניות מוצרים'}>{'קניות מוצרים'}</DropdownItem>
                                                        <DropdownItem key={'מסים'}>{'מסים'}</DropdownItem>
                                                        <DropdownItem key={'הוצאות שוטפות'}>{'הוצאות שוטפות'}</DropdownItem>
                                                        <DropdownItem key={'הוצאות אחרות'}>{'הוצאות אחרות'}</DropdownItem>
                                                        <DropdownItem key={'החזר הוצאות שכר'}>{'החזר הוצאות שכר'}</DropdownItem>
                                                        <DropdownItem key={'החזר קניות מוצרים'}>{'החזר קניות מוצרים'}</DropdownItem>
                                                        <DropdownItem key={'החזר מסים'}>{'החזר מסים'}</DropdownItem>
                                                        <DropdownItem key={'החזר הוצאות שוטפות'}>{'החזר הוצאות שוטפות'}</DropdownItem>
                                                        <DropdownItem key={'החזר הוצאות אחרות'}>{'החזר הוצאות אחרות'}</DropdownItem>
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
                                                        onSelectionChange={(val) => setSelectedKeys(val.currentKey)}
                                                    >
                                                        <DropdownItem key="קבלת כסף מלקוח">קבלת כסף מלקוח</DropdownItem>
                                                        <DropdownItem key="החזרת כסף ללקוח">החזרת כסף ללקוח</DropdownItem>
                                                    </DropdownMenu>
                                                }
                                            </Dropdown>
                                            <div className='flex justify-center items-center'>
                                            {
                                                selectedKeys1 == 'לקחות' &&
                                                <Autocomplete
                                                    isDisabled={selectedKeys === "סוג עסקה"}
                                                    bordered
                                                    fullWidth
                                                    label="לקוח"
                                                    className="max-w-[200px] m-5"
                                                    color="primary"
                                                    selectedKey={lkohID}
                                                    onSelectionChange={setLkohID}
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
                                                    isDisabled={selectedKeys === "סוג עסקה"}
                                                    bordered
                                                    fullWidth
                                                    size="sm"
                                                    label="ספק"
                                                    className="max-w-[200px] m-5"
                                                    color="primary"
                                                    selectedKey={sbakID}
                                                    onSelectionChange={setSbakID}
                                                    defaultItems={sbkem}
                                                    allowsCustomValue={false}
                                                >
                                                    {
                                                        sbkem.map((sbakkk) => (
                                                            GetSbakMtaem(sbakkk?.sherot,selectedKeys) && <AutocompleteItem onClick={() => {setSbak(sbakkk);}} className='text-right' key={sbakkk.id} value={sbakkk.id}>
                                                                {sbakkk.shem}
                                                            </AutocompleteItem>
                                                        ))
                                                    }
                                                </Autocomplete>
                                            }
                                            {
                                                console.log(sbakID)
                                            }
                                            {
                                                selectedKeys1 == 'עובדים' &&
                                                <Autocomplete
                                                    isDisabled={selectedKeys === "סוג עסקה"}
                                                    bordered
                                                    fullWidth
                                                    size="sm"
                                                    label="עובד"
                                                    className="max-w-[200px] m-5"
                                                    color="primary"
                                                    selectedKey={aobedID}
                                                    onSelectionChange={setAobedID}
                                                    defaultItems={aobdem}
                                                    allowsCustomValue={false}
                                                >
                                                    {
                                                        aobdem.map((aobedd) => (
                                                            <AutocompleteItem onClick={() => setAobed(aobedd)} className='text-right' key={aobedd.id} value={aobedd.id}>
                                                                {aobedd.shem}
                                                            </AutocompleteItem>
                                                        ))
                                                    }
                                                </Autocomplete>
                                            }
                                        </div>
                                            
                                        </div>
                                        <div className='flex justify-center items-center'>
                                        {
                                                selectedKeys1 === 'לקחות'
                                                    ?
                                                    <>
                                                        <Input dir="ltr" size="sm" color="primary" type="number" value={skhomKolel || ''} onValueChange={(val) => setSkhomKolel(parseFloat(val))} className="max-w-[200px] m-5" label='סכום כולל' />
                                                        <Input dir="ltr" size="sm" readOnly value={lkoh?.yetera} color={((lkoh?.yetera - skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                        <Input dir="ltr" size="sm" readOnly value={(lkoh?.yetera + (hehzer ? (+ skhomKolel) : (- skhomKolel))) || ''} color={((lkoh?.yetera + (hehzer ? (+ skhomKolel) : (- skhomKolel))) >= 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                    </>
                                                    : selectedKeys1 === 'ספקים' ?
                                                        <>
                                                            <Input dir="ltr" size="sm" color="primary" type="number" value={skhomKolel || ''} onValueChange={(val) => setSkhomKolel(parseFloat(val))} className="max-w-[200px] m-5" label='סכום כולל' />
                                                            <Input dir="ltr" size="sm" readOnly value={sbak?.ytratHeshvon} color={((sbak?.ytratHeshvon + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                            <Input dir="ltr" size="sm" readOnly value={(sbak?.ytratHeshvon + (hehzer ? (- skhomKolel) : (+ skhomKolel))) || ''} color={((sbak?.ytratHeshvon + (hehzer ? (- skhomKolel) : (+ skhomKolel))) >= 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                        </>
                                                        : selectedKeys1 === 'עובדים' ?
                                                            <>
                                                                {
                                                                    selectedKeys.currentKey === "תשלום שכר עבודה" ?
                                                                        <>
                                                                            <Input dir="ltr" size="sm" color="primary" type="number" value={skhomKolel || ''} onValueChange={(val) => setSkhomKolel(parseFloat(val))} className="max-w-[200px] m-5" label='סכום כולל' />
                                                                            <Input dir="ltr" size="sm" readOnly value={aobed?.skharBroto} color={((aobed?.skharBroto + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                                            <Input dir="ltr" size="sm" readOnly value={parseFloat(aobed?.skharBroto + skhomKolel) || ''} color={((aobed?.skharBroto + skhomKolel) >= 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                                        </>
                                                                        : selectedKeys.currentKey === "הפרשת פנסיה" ?
                                                                            <>
                                                                                <Input dir="ltr" size="sm" color="primary" type="number" value={skhomKolel || ''} onValueChange={(val) => setSkhomKolel(parseFloat(val))} className="max-w-[200px] m-5" label='סכום כולל' />
                                                                                <Input dir="ltr" size="sm" readOnly value={aobed?.bensea} color={((aobed?.bensea + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                                                <Input dir="ltr" size="sm" readOnly value={parseFloat(aobed?.bensea + skhomKolel) || ''} color={((aobed?.bensea + skhomKolel) >= 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                                            </>
                                                                            : selectedKeys.currentKey === "הפרשת פיצוים" ?
                                                                                <>
                                                                                    <Input dir="ltr" size="sm" color="primary" type="number" value={skhomKolel || ''} onValueChange={(val) => setSkhomKolel(parseFloat(val))} className="max-w-[200px] m-5" label='סכום כולל' />
                                                                                    <Input dir="ltr" size="sm" readOnly value={aobed?.betsoeem} color={((aobed?.betsoeem + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                                                    <Input dir="ltr" size="sm" readOnly value={parseFloat(aobed?.betsoeem + skhomKolel) || ''} color={((aobed?.betsoeem + skhomKolel) >= 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                                                </>
                                                                                : null
                                                                }

                                                            </>
                                                            :
                                                            null
                                            }
                                        </div>
                                       
                                    </div>
                                    <Divider className="mt-10"/>
                                    <div className="h-[250px] overflow-y-scroll">
                                        <div dir="rtl" className="flex items-center m-5">
                                            <Switch size="sm" value={mezoman} onValueChange={(e) => setMezoman(e)}>
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
                                            <Switch size="sm" value={shekem} onValueChange={(e) => setShekem(e)}>
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
                                    </div>

                                    <Divider />
                                    <div ref={endOfFormRef} />
                                </form>
                            </div>
                            <div className="hidden border-2 border-black">
                                <Kbala kesefMezoman={kesefMezoman} shekem={entries} lkoh={lkoh} ref={componentRefOne} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={ResetAll}>
                            סגור
                        </Button>
                        <Button isDisabled={bdekatTkenotAeshorNehol()} isLoading={loading} size="lg" color="primary" onClick={handleSubmit}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}