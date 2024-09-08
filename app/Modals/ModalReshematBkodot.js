'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

export default function ModalReshematBkodot({ show, disable }) {
    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="3xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader>
                        <div className="flex justify-center w-full">רשימת פקודות יומן</div>
                    </ModalHeader>
                    <ModalBody className="border-b-2">
                        <div>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>קטגוריה</th>
                                        <th>סוג פקודה</th>
                                        <th>שם פקודה</th>
                                        <th>מס פקודה</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">מכירת עגלה</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">מיכרות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">1</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מיכרות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">2</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">הנהלה וכלליות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">3</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">הוצאת מימון</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">4</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">הוצאת אחרות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">5</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">מזומנים</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">6</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">רכוש קבוע</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">7</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">לקחות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">8</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">עלות מכירות</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">תוצאתי</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">ספקים</td>
                                        <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">9</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <Button onClick={disable} color='warning' variant="flat">
                                סגור
                            </Button>
                            {/* <Button className="mr-2 ml-2" color="primary" variant="flat">
                                אישור
                            </Button> */}
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
