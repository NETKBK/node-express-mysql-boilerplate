const SuperDao = require("./SuperDao");
const models = require("../models");

const User = models.user;

class UserDao extends SuperDao {
  /*
   * 会继承 SuperDao 类的方法
   * */
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async isEmailExists(email) {
    return User.count({ where: { email } }).then((count) => {
      return count !== 0;
    });
  }

  async createWithTransaction(user, transaction) {
    return User.create(user, { transaction });
  }
}

module.exports = UserDao;
