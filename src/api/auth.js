// src/api/auth.js
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URLL } from "../../src/api/AxiosBaseUrl";
import { useNavigate } from "react-router-dom";


// Register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URLL}api/UserRegistration/`,
      userData
      
    );
      console.log("user data",response.data)
    return response.data;
  
  } catch (error) {
    throw error.response?.data || { detail: "Registration failed" };
  }
};

// api/auth.js



// auth.js






export const googleLogin = (data) => {
  return axios.post(`${BASE_URLL}api/google-login/`, data);
};

// api/auth.js
export const getPostedJobById = async () => {
  // const employee_id = localStorage.getItem("employee_id"); // Ensure this is set



  try {
  const response = await axios.get(`${BASE_URLL}api3/PostJonbyemloyee/`);
  console.log("Full API Response:", response.data);

  if (Array.isArray(response.data)) {
    response.data.forEach((job, index) => {
      console.log(`Job ${index + 1}:`);
      console.log("  Job ID:", job.job_id || job.Job_id || job.id);
      console.log("  Title:", job.title || job.Title || "N/A");
      console.log("  Location:", job.location || job.Location || "N/A");
      console.log("  Description:", job.description || job.Description || "N/A");
      // Add more fields if needed — skip employee_id
    });
  }

  return response.data;
} catch (error) {
  console.error("Failed to fetch posted jobs:", error);
  throw error;
}
}


const api = axios.create({
  baseURL: `${BASE_URLL}api/`,
});

export const loginUser = async ({ email, phone, password }) => {
  const payload = { password };
  if (email) payload.email = email;
  if (phone) payload.phone = phone;
  if (password) payload.password = password;

  const response = await api.post(`${BASE_URLL}api/login/`, payload);
  const { access, refresh } = response.data;
  console.log("dataa", response.data); 
   console.log("Access Token:", access);
    console.log("Refresh Token:", refresh);
  return response.data;

};

// export const googleLogin = async ({ token }) => {
//   const response = await api.post(`google-login/`, { token });
//   return response.data;
// }

export const logoutUser = async (refreshToken) => {
  const accessToken = localStorage.getItem("access_token");

  return await axios.post(
    `${BASE_URLL}api/logout/`,
    { refresh: refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
     // only if using cookies
    }
  );
};

export const getJobSuggestions = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URLL}api/jobs/suggestions/`,
      {
        params: { q: query },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Suggestion fetch failed" };
  }
};

// save post get
export const fetchSavedJobsByUserId = async (userId) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/Savedpost/${userId}/`
  );
  return response.data;
};

// save post
export const saveJobPost = async (jobData, token) => {
  const response = await axios.post(
    `${BASE_URLL}api/Saved-post/`,
    jobData
  );
  return response.data;
};

export const savedJobPostView = async () => {
  const userId = localStorage.getItem("user_id");
  
   const accessToken11 = localStorage.getItem("access_token1");
 if (!accessToken11) {
      // Redirect if token not found
      window.location.href = "/UserLogin";
      return;
 }
  if (!userId) {
    console.error("No user ID found in localStorage.");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URLL}api/Get_user_save_post/${userId}/`,
{
        headers: {
          Authorization: `Bearer ${accessToken11}`, 
        },
      }
    );

    const jobs = response.data;

    // Remove duplicate jobs by job.id
    const uniqueJobsMap = new Map();
    jobs.forEach((job) => {
      uniqueJobsMap.set(job.id, job); // job.id must be unique
    });

    return Array.from(uniqueJobsMap.values());
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return [];
  }
};


// DELETE saved job by job_id
export const deleteSavedJobById = async (selected_job_id,token) => {
  const accessToken11 = localStorage.getItem("access_token1");
   if (!accessToken11) {
    
      window.location.href = "/UserLogin";
      return;
    }
  const user_id= localStorage.getItem("user_id")
  try {
    const response = await axios.delete(
      `${BASE_URLL}api/delete-post/${user_id}/${selected_job_id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken11}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting saved job:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const API_BASE_URL = `${BASE_URLL}`;

export const getUserResume = async (userId) => {
   const accessToken11 = localStorage.getItem("access_token1");
// or wherever you're storing it

  const response = await axios.get(
    `${API_BASE_URL}api2/resume-detail/?user=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken11}`,
      },
    }
  );

  return response.data;
};

