'use client';
import React, { useEffect } from "react";
import { Avatar, Button, Checkbox, CheckboxGroup, Input, Modal, Switch } from "@nextui-org/react";
import { useState } from "react";
import ModalCreate from "./Modals/ModalCreate";
import ModalTokhnetYetsor from "./Modals/ModalTokhnetYetsor";
import { useGetDataByCondition } from "./FireBase/getDataByCondition";
import ModalYetsorMtsavem from "./Modals/ModalYetsorMtsavem";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "./FireBase/firebase";
import rep1 from './../images/rep1.png';
import rep2 from '../images/rep2.jpg';
import rep3 from '../images/rep3.png';
import rep4 from '../images/rep4.png';
import rep5 from '../images/rep5.jpg';
import rep6 from '../images/rep6.png';
import rep7 from '../images/rep7.png';
import rep8 from '../images/rep8.jpg';
import rep9 from '../images/rep9.jpg';
import rep10 from '../images/rep10.jpg';
import rep11 from './../images/rep11.jpg';
import rep12 from '../images/rep12.jpg';
import rep13 from '../images/rep13.jpg';
import rep14 from '../images/rep14.jpg';
import rep15 from '../images/rep15.jpg';
import rep16 from '../images/rep16.jpg';
import rep17 from '../images/rep17.jpg';
import rep18 from '../images/rep18.jpg';
import rep19 from '../images/rep19.png';
import rep20 from '../images/rep20.png';
import rep21 from './../images/rep21.jpg';
import rep22 from '../images/rep22.jpg';
import rep23 from '../images/rep23.png';
import rep24 from '../images/rep24.png';
import rep25 from '../images/rep25.png';
import rep26 from '../images/rep26.png';
import rep27 from '../images/rep27.jpg';
import rep28 from '../images/rep28.jpeg';
import rep29 from '../images/rep29.png';
import rep30 from '../images/rep30.jpg';
import rep31 from './../images/rep31.png';
import rep32 from '../images/rep32.jpeg';
import rep33 from '../images/rep33.png';
import rep34 from '../images/rep34.png';
import rep35 from '../images/rep35.png';
import rep36 from '../images/rep36.png';
import rep37 from '../images/rep37.jpg';
import rep38 from '../images/rep38.png';
import rep39 from '../images/rep39.png';
import rep40 from '../images/rep40.jpeg';
import rep41 from './../images/rep41.jpg';
import rep42 from './../images/rep42.jpg';
import rep43 from '../images/rep43.png';
import rep44 from '../images/rep44.png';
import rep45 from '../images/rep45.png';
import rep46 from '../images/rep46.png';
import rep47 from '../images/rep47.jpg';
import rep48 from '../images/rep48.jpg';
import rep49 from '../images/rep49.jpg';
import rep50 from '../images/rep50.png';
import rep51 from './../images/rep51.png';
import rep52 from './../images/rep52.jpg';
import rep53 from '../images/rep53.jpeg';
import rep54 from '../images/rep54.png';
import rep55 from '../images/rep55.jpg';
import rep56 from '../images/rep56.png';
import rep57 from '../images/rep57.png';
import rep58 from '../images/rep58.png';
import rep59 from '../images/rep59.png';
import rep60 from '../images/rep60.png';
import rep61 from './../images/rep61.jpg';
import rep62 from './../images/rep62.jpg';
import rep63 from '../images/rep63.png';
import rep64 from '../images/rep64.png';
import rep65 from '../images/rep65.png';
import rep66 from '../images/rep66.png';
import rep67 from '../images/rep67.jpg';
import rep68 from '../images/rep68.png';
import rep69 from '../images/rep69.jpg';
import rep70 from '../images/rep70.png';
import rep71 from './../images/rep71.png';
import rep72 from './../images/rep72.jpg';
import rep73 from '../images/rep73.png';
import rep74 from '../images/rep74.png';
import rep75 from '../images/rep75.png';
import rep76 from '../images/rep76.jpg';
import rep77 from '../images/rep77.jpg';
import rep78 from '../images/rep78.png';

import Image from "next/image";



