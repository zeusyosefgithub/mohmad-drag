import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Checkbox, CheckboxGroup, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { firestore } from "../FireBase/firebase";
import GetDocs from "../FireBase/getDocs";
import { format } from "date-fns";
import { BiPlus } from "react-icons/bi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";


export default function ModalSheldot({ show, disable }) {

    const [typeShow, setTypeShow] = useState('list');

    const [shemReshema, setShemReshema] = useState('');
    const [shemReshemaError, setShemReshemaError] = useState('');
    const [loading, setLoading] = useState(false);
    const reshemot = GetDocs('sheldot');
    const metadata = GetDocs('metadata');
    const counterSheldot = metadata.find((count) => count.id === 'counterSheldot');

    const checkIfShemKeam = () => {
        for (let index = 0; index < reshemot.length; index++) {
            if (reshemot[index].shem === shemReshema) {
                return true;
            }
        }
        return false;
    }

    const addReshema = async () => {
        setShemReshemaError('');
        if (checkIfShemKeam() && reshemot.length) {
            setShemReshemaError('השם שהוזן קיים!');
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(firestore, 'sheldot'), {
                msbar: counterSheldot?.count,
                tarekhYetsra: format(new Date(), 'dd-MM-yyyy'),
                shem: shemReshema,
                motsarem: []
            });
            await updateDoc(doc(firestore, 'metadata', 'counterSheldot'), { count: counterSheldot.count + 1 })
        }
        catch (e) {
            console.log(e);
        }
        setShemReshema('');
        setTypeShow('list');
        setLoading(false);
    }

    const scrollContainerRef = useRef(null);

    const [msbarShelda, setMsbarShelda] = useState('');
    const [shnaa, setShnaa] = useState(0);
    const [degem, setDegem] = useState('');
    const [counterShelda,setCounterShelda] = useState(1);
    const [msbarSheldaError, setMsbarSheldaError] = useState(0);
    const [degemError, setDegemError] = useState('');
    const [loadingMotsar, setLoadingMotsar] = useState(false);
    const [isOpenPov, setIsOpenPov] = useState([]);

    const handleMouseDown = (e) => {
        const container = scrollContainerRef.current;
        container.isDragging = true;
        container.startX = e.pageX - container.offsetLeft;
        container.scrollLeftStart = container.scrollLeft;
    };

    const handleMouseMove = (e) => {
        const container = scrollContainerRef.current;
        if (!container.isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = x - container.startX;
        container.scrollLeft = container.scrollLeftStart - walk;
    };

    const handleMouseUp = () => {
        const container = scrollContainerRef.current;
        container.isDragging = false;
    };

    
    // const checkAemMotsarKeam = (array) => {
    //     for (let index = 0; index < array.length; index++) {
    //         if(array[index].msbarSheldaError === msbarSheldaError){
    //             return {res : true,num : 1,message : 'מספר שלדה כבר קיים!'}
    //         }
    //         if(array[index].degem === degem){
    //             return {res : true,num : 2,message : 'שם דגם כבר קיים!'}
    //         }
    //     }
    //     return {res : false}
    // }

    const addMotsar = async (val) => {
        // setMsbarSheldaError('');
        // setDegemError('');
        // if (checkAemMotsarKeam(val?.motsarem).res) {
        //     if(checkAemMotsarKeam(val?.motsarem).num === 1){
        //         setMsbarSheldaError(checkAemMotsarKeam(val?.motsarem).message);
        //         return;
        //     }
        //     if(checkAemMotsarKeam(val?.motsarem).num === 2){
        //         setDegemError(checkAemMotsarKeam(val?.motsarem).message);
        //         return;
        //     }
        // }
        setLoadingMotsar(true);
        try{
            await updateDoc(doc(firestore,'sheldot',val.id),{
                motsarem : [...val.motsarem,{
                    msbarShelda,
                    shnaa,
                    degem
                }],
                counter : val.counter + counterShelda
            })
        }
        catch(e){
            console.log(e);
        }
        setMsbarShelda('');
        setShnaa(0);
        setDegem('');
        setIsOpenPov(false);
        setLoadingMotsar(false);
    }

    const handlePopoverChange = (index, open) => {
        setIsOpenPov((prev) => {
            const newState = Array.isArray(prev) ? [...prev] : [];
            newState[index] = open;
            return newState;
        });
    };

    useEffect(() => {
        setIsOpenPov(Array(reshemot?.length || 0).fill(false));
    }, [reshemot]);

    const GetCounterShelda = (remez, val) => {
        if (val < 1000) {
            return `${remez}${String(val).padStart(3, '0')}`;
        }
        return ''; // Handle values >= 1000
    };


    //

    return (
        <Modal placement="center" className="test-fontt select-none" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent className="h-screen">
                <ModalHeader className="flex justify-center border-b-2">
                    שלדות
                </ModalHeader>
                <ModalBody className="h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        {typeShow === 'list' && (
                            <motion.div
                                key="list"
                                dir="rtl"
                                className="w-full h-full"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-full h-full flex overflow-x-auto cursor-grab pt-5 pb-5"
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseUp}
                                    onMouseUp={handleMouseUp}
                                    ref={scrollContainerRef}
                                >
                                    {
                                        reshemot?.map((resh, index) => (
                                            <Card className="min-w-[300px] mr-4 ml-4 h-full">
                                                <CardBody className="h-full w-full flex flex-col">
                                                    <div className="flex items-center border-b-1 p-2">
                                                        <div className="w-full text-right">{resh?.shem}</div>
                                                        <div>
                                                            <Popover isOpen={isOpenPov[index] || false} onOpenChange={(open) => handlePopoverChange(index, open)} placement='bottom-end'>
                                                                <PopoverTrigger>
                                                                    <Button size="sm" onClick={() => { setDegem(resh?.shem); setMsbarShelda(GetCounterShelda(resh?.remez, resh?.counter + 1)); setCounterShelda(1);setShnaa(parseInt(format(new Date(), 'yyyy'))); }}><BiPlus className="text-xl" /></Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <div dir="rtl" className="px-1 py-2">
                                                                        <div className="text-small font-bold">שלדה חדשה</div>
                                                                        <div className="mt-3">
                                                                            <Input errorMessage={msbarSheldaError} size="sm" type="text" value={msbarShelda || ''} onValueChange={(val) => setMsbarShelda(val)} className='mt-3' color={msbarShelda ? 'primary' : 'default'} label={`מס' שלדה`} />
                                                                            <Input size="sm" type="number" value={shnaa || ''} onValueChange={(val) => { if (!/^\d*$/.test(val) || val.length > 4) return; setShnaa(val); }} onBlur={() => { if (shnaa) { const clampedValue = Math.max(1900, Math.min(2100, Number(shnaa))); setShnaa(clampedValue); } }} className='mt-3' color={shnaa ? 'primary' : 'default'} label='שנה' />
                                                                            <Input errorMessage={degemError} size="sm" type="text" value={degem} onValueChange={(val) => setDegem(val)} className='mt-3' color={degem ? 'primary' : 'default'} label='דגם' />
                                                                            <Input min="1" max="999" size="sm" type="number" value={counterShelda || ''} onValueChange={(val) => {
                                                                                let parsedValue = parseInt(val, 10);

                                                                                // Validate and constrain the value to the range [1, 999]
                                                                                if (isNaN(parsedValue) || parsedValue < 1) {
                                                                                    parsedValue = 1; // Ensure the minimum value is 1
                                                                                } else if (parsedValue > 999) {
                                                                                    parsedValue = 999; // Ensure the maximum value is 999
                                                                                }

                                                                                setCounterShelda(parsedValue);

                                                                                // Calculate the new msbarShelda
                                                                                const updatedCounter = parseInt(resh?.counter || 0, 10) + parsedValue;
                                                                                setMsbarShelda(GetCounterShelda(resh?.remez, updatedCounter));
                                                                            }} className='mt-3' color={counterShelda ? 'primary' : 'default'} label='מספר עגלות' />
                                                                        </div>
                                                                        <div className="mt-5">
                                                                            <Button onClick={() => addMotsar(resh)} isLoading={loadingMotsar} isDisabled={!msbarShelda || !shnaa || !degem} size="sm" color="primary" variant="flat">
                                                                                הוספה
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 w-full h-full flex flex-col overflow-auto">
                                                        {
                                                            resh?.motsarem?.map((mot, index) => (
                                                                <Card className="w-full min-h-[175px] mt-3">
                                                                    <CardBody className="text-right h-full flex flex-col overflow-hidden">
                                                                        <div className=" absolute left-1 top-1">
                                                                            <IoIosRemoveCircleOutline className="text-xl text-danger cursor-pointer"/>
                                                                        </div>
                                                                        <div className=" absolute left-7 top-1">
                                                                            <FaEdit className="text-lg text-primary cursor-pointer"/>
                                                                        </div>
                                                                        <div>
                                                                            מס' שלדה
                                                                        </div>
                                                                        <div className="font-bold">
                                                                            {mot.msbarShelda}
                                                                        </div>
                                                                        <div className="border-1 w-full"></div>
                                                                        <div>
                                                                            שנה
                                                                        </div>
                                                                        <div className="font-bold">
                                                                            {mot.shnaa}
                                                                        </div>
                                                                        <div className="border-1 w-full"></div>
                                                                        <div>
                                                                            דגם
                                                                        </div>
                                                                        <div className="font-bold">
                                                                            {mot.degem}
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            ))
                                                        }
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        ))
                                    }
                                </div>
                            </motion.div>
                        )}
                        {typeShow === 'add' && (
                            <motion.div
                                key="add"
                                dir="rtl"
                                className="w-full h-full"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-full h-full flex justify-center items-center">
                                    <div>
                                        <Input value={shemReshema} errorMessage={shemReshemaError} onValueChange={(val) => { setShemReshema(val); setShemReshemaError(''); }} color={shemReshema ? 'primary' : 'default'} className="max-w-[200px]" size="sm" label='שם הרשימה' />
                                        <Button isLoading={loading} size="sm" color="primary" variant="flat" isDisabled={!shemReshema} className="mt-10" onClick={addReshema}>הוספה</Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ModalBody>
                <ModalFooter className="border-t-2">
                    <div>
                        <Button className="mr-2 ml-2" color="warning" variant="flat" size="sm" onClick={disable}>
                            סגור
                        </Button>
                        {
                            typeShow === 'list' &&
                            <Button color='primary' variant="flat" size="sm" onClick={() => setTypeShow('add')}>
                                רשימה חדשה
                            </Button>
                        }
                        {
                            typeShow === 'add' &&
                            <Button color='primary' variant="flat" size="sm" onClick={() => setTypeShow('list')}>
                                רשימות קיימים
                            </Button>
                        }
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}