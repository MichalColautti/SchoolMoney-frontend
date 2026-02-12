import { useState, useEffect, useContext } from "react";
import FundraiserItem from "../items/FundraiserItem";
import { getFundraisings } from "../../services/parent";
import { AuthContext } from "../../contexts/AuthContext";
import { useUserData } from "../../contexts/UserDataContext";
import { getImageUrl } from "../../services/image";

const FundraiserTab = ({ isTreasurer }) => {
  const [list, setList] = useState([]);
  const { token } = useContext(AuthContext);
  const { user } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFundraisings(token);
        if (data && Array.isArray(data)) {
           const myChildIds = user?.children?.map(c => c.id) || [];

           const mapped = data.map(dto => {
             const allChildren = dto.collectedAmounts || [];

             const myChildren = allChildren.filter(ca => myChildIds.includes(ca.child.id)).map(ca => ({
                 id: ca.child.id,
                 name: `${ca.child.name} ${ca.child.surname}`,
                 amountPaid: ca.amount,
             }));

             const otherChildren = allChildren.filter(ca => !myChildIds.includes(ca.child.id)).map(ca => ({
                 id: ca.child.id,
                 name: `${ca.child.name} ${ca.child.surname}`,
                 amountPaid: ca.amount,
             }));

             return {
               id: dto.id,
               title: dto.name,
               goal: dto.className || "",
               description: dto.description,
               endDate: dto.endDate ? new Date(dto.endDate).toLocaleDateString("pl-PL") : "",
               costPerChild: dto.amount,
               imageUrl: dto.imageId ? getImageUrl(dto.imageId) : null,
               organizer: dto.classTreasurerName || "Skarbnik",
               badges: dto.status === "active"
                  ? [{ text: "Aktywna", type: "green" }]
                  : [{ text: "Zakończona", type: "red" }],
               children: myChildren,
               otherChildren: otherChildren,
               documents: []
             };
           });
           setList(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch fundraisings:", error);
      }
    };

    if (token) {
        fetchData();
    }
  }, [token, user]);

  return (
    <div style={styles.listContainer}>
      {list.map((fundraiser) => (
        <FundraiserItem key={fundraiser.id} fundraiser={fundraiser} isTreasurer={isTreasurer} />
      ))}
    </div>
  );
};

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
};

export default FundraiserTab;
