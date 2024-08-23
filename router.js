const { Router, Response } = require("pepesan");
const BotController = require("./controller/BotController");
const f = require("./utils/Formatter");

const router = new Router();

router.menu(f("menu.daftarHarga"), [BotController, "harga"]);
router.menu(f("menu.cekStatus"), [BotController, "cekStatus"]);
router.menu(f("menu.cekPromo"), [BotController, "cekPromo"]);
router.keyword("*", [BotController, "introduction"]);

module.exports = router;