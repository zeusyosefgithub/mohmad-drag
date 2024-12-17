'use client';
import { Button, Card, CardBody, Checkbox, CheckboxGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { useState } from "react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import { GetTmonatHelek } from "../page";
import Image from "next/image";

export default function ModalAddProductCategory({ show, disable, category, Aeshor, sckhom, msbarTfaol, mlae, motsarAher }) {

    //const counter = useGetDataByCondition('category', 'msbar', '==', category?.msbar || 'default-msbar-value');
    const [shem, setShem] = useState('');
    const [sog, setSog] = useState('');
    const [mherThlte, setMherThlte] = useState(0);
    const [mherMkhera, setMherMkhera] = useState(0);
    const [msbarMdaf, setMsbarMdaf] = useState(0);
    const [tmona, setTmona] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const motsarem = category?.motsarem;
    function GetCategory(val) {
        for (let index = 0; index < motsarem?.length; index++) {
            if (val === motsarem[index].shem) {
                return motsarem[index];
            }
        }
        return;
    }

    function GetNewArrayMotsarem(val) {
        let newarray = [];
        for (let index = 0; index < motsarem?.length; index++) {
            if (motsarem[index].shem === shem) {
                newarray.push({
                    dlbak: val + 1,
                    mededa: motsarem[index].mededa,
                    shem: motsarem[index].shem,
                    sog: motsarem[index].sog
                })
            }
            else {
                newarray.push(motsarem[index]);
            }
        }
        return newarray;
    }

    const restAll = () => {
        setSog('');
        setMherThlte('');
        setMsbarMdaf('');
        setTmona(null);
        disable();
    }

    const checkAemShemMotsarKeam = () => {
        for (let index = 0; index < mlae.length; index++) {
            if (mlae[index].shem === sog) {
                setErrorMessage('שם המוצר כבר קיים !!');
                return true;
            }
        }
        return false;
    }

    const AddSbak = async () => {
        setErrorMessage('');
        if (checkAemShemMotsarKeam()) {
            return;
        }
        setLoading(true);
        let count = category?.dlbak + 1;
        let counter = GetCategory(shem)?.dlbak;
        await updateDoc(doc(firestore, 'mlae', 'Ara'),{
            motsarem: [...mlae, {
                category: category?.id,
                categoryMotsar: GetCategory(shem)?.sog,
                msbar: `${GetCategory(shem)?.sog}${counter < 10 ? `0${counter}` : counter}`,
                shem: sog,
                alot: sckhom || 0,
                alotLeheda: parseFloat(sckhom) || parseFloat(mherThlte),
                kmot: sckhom ? 1 : 0,
                mededa: GetCategory(shem)?.mededa,
                msbarTfaol: msbarTfaol || 0,
                adconAhron: '',
                kmotNefl: 0,
                sakhHkolKneot: 0,
                active: true,
                msbarMdaf: msbarMdaf
            }]
        });
        await updateDoc(doc(firestore, 'category', category?.id), {
            dlbak: count,
            motsarem: GetNewArrayMotsarem(counter)
        });
        restAll();
        if (Aeshor) {
            Aeshor(true);
        }
        setLoading(false);
    }
    //       צמיג 1

    console.log(motsarem);

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="xl" isOpen={show} onClose={restAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">מוצר חדש {category?.shem}</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <div className="w-full flex items-center">
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button
                                            variant="flat"
                                            color={shem ? 'primary' : 'default'}
                                            size="lg"
                                            className='mt-2 w-full max-w-[150px]'
                                        >
                                            {shem ? shem : "שם מוצר"}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={shem}

                                        onSelectionChange={(val) => setShem(val.currentKey)}
                                    >
                                        {
                                            motsarem?.map((motsar, index) => {
                                                return <DropdownItem key={motsar.shem} onClick={() => setTmona(motsar?.sog)}><div className="flex items-center"><div>
                                                    <Image src={GetTmonatHelek(motsar?.sog)} className="rounded-full h-[32px] w-[32px]" />
                                                </div><div className="mr-2">{motsar.shem}</div></div></DropdownItem>
                                            })
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                                {
                                    tmona &&
                                    <div className="group relative mr-5">
                                        <Image src={GetTmonatHelek(tmona)} className="h-[40px] w-[40px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%] group-hover:translate-y-[100%]" />
                                    </div>
                                }
                            </div>
                            <Input errorMessage={errorMessage} type="text" value={sog} onValueChange={(val) => setSog(val)} color={sog ? 'primary' : 'default'} className="mt-5 max-w-[150px]" label="שם פריט" />
                            <Input type="number" value={msbarMdaf || ''} onValueChange={(val) => setMsbarMdaf(val)} color={msbarMdaf ? 'primary' : 'default'} className="mt-5 max-w-[150px]" label="מספר מדף" />
                            <Input type="number" value={mherThlte || ''} onValueChange={(val) => setMherThlte(val)} color={mherThlte ? 'primary' : 'default'} className="mt-5 mb-5 max-w-[150px]" label="מחיר קנייה" />
                            <Input type="number" value={mherMkhera || ''} onValueChange={(val) => setMherMkhera(val)} color={mherMkhera ? 'primary' : 'default'} className="mt-5 mb-5 max-w-[150px]" label="מחיר מכירה" />
                            <CheckboxGroup label={<div className="text-primary">סניף</div>} orientation="horizontal" className="mt-5 mb-5">
                                <Checkbox value="עארה">עארה</Checkbox>
                                <Checkbox value="מעלה אפריים">מעלה אפריים</Checkbox>
                            </CheckboxGroup>
                            <CheckboxGroup label="ספירה" orientation="horizontal" className="mt-5 mb-5">
                                <Checkbox value="נספר">נספר</Checkbox>
                                <Checkbox value="לא נספר">לא נספר</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                            if (Aeshor) {
                                Aeshor(false);
                            }
                            restAll();
                        }}>
                            סגור
                        </Button>
                        <Button isDisabled={!shem || !sog || !mherThlte} isLoading={loading} size="lg" color="primary" onClick={AddSbak}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
