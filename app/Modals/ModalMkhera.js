'use client';

import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Heshvonet } from "../Page Components/Heshvonet";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { collection, count, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
import GetDocs from "../FireBase/getDocs";
import { format } from "date-fns";
import { FaArrowUp, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export default function ModalMkhera({ show, disable,mlae,category }) {

    const componentRefOne = useRef();
    const lkhot = GetDocs('customers');
    const [lkoh, setLkoh] = useState();
    const [msbarLkoh, setMsbarLkoh] = useState();
    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterMkherot');
    const counterHkhnsotAhrot = metadata.find((count) => count.id === 'counterHkhnsotAhrot');
    const counterHeshvoneot = metadata.find((count) => count.id === 'counterHeshvoneot');
    const currentDate = format(new Date(), 'dd-MM-yyyy');
    const [hn7a,setHn7a] = useState(0);
    const [entries, setEntries] = useState([{ category: '',motsar : '', sogMotsar: '',errorKmot : '',errorMher : '',mherLeheda : 0, remez: '',kmot : 0, message: '' }]);
    const [loading,setLoading] = useState(false);

    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `
        @page {
                size: A4;
                margin: 0;
            }
        `,
        content: () => componentRefOne.current,
    });
    const fetchCustomerData = async (customerId) => {
        try {
            const customersRef = collection(firestore, 'customers');
            const q = query(customersRef, where("idnum", "==", customerId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // Assuming customerId is unique, return the first document found
                setLkoh({ ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id });
            } else {
                setLkoh(null);
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setLkoh(null);
        }
    };
    const ResetAll = () => {
        setLkoh(null);
        setMsbarLkoh(null);
        setEntries([{ category: '',motsar : '', sogMotsar: '',errorKmot : '',errorMher : '',mherLeheda : 0, remez: '',kmot : 0, message: '' }]);
        disable();
    }
    useEffect(() => {
        if (msbarLkoh) {
            fetchCustomerData(msbarLkoh);
        }
    }, [msbarLkoh]);
    useEffect(() => {
        if (lkoh && lkoh.id) {
            const unsub = onSnapshot(doc(firestore, 'customers', lkoh.id), (doc) => {
                if (doc.exists()) {
                    setLkoh({ ...doc.data(), id: doc.id });
                } else {
                    setLkoh(null);
                }
            });
            return () => unsub();
        }
    }, [lkoh?.id]);
    const handleEntriesChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = (field === 'kmot') && (value < 0) ? 0 : value;
        setEntries(newEntries);
    };
    const GetCategoryRemez = (shem) => {
        const categoryItem = category.find(item => item.shem === shem);
        return categoryItem ? categoryItem.motsarem : [];
    };
    
    const GetMotsaremRemez = (remez) => {
        const result = mlae.filter(item => item.categoryMotsar === remez);
        return result;
    };
    const handleAddEntries = () => {
        setEntries([...entries, { category: '',motsar : '', sogMotsar: '',errorKmot : '',errorMher : '',mherLeheda : 0, remez: '',kmot : 0}]);
    };
    function removeItem(index) {
        const newItems = entries.filter((_, idx) => idx !== index);
        setEntries(newItems);
    }
    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae.find(item => item.shem === shem)?.kmot || 0;
        return { arrayResualt: motsarMlae, alot, kmot };
    }, [mlae]);

    const bdekatAeshorMkhera = () => {
        let countErrors = 0;
        entries.forEach((_, index) => {
            handleEntriesChange(index, 'errorKmot', '');
            handleEntriesChange(index, 'errorMher', '');
        });
        entries.forEach((entry, index) => {
            if (entry.kmot === 0 || entry.kmot === '') {
                countErrors++;
                handleEntriesChange(index, 'errorKmot', 'אין כמות !!');
            }
            if (entry.mherLeheda === 0 || entry.mherLeheda === '') {
                countErrors++;
                handleEntriesChange(index, 'errorMher', 'אין מחיר !!');
            }
        });
        return countErrors !== 0;
    }


    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalBody className="shadow-2xl">
                        <div className="w-full h-full flex mt-10 justify-center">
                            <div className="w-full max-w-[700px]">
                                <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                    תמחיר
                                </div>
                                <div>
                                    <Heshvonet msbarHeshvonet={counterHeshvoneot?.count} isNew ref={componentRefOne} lkoh={lkoh} entries={entries || null} hn7a={hn7a} new={{
                                        date: currentDate,
                                        counter: counter
                                    }} />
                                </div>
                            </div>
                            <Divider className="w-[2px] h-full ml-5 mr-5" />
                            <div className="w-full max-w-[800px] flex flex-col">
                                <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                    עסקת מכירה
                                </div>
                                <div dir="rtl" className="mt-10 flex flex-col flex-grow">
                                    <div className="mb-5">
                                        <Autocomplete
                                            label="בחר לקוח"
                                            className="max-w-[200px] mt-2"
                                            color="primary"
                                            defaultItems={lkhot}
                                            onSelectionChange={setLkoh}
                                            onInputChange={setLkoh}
                                        >
                                            {
                                                lkhot.map((lko, index) => (
                                                    <AutocompleteItem onClick={() => setMsbarLkoh(lko.idnum)} className='text-right' key={lko?.name} value={lko?.name}>
                                                        {lko?.name}
                                                    </AutocompleteItem>
                                                ))
                                            }
                                        </Autocomplete>
                                    </div>
                                    <div>
                                        <Input className="max-w-[200px] mb-4" value={hn7a || ''} onValueChange={(e) => setHn7a(Math.max(e,0))} type="number" label="הנחה"/>
                                    </div>
                                    <Divider />
                                    <div dir="ltr" className="overflow-auto h-[60vh]">
                                        <div />
                                        {entries?.map((entry, index) => (
                                            <>
                                                <div dir='rtl' key={index} className="w-full flex items-start mt-3 mb-3 justify-around">
                                                    <div className='mr-2 m-auto'>{index + 1}</div>
                                                    <Dropdown dir="rtl">
                                                        <DropdownTrigger>
                                                            <Button
                                                               
                                                                className='m-2 max-w-[80px] w-full'
                                                            >
                                                                {entry.category ? entry?.category : 'קטיגוריה'}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Multiple selection example"
                                                            variant="flat"
                                                            closeOnSelect={true}
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                            selectedKeys={entry.category}
                                                            onSelectionChange={(val) => { handleEntriesChange(index, 'category', val.currentKey); }}
                                                        >
                                                            <DropdownItem key="מתכות">מתכות</DropdownItem>
                                                            <DropdownItem key="צבעים">צבעים</DropdownItem>
                                                            <DropdownItem key="חלקים גדולים">חלקים גדולים</DropdownItem>
                                                            <DropdownItem key="חלקים קטנים">חלקים קטנים</DropdownItem>
                                                            <DropdownItem key="מדביקות">מדביקות</DropdownItem>
                                                            <DropdownItem key="אורות וחשמל">אורות וחשמל</DropdownItem>
                                                            <DropdownItem key="חומרי עזר">חומרי עזר</DropdownItem>
                                                            <DropdownItem key="ווי גרירה">ווי גרירה</DropdownItem>
                                                            <DropdownItem key="עגלות">עגלות</DropdownItem>
                                                            <DropdownItem key="פסולת">פסולת</DropdownItem>
                                                            <DropdownItem key="מוצרים אחרים">מוצרים אחרים</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    <Dropdown dir="rtl">
                                                        <DropdownTrigger>
                                                            <Button
                                                                
                                                                className='m-2 max-w-[80px] w-full'
                                                                isDisabled={!entries[index]?.category}
                                                            >
                                                                {entry.sogMotsar ? entry?.sogMotsar : 'בחר סוג'}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Multiple selection example"
                                                            variant="flat"
                                                            closeOnSelect={true}
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                            selectedKeys={entry.id}
                                                            onSelectionChange={(val) => { handleEntriesChange(index, 'sogMotsar', val.currentKey); }}
                                                        >
                                                            {
                                                                (
                                                                    GetCategoryRemez(entry?.category) || []).map((cat) => (
                                                                    <DropdownItem
                                                                        onClick={() => { handleEntriesChange(index, 'remez', cat.sog); }}
                                                                        key={cat?.shem}
                                                                    >
                                                                        {cat?.shem}
                                                                    </DropdownItem>
                                                                ))
                                                            }
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    <Dropdown dir="rtl">
                                                        <DropdownTrigger>
                                                            <Button
                                                             
                                                                className='m-2 max-w-[80px] w-full'
                                                                isDisabled={!entry?.category || !entry?.sogMotsar}
                                                            >
                                                                {entry.motsar ? entry?.motsar?.shem : 'בחר מוצר'}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Multiple selection example"
                                                            variant="flat"
                                                            closeOnSelect={true}
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                        >
                                                            {
                                                                (
                                                                    GetMotsaremRemez(entry?.remez) || []).map((motsar, idx) => (
                                                                    <DropdownItem
                                                                        key={idx}
                                                                        onClick={() => handleEntriesChange(index, 'motsar', motsar)}
                                                                    >
                                                                        {motsar.shem}
                                                                    </DropdownItem>
                                                                ))
                                                            }
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    <Input color={entry?.errorKmot && 'danger'} errorMessage={entry?.errorKmot} size="sm" className="max-w-[100px] ml-2 mr-2" isDisabled={!entry?.category || !entry?.sogMotsar || !entry?.motsar} type="number" onValueChange={(e) => handleEntriesChange(index,'kmot',Math.min(e,GetBrtemMotsarMlae(entry?.motsar?.categoryMotsar,entry?.motsar?.shem).kmot))} value={entry?.kmot || ''} label="כמות"/>
                                                    <Input color={entry?.errorMher && 'danger'} errorMessage={entry?.errorMher} size="sm" className="max-w-[150px] ml-2 mr-2" isDisabled={!entry?.category || !entry?.sogMotsar || !entry?.motsar || !entry?.kmot} type="number" onValueChange={(e) => handleEntriesChange(index,'mherLeheda',e)} value={entry?.mherLeheda || ''} label="מחיר מכירה ליחידה"/>
                                                    <Input isReadOnly size="sm" className="max-w-[100px] ml-2 mr-2" isDisabled={!entry?.category || !entry?.sogMotsar || !entry?.motsar || !entry?.kmot} type="number" value={(GetBrtemMotsarMlae(entry?.motsar?.categoryMotsar,entry?.motsar?.shem).alot * entry?.kmot) || ''} label="מחיר קנייה"/>
                                                    <div onClick={() => { removeItem(index);}} className='m-auto ml-5 text-danger-500 hover:cursor-pointer w-full max-w-[50px]' >
                                                        <div className="flex justify-center">
                                                            <FaTrash className='text-2xl' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider />
                                            </>
                                        ))}
                                        <div className="flex justify-around">
                                            <Button onClick={handleAddEntries} className='m-5'>
                                                <FiPlus />
                                            </Button>
                                        </div>
                                        <div className="mt-32"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="absolute bottom-0 z-20 border-t-2 m-auto w-full items-center bg-white">
                        <div className="flex justify-center w-full">
                            <Button className="ml-5 mr-5" size="lg" color="primary" onClick={ResetAll}>
                                סגור
                            </Button>
                            <Button isLoading={loading} isDisabled={!lkoh} className="ml-5 mr-5" size="lg" color="primary" onClick={async () => {
                                if (bdekatAeshorMkhera()) {
                                    return;
                                }
                                setLoading(true);
                                let sum = 0;
                                for (let index = 0; index < entries.length; index++) {
                                    sum += parseFloat((entries[index].kmot * entries[index].mherLeheda) - (entries[index].kmot * GetBrtemMotsarMlae(entries[index].remez, entries[index].motsar.shem).alot));
                                }
                                await updateDoc(doc(firestore, 'metadata', 'counterHkhnsotAhrot'), {
                                    count: counterHkhnsotAhrot?.munth === format(new Date(), 'MM-yyyy') ? (counterHkhnsotAhrot?.count + parseFloat(sum)) : parseFloat(sum),
                                    munth: format(new Date(), 'MM-yyyy'),
                                    countAll: counterHkhnsotAhrot?.countAll + parseFloat(sum),
                                    countMunths: counterHkhnsotAhrot.munth !== format(new Date(), 'MM-yyyy') ? (counterHkhnsotAhrot.countMunths + 1) : (1)
                                });
                                await updateDoc(doc(firestore, 'metadata', 'counterHeshvoneot'), {
                                    count: counterHeshvoneot.count + 1
                                });
                                handelPrintHeshvonit();
                                ResetAll();
                                setLoading(false);
                            }}>
                                אישור
                            </Button>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
