'use client';
import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { FaArrowUp } from "react-icons/fa";


export default function Sales() {

    const [entries, setEntries] = useState([{ name: '', amount: '', price: '' }]);

    return (
        <div>

            <div className='flex justify-between items-center mt-20 mr-20 ml-20'>
                <div>
                    <div className="flex flex-col w-full max-w-4xl mx-auto">
                    <div className="text-center text-2xl">
                            מצב סיום (D)
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">זמן עבר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תחילת תהליך</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך תחילה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סוג עסקה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מצב עסקה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר מכירה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">זמן נוכחי - תחילת תהליך שעבר</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">15:06</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">14-05-2024</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תיקון עגלה</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">D</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">13</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full max-w-4xl mx-auto mt-20">
                    <div className="text-center text-2xl">
                            מצב מכר (E)
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">זמן עבר</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תחילת תהליך</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך תחילה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סוג עסקה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מצב עסקה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר מכירה</th>
                                        <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">זמן נוכחי - תחילת תהליך שעבר</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">11:22</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">14-05-2024</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תיקון עגלה</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">E</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">13</td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>


            <div className='flex justify-between items-center mr-20 ml-20'>
                <div className="flex justify-center m-20 max-w-[800px]">
                  
                </div>
            </div>
        </div>
    )
}