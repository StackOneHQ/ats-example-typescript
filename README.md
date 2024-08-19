# Recipe Application with StackOne ATS Integration

This application is a demonstration of how to integrate the StackOne unified API into a SaaS application for managing multiple ATS (Applicant Tracking System) providers. It serves as a guide for developers looking to streamline their application development by leveraging StackOne's capabilities to manage services like HRIS, ATS, LMS, IAM, CRM, and Marketing.

![STACKONE README](https://github.com/user-attachments/assets/f6607749-3e55-47a8-8333-aca293513600)


## Overview

This web application showcases two primary user interfaces:

1.  **Candidate View**:

*   Candidates can browse and apply for jobs.
*   Submitted applications are stored in the selected ATS provider's system, such as Greenhouse.

2.  **HR View**:

*   HR professionals can view posted jobs and receive applications.
*   HRs have the flexibility to select any ATS provider to manage job postings and applications.
*   This interface allows HR to add multiple ATS providers using a unified StackOne API.
  
![stackone-result-ss-3-v1](https://github.com/user-attachments/assets/385071ea-fe01-4a74-8129-7d199c963c15)
![stackone-result-ss-2-v1](https://github.com/user-attachments/assets/f29621f5-5364-446c-ad04-b2e0dd9df095)

## Tech Stack

*   **Frontend**: React, Tailwind CSS
*   **Language**: typescript
*   **Backend**: Node.js, Express
*   **API Integration**: [StackOne API](https://docs.stackone.com/reference/getting-started-with-your-api)

## Getting Started

### Prerequisites

Ensure you have the following prerequisites:

*   Node.js installed
*   Any IDE provider like VS Code
*   Understanding of Typescript

### Installation

Follow these steps to set up and run the application locally:

1.  **Clone the Repository**:
```
git clone https://github.com/StackOneHQ/ats-example-typescript.git
```
2. **Global Dependencies Setup**:

* Navigate to the root directory of the project and install global dependencies:
```
npm install
```
3.  **Backend Setup**:

*  Navigate to the `backend` directory and create a `.env` file, and add the following variables:
```
PORT=3001
STACKONE_API_KEY="<your-stackone-api-key>"
ORIGIN_OWNER_ID="<ORIGIN_OWNER_ID>"
ORIGIN_OWNER_NAME="<ORIGIN_OWNER_NAME>"
```
*   Install dependencies for the backend:
```
npm install
```
4.  **Frontend Setup**:

*   Navigate to the `frontend` directory and create a `.env` file, and add the following variables:

```
REACT_APP_API_SESSION_URL="http://localhost:3001/session-token"
REACT_APP_API_ATS_URL="http://localhost:3001/ats"
```
*   Install dependencies:
```
npm install
```
5.  **Run the Application**:
*   Navigate to the root directory of the application:
```
npm start
```
*   The application should now be running on `http://localhost:3000`
### Lint
This project uses ESLint for static code analysis.

To lint the project, follow these steps:

**Frontend Linting**: Navigate to the `frontend` directory and run the following command:
```
npm run lint
```
**Backend  Linting**: Navigate to the `backend` directory and run the following command:
```
npm run lint
```
## StackOne API Documentation
For detailed information on the StackOne API endpoints used in this project, please refer to the official StackOne API documentation:

- [Connect your Front-End via the StackOne React Hub](https://docs.stackone.com/docs/embedding-the-stackone-hub)
- [Connect your Backend with StackOne](https://docs.stackone.com/docs/connect-your-backend-with-stackone-api)
- [Create Connect Session](https://docs.stackone.com/reference/stackone_create_connect_session)
- [List all Accounts Endpoint](https://docs.stackone.com/reference/stackone_list_linked_accounts)
- [List all Applications Endpoint](https://docs.stackone.com/reference/ats_list_applications)
- [List all Jobs Endpoint](https://docs.stackone.com/reference/ats_list_jobs)
- [List all Job Postings Endpoint](https://docs.stackone.com/reference/ats_list_job_postings)
- [Create an Application Endpoint](https://docs.stackone.com/reference/ats_create_application)

## API Endpoints
Below are the `StackOne API endpoints` used in this project:

### Get All Accounts
Fetches all linked accounts from the StackOne API.
```
const getAllAccounts = async () => {
    const url: string = config.STACKONE_BASE_URL + "/accounts";
    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        // Handle error
    }
}
```

### Session Token
Creates a session token for connecting to an ATS provider.
```
const getSessionToken = async (origin_owner_id: string, origin_owner_name: string) => {
    const url: string = config.STACKONE_BASE_URL + "/connect_sessions";
    try {
        const response = await axios.post(url, {
            expires_in: 1800,
            multiple: false,
            origin_owner_id: origin_owner_id,
            origin_owner_name: origin_owner_name
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        // Handle error
    }
}
```
### Get All Jobs
Fetches all job listings from the selected ATS provider for the HR view.

```
const getJobs = async (accountId: string, next: string) => {
    let url: string = config.STACKONE_ATS_URL + "/jobs?page_size=25";

    if (next) {
        url += `&next=${encodeURIComponent(next)}`;
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'x-account-id': `${accountId}`,
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            }
        });
        return response.data;
    } catch (error) {
        // Handle error
    }
}
```
### Get All Applications
Fetches all applications submitted to job postings for the HR view.
```
const getApplications = async (accountId: string, next: string) => {
    let url: string = config.STACKONE_ATS_URL + "/applications?page_size=25";

    if (next) {
        url += `&next=${encodeURIComponent(next)}`;
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'x-account-id': `${accountId}`,
                'authorization': `Basic ${config.STACKONE_API_KEY}`,
            }
        });
        return response.data;
    } catch (error) {
        // Handle error
    }
}
```