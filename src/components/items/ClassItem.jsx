import {useState} from "react";
import TrashcanIcon from "../../assets/trashcan.svg";
import {REACT_APP_API_BASE_URL} from "../../services/utils/request";
import {useAuth} from "../../contexts/AuthContext";
import {deleteChildFromClass} from "../../services/parent";
import {useUserData} from "../../contexts/UserDataContext";

const ClassItem = ({classInfo}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const {token} = useAuth();
    const {onReplaceItemInList, onDeleteFromList, onChangeChildClass} = useUserData();

    const {name, year, fundraisers, children, imageId, id} = classInfo;

    const handleDeleteChildFromClass = async (classId, childId) => {
        console.log("handleDeleteChildFromClass", classId, childId);
        try {
            const response = await deleteChildFromClass(classId, childId, token);

            const hasRemainingChildren = response.children.some(child => child.isMyChild);

            console.log(response)

            if (hasRemainingChildren) {
                onReplaceItemInList(response, 'classes');
                console.log("1")
            } else {
                onDeleteFromList(response, 'classes');
                console.log("1")
            }

            onChangeChildClass(null, childId)
        }
        catch (err){
            console.error(err);
        }
    }

    return (
        <div style={styles.classItem}>
            {/* Header */}
            <div style={styles.classHeader} onClick={toggleExpand}>
                <div style={styles.classInfo}>
                    <img src={`${REACT_APP_API_BASE_URL}/image/get/${imageId}`} alt={"class-img"}
                         style={styles.classIcon}/>
                    <div style={styles.className}>{name}</div>
                    <div style={styles.classYear}>{year}</div>
                </div>
                <div style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</div>
            </div>

            {/* Class details */}
            {isExpanded && (
                <div style={styles.expandedContent}>
                    <h3 style={styles.sectionTitle}>Aktywne zbiórki</h3>
                    {fundraisers && fundraisers.map((fund) => (
                        <div key={fund.id} style={styles.fundraiserItem}>
                            <div style={styles.fundraiserInfo}>
                                <span style={styles.fundraiserIcon}/>
                                <span>{fund.name}</span>
                            </div>
                            <div style={styles.fundraiserActions}>
                                {fund.userPaymentStatus === "paid" ? (
                                    <button
                                        style={{...styles.actionButton, ...styles.buttonPaid}}
                                    >
                                        Wpłacono
                                    </button>
                                ) : (
                                    <button
                                        style={{...styles.actionButton, ...styles.buttonUnpaid}}
                                    >
                                        Wpłać
                                    </button>
                                )}

                                {fund.fundraiserStatus === "active" ? (
                                    <button
                                        style={{...styles.actionButton, ...styles.buttonActive}}
                                    >
                                        Aktywna
                                    </button>
                                ) : (
                                    <button
                                        style={{...styles.actionButton, ...styles.buttonUnactive}}
                                    >
                                        Zakończona
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {/*My children*/}
                    <h3 style={styles.sectionTitle}>Moje dzieci</h3>
                    <div style={styles.studentList}>
                        {children.map((student) => (
                            student.isMyChild === true &&
                            <div key={student.id} style={styles.studentItem}>
                                <div style={styles.studentInfo}>
                                    <img src={`${REACT_APP_API_BASE_URL}/image/get/${student.imageId}?t=${new Date().getTime()}`}
                                         alt={"child-avatar"} style={styles.kidImage}/>
                                    <span>{`${student.name} ${student.surname}`}</span>
                                </div>
                                <img
                                    src={`${TrashcanIcon}`}
                                    style={styles.deleteIcon}
                                    alt={"delete"}
                                    onClick={() => handleDeleteChildFromClass(id, student.id)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Students list*/}
                    <h3 style={styles.sectionTitle}>Uczniowie</h3>
                    <div style={styles.studentList}>
                        {children.map((student) => (
                            student.isMyChild === false &&
                            <div key={student.id} style={styles.studentItem}>
                                <div style={styles.studentInfo}>
                                    <img src={`${REACT_APP_API_BASE_URL}/image/get/${student.imageId}`}
                                         alt={"child-avatar"} style={styles.kidImage}/>
                                    <span>{student.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    classItem: {
        background: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 1px 4px #e6eaf3",
    },
    classHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
    },
    classInfo: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    classIcon: {
        width: 40,
        height: 40,
        borderRadius: "16px",
        background: "#4789dfff",
    },
    className: {
        fontWeight: "bold",
        fontSize: "16px",
        color: "#1E293B",
    },
    classYear: {
        fontSize: "14px",
        color: "#64748B",
    },
    expandArrow: {
        fontSize: "20px",
        color: "#2B7FFF",
        fontWeight: "bold",
    },
    expandedContent: {
        paddingTop: "16px",
        marginTop: "16px",
        borderTop: "3px solid #F3F4F6",
    },
    accessCode: {
        fontSize: "14px",
        color: "#64748B",
        marginBottom: "16px",
    },
    sectionTitle: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: "12px",
    },
    fundraiserItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
    },
    fundraiserInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontWeight: "500",
    },
    fundraiserIcon: {
        width: 32,
        height: 32,
        borderRadius: "16px",
        background: "#00ec18ff",
    },
    fundraiserActions: {
        display: "flex",
        gap: "8px",
    },
    actionButton: {
        border: "none",
        borderRadius: "8px",
        padding: "8px 16px",
        fontWeight: "bold",
        fontSize: "14px",
        cursor: "pointer",
    },
    buttonPaid: {
        background: "#2B7FFF",
        color: "#fff",
    },
    buttonUnpaid: {
        background: "#F1F5F9",
        color: "#1E293B",
    },
    buttonActive: {
        background: "#D9F9E5",
        color: "#1A844D",
    },
    buttonUnactive: {
        background: "#f9d9d9ff",
        color: "#841a1aff",
    },
    studentList: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    studentItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 0",
    },
    studentInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    studentAvatar: {
        width: 32,
        height: 32,
        borderRadius: "16px",
        background: "#6c8aefff",
    },
    deleteIcon: {
        cursor: "pointer",
        fontSize: "18px",
    },
    kidImage: {
        width: "30px",
        height: "30px",
        borderRadius: "5px",
    }
};

export default ClassItem;