export function GetTmonatHelek(remez) {
  if (remez === 'C1') {
    return rep42;
  }
  else if (remez === 'C2') {
    return rep16;
  }
  else if (remez === 'C3') {
    return rep18;
  }
  else if (remez === 'C4') {
    return rep70;
  }
  else if (remez === 'C5') {
    return rep24;
  }
  else if (remez === 'C6') {
    return rep27;
  }
  else if (remez === 'C7') {
    return rep31;
  }
  else if (remez === 'C8') {
    return rep29;
  }
  else if (remez === 'C9') {
    return rep69;
  }
  else if (remez === 'C10') {
    return rep46;
  }
  else if (remez === 'C11') {
    return rep76;
  }
  else if (remez === 'A1') {
    return rep35;
  }
  else if (remez === 'A2') {
    return rep36;
  }
  else if (remez === 'A3') {
    return rep20;
  }
  else if (remez === 'A4') {
    return rep48;
  }
  else if (remez === 'A5') {
    return rep37;
  }
  else if (remez === 'A6') {
    return rep45;
  }
  else if (remez === 'A7') {
    return rep17;
  }
  else if (remez === 'A8') {
    return rep19;
  }
  else if (remez === 'A9') {
    return rep73;
  }
  else if (remez === 'B1') {
    return rep50;
  }
  else if (remez === 'B2') {
    return rep49;
  }
  else if (remez === 'B3') {
    return rep74;
  }
  else if (remez === 'B4') {
    return rep56;
  }
  else if (remez === 'B5') {
    return rep57;
  }
  else if (remez === 'B6') {
    return rep3;
  }
  else if (remez === 'B7') {
    return rep12;
  }
  else if (remez === 'B8') {
    return rep14;
  }
  else if (remez === 'F1') {
    return rep67;
  }
  else if (remez === 'F2') {
    return rep32;
  }
  else if (remez === 'F3') {
    return rep33;
  }
  else if (remez === 'F4') {
    return rep54;
  }
  else if (remez === 'F5') {
    return rep52;
  }
  else if (remez === 'F6') {
    return rep44;
  }
  else if (remez === 'F7') {
    return rep43;
  }
  else if (remez === 'E1') {
    return rep39;
  }
  else if (remez === 'E2') {
    return rep41;
  }
  else if (remez === 'E3') {
    return rep38;
  }
  else if (remez === 'E4') {
    return rep40;
  }

  else if (remez === 'D1') {
    return rep58;
  }
  else if (remez === 'G1') {
    return rep72;
  }
  else if (remez === 'G2') {
    return rep47;
  }
  else if (remez === 'G3') {
    return rep51;
  }
  else if (remez === 'G4') {
    return rep25;
  }
  else if (remez === 'G5') {
    return rep21;
  }
  else if (remez === 'G6') {
    return rep28;
  }
  else if (remez === 'H1') {
    return rep55;
  }
  else if (remez === 'S1') {
    return rep6;
  }
  else if (remez === 'J1') {
    return rep23;
  }
}


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
    }
  }, [msbarLkoh]);

  useEffect(() => {
    if (lkoh && lkoh.id) {
      const unsub = onSnapshot(doc(firestore, 'customers', lkoh.id), (doc) => {
        if (doc.exists()) {
          setLkoh({ ...doc.data(), id: doc.id });
        } else {
          setLkoh(null);
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
        } else {
          setLkoh(null);
        }
      });
      return () => unsub();
    }
  }, [tfaolAgla?.id]);

  function GetTmonaLfeSog(val) {
    if (val === 'ייצור') {
      return <Image src={rep6} className="h-[50px] w-[80px] bg-primary-100 rounded-full" />;
    }
    else if (val === 'הרכבת וו') {
      return <Image src={rep23} className="h-[50px] w-[80px] bg-primary-100 rounded-full" />;
    }
    else if (val === 'תיקון') {
      return <Image src={rep78} className="h-[50px] w-[80px] bg-primary-100 rounded-full" />;
    }
  }

  return (
    <div>
      {<ModalCreate show={showModalCreate} disable={() => setShowModalCreate(false)} />}
      {/* {<ModalTokhnetYetsor show={showModalCreateTokhnetYetsor} disable={() => setShowModalCreateTokhnetYetsor(false)} />} */}
      {<ModalCreate lkohTfaol={lkoh} agla={tfaolAgla} show={showModalYetsorMatsav} disable={() => setShowModalYetsorMatsav(false)} />}
      <div className="flex justify-around">
        <Button color="danger" onClick={() => setShowModalCreate(true)}>הוספה</Button>
        <Button color="primary" onClick={() => setShowModalCreateTokhnetYetsor(true)}>הוספת תוכנית יצור</Button>
      </div>
      <div className='flex flex-wrap justify-center items-center mt-20 mb-56'>
        <div className="flex flex-col w-full max-w-4xl mx-auto mr-10 ml-10 mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
          <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
            המתנה
          </div>
          {
            (aglotB.length > 0) &&
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
                      return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => { setTfaolAgla(agla); setShowModalYetsorMatsav(true); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">המתנה</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{GetTmonaLfeSog(agla.sogAska)}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
        <div className="flex flex-col w-full max-w-4xl mx-auto mr-10 ml-10 mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
          <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
            הצעה
          </div>
          {
            (aglotA.length > 0) && <div className="overflow-x-auto h-[400px]">
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
                      return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">הצעה</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{GetTmonaLfeSog(agla.sogAska)}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
        <div className="flex flex-col w-full max-w-4xl mx-auto mr-10 ml-10 mt-20 border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
          <div className="bg-gradient-to-r from-white to-primary-500 tracking-widest text-black font-extrabold text-xl p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
            ייצור
          </div>
          {
            (aglotC.length > 0) &&
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
                      return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowModalYetsorMatsav(true); setTfaolAgla(agla); fetchCustomerData(agla.msbarLkoh); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">ייצור</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{agla.msbar}</td>
                        <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{GetTmonaLfeSog(agla.sogAska)}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
