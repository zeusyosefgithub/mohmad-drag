'use client';

import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import ModalReshematBkodot from "../Modals/ModalReshematBkodot";
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, count, doc, updateDoc } from "firebase/firestore";
import { id } from "date-fns/locale";
import { firestore } from "../FireBase/firebase";
import { format } from "date-fns";
import { useAuth } from "../auth/authContext";

export default function Test() {

    const [loading, setLoading] = useState(false);
    const lkhot = GetDocs('customers');
    const sbkem = GetDocs('sbkem');
    const bkodot = GetDocs('hnhlatHeshbonot');
    const { signUp, signIn, signOutt, currentUser } = useAuth();

    const metadata = GetDocs('metadata');
    const counterHnhlatHeshbonot = metadata.find((count) => count.id === 'counterHnhlatHeshbonot');

    const [enteries1, setEnteries1] = useState([{ input: 0, option: 0, berot: '' }]);

    const inputRefs1 = useRef([]);
    const inputRefs2 = useRef([]);

    const handleEntriesChange1 = (index, field, value) => {
        const newEntries = [...enteries1];
        newEntries[index][field] = value;
        setEnteries1(newEntries);
    };

    const handleAddEntries1 = () => {
        setEnteries1([...enteries1, { input: 0, option: 0, berot: '' }]);
    };

    function removeItem1(index) {
        const newItems = enteries1.filter((item, idx) => idx !== index);
        setEnteries1(newItems);
    }


    const [enteries2, setEnteries2] = useState([{ input: 0, option: 0, berot: '' }]);

    const handleEntriesChange2 = (index, field, value) => {
        const newEntries = [...enteries2];
        newEntries[index][field] = value;
        setEnteries2(newEntries);
    };

    const handleAddEntries2 = () => {
        setEnteries2([...enteries2, { input: 0, option: 0, berot: '' }]);
    };

    function removeItem2(index) {
        const newItems = enteries2.filter((item, idx) => idx !== index);
        setEnteries2(newItems);
    }


    useEffect(() => {
        if (enteries1.length > 0) {
            inputRefs1.current[enteries1.length - 1]?.focus();
        }
    }, [enteries1]);

    useEffect(() => {
        if (enteries2.length > 0) {
            inputRefs2.current[enteries2.length - 1]?.focus();
        }
    }, [enteries2]);

    const GetSumE1 = () => {
        let sum = 0;
        for (let index = 0; index < enteries1.length; index++) {
            sum += parseFloat(enteries1[index].input);
        }
        return sum;
    }

    const GetSumE2 = () => {
        let sum = 0;
        for (let index = 0; index < enteries2.length; index++) {
            sum += parseFloat(enteries2[index].input);
        }
        return sum;
    }

    const DisableAeshor = () => {
        if (GetSumE1() !== GetSumE2()) {
            return true;
        }
        for (let index = 0; index < enteries1.length; index++) {
            if (!enteries1[index].input || !enteries1[index].option) {
                return true;
            }
        }
        for (let index = 0; index < enteries2.length; index++) {
            if (!enteries2[index].input || !enteries2[index].option) {
                return true;
            }
        }
        return false;
    }











    const [showRehmatBkodot, setShowReshematBkodot] = useState(false);


    const GetDropdownItems = (val) => {
        let newArray = [];
        if (val === 'לקחות') {
            for (let index = 0; index < lkhot.length; index++) {
                newArray.push(
                    <DropdownItem key={lkhot[index].name}>{lkhot[index].name}</DropdownItem>
                );
            }
        }
        else if (val === 'ספקים') {
            for (let index = 0; index < sbkem.length; index++) {
                newArray.push(
                    <DropdownItem key={sbkem[index].shem}>{sbkem[index].shem}</DropdownItem>
                );
            }
        }
        else if (val === 'מיכרות') {
            newArray.push(
                <DropdownItem key='מכירת עגלה'>מכירת עגלה</DropdownItem>
            );
            newArray.push(
                <DropdownItem key='הרכבת וו'>הרכבת וו</DropdownItem>
            );
            newArray.push(
                <DropdownItem key='תיקון עגלה'>תיקון עגלה</DropdownItem>
            );
            newArray.push(
                <DropdownItem key='מכירת מוצרים'>מכירת מוצרים</DropdownItem>
            );
        }
        return newArray;
    }

    const [showModalBerotBkoda,setShowModalBerotBkoda] = useState(false);


    return (
        <div>
            <ModalReshematBkodot show={showRehmatBkodot} disable={() => setShowReshematBkodot(false)} />
            <div className="w-full pl-16 pr-16">
                <div className="bg-white shadow-2xl rounded-2xl p-5 flex justify-around">
                    <Button onClick={() => setShowReshematBkodot(true)} className="mr-2 ml-2" size="sm" color='primary' variant='flat'>
                        רשימת פקודות יומן
                    </Button>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div className=" border-2 border-black pt-10 pl-10 pr-10 rounded-2xl shadow-2xl">
                    <div className="flex items-start">
                        <div className="min-w-[300px] mr-7 ml-7">
                            <div className="text-center border-b">
                                זכות
                            </div>
                            <div className="mt-5">
                                {
                                    enteries1.map((enter, index) => {
                                        return <div className="flex items-center mt-2 mb-2">
                                            <div dir='rtl'>
                                                <Input isDisabled={!enter.berot} size="sm" onKeyDown={(event) => {
                                                    if (event.key === 'Enter' && enter.option && enter.input && index === enteries1.length - 1) {
                                                        handleAddEntries1();
                                                    }
                                                    if (event.key === 'Backspace' && !enter.input && index === enteries1.length - 1 && enteries1.length !== 1) {
                                                        removeItem1(index);
                                                    }
                                                }}
                                                    type="number" ref={(el) => (inputRefs1.current[index] = el)} value={enter.input || ''} onChange={(e) => handleEntriesChange1(index, 'input', e.target.value)} color="primary" label='סכום' />
                                            </div>
                                            <div>
                                                <Dropdown dir="rtl">
                                                    <DropdownTrigger>
                                                        <Button isDisabled={!enter.option} variant='flat' color="primary" size="sm" className='m-2 w-[100px]'>
                                                            {enter.berot || 'פירוט'}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        aria-label="Multiple selection example"
                                                        variant="flat"
                                                        closeOnSelect={true}
                                                        className="h-[300px] overflow-auto"
                                                        disallowEmptySelection
                                                        selectionMode="single"
                                                        onSelectionChange={(val) => handleEntriesChange1(index, 'berot', val.currentKey)}
                                                    >
                                                        {
                                                            GetDropdownItems(enter.option)
                                                        }
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                            <div>
                                                <Dropdown dir="rtl">
                                                    <DropdownTrigger>
                                                        <Button variant='flat' color="primary" size="sm" className='m-2 w-[100px]'>
                                                            {enter.option || 'שם פקודה'}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        aria-label="Multiple selection example"
                                                        variant="flat"
                                                        closeOnSelect={true}
                                                        disallowEmptySelection
                                                        selectionMode="single"
                                                        onSelectionChange={(val) => handleEntriesChange1(index, 'option', val.currentKey)}
                                                    >
                                                        <DropdownItem key={'מיכרות'}>{'מיכרות'}</DropdownItem>
                                                        <DropdownItem key={'עלות מיכרות'}>{'עלות מיכרות'}</DropdownItem>
                                                        <DropdownItem key={'הנהלה וכלליות'}>{'הנהלה וכלליות'}</DropdownItem>
                                                        <DropdownItem key={'הוצאת מימון'}>{'הוצאת מימון'}</DropdownItem>
                                                        <DropdownItem key={'הוצאת אחרות'}>{'הוצאת אחרות'}</DropdownItem>
                                                        <DropdownItem key={'מזומנים'}>{'מזומנים'}</DropdownItem>
                                                        <DropdownItem key={'רכוש קבוע'}>{'רכוש קבוע'}</DropdownItem>
                                                        <DropdownItem key={'לקחות'}>{'לקחות'}</DropdownItem>
                                                        <DropdownItem key={'ספקים'}>{'ספקים'}</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="flex justify-center">
                                <Input size="" color="primary" className="w-[100px]" value={GetSumE1() || ''} />
                            </div>
                        </div>
                        <div className="min-w-[300px] mr-7 ml-7">
                            <div className="text-center border-b">
                                חובה
                            </div>
                            <div className="mt-5">
                                {
                                    enteries2.map((enter, index) => {
                                        return <div className="flex items-center mt-2 mb-2">
                                            <div dir='rtl'>
                                                <Input isDisabled={!enter.berot} size="sm" onKeyDown={(event) => {
                                                    if (event.key === 'Enter' && enter.option && enter.input && index === enteries2.length - 1) {
                                                        handleAddEntries2();
                                                    }
                                                    if (event.key === 'Backspace' && !enter.input && index === enteries2.length - 1 && enteries2.length !== 1) {
                                                        removeItem2(index);
                                                    }
                                                }}
                                                    type="number" ref={(el) => (inputRefs2.current[index] = el)} value={enter.input || ''} onChange={(e) => handleEntriesChange2(index, 'input', e.target.value)} color="primary" label='סכום' />
                                            </div>
                                            <div>
                                                <Dropdown dir="rtl">
                                                    <DropdownTrigger>
                                                        <Button isDisabled={!enter.option} variant='flat' color="primary" size="sm" className='m-2 w-[100px]'>
                                                            {enter.berot || 'פירוט'}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        aria-label="Multiple selection example"
                                                        variant="flat"
                                                        closeOnSelect={true}
                                                        className="h-[300px] overflow-auto"
                                                        disallowEmptySelection
                                                        selectionMode="single"
                                                        onSelectionChange={(val) => handleEntriesChange2(index, 'berot', val.currentKey)}
                                                    >
                                                        {
                                                            GetDropdownItems(enter.option)
                                                        }
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                            <div>
                                                <Dropdown dir="rtl">
                                                    <DropdownTrigger>
                                                        <Button variant='flat' color="primary" size="sm" className='m-2 w-[100px]'>
                                                            {enter.option || 'שם פקודה'}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        aria-label="Multiple selection example"
                                                        variant="flat"
                                                        closeOnSelect={true}
                                                        disallowEmptySelection
                                                        selectionMode="single"
                                                        onSelectionChange={(val) => handleEntriesChange2(index, 'option', val.currentKey)}
                                                    >
                                                        <DropdownItem key={'מיכרות'}>{'מיכרות'}</DropdownItem>
                                                        <DropdownItem key={'עלות מיכרות'}>{'עלות מיכרות'}</DropdownItem>
                                                        <DropdownItem key={'הנהלה וכלליות'}>{'הנהלה וכלליות'}</DropdownItem>
                                                        <DropdownItem key={'הוצאת מימון'}>{'הוצאת מימון'}</DropdownItem>
                                                        <DropdownItem key={'הוצאת אחרות'}>{'הוצאת אחרות'}</DropdownItem>
                                                        <DropdownItem key={'מזומנים'}>{'מזומנים'}</DropdownItem>
                                                        <DropdownItem key={'רכוש קבוע'}>{'רכוש קבוע'}</DropdownItem>
                                                        <DropdownItem key={'לקחות'}>{'לקחות'}</DropdownItem>
                                                        <DropdownItem key={'ספקים'}>{'ספקים'}</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="flex justify-center">
                                <Input size="" color="primary" className="w-[100px]" value={GetSumE2() || ''} />
                            </div>
                        </div>
                    </div>
                    <Divider className="mt-5 mb-5" />
                    <div className="mt-5 mb-5 flex justify-end">
                        <Button onClick={async () => {
                            setLoading(true);
                            await addDoc(collection(firestore, "hnhlatHeshbonot"), {
                                id: counterHnhlatHeshbonot.count,
                                hoba: enteries2,
                                zkhot: enteries1,
                                tarekh: format(new Date(), 'dd-MM-yyyy'),
                                shaa: format(new Date(), 'HH:mm'),
                                user: currentUser.email,
                            });
                            await updateDoc(doc(firestore, 'metadata', 'counterHnhlatHeshbonot'), {
                                count: counterHnhlatHeshbonot.count + 1
                            })
                            setLoading(false);
                        }} isLoading={loading} isDisabled={DisableAeshor()} size="sm" color='primary' variant='flat'>
                            אישור
                        </Button>
                    </div>
                </div>

            </div>

            <div className="flex justify-center mt-10 mb-10">
                <div className=" border-2 border-black w-[9
                00px] p-7 rounded-2xl shadow-2xl">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>משתמש</th>
                                <th>שעה</th>
                                <th>תאריך</th>
                                <th>מס פקודה</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bkodot?.map((bkoda,index) => {
                                    return <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">
                                            <Button onClick={() => setShowModalBerotBkoda(true)} size="" variant='flat'>
                                                פירוט
                                            </Button>
                                        </td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{bkoda?.user}</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{bkoda?.shaa}</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{bkoda?.tarekh}</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{bkoda?.id}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

