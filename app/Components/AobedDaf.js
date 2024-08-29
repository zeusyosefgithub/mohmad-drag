'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Hearts } from "react-loader-spinner";
import { useGetDataByConditionWithoutUseEffect, useGetDataByConditionWithoutUseEffectTwoQueres } from "../FireBase/getDataByCondition";
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useAuth } from "../auth/authContext";

export default function aobedDaf({ aobed }) {
    const { signUp, signIn, signOutt, currentUser } = useAuth();
    const [loadingFitching, setLoadingFitching] = useState(true);
    const [loadingFitching1, setLoadingFitching1] = useState(true);
    const [loadingFitching2, setLoadingFitching2] = useState(true);
    const GetHodatAobed = () => {
        if (parseFloat(format(new Date(), 'HH')) < 12) {
            return <div className="text-lg text-primary tracking-widest">
                בוקר טוב
            </div>;
        }
        else {
            return <div>
                צהריים טובים
            </div>
        }
    }

    console.log(aobed);

    function GetTarekhShem(val) {
        if (val === 'Sunday') {
            return 'ראשון';
        }
        else if (val === 'Monday') {
            return 'שני';
        }
        else if (val === 'Tuesday') {
            return 'שלשי';
        }
        else if (val === 'Wednesday') {
            return 'רבעי';
        }
        else if (val === 'Thursday') {
            return 'חמשי';
        }
        else if (val === 'Friday') {
            return 'שישי';
        }
        else if (val === 'Saturday') {
            return 'שבת';
        }
    }

    const [loading, setLoading] = useState(false);
    const currentDate = format(new Date(), 'dd-MM-yyyy');
    const [aobedNkhhe, setAobedNokhhe] = useState();
    const [shaotHeomData, setShaotHeomData] = useState([]);
    const [knesotHeom, setKnesotHeom] = useState([]);
    const [knesotHeomBdeka, setKnesotHeomBdeka] = useState([]);
    const counter = GetDocs('metadata').find((count) => count.id === 'counterShaotAboda');

    useEffect(() => {
        if (aobedNkhhe && aobedNkhhe[0]?.msbar) {
            const unsubscribe = useGetDataByConditionWithoutUseEffectTwoQueres(
                'shaotAboda',
                'tarekh',
                '==',
                currentDate,
                'aobed',
                '==',
                aobedNkhhe[0]?.msbar,
                result => {
                    setShaotHeomData(result || []);
                    setLoadingFitching(false);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [aobedNkhhe]);
    useEffect(() => {
        if (aobed?.name) {
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'aobdem',
                'taodatZhot',
                '==',
                aobed?.taodatZhot,
                result => {
                    setAobedNokhhe(result || []);
                    setLoadingFitching1(false);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [aobed]);
    useEffect(() => {
        if (Array.isArray(shaotHeomData) && shaotHeomData.length > 0 && Array.isArray(aobedNkhhe) && aobedNkhhe.length > 0) {
            const updatedKnesotHeom = aobedNkhhe?.map(knesa => {
                const res = shaotHeomData.find(data => data.aobed === knesa.msbar);
                if (res) {
                    return {
                        id: res.id,
                        msbar: knesa.msbar,
                        shem: knesa.shem,
                        tfked: knesa.tfked,
                        yetseah: res.yetseah,
                        knesa: res.knesa,
                        headrot: res.headrot
                    };
                }
                return {
                    id: '',
                    msbar: knesa.msbar,
                    shem: knesa.shem,
                    tfked: knesa.tfked,
                    yetseah: '',
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: '',
                    headrot: ''
                };
            });
            setKnesotHeom(updatedKnesotHeom);
            setKnesotHeomBdeka(updatedKnesotHeom);
        }
        else if (!shaotHeomData?.length) {
            const updatedKnesotHeom = aobedNkhhe?.map(knesa => {
                return {
                    id: '',
                    msbar: knesa.msbar,
                    shem: knesa.shem,
                    tfked: knesa.tfked,
                    yetseah: '',
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: '',
                    headrot: ''
                };
            });
            setKnesotHeom(updatedKnesotHeom);
            setKnesotHeomBdeka(updatedKnesotHeom);
        }
        setLoadingFitching2(false);
    }, [shaotHeomData, aobedNkhhe]);

    const handleTimeDiffrence = (yetseah, knesa) => {
        if (yetseah && knesa) {
            const start = parseISO(`1970-01-01T${knesa}:00`);
            const end = parseISO(`1970-01-01T${yetseah}:00`);
            const totalMinutes = differenceInMinutes(end, start);

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            return parseInt(formattedHours) + parseFloat((formattedMinutes / 60).toFixed(2));
        }
        return null;
    };

    const knesaa = async () => {
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        if (!knesotHeom[0]?.knesa && !knesotHeom[0]?.headrot && !knesotHeom[0]?.yetseah) {
            try {
                await addDoc(collection(firestore, 'shaotAboda'), {
                    msbar: counter?.count,
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: format(new Date(), 'HH:mm'),
                    yetseah: '',
                    aobed: knesotHeom[0]?.msbar,
                    headrot: '',
                    hodesh: format(new Date(), 'MM-yyyy')
                });
                count1++;
                count2 += handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa);
                count3 += knesotHeom[0]?.tfked === 'A' ? (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa)) : 0;
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            console.log(2);
            try {
                await updateDoc(doc(firestore, 'shaotAboda', knesotHeom[0].id), {
                    yetseah: format(new Date(), 'HH:mm'),
                    headrot: 'נוכח'
                });
                count3 += knesotHeom[0]?.tfked === 'A' ? (counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa)) : (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa))) : 0;
                count2 += counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa)) : (handleTimeDiffrence(knesotHeom[0].yetseah, knesotHeom[0].knesa) - handleTimeDiffrence(knesotHeomBdeka[0].yetseah, knesotHeomBdeka[0].knesa));
            }
            catch (e) {
                console.log(e);
            }
        }
        await updateDoc(doc(firestore, 'metadata', 'counterShaotAboda'), {
            count: counter?.count + count1,
            countShaotAbodaKodemet: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAboda : counter?.countShaotAbodaKodemet,
            countShaotAboda: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAboda + count2) : count2,
            countShaotAbodaMunth: format(new Date(), 'MM-yyyy'),
            countShaotAbodaYetsor: counter.countShaotAbodaMunth === format(new Date(), 'MM-yyyy') ? (counter.countShaotAbodaYetsor + count3) : count3,
            countShaotAbodaYetsorKodem: counter.countShaotAbodaMunth !== format(new Date(), 'MM-yyyy') ? counter?.countShaotAbodaYetsor : counter?.countShaotAbodaYetsorKodem,
        });
        setLoading(false);
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <Card dir="rtl" className="w-[450px]">
                <CardHeader>
                    <div className="w-full">
                        <div className="text-xl text-primary mt-2 flex justify-around font-bold items-center">
                            <div>היי {aobed.name}</div>
                            <Button onClick={signOutt} color="danger" variant="flat">
                                יצאה מהחשבון
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div>
                        <div className="w-full text-xs">
                            <div className="flex items-center w-full ">
                                <div className="w-[50px] text-right">שעה </div>
                                <div className="">{format(new Date(), 'HH:mm')}</div>
                            </div>
                            <div className="flex items-center w-full mt-2">
                                <div className="w-[50px] text-right">יום </div>
                                <div className="">{GetTarekhShem(format(new Date(), 'EEEE'))}</div>
                            </div>
                            <div className="flex items-center w-full mt-2">
                                <div className="w-[50px] text-right">תאריך </div>
                                <div className="">{format(new Date(), 'dd-MM-yyyy')}</div>
                            </div>
                        </div>
                        <Divider className="mt-5" />
                        <div className="w-full justify-around flex items-center mt-2">
                            <div>
                                {GetHodatAobed()}
                            </div>
                            <Hearts
                                height="80"
                                width="80"
                                color="#ef4444"
                                ariaLabel="hearts-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    {
                        (knesotHeom) &&
                        <div className="w-full ">
                            {
                                (knesotHeom[0]?.knesa && !knesotHeom[0]?.yetseah) ?
                                    <Button isLoading={loading} className="w-full mt-2 mb-2" color='danger' variant="flat" onClick={knesaa}>יצאה</Button>
                                    : (!knesotHeom[0]?.knesa && !knesotHeom[0]?.yetseah) ?
                                        <Button isLoading={loading} className="w-full mt-2 mb-2" color='success' variant="flat" onClick={knesaa}>כניסה</Button>
                                        :
                                        <div className="text-success text-center">
                                            המשך יום נעים {aobed.name}
                                        </div>
                            }
                        </div>
                    }
                </CardFooter>
            </Card>


        </div>
    )
}