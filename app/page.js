'use client';
import React from "react";
import { Button, Checkbox, CheckboxGroup, Input, Switch } from "@nextui-org/react";
import { useState } from "react";
import ModalCreate from "./Modals/ModalCreate";
import ModalTokhnetYetsor from "./Modals/ModalTokhnetYetsor";

export default function Home() {

  const [long, setLong] = useState('');

  const [ladder, setLadder] = useState(false);
  const [ramba, setRamba] = useState(false);


  const [showModalCreate,setShowModalCreate] = useState(false);
  const [showModalCreateTokhnetYetsor,setShowModalCreateTokhnetYetsor] = useState(false);

  return (
    <div>
      {<ModalCreate show={showModalCreate} disable={() => setShowModalCreate(false)}/>}
      {<ModalTokhnetYetsor show={showModalCreateTokhnetYetsor} disable={() => setShowModalCreateTokhnetYetsor(false)}/>}
      <div className="flex justify-around">
        <Button color="danger" onClick={() => setShowModalCreate(true)}>הוספה</Button>
        <Button color="primary" onClick={() => setShowModalCreateTokhnetYetsor(true)}>הוספת תוכנית יצור</Button>
      </div>
      <div className='flex justify-between items-center mt-20 mr-20 ml-20'>
        <div>
          <div className="flex flex-col w-full max-w-4xl mx-auto mb-20">
            <div className="text-center text-2xl">
              התראות
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">זמן נשאר</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סכום</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סוג התראה</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם התראה</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">3 ימים</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">16-05-2024</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">1400</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">חוב</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תשלום ארנונה</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-4xl mx-auto">
            <div className="text-center text-2xl">
              שעות עבודה
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">סכום שעות</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">יצאה</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">כניסה</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">תאריך</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">שם עובד</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">מספר עובד</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">8</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">16:00</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">07:00</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">04-05-2024</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">אימן</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">4</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col w-full max-w-4xl mx-auto">
            <div className="text-center text-2xl">
              מצב הצעה (A)
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
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">A</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">13</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-4xl mx-auto mt-20">
            <div className="text-center text-2xl">
              מצב המתנה (B)
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
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">B</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">13</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-4xl mx-auto mt-20">
            <div className="text-center text-2xl">
              מצב ייצור (C)
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
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">C</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">13</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">תמונה</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
