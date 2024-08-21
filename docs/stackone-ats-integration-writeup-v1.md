### Simplifying Integrations Across Disparate ATS: A Job Board Using StackOne.
---

**Unified Job Board with Multi-ATS Integration: Brief Overview and Use Case**

We need to manage job postings from different platforms like Greenhouse, Ashby, and Workday. Each one works separately, which can lead to scattered and inconsistent job listings. To fix this and improve our job board, we want to combine these systems into one platform.

To address this, we are creating a unified job board that brings together job listings from all these platforms. This will enable the board to present all job postings in a single, consistent format, ensuring users have access to up-to-date listings from every ATS provider.

  ![Untitled Diagram drawio (3)](https://github.com/user-attachments/assets/9a2640a6-dcd1-4605-a2b3-9ad0fce04308)

---
## Integrating ATS Platforms with StackOne

1. **Setting Up StackOne Connection:**  
   * **Navigating the StackOne Platform:**  
     * Go to the StackOne login page. From there, you can connect with various ATS systems.  
   * **Creating and Managing Connections with Different ATS Systems:**  
     * Once you're on the StackOne platform, use the dashboard to set up and manage connections with different ATS systems.  
   * **Connecting to Various ATS (e.g., Greenhouse, Ashby):**  
* Click the "Add Connection" button on the dashboard.  
* Select the ATS platform you want to connect.  
* Enter your details and authorize StackOne to access the ATS.  
* StackOne will sync job postings from the ATS to your job board.

---
2. **Generating API Keys on StackOne**  
   To connect your application with StackOne securely, you need to generate API keys. These keys authenticate your application and protect your data.

   #### **Step-by-Step Guide to Generating API Keys**

1. **Access the API Key Management Section:**  
   * Log in to StackOne and go to the "API Keys" section in the left navigation menu.This is where you can generate and manage your API keys.
     
    ![15d009b-image](https://github.com/user-attachments/assets/27571f0f-4e4e-4a12-8f64-dbb112c74e28)

2. **Generate a New API Key:**  
   * Click the "Create API Key" button. In the popup dialog, enter a name for your key (e.g., "Job Board Integration"). This name is a label and cannot be changed later. Click "Generate" to create your unique API key.
     
    ![9948098-image](https://github.com/user-attachments/assets/da88df8d-7da3-4e92-b339-a06361eff974)

     
3. **Securely Store the API Key:**  
   * The API key will be displayed on-screen. Copy it immediately and store it securely, as this is the only time it will be shown. If you lose the key, you'll need to generate a new one. Store the key in a secure location, such as a password manager.
     
   ![4490dbe-image](https://github.com/user-attachments/assets/249bf5fe-0b7a-4c75-8005-b5cf91a612d3)

     
4. **Managing API Keys:**  
   * The new API key will be listed in the "API Keys" tab. You can view, revoke, or regenerate keys as needed, such as if there's a security issue.
     
   ![744a9dc-image](https://github.com/user-attachments/assets/0e6559b9-a749-408c-8872-36a446676448)

   

   **Note:** The API key is required for all future API calls. Paste it in either the username or password field for basic authentication in any API endpoints, such as "List Accounts."
   
---
**3\.  Generating and Managing Session Tokens**

To securely connect your application with StackOne, you'll need to generate and manage session tokens. These tokens authenticate your application and ensure that only authorized interactions occur.

#### **Step-by-Step Guide to Generating Session Tokens**

1. **Prepare the API Key:**  
   * Ensure you have your API key securely stored. This key is required to authenticate your request when generating session tokens.  
2. **Generate a Session Token:**  
   * Open your terminal or command-line interface and use the following `curl` command to generate a session token. Replace `YOUR_API_KEY` with your actual API key:  
     `curl -X POST`   
     `https://api.stackone.com/v1/connect_sessions\`  
     `-H "Authorization: Basic YOUR_API_KEY" \`  
     `-H "Content-Type: application/json" \`  
     `-d '{}'`  
3. **Store the Session Token Securely:**  
   * After executing the command, the response will include a session token. Store this token securely as it is essential for authenticating future API calls.  
4. **Using the Session Token:**  
   * For any subsequent API requests to StackOne, include the session token in the Authorization header like this:  
     `curl -X GET https://api.stackone.com/v1/connect-session \`  
     `-H "Authorization: Bearer YOUR_SESSION_TOKEN"`  
5. **Managing Session Tokens:**  
   * **Token Expiration:** Session tokens typically have an expiration time (e.g., 1 hour as shown by the `expires_in` value). Once expired, you’ll need to generate a new token using the same process.  
   * **Revoking Tokens:** If needed, session tokens can be revoked through the StackOne platform's API Management section, especially in cases of security concerns.

---
**4\. Fetching Integrations Data**

To retrieve available integrations data through StackOne, follow these steps:

**Step-by-Step Instructions:**

1. Use the following `curl` command to fetch the list of available integrations. Replace `YOUR_API_KEY` with your actual API key:

   curl \-X GET "https://api.stackone.com/accounts" \-H "Authorization: Bearer YOUR\_API\_KEY"

2. The command will return a JSON response containing details about the available integrations. You can use this data to populate and display the integrations on your admin dashboard.  
3. Update the Dashboard: Integrate the fetched data into your admin dashboard to allow users to view, manage, and interact with the list of integrations.

---
**5\. Visual Representation of API Call Flow** 

![diagram (5)](https://github.com/user-attachments/assets/af73f704-ba2c-43da-858a-2cdef985398b)

**Exploring API Endpoints**

StackOne enables seamless integration with multiple ATS platforms, allowing you to capture and manage accounts, job postings, and applications through a consistent API interface.

**1\. Fetching Session Tokens**

* **Endpoint: `/session-token`**  
* **Purpose:** This endpoint is used to obtain a session token, which is required to authenticate requests to StackOne. The job board uses this token in subsequent API requests to ensure secure and authorized access.

**1\. Fetching Accounts Data**

* **Endpoint: `/ats/accounts`**  
* **Purpose**: This endpoint retrieves account data, including the `accountId`, which is necessary for fetching specific job and application data from StackOne. The `accountId` identifies which ATS platforms' data should be accessed.  
* curl \-X GET "https://api.stackone.com/accounts"  
   \-H "Authorization: Bearer YOUR\_API\_KEY"

**2\. Fetching Job Data**

* **Endpoint: `/ats/jobs`**  
* **Purpose**: This endpoint fetches job data associated with the provided `accountId`. It allows the job board to retrieve job listings from StackOne that are aggregated from various ATS platforms.  
* **Curl Command:**

  curl \-X GET "https://api.stackone.com/jobs" \-H "Authorization: Bearer YOUR\_API\_KEY"

**3\. Fetching Job Applications**

* **Endpoint: `/ats/applications`**  
* **Purpose**: This endpoint retrieves application data related to the `accountId`. It provides a list of job applications, ensuring consistency and uniformity in the data from multiple ATS platforms.  
* **Curl Command:**  
  curl \-X GET "https://api.stackone.com/applications" \-H "Authorization: Bearer YOUR\_API\_KEY"

**4\.  Displaying Job Postings to Candidates**

* **Endpoint: `/ats/job_postings`**  
* **Purpose**: This endpoint fetches all available job postings. It provides a comprehensive list of job opportunities for users to view and apply for on the job board.  
* **Curl Command:**

  curl \-X GET "https://api.stackone.com/job\_postings" \-H "Authorization: Bearer YOUR\_API\_KEY".

**5\. Applying for Jobs**

* **Endpoint: `/ats/application`**  
* **Purpose**: This endpoint is used to submit a new job application. The job board sends the application details to StackOne, which forwards them to the appropriate ATS platform for processing.  
* **Displaying Application Form:**  
* **Curl Command for Application Submission:**

  curl \-X POST "https://api.stackone.com/applications" \\
  
       -H "Authorization: Bearer YOUR\_API\_KEY" \
       -H "Content-Type: application/json" \
       -d '{
             "job_id": "123",
             "candidate_name": "Jane Doe",
             "resume_url": "https://example.com/resume.pdf"
           }'

* **Purpose:** The goal is to handle the application submission process, ensuring that candidate information is properly sent to the connected ATS platforms.

---
**7\. Conclusion and Recommendations**

**Conclusion**:

Integrating multiple ATS platforms into a unified job board with StackOne simplifies job management and provides a single, consistent interface for users. This centralization ensures up-to-date job listings and streamlined application processes.

**Recommendations**:

1. Test Thoroughly: Ensure all integrations are working correctly and securely.  
2. Automate Syncing: Regularly sync job data to keep listings current.  
3. Enhance UI: Improve user experience with clear navigation and features.  
4. Monitor API Connections: Regularly update API keys and session tokens.  
5. Gather Feedback: Use user feedback to make necessary improvements.
