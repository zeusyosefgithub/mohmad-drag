import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState, useRef } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Alert } from "@mui/material";
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { firestore, storagee } from "../FireBase/firebase";
import { update } from "lodash";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { FaFile } from "react-icons/fa";

export default function ModalUploadFile({ show, disable, dragnum, index, aglaID, existsFiles }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingDown, setLoadingDown] = useState(false);
    const [loadingDel, setLoadingDel] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file || null);
        if (file) {
            setTimeout(() => {
                setShowAlert(true);
            }, 200);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const addFile = async () => {
        setLoading(true);
        try {
            const storageRefEndDate = ref(storagee, `${dragnum}-${index}`);
            const uploadTaskEndDate = await uploadBytesResumable(storageRefEndDate, selectedFile);
            !existsFiles.includes(index) && await updateDoc(doc(firestore, 'tfaol', aglaID), {
                existsFiles: [...existsFiles, index]
            });
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
        reset();
    }

    const reset = () => {
        setSelectedFile(null);
        setShowAlert(false);
        disable();
    }

    const filePath = `gs://mohamd-drag.firebasestorage.app/${dragnum}-${index}`;


    const handleGetFile = async () => {
        setLoadingDown(true);
        const fileRef = ref(storagee, filePath); // Replace with your file path
        try {
          const url = await getDownloadURL(fileRef);
          setSelectedFile(url);
          window.open(url, '_blank');
        } catch (error) {
          console.error("Failed to fetch file URL:", error);
        }
        setLoadingDown(false);
    }

    const handleDeleteFile = async () => {
        setLoadingDel(true);
        const fileRef = ref(storagee, filePath);
        try {
          await deleteObject(fileRef);
          await updateDoc(doc(firestore, 'tfaol', aglaID), {
            existsFiles: arrayRemove(index)
        });
          console.log('File deleted successfully');
        } catch (error) {
          console.error('Error deleting file:', error);
        }
        setLoadingDel(false);
      };



    return (
        <Modal
            placement="center"
            className="test-fontt select-none fixed"
            backdrop={"blur"}
            size="3xl"
            isOpen={show}
            onClose={reset}
        >
            <ModalContent className="h-[90%]">
                <ModalHeader className="flex justify-center border-b-2">
                    {
                        !existsFiles?.includes(index) ? 'העלאת קובצ' : 'הורדת קובץ'
                    }

                </ModalHeader>
                <ModalBody className="h-full">
                    {
                        !existsFiles?.includes(index) ?
                            <div dir="rtl" className="w-full h-full">
                                <input
                                    ref={fileInputRef} // Attach the reference
                                    onChange={handleFileChange}
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                />
                                <div className="flex justify-center flex-col items-center h-full w-full">
                                    <label
                                        htmlFor="file-upload"
                                        className="border-2 p-10 border-primary border-dashed shadow-2xl cursor-pointer"
                                    >
                                        <FaFileUpload className="text-7xl text-primary" />
                                    </label>
                                    <div className={` transition-all duration-500 ease-in-out ${showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} mt-14 w-full flex items-center`}>
                                        <Alert
                                            className={`w-full flex items-center`}
                                            dir="rtl"
                                            severity="success"
                                        >
                                            <div className="pr-2 w-full flex items-center justify-between ">
                                                <div>הקובצ {selectedFile?.name} מוכן להעלאה</div>
                                            </div>
                                        </Alert>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            className="mr-2"
                                            onClick={() => {
                                                setSelectedFile(null); setTimeout(() => {
                                                    setShowAlert(false);
                                                }, 200);
                                            }}
                                        >
                                            הסרה
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div dir="rtl" className="w-full h-full">
                                <div className="flex justify-center flex-col items-center h-full w-full">
                                    <div className={` transition-all duration-500 ease-in-out opacity-100 translate-y-0 mt-14 w-full flex items-center`}>
                                        <Alert
                                            className={`w-full flex items-center`}
                                            dir="rtl"
                                            severity="success"
                                        >
                                            <div className="pr-2 w-full flex items-center justify-between ">
                                                <div>הקובצ נמצא במערכת</div>
                                            </div>
                                        </Alert>
                                        <Button
                                            isLoading={loadingDown}
                                            size="sm"
                                            color='success'
                                            variant="flat"
                                            className="mr-2"
                                            onClick={handleGetFile}
                                        >
                                            הורדה
                                        </Button>
                                        <Button
                                            isLoading={loadingDel}
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            className="mr-2"
                                            onClick={() => {
                                                setSelectedFile(null); handleDeleteFile(); setTimeout(() => {
                                                    setShowAlert(false);
                                                }, 200);
                                            }}
                                        >
                                            מחיקה
                                        </Button>
                                    </div>
                                </div>
                            </div>
                    }

                </ModalBody>
                <ModalFooter className="border-t-2">
                    <div>
                        <Button
                            className="mr-2 ml-2"
                            color="warning"
                            variant="flat"
                            size="sm"
                            onClick={reset}
                        >
                            סגור
                        </Button>
                        <Button isDisabled={!selectedFile} isLoading={loading} color="primary" variant="flat" size="sm" onClick={addFile}>
                            אישור
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
