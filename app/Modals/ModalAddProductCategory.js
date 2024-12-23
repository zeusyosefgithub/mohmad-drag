'use client';
import { Button, Card, CardBody, Checkbox, CheckboxGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { useEffect, useState } from "react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import { GetTmonatHelek } from "../page";
import Image from "next/image";

export default function ModalAddProductCategory({ show, disable, category, Aeshor, sckhom, msbarTfaol, mlae,mlae2, motsarAher ,snefMlae}) {

    //const counter = useGetDataByCondition('category', 'msbar', '==', category?.msbar || 'default-msbar-value');
    const [shem, setShem] = useState('');
    const [sog, setSog] = useState('');
    const [mherThlte, setMherThlte] = useState(0);
    const [mherMkhera, setMherMkhera] = useState(0);
    const [msbarMdaf, setMsbarMdaf] = useState(0);
    const [tmona, setTmona] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [snfem,setSnfem] = useState([]);
    const [nsbar,setNsbar] = useState(false);

    useEffect(() => {
        setSnfem([snefMlae]);
    },[snefMlae]);

    const motsarem = category?.motsarem;
    function GetCategory(val) {
        for (let index = 0; index < motsarem?.length; index++) {
            if (val === motsarem[index].shem) {
                return motsarem[index];
            }
        }
        return;
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

    const GetCountCategoryM = (cat,array) => {
        let counter = 0;
        for (let index = 0; index < array.length; index++) {
            if(array[index].categoryMotsar === cat){
                counter++;
            }
        }
        return counter;
    }

    const AddSbak = async () => {
        setErrorMessage('');
        if (checkAemShemMotsarKeam()) {
            return;
        }
        setLoading(true);
        if (snfem.includes('עארה')) {
            let counter = GetCountCategoryM(GetCategory(shem)?.sog,mlae);
            await updateDoc(doc(firestore, 'mlae', 'Ara'), {
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
                    mherMkhera : parseFloat(mherMkhera),
                    adconAhron: '',
                    kmotNefl: 0,
                    sakhHkolKneot: 0,
                    active: true,
                    msbarMdaf: msbarMdaf,
                    nsbar : nsbar === 'נספר' ? true : false,
                    mtsavNsbar : 'לא נקבע' 
                }]
            });
        }
        if (snfem.includes('מעלה אפריים')) {
            let counter = GetCountCategoryM(GetCategory(shem)?.sog,mlae2);
            await updateDoc(doc(firestore, 'mlae', 'MaleAfraem'), {
                motsarem: [...mlae2, {
                    category: category?.id,
                    categoryMotsar: GetCategory(shem)?.sog,
                    msbar: `${GetCategory(shem)?.sog}${counter < 10 ? `0${counter}` : counter}`,
                    shem: sog,
                    alot: sckhom || 0,
                    alotLeheda: parseFloat(sckhom) || parseFloat(mherThlte),
                    kmot: sckhom ? 1 : 0,
                    mededa: GetCategory(shem)?.mededa,
                    msbarTfaol: msbarTfaol || 0,
                    mherMkhera : parseFloat(mherMkhera),
                    adconAhron: '',
                    kmotNefl: 0,
                    sakhHkolKneot: 0,
                    active: true,
                    msbarMdaf: msbarMdaf,
                    nsbar : nsbar === 'נספר' ? true : false,
                    mtsavNsbar : 'לא נקבע' 
                }]
            });
        }
        restAll();
        if (Aeshor) {
            Aeshor(true);
        }
        setLoading(false);
    }

    console.log(snfem);

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
                            <CheckboxGroup onValueChange={setSnfem} defaultValue={snfem} label={<div className="text-primary">סניף</div>} orientation="horizontal" className="mt-5 mb-5">
                                <Checkbox isReadOnly={snefMlae === 'עארה'} value="עארה">עארה</Checkbox>
                                <Checkbox isReadOnly={snefMlae === 'מעלה אפריים'} value="מעלה אפריים">מעלה אפריים</Checkbox>
                            </CheckboxGroup>
                            <RadioGroup onValueChange={setNsbar} label="ספירה" orientation="horizontal" className="mt-5 mb-5">
                                <Radio value="נספר">נספר</Radio>
                                <Radio value="לא נספר">לא נספר</Radio>
                            </RadioGroup>
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
