'use client';
import React, { useContext, useEffect, useRef } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CheckboxGroup, Divider, Input, Modal, Skeleton, Spinner, Switch } from "@nextui-org/react";
import { useState } from "react";
import ModalCreate from "./Modals/ModalCreate";
import ModalTokhnetYetsor from "./Modals/ModalTokhnetYetsor";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect, useGetDataByConditionWithoutUseEffectTwoQueres } from "./FireBase/getDataByCondition";
import ModalYetsorMtsavem from "./Modals/ModalYetsorMtsavem";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "./FireBase/firebase";
import rep3 from '../images/rep3.png';
import rep6 from '../images/rep6.png';
import rep12 from '../images/rep12.png';
import rep14 from '../images/rep14.jpg';
import rep16 from '../images/rep16.jpg';
import rep17 from '../images/rep17.jpg';
import rep18 from '../images/rep18.jpg';
import rep19 from '../images/rep19.png';
import rep20 from '../images/rep20.png';
import rep21 from './../images/rep21.jpg';
import rep23 from '../images/rep23.png';
import rep24 from '../images/rep24.png';
import rep25 from '../images/rep25.png';
import rep27 from '../images/rep27.jpg';
import rep28 from '../images/rep28.jpeg';
import rep29 from '../images/rep29.png';
import rep31 from './../images/rep31.png';
import rep32 from '../images/rep32.jpeg';
import rep33 from '../images/rep33.png';
import rep35 from '../images/rep35.png';
import rep36 from '../images/rep36.png';
import rep37 from '../images/rep37.jpg';
import rep38 from '../images/rep38.png';
import rep39 from '../images/rep39.png';
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
import rep55 from '../images/rep55.jpg';
import rep56 from '../images/rep56.png';
import rep57 from '../images/rep57.png';
import rep58 from '../images/rep58.png';
import rep67 from '../images/rep67.jpg';
import rep68 from '../images/rep68.png';
import rep69 from '../images/rep69.jpg';
import rep70 from '../images/rep70.png';
import rep72 from './../images/rep72.jpg';
import rep73 from '../images/rep73.png';
import rep74 from '../images/rep74.png';
import rep76 from '../images/rep76.jpg';
import rep79 from '../images/rep79.png';
import rep83 from '../images/rep83.png';
import rep91 from '../images/rep91.jpg';
import rep92 from '../images/rep92.jpg';
import rep93 from '../images/rep93.jpg';
import rep94 from '../images/rep94.jpg';
import rep95 from '../images/rep95.jpg';
import rep96 from '../images/rep96.jpg';
import rep97 from '../images/rep97.jpg';
import rep98 from '../images/rep98.jpg';
import rep99 from '../images/rep99.jpg';
import rep100 from '../images/rep100.jpg';
import rep101 from '../images/rep101.jpg';
import rep102 from '../images/rep102.jpg';
import rep103 from '../images/rep103.png';
import rep104 from '../images/rep104.jpg';
import rep105 from '../images/rep105.jpg';

import rep106 from '../images/rep106.png';
import rep107 from '../images/rep107.png';
import rep108 from '../images/rep108.png';
import rep109 from '../images/rep109.png';
import rep110 from '../images/rep110.png';
import rep111 from '../images/rep111.jpg';
import rep112 from '../images/rep112.jpg';

