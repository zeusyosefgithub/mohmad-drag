'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { differenceInMinutes, format, parseISO, subMonths } from "date-fns";
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


    

    // useEffect(() => {
    //     if(GetData){
    //         const unsubscribe = useGetDataByConditionWithoutUseEffect(
    //             'shaotAboda',
    //             'hodesh',
    //             '==',
    //             format(previousMonthDate, 'MM-yyyy'),
    //             result => {
    //                 result.length && sumTimeDifferences(result);
    //             }
    //         );
    //         return () => {
    //             if (unsubscribe) {
    //                 unsubscribe();
    //             }
    //         };
    //     }
    // },[GetData]);
    // const GetTarefLeshaa = (val) => {
    //     for (let index = 0; index < aobdem.length; index++) {
    //         if(aobdem[index].msbar === val){
    //             return aobdem[index].tarefLshaa;
    //         }
    //     }
    //     return null;
    // };
    // const GetSkhomSofe = (result) => {
    //     let sum = 0;
    //     for (let index = 0; index < result.length; index++) {
    //         sum += (result[index].tarefLeshaaa * result[index].totalDifference)
    //     }
    //     return sum;
    // };

    // const sumTimeDifferences = async(arr) => {
    //     const groupedByAobed = arr.reduce((acc, obj) => {
    //         if (!acc[obj.aobed]) {
    //             acc[obj.aobed] = {
    //                 totalDifference: 0,
    //                 id: obj.id,
    //                 tarekh: obj.tarekh,
    //                 tarefLeshaaa : 0
    //             };
    //         }
    //         const difference = handleTimeDiffrence(obj.yetseah, obj.knesa);
    //         if (difference) {
    //             acc[obj.aobed].totalDifference += difference;
    //         }
    //         return acc;
    //     }, {});
    //     const result = Object.keys(groupedByAobed).map(aobed => ({
    //         aobed: parseInt(aobed),
    //         totalDifference: groupedByAobed[aobed].totalDifference,
    //         id: groupedByAobed[aobed].id,
    //         tarekh: groupedByAobed[aobed].tarekh,
    //         tarefLeshaaa : GetTarefLeshaa(parseInt(aobed))
    //     }));
    //     if(!result.length)return;
    //     await updateDoc(doc(firestore,'metadata','counterShaotAboda'),{
    //         hotsaotSkhar : parseFloat(GetSkhomSofe(result).toFixed(2))
    //     });
    // };


    const totsaotHodeshAobed = () => {
        setLoading(true);
        try{
            console.log(aobed);
            const unsubscribe = useGetDataByConditionWithoutUseEffectTwoQueres(
                'shaotAboda',
                'hodesh',
                '==',
                format(hodeshYdne, 'MM-yyyy'),
                'aobed',
                '==',
                parseInt(aobed),
                result => {
                    if(result.length){
                        setShaotAobedSave(result);
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
                                <Button  onClick={hdbsatDafeShaot} color="primary" variant="light" className="mr-3">חודש {format(previousMonthDate, 'MM')}</Button>
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
                        <Button size="lg" color="primary" onClick={disable}>
                            סגור
                        </Button>
                        <Button isLoading={loading} isDisabled={!hodeshYdne || !aobed} size="lg" color="primary" onClick={totsaotHodeshAobed}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}


