import React, { useEffect, useState } from "react";
import './Heshvonet.css';
export const Heshvonet = React.forwardRef((props, ref) => {

    const motsarr = props?.motsar;
    const msbar = props?.msbarHeshvonet;
    const lkoh = props?.lkoh;
    const aosek = props?.aosek;

    const GetSakhHkolBerot = (indx) => {
        let sum = 0;
        const array = props?.entries;
        for (let index = 0; index < array.length; index++) {
            if(indx === index){
                sum += (array[index].kmot * parseFloat(array[index]?.mherLeheda));
            }
        }
        return sum;
    }
    
    const GetSakhHkol = () => {
        let sum = 0;
        const array = props?.entries;
        for (let index = 0; index < array.length; index++) {
            sum += (array[index].kmot * parseFloat(array[index]?.mherLeheda));
        }
        return sum;
    }

    const handleGetDigits = (number) => {
        const integerPart = Math.floor(number); // Get the integer part of the number
        const fractionalPart = (number % 1).toFixed(2).substring(2); // Get the first two digits after the decimal point
        const formatted = `${integerPart}.${fractionalPart}`; // Concatenate integer and fractional parts
        return formatted;
    };


    return (aosek !== 'בלי חשבונית') && (
        <div ref={ref} className="bg-gradient-to-r-f5 h-full">
            <div className="flex justify-end">
                <div className="w-[250px] bg-f3 mr-8 rounded-es-xl text-f4 p-2">

                    {
                        aosek === 'נגררי עירון' ?
                            <div>
                                <div className="text-center">נגררי עירון</div>
                                <div dir="rtl" className="flex items-center">
                                    <div className="text-xs text-right w-[80px]">ח.פ : </div>
                                    <div className="text-xs">516143369</div>
                                </div>
                                <div dir="rtl" className="flex items-center">
                                    <div className="text-xs text-right w-[80px]">טלפון : </div>
                                    <div className="text-xs">050-909-9989</div>
                                </div>
                            </div>
                            :
                            aosek === 'מ.כ בטיחות בע"מ' ?
                                <div>
                                    <div className="text-center">מ.כ בטיחות בע"מ</div>
                                    <div dir="rtl" className="flex items-center">
                                        <div className="text-xs text-right w-[80px]">ח.פ : </div>
                                        <div className="text-xs">516085552</div>
                                    </div>
                                    <div dir="rtl" className="flex items-center">
                                        <div className="text-xs text-right w-[80px]">טלפון : </div>
                                        <div className="text-xs">050-909-9989</div>
                                    </div>
                                </div>
                                :
                                null
                    }

                </div>
            </div>
            <div className="text-center mt-10">{props?.isNew ? props?.new?.date : motsarr?.tarekh}</div>
            <div className="text-center text-lg font-extrabold">חשבונית מס מספר {msbar}</div>
            <div className="text-center">הער נאמן למקור</div>
            <div className="mt-10">
                <div className="flex justify-end border-r-4 border-f1 mr-2 p-2">
                    <div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-sm font-bold w-[50px]">לכבוד : </div>
                            <div className="text-sm">{lkoh?.name}</div>
                        </div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-sm font-bold w-[50px]">רחוב : </div>
                            <div className="text-sm">{lkoh?.street}</div>
                        </div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-sm font-bold w-[50px]">עיר : </div>
                            <div className="text-sm">{lkoh?.city}</div>
                        </div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-sm font-bold w-[50px]">ת.ז : </div>
                            <div className="text-sm">{lkoh?.cusid}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div dir="rtl" className="p-2 mt-5">
                <div className="text-base font-extrabold">
                    שורת פירוט נושא המסמך
                </div>
                <div className="mt-5 overflow-auto h-[370px]">
                    <table className="w-full text-xs ">
                        <thead>
                            <tr className="bg-f2 sticky top-0">
                                <th className="text-right p-2">מק"ט</th>
                                <th className="text-right p-2">תיאור הפריט</th>
                                <th className="text-right p-2">כמות</th>
                                <th className="text-right p-2">מחיר ליחידה</th>
                                <th className="rounded-se-3xl text-right">סה"כ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props?.isNew ?
                                    props?.entries.map((motsar, index) => {
                                        return <tr>
                                            <td className="text-right p-2 border-f6">{index + 1}</td>
                                            <td className="text-right p-2 border-f6">מכירת {motsar?.category}</td>
                                            <td className="text-right p-2 border-f6">{motsar?.kmot}</td>
                                            <td className="text-right p-2 border-f6">{motsar?.mherLeheda}</td>
                                            <td className="text-right p-2 border-f6">{GetSakhHkolBerot(index)} ₪</td>
                                        </tr>
                                    })
                                    :
                                    <>
                                        {
                                            motsarr && <tr>
                                                <td className="text-right p-2 border-f6">1</td>
                                                <td className="text-right p-2 border-f6">{motsarr?.sogAska}</td>
                                                <td className="text-right p-2 border-f6">1</td>
                                                <td className="text-right p-2 border-f6">{motsarr?.mherMkhera}</td>
                                                <td className="text-right p-2 border-f6">{motsarr?.mherMkhera}</td>
                                            </tr>
                                        }
                                        <div className="m-1" />
                                    </>

                            }
                            {
                                props?.isNew ?
                                    <>
                                        {
                                            props?.hn7a > 0 &&
                                            <>
                                                <tr className="sticky bottom-24">
                                                    <td className="text-right p-2"></td>
                                                    <td className="text-right p-2"></td>
                                                    <td className="text-right p-2"></td>
                                                    <td className="text-right p-2 bg-[#075985] text-f4">הנחה</td>
                                                    <td className="text-right p-2 bg-[#075985] text-f4">{(props?.hn7a || 0)}</td>
                                                </tr>
                                                <tr className="sticky bottom-16">
                                                    <td className="text-right p-2"></td>
                                                    <td className="text-right p-2"></td>
                                                    <td className="text-right p-2"></td>
                                                    <td className="text-right p-2 bg-[#075985] text-f4">סה"כ אחרי הנחה</td>
                                                    <td className="text-right p-2 bg-[#075985] text-f4">{(GetSakhHkol() - (props?.hn7a || 0))}</td>
                                                </tr>
                                            </>

                                        }
                                        <tr className="sticky bottom-8">
                                            <td className="text-right p-2"></td>
                                            <td className="text-right p-2"></td>
                                            <td className="text-right p-2"></td>
                                            <td className="text-right p-2 bg-[#075985] text-f4">מע"מ</td>
                                            <td className="text-right p-2 bg-[#075985] text-f4">{handleGetDigits((GetSakhHkol() - (props?.hn7a || 0)) * 0.17)} ₪</td>
                                        </tr>
                                        <tr className="sticky bottom-0">
                                            <td className="text-right p-2"></td>
                                            <td className="text-right p-2"></td>
                                            <td className="text-right p-2 "></td>
                                            <td className="text-right p-2 bg-[#075985] text-f4 rounded-es-2xl font-extrabold">סה"כ לתשלום</td>
                                            <td className="text-right p-2 bg-[#075985] text-f4 rounded-ee-2xl">{handleGetDigits((GetSakhHkol() - (props?.hn7a || 0)) + ((GetSakhHkol() - (props?.hn7a || 0)) * 0.17))} ₪</td>
                                        </tr>
                                    </>
                                    :
                                    <tr className="sticky bottom-0">
                                        <td className="text-right p-2"></td>
                                        <td className="text-right p-2"></td>
                                        <td className="text-right p-2 bg-[#075985] text-f4 rounded-es-2xl">סה"כ</td>
                                        <td className="text-right p-2 bg-[#075985] text-f4"></td>
                                        <td className="text-right p-2 bg-[#075985] text-f4 rounded-ee-2xl">{motsarr?.mherMkhera} ₪</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-40"></div>
        </div>
    )
})

