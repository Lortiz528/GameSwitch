// import AccountDetails from "../../Components/Accounts/Edit/AccountDetails";

const Edit = ({ user, users, handleUser, handleLogout }) => {
  return (
    <AccountDetails
      user={user}
      users={users}
      handleUser={handleUser}
      handleLogout={handleLogout}
    />
  );
};

export default Edit;