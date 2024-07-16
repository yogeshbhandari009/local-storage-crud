import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const editIndex = location.state?.editIndex || null;

  useEffect(() => {
    if (isEditing && location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [isEditing, location.state]);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (isEditing && editIndex !== null) {
      data[editIndex] = formData;
      navigate("/getData");
    } else {
      data.push(formData);
    }
    localStorage.setItem("data", JSON.stringify(data));
    setFormData({ name: "", email: "", password: "" });
  };

  const handleBack = () => {
    navigate("/getData");
  };

  return (
    <div className="text-white">
      <h1 className="text-white text-4xl p-10">Form</h1>

      <form className="w-60 grid m-auto  " onSubmit={handleSubmit}>
        <div className="grid">
          <label>FullName</label>
          <input
            className="p-2 mt-2 rounded-lg outline-none text-black"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>{" "}
        <div className="grid">
          <label className=" mt-2">Email</label>
          <input
            className="p-2 mt-2 rounded-lg outline-none text-black"
            type="text"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter your Email"
          />
        </div>
        <div className="grid">
          <label className=" mt-2">Password</label>
          <input
            className="p-2 mt-2 rounded-lg outline-none text-black"
            type="text"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="mt-8 flex justify-center gap-7">
          <button
            type="submit"
            className="rounded-lg bg-blue-200 py-2 px-5 text-black font-bold"
          >
            {editIndex !== null ? "Update" : "Submit"}
          </button>
          <button
            className="bg-blue-500 border rounded-lg py-2 px-5 font-bold"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
