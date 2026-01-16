import MyClassItem from "../items/MyClassItem";
import {useOnChange} from "../../hooks/useOnChange";
import React, {useRef, useState} from "react";
import cancelIcon from "../../assets/cancel.svg";
import TrashcanIcon from "../../assets/trashcan.svg";
import UploadFileIcon from "../../assets/upload.svg";
import {emptyAddClassErrors, validateAddClass} from "../../scripts/validate/validateAddClass";
import {useAuth} from "../../contexts/AuthContext";
import {addClass} from "../../services/treasurer";

const MyClassesTab = () => {
    const emptyAddClassData = {
        name: "",
        year: "",
        photo: null,
    };

    const {data, clearData, onChangeInput} = useOnChange(emptyAddClassData);

    const {data: errors, clearData: clearErrors, onChangeInput: onChangeError} = useOnChange(emptyAddClassErrors);

    const {token, onAppendToList, user} = useAuth();

    const fileInputRef = useRef(null);

    const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);

    const toggleAddClassModal = () => setIsCreateClassModalOpen(!isCreateClassModalOpen);

    const handleAddClass = async () => {
        if (!validateAddClass(data, onChangeError)) return

        try {
            const response = await addClass(data, token);

            onAppendToList(response, 'classes');

            toggleAddClassModal();

            console.log(user)

            clearData();

            clearErrors();
        } catch (err) {
            console.error(err);
        }
    };

    console.log(user)

    return (
        <div>
            {/* Class container */}
            <div style={styles.classContainer}>
                {user && user.classes.length > 0 && user.classes.map((classInfo) => (
                    <MyClassItem key={classInfo.id} classInfo={classInfo}/>
                ))}
            </div>

            {/* Action buttons */}
            <div style={styles.actionButtons}>
                <button
                    style={styles.button}
                    onClick={toggleAddClassModal}
                >
                    Stwórz klasę
                </button>
            </div>

            {isCreateClassModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContentLarge}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Stwó,rz nową klasę</h2>
                            <button
                                style={styles.closeButton}
                                onClick={toggleAddClassModal}
                            >
                                <img src={`${cancelIcon}`} alt="Zamknij" width="24" height="24"/>
                            </button>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nazwa klasy</label>
                            <input
                                type="text"
                                name="name"
                                style={styles.textInput}
                                value={data.name}
                                onChange={(e) => onChangeInput(e.target.value, 'name')}
                            />
                            {errors.name && (
                                <span style={styles.errorText}>{errors.name}</span>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Rocznik</label>
                            <input
                                type="text"
                                name="year"
                                style={styles.textInput}
                                value={data.year}
                                onChange={(e) => onChangeInput(e.target.value, 'year')}
                            />
                            {errors.year && (
                                <span style={styles.errorText}>{errors.year}</span>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Zdjęcie klasy</label>
                            <div
                                style={
                                    data.photo
                                        ? styles.uploadSectionFilled
                                        : styles.uploadContainer
                                }
                                onClick={() =>
                                    fileInputRef.current && fileInputRef.current.click()
                                }
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{display: "none"}}
                                    onChange={(e) => onChangeInput(e.target.files[0], 'photo')}
                                />

                                {data.photo ? (
                                    <div style={styles.fileRow}>
                                        <img src={URL.createObjectURL(data.photo)} alt="imageFile"
                                             style={styles.classImage}/>
                                        <span style={styles.fileName}>{data.photo.name}</span>
                                        <button
                                            style={styles.trashBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onChangeInput(null, 'photo');
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                            }}
                                        >
                                            <img src={`${TrashcanIcon}`} alt="delete"/>
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{marginBottom: "12px"}}>
                                            <img
                                                src={`${UploadFileIcon}`}
                                                alt="UploadFile"
                                                width={64}
                                                height={64}
                                            />
                                        </div>
                                        <span style={styles.uploadLabelBold}>
                      Wyślij zdjęcie klasy
                    </span>
                                    </>
                                )}
                            </div>
                            {errors.photo && (
                                <span style={styles.errorText}>{errors.photo}</span>
                            )}
                        </div>

                        <button
                            style={{...styles.button, marginTop: "24px"}}
                            onClick={handleAddClass}
                        >
                            Stwórz klasę
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    classContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "16px",
    },
    actionButtons: {
        display: "flex",
        gap: "16px",
    },
    button: {
        flex: 1,
        background: "#2B7FFF",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        padding: "16px 0",
        borderRadius: 8,
        fontSize: 16,
        cursor: "pointer",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "16px",
        width: "90%",
        maxWidth: "500px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        position: "relative",
    },
    modalContentLarge: {
        backgroundColor: "#fff",
        padding: "32px",
        borderRadius: "20px",
        width: "90%",
        maxWidth: "600px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    modalTitle: {
        margin: 0,
        fontSize: "20px",
        fontWeight: "bold",
        color: "#000",
    },
    closeButton: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalSubtitle: {
        margin: "0 0 24px 0",
        color: "#667",
        fontSize: "14px",
    },
    formGroup: {
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#000",
    },
    selectInput: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #2B7FFF",
        backgroundColor: "#fff",
        fontSize: "14px",
        color: "#666",
        outline: "none",
    },
    textInput: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#F0F9FF",
        fontSize: "16px",
        height: "40px",
        outline: "none",
    },
    uploadContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F0F9FF",
        border: "2px dashed #2B7FFF",
        borderRadius: "10px",
        padding: "32px",
        cursor: "pointer",
        minHeight: "140px",
        boxSizing: "border-box",
    },
    uploadSectionFilled: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#F2F7FD",
        border: "1px solid transparent",
        borderRadius: "10px",
        padding: "14px 16px",
        cursor: "pointer",
        boxSizing: "border-box",
    },
    uploadLabelBold: {
        fontWeight: "600",
        fontSize: "15px",
        color: "#000",
    },
    fileRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    fileName: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#101828",
        flex: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    trashBtn: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: 0,
        marginLeft: "auto",
    },
    errorText: {
        color: "red",
        fontSize: "12px",
        marginTop: "4px",
    },
    classImage: {
        width: "100px",
        height: "100px",
        borderRadius: "10px",
    }
};

export default MyClassesTab;
