const projectID = 'vv9q2o5880o8'
export const apiURL = 'https://academics.newtonschool.co/api/v1'


export const headerWithProjectIdOnly = () => {
    return {
      headers: {
        projectID: projectID,
      },
    };
  };
export const headerWithJWT = () => {
const authToken = localStorage.getItem("authToken");

    return {
      headers: {
        projectID: projectID,
        Authorization: `Bearer ${authToken}`
      },
    };
  };