// src/api/auth.js

export const getUserResumeData = async (userId) => {
  try {
    const res = await axios.get(
      `${BASE_URLL}api2/resume-detail/?user=${userId}`
    );
    const data = res.data;
    if (data.photo && !data.photo.startsWith("http")) {
      data.photo = `${BASE_URLL}/${data.photo}`;
    }
    if (data.generated_pdf && !data.generated_pdf.startsWith("http")) {
      data.generated_pdf = `${BASE_URLL}/${data.generated_pdf}`;
    }
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

export const updateUserResumeData = async (userId, data) => {

  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("user", userId);

    const res = await axios.post(
      `http://127.0.0.1:8000/api2/custom-resume/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.status === 200;
  } catch (err) {
    console.error("Update error:", err);
    return false;
  }
};

export const submitResumeDetails = async (data, token) => {
   const accessToken11 = localStorage.getItem("access_token1");
  try {
    const userRegistrationData = JSON.parse(
      localStorage.getItem("userRegistrationData")
     
    );
    const user_id = userRegistrationData?.id;

    const response = await axios.get(
      `${BASE_URLL}api2/custom-resume/?user${user_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken11}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Resume submission failed:", error);
    throw error;
  }
};

export const GetUserRegistration = async () => {
  const storedUser = localStorage.getItem("autoId");
   

//  const userObj = JSON.parse(storedUser);
  //  const userId = userObj?.id;
  

  
  try {
    const res = await axios.get(
      `${BASE_URLL}api/Registerduser/${storedUser}/`,
      
    
    );
    console.log("User Data:", res.data);

    return res.data; // return the actual data
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

export const UserRegistration = async () => {
  const userId = localStorage.getItem("autoId");
  console.log("user_id_registration", userId);
  try {
    const res = await axios.post(`${BASE_URLL}api2/custom-resume/`);
    console.log("User Data resume:", res.data);

    return res.data; 
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

// user profile basic details
export const fetchUserProfileById = async (userId) => {
  
  try {
    const accessToken11 = localStorage.getItem("access_token1");
    console.log("access_token",accessToken11)
    const storedUserId = localStorage.getItem("user_id");

    if (!accessToken11 && !storedUserId) {
      throw new Error("Access token or user ID not found in localStorage.");
      
    }

    console.log("user_id_registration", storedUserId);

    const res = await axios.get(
      `${BASE_URLL}api/Registerduser/${storedUserId}/`,

      {
        headers: {
          Authorization: `Bearer ${accessToken11}`, 
        },
      }

     
  
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// resume profile
export const fetchResumeWithUserDetails = async () => {
  try {
    const rawUserId = localStorage.getItem("user_id");
    const accessToken11 = localStorage.getItem("access_token1");

    if (!accessToken11) {
      window.location.href = "/UserLogin";
      return; // important to prevent further execution
    }

    console.log("User ID:", rawUserId);
    console.log("Access Token:", accessToken11);

    const res = await axios.get(
      `${BASE_URLL}api2/resume-detail/?user=${rawUserId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken11}`,
        },
      }
    );
console.log("reso",res.data)
    const data = res.data;
    console.log("data",data)
    // if (data.resume && !data.resume.startsWith("http")) {
    //   data.resume = `https://adminnanda.in/Job/api2${data.resume}`;
    // }
    if (data.generated_pdf && !data.generated_pdf.startsWith("http")) {
      data.generated_pdf = `${BASE_URLL}${data.generated_pdf}`;
    }
    console.log("resumeda",data)
    return data;
  } catch (error) {
    console.error(
      "Error fetching resume details:",
      error?.response?.data || error.message || error
    );
    return null; 
  }
};


// Fetch user basic profile (name, email, phone)



// src/api/auth.js

export const registerAdmin = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value) data.append(key, value);
  });

  return await axios.post(
    `http://127.0.0.1:8000/api3/admin_registration/`,
    data,
    config
  );
};
