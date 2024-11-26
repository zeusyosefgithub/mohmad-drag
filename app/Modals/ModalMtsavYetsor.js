'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Pagination, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip, DatePicker, Accordion, AccordionItem, Popover, PopoverTrigger, PopoverContent, Textarea, Progress, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaRegCheckSquare, FaSearch } from "react-icons/fa";
import GetDocs from "../FireBase/getDocs";
import { useAuth } from "../auth/authContext";
import { GrPlan } from "react-icons/gr";
import { PiTreeStructureFill } from "react-icons/pi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { GiPaintBucket } from "react-icons/gi";
import { MdOutlineElectricalServices } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { format } from "date-fns";

export default function ModalMtsavYetsor({ show, disable, res, isNehol, agla }) {

    const [newRes, setNewRes] = useState([]);
    const { signUp, signIn, signOutt, currentUser } = useAuth();

    useEffect(() => {
        setNewRes(res);
    }, [res])

    const GetTooltip = (masher, tarekh, shaa, berotMtsav, shemMtsav) => {
        return <Tooltip placement='bottom' closeDelay={100} content={
            <div className="px-1 py-2 w-[200px]">
                <div dir="rtl" className="w-full flex items-center">
                    <div className="w-[70px]">אושר ע"י : </div>
                    <div className="mr-1 font-bold">{masher}</div>
                </div>
                <div dir="rtl" className="w-full flex items-center">
                    <div className="w-[70px]">תאריך : </div>
                    <div className="mr-1 font-bold">{tarekh}</div>
                </div>
                <div dir="rtl" className="w-full flex items-center">
                    <div className="w-[70px]">שעה : </div>
                    <div className="mr-1 font-bold">{shaa}</div>
                </div>
                <Divider className="m-2" />
                <div className="text-xs" dir="rtl">
                    {berotMtsav}
                </div>
            </div>
        }>
            <div className="text-white text-center font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-success-300 flex items-center justify-center">
                {shemMtsav}
            </div>
        </Tooltip>
    }

    const admins = GetDocs('admins');
    const bdekatTafked = () => {
        for (let index = 0; index < admins.length; index++) {
            if (currentUser?.email === admins[index].email) {
                return admins[index];
            }
        }
    }
    const aobed = bdekatTafked();
    const [mtsavYetsor, setMtsavYetsor] = useState([]);

    useEffect(() => {
        setMtsavYetsor(agla?.mtsavYetsor);
    }, [agla?.mtsavYetsor]);

    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    const [loading5, setLoading5] = useState(false);



    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="3xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <ModalHeader className="flex justify-center border-b-2">
                    מצב ייצור
                </ModalHeader>
                <ModalBody className="border-b-2">
                    {
                        isNehol ?
                            <div dir="rtl" className="mb-3">
                                <Card className="w-full">
                                    <CardBody>
                                        <div className="w-full flex justify-between pr-2 pl-2 items-center">
                                            <div className="text-base text-right flex items-center">
                                                <GrPlan className="ml-2 text-xl text-primary" />תכנון
                                            </div>
                                            <Button isLoading={loading} variant='flat' className="w-[80px]" isDisabled={mtsavYetsor[1]?.res} onClick={async () => {
                                                setLoading(true);
                                                if (mtsavYetsor[0]?.res) {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            {
                                                                maoshar: '',
                                                                res: false,
                                                                shaa: '',
                                                                tarekh: ''
                                                            },
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
                                                else {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            {
                                                                maoshar: aobed?.name,
                                                                res: true,
                                                                shaa: format(new Date(), 'HH:mm'),
                                                                tarekh: format(new Date(), 'dd-MM-yyyy')
                                                            },
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
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
                                            <Button isLoading={loading1} variant='flat' className="w-[80px]" isDisabled={!mtsavYetsor[0]?.res || mtsavYetsor[2]?.res} onClick={async () => {
                                                setLoading1(true);
                                                if (mtsavYetsor[1]?.res) {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            {
                                                                maoshar: '',
                                                                res: false,
                                                                shaa: '',
                                                                tarekh: ''
                                                            },
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });

                                                }
                                                else {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            {
                                                                maoshar: aobed?.name,
                                                                res: true,
                                                                shaa: format(new Date(), 'HH:mm'),
                                                                tarekh: format(new Date(), 'dd-MM-yyyy')
                                                            },
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }

                                                setLoading1(false);
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
                                            <Button isLoading={loading2} variant='flat' className="w-[80px]" isDisabled={!mtsavYetsor[1]?.res || mtsavYetsor[3]?.res} onClick={async () => {
                                                setLoading2(true);
                                                if (mtsavYetsor[2]?.res) {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            {
                                                                maoshar: '',
                                                                res: false,
                                                                shaa: '',
                                                                tarekh: ''
                                                            },
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
                                                else {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            {
                                                                maoshar: aobed?.name,
                                                                res: true,
                                                                shaa: format(new Date(), 'HH:mm'),
                                                                tarekh: format(new Date(), 'dd-MM-yyyy')
                                                            },
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
                                                setLoading2(false);
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
                                            <Button isLoading={loading3} variant='flat' className="w-[80px]" isDisabled={!mtsavYetsor[2]?.res || mtsavYetsor[4]?.res} onClick={async () => {
                                                setLoading3(true);
                                                if (mtsavYetsor[3]?.res) {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            {
                                                                maoshar: '',
                                                                res: false,
                                                                shaa: '',
                                                                tarekh: ''
                                                            },
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
                                                else {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            {
                                                                maoshar: aobed?.name,
                                                                res: true,
                                                                shaa: format(new Date(), 'HH:mm'),
                                                                tarekh: format(new Date(), 'dd-MM-yyyy')
                                                            },
                                                            mtsavYetsor[4],
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
                                                setLoading3(false);
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
                                            <Button isLoading={loading4} variant='flat' className="w-[80px]" isDisabled={!mtsavYetsor[3]?.res || mtsavYetsor[5]?.res} onClick={async () => {
                                                setLoading4(true);
                                                if (mtsavYetsor[4]?.res) {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            {
                                                                maoshar: '',
                                                                res: false,
                                                                shaa: '',
                                                                tarekh: ''
                                                            },
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
                                                else {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            {
                                                                maoshar: aobed?.name,
                                                                res: true,
                                                                shaa: format(new Date(), 'HH:mm'),
                                                                tarekh: format(new Date(), 'dd-MM-yyyy')
                                                            },
                                                            mtsavYetsor[5]
                                                        ]
                                                    });
                                                }
                                                setLoading4(false);
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
                                            <Button isLoading={loading5} variant='flat' className="w-[80px]" isDisabled={!mtsavYetsor[4]?.res} onClick={async () => {
                                                setLoading5(true);
                                                if (mtsavYetsor[5]?.res) {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            {
                                                                maoshar: '',
                                                                res: false,
                                                                shaa: '',
                                                                tarekh: ''
                                                            },
                                                        ],
                                                        shlavYetsor: true
                                                    });
                                                }
                                                else {
                                                    await updateDoc(doc(firestore, 'tfaol', agla.id), {
                                                        mtsavYetsor: [
                                                            mtsavYetsor[0],
                                                            mtsavYetsor[1],
                                                            mtsavYetsor[2],
                                                            mtsavYetsor[3],
                                                            mtsavYetsor[4],
                                                            {
                                                                maoshar: aobed?.name,
                                                                res: true,
                                                                shaa: format(new Date(), 'HH:mm'),
                                                                tarekh: format(new Date(), 'dd-MM-yyyy')
                                                            },
                                                        ],
                                                        shlavYetsor: true
                                                    });
                                                }
                                                setLoading5(false);
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
                            :
                            <div className="w-full flex justify-center items-center mt-10 mb-10">

                                {
                                    res?.f?.res ?
                                        <>
                                            {GetTooltip(res?.f?.maoshar, res?.f?.tarekh, res?.f?.shaa, res?.f?.maoshar, 'בקרת איכות')}
                                        </>
                                        :
                                        <>
                                            <div className="text-white text-[16px] text-center font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                                בקרת איכות
                                            </div>
                                            {
                                                !res?.e?.res && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                            }
                                        </>
                                }
                                {
                                    res?.e?.res ?
                                        <>
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            <FaRegCheckSquare className="text-success-300 text-2xl" />
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            {GetTooltip(res?.e?.maoshar, res?.e?.tarekh, res?.e?.shaa, res?.e?.maoshar, 'חשמל')}
                                        </>
                                        :
                                        <>
                                            <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                                חשמל
                                            </div>
                                            {
                                                !res?.d?.res && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                            }
                                        </>
                                }
                                {
                                    res?.d?.res ?
                                        <>
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            <FaRegCheckSquare className="text-success-300 text-2xl" />
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            {GetTooltip(res?.d?.maoshar, res?.d?.tarekh, res?.d?.shaa, res?.d?.maoshar, 'צבע')}
                                        </>
                                        :
                                        <>
                                            <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                                צבע
                                            </div>
                                            {
                                                !res?.c?.res && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                            }
                                        </>
                                }
                                {
                                    res?.c?.res ?
                                        <>
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            <FaRegCheckSquare className="text-success-300 text-2xl" />
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            {GetTooltip(res?.c?.maoshar, res?.c?.tarekh, res?.c?.shaa, res?.c?.maoshar, 'השלמה')}
                                        </>
                                        :
                                        <>
                                            <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                                השלמה
                                            </div>
                                            {
                                                !res?.b?.res && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                            }
                                        </>
                                }
                                {
                                    res?.b?.res ?
                                        <>
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            <FaRegCheckSquare className="text-success-300 text-2xl" />
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            {GetTooltip(res?.b?.maoshar, res?.b?.tarekh, res?.b?.shaa, res?.b?.maoshar, 'שלדה')}
                                        </>
                                        :
                                        <>
                                            <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                                שלדה
                                            </div>
                                            {
                                                !res?.a?.res && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                            }
                                        </>
                                }
                                {
                                    res?.a?.res ?
                                        <>
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            <FaRegCheckSquare className="text-success-300 text-2xl" />
                                            <Divider className="w-[13px] h-[10px] bg-success-300" />
                                            {GetTooltip(res?.a?.maoshar, res?.a?.tarekh, res?.a?.shaa, res?.a?.maoshar, 'תכנון')}

                                        </>
                                        :
                                        <>
                                            <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                                תכנון
                                            </div>
                                        </>
                                }





                            </div>
                    }

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


