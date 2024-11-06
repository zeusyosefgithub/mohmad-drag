'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { differenceInMinutes, format, getDaysInMonth, parse, parseISO, subMonths } from "date-fns";
import { useGetDataByConditionWithoutUseEffect, useGetDataByConditionWithoutUseEffectTwoQueres } from "../FireBase/getDataByCondition";
import { useReactToPrint } from "react-to-print";
import { ShaotAobedHdbsa } from "../Page Components/ShaotAobedHdbsa";


export default function ModalDafeShaot({ disable, show,counter,aobdem }) {

    const previousMonthDate = subMonths(new Date(), 1);
    const [hodeshYdne,setHodeshYdne] = useState('');
    const [loading,setLoading] = useState(false);
    const [shaotAobedSave,setShaotAobedSave] = useState([]);
    const [shaotAobedSaveAll,setShaotAobedSaveAll] = useState([]);
    const [aobed,setAobed] = useState('');
    const componentRef = useRef();
    const [brtemAobed,setBrtemAobed] = useState(null);
    const componentRefAll = useRef();


    const bdekatAemAobedKeam = () => {

    }


    const hdbsatDafeShaot = async() => {
        setLoading(true);
        await updateDoc(doc(firestore,'metadata',counter?.id),{
            hdbsatDafeShaot : format(new Date,'MM-yyyy')
        });
        try{
            console.log(aobed);
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'shaotAboda',
                'hodesh',
                '==',
                format(new Date(), 'MM-yyyy'),
                result => {
                    if(result.length){
                        console.log(result);
                        let newRes = [];
                        for (let index = 0; index < result.length; index++) {
                            if(bdekatAemAobedKeam()){

                            }
                        }
                        setShaotAobedSaveAll(result);
                    }
                    setLoading(false);
                }
            );
        }
        catch(e){
            console.log(e);
            setLoading(false);
        }
    }

    const GetYmem = (hodesh) => {
        let newArray = [];
        let AadHkhshav = parseInt(getDaysInMonth(parse(hodesh,'MM-yyyy',new Date())));
        for (let index = 0; index < AadHkhshav; index++) {
            newArray.push(`${index < 9 ? ('0' + (index + 1)) : index + 1}-${hodesh}`);
        }
        return newArray;
    }

    const totsaotHodeshAobed = () => {
        setLoading(true);
        try {
            const formattedDate = hodeshYdne ? format(hodeshYdne, 'MM-yyyy') : null;
            if (!formattedDate) {
                console.warn("Invalid date for hodeshYdne");
                setLoading(false);
                return;
            }
            const unsubscribe = useGetDataByConditionWithoutUseEffectTwoQueres(
                'shaotAboda',
                'hodesh',
                '==',
                formattedDate,
                'aobed',
                '==',
                parseInt(aobed),
                result => {
                    if (result.length && result[0]?.hodesh) {
                        let Ymem = GetYmem(result[0]?.hodesh);
                        let sortedArray = (result || []).sort((a, b) => {
                            const dateA = parse(a.tarekh || '', 'dd-MM-yyyy', new Date());
                            const dateB = parse(b.tarekh || '', 'dd-MM-yyyy', new Date());
                            return dateA - dateB;
                        });
                        let workingDates = sortedArray.map(item => item.tarekh).filter(Boolean);
                        let missingDates = Ymem.filter(date => !workingDates.includes(date));
                        missingDates.forEach((miss,index) => (
                            sortedArray.push({
                                tarekh : miss,
                                headrot : 'חופשה'
                            })
                        ));
                        sortedArray.sort((a, b) => {
                            const dateA = parse(a.tarekh, 'dd-MM-yyyy', new Date());
                            const dateB = parse(b.tarekh, 'dd-MM-yyyy', new Date());
                            return dateA - dateB;
                        });
                        setShaotAobedSave(sortedArray);
                    }
                    setLoading(false);
                }
            );
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (shaotAobedSave.length) {
            hdbsatShaotAobed();
        }
    }, [shaotAobedSave]);

    
    const hdbsatShaotAobed = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRef.current,
    });
    const hdbsatShaotAobedAll = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefAll.current,
    });

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">דפי שעות</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <div className="hidden">
                                <ShaotAobedHdbsa ref={componentRef} aobed={brtemAobed} shaot={shaotAobedSave}/>
                            </div>
                            <div className="m-5 flex items-center">
                                <div>הדפסת דפי שעות</div>
                                <Button isDisabled  onClick={hdbsatDafeShaot} color="primary" variant="light" className="mr-3">חודש {format(previousMonthDate, 'MM')}</Button>
                            </div>
                            <Divider />
                            <div className="m-5 flex items-center">
                                <div>הדפסת דפי שעות ידני</div>
                                <Autocomplete
                                    label="בחר עובד"
                                    className="max-w-[150px] mr-3 ml-3"
                                    size="sm"
                                    color="primary"
                                    defaultItems={aobdem}
                                    onSelectionChange={(val) => {setAobed(val);setBrtemAobed(null);}}
                                >
                                    {
                                        aobdem.map((aobed, index) => (
                                            <AutocompleteItem onClick={() => setBrtemAobed(aobed)} className="text-end" key={aobed?.msbar}>
                                                {aobed?.shem}
                                            </AutocompleteItem>
                                        ))
                                    }
                                </Autocomplete>
                                <Input type="month" value={hodeshYdne} onValueChange={(val) => setHodeshYdne(val)} className="max-w-[120px]" size="sm" label="חודש" isDisabled={!aobed}/>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" variant="flat" onClick={disable}>
                            סגור
                        </Button>
                        <Button isLoading={loading} isDisabled={!hodeshYdne || !aobed} color="primary" variant="flat" onClick={totsaotHodeshAobed}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}


