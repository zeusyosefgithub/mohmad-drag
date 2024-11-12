'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc, query, where, deleteDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { differenceInMinutes, format, parse, parseISO } from "date-fns";
import { useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";
import moment from "moment";
import { GrPowerReset } from "react-icons/gr";


export default function ModalKnesaKlalet({ disable, show, brtem,data,hodesh,aeshor }) {

    const [loading, setLoading] = useState(false);
    const [knesaHdsha, setKnesaHdsha] = useState(null);


    const [brtemBdeka,setBrtemBdeka] = useState({});
    const [brtemCurrent,setBrtemCurrent] = useState({});


    useEffect(() => {
        setBrtemBdeka(brtem);
        setBrtemCurrent(brtem);
    },[brtem]);

    const ResetAll = () => {
        disable();
    }

    const onValueChange = (key, value) => {
        setBrtemCurrent((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleTime2Change = (value, knesa) => {
        const newTime2 = value;
        if (moment(newTime2, 'HH:mm').isBefore(moment(knesa, 'HH:mm'))) {
            return '';
        } else {
            return newTime2;
        }
    };

    const isDisabeldAdcon = () => {
        if(brtemCurrent.knesa !== brtemBdeka.knesa ||
            brtemCurrent.yetseah !== brtemBdeka.yetseah ||
            brtemCurrent.headrot !== brtemBdeka.headrot
        ) {
            return false;
        }
        return true;
    }

    const getReplacedData = () => {
        return data
            .find(item => item.yom === brtemBdeka.yom)
            ?.knesot.map(knesa => (knesa.msbar === brtemCurrent.msbar ? brtemCurrent : knesa)) || [];
    };

    const AdconKnesa = async () => {
        setLoading(true);
        const updatedData = data.map(item =>
            item.yom === brtemBdeka.yom
                ? { ...item, knesot: getReplacedData() }
                : item
        );
        await updateDoc(
            doc(
                firestore,
                'shaotAbodaa',
                format(parse(hodesh, 'yyyy-MM', new Date()), 'MM-yyyy')
            ),
            { knesot: updatedData }
        );
        setLoading(false);
        disable();
        aeshor(true,brtemCurrent.shem,brtemCurrent.yom);
    }



    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center text-base border-b-2 bg-white">עדכון שעות {brtemCurrent?.shem} לתאריך {brtem?.yom}</ModalHeader>
                    <ModalBody className="shadow-2xl bg-white">
                        <div>
                            <div>
                                <div className="">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-20">
                                                <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">היעדרות</th>
                                                <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">יצאה</th>
                                                <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">כניסה</th>
                                                <th className="px-4 py-2 text-center text-[14px] font-extrabold text-black">שם עובד</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><Dropdown dir="rtl">
                                                    <DropdownTrigger>
                                                        <Button color={brtemCurrent?.headrot ? 'success' : "danger"} variant='flat' size="sm" className='m-2'>
                                                            {brtemCurrent?.headrot || 'בחר פריט'}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        aria-label="Multiple selection example"
                                                        variant="flat"
                                                        closeOnSelect={true}
                                                        disallowEmptySelection
                                                        selectionMode="single"
                                                        onSelectionChange={(val) => onValueChange('headrot', val.currentKey)}
                                                    >
                                                        <DropdownItem key={'חופשה'}>{'חופשה'}</DropdownItem>
                                                        <DropdownItem key={'מחלה'}>{'מחלה'}</DropdownItem>
                                                        <DropdownItem key={'נוכח'}>{'נוכח'}</DropdownItem>
                                                        <DropdownItem key={'חופשה ללא תשלום'}>{'חופשה ללא תשלום'}</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown></td>
                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center items-center"><Input value={brtemCurrent?.yetseah} onValueChange={(val) => onValueChange('yetseah', handleTime2Change(val, brtemCurrent?.knesa))} type="time" size="xs" color={brtemCurrent?.yetseah ? 'success' : "danger"} className="max-w-[100px]" />{brtemCurrent?.yetseah ? <GrPowerReset onClick={() => onValueChange('yetseah', '')} className="text-[25px] w-[25px] cursor-pointer hover:text-primary ml-1 bg-gray-100 p-1 rounded-full" /> : <div className="w-[30px]"></div>}</div></td>
                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center items-center"><Input value={brtemCurrent?.knesa} onValueChange={(val) => onValueChange('knesa', val)} type="time" size="xs" color={brtemCurrent?.knesa ? 'success' : "danger"} className="max-w-[100px]" />{brtemCurrent?.knesa ? <GrPowerReset onClick={() => onValueChange('knesa', '')} className="text-[25px] w-[25px] cursor-pointer hover:text-primary ml-1 bg-gray-100 p-1 rounded-full" /> : <div className="w-[30px]"></div>}</div></td>
                                                <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300">{brtemCurrent?.shem}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t-2 bg-white">
                        <div className="w-full flex items-center justify-between">
                            <div>
                            </div>
                            <div>
                                <Button variant="flat" color="warning" onClick={ResetAll}>סגור</Button>
                                <Button isDisabled={isDisabeldAdcon()} isLoading={loading} variant="flat" color="primary" className="mr-2 ml-2" onClick={AdconKnesa}>שמירה</Button>
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

