import { useState, useRef } from "react";
import TrashcanIcon from "../assets/trashcan.svg";
import CancelIcon from "../assets/cancel.svg";
import ImageFileIcon from "../assets/imageFile.svg";
import UploadFileIcon from "../assets/upload.svg"

const ChildrenTab = ({ kids }) => {
  const [isAddKidModalOpen, setIsAddKidModalOpen] = useState(false);
  const [newChild, setNewChild] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    photo: null,
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    photo: "",
  });

  const [isAddExistingKidModalOpen, setIsAddExistingKidModalOpen] =
    useState(false);
  const [existingKidUID, setExistingKidUID] = useState("");
  const [existingKidError, setExistingKidError] = useState("");

  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const toggleAddKidModal = () => setIsAddKidModalOpen(!isAddKidModalOpen);
  const toggleAddExistingKidModal = () =>
    setIsAddExistingKidModalOpen(!isAddExistingKidModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChild((prev) => ({ ...prev, [name]: value }));
    if (value) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewChild((prev) => ({ ...prev, photo: file }));
    if (file) {
      setFormErrors((prev) => ({ ...prev, photo: "" }));
    }
  };

  const handleAddChild = () => {
    const errors = {};
    if (!newChild.firstName) errors.firstName = "Imię jest wymagane.";
    if (!newChild.lastName) errors.lastName = "Nazwisko jest wymagane.";
    if (!newChild.dob) errors.dob = "Data urodzenia jest wymagana.";
    if (!newChild.photo) errors.photo = "Zdjęcie profilowe jest wymagane.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log("New child data:", newChild);

    toggleAddKidModal();
    setNewChild({
      firstName: "",
      lastName: "",
      dob: "",
      photo: null,
    });
    setFormErrors({
      firstName: "",
      lastName: "",
      dob: "",
      photo: "",
    });
  };

  const handleAddExistingChild = () => {
    if (!existingKidUID.trim()) {
      setExistingKidError("UID jest wymagane.");
      return;
    }

    console.log("Adding existing child with UID:", existingKidUID);
    // Add logic

    toggleAddExistingKidModal();
  };

  return (
    <div>
      <div style={styles.container}>
        <table style={styles.tableConatiner}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th></th>
              <th>Imię Nazwisko</th>
              <th>Klasa</th>
              <th>Data urodzenia</th>
              <th>UID</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {kids.map((child) => (
              <tr key={child.uid} style={{ height: 48 }}>
                <td>
                  <div style={styles.avatar} />
                </td>
                <td>{child.name}</td>
                <td>{child.class}</td>
                <td>{child.dateOfBirth}</td>
                <td>{child.uid}</td>
                <td>
                  <span style={{ cursor: "pointer", marginRight: 8 }}>
                    edytuj
                  </span>
                  <span style={{ cursor: "pointer" }}>usuń</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action buttons */}
      <div style={styles.actionButtons}>
        <button style={styles.button} onClick={toggleAddKidModal}>
          Dodaj nowe dziecko
        </button>
        <button style={styles.button} onClick={toggleAddExistingKidModal}>
          Dodaj istniejące dziecko
        </button>
      </div>

      {/* Add kid modal */}
      {isAddKidModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalWindow}>
            {/* Header */}
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Dodaj dziecko do konta</h3>
              <button onClick={toggleAddKidModal} style={styles.closeButton}>
                <img src={CancelIcon} alt="cancel" width={24} height={24} />
              </button>
            </div>

            {/* Add kid inputs */}
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Imię</label>
                <input
                  type="text"
                  name="firstName"
                  style={styles.input}
                  value={newChild.firstName}
                  onChange={handleInputChange}
                />
                {formErrors.firstName && (
                  <span style={styles.errorText}>{formErrors.firstName}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Nazwisko</label>
                <input
                  type="text"
                  name="lastName"
                  style={styles.input}
                  value={newChild.lastName}
                  onChange={handleInputChange}
                />
                {formErrors.lastName && (
                  <span style={styles.errorText}>{formErrors.lastName}</span>
                )}
              </div>

              {/* Date picker */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Data urodzenia</label>
                <div
                  style={styles.customDateInput}
                  onClick={() =>
                    dateInputRef.current && dateInputRef.current.showPicker()
                  }
                >
                  <input
                    type="date"
                    name="dob"
                    ref={dateInputRef}
                    value={newChild.dob}
                    onChange={handleInputChange}
                    style={{ ...styles.dateInputNative, pointerEvents: "none" }}
                  />
                  <span style={styles.datePlaceholder}>
                    {newChild.dob
                      ? new Date(newChild.dob)
                          .toLocaleDateString("pl-PL", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(/\//g, " . ")
                      : "dd . mm . rrrr"}
                  </span>
                </div>
                {formErrors.dob && (
                  <span style={styles.errorText}>{formErrors.dob}</span>
                )}
              </div>

              {/* Image upload */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Zdjęcie profilowe</label>

                <div
                  style={
                    newChild.photo
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
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  {newChild.photo ? (
                    <div style={styles.fileRow}>
                      <img src={ImageFileIcon} alt="imageFile" width={24} height={24} />
                      <span style={styles.fileName}>{newChild.photo.name}</span>
                      <button
                        style={styles.trashBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewChild((prev) => ({ ...prev, photo: null }));
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                      >
                        <img src={TrashcanIcon} alt="delete" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ marginBottom: "12px" }}>
                        <img src={UploadFileIcon} alt="UploadFile" width={80} height={80} />
                      </div>
                      <span style={styles.uploadLabelBold}>
                        Wyślij zdjęcie profilowe
                      </span>
                    </>
                  )}
                </div>
                {formErrors.photo && (
                  <span style={styles.errorText}>{formErrors.photo}</span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div style={styles.modalFooter}>
              <button onClick={handleAddChild} style={styles.submitButton}>
                Dodaj dziecko
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add existing kid */}
      {isAddExistingKidModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalWindow}>
            {/* Header */}
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                Dodaj istniejące dziecko do konta
              </h3>
              <button
                style={styles.closeButton}
                onClick={toggleAddExistingKidModal}
              >
                <img src={CancelIcon} alt="cancel" width={24} height={24} />
              </button>
            </div>

            {/* Body */}
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  UID
                  <span style={{ fontWeight: 400, color: "#aaa" }}>
                    {" "}
                    (numer dziecka w systemie, widoczny na koncie innego
                    rodzica)
                  </span>
                </label>
                <input
                  type="text"
                  style={styles.input}
                  value={existingKidUID}
                  onChange={(e) => {
                    setExistingKidUID(e.target.value);
                    if (e.target.value) setExistingKidError("");
                  }}
                />
                {existingKidError && (
                  <span style={styles.errorText}>{existingKidError}</span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div style={styles.modalFooter}>
              <button
                onClick={handleAddExistingChild}
                style={styles.submitButton}
              >
                Dodaj dziecko
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 1px 4px #e6eaf3",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#2b7fff",
  },
  tableConatiner: {
    width: "100%",
    borderCollapse: "collapse",
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
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalWindow: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    width: "600px",
    maxWidth: "95%",
    padding: "32px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#101828",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
  },
  closeIcon: {
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#344054",
  },
  input: {
    background: "#F2F7FD",
    border: "1px solid transparent",
    borderRadius: "10px",
    padding: "14px 16px",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    color: "#101828",
  },
  customDateInput: {
    position: "relative",
    background: "#F0F9FF",
    borderRadius: "10px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    overflow: "hidden",
  },
  dateInputNative: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 100,
    cursor: "pointer",
    background: "transparent",
    border: "none",
    pointerEvents: "none",
  },
  datePlaceholder: {
    color: "#101828",
    fontWeight: "500",
    fontSize: "15px",
    fontFamily: "monospace",
    letterSpacing: "1px",
    pointerEvents: "none",
    zIndex: -1,
  },
  fileRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  dateIcon: {
    pointerEvents: "none",
    zIndex: -1,
  },
  uploadSectionSimple: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    background: "#F2F7FD",
    borderRadius: "10px",
    padding: "14px 16px",
    border: "1px solid transparent",
  },
  uploadLabelBold: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#101828",
    margin: "0 0 4px 0",
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
  modalFooter: {
    marginTop: "32px",
  },
  submitButton: {
    width: "100%",
    background: "#2B7FFF",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    padding: "16px 0",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(43, 127, 255, 0.2)",
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
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export default ChildrenTab;
