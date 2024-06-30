'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc, query, where } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import moment from 'moment';
import { HiOutlineCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { format } from "date-fns";
import { useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";


export default function ModalLohShaotAobdem({ disable, show }) {



    const [loh, setLoh] = useState('לוח היום');
    const aobdem = GetDocs('aobdem');
    const [aobed, setAobed] = useState('');
    const [knesa, setKnesa] = useState('');
    const [yetseah, setYetseah] = useState('');
    const [knesotHeom, setKnesotHeom] = useState(null);
    const [knesotKlale, setKnesotKlale] = useState(null);
    const currentDate = format(new Date(), 'dd-MM-yyyy');

    console.log(knesotKlale);
    useEffect(() => {
        const unsubscribe = useGetDataByConditionWithoutUseEffect('shaotAboda', 'tarekh', '==', currentDate, (result) => {
            setKnesotHeom(result);
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [currentDate]);


    useEffect(() => {
        const unsubscribe = useGetDataByLimit('shaotAboda',20, (result) => {
            setKnesotKlale(result);
        });
    }, []);

    const handleTime2Change = (value) => {
        const newTime2 = value;
        if (moment(newTime2, 'HH:mm').isBefore(moment(knesa, 'HH:mm'))) {
            setYetseah('');
        } else {
            setYetseah(newTime2);
        }
    };


    const counter = GetDocs('metadata').find((count) => count.id === 'counterShaotAboda');

    const hosfatKnesa = async () => {
        await addDoc(collection(firestore, 'shaotAboda'), {
            msbar: counter?.count,
            tarekh: format(new Date(), 'dd-MM-yyyy'),
            knesa: knesa,
            yetseah: yetseah,
            aobed: parseInt(aobed)
        })
        await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        setAobed(null);
        setKnesa('');
        setYetseah('');
        setLoh('לוח היום');
        disable();
    }


    function GetAobedBratem(val){
        for (let index = 0; index < aobdem.length; index++) {
            if(aobdem[index].msbar === val){
                return aobdem[index];
            } 
        }
    }

    function BdekatKnesatAobed(val) {
        for (let index = 0; index < knesotHeom?.length; index++) {
            if (val === knesotHeom[index].aobed) {
                return 'bg-success';
            }
        }
        return 'bg-danger';
    }

    console.log(format('2024-07-06', 'EEEE'));

    function flipDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        const flippedDateStr = `${year}-${month}-${day}`;
        return flippedDateStr;
      }

    function GetTarekhShem (val){
        if(val === 'Sunday'){
            return 'ראשון';
        }
        else if(val === 'Monday'){
            return 'שני';
        }
        else if(val === 'Tuesday'){
            return 'שלשי';
        }
        else if(val === 'Wednesday'){
            return 'רבעי';
        }
        else if(val === 'Thursday'){
            return 'חמשי';
        }
        else if(val === 'Friday'){
            return 'שישי';
        }
        else if(val === 'Saturday'){
            return 'שבת';
        }
    }

    // Output:       

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">לוח שעות עובדים</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div>
                            <div className="flex justify-around items-center m-5">
                                <Button className={loh === 'לוח כללי' && 'font-extrabold text-base'} color={loh === 'לוח כללי' ? 'primary' : 'default'} onClick={() => setLoh('לוח כללי')}>לוח כללי</Button>
                                <Button className={loh === 'לוח היום' && 'font-extrabold text-base'} color={loh === 'לוח היום' ? 'primary' : 'default'} onClick={() => setLoh('לוח היום')}>לוח היום</Button>
                            </div>
                            <Divider />
                            <div className="mt-5 mb-5">
                                {
                                    loh === 'לוח היום' &&
                                    <div>
                                        <div className="text-right">
                                            <Button onClick={() => {
                                                setAobed(null);
                                                setKnesa('');
                                                setYetseah('');
                                            }} isDisabled={(!aobed || !knesa || !yetseah) ? true : false}>ניקוי</Button>
                                        </div>
                                        <div dir="rtl" className="flex items-end">
                                            <Autocomplete
                                                label="בחר לקוח"
                                                className="max-w-[200px] mt-5"
                                                size="sm"
                                                color="primary"
                                                defaultItems={aobdem}
                                                onSelectionChange={(val) => setAobed(val)}
                                            >
                                                {(item) => (BdekatKnesatAobed(item?.msbar) === 'bg-danger') && <AutocompleteItem
                                                className="text-right"
                                                key={item.msbar}>{item.shem}
                                                </AutocompleteItem>}
                                                {/* {
                                                    aobdem.map((aobed, index) => (
                                                        <AutocompleteItem value={aobed?.msbar}>
                                                            {aobed?.shem}
                                                        </AutocompleteItem>
                                                    ))
                                                } */}
                                            </Autocomplete>
                                            <div className="w-full flex justify-around items-center">
                                                <Input value={knesa} onValueChange={setKnesa} type="time" size="lg" color="danger" className="max-w-[80px]" label={<div className="ml-2 text-lg">כניסה</div>} labelPlacement="outside-left" />
                                                <Input isReadOnly={!knesa} value={yetseah} onValueChange={(val) => handleTime2Change(val)} type="time" size="lg" color="danger" className="max-w-[80px]" label={<div className="ml-2 text-lg">יצאה</div>} labelPlacement="outside-left" />
                                                <Input isReadOnly size="lg" value={(knesa && yetseah) ? `${String(moment.duration(moment(yetseah, 'HH:mm').diff(moment(knesa, 'HH:mm'))).hours()).padStart(2, '0')}:${String(moment.duration(moment(yetseah, 'HH:mm').diff(moment(knesa, 'HH:mm'))).minutes()).padStart(2, '0')}` : ""} color="success" className="max-w-[170px]" label={<div className="ml-2 text-base w-max">{`סה"כ שעות`}</div>} labelPlacement="outside-left" />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    loh === 'לוח כללי' &&
                                    <div>
                                        <div className="overflow-x-auto h-[400px]">
                                            <table className="w-full table-auto border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תאריך</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">תאריך</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">יצאה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">כניסה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם עובד</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        knesotKlale.map((knesa, index) => {
                                                            return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{GetTarekhShem(format(flipDate(knesa?.tarekh),'EEEE'))}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{knesa?.tarekh}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{knesa?.yetseah}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{knesa?.knesa}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{GetAobedBratem(knesa?.aobed)?.shem}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                            setAobed(null);
                            setKnesa('');
                            setYetseah('');
                            setLoh('לוח היום');
                            disable();
                        }}>
                            סגור
                        </Button>
                        {
                            loh === 'לוח היום' && aobed && knesa && yetseah &&
                            <Button size="lg" color="primary" onClick={hosfatKnesa}>
                                אישור
                            </Button>
                        }
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

