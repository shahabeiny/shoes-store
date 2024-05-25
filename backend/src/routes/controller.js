const autoBind = require('auto-bind');
const IP = require('ip');
var parser = require('ua-parser-js');
const User = require('./../models/user');
const LoginInfo = require('./../models/loginInfo');
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('jalali-moment');

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
  }

  slug(titleStr) {
    titleStr = titleStr.replace(/^\s+|\s+$/g, '');
    titleStr = titleStr.toLowerCase();
    titleStr = titleStr
      .replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return titleStr;
  }

  convertDate(data, format) {
    return moment(data).locale('fa').format(format);
  }

  dataSub(second) {
    var diff = (new Date() - second) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }

  getAgentInfo(userAgent) {
    let { os, browser } = parser(userAgent);
    return {
      os: os.name.toLocaleLowerCase(),
      browser: browser.name.toLocaleLowerCase(),
      versionOs: os.version,
      versionBrowser: browser.version
    };
  }

  getIPUser() {
    return IP.address();
  }

  async saveLoginInfo(req, userId) {
    let agent = this.getAgentInfo(req.headers['user-agent']);
    await LoginInfo.create({ user: userId, ip: this.getIPUser(), ...agent });
  }

  nameGenerateFile(kind) {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    return `${kind}/${year}/${month}/${day}/` + Math.floor(Math.random() * 1000000);
  }

  getFormats(data) {
    return ['png', 'jpeg', 'jpg'];
  }

  async upload(uploadFile, kind, res) {
    const file = uploadFile;
    const fileExtension = path.extname(file.name).slice(1);
    const nameUpload = this.nameGenerateFile(kind) + '.' + fileExtension;

    if (!this.getFormats(kind).includes(fileExtension)) {
      return this.response({
        res,
        code: 422,
        message: 'format file invalid'
      });
    }

    const filePath = path.resolve(__dirname, `../../public/`, nameUpload);

    try {
      await file.mv(filePath);
    } catch (err) {
      return this.response({
        res,
        code: 500,
        message: err.message
      });
    }

    return nameUpload;
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  calculateRate(rates) {
    let ratesMidd = 0;

    if (rates.length > 0) {
      const sum = rates.reduce((acc, rate) => acc + rate.rate, 0);
      ratesMidd = Math.round((sum / rates.length) * 10) / 10;
    }

    return ratesMidd;
  }

  response({ res, message = '', code = 200, data = {} }) {
    res.status(code).json({
      message,
      data
    });
  }
};
