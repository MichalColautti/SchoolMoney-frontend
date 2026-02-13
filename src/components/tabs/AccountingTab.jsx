import AccountingItem from "../items/AccountingItem";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {getAccountingData} from "../../services/parent";

const AccountingTab = () => {
    const [data, setData] = useState([]);

    const {token} = useAuth();

    const handleAddDocument = (doc) => {
        setData([...data, doc]);
    }

    const fetchAccountingData = async () => {
        return await getAccountingData(token);
    }

    useEffect(() => {
        fetchAccountingData().then((data) => {setData(data);});
    }, [token]);

    return (
        <div style={styles.listContainer}>
            {data.map((classData) => (
                <AccountingItem key={classData.id} classData={classData} handleAddDocument={handleAddDocument}/>
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

export default AccountingTab;
