import React, { useEffect, useState } from "react";
import './Heshvonet.css';
import { format } from "date-fns";
import { Divider } from "@nextui-org/react";
export const TofsTokhnetYetsor = React.forwardRef((props, ref) => {

    return (
        <div ref={ref} className="bg-white p-10">
            <div className="flex items-center w-full">
                <div className="w-full">

                </div>
                <div className="text-lg font-bold max-w-1/3 w-full text-center">
                    תופס תוכנית יצור
                </div>
            </div>
            <Divider className="mt-3 mb-3" />
            <div className="flex justify-around">
                <div className="text-right text-base">
                    תאריך : {format(new Date, 'yyyy-MM-dd')}
                </div>
                <div className="text-right text-base">
                    שעה : {format(new Date, 'HH:MM')}
                </div>
                <div className="text-right text-base">
                    לקוח : {props?.brtem?.shemLkoh}
                </div>
                <div className="text-right text-base">
                    סוג : עגלה {props?.brtem?.sogAgla}
                </div>
                <div className="text-right text-base">
                    מס : {props?.brtem?.msbar}
                </div>
            </div>
            <Divider className="mt-3 mb-3" />
            <div dir="rtl">
                <div className="font-bold text-xl border-b-2 border-black mb-2 w-fit">שלדה</div>
                <div className="flex items-center">
                    <div className="text-base flex items-center">
                        אורך עגלה : <div className="font-bold mr-1 ml-1">{props?.brtem?.tokhnetYetsor?.aorkh}</div>
                    </div>
                    ,
                    <div className="text-base flex items-center mr-1">
                        רוחב עגלה : <div className="font-bold mr-1 ml-1">{props?.brtem?.tokhnetYetsor?.rohf}</div>
                    </div>
                </div>
            </div>
            <div dir="rtl">
                <Divider className="w-[300px] mt-2 mb-2" />
            </div>
            <div dir="rtl">
                <div className="flex items-center">
                    <div className="text-base flex items-center">
                        רצפה : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.retsba1}"</div>
                    </div>
                    ,
                    <div className="text-base flex items-center mr-1">
                        ספוילר : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.sboeler}"</div>
                    </div>
                </div>
            </div>
            <div dir="rtl">
                <Divider className="w-[300px] mt-2 mb-2" />
            </div>
            <div dir="rtl">
                <div className="flex items-center">
                    <div className="text-base flex items-center">
                        מסגרת חלוקה : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.sheldaHetsonet}"</div>
                    </div>
                    ,
                    <div className="text-base flex items-center mr-1">
                        חלוקת שלדה : <div className="font-bold mr-1 ml-1">{props?.brtem?.Brofelem?.hlokatSheldaA} יח'</div>
                    </div>
                    <div className="text-base flex items-center mr-1">
                        <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.hlokatSheldaAShem}"</div>
                    </div>
                    {
                        props?.brtem?.tokhnetYetsor?.helkBetBnmet &&
                        <>
                            ו-
                            <div className="text-base flex items-center mr-1">
                                <div className="font-bold mr-1 ml-1">{props?.brtem?.Brofelem?.hlokatSheldaB} יח'</div>
                            </div>
                            <div className="text-base flex items-center mr-1">
                                <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.hlokatSheldaBShem}"</div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div dir="rtl">
                <Divider className="w-[300px] mt-2 mb-2" />
            </div>
            <div dir="rtl">
                <div className="flex items-center">
                    <div className="text-base flex items-center">
                        יצול : <div className="font-bold mr-1 ml-1">אורך {props?.brtem?.tokhnetYetsor?.aorkhBrofel} מ'</div>
                    </div>
                    <div className="text-base flex items-center mr-1">
                        <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.yetsolShem}"</div>
                    </div>
                </div>
            </div>
            <div dir="rtl">
                <div className="font-bold text-xl border-b-2 border-black mb-2 w-fit mt-5">השלמה</div>
                <div className="flex items-center">
                    <div className="text-base flex items-center">
                        חזית : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.hzet}"</div>
                    </div>
                    ,
                    <div className="text-base flex items-center mr-1">
                        דופן : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.dofn}"</div>
                    </div>
                    {
                        props?.brtem?.tokhnetYetsor?.aemRmbaAoRgel === 'רגיל' && <>
                            ,
                            <div className="text-base flex items-center mr-1">
                                דלת : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.delet}"</div>
                            </div>
                        </>
                    }
                </div>
            </div>
            {
                props?.brtem?.tokhnetYetsor?.aemRmbaAoRgel === 'רמפה' && <>
                    <div dir="rtl">
                        <Divider className="w-[300px] mt-2 mb-2" />
                    </div>
                    <div dir="rtl">
                        <div className="flex items-center">
                            <div className="text-base flex items-center">
                                אורך רמפה : <div className="font-bold mr-1 ml-1">{props?.brtem?.tokhnetYetsor?.aorkhRmbaMsgertRmba} מ'</div>
                            </div>
                            <div className="text-base flex items-center mr-1">
                                ומסגרת רמפה : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.msgeretRmba}"</div>
                            </div>
                            <div className="text-base flex items-center mr-1">
                                וחלוקת רמפה : <div className="font-bold mr-1 ml-1">{props?.brtem?.tokhnetYetsor?.msbarBrofelemHlokatRmba} יח'</div>
                            </div>
                            <div className="text-base flex items-center mr-1">
                                <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.hlokatRmba}"</div>
                            </div>
                            {
                                props?.brtem?.tokhnetYetsor?.tosftVnel &&
                                <div className="text-base flex items-center mr-1">
                                    ותוספת וניל : <div className="font-bold mr-1 ml-1">"{props?.brtem?.Brofelem?.tosefetVnel}"</div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }

        </div>
    )
})

