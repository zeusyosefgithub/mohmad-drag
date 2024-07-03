import React from "react";
import { GetTmonatHelek } from "../page";
import { differenceInDays, format } from "date-fns";
import { Divider, Input } from "@nextui-org/react";
import Image from "next/image";
import { FaRegSquare } from "react-icons/fa6";
import GetDocs from "../FireBase/getDocs";


export const SferatMlae = React.forwardRef((mlae, ref) => {
    const mlae1 = mlae?.mlae;
    const category = GetDocs('category');

    function flipDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        const flippedDateStr = `${year}-${month}-${day}`;
        return flippedDateStr;
    }

    function BdekatTarekhAdcon(val) {
        return differenceInDays(format(new Date, 'yyyy-MM-dd'), flipDate(val));
    }

    function GetShemMotsar(remez) {
        for (let index = 0; index < category.length; index++) {
            let motsareeem = category[index].motsarem;
            for (let index1 = 0; index1 < motsareeem.length; index1++) {
                if (motsareeem[index1].sog === remez) {
                    return motsareeem[index1].shem;
                }
            }
        }
    }

    return (
        <div ref={ref} className="bg-white p-10">
            <div className="flex justify-around items-center">
                <div>
                    <div className="text-right text-xs">
                        תאריך : {format(new Date, 'yyyy-MM-dd')}
                    </div>
                    <div className="text-right text-xs">
                        שעה : {format(new Date, 'HH:MM')}
                    </div>
                </div>
                <div className="text-lg font-bold text-center">
                    תופס ספירת מלאי
                </div>
            </div>
            <Divider className="mt-3 mb-3" />
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="px-4 py-2 text-center font-medium text-white text-xs">כמות בפועל</th>
                        <th className="px-4 py-2 text-center font-medium text-white  text-xs">כמות במערכת</th>
                        <th className="px-6 py-2 text-center font-medium text-white  text-xs">עדכון אחרון</th>
                        <th className="px-4 py-2 text-right font-medium text-white  text-xs">שם פריט</th>
                        <th className="px-4 py-2 text-right font-medium text-white  text-xs">שם מוצר</th>
                        <th className="px-4 py-2 text-right font-medium text-white  text-xs">מק"ט</th>
                        <th className="px-4 py-2 text-right font-medium text-white  text-xs"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mlae1?.map((item, index) => {
                            return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-200 text-[10px] border-1"></td>
                                <td className="px-4 py-2 text-center text-gray-700 dark:text-gray-200 text-[10px] border-1">{item.kmot}</td>
                                <td className="px-4 py-2 text-center text-gray-700 dark:text-gray-200 text-[10px] border-1"><div className={`rounded-lg text-white ${!item.adconAhron ? '' : BdekatTarekhAdcon(item.adconAhron) < 7 ? 'bg-success' : BdekatTarekhAdcon(item.adconAhron) >= 7 && BdekatTarekhAdcon(item.adconAhron) < 30 ? 'bg-warning' : 'bg-danger'}`}>{item.adconAhron}</div></td>
                                <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-200 text-[10px] border-1">{item.shem}</td>
                                <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-200 text-[10px] border-1">{GetShemMotsar(item.categoryMotsar)}</td>
                                <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-200 text-[10px] border-1">{item.msbar}</td>
                                <td className="border-1">
                                    <div className="group relative">
                                        <Image src={GetTmonatHelek(item.categoryMotsar)} className="h-[30px] w-[30px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%]" />
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}) 