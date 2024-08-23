const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");
const gsheet = require("../service/gsheet")
const gsheetpromo = require("../service/gsheetpromo")
const gsheetharga = require("../service/gsheetharga")

module.exports = class BotController extends Controller {


    async introduction(request) {
      return Response.menu.fromArrayOfString(
        [
          f("menu.daftarHarga"),
          f("menu.cekStatus"),
          f("menu.cekPromo")
        ],
        f("intro", [request.name]),
        f("template.menu")
      );
    }

    async harga(request) {
      const responseStr = await gsheetharga.getData(request.number)
      await this.reply (f("headerCekHarga"))
      await this.reply(responseStr)
      return this.sendBasicMenu()
    }

    async cekStatus(request) {
      const responseStr = await gsheet.getData(request.number)
      await this.reply (f("headerCekStatus"))
      await this.reply(responseStr)
      return this.sendBasicMenu()
    }

    async cekPromo(request) {
      const responseStr = await gsheetpromo.getData(request.number)
      await this.reply (f("headerCekPromo"))
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