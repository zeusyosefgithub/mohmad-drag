'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import { GetTmonatHelek } from "../page";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";
import ProductCard from "../Components/ProductCard";
import { doc, getDoc, runTransaction, writeBatch } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { GrPowerReset } from "react-icons/gr";
import ModalMessage from "./ModalMessage";
import { AnimatePresence, motion } from "framer-motion";


export default function ModalBerotMotsrem({ show, disable, motsaremLhatseg, shlav, GetError, motsaremRglem, mlae,Tokhnet, category, motsaremBrofelem, setMotsaremRglem, setMotsaremBrofelem }) {

    const [loading, setLoading] = useState(false);

    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae?.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae?.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae?.find(item => item.shem === shem)?.kmot || 0;
        const msbar = motsarMlae?.find(item => item.shem === shem)?.msbar || '';
        const id = motsarMlae?.find(item => item.shem === shem)?.id || '';
        return { arrayResualt: motsarMlae, alot, kmot, msbar, id };
    }, [mlae]);
    //
    const checkAemRemezMataem = useCallback((val) => {
        for (let index = 0; index < motsaremLhatseg.length; index++) {
            if (motsaremLhatseg[index] === val) {
                return true;
            }
        }
        return false;
    }, [motsaremLhatseg]);

    const onValueChange = (index, field, value) => {
        const updatedMotsaremRglem = motsaremRglem.map((item, idx) =>
            idx === index ? { ...item, [field]: value } : item
        );
        setMotsaremRglem(updatedMotsaremRglem);
    };

    const onValueChangeBro = (index, field, value) => {
        const updatedMotsaremRglem = motsaremBrofelem.map((item, idx) =>
            idx === index ? { ...item, [field]: value } : item
        );
        setMotsaremBrofelem(updatedMotsaremRglem);
    };

    const addNewItem = (remez) => {
        const newItem = {
            yredatMlae: 0,
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez,
            message: '',
            id: motsaremRglem.length + 1,
            new: true
        };
        setMotsaremRglem([...motsaremRglem, newItem]);
    };

    const addNewItemBro = (remez) => {
        const newItem = {
            yredatMlae: 0,
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez,
            message: '',
            id: motsaremBrofelem.length + 1,
            new: true
        };
        setMotsaremBrofelem([...motsaremBrofelem, newItem]);
    };

    const resetIndex = (index) => {
        const resetItem = { kmot: 0, mher: 0, shem: '', new: motsaremRglem[index].new || false, id: motsaremRglem[index].id, remez: motsaremRglem[index].remez, message: '' };
        const updatedMotsaremRglem = motsaremRglem.map((item, idx) =>
            idx === index ? resetItem : item
        );
        setMotsaremRglem(updatedMotsaremRglem);
    };

    const resetIndexBro = (index) => {
        const resetItem = { kmot: 0, mher: 0, shem: '', new: motsaremBrofelem[index].new || false, id: motsaremBrofelem[index].id, remez: motsaremBrofelem[index].remez, message: '' };
        const updatedMotsaremRglem = motsaremBrofelem.map((item, idx) =>
            idx === index ? resetItem : item
        );
        setMotsaremBrofelem(updatedMotsaremRglem);
    };

    const removeItem = (index) => {
        const updatedMotsaremRglem = motsaremRglem.filter((_, idx) => idx !== index);
        setMotsaremRglem(updatedMotsaremRglem);
    };

    const removeItemBro = (index) => {
        const updatedMotsaremRglem = motsaremBrofelem.filter((_, idx) => idx !== index);
        setMotsaremBrofelem(updatedMotsaremRglem);
    };

    const GetMotsaremShavem = (remez) => {
        let newArray = [];
        for (let index = 0; index < motsaremRglem.length; index++) {
            if (motsaremRglem[index].remez === remez) {
                newArray.push(motsaremRglem[index]);
            }
        }
        return newArray;
    };

    const GetMotsaremShavemBro = (remez) => {
        let newArray = [];
        for (let index = 0; index < motsaremBrofelem.length; index++) {
            if (motsaremBrofelem[index].remez === remez) {
                newArray.push(motsaremBrofelem[index]);
            }
        }
        return newArray;
    };

    const getFirstLetters = () => {
        return category
            .map(item => ({
                val: item?.motsarem?.[0]?.sog?.charAt(0) || '',
                name: item?.shem || ''
            }))
            .filter(entry => entry.val !== '');
    };

    const CheckMotsarem = () => {
        const invalidItems = motsaremRglem.filter(({ msbar, remez, shem, kmot }) => {
            return kmot > GetBrtemMotsarMlae(remez, shem).kmot;
        });
        if (invalidItems.length > 0) {
            return false;
        }
        return true;
    }

    const GetErrorMessages = () => {
        const updatedMotsarem = motsaremRglem.map(({ msbar, remez, shem, kmot }, index) => {
            const message = kmot > GetBrtemMotsarMlae(remez, shem).kmot ? "קמות חורגת" : "";
            return { ...motsaremRglem[index], message };
        });
        setMotsaremRglem(updatedMotsarem);
    };

    const UpdateInventory = async () => {
        try {
            const batch = writeBatch(firestore);
            for (const { remez, msbar, shem, kmot, yredatMlae } of motsaremRglem) {
                if (!GetBrtemMotsarMlae(remez, shem).id) {
                    continue;
                }
                const newKmot = Math.max(GetBrtemMotsarMlae(remez, shem).kmot - (kmot - yredatMlae), 0);
                const docRef = doc(firestore, "mlae", GetBrtemMotsarMlae(remez, shem).id);
                batch.update(docRef, { kmot: newKmot });
            }
            await batch.commit();
        } catch (error) {
            console.error("Error updating inventory:", error);
        }
    };

    const updateMotsaremRglemYredatMlae = () => {
        setMotsaremRglem((prevMotsaremRglem) =>
            prevMotsaremRglem.map((item) => ({
                ...item,
                yredatMlae: item.kmot, // Set yredatMlae to kmot value
            }))
        );
    };

    const GetAddValues = async () => {
        setLoading(true);
        if (shlav === 'D') {
            if (!CheckMotsarem()) {
                GetError(true);
                GetErrorMessages();
                setLoading(false);
            }
            else {
                GetError(false);
                await UpdateInventory();
                updateMotsaremRglemYredatMlae();
            }
        }
        setLoading(false);
        disable();
    }

    const [showResetAllMessage, setShowResetAllMessage] = useState(false);
    const resetAll = () => {
        const resetMotsaremRglem = motsaremRglem.map((item) => ({
            kmot: 0,
            mher: 0,
            shem: '',
            new: item.new || false,
            id: item.id,
            remez: item.remez,
            message: '',
        }));
        setMotsaremRglem(resetMotsaremRglem);
    };

    const GetIndexChange = (id) => {
        for (let index = 0; index < motsaremRglem.length; index++) {
            if (motsaremRglem[index].id === id) {
                return index;
            }
        }
    }

    const GetIndexChangeBro = (id) => {
        for (let index = 0; index < motsaremBrofelem.length; index++) {
            if (motsaremBrofelem[index].id === id) {
                return index;
            }
        }
    }

    const getUniqueMotsaremBrofelem = () => {
        const uniqueItems = motsaremBrofelem.reduce((acc, item) => {
            if (!acc.some(obj => obj.remez === item.remez)) {
                acc.push(item);
            }
            return acc;
        }, []);
        return uniqueItems;
    };

    return (
        <Modal placement="center" className="test-fontt select-none" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent className="h-screen">
                <ModalHeader className="flex justify-center border-b-2">
                    פירוט מוצרים
                </ModalHeader>
                <ModalBody className="h-full overflow-auto">
                    <ModalMessage Aeshor={(value) => {
                        if (value) {
                            resetAll();
                        }
                    }} yetsor message={'האם אתה בטוח לשחזור כל הנתונים !?'} show={showResetAllMessage} disable={() => setShowResetAllMessage(false)} />
                    <div dir="rtl" className="w-full">
                        {
                            motsaremBrofelem.length > 0 && <React.Fragment>
                                <h1 className="text-4xl md:text-2xl lg:text-xl font-extrabold bg-gradient-to-r from-gray-500 via-black to-indigo-500 text-transparent bg-clip-text drop-shadow-2xl animate-pulse border-b pb-2 mb-2">
                                    ברפילים
                                </h1>
                                <div className="w-full flex flex-wrap justify-start">
                                    {
                                        getUniqueMotsaremBrofelem().map((motsar, index) => (
                                            <ProductCard
                                                Tokhnet={Tokhnet || false}
                                                shlav={shlav}
                                                key={index}
                                                remove={(val) => removeItemBro(GetIndexChangeBro(val))}
                                                add={(val) => addNewItemBro(val)}
                                                src={GetTmonatHelek(
                                                    motsar?.remez,
                                                    GetBrtemMotsarMlae(motsar?.remez, motsar?.shem)?.msbar
                                                )}
                                                reset={(val) => resetIndexBro(GetIndexChangeBro(val))}
                                                change={(val1, val2, val3) =>
                                                    onValueChangeBro(GetIndexChangeBro(val1), val2, val3)
                                                }
                                                mlae={mlae}
                                                motsarem={GetMotsaremShavemBro(motsar.remez)}
                                                index={index}
                                                Bro
                                            />
                                        ))
                                    }
                                </div>
                            </React.Fragment>
                        }
                        {
                            getFirstLetters()?.map((cat, indexCat) => {
                                const filteredMotsar = motsaremRglem.filter(
                                    (motsar) =>
                                        !motsar?.new &&
                                        cat.val === motsar?.remez?.charAt(0) &&
                                        checkAemRemezMataem(motsar?.remez)
                                );
                                return (
                                    filteredMotsar.length > 0 && (
                                        <React.Fragment key={indexCat}>
                                            <h1 className="text-4xl md:text-2xl lg:text-xl font-extrabold bg-gradient-to-r from-gray-500 via-black to-indigo-500 text-transparent bg-clip-text drop-shadow-2xl animate-pulse border-b pb-2 mb-2">
                                                {cat.name}
                                            </h1>
                                            <div className="w-full flex flex-wrap justify-start">
                                                {filteredMotsar.map((motsar, index) => (
                                                    <ProductCard
                                                        Tokhnet={Tokhnet || false}
                                                        shlav={shlav}
                                                        key={index}
                                                        remove={(val) => removeItem(GetIndexChange(val))}
                                                        add={(val) => addNewItem(val)}
                                                        src={GetTmonatHelek(
                                                            motsar?.remez,
                                                            GetBrtemMotsarMlae(motsar?.remez, motsar?.shem)?.msbar
                                                        )}
                                                        reset={(val) => resetIndex(GetIndexChange(val))}
                                                        change={(val1, val2, val3) =>
                                                            onValueChange(GetIndexChange(val1), val2, val3)
                                                        }
                                                        mlae={mlae}
                                                        motsarem={GetMotsaremShavem(motsar.remez)}
                                                        index={index}
                                                    />
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    )
                                );
                            })
                        }
                    </div>
                </ModalBody>
                <ModalFooter className="border-t-2">
                    <div >
                        <Button className="mr-2 ml-2" color="warning" variant="flat" size="sm" onClick={() => setShowResetAllMessage(true)}>
                            שחזור
                        </Button>
                        <Button className="ml-2" isLoading={loading} color='primary' variant="flat" size="sm" onClick={GetAddValues}>
                            אישור
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


