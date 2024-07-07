import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import "./Profile.css"; // Import styles from Profile.css

const Profile = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null); // State to store additional user data
  const [isEditing, setIsEditing] = useState(false); // State to track if the user is entering data
  const [formData, setFormData] = useState({
    rollNumber: "",
    thaparEmail: "",
    branch: "",
    passingOutYear: "",
  }); // State to store form data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: user.uid, ...formData }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsEditing(false);
      } else {
        console.error("Failed to save user data");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-content">
          <h1>Profile</h1>
          {user && (
            <div className="profile-details">
              <img src={user.photoURL} alt="Profile" className="profile-picture" />
              <p>
                <strong>Name:</strong> {user.displayName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              {userData ? (
                <div>
                  <p>
                    <strong>Roll Number:</strong> {userData.rollNumber}
                  </p>
                  <p>
                    <strong>Thapar Email:</strong> {userData.thaparEmail}
                  </p>
                  <p>
                    <strong>Branch:</strong> {userData.branch}
                  </p>
                  <p>
                    <strong>Passing Out Year:</strong> {userData.passingOutYear}
                  </p>
                </div>
              ) : (
                <div>
                  <p>No additional data available. Please enter your data below:</p>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="rollNumber"
                      placeholder="Roll Number"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="thaparEmail"
                      placeholder="Thapar Email"
                      value={formData.thaparEmail}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="branch"
                      placeholder="Branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="passingOutYear"
                      placeholder="Passing Out Year"
                      value={formData.passingOutYear}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit">Save</button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;