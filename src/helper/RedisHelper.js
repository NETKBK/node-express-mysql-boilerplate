class RedisHelper {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  /**
   * 设置值
   * @param {String} key
   * @param {String/JSON} value
   * @returns {String/Boolean}
   */
  set = async (key, value) => {
    try {
      if (typeof value === "JSON") value = JSON.stringify(value);
      return await this.redisClient.set(key, value);
    } catch (e) {
      return false;
    }
  };

  /**
   * 设置过期值
   * @param {String} key
   * @param {Integer} seconds
   * @param {String/JSON} value
   * @returns {String/boolean}
   */
  setEx = async (key, seconds, value) => {
    try {
      if (typeof value === "JSON") value = JSON.stringify(value);
      return await this.redisClient.setEx(key, seconds, value);
    } catch (e) {
      return false;
    }
  };

  /**
   * 获取值
   * @param {String} key
   * @returns {String}
   */
  get = async (key) => {
    try {
      return await this.redisClient.get(key);
    } catch (e) {
      return null;
    }
  };

  /**
   * 删除值
   * @param {String} key
   * @returns {Boolean}
   */
  del = async (key) => {
    try {
      return await this.redisClient.del(key);
    } catch (e) {
      return false;
    }
  };

  scanStream = async (key) => {
    try {
      await this.redisClient.scanStream({
        // 只返回遵循“key”模式的键。
        match: key,
        // 每次调用返回大约100个元素
        count: 100,
      });
    } catch (e) {
      return false;
    }
  };
}

module.exports = RedisHelper;
