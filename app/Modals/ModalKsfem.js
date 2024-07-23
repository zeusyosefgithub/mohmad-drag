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
export default function ModalKsfem({ disable, show,brtemMhtgatHotsaa,lkhot,sbkem,aobdem }) {


    const { contactName, setContactName, customerSet, setCustomerSet } = useContext(ContactContext);
    const [entries, setEntries] = useState([{ msbarShek: '', msbarBank: '', shemBank: '', msbarHeshvonBank: '', tarekhBeraon: '', skhom: '' }]);
    const [lkoh, setLkoh] = useState('');
    const [sbak, setSbak] = useState('');
    const [aobed,setAobed] = useState('');

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
        e.preventDefault();
        await updateDoc(doc(firestore, 'customers', lkoh.id), {
            yetera: lkoh.yetera - skhomKolel
        });
        await addDoc(collection(firestore, "tnoahBmzomnem"), {
            skhomKlle: skhomKolel,
            mezoman: kesefMezoman,
            shekem: entries,
            msbar: counter?.count,
            lkoh: lkoh.idnum,
            sogLkoh: selectedKeys1 === "עובדים" ? "C" : selectedKeys1 === "ספקים" ? "A" : "B",
            tarekh: format(new Date(), 'dd-MM-yyyy'),

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
        if(brtemMhtgatHotsaa.skhom && brtemMhtgatHotsaa.sbak){
            setSkhomKolel(parseFloat(brtemMhtgatHotsaa.skhom));
            if(brtemMhtgatHotsaa.sbakAoLkoh === 'sbak'){
                setAobed(brtemMhtgatHotsaa.sbak);
                setSelectedKeys1('עובדים'); 
            }
            else{
                setSbak(brtemMhtgatHotsaa.sbak);
                setSelectedKeys1("ספקים"); 
            }
            setSelectedKeys(brtemMhtgatHotsaa.sogHotsaa);
        }
    },[brtemMhtgatHotsaa]);

    console.log(sbak);

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={() => {
            disable();
            setSelectedKeys("צד שני");
            setSelectedKeys1("סוג עסקה");
            setMezoman(false);
            setShekem(false);
            setSkhomKolel(0);
            setKesefMezoman(0);
            setSbak('');
            setLkoh('');

        }}>
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
                                                        onSelectionChange={setSelectedKeys}
                                                    >
                                                        <DropdownItem key="קבלת כסף מלקוח">קבלת כסף מלקוח</DropdownItem>
                                                        <DropdownItem key="החזרת כסף ללקוח">החזרת כסף ללקוח</DropdownItem>
                                                    </DropdownMenu>
                                                }
                                            </Dropdown>
                                            <Input size="sm" color="success" type="number" value={skhomKolel || ''} onValueChange={(val) => setSkhomKolel(Math.max(Math.min(val, lkoh?.yetera), 0))} className="max-w-[200px] m-5" label='סכום כולל' />
                                            {
                                                selectedKeys1 === 'לקחות'
                                                ?
                                                <>
                                                <Input size="sm" readOnly value={lkoh?.yetera} color={((lkoh?.yetera - skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                <Input size="sm" readOnly value={(lkoh?.yetera - skhomKolel) || ''} color={((lkoh?.yetera - skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                </> 
                                                : selectedKeys1 === 'ספקים' ?
                                                <>
                                                <Input size="sm" readOnly value={sbak?.ytratHeshvon} color={((sbak?.ytratHeshvon + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                <Input size="sm" readOnly value={(sbak?.ytratHeshvon + skhomKolel) || ''} color={((sbak?.ytratHeshvon + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                </>
                                                :
                                                <>
                                                <Input size="sm" readOnly value={sbak?.ytratHeshvon} color={((sbak?.ytratHeshvon + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה קודמת' />
                                                <Input size="sm" readOnly value={(sbak?.ytratHeshvon + skhomKolel) || ''} color={((sbak?.ytratHeshvon + skhomKolel) === 0) ? 'success' : "danger"} className="max-w-[200px] m-5" label='יתרת חובה חדשה' />
                                                </>
                                            }
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            {
                                                selectedKeys1 == 'לקחות' &&
                                                <Autocomplete
                                                    bordered
                                                    fullWidth
                                                    label="לקוח"
                                                    className="max-w-[200px] m-5"
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
                                                    size="sm"
                                                    label="ספק"
                                                    className="max-w-[200px] m-5"
                                                    color="primary"
                                                    selectedKey={sbak.id}
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
                                            {
                                                selectedKeys1 == 'עובדים' &&
                                                <Autocomplete
                                                    bordered
                                                    fullWidth
                                                    size="sm"
                                                    label="עובד"
                                                    className="max-w-[200px] m-5"
                                                    color="primary"
                                                    selectedKey={aobed.id}
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
                                    <Divider />
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
                        <Button size="lg" color="primary" onClick={() => {
                            disable();
                            setSelectedKeys("צד שני");
                            setSelectedKeys1("סוג עסקה");
                            setMezoman(false);
                            setShekem(false);
                            setSkhomKolel(0);
                            setKesefMezoman(0);
                            setSbak('');
                            setLkoh('');

                        }}>
                            סגור
                        </Button>
                        <Button size="lg" color="primary" onClick={handleSubmit}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}