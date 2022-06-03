// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminMain = require('../../../app/controller/admin/main');
import ExportDefalutHome = require('../../../app/controller/defalut/home');

declare module 'egg' {
  interface IController {
    admin: {
      main: ExportAdminMain;
    }
    defalut: {
      home: ExportDefalutHome;
    }
  }
}
