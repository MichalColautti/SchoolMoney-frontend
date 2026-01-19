import ClassItem from "../items/ClassItem";
import React, {useState} from "react";
import cancelIcon from "../../assets/cancel.svg";
import {useOnChange} from "../../hooks/useOnChange";
import {useAuth} from "../../contexts/AuthContext";
import {emptyJoinClassErrors, validateJoinClass} from "../../scripts/validate/utils/validateJoinClass";
import {joinClass} from "../../services/parent";

const ClassesTab = () => {
    const emptyJoinClassData = {
        childId: "",
        accessCode: ""
    }

    const {data, clearData, onChangeInput} = useOnChange(emptyJoinClassData)

    const [errors, setErrors] = useState(emptyJoinClassErrors);

    const {user, token, onChangeUserData, onChangeChildClass} = useAuth();

    const [isJoinClassModalOpen, setIsJoinClassModalOpen] = useState(false);

    const toggleJoinClassModal = () => setIsJoinClassModalOpen(!isJoinClassModalOpen);

    const handleJoinClass = async () => {
        console.log(data);

        if(!validateJoinClass(data, setErrors)) return

        try {
            const response = await joinClass(data, token);

            onChangeUserData(response, 'classes');

            onChangeChildClass(response.name, data.childId)

            toggleJoinClassModal();

            clearData();

            setErrors(emptyJoinClassErrors);
        } catch (err) {
            switch (err.message) {
                case "Access token does not exist":
                    setErrors({childId: "", accessCode: "Kod jest nieprawidłowy"});
                    break;
            }
        }
    };

    return (
        <div>
            <div style={styles.classContainer}>
                {user && user.classes && user.classes.length > 0 && user.classes.map((classInfo) => (
                    <ClassItem key={classInfo.id} classInfo={classInfo}/>
                ))}
            </div>

            <div style={styles.actionButtons}>
                <button style={styles.button} onClick={toggleJoinClassModal}>
                    Dołącz do klasy
                </button>
            </div>

            {isJoinClassModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Dołącz do klasy</h2>
                            <button style={styles.closeButton} onClick={toggleJoinClassModal}>
                                <img src={`${cancelIcon}`} alt="Zamknij" width="24" height="24"/>
                            </button>
                        </div>

                        <p style={styles.modalSubtitle}>
                            Użyj kodu dostępu otrzymanego od skarbnika
                        </p>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Dziecko</label>
                            <select
                                style={styles.selectInput}
                                value={data.childId}
                                onChange={(e) => onChangeInput(e.target.value, 'childId')}
                            >
                                <option value="" disabled>
                                    Wybierz dziecko
                                </option>
                                {
                                    user.children && user.children.length > 0 && user.children.filter(child => child.className === null).map((child) => (
                                    <option key={child.id} value={child.id}>
                                        {child.name}
                                    </option>
                                ))}
                            </select>
                            {errors.childId && (
                                <span style={styles.errorText}>{errors.childId}</span>
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Kod dostępu</label>
                            <input
                                type="text"
                                style={styles.textInput}
                                value={data.accessCode}
                                onChange={(e) => onChangeInput(e.target.value, 'accessCode')}
                            />
                            {errors.accessCode && (
                                <span style={styles.errorText}>{errors.accessCode}</span>
                            )}
                        </div>
                        <button
                            style={{...styles.button, marginTop: "24px"}}
                            onClick={handleJoinClass}
                        >
                            Dołącz do klasy
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
        width: "100%",
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
};

export default ClassesTab;
