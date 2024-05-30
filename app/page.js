'use client';
import React, { useEffect } from "react";
import { Button, Checkbox, CheckboxGroup, Input, Modal, Switch } from "@nextui-org/react";
import { useState } from "react";
import ModalCreate from "./Modals/ModalCreate";
import ModalTokhnetYetsor from "./Modals/ModalTokhnetYetsor";
import { useGetDataByCondition } from "./FireBase/getDataByCondition";
import ModalYetsorMtsavem from "./Modals/ModalYetsorMtsavem";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "./FireBase/firebase";







export default function Home() {

  const [long, setLong] = useState('');

  const [ladder, setLadder] = useState(false);
  const [ramba, setRamba] = useState(false);


  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalCreateTokhnetYetsor, setShowModalCreateTokhnetYetsor] = useState(false);


  const aglotA = useGetDataByCondition('tfaol', 'sogBaola', '==', 'A');
  const aglotB = useGetDataByCondition('tfaol', 'sogBaola', '==', 'B');
  const aglotC = useGetDataByCondition('tfaol', 'sogBaola', '==', 'C');

  const [showModalYetsorMatsav, setShowModalYetsorMatsav] = useState(false);
  const [tfaolAgla, setTfaolAgla] = useState({});
  const [lkoh, setLkoh] = useState();
  const [msbarLkoh, setMsbarLkoh] = useState();


  const fetchCustomerData = async (customerId) => {
    try {
      const customersRef = collection(firestore, 'customers');
      const q = query(customersRef, where("idnum", "==", customerId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming customerId is unique, return the first document found
        setLkoh({ ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id });
      } else {
        setLkoh(null);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      setLkoh(null);
    }
  };

  useEffect(() => {
    if (msbarLkoh) {
      fetchCustomerData(msbarLkoh);
      console.log(1);
    }
  }, [msbarLkoh]);

  useEffect(() => {
    if (lkoh && lkoh.id) {
      const unsub = onSnapshot(doc(firestore, 'customers', lkoh.id), (doc) => {
        if (doc.exists()) {
          setLkoh({ ...doc.data(), id: doc.id });
          console.log(22);
        } else {
          setLkoh(null);
          console.log(23);
        }
      });
      return () => unsub();
    }
  }, [lkoh?.id]);

  useEffect(() => {
    if (tfaolAgla && tfaolAgla.id) {
      const unsub = onSnapshot(doc(firestore, 'tfaol', tfaolAgla.id), (doc) => {
        if (doc.exists()) {
          setTfaolAgla({ ...doc.data(), id: doc.id });
          console.log(222);
        } else {
          setLkoh(null);
          console.log(233);
        }
      });
      return () => unsub();
    }
  }, [tfaolAgla?.id]);

  return (
    <div>
      {<ModalCreate show={showModalCreate} disable={() => setShowModalCreate(false)} />}
      {/* {<ModalTokhnetYetsor show={showModalCreateTokhnetYetsor} disable={() => setShowModalCreateTokhnetYetsor(false)} />} */}
      {<ModalCreate lkohTfaol={lkoh} agla={tfaolAgla} show={showModalYetsorMatsav} disable={() => setShowModalYetsorMatsav(false)} />}
      <div className="flex justify-around">
        <Button color="danger" onClick={() => setShowModalCreate(true)}>הוספה</Button>
        <Button color="primary" onClick={() => setShowModalCreateTokhnetYetsor(true)}>הוספת תוכנית יצור</Button>
      </div>
      <div className='flex justify-between items-center mt-20 mr-20 ml-20 mb-56'>
        <div>
          <div className="flex flex-col w-full max-w-4xl mx-auto mb-20">
            <div className="text-center text-2xl">
              התראות
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-3 text-center font-medium text-black">זמן נשאר</th>
                    <th className="px-4 py-3 text-center font-medium text-black">תאריך</th>
                    <th className="px-4 py-3 text-center font-medium text-black">סכום</th>
                    <th className="px-4 py-3 text-center font-medium text-black">סוג התראה</th>
                    <th className="px-4 py-3 text-center font-medium text-black">שם התראה</th>
                    <th className="px-4 py-3 text-center font-medium text-black"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">3 ימים</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">16-05-2024</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">1400</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">חוב</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">תשלום ארנונה</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">תמונה</td>
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
                    <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">סכום שעות</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">יצאה</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">כניסה</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">תאריך</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">שם עובד</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">מספר עובד</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">8</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">16:00</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">07:00</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">04-05-2024</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">אימן</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">4</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">תמונה</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col w-full max-w-4xl mx-auto mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
            <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
             הצעה
            </div>
            <div className="overflow-x-auto h-[400px]">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">זמן עבר</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">תחילת תהליך</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תאריך תחילה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">סוג עסקה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">מצב עסקה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מספר מכירה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    aglotA.map((agla, index) => {
                      return <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">הצעה</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-4xl mx-auto mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
            <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
             המתנה
            </div>
            <div className="overflow-x-auto h-[400px]">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">זמן עבר</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">תחילת תהליך</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תאריך תחילה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">סוג עסקה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">מצב עסקה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מספר מכירה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    aglotB.map((agla, index) => {
                      return <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => { setTfaolAgla(agla); setShowModalYetsorMatsav(true); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">המתנה</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-4xl mx-auto mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
            <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
             ייצור
            </div>
            <div className="overflow-x-auto h-[400px]">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">זמן עבר</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">תחילת תהליך</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">תאריך תחילה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">סוג עסקה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">מצב עסקה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מספר מכירה</th>
                    <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    aglotC.map((agla, index) => {
                      return <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">ייצור</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
