"use strict";

module.exports = {
  // khi chạy bth thêm dữ liệu vào
  up: async (queryInterface, Sequelize) => {
    // bulkInsert chèn bản ghi
    return queryInterface.bulkInsert("Users", [
      {
        email: "dungtran061101@gmail.com",
        password: "123456", //plain text saduhjkasdasd23da -> hash password
        firstName: "Dung",
        lastName: "Tran",
        address: "VietNam",
        gender: 1,
        typeRole: "ROLE",
        keyRole: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  // rollback chạy lỗi thì back lại version chưa bị lỗi
  // khi muốn cancel việc thêm dữ liệu
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
