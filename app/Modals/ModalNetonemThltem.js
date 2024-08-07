'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import GetDocs from "../FireBase/getDocs";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { differenceInMonths, format, subMonths } from "date-fns";

export default function ModalNetonemThltem({ show, disable }) {

    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterShaotAboda');
    const ESumAglot = metadata.find((count) => count.id === 'counterTfaol');


    const [hotsaorSkhar, setHotsaotSkhar] = useState(counter?.hotsaotSkhar);
    const [hotsaorSkharShaot, setHotsaotSkharShaot] = useState(counter?.shaotKodmet);

    const [hotsaorSkhar1, setHotsaotSkhar1] = useState('');
    const [hotsaorSkharShaot1, setHotsaotSkharShaot1] = useState('');

    const [hotsaorSkhar2, setHotsaotSkhar2] = useState('');
    const [hotsaorSkharShaot2, setHotsaotSkharShaot2] = useState('');

    useEffect(() => {
        setHotsaotSkhar(counter?.hotsaotSkhar);
        setHotsaotSkharShaot(counter?.shaotKodmet);
        setHotsaotSkhar1(counter?.hotsaotSkharYetsor);
        setHotsaotSkharShaot1(counter?.shaotKodmetYestsor);
        
    }, [counter]);

    useEffect(() => {
        if(ESumAglot?.countESumAglotSumMunths){
            setHotsaotSkhar2(format(ESumAglot?.countESumAglotSumMunths, 'yyyy-MM'));
        }
    },[ESumAglot])

    const ResetAll = () => {
        setHotsaotSkhar('');
        setHotsaotSkharShaot('');
        setHotsaotSkhar1('');
        setHotsaotSkharShaot1('');
        setHotsaotSkhar2(format(ESumAglot?.countESumAglotSumMunths, 'yyyy-MM'));
        setHotsaotSkharShaot2('');
        disable();
    }

    console.log(differenceInMonths(new Date(),hotsaorSkhar2));

    const Hosafa = async () => {
        setLoading(true);
        await updateDoc(doc(firestore,'metadata','counterShaotAboda'),{
            hotsaotSkhar : parseFloat(hotsaorSkhar),
            shaotKodmet : parseFloat(hotsaorSkharShaot),
            hotsaotSkharYetsor : parseFloat(hotsaorSkhar1),
            shaotKodmetYestsor : parseFloat(hotsaorSkharShaot1),
            
        });
        await updateDoc(doc(firestore,'metadata','counterTfaol'),{
            countESumAglotSumMunths : hotsaorSkhar2
        })
        disable();
        setLoading(false);
    }

    const [loading,setLoading] = useState(false);


    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                <ModalHeader className="shadow-2xl flex justify-center">נתונים תחלתים</ModalHeader>
                    <ModalBody className="border-b-2">
                        <div dir="rtl">
                            <div className="flex items-center mt-3 mb-3">
                                <div className="w-[200px]">הוצאות שכר ראשוניים</div>
                                <Input value={hotsaorSkhar || ''} onValueChange={(val) => setHotsaotSkhar(val)} className="max-w-[150px] mr-5" type="number" label=""/>
                            </div>
                            <div className="flex items-center mt-3 mb-3">
                                <div className="w-[200px]">שעות עבודה ראשוניים</div>
                                <Input value={hotsaorSkharShaot || ''} onValueChange={(val) => setHotsaotSkharShaot(val)} className="max-w-[150px] mr-5" type="number" label=""/>
                            </div>
                            <div className="flex items-center mt-3 mb-3">
                                <div className="w-[200px]">הוצאות שכר (עובדי ייצור) ראשוניים</div>
                                <Input value={hotsaorSkhar1 || ''} onValueChange={(val) => setHotsaotSkhar1(val)} className="max-w-[150px] mr-5" type="number" label=""/>
                            </div>
                            <div className="flex items-center mt-3 mb-3">
                                <div className="w-[200px]">שעות עבודה (עובדי ייצור) ראשוניים</div>
                                <Input value={hotsaorSkharShaot1 || ''} onValueChange={(val) => setHotsaotSkharShaot1(val)} className="max-w-[150px] mr-5" type="number" label=""/>
                            </div>
                            <div className="flex items-center mt-3 mb-3">
                                <div className="w-[200px]">חודש עבודה ראשון</div>
                                <Input value={hotsaorSkhar2 || ''} onValueChange={(val) => setHotsaotSkhar2(val)} className="max-w-[150px] mr-5" type="month" label=""/>
                            </div>
                            {/* <div className="flex items-center mt-3 mb-3">
                                <div className="w-[200px]">שעות עבודה (עובדי הנהלה) ראשוניים</div>
                                <Input value={hotsaorSkharShaot2 || ''} onValueChange={(val) => setHotsaotSkharShaot2(val)} className="max-w-[150px] mr-5" type="number" label=""/>
                            </div> */}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                            disable();
                        }}>
                            סגור
                        </Button>
                        <Button isLoading={loading} size="lg" color="primary" onClick={Hosafa}>
                            אישור
                        </Button>
                    </ModalFooter>

                </>
            </ModalContent>
        </Modal>
    )
}
