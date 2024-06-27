import React, { useEffect, useState } from "react";
import './Heshvonet.css';
export const Kbala = React.forwardRef((props, ref) => {

    const motsarr = props?.motsar;
    const lkoh = props?.lkoh;
    
    const GetSakhHkol = () => {
        let sum = 0;
        const array = props?.shekem;
        for (let index = 0; index < array.length; index++) {
            sum += parseFloat(array[index].skhom);
        }
        return sum;
    }

    const formatNumberWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
    

    const handleGetDigits = (number) => {
        const integerPart = Math.floor(number);
        const fractionalPart = (number % 1).toFixed(2).substring(2);
        const formatted = `${integerPart}.${fractionalPart}`; 
        return formatted;
    };

    return (
        <div ref={ref} className="bg-gradient-to-r-f5 h-full">
            <div className="flex justify-end">
                <div className="w-[250px] bg-f3 mr-8 rounded-es-xl text-f4 p-2">
                    <div>
                        <div className="text-center">נגררי עירון</div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-xs text-right w-[80px]">עוסק מורשה : </div>
                            <div className="text-xs">2</div>
                        </div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-xs text-right w-[80px]">טלפון : </div>
                            <div className="text-xs">2</div>
                        </div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-xs text-right w-[80px]">פקס : </div>
                            <div className="text-xs">2</div>
                        </div>
                        <div dir="rtl" className="flex items-center">
                            <div className="text-xs text-right w-[80px]">דוא"ל : </div>
                            <div className="text-xs">2</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-10">{props?.isNew ? props?.new?.date : motsarr?.tarekh}</div>
            <div className="text-center text-lg font-extrabold">קבלת מס מספר {props?.isNew ? props?.new?.counter?.count : motsarr?.msbar}</div>
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
                <div className="mt-5">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="bg-f2">
                                <th className="text-right p-2">מספר שיק</th>
                                <th className="text-right p-2">מספר בנק</th>
                                <th className="text-right p-2">שם בנק </th>
                                <th className="text-right p-2">מספר חשבון בנק </th>
                                <th className="text-right p-2">תאריך פרעון</th>
                                <th className="rounded-se-3xl text-right">סכום</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.shekem && props?.shekem?.map((shek, idx) => {
                                    return <tr>
                                        <td className="text-right p-2 border-f6">{shek?.msbarShek}</td>
                                        <td className="text-right p-2 border-f6">{shek?.msbarBank}</td>
                                        <td className="text-right p-2 border-f6">{shek?.shemBank}</td>
                                        <td className="text-right p-2 border-f6">{shek?.msbarHeshvonBank}</td>
                                        <td className="text-right p-2 border-f6">{shek?.tarekhBeraon}</td>
                                        <td className="text-right p-2 border-f6">{formatNumberWithCommas(shek?.skhom)}</td>
                                    </tr>
                                })
                            }
                            <tr>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2 bg-[#075985] text-f4">סה"כ צקים</td>
                                <td className="text-right p-2 bg-[#075985] text-f4">{formatNumberWithCommas(props?.shekem?.length)}</td>
                            </tr>
                            <tr>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2 bg-[#075985] text-f4">מזומן</td>
                                <td className="text-right p-2 bg-[#075985] text-f4">{formatNumberWithCommas(props?.kesefMezoman)} ₪</td>
                            </tr>
                            <tr>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2 bg-[#075985] text-f4">ניכוי במקור</td>
                                <td className="text-right p-2 bg-[#075985] text-f4">1</td>
                            </tr>
                            <tr>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2"></td>
                                <td className="text-right p-2 "></td>
                                <td className="text-right p-2 bg-[#075985] text-f4 rounded-es-2xl font-extrabold">סה"כ לתשלום</td>
                                <td className="text-right p-2 bg-[#075985] text-f4 rounded-ee-2xl">{formatNumberWithCommas(GetSakhHkol() + props?.kesefMezoman)} ₪</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
})






