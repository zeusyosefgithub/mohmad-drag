'use client';

import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Heshvonet } from "../Page Components/Heshvonet";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
import GetDocs from "../FireBase/getDocs";
import { format } from "date-fns";
import { FaArrowUp, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export default function ModalMkhera({ show, disable }) {

    const componentRefOne = useRef();
    const lkhot = GetDocs('customers');
    const category = GetDocs('category');
    const mlae = GetDocs('mlae');
    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `
        @page {
                size: A4;
                margin: 0;
            }
        `,
        content: () => componentRefOne.current,
    });
    // @page {
    //     size: 80mm 200mm;
    //     margin: 0mm;
    // 
    // body {
    //     margin: 0mm; 
    // }
    const counter = GetDocs('metadata').find((count) => count.id === 'counterMkherot');
    const currentDate = format(new Date(), 'dd-MM-yyyy');


    const [lkoh, setLkoh] = useState();
    const [msbarLkoh, setMsbarLkoh] = useState();
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

    const containerRef = useRef(null);
    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);

    const [entries, setEntries] = useState([{ category: '',motsar : '', sogMotsar: '',mherLeheda : 0, remez: '',kmot : 0, message: '' }]);
    const scrollToBottomRef = () => {
        const scrollableContainer = containerRef.current;
        const targetElement = endOfFormRef.current;
        if (scrollableContainer && targetElement) {
            const topPos = targetElement.offsetTop;
            scrollableContainer.scrollTo({
                top: topPos,
                behavior: "smooth"
            });
        }
    };
    const scrollToRef = () => {
        const scrollableContainer = containerRef.current;
        const topElement = topOfFormRef.current;

        if (scrollableContainer && topElement) {
            scrollableContainer.scrollTo({
                top: topElement.offsetTop,
                behavior: "smooth"
            });
        }
    };
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
        setEntries([...entries, { category: '',motsar : '', sogMotsar: '',mherLeheda : 0, remez: '',kmot : 0}]);
        setTimeout(() => {
            scrollToBottomRef();
        }, 100);
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

    const [hn7a,setHn7a] = useState(0);

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalBody className="shadow-2xl">
                        <div className="w-full h-full flex p-32 justify-center">
                            <div className="w-full max-w-[700px]">
                                <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                    תמחיר
                                </div>
                                <Heshvonet isNew ref={componentRefOne} lkoh={lkoh} entries={entries || null} hn7a={hn7a} new={{
                                    date: currentDate,
                                    counter: counter
                                }} />
                            </div>
                            <Divider className="w-[2px] h-full ml-5 mr-5" />
                            <div className="w-full max-w-[700px] flex flex-col">
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
                                    <div dir="ltr" ref={containerRef} className="overflow-auto h-[600px]">
                                        <div ref={topOfFormRef} />
                                        {entries?.map((entry, index) => (
                                            <>
                                                <div dir='rtl' key={index} className="w-full flex items-center mt-3 mb-3 justify-around">
                                                    <div className='mr-2'>{index + 1}</div>
                                                    <Dropdown dir="rtl">
                                                        <DropdownTrigger>
                                                            <Button
                                                                size="lg"
                                                                className='m-2 max-w-[100px] w-full'
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
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    <Dropdown dir="rtl">
                                                        <DropdownTrigger>
                                                            <Button
                                                                size="lg"
                                                                className='m-2 max-w-[100px] w-full'
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
                                                                size="lg"
                                                                className='m-2 max-w-[100px] w-full'
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
                                                    <Input isDisabled={!entry?.category || !entry?.sogMotsar || !entry?.motsar} type="number" onValueChange={(e) => handleEntriesChange(index,'kmot',Math.min(e,GetBrtemMotsarMlae(entry?.motsar?.categoryMotsar,entry?.motsar?.shem).kmot))} value={entry?.kmot} label="כמות" labelPlacement="outside-left"/>
                                                    <Input isDisabled={!entry?.category || !entry?.sogMotsar || !entry?.motsar || !entry?.kmot} type="number" onValueChange={(e) => handleEntriesChange(index,'mherLeheda',e)} value={entry?.mherLeheda} label="מחיר ליחידה" labelPlacement="outside-left"/>
                                                    <div onClick={() => { removeItem(index);}} className='ml-5 text-danger-500 hover:cursor-pointer w-full max-w-[50px]' >
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
                                            {
                                                entries.length > 0 &&
                                                <Button color="primary" onClick={handelPrintHeshvonit} className='m-5'>
                                                    אישור
                                                </Button>
                                            }
                                            {
                                                entries?.length > 1 &&
                                                <Button onClick={scrollToRef} className='m-5'>
                                                    <FaArrowUp />
                                                </Button>
                                            }
                                        </div>
                                        <div ref={endOfFormRef} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="absolute bottom-0 z-20 border-t-2 m-auto w-full items-center bg-white">
                        <div className="flex justify-center w-full">
                            <Button className="ml-5 mr-5" size="lg" color="primary" onClick={disable}>
                                סגור
                            </Button>
                            <Button className="ml-5 mr-5" size="lg" color="primary" onClick={disable}>
                                אישור
                            </Button>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
