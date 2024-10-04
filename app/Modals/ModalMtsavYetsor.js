'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";

export default function ModalMtsavYetsor({ show, disable, res }) {

    const GetTooltip = (masher,tarekh,shaa,berotMtsav,shemMtsav) => {
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
                <Divider className="m-2"/>
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

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="3xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <ModalHeader className="flex justify-center border-b-2">
                    מצב ייצור
                </ModalHeader>
                <ModalBody className="border-b-2">
                    <div className="w-full flex justify-center items-center mt-10 mb-10">

                        {
                            res?.f ?
                                <>
                                    {GetTooltip('aws','20-02-2024','20:50','ttttttttt','בקרת איכות')}
                                </>
                                :
                                <>
                                    <div className="text-white text-[16px] text-center font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                        בקרת איכות
                                    </div>
                                    {
                                        !res?.e && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                    }
                                </>
                        }
                        {
                            res?.e ?
                                <>
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    <FaRegCheckSquare className="text-success-300 text-2xl" />
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    {GetTooltip('aws','20-02-2024','20:50','ttttttttt','חשמל')}
                                </>
                                :
                                <>
                                    <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                        חשמל
                                    </div>
                                    {
                                        !res?.d && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                    }
                                </>
                        }
                        {
                            res?.d ?
                                <>
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    <FaRegCheckSquare className="text-success-300 text-2xl" />
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    {GetTooltip('aws','20-02-2024','20:50','ttttttttt','צבע')}
                                </>
                                :
                                <>
                                    <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                        צבע
                                    </div>
                                    {
                                        !res?.c && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                    }
                                </>
                        }
                        {
                            res?.c ?
                                <>
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    <FaRegCheckSquare className="text-success-300 text-2xl" />
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    {GetTooltip('aws','20-02-2024','20:50','ttttttttt','השלמה')}
                                </>
                                :
                                <>
                                    <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                        השלמה
                                    </div>
                                    {
                                        !res?.b && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                    }
                                </>
                        }
                        {
                            res?.b ?
                                <>
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    <FaRegCheckSquare className="text-success-300 text-2xl" />
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    {GetTooltip('aws','20-02-2024','20:50','ttttttttt','שלדה')}
                                </>
                                :
                                <>
                                    <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                        שלדה
                                    </div>
                                    {
                                        !res?.a && <Divider className="w-[50px] h-[10px] bg-primary opacity-20" />
                                    }
                                </>
                        }
                        {
                            res?.a ?
                                <>
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    <FaRegCheckSquare className="text-success-300 text-2xl" />
                                    <Divider className="w-[13px] h-[10px] bg-success-300" />
                                    {GetTooltip('aws','20-02-2024','20:50','ttttttttt','תכנון')}

                                </>
                                :
                                <>
                                    <div className="text-white font-semibold tracking-widest w-[80px] h-[80px] rounded-full bg-primary opacity-20 flex items-center justify-center">
                                        תכנון
                                    </div>
                                </>
                        }





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


