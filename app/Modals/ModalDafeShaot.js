'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { differenceInMinutes, format, parseISO, subMonths } from "date-fns";
import { useGetDataByConditionWithoutUseEffect } from "../FireBase/getDataByCondition";


export default function ModalDafeShaot({ disable, show,counter,aobdem }) {

    const previousMonthDate = subMonths(new Date(), 1);
    const [GetData,setGetData] = useState(false);
    const [heshovShaotAboda,setHeshovShaotAboda] = useState([]);


    const hdbsatDafeShaot = async() => {
        await updateDoc(doc(firestore,'metadata',counter?.id),{
            hdbsatDafeShaot : format(new Date,'MM-yyyy')
        });
        //setGetData(true);
    }


    

    useEffect(() => {
        if(GetData){
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'shaotAboda',
                'hodesh',
                '==',
                format(previousMonthDate, 'MM-yyyy'),
                result => {
                    result.length && sumTimeDifferences(result);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    },[GetData]);

    const GetTarefLeshaa = (val) => {
        for (let index = 0; index < aobdem.length; index++) {
            if(aobdem[index].msbar === val){
                return aobdem[index].tarefLshaa;
            }
        }
        return null;
    }

    const GetSkhomSofe = (result) => {
        let sum = 0;
        for (let index = 0; index < result.length; index++) {
            sum += (result[index].tarefLeshaaa * result[index].totalDifference)
        }
        return sum;
    }

    const handleTimeDiffrence = (yetseah, knesa) => {
        if (yetseah && knesa) {
            const start = parseISO(`1970-01-01T${knesa}:00`);
            const end = parseISO(`1970-01-01T${yetseah}:00`);
            const totalMinutes = differenceInMinutes(end, start);
            
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            
            return parseInt(formattedHours) + parseFloat((formattedMinutes / 60).toFixed(2));
        }
        return null;
    };

    const sumTimeDifferences = async(arr) => {
        const groupedByAobed = arr.reduce((acc, obj) => {
            if (!acc[obj.aobed]) {
                acc[obj.aobed] = {
                    totalDifference: 0,
                    id: obj.id,
                    tarekh: obj.tarekh,
                    tarefLeshaaa : 0
                };
            }
            const difference = handleTimeDiffrence(obj.yetseah, obj.knesa);
            if (difference) {
                acc[obj.aobed].totalDifference += difference;
            }
            return acc;
        }, {});
        const result = Object.keys(groupedByAobed).map(aobed => ({
            aobed: parseInt(aobed),
            totalDifference: groupedByAobed[aobed].totalDifference,
            id: groupedByAobed[aobed].id,
            tarekh: groupedByAobed[aobed].tarekh,
            tarefLeshaaa : GetTarefLeshaa(parseInt(aobed))
        }));
        if(!result.length)return;
        await updateDoc(doc(firestore,'metadata','counterShaotAboda'),{
            hotsaotSkhar : parseFloat(GetSkhomSofe(result).toFixed(2))
        });
    };





    const [aobed,setAobed] = useState('');

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">דפי שעות</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <div className="m-5 flex items-center">
                                <div>הדפסת דפי שעות</div>
                                <Button isDisabled={counter?.hdbsatDafeShaot === format(new Date(), 'MM-yyyy')} onClick={hdbsatDafeShaot} color="primary" variant="light" className="mr-3">חודש {format(previousMonthDate, 'MM')}</Button>
                            </div>
                            <Divider />
                            <div className="m-5 flex items-center">
                                <div>הדפסת דפי שעות ידני</div>
                                <Autocomplete
                                    label="בחר עובד"
                                    className="max-w-[150px] mr-3"
                                    size="sm"
                                    color="primary"
                                    defaultItems={aobdem}
                                    onSelectionChange={setAobed}
                                >
                                    {
                                        aobdem.map((aobed, index) => (
                                            <AutocompleteItem className="text-end" value={aobed?.msbar}>
                                                {aobed?.shem}
                                            </AutocompleteItem>
                                        ))
                                    }
                                </Autocomplete>
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button color={aobed.headrot ? 'success' : "danger"} variant='flat' size="sm" className='m-2'>
                                            {aobed.headrot || 'בחר פריט'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                    >
                                        <DropdownItem key={'חופשה'}>{'חופשה'}</DropdownItem>
                                        <DropdownItem key={'מחלה'}>{'מחלה'}</DropdownItem>
                                        <DropdownItem key={'נוכח'}>{'נוכח'}</DropdownItem>
                                        <DropdownItem key={'חופשה ללא תשלום'}>{'חופשה ללא תשלום'}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Button isDisabled={counter?.hdbsatDafeShaot === format(new Date(), 'MM-yyyy')} onClick={hdbsatDafeShaot} color="primary" variant="light" className="mr-3">חודש {format(previousMonthDate, 'MM')}</Button>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={disable}>
                            סגור
                        </Button>
                        <Button size="lg" color="primary" onClick={disable}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}


