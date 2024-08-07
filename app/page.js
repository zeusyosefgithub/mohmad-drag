'use client';
import React, { useEffect, useRef } from "react";
import { Avatar, Button, Checkbox, CheckboxGroup, Divider, Input, Modal, Spinner, Switch } from "@nextui-org/react";
import { useState } from "react";
import ModalCreate from "./Modals/ModalCreate";
import ModalTokhnetYetsor from "./Modals/ModalTokhnetYetsor";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect } from "./FireBase/getDataByCondition";
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
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiHook } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaTrailer } from "react-icons/fa6";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import Image from "next/image";
import { CirclesWithBar, Comment, Hourglass, ThreeCircles, Watch } from "react-loader-spinner";
import { TofsTokhnetYetsor } from "./Page Components/TofsTokhnetYetsor";
import GetDocs from "./FireBase/getDocs";
import { MdDelete } from "react-icons/md";
import ModalCreateTest from "./Modals/ModalCreateTest";
import { ReshionLetsor } from "./Page Components/ReshionLetsor";
import { useReactToPrint } from "react-to-print";



export function GetTmonatHelek(remez,msbar) {
  if (remez === 'C1') {
    return rep42;
  }
  else if (remez === 'C2') {
    if(msbar === 'C204'){
      return rep97;
    }
    return rep16;
  }
  else if (remez === 'C3') {
    if(msbar === 'C309' || msbar === 'C310'){
      return rep102;
    }
    if(msbar === 'C312' || msbar === 'C313'){
      return rep101;
    }
    if(msbar === 'C308'){
      return rep100;
    }
    if(msbar === 'C306' || msbar === 'C307'){
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
    if(msbar === 'F202'){
      return rep99;
    }
    return rep32;
  }
  else if (remez === 'F3') {
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

  else if(remez === 'K1'){
    return rep83;
  }

}


export default function Home() {
  const [mlae, setMlae] = useState([]);
  const category = GetDocs('category');
  const Tokhneot = GetDocs('TokhnetYetsorAgla');
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalCreateTokhnetYetsor, setShowModalCreateTokhnetYetsor] = useState(false);
  const aglotA = useGetDataByCondition('tfaol', 'sogBaola', '==', 'A');
  const aglotB = useGetDataByCondition('tfaol', 'sogBaola', '==', 'B');
  const aglotC = useGetDataByCondition('tfaol', 'sogBaola', '==', 'C');
  const [tfaolAgla, setTfaolAgla] = useState({});
  const [lkoh, setLkoh] = useState();
  const [msbarLkoh, setMsbarLkoh] = useState();
  const [drag, setDrag] = useState();
  const [msbarDrag, setMsbarDrag] = useState();
  const [sogAska, setSogAska] = useState('');
  const [loading, setLoading] = useState(false);

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

  // useEffect(() => {
  //   if (lkoh && lkoh.id) {
  //     const unsub = onSnapshot(doc(firestore, 'customers', lkoh.id), (doc) => {
  //       if (doc.exists()) {
  //         setLkoh({ ...doc.data(), id: doc.id });
  //       } else {
  //         setLkoh(null);
  //       }
  //     });
  //     return () => unsub();
  //   }
  // }, [lkoh?.id]);

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

  const handleData = (documents) => {
    setMlae(documents);
  };

  console.log(mlae)
  useEffect(() => {
    const unsubscribe = useGetDataByConditionWithoutUseEffect('mlae', 'active', '==', true, handleData);
    return () => unsubscribe();
  }, []);

  function GetTmonaLfeSog(val) {
    if (val === 'ייצור') {
      return <FaTrailer className="text-3xl text-primary" />;
    }
    else if (val === 'הרכבת וו') {
      return <GiHook className="text-3xl text-primary" />;
    }
    else if (val === 'תיקון') {
      return <HiOutlineWrenchScrewdriver className="text-3xl text-primary" />;
    }
  }

  return (
    <div>
      <ModalCreateTest Tokhneot={Tokhneot} category={category} drag={drag} mlae={mlae} sogAskaa={sogAska} show={showModalCreate} lkohTfaol={lkoh} agla={tfaolAgla} disable={() => { setShowModalCreate(false); setSogAska(''); setTfaolAgla(null); }} />
      {/* {<ModalCreate Tokhneot={Tokhneot} category={category} mlae={mlae} sogAskaa={sogAska} show={showModalCreate} disable={() => setShowModalCreate(false)} />}
      
      {<ModalCreate Tokhneot={Tokhneot} category={category} mlae={mlae} lkohTfaol={lkoh} agla={tfaolAgla} show={showModalYetsorMatsav} disable={() => setShowModalYetsorMatsav(false)} />} */}
      <ModalTokhnetYetsor category={category} mlae={mlae} show={showModalCreateTokhnetYetsor} disable={() => setShowModalCreateTokhnetYetsor(false)} />
      {loading && <Spinner className="absolute top-0 bottom-0 right-0 left-0" />}

      <div className="w-full flex flex-wrap mb-24">

        <div className="flex-wrap w-full flex justify-center">

          <div className="flex h-[415px] w-full max-w-[700px] border mx-auto border-gray-300 mr-10 ml-10 mb-5 bg-white shadow-lg p-5 rounded-3xl">

            <div className="w-full">
              <div className="w-full flex justify-center">
                <Button color="primary" variant="faded" onClick={() => setShowModalCreateTokhnetYetsor(true)}><AiOutlineAppstoreAdd className="text-3xl text-primary"/><div className="text-xl font-bold tracking-wider">הוספת תוכנית יצור</div></Button>
              </div>
              <div className="w-full p-5 ">
                <div className="w-full flex justify-between text-primary text-xl">
                  <div className="w-full text-center">
                    שם תוכנית
                  </div>
                  <div className="w-full text-center">
                    סוג עגלה
                  </div>
                  <div className="w-[60px]"></div>
                </div>
                <Divider className="mb-5" />
                <div className="h-[250px] overflow-auto w-full">
                  {
                    Tokhneot.map((tokhnet, index) => {
                      return <>
                        <div className="w-full flex justify-between items-center border-b-1 mt-3">
                          <div className="w-full text-center">
                            {tokhnet.sogAgla}
                          </div>
                          <div className="w-full text-center">
                            {tokhnet.shem}
                          </div>
                          <div className="w-[60px]">
                            <MdDelete onClick={async () => {
                              setLoading(true);
                              await deleteDoc(doc(firestore, 'TokhnetYetsorAgla', tokhnet.id));
                              setLoading(false);
                            }} className="text-[23px] cursor-pointer text-danger" />
                          </div>
                        </div>
                      </>
                    })
                  }
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex justify-center mt-5">
                <Button color="primary" variant="faded" onClick={() => { setShowModalCreate(true); setSogAska('ייצור'); }}><FaTrailer className="text-3xl text-primary" /><div className="w-[100px] text-xl font-bold tracking-wider">ייצור עגלה</div></Button>
              </div>
              <div className="w-full flex justify-center mt-5">
                <Button color="primary" variant="faded" onClick={() => { setShowModalCreate(true); setSogAska('הרכבת וו'); }}><GiHook className="text-3xl text-primary" /><div className="w-[100px] text-xl font-bold tracking-wider">הרכבת וו</div></Button>
              </div>
              <div className="w-full flex justify-center mt-5">
                <Button color="primary" variant="faded" onClick={() => { setShowModalCreate(true); setSogAska('תיקון'); }}><HiOutlineWrenchScrewdriver className="text-3xl text-primary" /><div className="w-[100px] text-xl font-bold tracking-wider">תיקון</div></Button>
              </div>
              <div className="w-full flex justify-center mt-5">
                <Button isDisabled color="primary" variant="faded" onClick={() => { setShowModalCreate(true); setSogAska('טסט'); }}><FaRegCalendarCheck className="text-3xl text-primary" /><div className="w-[100px] text-xl font-bold tracking-wider">טסט</div></Button>
              </div>
            </div>


          </div>
          <div className="flex justify-end items-center w-full max-w-[780px]">
            <div className="flex flex-col w-full mx-auto mr-10 ml-10 mb-5 border border-gray-300 bg-white shadow-lg p-2 rounded-3xl">
              <div className="flex items-center h-full">
                {
                  <div className="w-full overflow-x-auto h-[400px]">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black text-xs">זמן עבר</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black text-xs">תחילת תהליך</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black text-xs">תאריך תחילה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black text-xs">סוג עסקה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black text-xs">מצב עסקה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black text-xs">מספר מכירה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black text-xs"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          aglotA.map((agla, index) => {
                            return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.sogAska}</td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalCreate(true); setTfaolAgla(agla);setMsbarDrag(agla.msbarAgla); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAska)}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                }
                <div className="h-[300px] rounded-xl min-w-[90px]">
                  <div className="tracking-widest w-full text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center h-[300px]">
                    <div className="w-full">
                      <div className="text-center w-full text-primary mb-3">הצעה</div>
                      <div className="flex justify-center w-full">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         

        </div>

        <div className="flex-wrap w-full flex justify-center">

          
        <div className="flex justify-end items-center w-full max-w-[780px]">
            <div className="flex flex-col w-full mx-auto mr-10 ml-10 mb-5 border border-gray-300 bg-white shadow-lg p-2 rounded-3xl">
              <div className="flex items-center h-full">
                {
                  <div className="overflow-x-auto h-[400px] w-full">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black text-xs">זמן עבר</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black text-xs">תחילת תהליך</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black text-xs">תאריך תחילה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black text-xs">סוג עסקה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black text-xs">מצב עסקה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black text-xs">מספר מכירה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black text-xs"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          aglotC.map((agla, index) => {
                            return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.sogAska}</td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setShowModalCreate(true); setTfaolAgla(agla);setMsbarDrag(agla.msbarAgla);setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAska)}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                }
                <div className="h-[300px] rounded-xl min-w-[90px]">
                  <div className="h-full w-full tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center">
                    <div className="w-full">
                      <div className="text-center w-full text-primary mb-3">ייצור</div>
                      <div className="flex justify-center w-full">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center w-full max-w-[780px]">
            <div className="flex flex-col w-full mx-auto mr-10 ml-10 mb-5 border border-gray-300 bg-white shadow-lg p-2 rounded-3xl">
              <div className="flex items-center h-full">
                {
                  <div className="overflow-x-auto h-[400px] w-full">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-white to-gray-50 font-extrabold text-black text-xs">זמן עבר</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black text-xs">תחילת תהליך</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black text-xs">תאריך תחילה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black text-xs">סוג עסקה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black text-xs">מצב עסקה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black text-xs">מספר מכירה</th>
                          <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black text-xs"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          aglotB.map((agla, index) => {
                            return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.sogAska}</td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs"><Button color='primary' variant='flat' size="sm" onClick={() => { setTfaolAgla(agla); setShowModalCreate(true);setMsbarDrag(agla.msbarAgla); setMsbarLkoh(agla.msbarLkoh); }}>המשך</Button></td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{agla.msbar}</td>
                              <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300 text-xs">{GetTmonaLfeSog(agla.sogAska)}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                }
                <div className="h-[300px] rounded-xl min-w-[90px]">
                  <div className="h-full w-full flex items-center tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105">
                    <div className="w-full">
                      <div className="text-center w-full text-primary mb-3">המתנה</div>
                      <div className="flex justify-center w-full">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          

        </div>
      </div>
    </div>
  );
}
