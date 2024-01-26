import React from "react";
import ImageOne from "./imageOne";
import ImageTwo from "./imageTwo";

export const PageOne = React.forwardRef((props, ref) => {

    return (
        <div ref={ref} className="bg-white">
            <div className="flex justify-end pt-4 pr-4">
                <div className="w-16">
                    <ImageTwo />
                </div>
            </div>
            <div className="flex justify-center underline text-base hebrow_font">
                בקשה לרישום רכב
            </div>
            <div className="flex justify-around text-xs mr-10 ml-10 mt-5">
                <div className="w-full">
                    <div className="flex justify-center">מס' הרכב</div>
                    <table className="w-9/12">
                        <tbody>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    <div className="flex justify-center">תעודת חידוש</div>
                    <table className="w-9/12">
                        <tbody>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    <div className="flex justify-center">תאריך רישום</div>
                    <table className="w-9/12">
                        <tbody>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    <div className="flex justify-center">מקוריות</div>
                    <table className="w-9/12">
                        <tbody>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    <div className="flex justify-center">מס' רכב קודם</div>
                    <table className="w-9/12">
                        <tbody>
                            <tr>
                                <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="text-xs mr-10 mt-1" dir="rtl">
                אני/ו החתום/ים מטה מבקש בזה לרשום את כלי הרכב שפרטיו מפורטים להלן ומסכמכיו המוצורפים בוה
            </div>
            <div className="text-xs w-full pl-10 pr-10 mt-2 mb-4">
                <table className="w-full smalling_font_pages">
                    <tbody>
                        <tr>
                            <th className="w-16 border-1 border-[#a1a1aa]">
                                מיקוד
                            </th>
                            <th className="w-16 border-1 border-[#a1a1aa]">
                                בית                    
                            </th>
                            <th className="w-16 border-1 border-[#a1a1aa]">
                                רחוב
                            </th>
                            <th className="w-16 border-1 border-[#a1a1aa]">
                                ישוב
                            </th>
                            <th className="w-16 border-1 border-[#a1a1aa]">
                                מס' ת.ז. / חברה
                            </th>
                            <th className="w-16 border-1 border-[#a1a1aa]">
                                שם פרטי         
                            </th>
                            <th className="w-16 border-1 border-[#a1a1aa]">
                                שם משפחה / חברה
                            </th>
                            <th rowSpan={4} className="p-2 w-16 border-1 border-[#a1a1aa]">
                                ימולא על ידי המבקשים
                            </th>
                        </tr>
                        <tr>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                        </tr>
                        <tr>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                        </tr>
                        <tr>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                        </tr>
                        <tr>
                            <th rowSpan={2} colSpan={4} className="border-1 border-[#a1a1aa]"><div className="flex justify-end mr-2">חותמת החברה</div></th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th rowSpan={4} className="p-2 border-1 border-[#a1a1aa]">
                                במקרח של רכב פרטי הזכאים לחתום
                            </th>
                        </tr>
                        <tr>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                        </tr>
                        <tr>
                            <th rowSpan={2} colSpan={4} className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                        </tr>
                        <tr>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                            <th className="border-1 border-[#a1a1aa]">&nbsp;</th>
                        </tr> 
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-14">
                <ImageOne />
            </div>
        </div>
    )
}) 