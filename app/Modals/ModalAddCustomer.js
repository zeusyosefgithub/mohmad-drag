'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalAddCustomer({ disable, show, counter, lkhot, brtem, LkohHdash, adcon, lkohId, brtemLkohKeam, aglaId }) {

    const [loading, setLoading] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerHouseId, setCustomerHouseId] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerPostal, setCustomerPostal] = useState('');
    const [customerStreet, setCustomerStreet] = useState('');
    const [msbarMezahehm, setMsbarMezahehm] = useState('');

    const [errorMessageShem, setErrorMessageShem] = useState('');
    const [errorMessageTaodatZehot, setErrorMessageTaodatZehot] = useState('');
    const [errorPhone, setErrorPhone] = useState('');



    const checkAemLkohKeam = () => {
        for (let index = 0; index < lkhot.length; index++) {
            if (adcon) {
                if (lkhot[index].cusid === customerId && brtemLkohKeam?.id !== lkhot[index].id) {
                    return true;
                }
            }
            else {
                if (lkhot[index].cusid === customerId) {
                    return true;
                }
            }
        }
        return false;
    }

    const checkAemLkohKeam2 = () => {
        for (let index = 0; index < lkhot.length; index++) {
            if (adcon) {
                if ((lkhot[index].name + ' ' + lkhot[index].lastname) === (customerName + ' ' + customerLastName) && (lkhot[index].id !== brtemLkohKeam?.id)) {
                    return true;
                }
            }
            else {
                if ((lkhot[index].name + ' ' + lkhot[index].lastname) === (customerName + ' ' + customerLastName)) {
                    return true;
                }
            }
        }
        return false;
    }

    const hosfatLkoh = async () => {
        setErrorMessageShem('');
        setErrorMessageTaodatZehot('');
        setErrorPhone('');
        if (!customerName) return setErrorMessageShem('אין נתונים!');;
        if (customerId && checkAemLkohKeam()) {
            setErrorMessageTaodatZehot('ת.ז הלקוח כבר קיימת !!');
            return;
        }
        if (checkAemLkohKeam2()) {
            setErrorMessageShem('שם הלקוח כבר קיים !!');
            return;
        }
        setLoading(true);
        const customer = {
            city: customerCity,
            cusid: customerId,
            houseid: customerHouseId,
            idnum: counter?.count,
            lastname: customerLastName,
            name: customerName,
            phone: customerPhone,
            postal: customerPostal,
            street: customerStreet,
            yetera: 0,
        }
        if (adcon) {
            try {
                await updateDoc(doc(firestore, 'customers', lkohId), {
                    city: customerCity,
                    cusid: customerId,
                    houseid: customerHouseId,
                    idnum: counter?.count,
                    lastname: customerLastName,
                    name: customerName,
                    phone: customerPhone,
                    postal: customerPostal,
                    street: customerStreet,
                });
                await updateDoc(doc(firestore, 'tfaol', aglaId), {
                    brtemLkoh: {
                        id: brtemLkohKeam?.id,
                        idnum: brtemLkohKeam?.idnum,
                        yetera: brtemLkohKeam?.yetera,
                        city: customerCity,
                        cusid: customerId,
                        houseid: customerHouseId,
                        lastname: customerLastName,
                        name: customerName,
                        phone: customerPhone,
                        postal: customerPostal,
                        street: customerStreet,
                    }
                })
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                await addDoc(collection(firestore, "customers"), customer);
                await updateDoc(doc(firestore, 'metadata', 'counterLkhot'), { count: counter?.count + 1 });
            }
            catch (e) {
                console.log(e);
            }
        }
        setLoading(false);
        LkohHdash(true, customerName + ' ' + customerLastName);
        ResetAll();
        disable();
    }

    const ResetAll = () => {
        setLoading('');
        setCustomerName('');
        setCustomerId('');
        setCustomerHouseId('');
        setCustomerCity('');
        setCustomerLastName('');
        setCustomerPhone('');
        setCustomerPostal('');
        setCustomerStreet('');
        setErrorMessageShem('');
        setErrorMessageTaodatZehot('');
    }

    useEffect(() => {
        if (adcon) {
            setCustomerName(brtemLkohKeam?.name);
            setCustomerLastName(brtemLkohKeam?.lastname);
            setCustomerId(brtemLkohKeam?.cusid);
            setCustomerHouseId(brtemLkohKeam?.houseid);
            setCustomerCity(brtemLkohKeam?.city);
            setCustomerPhone(brtemLkohKeam?.phone);
            setCustomerPostal(brtemLkohKeam?.postal);
            setCustomerStreet(brtemLkohKeam?.street);
        }
        else {
            setCustomerName(brtem?.customerName);
            setCustomerLastName(brtem?.customerLastName);
            setCustomerPhone(brtem?.customerPhone);
            setCustomerCity(brtem?.customerCity);
            setMsbarMezahehm(brtem?.msbarMezahehm);
        }
    }, [brtem])

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="xl" isOpen={show} onClose={() => { ResetAll(); disable(); }}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת לקוח חדש</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <Input errorMessage={errorMessageShem} className="mt-3 mb-3" color="primary" value={customerName} size="sm" onValueChange={(value) => { setCustomerName(value) }} type="text" label="שם פרטי" />
                            <Input color="primary" value={customerLastName} className="mt-3 mb-3" size="sm" onValueChange={(value) => { setCustomerLastName(value) }} type="text" label="שם משפחה" />
                            <Input color="primary" value={msbarMezahehm} className="mt-3 mb-3" size="sm" onValueChange={(value) => { setMsbarMezahehm(value) }} type="text" label="מספר מזהה" />
                            <Input errorMessage={errorPhone} color="primary" value={customerPhone} className="mt-3 mb-3" size="sm" onValueChange={(value) => { setCustomerPhone(value) }} type="number" label="מס טלפון" />
                            <Input color="primary" value={customerStreet} className="mt-3 mb-3" size="sm" onValueChange={(value) => { setCustomerStreet(value) }} type="text" label="רחוב" />
                            <Input errorMessage={errorMessageTaodatZehot} className="mt-3 mb-3" color="primary" value={customerId} size="sm" onValueChange={(value) => { setCustomerId(value) }} type="number" label="מס תעודת זהות" />
                            <Input color="primary" value={customerPostal} className="mt-3 mb-3" size="sm" onValueChange={(value) => { setCustomerPostal(value) }} type="number" label="מס מיקוד" />
                            <Input color="primary" value={customerHouseId} className="mt-3 mb-3" size="sm" onValueChange={(value) => { setCustomerHouseId(value) }} type="number" label="מס בית" />
                            <Input color="primary" value={customerCity} className="mt-3 mb-3" size="sm" onValueChange={(value) => { setCustomerCity(value) }} type="text" label="ישוב" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" color="warning" variant="flat" onClick={() => { ResetAll(); disable(); }}>
                            סגור
                        </Button>
                        <Button isLoading={loading} size="sm" variant="flat" color="primary" onClick={async () => {
                            hosfatLkoh();
                        }}>
                            {adcon ? 'עדכון' : 'הוספה'}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}