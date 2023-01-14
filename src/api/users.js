import axios from "axios";

export const getAllUserApi = async () => {
  // Nếu không có chữ await trong quá trình đi lấy sẽ mất một khoảng thời gian. Khi chưa lấy được sản phẩm thì nó gán giá trị luôn rồi. Nên phải có chữ await đợi khi nào lấy được rồi mới gán giá trị res (xử lý bất đồng bộ)
  const res = await axios({
    method: "GET",
    url: "https://63c2324b8bb1ca34754f1041.mockapi.io/users",
  });
  return res.data;
};

export const createUserApi = async (user) => {
  const res = await axios({
    method: "POST",
    url: "https://63c2324b8bb1ca34754f1041.mockapi.io/users",
    data: user,
  });
  return res.data;
};

export const updateUserApi = async (user) => {
  const res = await axios({
    method: "PUT",
    url: `https://63c2324b8bb1ca34754f1041.mockapi.io/users/${user.id}`,
    data: user,
  });
  return res.data;
};

export const deleteUserApi = async (id) => {
  const res = await axios({
    method: "DELETE",
    url: `https://63c2324b8bb1ca34754f1041.mockapi.io/users/${id}`,
  });
  return res.data;
};
