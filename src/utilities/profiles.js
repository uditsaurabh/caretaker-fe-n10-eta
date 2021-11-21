import secureAxios from "../services/http";

const getPost = async (token) => {
  try {
    let data;
    await secureAxios
      .post("/get_profile_list", { access_token: token })
      .then((res) => {
        data = res.data;
      });
    return data;
  } catch (err) {
    throw err;
  }
};

export default getPost;
