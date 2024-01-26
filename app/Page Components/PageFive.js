'use client';
import React from "react";
import ImageThree from "./imageThree";
import ImageFour from "./imageFour";
import ImageFive from "./imageFive";

export const PageFive = React.forwardRef((props,ref) =>{
    return(
        <div ref={ref} className="bg-white">
            <div className="pr-10 pl-10 pt-10 smalling_font_pages1">
                <ImageFive/>
                <div className="flex justify-around w-full">               
                    <div className="w-1/2 flex justify-center">               
                        <div className="w-full">
                            <div className="text-xs font-black hebrow_font">&nbsp;</div>                                    
                            <table className="w-full mb-2">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">תאריך יצור</th>
                                        <th className="border-1 border-black w-14">1.9</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מס' תעודת אב טיפוס</th>
                                        <th className="border-1 border-black w-14">1.10</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">תוקף תעודת אב טיפוס</th>
                                        <th className="border-1 border-black w-14">1.11</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">זהות מעבדה</th>
                                        <th className="border-1 border-black w-14">1.12</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מס' ותוקף רישיון יצרן</th>
                                        <th className="border-1 border-black w-14">1.13</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מס' אישור יצרן</th>
                                        <th className="border-1 border-black w-14">1.14</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מס' גלגלים / סרנים</th>
                                        <th className="border-1 border-black w-14">1.15</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מידת צמגים</th>
                                        <th className="border-1 border-black w-14">1.16</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-xs font-black hebrow_font">&nbsp;</div>
                            <table className="w-full mb-2">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">דגם מרכב</th>
                                        <th className="border-1 border-black w-14">2.3</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מס"ד מרכב</th>
                                        <th className="border-1 border-black w-14">2.4</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-xs font-black hebrow_font">&nbsp;</div>
                            <table className="w-full mb-2">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">משקל עצמי על הסרנים</th>
                                        <th className="border-1 border-black w-14">3.6</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">משקל עצמי כולל</th>
                                        <th className="border-1 border-black w-14">3.7</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">משקל מורשה</th>
                                        <th className="border-1 border-black w-14">3.8</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">חלוקת העומסים</th>
                                        <th className="border-1 border-black w-14">3.9</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">&nbsp;</th>
                                        <th className="border-1 border-black w-14">&nbsp;</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-xs font-black hebrow_font">&nbsp;</div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">גובה כף ריתום</th>
                                        <th className="border-1 border-black w-14">4.8</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מרכז כובד מטען</th>
                                        <th className="border-1 border-black w-14">4.9</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">רוחק סרנים</th>
                                        <th className="border-1 border-black w-14">4.10</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מרחק בין סרנים</th>
                                        <th className="border-1 border-black w-14">4.11</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">&nbsp;</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">&nbsp;</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="m-5"/>
                    <div className="w-1/2 flex justify-center">
                        <div className="w-full">
                            <div dir="rtl" className="text-xs font-black underline hebrow_font">1. פרטי כלי רכב (שלב 1)</div>
                            <table className="w-full mb-2">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">מספר רישוי</th>
                                        <th className="border-1 border-black w-14">1.1</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">מספר שלדה</th>
                                        <th className="border-1 border-black w-14">1.2</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">תוצר</th>
                                        <th className="border-1 border-black w-14">1.3</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">קוד דגם</th>
                                        <th className="border-1 border-black w-14">1.4</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">קטגוריה</th>
                                        <th className="border-1 border-black w-14">1.5</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">צבע</th>
                                        <th className="border-1 border-black w-14">1.6</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">סוג הרכב</th>
                                        <th className="border-1 border-black w-14">1.7</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">סוג תקינה</th>
                                        <th className="border-1 border-black w-14">1.8</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div dir="rtl" className="text-xs font-black underline hebrow_font">2. פרטי מרכב</div>
                            <table className="w-full mb-2">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">יצרן</th>
                                        <th className="border-1 border-black w-14">2.1</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">סוג מרכב</th>
                                        <th className="border-1 border-black w-14">2.2</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div dir="rtl" className="text-xs font-black underline hebrow_font">3. משקלים (ק"ג)</div>
                            <table className="w-full mb-2">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">עומס מרבי - כף</th>
                                        <th className="border-1 border-black w-14">3.1</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">עומס מרבי - סרן 1</th>
                                        <th className="border-1 border-black w-14">3.2</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">עומס מרבי - סרן 2</th>
                                        <th className="border-1 border-black w-14">3.3</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">עומס מרבי כולל</th>
                                        <th className="border-1 border-black w-14">3.4</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">משקל עצמי כף</th>
                                        <th className="border-1 border-black w-14">3.5</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div dir="rtl" className="text-xs font-black underline hebrow_font">4. מידות (מ"ם)</div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black w-56">&nbsp;</th>
                                        <th className="border-1 border-black w-56 text-right pr-2">אורך כללי</th>
                                        <th className="border-1 border-black w-14">4.1</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">רוחב כללי</th>
                                        <th className="border-1 border-black w-14">4.2</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">גובה כללי</th>
                                        <th className="border-1 border-black w-14">4.3</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">שלוחה אחורית</th>
                                        <th className="border-1 border-black w-14">4.4</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">אורך יצול</th>
                                        <th className="border-1 border-black w-14">4.5</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">גובה משטח העמסה</th>
                                        <th className="border-1 border-black w-14">4.6</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black text-right pr-2">גובה משטח העמסה (מ"ר)</th>
                                        <th className="border-1 border-black w-14">4.7</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div dir="rtl" className="text-xs font-black underline hebrow_font">5. התקנים נוספים</div>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th className="border-1 border-black w-24">זהות מעבדה</th>
                                <th className="border-1 border-black w-24">דו"ח מעבדה</th>
                                <th className="border-1 border-black w-24">זהות סוקר</th>
                                <th className="border-1 border-black w-24">תסקיר בטיחות</th>
                                <th className="border-1 border-black w-24">מס"ד</th>
                                <th className="border-1 border-black w-24">שם היצרן</th>
                                <th className="border-1 border-black w-24">שם המתקין</th>
                                <th className="border-1 border-black w-24">התקן</th>
                                <th className="border-1 border-black w-11">&nbsp;</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black w-11">5.1</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black w-11">5.2</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-2 flex justify-around w-full">
                    <div className="w-1/2 flex justify-center">                     
                        <div className="w-full">
                            <div dir="rtl">&nbsp;</div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">6.4</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">6.5</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">6.6</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="m-5"/>
                    <div className="w-1/2 flex justify-center">
                        <div className="w-full">
                            <div dir="rtl" className="text-xs font-black underline hebrow_font">6. תנאים ומגבלות להוספה</div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">6.1</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">6.2</th>
                                    </tr>
                                    <tr>
                                        <th className="border-1 border-black">&nbsp;</th>
                                        <th className="border-1 border-black w-14">6.3</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-2">
                    <div dir="rtl" className="text-xs font-black underline hebrow_font">7. הערות</div>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black w-14">7.1</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black w-14">7.2</th>
                            </tr>
                            <tr>
                                <th className="border-1 border-black">&nbsp;</th>
                                <th className="border-1 border-black w-14">7.3</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center mt-14">
                <ImageFour />
            </div>
            <div className="">
                <ImageThree />
            </div>
        </div>
    )
})