'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc, query, where } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import moment from 'moment';
import { HiOutlineCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { differenceInDays, format, setDate } from "date-fns";
import { useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";


export default function ModalHosfatHotsaaHdasha({ disable, show }) {

    const [shemMotsar, setShemMotsar] = useState('');
    const [sogHotsaa, setSogHotsaa] = useState('');
    const [moaedHov, setMoaedHov] = useState('');
    const [zmanTshlom, setZmanTshlom] = useState('');
    const [aorkhTkofa, setAorkhTkofa] = useState('');
    const [sogMas,setSgoMas] = useState('');
    const [hovKrov, setHovKrov] = useState(format(new Date(), 'yyyy-MM-dd'));
    const counter = GetDocs('metadata').find((count) => count.id === 'counterHotsaot');
    

    const hosfatHotsaa = async () => {
        await addDoc(collection(firestore, 'hotsaot'), {
            shem: shemMotsar,
            sogHotsaa: sogHotsaa,
            zmanTshlom: zmanTshlom,
            moaedHov: moaedHov,
            msbar: counter.count,
            aorkhTkofa: aorkhTkofa,
            hovKrov: hovKrov,
            count: 0,
            count2 : 0,
            diff: 0,
            sogMas : sogMas,
            hotsaaShoteft: 0,
            hotsaaShoteftClicks: 0,
            munth : format(new Date(),'MM-yyyy')
        })
        await updateDoc(doc(firestore, 'metadata', 'counterHotsaot'), {
            count: counter.count + 1
        });
        RestAll();
    }

    const RestAll = () => {
        setShemMotsar('');
        setSogHotsaa('');
        setZmanTshlom('');
        setMoaedHov('');
        setAorkhTkofa('');
        setSgoMas('');
        setHovKrov(format(new Date(), 'yyyy-MM-dd'));
        disable();
    }


    const handleAorkhTkofaChange = (val) => {
        const newAorkhTkofa = Math.min(val, 30);
        setMoaedHov(newAorkhTkofa);
        const currentDate = new Date(hovKrov);
        const updatedDate = format(setDate(currentDate, newAorkhTkofa), 'yyyy-MM-dd');
        setHovKrov(updatedDate);
    };

    const handleHovKrovChange = (val) => {
        const updatedDate = format(setDate(new Date(val), moaedHov), 'yyyy-MM-dd');
        setHovKrov(updatedDate);
    };

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={RestAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת הוצאה חדשה</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="p-5">
                            <div className="flex items-center">
                                <Input type="text" value={shemMotsar} onValueChange={(val) => setShemMotsar(val)} label="שם מוצר" className="max-w-[150px]" />
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button variant='flat' size="" className='mr-4'>
                                            {sogHotsaa || 'סוג הוצאה'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        onSelectionChange={(val) => setSogHotsaa(val.currentKey)}
                                    >
                                        <DropdownItem key={'הוצאות שכר'}>{'הוצאות שכר'}</DropdownItem>
                                        <DropdownItem key={'קניות מוצרים'}>{'קניות מוצרים'}</DropdownItem>
                                        <DropdownItem key={'מסים'}>{'מסים'}</DropdownItem>
                                        <DropdownItem key={'הוצאות שוטפות'}>{'הוצאות שוטפות'}</DropdownItem>
                                        <DropdownItem key={'הוצאות אחרות'}>{'הוצאות אחרות'}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                {
                                    sogHotsaa === 'מסים' &&
                                    <Dropdown dir="rtl">
                                        <DropdownTrigger>
                                            <Button variant='flat' size="" className='mr-4'>
                                                {sogMas || 'סוג הוצאה'}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Multiple selection example"
                                            variant="flat"
                                            closeOnSelect={true}
                                            disallowEmptySelection
                                            selectionMode="single"
                                            onSelectionChange={(val) => setSgoMas(val.currentKey)}
                                        >
                                            <DropdownItem key={'מע"מ'}>{'מע"מ'}</DropdownItem>
                                            <DropdownItem key={'ניקוי מע"מ'}>{'ניקוי מע"מ'}</DropdownItem>
                                            <DropdownItem key={'מס אחר'}>{'מס אחר'}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button variant='flat' size="" className='mr-4'>
                                            {zmanTshlom || 'זמן תשלום'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        onSelectionChange={(val) => setZmanTshlom(val.currentKey)}
                                    >
                                        {
                                            (sogHotsaa !== 'הוצאות שכר' && sogMas !== 'מע"מ') &&
                                            <DropdownItem key={'חד פעמי'}>{'חד פעמי'}</DropdownItem>
                                        }
                                        {
                                            (sogHotsaa !== 'הוצאות אחרות' && sogHotsaa !== 'קניות מוצרים') &&
                                            <DropdownItem key={'תקופתי'}>{'תקופתי'}</DropdownItem>
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                                {
                                    zmanTshlom === 'תקופתי' &&
                                    <>
                                        <Input type="number" value={aorkhTkofa || ''} onValueChange={(val) => setAorkhTkofa(Math.min(val, 12))} label="אורך תקופה בחודשים" className="max-w-[170px] mr-4" />
                                        <Input type="number" value={moaedHov || ''} onValueChange={(val) => handleAorkhTkofaChange(val)} label="מועד חוב" className="max-w-[170px] mr-4" />
                                        <Input type="date" value={hovKrov} onValueChange={(val) => handleHovKrovChange(val)} label="החוב הראשון" className="max-w-[170px] mr-4" />
                                    </>
                                    
                                }

                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={RestAll}>
                            סגור
                        </Button>
                        <Button onClick={hosfatHotsaa} size="lg" color="primary">
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

