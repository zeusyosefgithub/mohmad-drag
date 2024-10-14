'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Spinner, Switch, Tab, Tabs, Tooltip } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaRegCheckSquare, FaSearch } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { PiTreeStructureFill } from "react-icons/pi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { GiPaintBucket } from "react-icons/gi";
import { MdOutlineElectricalServices } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { format } from "date-fns";

export default function ModalAobedYetsor({ show, disable, agla,aobed }) {


    const [mtsavYetsor, setMtsavYetsor] = useState([]);

    useEffect(() => {
        setMtsavYetsor(agla?.mtsavYetsor);
        console.log(123);
    }, [agla?.mtsavYetsor]);

    useEffect(() => {
        console.log(agla?.mtsavYetsor);
    }, [agla]);


    useEffect(() => {
        console.log(agla);
    }, [agla])

    console.log();

    console.log(mtsavYetsor);


    const [loading,setLoading] = useState(false);



    const [showmtsav, setShowMtsav] = useState('תכנון');
    return mtsavYetsor && (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="3xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <ModalHeader className="flex justify-center border-b-2">
                    מצב עגלה
                </ModalHeader>
                <ModalBody className="border-b-2">
                    {
                        loading && <Spinner className="absolute left-0 right-0 bottom-0 top-0 z-50"/>
                    }
                    <div dir="rtl" className="mb-3">
                        <Card className="w-full">
                            <CardBody>
                                <div className="w-full flex justify-between pr-2 pl-2 items-center">
                                    <div className="text-base text-right flex items-center">
                                        <GrPlan className="ml-2 text-xl text-primary" />תכנון
                                    </div>
                                    <Button isLoading={loading} variant={mtsavYetsor[0]?.res ? "light" : 'solid'} className="w-[80px]" isDisabled={mtsavYetsor[0]?.res} onClick={async() => {
                                        setLoading(true);
                                        await updateDoc(doc(firestore,'tfaol',agla.id),{
                                            mtsavYetsor : [
                                                {
                                                    maoshar : aobed?.name,
                                                    res : true,
                                                    shaa : format(new Date(),'HH:mm'),
                                                    tarekh : format(new Date(),'dd-MM-yyyy')
                                                },
                                                mtsavYetsor[1],
                                                mtsavYetsor[2],
                                                mtsavYetsor[3],
                                                mtsavYetsor[4],
                                                mtsavYetsor[5]
                                            ]
                                        });
                                        setLoading(false);
                                    }} size="sm">
                                        {
                                            mtsavYetsor[0]?.res ? <div className="flex items-center text-success">מוכן<FaCheckCircle className='text-success text-xl mr-1' /></div> : 'סימון'
                                        }
                                    </Button>
                                </div>
                                {
                                    mtsavYetsor[0]?.res &&
                                    <div className="text-xs w-full flex justify-around font-extrabold mt-1">
                                        <div className="flex items-center">
                                            <div>תאריך : </div>
                                            <div className="mr-1">{mtsavYetsor[0]?.tarekh}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div>שעה : </div>
                                            <div className="mr-1">{mtsavYetsor[0]?.shaa}</div>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                        <Divider className="mt-3 mb-3" />
                        <Card className="w-full">
                            <CardBody>
                                <div className="w-full flex justify-between pr-2 pl-2 items-center">
                                    <div className="text-base text-right flex items-center">
                                        <PiTreeStructureFill className="ml-2 text-xl text-primary" />שלדה
                                    </div>
                                    <Button isLoading={loading} variant={mtsavYetsor[1]?.res ? "light" : 'solid'} className="w-[80px]" isDisabled={mtsavYetsor[1]?.res || !mtsavYetsor[0]?.res} onClick={async() => {
                                        setLoading(true);
                                        await updateDoc(doc(firestore,'tfaol',agla.id),{
                                            mtsavYetsor : [
                                                mtsavYetsor[0],
                                                {
                                                    maoshar : aobed?.name,
                                                    res : true,
                                                    shaa : format(new Date(),'HH:mm'),
                                                    tarekh : format(new Date(),'dd-MM-yyyy')
                                                },
                                                mtsavYetsor[2],
                                                mtsavYetsor[3],
                                                mtsavYetsor[4],
                                                mtsavYetsor[5]
                                            ]
                                        });
                                        setLoading(false);
                                    }} size="sm">
                                        {
                                            mtsavYetsor[1]?.res ? <div className="flex items-center text-success">מוכן<FaCheckCircle className='text-success text-xl mr-1' /></div> : 'סימון'
                                        }
                                    </Button>
                                </div>
                                {
                                    mtsavYetsor[1]?.res &&
                                    <div className="text-xs w-full flex justify-around font-extrabold mt-1">
                                        <div className="flex items-center">
                                            <div>תאריך : </div>
                                            <div className="mr-1">{mtsavYetsor[1]?.tarekh}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div>שעה : </div>
                                            <div className="mr-1">{mtsavYetsor[1]?.shaa}</div>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                        <Divider className="mt-3 mb-3" />
                        <Card className="w-full">
                            <CardBody>
                                <div className="w-full flex justify-between pr-2 pl-2 items-center">
                                    <div className="text-base text-right flex items-center">
                                        <HiOutlineViewGridAdd className="ml-2 text-xl text-primary" />השלמה
                                    </div>
                                    <Button isLoading={loading} variant={mtsavYetsor[2]?.res ? "light" : 'solid'} className="w-[80px]" isDisabled={mtsavYetsor[2]?.res || !mtsavYetsor[1]?.res} onClick={async() => {
                                        setLoading(true);
                                        await updateDoc(doc(firestore,'tfaol',agla.id),{
                                            mtsavYetsor : [
                                                mtsavYetsor[0],
                                                mtsavYetsor[1],
                                                {
                                                    maoshar : aobed?.name,
                                                    res : true,
                                                    shaa : format(new Date(),'HH:mm'),
                                                    tarekh : format(new Date(),'dd-MM-yyyy')
                                                },
                                                mtsavYetsor[3],
                                                mtsavYetsor[4],
                                                mtsavYetsor[5]
                                            ]
                                        });
                                        setLoading(false);
                                    }} size="sm">
                                        {
                                            mtsavYetsor[2]?.res ? <div className="flex items-center text-success">מוכן<FaCheckCircle className='text-success text-xl mr-1' /></div> : 'סימון'
                                        }
                                    </Button>
                                </div>
                                {
                                    mtsavYetsor[2]?.res &&
                                    <div className="text-xs w-full flex justify-around font-extrabold mt-1">
                                        <div className="flex items-center">
                                            <div>תאריך : </div>
                                            <div className="mr-1">{mtsavYetsor[2]?.tarekh}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div>שעה : </div>
                                            <div className="mr-1">{mtsavYetsor[2]?.shaa}</div>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                        <Divider className="mt-3 mb-3" />
                        <Card className="w-full">
                            <CardBody>
                                <div className="w-full flex justify-between pr-2 pl-2 items-center">
                                    <div className="text-base text-right flex items-center">
                                        <GiPaintBucket className="ml-2 text-xl text-primary" />צבע
                                    </div>
                                    <Button isLoading={loading} variant={mtsavYetsor[3]?.res ? "light" : 'solid'} className="w-[80px]" isDisabled={mtsavYetsor[3]?.res || !mtsavYetsor[2]?.res} onClick={async() => {
                                        setLoading(true);
                                        await updateDoc(doc(firestore,'tfaol',agla.id),{
                                            mtsavYetsor : [
                                                mtsavYetsor[0],
                                                mtsavYetsor[1],
                                                mtsavYetsor[2],
                                                {
                                                    maoshar : aobed?.name,
                                                    res : true,
                                                    shaa : format(new Date(),'HH:mm'),
                                                    tarekh : format(new Date(),'dd-MM-yyyy')
                                                },
                                                mtsavYetsor[4],
                                                mtsavYetsor[5]
                                            ]
                                        });
                                        setLoading(false);
                                    }} size="sm">
                                        {
                                            mtsavYetsor[3]?.res ? <div className="flex items-center text-success">מוכן<FaCheckCircle className='text-success text-xl mr-1' /></div> : 'סימון'
                                        }
                                    </Button>
                                </div>
                                {
                                    mtsavYetsor[3]?.res &&
                                    <div className="text-xs w-full flex justify-around font-extrabold mt-1">
                                        <div className="flex items-center">
                                            <div>תאריך : </div>
                                            <div className="mr-1">{mtsavYetsor[3]?.tarekh}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div>שעה : </div>
                                            <div className="mr-1">{mtsavYetsor[3]?.shaa}</div>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                        <Divider className="mt-3 mb-3" />
                        <Card className="w-full">
                            <CardBody>
                                <div className="w-full flex justify-between pr-2 pl-2 items-center">
                                    <div className="text-base text-right flex items-center">
                                        <MdOutlineElectricalServices className="ml-2 text-xl text-primary" />חשמל
                                    </div>
                                    <Button isLoading={loading} variant={mtsavYetsor[4]?.res ? "light" : 'solid'} className="w-[80px]" isDisabled={mtsavYetsor[4]?.res || !mtsavYetsor[3]?.res} onClick={async() => {
                                        setLoading(true);
                                        await updateDoc(doc(firestore,'tfaol',agla.id),{
                                            mtsavYetsor : [
                                                mtsavYetsor[0],
                                                mtsavYetsor[1],
                                                mtsavYetsor[2],
                                                mtsavYetsor[3],
                                                {
                                                    maoshar : aobed?.name,
                                                    res : true,
                                                    shaa : format(new Date(),'HH:mm'),
                                                    tarekh : format(new Date(),'dd-MM-yyyy')
                                                },
                                                mtsavYetsor[5]
                                            ]
                                        });
                                        setLoading(false);
                                    }} size="sm">
                                        {
                                            mtsavYetsor[4]?.res ? <div className="flex items-center text-success">מוכן<FaCheckCircle className='text-success text-xl mr-1' /></div> : 'סימון'
                                        }
                                    </Button>
                                </div>
                                {
                                    mtsavYetsor[4]?.res &&
                                    <div className="text-xs w-full flex justify-around font-extrabold mt-1">
                                        <div className="flex items-center">
                                            <div>תאריך : </div>
                                            <div className="mr-1">{mtsavYetsor[4]?.tarekh}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div>שעה : </div>
                                            <div className="mr-1">{mtsavYetsor[4]?.shaa}</div>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                        <Divider className="mt-3 mb-3" />
                        <Card className="w-full">
                            <CardBody>
                                <div className="w-full flex justify-between pr-2 pl-2 items-center">
                                    <div className="text-base text-right flex items-center">
                                        <FaSearch className="ml-2 text-xl text-primary" />בקרת איכות
                                    </div>
                                    <Button isLoading={loading} variant={mtsavYetsor[5]?.res ? "light" : 'solid'} className="w-[80px]" isDisabled={mtsavYetsor[5]?.res || !mtsavYetsor[4]?.res} onClick={async() => {
                                        setLoading(true);
                                        await updateDoc(doc(firestore,'tfaol',agla.id),{
                                            mtsavYetsor : [
                                                mtsavYetsor[0],
                                                mtsavYetsor[1],
                                                mtsavYetsor[2],
                                                mtsavYetsor[3],
                                                mtsavYetsor[4],
                                                {
                                                    maoshar : aobed?.name,
                                                    res : true,
                                                    shaa : format(new Date(),'HH:mm'),
                                                    tarekh : format(new Date(),'dd-MM-yyyy')
                                                },
                                            ]
                                        });
                                        setLoading(false);
                                    }} size="sm">
                                        {
                                            mtsavYetsor[5]?.res ? <div className="flex items-center text-success">מוכן<FaCheckCircle className='text-success text-xl mr-1' /></div> : 'סימון'
                                        }
                                    </Button>
                                </div>
                                {
                                    mtsavYetsor[5]?.res &&
                                    <div className="text-xs w-full flex justify-around font-extrabold mt-1">
                                        <div className="flex items-center">
                                            <div>תאריך : </div>
                                            <div className="mr-1">{mtsavYetsor[5]?.tarekh}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div>שעה : </div>
                                            <div className="mr-1">{mtsavYetsor[5]?.shaa}</div>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="w-full flex justify-end">
                        <Button color="warning" variant="flat" size="" onClick={disable}>
                            סגור
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}




