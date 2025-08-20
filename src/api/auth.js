// src/api/auth.js
import axios from "axios";
import { BASE_URLL } from "../../src/api/AxiosBaseUrl";
// import { useNavigate } from "react-router-dom";
import AccessRefreshToken from "../componets/user/Employee/AccessRefreshToken";


// Register API
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URLL}api/UserRegistration/`,
      formData
      
    );

    return response.data;
  
  } catch (error) {
    throw error.response?.data || { detail: "Registration failed" };
  }
};



export const googleLogin = (data) => {
  return axios.post(`${BASE_URLL}api/google-login/`, data);
};

// api/auth.js
export const getPostedJobById = async () => {
  // const employee_id = localStorage.getItem("employee_id"); // Ensure this is set

  try {
  const response = await axios.get(`${BASE_URLL}api3/PostJonbyemloyee/`);
 



  // if (Array.isArray(response.data)) {
  //   response.data.forEach((job, index) => {
  //     console.log(`Job ${index + 1}:`);
  //     console.log("  Job ID:", job.job_id || job.Job_id || job.id);
  //     console.log("  Title:", job.title || job.Title || "N/A");
  //     console.log("  Location:", job.location || job.Location || "N/A");
  //     console.log("  Description:", job.description || job.Description || "N/A");
  //     // Add more fields if needed — skip employee_id
  //   });
  // }

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
  // const { access, refresh } = response.data;
  // console.log("dataa", response.data); 
  //  console.log("Access Token:", access);
  //   console.log("Refresh Token:", refresh);
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
    `${BASE_URLL}api/Savedpost/${userId}/`
  );
  return response.data;
};

// save post
export const saveJobPost = async (jobData, token) => {
 
  const response = await AccessRefreshToken.post(
    `${BASE_URLL}api/Saved-post_by_user/`,
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
    const response = await AccessRefreshToken.get(`${BASE_URLL}api/Get_user_save_post/${userId}/`,
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
  if (!accessToken11) {
    // Redirect if token not found
    window.location.href = "/";
    return;
  }
   
// or wherever you're storing it

  const response = await AccessRefreshToken.get(
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
      `${BASE_URLL}api2/custom-resume/`,
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

   if (!accessToken11) {
    // Redirect if token not found
    window.location.href = "/";
    return;
  }
  try {
    const userRegistrationData = JSON.parse(
      localStorage.getItem("userRegistrationData")
     
    );
    const user_id = userRegistrationData?.id;

    const response = await AccessRefreshToken.get(
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
   
    const storedUserId = localStorage.getItem("user_id");

    if (!accessToken11 && !storedUserId) {
      throw new Error("Access token or user ID not found in localStorage.");
      
    }

    

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
 // adjust this path if needed

export const fetchResumeWithUserDetails = async () => {
  const rawUserId = localStorage.getItem("user_id");
  let accessToken = localStorage.getItem("access_token1");
  const refreshToken = localStorage.getItem("refresh_token1");

  if (!refreshToken) {
    window.location.href = "/UserLogin";
    return;
  }

 const fetchResume = async (token) => {
  const res = await AccessRefreshToken.get(
    `${BASE_URLL.replace(/\/+$/, "")}/api2/resume-detail/?user=${rawUserId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = res.data;

  if (data.generated_pdf && !/^https?:\/\//i.test(data.generated_pdf)) {
    // Safely join base and relative path
    const base = BASE_URLL.replace(/\/+$/, "");
    const path = data.generated_pdf.replace(/^\/+/, "");
    data.generated_pdf = `${base}/${path}`;
  }

  return data;
};


  try {
    
    return await fetchResume(accessToken);
  } catch (err) {
    if (err.response?.status === 401 && refreshToken) {
      try {
       
        const refreshResponse = await axios.post(`${BASE_URLL}api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem("access_token1", newAccessToken);
        

        // Retry original request with new access token
        return await fetchResume(newAccessToken);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError.response?.data || refreshError.message);
        window.location.href = "/UserLogin";
        return null;
      }
    } else {
      console.error("Error fetching resume:", err.response?.data || err.message);
      return null;
    }
  }
};


// export const fetchResumeWithUserDetails = async () => {
//   try {
//     const rawUserId = localStorage.getItem("user_id");
//     const accessToken11 = localStorage.getItem("access_token1");

//     if (!accessToken11) {
//       window.location.href = "/UserLogin";
//       return; // important to prevent further execution
//     }

//     console.log("User ID:", rawUserId);
//     console.log("Access Token:", accessToken11);

//     const res = await axios.get(
//       `${BASE_URLL}api2/resume-detail/?user=${rawUserId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken11}`,
//         },
//       }
//     );
// console.log("reso",res.data)
//     const data = res.data;
//     console.log("data",data)
//     // if (data.resume && !data.resume.startsWith("http")) {
//     //   data.resume = `https://adminn/Job/api2${data.resume}`;
//     // }
//     if (data.generated_pdf && !data.generated_pdf.startsWith("http")) {
//       data.generated_pdf = `${BASE_URLL}${data.generated_pdf}`;
//     }
//     console.log("resumeda",data)
//     return data;
//   } catch (error) {
//     console.error(
//       "Error fetching resume details:",
//       error?.response?.data || error.message || error
//     );
//     return null; 
//   }
// };


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


// api/axiosInstance.js


// Change this to match your backend

const axiosInstance = axios.create({
  baseURL: BASE_URLL,
});

// Request Interceptor: Attach access token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token1");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and we haven't retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token1");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post(`${BASE_URLL}api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token1", newAccessToken);
        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("access_token1");
        localStorage.removeItem("refresh_token1");
        window.location.href = "/UserLogin"; // redirect to login
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;




//  Verify OTP
export const verifyOTP = async (phone, otp) => {
  const payload = { phone, otp };
  const response = await axios.post(`${BASE_URLL}api/Verify-otp/`, payload);
  return response.data;
};

//  Resend OTP
export const resendOTP = async (phone) => {
  const payload = { phone };
  const response = await axios.post(`${BASE_URLL}api/Send-otp/`, payload);
  return response.data;
};