import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiHook } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaTrailer } from "react-icons/fa6";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import Image from "next/image";
import { CirclesWithBar, Comment, Hearts, Hourglass, Puff, ThreeCircles, Watch } from "react-loader-spinner";
import GetDocs from "./FireBase/getDocs";
import { MdDelete } from "react-icons/md";
import ModalCreateTest from "./Modals/ModalCreateTest";
import ContactContext from "./auth/ContactContext";
import ModalMtsavYetsor from "./Modals/ModalMtsavYetsor";
import Link from "next/link";
import { CardContent } from "@mui/material";
import SlideButton from "./Components/SlideButton";
import ModalYetsor from "./Modals/ModalYetsor";
import { differenceInDays, format, parse } from "date-fns";
import ModalReshematTokhneot from "./Modals/ModalReshematTokhneot";
import { AnimatePresence, motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import ModalBheratMlae from "./Modals/ModalBheratMlae";



export function GetTmonatHelek(remez, msbar) {
  if (remez === 'C1') {
    return rep42;
  }
  else if (remez === 'C2') {
    if (msbar === 'C203' || msbar === 'C202' || msbar === 'C201' || msbar === 'C207' || msbar === 'C206') {
      return rep104;
    }
    if (msbar === 'C204') {
      return rep97;
    }
    return rep16;
  }
  else if (remez === 'C3') {
    if (msbar === 'C318') {
      return rep112;
    }
    if (msbar === 'C309' || msbar === 'C310') {
      return rep102;
    }
    if (msbar === 'C312' || msbar === 'C313') {
      return rep101;
    }
    if (msbar === 'C308') {
      return rep100;
    }
    if (msbar === 'C306' || msbar === 'C307') {
      return rep98;
    }
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

  else if (remez === 'C12') {
    return rep95;
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
    if (msbar === 'A901') {
      return rep105;
    }
    return rep73;
  }
  else if (remez === 'A10') {
    return rep68;
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
  else if (remez === 'B9') {
    return rep79;
  }


  else if (remez === 'F1') {
    return rep67;
  }
  else if (remez === 'F2') {
    if (msbar === 'F202') {
      return rep99;
    }
    return rep32;
  }
  else if (remez === 'F3') {
    if (msbar === 'F300' || msbar === 'F301') {
      return rep103;
    }
    return rep33;
  }
  else if (remez === 'F4') {
    return rep91;
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
    return rep96;
  }

  else if (remez === 'D1') {
    if (msbar === 'D100') {
      return rep106;
    }
    if (msbar === 'D101') {
      return rep107;
    }
    if (msbar === 'D102') {
      return rep108;
    }
    if (msbar === 'D103') {
      return rep109;
    }
    if (msbar === 'D104') {
      return rep110;
    }
    if (msbar === 'D105') {
      return rep111;
    }
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

  else if (remez === 'G7') {
    return rep92;

  }
  else if (remez === 'G8') {
    return rep94;

  }
  else if (remez === 'G9') {
    return rep93;

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

  else if (remez === 'K1') {
    return rep83;
  }

}


export default function Home() {
  const { contactName, setContactName, customerSet, setCustomerSet, isNehol, setIsNehol, aobedAuth } = useContext(ContactContext);
  const mlae = GetDocs('mlae');
  const category = GetDocs('category');
  const aobdem = GetDocs('aobdem');
  const Tokhneot = GetDocs('TokhnetYetsorAgla');
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalCreateTokhnetYetsor, setShowModalCreateTokhnetYetsor] = useState(false)
  const [showModalBheratMlae, setShowModalBheratMlae] = useState(false);
  const aglotA = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'A').sort((a, b) => {
    if (a.msbarAdefot !== b.msbarAdefot) {
      return a.msbarAdefot - b.msbarAdefot;
    }
    const dateA = new Date(a.tarekhAsbka);
    const dateB = new Date(b.tarekhAsbka);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    return a.msbar - b.msbar;
  });
  const aglotB = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'B').sort((a, b) => {
    if (a.msbarAdefot !== b.msbarAdefot) {
      return a.msbarAdefot - b.msbarAdefot;
    }
    const dateA = new Date(a.tarekhAsbka);
    const dateB = new Date(b.tarekhAsbka);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    return a.msbar - b.msbar;
  });
  const aglotC = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'C').sort((a, b) => {
    if (a.msbarAdefot !== b.msbarAdefot) {
      return a.msbarAdefot - b.msbarAdefot;
    }
    const dateA = new Date(a.tarekhAsbka);
    const dateB = new Date(b.tarekhAsbka);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    return a.msbar - b.msbar;
  });
  const aglotD = useGetDataByCondition('tfaol', 'shlavNokhhe', '==', 'D').sort((a, b) => {
    if (a.msbarAdefot !== b.msbarAdefot) {
      return a.msbarAdefot - b.msbarAdefot;
    }
    const dateA = new Date(a.tarekhAsbka);
    const dateB = new Date(b.tarekhAsbka);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    return a.msbar - b.msbar;
  });
  const aglot = GetDocs('drags');
  const lkhot = GetDocs('customers');
  const [tfaolAgla, setTfaolAgla] = useState({});
  const [lkoh, setLkoh] = useState();
  const [msbarLkoh, setMsbarLkoh] = useState();
  const [drag, setDrag] = useState();
  const [msbarDrag, setMsbarDrag] = useState();
  const [sogAska, setSogAska] = useState('');
  const [loading, setLoading] = useState(false);
  const [mtsavYetsorRes, setMtsavYetsorRes] = useState();
  const [showModalMtsavYetsor, setShowModalMtsavYetsor] = useState(false);
  const [mtsav, setMtsav] = useState('A');


  const fetchCustomerData = (customerId) => {
    try {
      const customersRef = collection(firestore, 'customers');
      const q = query(customersRef, where("idnum", "==", customerId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          setLkoh({ ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id });
        } else {
          setLkoh(null);
        }
      }, (error) => {
        console.error('Error fetching customer data:', error);
        setLkoh(null);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up real-time listener for customer data:', error);
      setLkoh(null);
    }
  };

  useEffect(() => {
    let unsubscribe;
    if (msbarLkoh) {
      unsubscribe = fetchCustomerData(msbarLkoh);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [msbarLkoh]);

  const fetchDragData = (msbarDrag) => {
    try {
      const customersRef = collection(firestore, 'drags');
      const q = query(customersRef, where("licenseid", "==", msbarDrag));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          setDrag({ ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id });
        } else {
          setDrag(null);
        }
      }, (error) => {
        console.error('Error fetching customer data:', error);
        setDrag(null);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up real-time listener for customer data:', error);
      setDrag(null);
    }
  };

  useEffect(() => {
    let unsubscribe;
    if (msbarDrag) {
      unsubscribe = fetchDragData(msbarDrag);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [msbarDrag]);

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

  const GetColorMsbarAdefot = (val) => {
    if (val === 1) {
      return 'text-danger';
    }
    else if (val === 2) {
      return 'text-[#f97316]';
    }
    else if (val === 3) {
      return 'text-[#facc15]';
    }
    else if (val === 4) {
      return 'text-[#a3e635]';
    }
    else {
      return 'text-[#34d399]';
    }
  }

  function GetTmonaLfeSog(val, val1, val3) {
    if (val === 'ייצור') {
      if (val3 === 'עארה') {
        return <div><FaTrailer className={`text-3xl ${GetColorMsbarAdefot(val1)}`} /></div>;
      }
      else {
        return <div className="relative w-[45px]"><div className=" absolute right-0 bg-white"><FaLocationDot className={`${GetColorMsbarAdefot(val1)} text-base`} /></div><FaTrailer className={`text-3xl ${GetColorMsbarAdefot(val1)}`} /></div>;
      }
    }
    else if (val === 'הרכבת וו') {
      return <GiHook className={`text-3xl ${GetColorMsbarAdefot(val1)}`} />;
    }
    else if (val === 'תיקון') {
      return <HiOutlineWrenchScrewdriver className={`text-3xl ${GetColorMsbarAdefot(val1)}`} />;
    }
  }

  function daysGoneSince(date) {
    const givenDate = parse(date, 'dd-MM-yyyy', new Date());
    const today = new Date();
    return differenceInDays(today, givenDate);
  }

  function daysSinceOrUntil(date) {
    const givenDate = parse(date, 'dd-MM-yyyy', new Date());
    const today = new Date();

    // Calculate the difference in milliseconds and convert to days
    const msDifference = givenDate - today;
    const daysDifference = Math.ceil(msDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 0) {
      return <div className="mr-3 bg-success text-[16px] w-[30px] h-[30px] rounded-full font-black text-white flex items-center justify-center animate-pulse">{daysDifference}</div>;
    } else if (daysDifference < 0) {
      return <div className="mr-3 bg-danger text-[16px] w-[30px] h-[30px] rounded-full font-black text-white flex items-center justify-center animate-pulse">{Math.abs(daysDifference)}</div>;
    } else if (daysDifference === 0) {
      return <div className="mr-3 bg-primary text-[16px] w-[30px] h-[30px] rounded-full font-black text-white flex items-center justify-center animate-pulse">{Math.abs(daysDifference)}</div>;
    } else {
      return '';
    }
  }





  const GetResMtsav = (res) => {
    if (res[5]?.res) {
      return 'מוכן';
    }
    else if (res[4]?.res) {
      return 'בקרת איכות';
    }
    else if (res[3]?.res) {
      return 'חשמל';
    }
    else if (res[2]?.res) {
      return 'צבע';
    }
    else if (res[1]?.res) {
      return 'השלמה';
    }
    else if (res[0]?.res) {
      return 'שלדה';
    }
    else {
      return 'תכנון';
    }

  }

  useEffect(() => {
    if (mtsavYetsorRes && mtsavYetsorRes?.id) {
      const unsub = onSnapshot(doc(firestore, 'tfaol', mtsavYetsorRes?.id), (doc) => {
        if (doc.exists()) {
          setMtsavYetsorRes({ ...doc.data(), id: doc.id });
        }
      });
      return () => unsub();
    }
  }, [mtsavYetsorRes?.id]);

  const handleComplete = () => {
    alert('Slider reached the end!');
  };

  function flipDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  const [showModalYetsor, setShowModalYetsor] = useState(false);
  const [showModalReshematTokhneot, setShowModalReshematTokhneot] = useState(false);
  const [sogAskaYetsorTokhnet, setSogAskaYetsorTokhnet] = useState('');
  const [locationYetsor, setLocationYetsor] = useState('');

  return (
    <div className="h-full">
      <ModalMtsavYetsor res={{
        a: mtsavYetsorRes?.mtsavYetsor[0],
        b: mtsavYetsorRes?.mtsavYetsor[1],
        c: mtsavYetsorRes?.mtsavYetsor[2],
        d: mtsavYetsorRes?.mtsavYetsor[3],
        e: mtsavYetsorRes?.mtsavYetsor[4],
        f: mtsavYetsorRes?.mtsavYetsor[5],
      }} show={showModalMtsavYetsor} disable={() => setShowModalMtsavYetsor(false)} />
      <ModalTokhnetYetsor category={category} mlae={mlae} show={showModalCreateTokhnetYetsor} disable={() => setShowModalCreateTokhnetYetsor(false)} />
      {loading && <Spinner className="absolute top-0 bottom-0 right-0 left-0" />}
      <ModalBheratMlae Bhera={(val) => {
        setLocationYetsor(val);
        setShowModalYetsor(true);
      }} show={showModalBheratMlae} disable={() => setShowModalBheratMlae(false)} />
      <ModalYetsor locationYetsor={locationYetsor} drag={drag} yetsorKeam={tfaolAgla} lkohTfaol={lkoh} Tokhneot={Tokhneot} sogAskaa={sogAska} mlae={mlae} aglot={aglot} lkhot={lkhot} category={category} show={showModalYetsor} disable={() => { setShowModalYetsor(false); setSogAska(''); setTfaolAgla(null); }} />
      <ModalReshematTokhneot sogAskaa={sogAskaYetsorTokhnet} category={category} mlae={mlae} Tokhneot={Tokhneot} show={showModalReshematTokhneot} disable={() => { setShowModalReshematTokhneot(false); setSogAskaYetsorTokhnet(''); }} />
      <div dir="rtl" className="flex h-full bg-white shadow-2xl rounded-2xl">
        <aside className="w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-r-3xl">
          <div className="p-4">
            <h1 className="text-xl font-extrabold text-gray-800 dark:text-white">מצבי תפעול</h1>
          </div>
          <Divider className="mt-[14px]" />
          <div className="mr-5 ml-5 mt-2 mb-2 bg">
            <Button size="sm" color={mtsav === 'A' ? "primary" : 'default'} variant="flat" className="w-full" onClick={() => setMtsav('A')}><div className="flex items-center justify-start w-full">
              <div className="ml-5">
                <Comment
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="comment-loading"
                  wrapperStyle={{}}
                  wrapperClass="comment-wrapper"
                  color="white"
                  backgroundColor="#3b82f6"
                />
              </div>
              <div className="text-xl font-bold tracking-wider"> שלב הצעה</div>
              {
                aglotA.length > 0 &&
                <div className="flex justify-end w-full">
                  <div className=" bg-success w-[25px] h-[25px] rounded-full font-black text-[16px] text-white flex justify-center items-center">{aglotA.length}</div>
                </div>
              }
            </div>
            </Button>
            <Button size="sm" color={mtsav === 'B' ? "primary" : 'default'} variant="flat" className="w-full mt-1" onClick={() => setMtsav('B')}><div className="flex items-center justify-start w-full">
              <div className="ml-5">
                <Hourglass
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  color='#3b82f6'
                  backgroundColor="#3b82f6"
                />
              </div>
              <div className="text-xl font-bold tracking-wider">שלב הזמנה</div>
              {
                aglotB.length > 0 &&
                <div className="flex justify-end w-full">
                  <div className=" bg-success w-[25px] h-[25px] rounded-full font-black text-[16px] text-white flex justify-center items-center">{aglotB.length}</div>
                </div>
              }
            </div>
            </Button>
            <Button size="sm" color={mtsav === 'C' ? "primary" : 'default'} variant="flat" className="w-full mt-1" onClick={() => setMtsav('C')}><div className="flex items-center justify-start w-full">
              <div className="ml-5">
                <ThreeCircles
                  visible={true}
                  height="30"
                  width="30"
                  color="#3b82f6"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
              <div className="text-xl font-bold tracking-wider">שלב ייצור</div>
              {
                aglotC.length > 0 &&
                <div className="flex justify-end w-full">
                  <div className=" bg-success w-[25px] h-[25px] rounded-full font-black text-[16px] text-white flex justify-center items-center">{aglotC.length}</div>
                </div>
              }
            </div>
            </Button>
            <Button size="sm" color={mtsav === 'D' ? "primary" : 'default'} variant="flat" className="w-full mt-1" onClick={() => setMtsav('D')}><div className="flex items-center justify-start w-full">
              <div className="ml-5">
                <Puff
                  visible={true}
                  height="30"
                  width="30"
                  color="#3b82f6"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
              <div className="text-xl font-bold tracking-wider">מצב סיום</div>
              {
                aglotD.length > 0 &&
                <div className="flex justify-end w-full">
                  <div className=" bg-success w-[25px] h-[25px] rounded-full font-black text-[16px] text-white flex justify-center items-center">{aglotD.length}</div>
                </div>
              }
            </div>
            </Button>
          </div>
          <div className="p-4">
            <h1 className="text-xl font-extrabold text-gray-800 dark:text-white">הוספת פעולה</h1>
          </div>
          <Divider />
          <div className="mr-5 ml-5 mt-2 mb-2">
            <Button size="sm" color="primary" variant="faded" className="w-full" onClick={() => { setShowModalBheratMlae(true); setSogAska('ייצור'); }}><div className="flex items-center justify-start w-full"><FaTrailer className="text-3xl text-primary ml-5" /><div className="text-xl font-bold tracking-wider">ייצור עגלה</div></div></Button>
            <Button size="sm" color="primary" variant="faded" className="w-full mt-1" onClick={() => { setShowModalBheratMlae(true); setSogAska('הרכבת וו'); }}><div className="flex items-center justify-start w-full"><GiHook className="text-3xl text-primary ml-5" /><div className="text-xl font-bold tracking-wider">הרכבת וו</div></div></Button>
            <Button size="sm" className="w-full mt-1" color="primary" variant="faded" onClick={() => { setShowModalBheratMlae(true); setSogAska('תיקון'); }}><div className="flex items-center justify-start w-full"><HiOutlineWrenchScrewdriver className="text-3xl text-primary ml-5" /><div className="text-xl font-bold tracking-wider">תיקון</div></div></Button>
            <Button size="sm" className="w-full mt-1" isDisabled color="primary" variant="faded" onClick={() => { setShowModalBheratMlae(true); setSogAska('טסט'); }}><div className="flex items-center justify-start w-full"><FaRegCalendarCheck className="text-2xl text-primary ml-5" /><div className="text-xl font-bold tracking-wider">טסט</div></div></Button>
          </div>
          <div className="p-4">
            <h1 className="text-xl font-extrabold text-gray-800 dark:text-white">תוכניות ייצור</h1>
          </div>
          <Divider />
          <div className="mr-5 ml-5 mt-2 mb-2">
            <Button size="sm" className="w-full mt-2" color="primary" variant="faded" onClick={() => { setShowModalReshematTokhneot(true); setSogAskaYetsorTokhnet('ייצור') }}><div className="flex items-center justify-start w-full"><AiOutlineAppstoreAdd className="text-3xl text-primary ml-5" /><div className="text-xl font-bold tracking-wider">רישמת תוכניות</div></div></Button>
          </div>
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white rounded-se-3xl dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4 py-3">
              {
                mtsav === 'A' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="A1"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center w-full justify-center">
                      <div className="ml-5">
                        <Comment
                          visible={true}
                          height="50"
                          width="50"
                          ariaLabel="comment-loading"
                          wrapperStyle={{}}
                          wrapperClass="comment-wrapper"
                          color="white"
                          backgroundColor="#3b82f6"
                        />
                      </div>
                      <div className="text-3xl">שלב הצעה</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }
              {
                mtsav === 'B' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="B1"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center w-full justify-center">
                      <div className="ml-5">
                        <Hourglass
                          visible={true}
                          height="50"
                          width="50"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          color='#3b82f6'
                          backgroundColor="#3b82f6"
                        />
                      </div>
                      <div className="text-3xl">שלב הזמנה</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }
              {
                mtsav === 'C' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="C1"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center w-full justify-center">
                      <div className="ml-5">
                        <ThreeCircles
                          visible={true}
                          height="50"
                          width="50"
                          color="#3b82f6"
                          ariaLabel="three-circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                      <div className="text-3xl">שלב ייצור</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }
              {
                mtsav === 'D' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="D1"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center w-full justify-center">
                      <div className="ml-5">
                        <Puff
                          visible={true}
                          height="50"
                          width="50"
                          color="#3b82f6"
                          ariaLabel="puff-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                      <div className="text-3xl">שלב סיום</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white rounded-ee-3xl border-r-2">
            <div className="container mx-auto px-6 py-8">
              {
                mtsav === 'A' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="A"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="" dir="ltr">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs"></th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך אספקה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">זמן עבר</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך תחילה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">שם לקוח</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">מספר פעולה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">סוג פעולה</th>
                            <th className="px-4 py-2 text-center  font-medium text-black text-xs w-30"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            aglotA.map((agla, index) => {
                              return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalYetsor(true); setTfaolAgla(agla); setMsbarDrag(agla.msbarAgla); setMsbarLkoh(agla.msbarLkoh); }}>פתח</Button></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center">{daysSinceOrUntil(flipDate(agla.tarekhAsbka))} {agla.tarekhAsbka && flipDate(agla.tarekhAsbka)}</div></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{daysGoneSince(agla.zmanThelaA.tarekh) || '0'}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.zmanThelaA.tarekh}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{agla.brtemLkoh?.name || agla.newCustomer.customerName}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center"><div className="mr-1">{agla.locationYetsor === 'עארה' ? '(עארה)' : '(מעלה אפריים)'}</div><div>{agla.sogAskaa === 'ייצור' ? 'עגלה' : agla.sogAskaa}</div></div></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAskaa, agla.msbarAdefot, agla.locationYetsor)}</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }
              {
                mtsav === 'B' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="B"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="" dir="ltr">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs"></th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך אספקה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">זמן עבר</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך תחילה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">שם לקוח</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">מספר פעולה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">סוג פעולה</th>
                            <th className="px-4 py-2 text-center  font-medium text-black text-xs w-30"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            aglotB.map((agla, index) => {
                              return <tr key={index} className={`border-b border-gray-200 dark:border-gray-700`}>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalYetsor(true); setTfaolAgla(agla); setMsbarDrag(agla.msbarAgla); setMsbarLkoh(agla.msbarLkoh); }}>פתח</Button></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center">{daysSinceOrUntil(flipDate(agla.tarekhAsbka))} {agla.tarekhAsbka && flipDate(agla.tarekhAsbka)}</div></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{daysGoneSince(agla.zmanThelaB.tarekh) || '0'}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.zmanThelaB.tarekh}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{agla?.brtemLkoh?.name || agla?.newCustomer?.customerName}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center"><div className="mr-1">{agla.locationYetsor === 'עארה' ? '(עארה)' : '(מעלה אפריים)'}</div><div>{agla.sogAskaa === 'ייצור' ? 'עגלה' : agla.sogAskaa}</div></div></td>                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAskaa, agla.msbarAdefot, agla.locationYetsor)}</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }
              {
                mtsav === 'C' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="C"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="" dir="ltr">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs"></th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs"></th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך אספקה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">זמן עבר</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך תחילה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">שם לקוח</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">מספר פעולה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">סוג פעולה</th>
                            <th className="px-4 py-2 text-center  font-medium text-black text-xs w-30"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            aglotC.map((agla, index) => {
                              return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalYetsor(true); setTfaolAgla(agla); setMsbarDrag(agla.msbarAgla); setMsbarLkoh(agla.msbarLkoh); }}>פתח</Button></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">
                                  <div className="w-[120px] flex items-center cursor-pointer" onClick={() => { setShowModalMtsavYetsor(true); setMtsavYetsorRes(agla); }}>
                                    <div className="w-[120px] text-center fixed font-black text-primary tracking-widest z-10">
                                      {
                                        GetResMtsav(agla?.mtsavYetsor)
                                      }
                                    </div>
                                    {
                                      agla?.mtsavYetsor[5]?.res ?
                                        <>
                                          <div className="w-full bg-success-300 h-[30px] flex justify-center items-center rounded-l-2xl">
                                          </div>
                                        </>
                                        :
                                        <>
                                          <div className="w-full bg-primary opacity-20 rounded-l-2xl h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                    }
                                    {
                                      agla?.mtsavYetsor[4]?.res ?
                                        <>
                                          <div className="w-full bg-success-300 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                        :
                                        <>
                                          <div className="w-full bg-primary opacity-20 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                    }
                                    {
                                      agla?.mtsavYetsor[3]?.res ?
                                        <>
                                          <div className="w-full bg-success-300 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                        :
                                        <>
                                          <div className="w-full bg-primary opacity-20 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                    }
                                    {
                                      agla?.mtsavYetsor[2]?.res ?
                                        <>
                                          <div className="w-full bg-success-300 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                        :
                                        <>
                                          <div className="w-full bg-primary opacity-20 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                    }
                                    {
                                      agla?.mtsavYetsor[1]?.res ?
                                        <>
                                          <div className="w-full bg-success-300 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                        :
                                        <>
                                          <div className="w-full bg-primary opacity-20 h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                    }
                                    {
                                      agla?.mtsavYetsor[0]?.res ?
                                        <>
                                          <div className="w-full bg-success-300 h-[30px] flex justify-center items-center rounded-r-2xl">
                                          </div>
                                        </>
                                        :
                                        <>
                                          <div className="w-full bg-primary opacity-20 rounded-r-2xl h-[30px] flex justify-center items-center">
                                          </div>
                                        </>
                                    }
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center">{daysSinceOrUntil(flipDate(agla.tarekhAsbka))} {agla.tarekhAsbka && flipDate(agla.tarekhAsbka)}</div></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{daysGoneSince(agla.zmanThelaC.tarekh) || '0'}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.zmanThelaC.tarekh}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{agla?.brtemLkoh?.name || agla?.newCustomer?.customerName}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center"><div className="mr-1">{agla.locationYetsor === 'עארה' ? '(עארה)' : '(מעלה אפריים)'}</div><div>{agla.sogAskaa === 'ייצור' ? 'עגלה' : agla.sogAskaa}</div></div></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAskaa, agla.msbarAdefot, agla.locationYetsor)}</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }
              {
                mtsav === 'D' &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key="D"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="" dir="ltr">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך אספקה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">זמן עבר</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">תאריך סיום</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">שם לקוח</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">מספר פעולה</th>
                            <th className="px-4 py-2 text-center  font-extrabold text-black text-xs">סוג פעולה</th>
                            <th className="px-4 py-2 text-center  font-medium text-black text-xs w-30"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            aglotD.map((agla, index) => {
                              return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center">{daysSinceOrUntil(flipDate(agla.tarekhAsbka))} {agla.tarekhAsbka && flipDate(agla.tarekhAsbka)}</div></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{daysGoneSince(agla.zmanThelaD.tarekh) || '0'}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.zmanThelaD.tarekh}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-[10px]">{agla?.brtemLkoh?.name || agla?.newCustomer?.customerName}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><div className="flex items-center justify-center"><div className="mr-1">{agla.locationYetsor === 'עארה' ? '(עארה)' : '(מעלה אפריים)'}</div><div>{agla.sogAskaa === 'ייצור' ? 'עגלה' : agla.sogAskaa}</div></div></td>
                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAskaa, agla.msbarAdefot, agla.locationYetsor)}</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </AnimatePresence>
              }

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
