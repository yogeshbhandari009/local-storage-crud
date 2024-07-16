import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function GetData() {
  const [getData, setGetData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    setGetData(data);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const deleteData = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        getData.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(getData));
        let data = JSON.parse(localStorage.getItem("data"));
        setGetData(data);
      }
    });
  };

  const handleEdit = (index,item) => {
    navigate("/",{ state: { isEditing: true, editIndex: index, formData: item } });
  };

  return (
    <div className="text-white">
      <div className="p-2 flex justify-end pr-6">
        <button
          className="bg-blue-500 border rounded-lg py-2 px-5 font-bold"
          onClick={handleBack}
        >
          + Add
        </button>
      </div>
      <table className="table-fixed border-collapse border border-slate-500 w-screen">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-slate-500">FullName</th>
            <th className="border border-slate-600 bg-slate-500"> Email</th>
            <th className="border border-slate-600 bg-slate-500">Password</th>
            <th className="border border-slate-600 bg-slate-500">Action</th>
          </tr>
        </thead>
        <tbody>
          {getData?.length > 0 ? (
            getData.map((item, index) => {
              return (
                <tr>
                  <td className="border border-slate-600">{item.name}</td>
                  <td className="border border-slate-600">{item.email}</td>
                  <td className="border border-slate-600">{item.password}</td>
                  <td className="border border-slate-600 py-2 flex justify-center gap-4">
                    <button
                      className="bg-blue-400 border rounded-lg py-1 px-5"
                      onClick={() => handleEdit(index,item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 border rounded-lg py-1 px-5 cursor-pointer"
                      onClick={() => deleteData(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p className="flex justify-center font-bold text-lg w-screen p-10">
              No Data Found
            </p>
          )}
        </tbody>
      </table>
      <div className="mt-10">
        <button
          className="bg-black border rounded-lg py-3 px-5 font-bold"
          onClick={handleBack}
        >
          Go Back To Home Page
        </button>
      </div>
    </div>
  );
}

export default GetData;
