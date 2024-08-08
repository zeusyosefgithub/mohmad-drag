'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { format } from "date-fns";
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
        }
        setLoadingFitching2(false);
    }, [shaotHeomData, aobedNkhhe]);

    const knesaa = async () => {
        if (!knesotHeom[0]?.knesa && !knesotHeom[0]?.headrot && !knesotHeom[0]?.yetseah) {
            try {
                await addDoc(collection(firestore, 'shaotAboda'), {
                    msbar: counter?.count + 1,
                    tarekh: format(new Date(), 'dd-MM-yyyy'),
                    knesa: format(new Date(), 'HH:mm'),
                    yetseah: '',
                    aobed: knesotHeom[0]?.msbar,
                    headrot: '',
                    hodesh: format(new Date(), 'MM-yyyy')
                });
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
            }
            catch (e) {
                console.log(e);
            }
        }
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