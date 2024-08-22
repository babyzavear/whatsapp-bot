const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");
const gsheet = require("../service/gsheet")

module.exports = class BotController extends Controller {


    async introduction(request) {
      return Response.menu.fromArrayOfString(
        [
          f("menu.daftarHarga"),
          f("menu.cekStatus")
        ],
        f("intro", [request.name]),
        f("template.menu")
      );
    }

    async harga(request) {
      await this.reply (f("tamplate.harga"))
      await this.reply (f("footer"))
      return this.sendBasicMenu()
    }

    async cekStatus(request) {
      const responseStr = await gsheet.getData(request.number)
      await this.reply (f("headerCekStatus"))
      await this.reply(responseStr)
      return this.sendBasicMenu()
    }

    async sendBasicMenu(request) {
      return Response.menu.fromArrayOfObject(
        [
          {
          value: 'menu.back',
          text: f("menu.back"),
          code: "0"
          }
        ],
        "",
        f("template.menu")
      )
    }

}