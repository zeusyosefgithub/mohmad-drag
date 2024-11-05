'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc, query, where, deleteDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";
import moment from "moment";


export default function ModalKnesaKlalet({ disable, show, type, aobed, knesa, yom, hodesh, counter,deletedKnesa }) {

    const [loading, setLoading] = useState(false);
    const [knesaHdsha, setKnesaHdsha] = useState(null);

    const ResetAll = () => {
        const knesaH = {
            id: '',
            msbar: aobed?.msbar,
            shem: aobed?.shem,
            tfked: aobed?.tfked,
            yetseah: '',
            tarekh: format(new Date(), 'dd-MM-yyyy'),
            knesa: '',
            headrot: ''
        }
        setKnesaHdsha(knesa || knesaH);
        disable();
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

    const HosafatKnesa = async () => {
        setLoading(true);
        await addDoc(collection(firestore, 'shaotAboda'), {
            msbar: counter?.count,
            tarekh: yom,
            knesa: knesaHdsha.knesa,
            yetseah: knesaHdsha.yetseah,
            aobed: aobed.msbar,
            headrot: knesaHdsha.headrot,
            hodesh: hodesh
        });
        let count2 = handleTimeDiffrence(knesaHdsha.yetseah, knesaHdsha.knesa);
        let count3 = knesaHdsha?.tfked === 'A' ? (handleTimeDiffrence(knesaHdsha.yetseah, knesaHdsha.knesa)) : 0;
        await updateDoc(doc(firestore, 'metadata', 'counterShaotAboda'), {
            count: counter?.count + 1,
            countShaotAbodaKodemet: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAboda : counter?.countShaotAbodaKodemet,
            countShaotAboda: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAboda + count2) : count2,
            countShaotAbodaMunth: format(new Date(), 'MM-yyyy'),
            countShaotAbodaYetsor: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAbodaYetsor + count3) : count3,
            countShaotAbodaYetsorKodem: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAbodaYetsor : counter?.countShaotAbodaYetsorKodem,
        });
        setLoading(false);
        ResetAll();
    }

    const AdconKnesa = async () => {
        setLoading(true);
        await updateDoc(doc(firestore, 'shaotAboda', knesaHdsha.id), {
            knesa: knesaHdsha.knesa,
            yetseah: knesaHdsha.yetseah,
            headrot: knesaHdsha.headrot,
        });
        let count3 = knesaHdsha?.tfked === 'A' ? (counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesaHdsha.yetseah, knesaHdsha.knesa) - handleTimeDiffrence(knesa.yetseah, knesa.knesa)) : (handleTimeDiffrence(knesaHdsha.yetseah, knesaHdsha.knesa) - handleTimeDiffrence(knesa.yetseah, knesa.knesa))) : 0;
        let count2 = counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesaHdsha.yetseah, knesaHdsha.knesa) - handleTimeDiffrence(knesa.yetseah, knesa.knesa)) : (handleTimeDiffrence(knesaHdsha.yetseah, knesaHdsha.knesa) - handleTimeDiffrence(knesa.yetseah, knesa.knesa));
        await updateDoc(doc(firestore, 'metadata', 'counterShaotAboda'), {
            countShaotAbodaKodemet: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAboda : counter?.countShaotAbodaKodemet,
            countShaotAboda: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAboda + count2) : count2,
            countShaotAbodaMunth: format(new Date(), 'MM-yyyy'),
            countShaotAbodaYetsor: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAbodaYetsor + count3) : count3,
            countShaotAbodaYetsorKodem: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAbodaYetsor : counter?.countShaotAbodaYetsorKodem,
        });
        setLoading(false);
        disable();
    }

    useEffect(() => {
        const knesaH = {
            id: '',
            msbar: aobed?.msbar,
            shem: aobed?.shem,
            tfked: aobed?.tfked,
            yetseah: '',
            tarekh: format(new Date(), 'dd-MM-yyyy'),
            knesa: '',
            headrot: ''
        }
        setKnesaHdsha(knesa || knesaH);
    }, [knesa]);

    const handleChange = (field, value) => {
        setKnesaHdsha(prevState => ({
            ...prevState,
            [field]: value
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
        if (knesa?.headrot !== knesaHdsha?.headrot || knesa?.knesa !== knesaHdsha?.knesa || knesa?.yetseah !== knesaHdsha?.yetseah) {
            return false;
        }
        return true;
    }


    const isDisabelHosfa = () => {
        if (knesaHdsha?.headrot || knesaHdsha?.knesa || knesaHdsha?.yetseah) {
            return false;
        }
        return true;
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center text-base">עדכון שעות {aobed?.shem} לתאריך {yom}</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div>
                            {
                                type === 'adcon' ?
                                    <div>
                                        <div className="">
                                            <table className="w-full table-auto border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-20">
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">היעדרות</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">יצאה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">כניסה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם עובד</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><Dropdown dir="rtl">
                                                            <DropdownTrigger>
                                                                <Button color={knesaHdsha?.headrot ? 'success' : "danger"} variant='flat' size="sm" className='m-2'>
                                                                    {knesaHdsha?.headrot || 'בחר פריט'}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                aria-label="Multiple selection example"
                                                                variant="flat"
                                                                closeOnSelect={true}
                                                                disallowEmptySelection
                                                                selectionMode="single"
                                                                onSelectionChange={(val) => handleChange('headrot', val.currentKey)}
                                                            >
                                                                <DropdownItem key={'חופשה'}>{'חופשה'}</DropdownItem>
                                                                <DropdownItem key={'מחלה'}>{'מחלה'}</DropdownItem>
                                                                <DropdownItem key={'נוכח'}>{'נוכח'}</DropdownItem>
                                                                <DropdownItem key={'חופשה ללא תשלום'}>{'חופשה ללא תשלום'}</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown></td>
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={knesaHdsha?.yetseah} onValueChange={(val) => handleChange('yetseah', handleTime2Change(val, knesaHdsha?.knesa))} type="time" size="sm" color={aobed?.yetseah ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={knesaHdsha?.knesa} onValueChange={(val) => handleChange('knesa', val)} type="time" size="sm" color={knesaHdsha?.knesa ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300">{aobed?.shem}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="">
                                            <table className="w-full table-auto border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-20">
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">היעדרות</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">יצאה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">כניסה</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">שם עובד</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><Dropdown dir="rtl">
                                                            <DropdownTrigger>
                                                                <Button color={knesaHdsha?.headrot ? 'success' : "danger"} variant='flat' size="sm" className='m-2'>
                                                                    {knesaHdsha?.headrot || 'בחר פריט'}
                                                                </Button>
                                                            </DropdownTrigger>
                                                            <DropdownMenu
                                                                aria-label="Multiple selection example"
                                                                variant="flat"
                                                                closeOnSelect={true}
                                                                disallowEmptySelection
                                                                selectionMode="single"
                                                                onSelectionChange={(val) => handleChange('headrot', val.currentKey)}
                                                            >
                                                                <DropdownItem key={'חופשה'}>{'חופשה'}</DropdownItem>
                                                                <DropdownItem key={'מחלה'}>{'מחלה'}</DropdownItem>
                                                                <DropdownItem key={'נוכח'}>{'נוכח'}</DropdownItem>
                                                                <DropdownItem key={'חופשה ללא תשלום'}>{'חופשה ללא תשלום'}</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown></td>
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={knesaHdsha?.yetseah} onValueChange={(val) => handleChange('yetseah', handleTime2Change(val, knesaHdsha?.knesa))} type="time" size="sm" color={aobed?.yetseah ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center"><Input value={knesaHdsha?.knesa} onValueChange={(val) => handleChange('knesa', val)} type="time" size="sm" color={knesaHdsha?.knesa ? 'success' : "danger"} className="max-w-[80px]" labelPlacement="outside-left" /></div></td>
                                                        <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300">{aobed?.shem}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="w-full flex items-center justify-between">
                            <div>
                            </div>
                            <div>
                                <Button variant="flat" color="warning"  onClick={ResetAll}>סגור</Button>
                                {
                                    type === 'adcon' ?
                                        <Button isDisabled={isDisabeldAdcon()} isLoading={loading} variant="flat" color="primary" className="mr-2 ml-2" onClick={AdconKnesa}>אישור</Button>
                                        :
                                        <Button isDisabled={isDisabelHosfa()} isLoading={loading} variant="flat" color="primary" className="mr-2 ml-2" onClick={HosafatKnesa}>אישור</Button>
                                }
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

