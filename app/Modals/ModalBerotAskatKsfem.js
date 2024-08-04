'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect } from "../FireBase/getDataByCondition";


export default function ModalBerotAskatKsfem({ disable, show, Aska }) {
    const [loading, setLoading] = useState(false);
    const [lkoh, setLkoh] = useState(null);

    const formatNumberWithCommas = (num) => {
        return '₪' + num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    useEffect(() => {
        if (Aska?.sogLkoh) {
            let collection = '';
            let field = 'msbar';
            if (Aska.sogLkoh === 'A') {
                collection = 'sbkem';
            }
            else if (Aska.sogLkoh === 'B') {
                collection = 'customers';
                field = 'idnum';
            }
            else if (Aska.sogLkoh === 'C') {
                collection = 'aobdem';
            }
            if (collection) {
                const unsubscribe = useGetDataByConditionWithoutUseEffect(
                    collection,
                    field,
                    '==',
                    parseInt(Aska.lkoh),
                    result => {
                        result.length && setLkoh(result[0]);
                    }
                );
                return () => {
                    if (unsubscribe) {
                        unsubscribe();
                    }
                };
            }
        }
    }, [Aska]);

    console.log(lkoh);

    const ResetAll = () => {
        disable();
    }

    console.log(Aska);


    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="5xl" isOpen={show} onClose={ResetAll}>
            <ModalContent className="w-full">
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">פירוט עסקה מספר {Aska?.msbar}</ModalHeader>
                    <ModalBody className="shadow-2xl w-full">
                        <div dir="rtl">
                            <div className="flex justify-around p-3 mt-2 mb-5 bg-gray-300 rounded-2xl">
                                <div className="flex items-center w-[200px] justify-center">
                                    <div>מחיר עסקה : </div>
                                    <div className="mr-1">{formatNumberWithCommas(Aska?.skhomKlle)}</div>
                                </div>
                                <div className="flex items-center w-[200px] justify-center">
                                    <div>תאריך : </div>
                                    <div className="mr-1">{Aska?.tarekh}</div>
                                </div>
                                {
                                    Aska?.sogLkoh === 'A' ?
                                        <div className="flex items-center w-[200px] justify-center">
                                            <div>שם ספק : </div>
                                            <div className="mr-1">{lkoh?.shem}</div>
                                        </div>
                                        : Aska?.sogLkoh === 'B' ?
                                            <div className="flex items-center w-[200px] justify-center">
                                                <div>שם לקוח : </div>
                                                <div className="mr-1">{lkoh?.name}</div>
                                            </div>
                                            : Aska?.sogLkoh === 'C' ?
                                                <div className="flex items-center w-[200px] justify-center">
                                                    <div>שם עובד : </div>
                                                    <div className="mr-1">{lkoh?.shem}</div>
                                                </div>
                                                :
                                                null
                                }
                            </div>
                            <div className="flex items-center">
                                <div>סוג עסקה : </div>
                                <div className="mr-1">{Aska?.sogAska}</div>
                            </div>
                            <Divider className="mt-3 mb-3" />
                            <div className="h-[400px] overflow-auto">
                                {
                                    parseFloat(Aska?.mezoman) > 0 &&
                                    <>
                                        <div className="flex items-center">
                                            <div>מזומן : </div>
                                            <div className="mr-1">{formatNumberWithCommas(Aska?.mezoman)}</div>
                                        </div>
                                        <Divider className="mt-3 mb-3" />
                                    </>
                                }
                                {
                                    (parseFloat(Aska?.skhomKlle) - parseFloat(Aska?.mezoman)) > 0 &&
                                    <>
                                        <div className="flex items-center">
                                            <div>שיקים : </div>
                                        </div>
                                        <div dir="ltr" className="mt-3">
                                            <table className="w-full h-[250px] overflow-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">תאריך פרעון</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">מספר חשבון</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">שם בנק</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">מספר בנק</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">סכום</th>
                                                        <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">מספר שיק</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Aska?.shekem?.map((shek, index) => {
                                                            return <tr>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{shek?.tarekhBeraon}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{shek?.msbarHeshvonBank}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{shek?.shemBank}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{shek?.msbarBank}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{formatNumberWithCommas(shek?.skhom)}</td>
                                                                <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{shek?.msbarShek}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="w-full flex justify-between">
                            <div>
                                <Button isLoading={loading} onClick={async () => {
                                    setLoading(true);
                                    if (Aska?.sogLkoh === 'A') {
                                        await updateDoc(doc(firestore, 'sbkem', lkoh.id), {
                                            ytratHeshvon: parseFloat(lkoh.yetera) - parseFloat(Aska?.skhomKlle)
                                        });
                                    }
                                    else if (Aska?.sogLkoh === 'B') {
                                        await updateDoc(doc(firestore, 'customers', lkoh.id), {
                                            yetera: parseFloat(lkoh.yetera) - parseFloat(Aska?.skhomKlle)
                                        });
                                    }
                                    else if (Aska?.sogLkoh === 'C') {
                                        if (Aska?.sogAska === "תשלום שכר עבודה") {
                                            await updateDoc(doc(firestore, 'aobdem', lkoh.id), {
                                                skharBroto: parseFloat(lkoh.skharBroto) - parseFloat(Aska?.skhomKlle)
                                            });
                                        }
                                        else if (Aska?.sogAska === "הפרשת פנסיה") {
                                            await updateDoc(doc(firestore, 'aobdem', lkoh.id), {
                                                bensea: parseFloat(lkoh.bensea) - parseFloat(Aska?.skhomKlle)
                                            });
                                        }
                                        else if (Aska?.sogAska === "הפרשת פיצוים") {
                                            await updateDoc(doc(firestore, 'aobdem', lkoh.id), {
                                                betsoeem: parseFloat(lkoh.betsoeem) - parseFloat(Aska?.skhomKlle)
                                            });
                                        }
                                    }
                                    await updateDoc(doc(firestore,'noahBmzomnem',Aska?.id),{
                                        active : false
                                    })
                                    setLoading(false);
                                }} size="lg" color="danger">
                                    מחיקה
                                </Button>
                            </div>
                            <div>
                                <Button className="ml-2 mr-2" size="lg" color="primary" onClick={ResetAll}>
                                    סגור
                                </Button>
                                <Button className="ml-2 mr-2" isDisabled={true} isLoading={loading} size="lg" color="primary" onClick={ResetAll}>
                                    אישור
                                </Button>
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}