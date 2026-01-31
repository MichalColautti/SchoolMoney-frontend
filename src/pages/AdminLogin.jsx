import Login from "../components/auth/Login";

const AdminLogin = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>SchoolMoney - Admin</h2>
        <p style={styles.subtitle}>Logowanie do panelu administratora</p>

        <Login redirectPath="/admin" loginEndpoint="/auth/admin/login" />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    fontFamily: "'Krub', sans-serif",
  },
  box: {
    border: "4px solid #f0f9ff",
    borderRadius: "15px",
    padding: "1rem",
    textAlign: "center",
    background: "#fff",
    width: "350px",
    boxShadow: "0 0 8px #f0f9ff",
  },
  title: {
    color: "#2B7FFF",
  },
  subtitle: {
    color: "#64748B",
    marginBottom: "15px",
  },
};

export default AdminLogin;
