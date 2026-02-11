import { useState, useRef, useEffect, useContext } from "react";
import FundraiserItem from "./../items/FundraiserItemTreasurer.jsx";
import CancelIcon from "../../assets/cancel.svg";
import TrashcanIcon from "../../assets/trashcan.svg";
import UploadFileIcon from "../../assets/upload.svg";
import { useUserData } from "../../contexts/UserDataContext";
import {addFundraising, getTreasurerFundraisings} from "../../services/treasurer";
import { AuthContext } from "../../contexts/AuthContext";

const FundraiserTabTreasurer = ({ fundraisersData: initialData }) => {
  const { user } = useUserData();
  const { token } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const treasurerClasses = user?.classes?.filter((c) => c.isTreasurer) || [];

  const mapFundraiserDtoToDisplayItem = (dto) => {
    const foundClass =
      treasurerClasses.find((c) => `${c.name} ${c.year}` === dto.className) ||
      treasurerClasses.find((c) => c.name === dto.className);

    return {
      id: dto.id,
      name: dto.name,
      classId: foundClass?.id || null,
      className: dto.className,
      goal: dto.className || "",
      description: dto.description,
      endDate: dto.endDate ? new Date(dto.endDate).toLocaleDateString("pl-PL") : "",
      amount: dto.amount,
      organizer: dto.classTreasurerName || null,
      imageUrl: "",
      badges:
        dto.status === "ACTIVE"
          ? [{ text: "Aktywna", type: "green" }]
          : [{ text: "Zakończona", type: "red" }],
      children: dto.collectedAmounts
        ? dto.collectedAmounts.map((ca) => ({
            id: ca.child.id,
            name: `${ca.child.name} ${ca.child.surname}`,
            amountPaid: ca.amount,
            imageId: ca.child.imageId, // Note: using child id as imageId placeholder? No, DTO has imageId
          }))
        : [],
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTreasurerFundraisings(token);
        if (data && Array.isArray(data)) {
           const mapped = data.map(mapFundraiserDtoToDisplayItem);
           setList(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch fundraisings:", error);
      }
    };

    if (token) {
        fetchData();
    }
  }, []);

  const emptyForm = {
    name: "",
    classId: "",
    description: "",
    endDate: "",
    amount: "",
    photo: null,
  };

  const [formData, setFormData] = useState(emptyForm);


  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setFormData({ ...item, photo: null });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) return;

    const finalImageUrl = formData.photo
      ? URL.createObjectURL(formData.photo)
      : formData.imageUrl;

    if (isEditing) {
      setList((prev) =>
        prev.map((item) =>
          item.id === formData.id
            ? { ...formData, imageUrl: finalImageUrl }
            : item,
        ),
      );
    } else {

      const newItem = await addFundraising(formData, token);

      setList((prev) => [newItem, ...prev]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData(emptyForm);
  };

  return (
    <div style={{ padding: "10px" }}>
      {list.map((f) => (
        <FundraiserItem key={f.id} fundraiser={f} onEdit={handleOpenEdit} />
      ))}

      <button
        style={tabStyles.addMainBtn}
        onClick={() => {
          setIsEditing(false);
          setFormData(emptyForm);
          setIsModalOpen(true);
        }}
      >
        Dodaj nową zbiórkę
      </button>

      {isModalOpen && (
        <div style={tabStyles.overlay}>
          <div style={tabStyles.modal}>
            <div style={tabStyles.modalHeader}>
              <h3 style={{ margin: 0 }}>
                {isEditing ? "Edytuj zbiórkę" : "Nowa zbiórka"}
              </h3>
              <button onClick={closeModal} style={tabStyles.closeBtn}>
                <img src={CancelIcon} alt="x" width="24" />
              </button>
            </div>

            <div style={tabStyles.scrollBody}>
              <label style={tabStyles.label}>Tytuł zbiórki</label>
              <input
                style={tabStyles.input}
                placeholder="np. Wyjazd w góry"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label style={tabStyles.label}>Klasa</label>
              <select
                style={tabStyles.input}
                value={formData.classId || ""}
                onChange={(e) => {
                  const selectedClass = treasurerClasses.find(
                    (c) => c.id === e.target.value,
                  );
                  setFormData({
                    ...formData,
                    classId: e.target.value,
                  });
                }}
              >
                <option value="" disabled>Wybierz klasę</option>
                {treasurerClasses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} {c.year}</option>
                ))}
              </select>

              <label style={tabStyles.label}>Zdjęcie</label>
              <div
                style={
                  formData.photo || formData.imageUrl
                    ? tabStyles.uploadFilled
                    : tabStyles.uploadBox
                }
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.files[0] })
                  }
                />
                {formData.photo || formData.imageUrl ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                      <img
                        src={
                          formData.photo
                            ? URL.createObjectURL(formData.photo)
                            : formData.imageUrl
                        }
                        alt="preview"
                        style={{
                        width: 50,
                        height: 40,
                        borderRadius: 6,
                        objectFit: "cover",
                      }}
                    />
                    <span style={{ flex: 1, fontSize: 12, overflow: "hidden" }}>
                      {formData.photo
                        ? formData.photo.name
                        : "Aktualne zdjęcie"}
                    </span>
                    <button
                      style={tabStyles.trash}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, photo: null});
                      }}
                    >
                      <img src={TrashcanIcon} width="20" alt="delete" />
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <img src={UploadFileIcon} width="32" alt="upload" />
                    <p
                      style={{
                        margin: "5px 0 0",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#2B7FFF",
                      }}
                    >
                      Dodaj zdjęcie
                    </p>
                  </div>
                )}
              </div>

              <label style={tabStyles.label}>Opis szczegółowy</label>
              <textarea
                style={{ ...tabStyles.input, height: 120, resize: "none" }}
                placeholder="Dlaczego zbieramy?..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={tabStyles.label}>Data końca</label>
                  <input
                    type="text"
                    placeholder="12.10.2025"
                    style={tabStyles.input}
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={tabStyles.label}>Koszt (zł)</label>
                  <input
                    type="number"
                    placeholder="250"
                    style={tabStyles.input}
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <button style={tabStyles.submitBtn} onClick={handleSave}>
              {isEditing ? "Zapisz zmiany" : "Stwórz zbiórkę"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const tabStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "24px",
    width: "90%",
    maxWidth: "500px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  scrollBody: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingRight: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#475569",
    marginBottom: "-8px",
  },
  input: {
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    padding: "12px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  uploadBox: {
    border: "2px dashed #2B7FFF",
    borderRadius: "12px",
    padding: "20px",
    cursor: "pointer",
    background: "#F0F7FF",
  },
  uploadFilled: {
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
  },
  submitBtn: {
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    fontWeight: "bold",
    marginTop: "20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  addMainBtn: {
    width: "100%",
    padding: "16px",
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  trash: { background: "none", border: "none", cursor: "pointer" },
};

export default FundraiserTabTreasurer;
