'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc, query, where, deleteDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { differenceInMinutes, format, parse, parseISO } from "date-fns";
import { useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";


export default function ModalAddKnesot({ disable, show, aobdem,knesotHhodesh, yom,hodesh,aeshor }) {

    const [loading, setLoading] = useState(false);
    const [aobdemLadd,setAobdemLadd] = useState([]);
    const [aobdemLaddBdeka,setAobdemLaddBdeka] = useState([]);
    

    useEffect(() => {
        const res = knesotHhodesh.find(item => item.yom === yom)?.knesot;
        if (res?.length) {
            const msbarSet = new Set(res.map(item => item.msbar));
            const filteredAobdem = aobdem
                .filter(item => item.active && !msbarSet.has(item.msbar))
                .map(item => ({
                    headrot: '',
                    yetseah: '',
                    knesa: '',
                    msbar: item.msbar,
                    shem: item.shem
                }));
            setAobdemLadd(filteredAobdem);
            setAobdemLaddBdeka(filteredAobdem);
        }
        else{
            const filteredAobdem = aobdem
                .filter(item => item.active)
                .map(item => ({
                    headrot: '',
                    yetseah: '',
                    knesa: '',
                    msbar: item.msbar,
                    shem: item.shem
                }));
            setAobdemLadd(filteredAobdem);
            setAobdemLaddBdeka(filteredAobdem);
        }
    }, [knesotHhodesh, yom]);

    const handleChange = (index, field, value) => {
        setAobdemLadd(prevKnesotHeom => {
            const updatedKnesotHeom = [...prevKnesotHeom];
            updatedKnesotHeom[index] = {
                ...updatedKnesotHeom[index],
                [field]: value
            };
            return updatedKnesotHeom;
        });
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
        for (let index = 0; index < aobdemLadd.length; index++) {
            if (aobdemLadd[index]?.yetseah !== aobdemLaddBdeka[index]?.yetseah ||
                aobdemLadd[index]?.knesa !== aobdemLaddBdeka[index]?.knesa ||
                aobdemLadd[index]?.headrot !== aobdemLaddBdeka[index]?.headrot) {
                return false;
            }
        }
        return true;
    }

    const getReplacedData = () => {
        const todayItem = knesotHhodesh.find(item => item.yom === yom);
        if (todayItem && todayItem.knesot.length) {
            const newArray = [...todayItem.knesot];
            aobdemLadd.forEach(item => {
                if (item.knesa || item.yetseah || item.headrot) {
                    newArray.push(item);
                }
            });
            return newArray;
        }
        return [...aobdemLadd];
    };

    const AdconKnesa = async () => {
        setLoading(true);
        const updatedData = knesotHhodesh.map(item =>
            item.yom === yom
                ? { ...item, knesot: getReplacedData() }
                : item
        );
        console.log(knesotHhodesh);
        console.log(updatedData);
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
        let shems = '';
        for (let index = 0; index < aobdemLadd.length; index++) {
            shems += aobdemLadd[index].shem + ', '
        }
        aeshor(true,shems,yom);
    }



    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center text-base border-b-2 bg-white">הוספת שעות עבודה לתאריך {yom}</ModalHeader>
                    <ModalBody className="shadow-2xl bg-white">
                        <div>
                            <div className="overflow-x-auto h-full">
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
                                        {
                                            aobdemLadd?.map((aobed, index) => {
                                                return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                    <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><Dropdown dir="rtl">
                                                        <DropdownTrigger>
                                                            <Button color={aobed?.headrot ? 'success' : "danger"} variant='flat' size="sm" className='m-2'>
                                                                {aobed?.headrot || 'בחר פריט'}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Multiple selection example"
                                                            variant="flat"
                                                            closeOnSelect={true}
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                            onSelectionChange={(val) => handleChange(index, 'headrot', val.currentKey)}
                                                        >
                                                            <DropdownItem key={'חופשה'}>{'חופשה'}</DropdownItem>
                                                            <DropdownItem key={'מחלה'}>{'מחלה'}</DropdownItem>
                                                            <DropdownItem key={'נוכח'}>{'נוכח'}</DropdownItem>
                                                            <DropdownItem key={'חופשה ללא תשלום'}>{'חופשה ללא תשלום'}</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown></td>
                                                    <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center items-center"><Input value={aobed?.yetseah} onValueChange={(val) => { handleChange(index, 'yetseah', handleTime2Change(val, aobed?.knesa)); (val && aobed?.knesa) && handleChange(index, 'headrot', 'נוכח') }} type="time" size="xs" color={aobed?.yetseah ? 'success' : "danger"} className="max-w-[100px]" />{aobed?.yetseah ? <GrPowerReset onClick={() => handleChange(index, 'yetseah', '')} className="text-[25px] w-[25px] cursor-pointer hover:text-primary ml-1 bg-gray-100 p-1 rounded-full" /> : <div className="w-[30px]"></div>}</div></td>
                                                    <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300"><div className="flex justify-center items-center"><Input value={aobed?.knesa} onValueChange={(val) => { handleChange(index, 'knesa', val); (val && aobed?.yetseah) && handleChange(index, 'headrot', 'נוכח') }} type="time" size="xs" color={aobed?.knesa ? 'success' : "danger"} className="max-w-[100px]" />{aobed?.knesa ? <GrPowerReset onClick={() => handleChange(index, 'knesa', '')} className="text-[25px] w-[25px] cursor-pointer hover:text-primary ml-1 bg-gray-100 p-1 rounded-full" /> : <div className="w-[30px]"></div>}</div></td>
                                                    <td className="px-4 py-3 text-center text-[15px] text-gray-700 dark:text-gray-300">{aobed?.shem}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t-2 bg-white">
                        <div className="w-full flex items-center justify-between">
                            <div>
                            </div>
                            <div>
                                <Button variant="flat" color="warning" onClick={disable}>סגור</Button>
                                <Button isLoading={loading} isDisabled={isDisabeldAdcon()} variant="flat" color="primary" className="mr-2 ml-2" onClick={AdconKnesa}>שמירה</Button>
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

