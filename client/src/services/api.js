// import axios from "axios"
// import { serverUrl } from "../App"
// import { setUserData } from "../redux/userSlice"

// export const getCurrentUser = async (dispatch) => {
//     try {
//         const result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
        
//         dispatch(setUserData(result.data))
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const generateNotes = async (payload) => {
//     try {
//         const result = await axios.post(serverUrl+ "/api/notes/generate-notes" , payload , {withCredentials:true})
//         console.log(result.data)
//         return result.data

//     } catch (error) {
//         console.log(error)
//     }
// }

// export const downloadPdf = async (result) => {
//     try {
//         const response = await axios.post(serverUrl+ "/api/pdf/generate-pdf" , {result} , {
//             responseType:"blob" , withCredentials:true
//         })

//         const blob = new Blob([response.data], {
//       type: "application/pdf"
//     });

//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "ExamNotesAI.pdf";
//     link.click();

//     window.URL.revokeObjectURL(url);
//     } catch (error) {
//          throw new Error("PDF download failed");

//     }
// }


import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

/*
  Create Axios instance
*/
const API = axios.create({
  baseURL: serverUrl,
});

/*
  Attach JWT token automatically to every request
*/
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
  Get Current Logged In User
*/
export const getCurrentUser = async (dispatch) => {
  try {
    const result = await API.get("/api/user/currentuser");
    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

/*
  Generate Notes
*/
export const generateNotes = async (payload) => {
  try {
    const result = await API.post(
      "/api/notes/generate-notes",
      payload
    );

    return result.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error("Failed to generate notes");
  }
};

/*
  Download PDF
*/
export const downloadPdf = async (result) => {
  try {
    const response = await API.post(
      "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error("PDF download failed");
  }
};
