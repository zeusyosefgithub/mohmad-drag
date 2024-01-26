import React from "react";

export const PageTwo = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="bg-white p-10">
            <div className="text-2xl">
                <div className="flex justify-center">
                    ח.ח גורטאות הואדי
                </div>
                <div className="flex justify-center mt-2">
                    053-7464428
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="flex justify-around text-lg mt-16 w-1/2">
                    <div>
                        2312-051
                    </div>
                    <div>
                        תעודת שקילה מספר
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="flex justify-around text-lg mt-16 w-9/12">
                    <div className="flex">
                        <div>
                            10:50:10
                        </div>
                        <div dir="rtl" className="ml-3">
                            שעה כניסה :
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            23/12/2023
                        </div>
                        <div dir="rtl" className="ml-3">
                            תאריך כניסה :
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="flex justify-around text-lg mt-5 w-9/12">
                    <div className="flex">
                        <div>
                            10:50:10
                        </div>
                        <div dir="rtl" className="ml-3">
                            שעה יצאה :
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            23/12/2023
                        </div>
                        <div dir="rtl" className="ml-3">
                            תאריך יציאה :
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-14">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <th colSpan={2} className="w-1/2 border-1 border-[#a1a1aa]">
                                <div className="p-1 pt-2">
                                    שם נהג
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    שם
                                </div>
                            </th>
                            <th colSpan={2} className="w-1/2 border-1 border-[#a1a1aa]">
                                <div className="p-1 pt-2">
                                    מספר רכב
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    מספר
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th className="border-1 border-[#a1a1aa] w-1/4">
                                <div className="p-1 pt-2">
                                    מס' תעודת משלוח
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    2
                                </div>
                            </th>
                            <th className="border-1 border-[#a1a1aa]">
                                <div className="p-1 pt-2">
                                    סוג חומר
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    כללי
                                </div>
                            </th>
                            <th className="border-1 border-[#a1a1aa]">
                                <div className="p-1 pt-2">
                                    שם אתר
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    &nbsp;
                                </div>
                            </th>
                            <th className="border-1 border-[#a1a1aa]">
                                <div className="p-1 pt-2">
                                    שם לקוח
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    שם
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th className="border-1 border-[#a1a1aa] w-1/4">
                                <div className="p-1 pt-2">
                                    נטו
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    משקל
                                </div>
                            </th>
                            <th className="border-1 border-[#a1a1aa]">
                                <div className="p-1 pt-2">
                                    טרה
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    משקל
                                </div>
                            </th>
                            <th className="border-1 border-[#a1a1aa]">
                                <div className="p-1 pt-2">
                                    ברוטו
                                </div>
                                <div className="border-1 border-[#e4e4e7] mt-1 mb-1"/>
                                <div className="p-1 pb-2">
                                    משקל
                                </div>
                            </th>
                            <th className="border-1 border-[#a1a1aa] w-1/4">
                                <div>
                                    השקילות בק"ג
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-9 flex justify-center">
                מפעיל : חאלד חטיב
            </div>
            <div className="mt-24">
                <div className="flex justify-between mr-5 ml-5">
                    <div dir="rtl">
                        חתימת הנהג : _______________________
                    </div>
                    <div className="hatema">
                        <div>
                            ח.ח גרוטאות הואדי
                        </div>
                        <div>
                            ח'טיב חאלד
                        </div>
                        <div>
                            309825941
                        </div>
                    </div>
                    <div dir="rtl">
                        חתימת המפעיל : _______________________
                    </div>
                </div>
            </div>
        </div>
    )
}) 